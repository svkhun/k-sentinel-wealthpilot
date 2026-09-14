import React from 'react';
import { Share2, User, AlertTriangle, Eye, AlertOctagon, Timer } from 'lucide-react';

export default function ScamShieldCard({ onOpenScamModal }) {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-5xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-red-500/10 border border-red-500/30 px-3.5 py-1.5 rounded-full">
          Sub-80ms Graph AI Protection
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight whitespace-normal md:whitespace-nowrap">
          K-Sentinel: เกราะสกัดกั้นบัญชีม้าความเร็วแสง
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-4xl mx-auto leading-relaxed">
          สแกนความสัมพันธ์เครือข่ายบัญชีปลายทางแบบ Real-time วิเคราะห์โครงสร้างฟอกเงินและบัญชีม้าได้ทันที พร้อมอธิบายเหตุผลด้วย Counterfactual XAI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 glass-card rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Relational Graph Screening</h3>
                <p className="text-xs text-slate-400">ตรวจจับเส้นทางเงินเชื่อมโยงบัญชีม้าชั้นที่ 1 ถึง 3</p>
              </div>
            </div>
            <span className="font-mono text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              Latency: 7.29ms
            </span>
          </div>

          <div className="relative h-48 rounded-2xl bg-[#090E1A] border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="relative z-10 flex items-center justify-between w-4/5">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/80 border border-emerald-400 flex items-center justify-center text-white shadow-lg">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-xs text-slate-300 mt-2 font-medium">คุณ (โอนเงิน)</span>
              </div>

              <div className="flex-1 mx-4 relative">
                <div className="h-0.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 w-full"></div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 px-2 py-0.5 rounded text-[10px] text-amber-400 font-mono border border-amber-500/30">
                  Scan &lt;80ms
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-red-600/80 border border-red-400 flex items-center justify-center text-white shadow-lg animate-pulse">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <span className="text-xs text-red-400 mt-2 font-bold">บัญชีม้าต้องสงสัย</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            ระบบตรวจสอบ Graph Topology แบบ Real-time บน Triton ONNX Server สกัดกั้นก่อนส่งคำสั่งตัดเงิน
          </p>
        </div>

        <div className="lg:col-span-6 glass-card rounded-3xl p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Counterfactual XAI &amp; Cool-Off</h3>
                <p className="text-xs text-slate-400">อธิบายเหตุผลภาษาคน และหน่วงเวลาดึงสติ 15 นาที</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 text-sm space-y-2">
              <div className="font-bold text-red-400 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4" />
                <span>ตรวจพบสัญญาณหลอกลวงระดับสูง (High Risk Alert)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                1. บัญชีปลายทางเพิ่งเปิดใช้งานได้เพียง 2 วัน<br />
                2. มีเงินหมุนเวียนโอนเข้าและถอนออกหมดภายใน 30 วินาที<br />
                3. มียอดโอนสูงผิดปกติจากพฤติกรรมเดิมของคุณ (Anomalous Spike)
              </p>
            </div>
          </div>

          <button
            onClick={onOpenScamModal}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-base shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>ทดลองเปิดหน้าต่างแจ้งเตือน (Interactive Modal)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
