import React, { useRef } from 'react';
import { Smartphone, ShieldCheck, RefreshCw, Maximize2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SimulatorPage() {
  const iframeRef = useRef(null);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto space-y-4">
      {/* Top Toolbar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="กลับสู่หน้าแรก"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white">
                  K PLUS Mobile &amp; SecOps Simulator
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Live Simulator</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                ระบบจำลองแอปพลิเคชันมือถือ K PLUS และศูนย์บัญชาการตรวจจับบัญชีม้า Real-time
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>รีเฟรช</span>
          </button>
          <a
            href="/simulator.html"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>เปิดเต็มหน้าจอ</span>
          </a>
        </div>
      </div>

      {/* Simulator Viewport Container */}
      <div className="w-full h-[calc(100vh-180px)] min-h-[750px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#080C14] relative">
        <iframe
          ref={iframeRef}
          src="/simulator.html"
          title="K-Sentinel & WealthPilot Platform Simulator"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
