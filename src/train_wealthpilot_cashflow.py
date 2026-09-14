import pandas as pd
import numpy as np
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

df_cf = pd.read_csv("data/wealthpilot_cashflow_v2.csv")
df_cf["timestamp"] = pd.to_datetime(df_cf["timestamp"])

# สกัดยอดใช้จ่ายที่ไม่ใช่เงินเดือน
df_spend = df_cf[df_cf["category"] != "salary"].copy()
df_spend["abs_amount"] = df_spend["amount"].abs()

# สรุปยอดจ่ายรายวันต่อ User
daily_user_spend = df_spend.groupby(["user_id", "timestamp"]).agg({
    "abs_amount": "sum",
    "days_to_payday": "first",
    "fixed_due_in_7d": "first",
    "is_weekend": "first"
}).reset_index()

# สร้าง Lagged Features (ยอดจ่ายย้อนหลัง 1, 3, 7 วัน)
daily_user_spend = daily_user_spend.sort_values(["user_id", "timestamp"])
for lag in [1, 3, 7]:
    daily_user_spend[f"spend_lag_{lag}"] = daily_user_spend.groupby("user_id")["abs_amount"].shift(lag)

daily_user_spend = daily_user_spend.dropna().reset_index(drop=True)

# Train/Test Split ตามเวลา
features = ["days_to_payday", "fixed_due_in_7d", "is_weekend", "spend_lag_1", "spend_lag_3", "spend_lag_7"]
target = "abs_amount"

X = daily_user_spend[features]
y = daily_user_spend[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

cf_model = lgb.LGBMRegressor(n_estimators=100, learning_rate=0.05, max_depth=5, random_state=42)
cf_model.fit(X_train, y_train)

preds = cf_model.predict(X_test)
print("\n=== WealthPilot Cashflow Predictor ===")
print("MAE on Daily Expenditure:", round(mean_absolute_error(y_test, preds), 2), "THB")
cf_model.booster_.save_model("models/wealthpilot_lgbm.txt")