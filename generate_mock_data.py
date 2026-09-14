import numpy as np
import pandas as pd
from datetime import datetime, timedelta

np.random.seed(42)

# ==========================================
# 1. K-SENTINEL: SYNTHETIC GRAPH DATA
# ==========================================
def generate_sentinel_data(n_users=1000, n_mules=50, n_tx=5000):
    # สร้าง User Nodes
    users = []
    for i in range(n_users):
        is_mule = 1 if i < n_mules else 0
        age = np.random.randint(1, 30) if is_mule else np.random.randint(60, 1800)
        users.append({
            "account_id": f"ACC_{i:04d}",
            "account_age_days": age,
            "kyc_level": np.random.choice([1, 2], p=[0.7, 0.3]) if is_mule else 2,
            "is_mule": is_mule
        })
    df_users = pd.DataFrame(users)

    # สร้าง Transactions (Edges)
    tx_list = []
    base_time = datetime(2026, 8, 1, 0, 0)
    
    # ธุรกรรมปกติ
    for _ in range(n_tx):
        src, dst = np.random.choice(df_users["account_id"], size=2, replace=False)
        tx_list.append({
            "tx_id": f"TX_{len(tx_list):06d}",
            "source_id": src,
            "target_id": dst,
            "amount": round(float(np.random.exponential(scale=500) + 50), 2),
            "timestamp": base_time + timedelta(minutes=int(np.random.randint(0, 43200))),
            "is_scam": 0
        })

    # จำลอง Task Scam: โอนทดสอบก้อนเล็ก ตามด้วยโอนก้อนใหญ่เข้าบัญชีม้า
    mule_ids = df_users[df_users["is_mule"] == 1]["account_id"].values
    victim_ids = df_users[df_users["is_mule"] == 0]["account_id"].values

    for _ in range(150):
        victim = np.random.choice(victim_ids)
        mule = np.random.choice(mule_ids)
        t_event = base_time + timedelta(minutes=int(np.random.randint(0, 43200)))
        
        # ก้อนทดสอบ
        tx_list.append({
            "tx_id": f"TX_{len(tx_list):06d}",
            "source_id": victim,
            "target_id": mule,
            "amount": round(float(np.random.uniform(100, 300)), 2),
            "timestamp": t_event,
            "is_scam": 1
        })
        # ก้อนใหญ่หลังจากนั้น 10 นาที
        tx_list.append({
            "tx_id": f"TX_{len(tx_list):06d}",
            "source_id": victim,
            "target_id": mule,
            "amount": round(float(np.random.uniform(15000, 50000)), 2),
            "timestamp": t_event + timedelta(minutes=10),
            "is_scam": 1
        })

    df_tx = pd.DataFrame(tx_list).sort_values("timestamp").reset_index(drop=True)
    return df_users, df_tx

# ==========================================
# 2. WEALTHPILOT: SYNTHETIC CASHFLOW DATA
# ==========================================
def generate_wealthpilot_data(n_users=100, days=90):
    cashflow_records = []
    start_date = datetime(2026, 6, 1)

    for u_idx in range(n_users):
        user_id = f"USER_{u_idx:04d}"
        salary = float(np.random.choice([20000, 25000, 30000, 35000]))
        rent = float(np.random.uniform(5000, 9000))
        balance = 5000.0

        for d in range(days):
            curr_date = start_date + timedelta(days=d)
            
            # เงินเดือนเข้าทุกสิ้นเดือน
            if curr_date.day == 28:
                balance += salary
                cashflow_records.append({
                    "user_id": user_id, "timestamp": curr_date,
                    "amount": salary, "category": "income_salary", "balance": balance
                })
            
            # หักบิลประจำต้นเดือน
            if curr_date.day == 1 and d > 0:
                balance -= rent
                cashflow_records.append({
                    "user_id": user_id, "timestamp": curr_date,
                    "amount": -rent, "category": "fixed_rent", "balance": balance
                })

            # รายจ่ายย่อยรายวัน
            daily_spend = float(np.random.lognormal(mean=5.5, sigma=0.5))
            balance -= daily_spend
            cashflow_records.append({
                "user_id": user_id, "timestamp": curr_date,
                "amount": -daily_spend, "category": "discretionary", "balance": balance
            })

    return pd.DataFrame(cashflow_records)

# รันเพื่อเซฟไฟล์
df_users, df_tx = generate_sentinel_data()
df_cashflow = generate_wealthpilot_data()

df_users.to_csv("sentinel_users.csv", index=False)
df_tx.to_csv("sentinel_transactions.csv", index=False)
df_cashflow.to_csv("wealthpilot_cashflow.csv", index=False)
print("Data generation complete. Saved CSV files.")