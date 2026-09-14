import numpy as np
import pandas as pd
from datetime import datetime, timedelta

np.random.seed(42)

# ==============================================================================
# 1. ENHANCED K-SENTINEL: GRAPH & TELEMETRY SYNTHESIZER
# ==============================================================================
def generate_enhanced_sentinel_data(n_users=1200, n_mules=60, n_normal_tx=6000):
    users = []
    for i in range(n_users):
        is_mule = 1 if i < n_mules else 0
        
        # บัญชีม้ามักเปิดใหม่, KYC ต่ำ, ผูกพร้อมเพย์ด้วยเบอร์ชั่วคราว, และเงินไม่อยู่นิ่ง
        age = int(np.random.randint(1, 45) if is_mule else np.random.randint(60, 2000))
        kyc = int(np.random.choice([1, 2], p=[0.75, 0.25]) if is_mule else 2)
        has_promptpay = int(np.random.choice([1, 0], p=[0.9, 0.1]) if is_mule else np.random.choice([1, 0], p=[0.6, 0.4]))
        velocity_sec = float(np.random.uniform(10, 180) if is_mule else np.random.uniform(3600, 86400 * 5))
        
        users.append({
            "account_id": f"ACC_{i:04d}",
            "account_age_days": age,
            "kyc_level": kyc,
            "is_promptpay_linked": has_promptpay,
            "avg_inflow_velocity_sec": round(velocity_sec, 2),
            "is_mule": is_mule
        })
    df_users = pd.DataFrame(users)

    tx_list = []
    base_time = datetime(2026, 8, 1, 0, 0)
    user_ids = df_users["account_id"].values
    mule_ids = df_users[df_users["is_mule"] == 1]["account_id"].values
    normal_ids = df_users[df_users["is_mule"] == 0]["account_id"].values
    
    # 1.1 จำลองธุรกรรมปกติ
    for _ in range(n_normal_tx):
        src, dst = np.random.choice(normal_ids, size=2, replace=False)
        tx_time = base_time + timedelta(minutes=int(np.random.randint(0, 43200)))
        amount = round(float(np.random.exponential(scale=650) + 40), 2)
        
        tx_list.append({
            "tx_id": f"TX_{len(tx_list):06d}",
            "source_id": src,
            "target_id": dst,
            "amount": amount,
            "timestamp": tx_time,
            "is_first_time_transfer": int(np.random.choice([0, 1], p=[0.7, 0.3])),
            "device_switch_last_24h": int(np.random.choice([0, 1], p=[0.96, 0.04])),
            "session_duration_sec": int(np.random.normal(loc=45, scale=12)),
            "ratio_to_daily_avg": round(float(np.random.uniform(0.1, 1.5)), 2),
            "auth_factor_used": np.random.choice(["pin", "face_scan", "none"], p=[0.85, 0.14, 0.01]),
            "channel": "kplus_app",
            "is_scam": 0
        })

    # 1.2 จำลองพฤติกรรม Task Scam (ลองโอนเงินก้อนเล็ก ตามด้วยโอนก้อนใหญ่เข้าบัญชีม้า)
    for _ in range(160):
        victim = np.random.choice(normal_ids)
        mule = np.random.choice(mule_ids)
        t_event = base_time + timedelta(minutes=int(np.random.randint(0, 43200)))
        
        # Micro-trial test transfer
        tx_list.append({
            "tx_id": f"TX_{len(tx_list):06d}",
            "source_id": victim,
            "target_id": mule,
            "amount": round(float(np.random.uniform(100, 400)), 2),
            "timestamp": t_event,
            "is_first_time_transfer": 1,
            "device_switch_last_24h": 0,
            "session_duration_sec": int(np.random.normal(loc=35, scale=8)),
            "ratio_to_daily_avg": 0.3,
            "auth_factor_used": "pin",
            "channel": "kplus_app",
            "is_scam": 1
        })
        
        # Large trap transfer (ภายใน 10-15 นาทีถัดมา เหยื่อมักถูกเร่งรัด เซสชันจึงสั้นหรือยาวผิดปกติ ยอดโอนพุ่งสูง)
        tx_list.append({
            "tx_id": f"TX_{len(tx_list):06d}",
            "source_id": victim,
            "target_id": mule,
            "amount": round(float(np.random.uniform(18000, 65000)), 2),
            "timestamp": t_event + timedelta(minutes=int(np.random.randint(8, 15))),
            "is_first_time_transfer": 0,
            "device_switch_last_24h": 0,
            "session_duration_sec": int(np.random.choice([12, 350])), # สั้นจัดเพราะลนลาน หรือยาวจัดเพราะฟังสายมิจฉาชีพ
            "ratio_to_daily_avg": round(float(np.random.uniform(8.0, 25.0)), 2),
            "auth_factor_used": "pin",
            "channel": "kplus_app",
            "is_scam": 1
        })

    # 1.3 จำลอง Mule Layering (บัญชีม้าส่งต่อให้บัญชีม้าทอดถัดไปแทบจะทันที)
    for _ in range(80):
        mule_src, mule_dst = np.random.choice(mule_ids, size=2, replace=False)
        t_event = base_time + timedelta(minutes=int(np.random.randint(0, 43200)))
        tx_list.append({
            "tx_id": f"TX_{len(tx_list):06d}",
            "source_id": mule_src,
            "target_id": mule_dst,
            "amount": round(float(np.random.uniform(15000, 60000)), 2),
            "timestamp": t_event + timedelta(seconds=int(np.random.randint(20, 90))),
            "is_first_time_transfer": 1,
            "device_switch_last_24h": 1, # สลับเครื่อง/IP บ่อย
            "session_duration_sec": int(np.random.uniform(8, 20)),
            "ratio_to_daily_avg": round(float(np.random.uniform(5.0, 15.0)), 2),
            "auth_factor_used": "pin",
            "channel": "promptpay",
            "is_scam": 1
        })

    df_tx = pd.DataFrame(tx_list).sort_values("timestamp").reset_index(drop=True)
    return df_users, df_tx


# ==============================================================================
# 2. ENHANCED WEALTHPILOT: GRANULAR CASHFLOW SYNTHESIZER
# ==============================================================================
def generate_enhanced_wealthpilot_data(n_users=150, days=90):
    records = []
    start_date = datetime(2026, 6, 1)

    categories = [
        "salary", "rent", "utilities", "transport",
        "food_daily", "entertainment", "debt_emi", "unplanned_transfer"
    ]

    for u in range(n_users):
        user_id = f"USER_{u:04d}"
        salary = float(np.random.choice([20000, 24000, 28000, 32000, 36000]))
        rent = float(np.random.uniform(5500, 8500))
        debt_emi = float(np.random.choice([0, 2500, 4500], p=[0.5, 0.3, 0.2])) # ภาระผ่อนบัตร/กู้
        current_balance = 5000.0

        for d in range(days):
            curr_date = start_date + timedelta(days=d)
            is_weekend = int(curr_date.weekday() >= 5)
            
            # คำนวณวันคงเหลือก่อนเงินเดือนออก (สิ้นเดือนรอบวันที่ 28)
            days_to_payday = (28 - curr_date.day) if curr_date.day <= 28 else (28 + (30 - curr_date.day))
            fixed_due_7d = 1 if (curr_date.day >= 25 or curr_date.day <= 2) else 0

            # 1. เงินเดือนเข้า (วันที่ 28)
            if curr_date.day == 28:
                current_balance += salary
                records.append({
                    "user_id": user_id, "timestamp": curr_date, "category": "salary",
                    "amount": salary, "balance": current_balance,
                    "days_to_payday": 0, "fixed_due_in_7d": 1, "is_weekend": is_weekend
                })

            # 2. รายจ่ายคงที่ (ค่าเช่า + ค่าผ่อนชำระ ทุกวันที่ 1)
            if curr_date.day == 1 and d > 0:
                current_balance -= (rent + debt_emi)
                records.append({
                    "user_id": user_id, "timestamp": curr_date, "category": "rent",
                    "amount": -rent, "balance": current_balance + debt_emi,
                    "days_to_payday": days_to_payday, "fixed_due_in_7d": 1, "is_weekend": is_weekend
                })
                if debt_emi > 0:
                    records.append({
                        "user_id": user_id, "timestamp": curr_date, "category": "debt_emi",
                        "amount": -debt_emi, "balance": current_balance,
                        "days_to_payday": days_to_payday, "fixed_due_in_7d": 1, "is_weekend": is_weekend
                    })

            # 3. ค่าน้ำไฟ/เน็ต (ทุกวันที่ 5)
            if curr_date.day == 5 and d > 0:
                util = float(np.random.uniform(800, 1800))
                current_balance -= util
                records.append({
                    "user_id": user_id, "timestamp": curr_date, "category": "utilities",
                    "amount": -round(util, 2), "balance": current_balance,
                    "days_to_payday": days_to_payday, "fixed_due_in_7d": 0, "is_weekend": is_weekend
                })

            # 4. อาหารและเดินทางประจำวัน
            food = float(np.random.normal(loc=250, scale=40))
            transport = float(np.random.choice([0, 90, 140], p=[0.2, 0.5, 0.3]))
            daily_living = food + transport
            current_balance -= daily_living
            records.append({
                "user_id": user_id, "timestamp": curr_date, "category": "food_daily",
                "amount": -round(daily_living, 2), "balance": current_balance,
                "days_to_payday": days_to_payday, "fixed_due_in_7d": fixed_due_7d, "is_weekend": is_weekend
            })

            # 5. สังสรรค์/ช้อปปิ้งช่วงสุดสัปดาห์
            if is_weekend and np.random.rand() > 0.4:
                ent = float(np.random.uniform(400, 1800))
                current_balance -= ent
                records.append({
                    "user_id": user_id, "timestamp": curr_date, "category": "entertainment",
                    "amount": -round(ent, 2), "balance": current_balance,
                    "days_to_payday": days_to_payday, "fixed_due_in_7d": fixed_due_7d, "is_weekend": is_weekend
                })

    return pd.DataFrame(records)

# บันทึกไฟล์ CSV ชุดใหม่
df_users, df_tx = generate_enhanced_sentinel_data()
df_cashflow = generate_enhanced_wealthpilot_data()

df_users.to_csv("sentinel_users_v2.csv", index=False)
df_tx.to_csv("sentinel_transactions_v2.csv", index=False)
df_cashflow.to_csv("wealthpilot_cashflow_v2.csv", index=False)

print(f"Generated {len(df_users)} users and {len(df_tx)} transactions for K-Sentinel.")
print(f"Generated {len(df_cashflow)} cashflow logs for WealthPilot.")