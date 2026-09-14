import torch
import torch.nn as nn
import torch.nn.functional as F
import pandas as pd
import numpy as np
import lightgbm as lgb
from torch_geometric.data import Data
from torch_geometric.nn import RGCNConv
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, classification_report

# ==============================================================================
# TIER 1: HETEROGENEOUS/RELATIONAL GCN FOR NODE EMBEDDINGS
# ==============================================================================
df_users = pd.read_csv("data/sentinel_users_v2.csv")
df_tx = pd.read_csv("data/sentinel_transactions_v2.csv")

# Map account_id เป็น index
user_map = {acc: i for i, acc in enumerate(df_users["account_id"])}
src_idx = df_tx["source_id"].map(user_map).values
dst_idx = df_tx["target_id"].map(user_map).values

edge_index = torch.tensor(np.vstack([src_idx, dst_idx]), dtype=torch.long)
edge_type = torch.tensor(df_tx["is_scam"].values, dtype=torch.long)

# ฟีเจอร์ของ Node: [age_norm, kyc_level, is_promptpay, log_velocity]
age_norm = (df_users["account_age_days"] / 2000.0).values
kyc = df_users["kyc_level"].values
promptpay = df_users["is_promptpay_linked"].values
log_vel = np.log1p(df_users["avg_inflow_velocity_sec"].values)
log_vel_norm = log_vel / log_vel.max()

node_features = np.column_stack([age_norm, kyc, promptpay, log_vel_norm])
x = torch.tensor(node_features, dtype=torch.float)
y_mule = torch.tensor(df_users["is_mule"].values, dtype=torch.long)

graph_data = Data(x=x, edge_index=edge_index, edge_type=edge_type, y=y_mule)

class KSentinelRGCN(nn.Module):
    def __init__(self, in_dim, hidden_dim, emb_dim, num_rels):
        super().__init__()
        self.conv1 = RGCNConv(in_dim, hidden_dim, num_relations=num_rels)
        self.conv2 = RGCNConv(hidden_dim, emb_dim, num_relations=num_rels)
        self.head = nn.Linear(emb_dim, 2)

    def forward(self, x, edge_index, edge_type):
        h = F.relu(self.conv1(x, edge_index, edge_type))
        h = F.dropout(h, p=0.2, training=self.training)
        embeddings = self.conv2(h, edge_index, edge_type)
        out = self.head(F.relu(embeddings))
        return out, embeddings

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
rgcn = KSentinelRGCN(in_dim=4, hidden_dim=32, emb_dim=16, num_rels=2).to(device)
graph_data = graph_data.to(device)

optimizer = torch.optim.Adam(rgcn.parameters(), lr=0.01, weight_decay=1e-4)
criterion = nn.CrossEntropyLoss()

# เทรน RGCN
rgcn.train()
for epoch in range(1, 101):
    optimizer.zero_grad()
    out, _ = rgcn(graph_data.x, graph_data.edge_index, graph_data.edge_type)
    loss = criterion(out, graph_data.y)
    loss.backward()
    optimizer.step()

# แคช Embeddings
rgcn.eval()
with torch.no_grad():
    _, embeddings = rgcn(graph_data.x, graph_data.edge_index, graph_data.edge_type)

emb_matrix = embeddings.cpu().numpy()
df_emb = pd.DataFrame(emb_matrix, columns=[f"target_emb_{i}" for i in range(16)])
df_emb["account_id"] = df_users["account_id"]
emb_lookup = df_emb.set_index("account_id")
# บันทึกลงโฟลเดอร์ data/
df_emb.to_csv("data/sentinel_node_embeddings.csv", index=False)

# ==============================================================================
# TIER 2: REAL-TIME CONTEXT & TELEMETRY CLASSIFIER (LIGHTGBM)
# ==============================================================================
# รวม Telemetry สดเข้ากับ Embeddings ของบัญชีปลายทาง
target_embs = df_tx["target_id"].map(lambda x: emb_lookup.loc[x].values).tolist()
df_target_embs = pd.DataFrame(target_embs, columns=[f"target_emb_{i}" for i in range(16)])

# One-hot สำหรับ auth_factor_used
auth_dummies = pd.get_dummies(df_tx["auth_factor_used"], prefix="auth", drop_first=False)

telemetry_features = [
    "amount", "is_first_time_transfer", "device_switch_last_24h",
    "session_duration_sec", "ratio_to_daily_avg"
]

X = pd.concat([
    df_tx[telemetry_features],
    auth_dummies,
    df_target_embs
], axis=1)

y = df_tx["is_scam"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# เทรน LightGBM Classifier
lgbm_model = lgb.LGBMClassifier(
    n_estimators=150,
    learning_rate=0.05,
    max_depth=6,
    num_leaves=31,
    random_state=42
)
lgbm_model.fit(X_train, y_train)

y_pred_proba = lgbm_model.predict_proba(X_test)[:, 1]
print("=== K-Sentinel Tier 2 Performance ===")
print("ROC-AUC Score:", roc_auc_score(y_test, y_pred_proba))

# เซฟโมเดลสำหรับ Production Serving
lgbm_model.booster_.save_model("models/k_sentinel_lgbm.txt")
print("Saved LightGBM model to models/k_sentinel_lgbm.txt")