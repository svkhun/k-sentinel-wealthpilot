import lightgbm as lgb
import pandas as pd
import numpy as np

# โหลดโมเดล K-Sentinel
bst = lgb.Booster(model_file="models/k_sentinel_lgbm.txt")

# โหลด Embedding จริงที่เซฟไว้
df_embeddings = pd.read_csv("data/sentinel_node_embeddings.csv").set_index("account_id")

def generate_counterfactual_advice(tx_payload: dict, target_acc_id: str, threshold=0.5):
    # 1. ดึง Embedding จริงของบัญชีปลายทาง
    target_emb = df_embeddings.loc[target_acc_id].values.tolist()

    # 2. จัดเรียงฟีเจอร์ให้ตรงกับตอน Train: [telemetry] + [auth_dummies] + [target_embs]
    telemetry_cols = [
        "amount", "is_first_time_transfer", "device_switch_last_24h",
        "session_duration_sec", "ratio_to_daily_avg"
    ]
    
    auth = tx_payload.get("auth_factor_used", "pin")
    auth_data = {
        "auth_face_scan": 1 if auth == "face_scan" else 0,
        "auth_none": 1 if auth == "none" else 0,
        "auth_pin": 1 if auth == "pin" else 0
    }
    
    emb_data = {f"target_emb_{i}": target_emb[i] for i in range(16)}

    # รวมเป็น Feature Vector แถวแรก
    current_row = {col: tx_payload[col] for col in telemetry_cols}
    current_row.update(auth_data)
    current_row.update(emb_data)

    df_current = pd.DataFrame([current_row])
    current_risk = float(bst.predict(df_current)[0])

    if current_risk < threshold:
        return {
            "status": "APPROVED",
            "risk_score": round(current_risk, 4),
            "action": "ALLOW",
            "message": "Transaction is within safe behavioral thresholds."
        }

    # 3. Counterfactual Simulation (What-if Analysis)
    scenarios = []

    # Scenario A: สแกนใบหน้า (Biometric Authentication)
    df_face = df_current.copy()
    df_face["auth_face_scan"] = 1
    df_face["auth_pin"] = 0
    df_face["auth_none"] = 0
    risk_face = float(bst.predict(df_face)[0])
    scenarios.append(("FACE_SCAN", risk_face, "Verify via biometric facial recognition."))

    # Scenario B: ลดวงเงินให้อยู่ในระดับ Micro-transfer (<= 500 THB)
    df_low = df_current.copy()
    df_low["amount"] = 300.0
    df_low["ratio_to_daily_avg"] = 0.2
    risk_low = float(bst.predict(df_low)[0])
    scenarios.append(("LOWER_AMOUNT", risk_low, "Limit transfer to under 500 THB for this recipient."))

    # คัดเลือกเงื่อนไขที่ลดความเสี่ยงได้มากที่สุด
    scenarios.sort(key=lambda x: x[1])
    best_action, best_risk, advice_msg = scenarios[0]

    return {
        "status": "STEP_UP_REQUIRED" if best_risk < threshold else "CRITICAL_BLOCKED",
        "current_risk_score": round(current_risk, 4),
        "post_action_risk_score": round(best_risk, 4),
        "recommended_action": best_action if best_risk < threshold else "15_MIN_COOL_OFF",
        "actionable_warning": advice_msg if best_risk < threshold else "Transaction blocked. Initiating 15-minute cool-off window."
    }

if __name__ == "__main__":
    df_users = pd.read_csv("data/sentinel_users_v2.csv")
    mule_id = df_users[df_users["is_mule"] == 1].iloc[0]["account_id"]
    normal_id = df_users[df_users["is_mule"] == 0].iloc[0]["account_id"]

    print(f"Testing with known Mule Account: {mule_id}")

    # ทดสอบรายการโอนก้อนใหญ่เข้าบัญชีม้าด้วย PIN
    suspicious_payload = {
        "amount": 35000.0,
        "is_first_time_transfer": 1,
        "device_switch_last_24h": 0,
        "session_duration_sec": 12,
        "ratio_to_daily_avg": 15.0,
        "auth_factor_used": "pin"
    }

    print("\n--- High-Risk Transfer Evaluation ---")
    res = generate_counterfactual_advice(suspicious_payload, target_acc_id=mule_id, threshold=0.5)
    for k, v in res.items():
        print(f"{k}: {v}")