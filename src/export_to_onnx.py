import lightgbm as lgb
from onnxmltools import convert_lightgbm
from onnxmltools.convert.common.data_types import FloatTensorType
import onnxruntime as rt
import numpy as np

# 1. แปลง K-Sentinel Model
# ฟีเจอร์รวม: 5 telemetry + 3 auth dummy + 16 graph embeddings = 24 features
sentinel_model = lgb.Booster(model_file="models/k_sentinel_lgbm.txt")
initial_type_sentinel = [("float_input", FloatTensorType([None, 24]))]

onnx_sentinel = convert_lightgbm(
    sentinel_model,
    initial_types=initial_type_sentinel,
    target_opset=14
)

with open("models/k_sentinel.onnx", "wb") as f:
    f.write(onnx_sentinel.SerializeToString())
print("Exported: models/k_sentinel.onnx")

# 2. แปลง WealthPilot Model
# ฟีเจอร์รวม: 6 cashflow features
wealth_model = lgb.Booster(model_file="models/wealthpilot_lgbm.txt")
initial_type_wealth = [("float_input", FloatTensorType([None, 6]))]

onnx_wealth = convert_lightgbm(
    wealth_model,
    initial_types=initial_type_wealth,
    target_opset=14
)

with open("models/wealthpilot.onnx", "wb") as f:
    f.write(onnx_wealth.SerializeToString())
print("Exported: models/wealthpilot.onnx")

# ทดสอบรันโมเดลผ่าน ONNX Runtime
sess = rt.InferenceSession("models/k_sentinel.onnx")
dummy_input = np.random.rand(1, 24).astype(np.float32)
input_name = sess.get_inputs()[0].name
label_name = sess.get_outputs()[1].name # ความน่าจะเป็น
pred_onx = sess.run([label_name], {input_name: dummy_input})[0]
print("ONNX Inference Verification Success. Sample output:", pred_onx)