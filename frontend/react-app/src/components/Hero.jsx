import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Wallet, ShieldAlert, Zap, Lock, CheckCircle } from 'lucide-react';

export default function Hero({ onOpenScamModal }) {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>AI Copilot รุ่นใหม่บน K PLUS สำหรับกลุ่ม First Jobbers</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Autonomous Wealth <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A950] via-emerald-400 to-teal-300">
                &amp; Real-Time Scam Shield
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              หยุดปัญหาวงจรเงินเดือนชนเดือนด้วยระบบคำนวณเงินใช้วันต่อวัน พร้อมเกราะสกัดกั้นภัยบัญชีม้าด้วยโมเดลกราฟ AI ความเร็วสูง <strong>&lt; 80ms</strong> ปกป้องเงินสะสมก้อนแรกของคนรุ่นใหม่อย่างอัจฉริยะ
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/wealthpilot"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#00A950] to-[#059669] hover:from-[#008F43] hover:to-[#047857] text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
              >
                <Wallet className="w-5 h-5" />
                <span>สำรวจฟีเจอร์ WealthPilot</span>
              </Link>

              <button
                onClick={onOpenScamModal}
                className="inline-flex items-center justify-center gap-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border border-white/10 hover:border-red-500/40 px-7 py-3.5 rounded-xl font-bold text-base transition-all hover:scale-105"
              >
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>ทดสอบ K-Sentinel สกัดโกง</span>
              </button>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>ตอบสนองภายใน <strong>7.29ms</strong> (SLA &lt;80ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" />
                <span>Protected Vault ดอกเบี้ย <strong>1.50%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>แม่นยำ <strong>&gt; 85%</strong> Counterfactual XAI</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#00A950]/30 to-emerald-500/20 rounded-3xl blur-2xl opacity-60"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900/90">
                <img
                  src="/static/img/hero_fintech_phones.jpg"
                  alt="K-Sentinel & WealthPilot 3D Experience"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-slate-900/95 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="font-semibold text-white">Live Production Shield</span>
                  </div>
                  <span className="font-mono text-emerald-400">P99 Latency: 7.29ms</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
