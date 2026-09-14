import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import joblib

def extract_user_behavior():
    df_cf = pd.read_csv("data/wealthpilot_cashflow_v2.csv")
    df_users = pd.read_csv("data/sentinel_users_v2.csv")
    
    # Filter normal users (non-mules)
    normal_users = df_users[df_users["is_mule"] == 0]["account_id"].values
    
    profiles = []
    
    for i, acc_id in enumerate(normal_users):
        user_key = f"USER_{i % 150:04d}"
        user_cf = df_cf[df_cf["user_id"] == user_key]
        
        salary_rows = user_cf[user_cf["category"] == "salary"]
        salary = float(salary_rows["amount"].mean()) if len(salary_rows) > 0 else 25000.0
        
        spend_rows = user_cf[user_cf["category"] != "salary"]
        avg_daily_spend = float(spend_rows["amount"].abs().mean()) if len(spend_rows) > 0 else 450.0
        
        # Balance near payday (days_to_payday <= 3)
        near_payday_rows = user_cf[user_cf["days_to_payday"] <= 3]
        min_balance_eom = float(near_payday_rows["balance"].min()) if len(near_payday_rows) > 0 else 1500.0
        
        # Discretionary spend
        ent_spend = user_cf[user_cf["category"] == "entertainment"]["amount"].abs().sum()
        total_spend = spend_rows["amount"].abs().sum()
        discretionary_ratio = (ent_spend / total_spend) if total_spend > 0 else 0.2
        
        # Cashflow liquidity ratio
        liquidity_ratio = min_balance_eom / (salary + 1e-5)
        
        # Simulated initial emergency reserve (First Jobbers 22-30)
        # Pitch: Paycheck-to-paycheck has < 3 months buffer (< 15-20k), High-Yield has 30,000-100,000 THB initial savings
        np.random.seed(int(acc_id.split("_")[1]))
        if liquidity_ratio < 0.15 or np.random.rand() < 0.65:
            # 65% Paycheck-to-paycheck
            initial_vault = round(float(np.random.uniform(2000, 18000)), 2)
            noise_feature = 0
        else:
            # 35% High-Yield Seeker
            initial_vault = round(float(np.random.uniform(35000, 95000)), 2)
            noise_feature = 1
            
        profiles.append({
            "account_id": acc_id,
            "cf_user_id": user_key,
            "monthly_salary": round(salary, 2),
            "avg_daily_spend": round(avg_daily_spend, 2),
            "min_balance_eom": round(min_balance_eom, 2),
            "liquidity_ratio": round(liquidity_ratio, 4),
            "discretionary_ratio": round(discretionary_ratio, 4),
            "initial_vault_savings": initial_vault,
            "high_yield_intent": noise_feature
        })
        
    df_prof = pd.DataFrame(profiles)
    return df_prof

def train_behavioral_clustering():
    df_prof = extract_user_behavior()
    
    features = [
        "monthly_salary", "avg_daily_spend", "liquidity_ratio",
        "discretionary_ratio", "initial_vault_savings", "high_yield_intent"
    ]
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(df_prof[features])
    
    kmeans = KMeans(n_clusters=2, random_state=42, n_init=10)
    clusters = kmeans.fit_predict(X_scaled)
    
    df_prof["cluster_id"] = clusters
    
    # Identify which cluster has higher savings/yield intent
    mean_savings_0 = df_prof[df_prof["cluster_id"] == 0]["initial_vault_savings"].mean()
    mean_savings_1 = df_prof[df_prof["cluster_id"] == 1]["initial_vault_savings"].mean()
    
    high_yield_cluster = 0 if mean_savings_0 > mean_savings_1 else 1
    
    # Assign Pitch Persona Names
    persona_map = {
        high_yield_cluster: {
            "name": "High-Yield Seeker Novice",
            "name_th": "ผู้แสวงหาผลตอบแทนสูง (เสี่ยง Ponzi/แชร์ลูกโซ่สูง)",
            "description": "มีเงินเก็บก้อนแรก 30,000–100,000 บาท มักมองหาผลตอบแทนเร็ว แต่ความเข้าใจความเสี่ยงจำกัด เสี่ยงต่อแอปหลอกลงทุน",
            "micro_sweep_rate": 0.12, # 12% auto-sweep
            "scam_vulnerability": "HIGH",
            "vault_friction_level": "MAXIMUM"
        },
        1 - high_yield_cluster: {
            "name": "Paycheck-to-Paycheck Spender",
            "name_th": "มนุษย์เงินเดือนชนเดือน (สภาพคล่องจำกัดปลายเดือน)",
            "description": "รายได้ 18,000–35,000 บาท สภาพคล่องตึงตัวปลายเดือน ต้องการระบบออมเศษเงินอัตโนมัติแบบ Zero-Manual Effort",
            "micro_sweep_rate": 0.06, # 6% auto-sweep
            "scam_vulnerability": "MODERATE",
            "vault_friction_level": "FLEXIBLE"
        }
    }
    
    df_prof["persona_name"] = df_prof["cluster_id"].apply(lambda c: persona_map[c]["name"])
    df_prof["persona_th"] = df_prof["cluster_id"].apply(lambda c: persona_map[c]["name_th"])
    df_prof["persona_desc"] = df_prof["cluster_id"].apply(lambda c: persona_map[c]["description"])
    df_prof["recommended_sweep_pct"] = df_prof["cluster_id"].apply(lambda c: persona_map[c]["micro_sweep_rate"])
    df_prof["scam_vulnerability"] = df_prof["cluster_id"].apply(lambda c: persona_map[c]["scam_vulnerability"])
    df_prof["vault_friction_level"] = df_prof["cluster_id"].apply(lambda c: persona_map[c]["vault_friction_level"])
    
    # Save model and artifacts
    joblib.dump(kmeans, "models/behavioral_kmeans.pkl")
    joblib.dump(scaler, "models/behavioral_scaler.pkl")
    df_prof.to_csv("data/user_behavioral_profiles.csv", index=False)
    
    print("=== Behavioral Clustering Complete ===")
    print(df_prof["persona_name"].value_counts(normalize=True).apply(lambda x: f"{x*100:.1f}%"))
    print("Saved profiles to data/user_behavioral_profiles.csv")
    print("Saved models to models/behavioral_kmeans.pkl and models/behavioral_scaler.pkl")

if __name__ == "__main__":
    train_behavioral_clustering()
