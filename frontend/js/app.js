// ==============================================================================
// GLOBAL STATE & VARIABLES
// ==============================================================================
let currentAccountId = "ACC_0100";
let cashflowChart = null;
let latencyChart = null;
let muleNetwork = null;
let coolOffTimerInterval = null;
let coolOffSecondsLeft = 900; // 15 minutes = 900 seconds
let webcamStream = null;
let currentPendingTxPayload = null;

// ==============================================================================
// INITIALIZATION ON PAGE LOAD
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Start live clock
  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  // Initialize Users Dropdown
  initUserSelector();

  // Load initial K PLUS View Data
  loadAllUserData(currentAccountId);

  // Initialize Latency Telemetry Chart
  initLatencyChart();

  // Initialize CASA Calculation
  recalcCasaImpact();
});

// Update Clock
function updateLiveClock() {
  const clockEl = document.getElementById("mobile-live-clock");
  if (clockEl) {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
}

// ==============================================================================
// NAVIGATION SYSTEM
// ==============================================================================
function switchView(viewName) {
  const views = ["mobile", "secops", "casa", "telemetry"];
  
  views.forEach(v => {
    const section = document.getElementById(`view-${v}`);
    const navBtn = document.getElementById(`nav-btn-${v}`);
    
    if (v === viewName) {
      section.classList.remove("hidden");
      navBtn.classList.remove("text-slate-300", "hover:text-white");
      navBtn.classList.add("bg-emerald-600", "text-white", "shadow-sm");
    } else {
      section.classList.add("hidden");
      navBtn.classList.add("text-slate-300", "hover:text-white");
      navBtn.classList.remove("bg-emerald-600", "text-white", "shadow-sm");
    }
  });

  if (viewName === "secops") {
    loadSecOpsDashboard();
  } else if (viewName === "telemetry") {
    if (latencyChart) latencyChart.update();
  }

  if (window.lucide) lucide.createIcons();
}

function switchMobileTab(tabName) {
  const tabSts = document.getElementById("mobile-tab-sts");
  const tabTransfer = document.getElementById("mobile-tab-transfer");
  const btnSts = document.getElementById("m-tab-btn-sts");
  const btnTransfer = document.getElementById("m-tab-btn-transfer");

  if (tabName === "sts") {
    tabSts.classList.remove("hidden");
    tabTransfer.classList.add("hidden");
    btnSts.classList.add("bg-emerald-600", "text-white");
    btnSts.classList.remove("text-slate-300");
    btnTransfer.classList.remove("bg-emerald-600", "text-white");
    btnTransfer.classList.add("text-slate-300");
  } else {
    tabSts.classList.add("hidden");
    tabTransfer.classList.remove("hidden");
    btnTransfer.classList.add("bg-emerald-600", "text-white");
    btnTransfer.classList.remove("text-slate-300");
    btnSts.classList.remove("bg-emerald-600", "text-white");
    btnSts.classList.add("text-slate-300");
  }
}

// ==============================================================================
// USER PROFILES & WEALTHPILOT ENGINE
// ==============================================================================
function initUserSelector() {
  const selector = document.getElementById("user-selector");
  selector.innerHTML = "";

  const presets = [
    { id: "ACC_0100", label: "ACC_0100 (High-Yield Seeker Novice ~35%)" },
    { id: "ACC_0102", label: "ACC_0102 (Paycheck-to-Paycheck Spender ~65%)" },
    { id: "ACC_0104", label: "ACC_0104 (Paycheck-to-Paycheck Spender ~65%)" },
    { id: "ACC_0106", label: "ACC_0106 (High-Yield Seeker Novice ~35%)" },
    { id: "ACC_0110", label: "ACC_0110 (Paycheck-to-Paycheck Spender ~65%)" }
  ];

  presets.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.label;
    selector.appendChild(opt);
  });
}

function onUserSelectChange(accId) {
  currentAccountId = accId;
  loadAllUserData(accId);
}

async function loadAllUserData(accId) {
  try {
    // 1. Profile
    const profResp = await fetch(`/api/v2/wealthpilot/profile/${accId}`);
    const prof = await profResp.json();
    updateProfileUI(prof);

    // 2. Safe-to-Spend
    const stsResp = await fetch(`/api/v2/wealthpilot/safe-to-spend/${accId}`);
    const sts = await stsResp.json();
    updateSafeToSpendUI(sts);

    // 3. 30-Day Forecast
    const fcResp = await fetch(`/api/v2/wealthpilot/forecast-30d/${accId}`);
    const fc = await fcResp.json();
    renderCashflowForecast(fc);

  } catch (err) {
    console.error("Error loading user data:", err);
  }
}

function updateProfileUI(prof) {
  document.getElementById("user-display-name").textContent = `First Jobber • ${prof.account_id}`;
  document.getElementById("card-acc-num").textContent = `${prof.account_id} •••• 4291`;
  document.getElementById("card-main-balance").textContent = `฿ ${prof.main_balance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  document.getElementById("card-monthly-salary").textContent = `฿ ${prof.monthly_salary.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  
  document.getElementById("vault-balance-display").textContent = `฿ ${prof.vault_balance.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  document.getElementById("vault-swept-total").textContent = `฿ ${prof.total_swept.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

  // Persona Badge
  const p = prof.persona;
  const isPaycheck = p.cluster_id === 1;
  document.getElementById("persona-title").textContent = `${p.name} (~${isPaycheck ? '65%' : '35%'} of First Jobbers)`;
  document.getElementById("persona-desc").textContent = p.description;
  
  const indicator = document.getElementById("persona-indicator");
  indicator.className = `w-3 h-3 rounded-full ${isPaycheck ? 'bg-sky-400' : 'bg-emerald-400'}`;
}

function updateSafeToSpendUI(sts) {
  document.getElementById("sts-daily-limit").textContent = `฿ ${sts.daily_safe_limit.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  document.getElementById("sts-spent-today").textContent = `฿ ${sts.spent_today.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  document.getElementById("sts-remaining-today").textContent = `฿ ${sts.remaining_today.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  document.getElementById("sts-burn-rate").textContent = `${sts.burn_rate_pct}%`;
  document.getElementById("sts-days-to-payday").textContent = sts.days_to_payday;

  // Progress Bar
  const progFill = document.getElementById("sts-progress-fill");
  progFill.style.width = `${Math.min(100, sts.burn_rate_pct)}%`;
  if (sts.burn_rate_pct > 100) {
    progFill.className = "bg-rose-500 h-full rounded-full transition-all duration-500";
  } else if (sts.burn_rate_pct > 80) {
    progFill.className = "bg-amber-500 h-full rounded-full transition-all duration-500";
  } else {
    progFill.className = "bg-emerald-500 h-full rounded-full transition-all duration-500";
  }

  // Status Badge
  const badge = document.getElementById("sts-status-badge");
  badge.textContent = sts.status;
  if (sts.status === "OVERSPENT") {
    badge.className = "bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[11px] px-2 py-0.5 rounded-full font-medium";
  } else if (sts.status === "CAUTION") {
    badge.className = "bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] px-2 py-0.5 rounded-full font-medium";
  } else {
    badge.className = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] px-2 py-0.5 rounded-full font-medium";
  }

  // Breakdown
  const bk = sts.breakdown;
  document.getElementById("bk-rent").textContent = `฿ ${bk.rent.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  document.getElementById("bk-debt").textContent = `฿ ${bk.debt_emi.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  document.getElementById("bk-util").textContent = `฿ ${bk.utilities.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  document.getElementById("bk-buffer").textContent = `฿ ${bk.emergency_buffer.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

  document.getElementById("nudge-message-display").textContent = sts.nudge_message;
}

// 30-Day Liquidity Forecast Chart (Chart.js)
function renderCashflowForecast(fc) {
  const ctx = document.getElementById("cashflow-forecast-chart").getContext("2d");
  
  const labels = fc.timeline.map(t => t.date.slice(5)); // MM-DD
  const balanceData = fc.timeline.map(t => t.projected_balance);
  const spendData = fc.timeline.map(t => t.predicted_spend);

  document.getElementById("forecast-summary-text").textContent = fc.projection_summary;
  const pill = document.getElementById("forecast-health-pill");
  pill.textContent = fc.liquidity_health === "HEALTHY" ? "Healthy Runway" : "Deficit Risk";
  pill.className = fc.liquidity_health === "HEALTHY" ? "text-emerald-400 font-bold" : "text-rose-400 font-bold";

  if (cashflowChart) {
    cashflowChart.destroy();
  }

  cashflowChart = new Chart(ctx, {
    data: {
      labels: labels,
      datasets: [
        {
          type: "line",
          label: "Projected Cash Runway (THB)",
          data: balanceData,
          borderColor: "#00A950",
          backgroundColor: "rgba(0, 169, 80, 0.12)",
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          yAxisID: "y"
        },
        {
          type: "bar",
          label: "Predicted Daily Spend (THB)",
          data: spendData,
          backgroundColor: "rgba(239, 68, 68, 0.45)",
          borderRadius: 4,
          yAxisID: "y1"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#94A3B8", font: { size: 10 } }
        },
        y: {
          position: "left",
          grid: { color: "rgba(255, 255, 255, 0.06)" },
          ticks: {
            color: "#00A950",
            callback: (v) => `฿${(v/1000).toFixed(0)}k`
          }
        },
        y1: {
          position: "right",
          grid: { drawOnChartArea: false },
          ticks: {
            color: "#EF4444",
            callback: (v) => `฿${v}`
          }
        }
      },
      plugins: {
        legend: {
          labels: { color: "#CBD5E1", font: { size: 11 } }
        }
      }
    }
  });
}

// Micro-Sweeping Action
async function triggerMicroSweep() {
  try {
    const resp = await fetch("/api/v2/wealthpilot/micro-sweep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_id: currentAccountId })
    });
    const res = await resp.json();
    if (resp.ok) {
      showToast("success", res.message);
      loadAllUserData(currentAccountId);
    } else {
      showToast("error", res.detail || "Cannot execute micro-sweep");
    }
  } catch (err) {
    showToast("error", "Failed to connect to WealthPilot API");
  }
}

// Protected Vault Withdrawal
async function promptVaultWithdrawal() {
  try {
    const resp = await fetch("/api/v2/wealthpilot/vault/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_id: currentAccountId,
        amount: 1000.0,
        intent_reason: "Emergency expenditure",
        bypass_cooldown: false
      })
    });
    const res = await resp.json();
    if (res.status === "FRICTION_CHALLENGE_REQUIRED") {
      alert(`🛡️ Heightened Withdrawal Friction Triggered:\n\n${res.message}\n\nมาตรการนี้ป้องกันไม่ให้ First Jobber ถอนเงินก้อนไปโอนให้มิจฉาชีพ`);
    } else {
      showToast("success", res.message);
      loadAllUserData(currentAccountId);
    }
  } catch (err) {
    showToast("error", "Error connecting to Vault API");
  }
}

// ==============================================================================
// K-SENTINEL PRE-TRANSACTION TRANSFER SCREENING
// ==============================================================================
let selectedTargetAccount = "ACC_0105";

function selectRecipientPreset(type) {
  const btnSafe = document.getElementById("btn-rcp-safe");
  const btnMule = document.getElementById("btn-rcp-mule");
  const amtInput = document.getElementById("tx-input-amount");
  const durInput = document.getElementById("tx-input-duration");

  if (type === "safe") {
    selectedTargetAccount = "ACC_0105";
    btnSafe.className = "p-2.5 rounded-xl border border-emerald-500/50 bg-emerald-950/40 text-left transition-all";
    btnMule.className = "p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-left transition-all opacity-60";
    amtInput.value = "650";
    durInput.value = "45";
  } else {
    selectedTargetAccount = "ACC_0001";
    btnMule.className = "p-2.5 rounded-xl border border-rose-500/50 bg-rose-950/40 text-left transition-all";
    btnSafe.className = "p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-left transition-all opacity-60";
    amtInput.value = "35000";
    durInput.value = "10";
  }
}

async function executeTransferEvaluation() {
  const amount = parseFloat(document.getElementById("tx-input-amount").value);
  const duration = parseInt(document.getElementById("tx-input-duration").value);
  const auth = document.getElementById("tx-input-auth").value;

  const payload = {
    source_account_id: currentAccountId,
    target_account_id: selectedTargetAccount,
    amount: amount,
    is_first_time_transfer: selectedTargetAccount === "ACC_0001" ? 1 : 0,
    device_switch_last_24h: 0,
    session_duration_sec: duration,
    ratio_to_daily_avg: parseFloat((amount / 650.0).toFixed(2)),
    auth_factor_used: auth
  };

  currentPendingTxPayload = payload;

  try {
    const resp = await fetch("/api/v2/sentinel/evaluate-transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const res = await resp.json();

    if (res.status === "APPROVED") {
      showToast("success", `✅ ทำรายการสำเร็จ (APPROVED) • Latency: ${res.latency_ms} ms`);
    } else {
      openSentinelModal(res);
    }
  } catch (err) {
    showToast("error", "K-Sentinel API Error: Check if server is running");
  }
}

function openSentinelModal(res) {
  const modal = document.getElementById("modal-sentinel-alert");
  const tierBadge = document.getElementById("modal-alert-tier");
  const title = document.getElementById("modal-alert-title");
  const msg = document.getElementById("modal-alert-msg");
  const xai = document.getElementById("modal-alert-xai");
  const actionsContainer = document.getElementById("modal-alert-actions");

  tierBadge.textContent = res.risk_tier;
  msg.textContent = res.actionable_warning;
  xai.textContent = res.counterfactual_message;

  actionsContainer.innerHTML = "";

  if (res.status === "STEP_UP_REQUIRED") {
    title.textContent = "⚠️ ระงับชั่วคราว: ต้องยืนยันตัวตนขั้นสูง (Step-Up)";
    tierBadge.className = "text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full";

    const faceBtn = document.createElement("button");
    faceBtn.className = "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-xs";
    faceBtn.innerHTML = `<span>📸 สแกนใบหน้าสด (Biometric Face Liveness)</span>`;
    faceBtn.onclick = () => {
      closeSentinelModal();
      startFaceLivenessScan();
    };
    actionsContainer.appendChild(faceBtn);

  } else {
    title.textContent = "🚨 สกัดกั้นรายการฉุกเฉิน (CRITICAL SCAM TRAP)";
    tierBadge.className = "text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full";

    const coolBtn = document.createElement("button");
    coolBtn.className = "w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 text-xs";
    coolBtn.innerHTML = `<span>⏱️ เปิดมาตรการ Cool-Off 15 นาที</span>`;
    coolBtn.onclick = () => {
      closeSentinelModal();
      openCoolOffModal();
    };
    actionsContainer.appendChild(coolBtn);
  }

  modal.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeSentinelModal() {
  document.getElementById("modal-sentinel-alert").classList.add("hidden");
}

// ==============================================================================
// BIOMETRIC FACE LIVENESS SCAN (WEBRTC)
// ==============================================================================
async function startFaceLivenessScan() {
  const modal = document.getElementById("modal-camera-scan");
  const videoEl = document.getElementById("webcam-video");
  const statusEl = document.getElementById("camera-status-text");
  const barEl = document.getElementById("camera-progress-bar");

  modal.classList.remove("hidden");
  statusEl.textContent = "กำลังเชื่อมต่อกล้องหน้า...";
  barEl.style.width = "20%";

  try {
    webcamStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" }
    });
    videoEl.srcObject = webcamStream;
    statusEl.textContent = "ตรวจพบใบหน้า • กำลังวิเคราะห์ Liveness (กระพริบตา)...";
  } catch (err) {
    console.warn("Camera access denied or not available, using simulated visual frame:", err);
    statusEl.textContent = "จำลองการสแกนใบหน้า Liveness...";
  }

  // Animate progress to 100% over 2.5 seconds
  setTimeout(() => { barEl.style.width = "60%"; }, 1000);
  setTimeout(() => { barEl.style.width = "100%"; statusEl.textContent = "ยืนยันอัตลักษณ์สำเร็จ!"; }, 2000);
  setTimeout(() => { simulateFaceScanSuccess(); }, 2600);
}

async function simulateFaceScanSuccess() {
  closeCameraModal();
  try {
    const resp = await fetch("/api/v2/sentinel/verify-face-scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_account_id: currentAccountId,
        target_account_id: selectedTargetAccount,
        amount: currentPendingTxPayload ? currentPendingTxPayload.amount : 1000.0,
        liveness_score: 0.98
      })
    });
    const res = await resp.json();
    showToast("success", `🎉 ${res.message} (Clearance Token: ${res.clearance_token})`);
  } catch (err) {
    showToast("error", "Error verifying face scan");
  }
}

function closeCameraModal() {
  const modal = document.getElementById("modal-camera-scan");
  modal.classList.add("hidden");
  if (webcamStream) {
    webcamStream.getTracks().forEach(track => track.stop());
    webcamStream = null;
  }
}

// ==============================================================================
// 15-MINUTE COOL-OFF COUNTDOWN TIMER
// ==============================================================================
function openCoolOffModal() {
  const modal = document.getElementById("modal-cooloff-timer");
  modal.classList.remove("hidden");
  coolOffSecondsLeft = 900; // Reset to 15:00
  updateCoolOffDisplay();

  if (coolOffTimerInterval) clearInterval(coolOffTimerInterval);
  coolOffTimerInterval = setInterval(() => {
    coolOffSecondsLeft--;
    updateCoolOffDisplay();
    if (coolOffSecondsLeft <= 0) {
      clearInterval(coolOffTimerInterval);
    }
  }, 1000);
}

function updateCoolOffDisplay() {
  const digitsEl = document.getElementById("cooloff-timer-digits");
  const m = Math.floor(coolOffSecondsLeft / 60);
  const s = coolOffSecondsLeft % 60;
  digitsEl.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function closeCoolOffModal() {
  document.getElementById("modal-cooloff-timer").classList.add("hidden");
  if (coolOffTimerInterval) clearInterval(coolOffTimerInterval);
}

// ==============================================================================
// SECOPS DASHBOARD & VIS.JS RELATIONAL MULE GRAPH
// ==============================================================================
async function loadSecOpsDashboard() {
  try {
    // 1. KPIs
    const kpiResp = await fetch("/api/v2/secops/dashboard-kpis");
    const kpis = await kpiResp.json();
    document.getElementById("secops-kpi-total").textContent = `${kpis.total_transactions_monitored.toLocaleString()} รายการ`;
    document.getElementById("secops-kpi-rate").textContent = `${kpis.interception_rate_pct}%`;
    document.getElementById("secops-kpi-prevented").textContent = `฿ ${kpis.prevented_fraud_thb.toLocaleString('en-US', {minimumFractionDigits: 0})}`;
    document.getElementById("secops-kpi-latency").textContent = `${kpis.engine_telemetry.p99_latency_ms} ms`;

    // 2. Vis.js Network Graph
    const graphResp = await fetch("/api/v2/secops/mule-graph?limit_nodes=50");
    const gData = await graphResp.json();
    initVisNetwork(gData);

    // 3. Kafka Live Stream
    const streamResp = await fetch("/api/v2/secops/live-stream?count=10");
    const sData = await streamResp.json();
    renderKafkaStream(sData.events);

  } catch (err) {
    console.error("Error loading SecOps dashboard:", err);
  }
}

function initVisNetwork(gData) {
  const container = document.getElementById("mule-network-container");

  const nodes = new vis.DataSet(
    gData.nodes.map(n => ({
      id: n.id,
      label: n.id,
      color: {
        background: n.color,
        border: "#FFFFFF",
        highlight: { background: "#F59E0B", border: "#FFFFFF" }
      },
      font: { color: "#F8FAFC", size: 11, face: "Inter" },
      size: n.is_mule ? 20 : 12,
      shape: "dot",
      meta: n
    }))
  );

  const edges = new vis.DataSet(
    gData.edges.map(e => ({
      from: e.source,
      to: e.target,
      arrows: "to",
      color: { color: "rgba(148, 163, 184, 0.4)", highlight: "#F59E0B" },
      width: 1.2
    }))
  );

  const data = { nodes: nodes, edges: edges };
  const options = {
    physics: {
      stabilization: true,
      barnesHut: { gravitationalConstant: -3000, springLength: 95 }
    },
    interaction: { hover: true, tooltipDelay: 100 }
  };

  muleNetwork = new vis.Network(container, data, options);

  muleNetwork.on("click", (params) => {
    if (params.nodes.length > 0) {
      const selectedNodeId = params.nodes[0];
      const nodeObj = nodes.get(selectedNodeId);
      if (nodeObj && nodeObj.meta) {
        showNodeInspector(nodeObj.meta);
      }
    }
  });
}

function showNodeInspector(meta) {
  const box = document.getElementById("node-inspector-box");
  box.classList.remove("hidden");
  document.getElementById("insp-account-id").textContent = meta.id;
  document.getElementById("insp-age").textContent = `${meta.account_age_days} วัน`;
  document.getElementById("insp-kyc").textContent = `Level ${meta.kyc_level}`;
  document.getElementById("insp-vel").textContent = `${meta.velocity_sec} วินาที`;

  const badge = document.getElementById("insp-role-badge");
  badge.textContent = meta.role;
  badge.className = meta.is_mule
    ? "px-2 py-0.5 rounded-full font-bold text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30"
    : "px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
}

function renderKafkaStream(events) {
  const container = document.getElementById("kafka-stream-list");
  container.innerHTML = "";

  events.forEach(ev => {
    const isBlocked = ev.verdict.includes("BLOCKED");
    const item = document.createElement("div");
    item.className = "p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex justify-between items-center";
    item.innerHTML = `
      <div>
        <div class="font-mono text-[11px] text-slate-300"><b>${ev.source_id}</b> ➔ <b>${ev.target_id}</b></div>
        <div class="text-[10px] text-slate-400 mt-0.5">฿ ${ev.amount.toLocaleString()} • ${ev.timestamp}</div>
      </div>
      <div class="text-right">
        <span class="${isBlocked ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'} px-2 py-0.5 rounded-full text-[10px] font-bold">
          ${ev.verdict}
        </span>
        <div class="text-[9px] text-slate-400 mt-0.5 font-mono">${ev.latency_ms} ms</div>
      </div>
    `;
    container.appendChild(item);
  });
}

// ==============================================================================
// CASA GROWTH SIMULATOR
// ==============================================================================
function recalcCasaImpact() {
  const adoptRate = parseInt(document.getElementById("slider-adopt").value);
  const sweepAvg = parseInt(document.getElementById("slider-sweep").value);

  document.getElementById("calc-adopt-label").textContent = `${adoptRate}%`;
  document.getElementById("calc-sweep-label").textContent = `฿ ${sweepAvg.toLocaleString()}`;

  const totalFirstJobbers = 3200000;
  const activeUsers = totalFirstJobbers * (adoptRate / 100.0);
  const annualCasaBillion = (activeUsers * sweepAvg * 12) / 1000000000.0;

  document.getElementById("calc-result-annual").textContent = `฿ ${annualCasaBillion.toFixed(2)} พันล้านบาท (Billion THB)`;
  document.getElementById("calc-result-users").textContent = Math.round(activeUsers).toLocaleString();
}

// ==============================================================================
// LATENCY BENCHMARK CHART (CHART.JS)
// ==============================================================================
function initLatencyChart() {
  const ctx = document.getElementById("latency-benchmark-chart");
  if (!ctx) return;

  const latencies = [1.2, 1.4, 1.5, 1.8, 2.1, 2.5, 3.2, 4.18, 4.5, 5.2, 6.08, 7.29];
  const labels = latencies.map((_, i) => `#${(i+1)*15}`);

  latencyChart = new Chart(ctx.getContext("2d"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Measured API Latency (ms)",
          data: latencies,
          borderColor: "#00A950",
          backgroundColor: "rgba(0, 169, 80, 0.15)",
          borderWidth: 2,
          pointRadius: 3,
          fill: true,
          tension: 0.2
        },
        {
          label: "KBTG Banking SLA Target (<80 ms)",
          data: Array(latencies.length).fill(80),
          borderColor: "#EF4444",
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: "rgba(255, 255, 255, 0.05)" },
          ticks: { color: "#94A3B8" }
        },
        y: {
          min: 0,
          max: 95,
          grid: { color: "rgba(255, 255, 255, 0.06)" },
          ticks: {
            color: "#94A3B8",
            callback: (v) => `${v} ms`
          }
        }
      },
      plugins: {
        legend: {
          labels: { color: "#CBD5E1", font: { size: 11 } }
        }
      }
    }
  });
}

// ==============================================================================
// TOAST NOTIFICATION HELPER
// ==============================================================================
function showToast(type, message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast-box ${type === 'error' ? 'border-rose-500' : 'border-emerald-500'}`;
  toast.innerHTML = `
    <span class="text-xs text-white font-medium">${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
