import React, { useState } from 'react';
import { Gauge } from 'lucide-react';

export default function SafeToSpendGauge() {
  const [sliderSpent, setSliderSpent] = useState(320);
  const dailyCap = 1000;
  const safeRemaining = Math.max(0, dailyCap - sliderSpent);
  const percentage = Math.round((safeRemaining / dailyCap) * 100);
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  return (
    <div className="glass-card rounded-3xl p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Safe-to-Spend Dynamic Gauge</h3>
            <p className="text-xs text-slate-400">คำนวณเงินใช้ได้สบายใจวันนี้ (หักค่าห้อง ค่ากิน ค่าบิลแล้ว)</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Active Copilot
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1E293B" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#00A950"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 font-medium">ใช้ได้อีกวันนี้</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-num">
              ฿{safeRemaining.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">{percentage}% คงเหลือ</span>
          </div>
        </div>

        <div className="space-y-3 max-w-xs text-sm">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>งบใช้จ่ายที่จัดสรรต่อวัน:</span>
              <span className="font-semibold text-white">฿{dailyCap.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>ใช้ไปแล้วระหว่างวัน:</span>
              <span className="font-semibold text-amber-400">฿{sliderSpent.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs text-slate-300 font-medium flex justify-between mb-1.5">
              <span>ลองเลื่อนจำลองการใช้จ่ายวันนี้:</span>
              <span className="font-mono text-emerald-400 font-bold">฿{sliderSpent}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="20"
              value={sliderSpent}
              onChange={(e) => setSliderSpent(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00A950]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-white/[0.08]">
        <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5">
          <span className="text-slate-400 block">เงินเดือนหักเก็บทันที</span>
          <span className="font-bold text-white text-sm">฿11,760 (42%)</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5">
          <span className="text-slate-400 block">เงินสำรองฉุกเฉิน</span>
          <span className="font-bold text-teal-400 text-sm">฿15,240</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/50 border border-white/5">
          <span className="text-slate-400 block">เผื่อสิ้นเดือนไม่ช็อต</span>
          <span className="font-bold text-emerald-400 text-sm">100% Safe</span>
        </div>
      </div>
    </div>
  );
}
