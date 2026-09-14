# K-Sentinel & WealthPilot — Modern React 18 & React Router 6 Application

Frontend พัฒนาด้วย **React 18, React Router v6, Tailwind CSS, Vite, และ Lucide Icons** ตามมาตรฐาน Industrial FinTech Single-Page Application (SPA)

---

## 🧭 เส้นทาง URL และ Routing System (React Router 6)

ระบบจัดการ Routing แบบ Declarative ด้วย `react-router-dom` v6 พร้อมรองรับ Client-Side Navigation, Active Link Highlighting, และ Smooth ScrollToTop:

| Path URL | Component หน้าหลัก | รายละเอียดฟังก์ชัน |
| :--- | :--- | :--- |
| `/` | `HomePage.jsx` | หน้าแรก Overview รวบรวม Hero, Modular Navigation Cards, Live Preview ทั้ง 2 โซลูชัน |
| `/wealthpilot` | `WealthPilotPage.jsx` | เจาะลึกระบบ WealthPilot: Safe-to-Spend Gauge, Micro-Sweeping Vault, 3 กลไกการเงิน |
| `/sentinel` | `SentinelPage.jsx` | เจาะลึกระบบ K-Sentinel: Scam Shield Card, XAI Counterfactual, Benchmark SLA Table (<80ms) |
| `/architecture` | `ArchitecturePage.jsx` | สถาปัตยกรรม Two-Tier Low-Latency ML Pipeline (Kafka, PyG RGCN, Redis, ONNX Runtime) |
| `/personas` | `PersonasPage.jsx` | วิเคราะห์กลุ่มลูกค้า First Jobber 2 กลุ่มหลัก พร้อมสถิติผลกระทบทางธุรกิจ (CASA +1.2-2.0B THB) |
| `*` | `NotFoundPage.jsx` | หน้า 404 สไตล์ Cyber-Fintech พร้อมปุ่มนำทางกลับหน้าแรก |

---

## 📦 โครงสร้างโปรเจกต์ React (Architecture)

```
frontend/react-app/
├── index.html                   # HTML Entry Point พร้อมโหลด Font IBM Plex Sans Thai
├── package.json                 # React 18, React Router 6, Lucide React, Vite, Tailwind
├── vite.config.js               # Vite Configuration พร้อม Proxy ไปยัง FastAPI Backend (Port 8000)
├── tailwind.config.js           # KBank Theme Colors (#00A950, Emerald, Dark Slate)
├── postcss.config.js            # PostCSS Autoprefixer Setup
├── public/                      # Static Assets สำหรับ Vite Dev & Production Build
│   └── static/img/              # 3D Fintech Visuals & Hero Banners
└── src/
    ├── main.jsx                 # Entry Point พร้อม BrowserRouter
    ├── App.jsx                  # Route Declarations & Global Modal State
    ├── index.css                # Glassmorphic Utilities & Tailwind Directives
    ├── pages/                   # หน้าเพจที่ผูกกับ React Router
    │   ├── HomePage.jsx
    │   ├── WealthPilotPage.jsx
    │   ├── SentinelPage.jsx
    │   ├── ArchitecturePage.jsx
    │   ├── PersonasPage.jsx
    │   └── NotFoundPage.jsx
    └── components/              # Reusable UI Components
        ├── Navbar.jsx           # Responsive Header พร้อม NavLink Active State & Mobile Menu
        ├── Hero.jsx             # Hero Section พร้อม Dual CTA & 3D Visual
        ├── ScrollToTop.jsx      # เลื่อนขึ้นบนสุดอัตโนมัติเมื่อเปลี่ยน Route
        ├── SafeToSpendGauge.jsx # Interactive Gauge คำนวณเงินใช้วันต่อวัน
        ├── MicroSweepVault.jsx  # Toggle กวาดเงินทอนเข้าบัญชีดอกเบี้ยสูง 1.50%
        ├── ScamShieldCard.jsx   # XAI & Pre-Transaction Screening Card
        ├── ScamShieldModal.jsx  # Cool-Off Timer & WebRTC Face Liveness Modal
        ├── ArchitecturePipeline.jsx # Pipeline Diagram
        ├── PersonaComparison.jsx    # Before/After Storyboard
        └── Footer.jsx
```

---

## 🚀 วิธีการรันและการ Build

### 1. โหมดทดสอบการพัฒนา (Vite Dev Server with HMR)
```bash
cd frontend/react-app
npm install
npm run dev
```
เปิดบราวเซอร์ที่: **http://localhost:5173**  
*(Vite Dev Server มีการทำ Proxy คำขอ `/api`, `/predict`, `/forecast` ส่งต่อไปยัง FastAPI Backend ที่พอร์ต 8000 อัตโนมัติ)*

### 2. โหมด Production Build
```bash
npm run build
```
ผลลัพธ์การ Build จะถูก Bundle ลงในโฟลเดอร์ `dist/` โดยผ่านการ Minify และ Optimize ขนาดไฟล์เรียบร้อยแล้ว

### 3. ตรวจสอบผลลัพธ์ก่อน Deploy (Preview)
```bash
npm run preview
```
