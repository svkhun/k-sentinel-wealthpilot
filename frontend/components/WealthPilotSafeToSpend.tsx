import React, { useState } from 'react';
import { Wallet, Lock, Shield, Sparkles } from 'lucide-react';

export interface WealthPilotProps {
  initialDailyLimit?: number;
  initialSpentToday?: number;
  initialVaultBalance?: number;
}

export const WealthPilotSafeToSpend: React.FC<WealthPilotProps> = ({
  initialDailyLimit = 600,
  initialSpentToday = 150,
  initialVaultBalance = 15240
}) => {
  const [microSweepEnabled, setMicroSweepEnabled] = useState(true);
  const [sweptToday, setSweptToday] = useState(120);
  const [vaultBalance, setVaultBalance] = useState(initialVaultBalance);

  const remainingSafe = Math.max(0, initialDailyLimit - initialSpentToday);
  const percentage = Math.round((initialSpentToday / initialDailyLimit) * 100);

  // SVG Progress Ring calculations
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (initialSpentToday / initialDailyLimit) * circumference;

  const handleToggle = () => {
    setMicroSweepEnabled(!microSweepEnabled);
    if (!microSweepEnabled) {
      setSweptToday(prev => prev + 60);
      setVaultBalance(prev => prev + 60);
    }
  };

  return (
    <div className="bg-[#0E1524]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#00A950]/40">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Wallet className="w-5 h-5 text-[#00A950]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00A950] font-mono">
              WealthPilot by K PLUS
            </span>
            <h4 className="text-base font-bold text-white tracking-tight">Daily Safe-to-Spend</h4>
          </div>
        </div>
        <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-semibold font-mono">
          On Track
        </span>
      </div>

      {/* Main Gauge & Values */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-900/60 p-5 rounded-2xl border border-white/[0.06]">
        {/* Apple-like Circular Progress Gauge */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-800"
              fill="transparent"
            />
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke="url(#kbankEmeraldGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              fill="transparent"
            />
            <defs>
              <linearGradient id="kbankEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#00A950" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-extrabold text-white font-mono tracking-tight">฿{remainingSafe}</span>
            <span className="text-[10px] text-slate-400">safe today</span>
          </div>
        </div>

        {/* Breakdown Values */}
        <div className="space-y-2 flex-1 w-full text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>Daily Disposable Limit:</span>
            <span className="font-mono font-bold text-white">฿{initialDailyLimit}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Spent Today:</span>
            <span className="font-mono text-slate-300">฿{initialSpentToday} ({percentage}%)</span>
          </div>
          <div className="flex justify-between items-center text-emerald-400 font-semibold pt-1 border-t border-white/[0.06]">
            <span>Remaining Pool:</span>
            <span className="font-mono font-bold">฿{remainingSafe}.00</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 leading-tight italic">
            "No manual budgeting needed—auto-calculated after fixed bills"
          </p>
        </div>
      </div>

      {/* Sub-elements: Protected Vault & Micro-Sweep Toggle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
        {/* Protected Vault Balance Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-emerald-950/20 border border-emerald-500/25">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Protected Vault</span>
            </div>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-semibold">
              1.50% p.a.
            </span>
          </div>
          <div className="text-xl font-black text-white mt-1.5 font-mono">
            ฿{vaultBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Heightened 24h delay protection</span>
          </div>
        </div>

        {/* Dynamic Micro-Sweep Switch */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.08] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Dynamic Micro-Sweep</span>
            <button
              onClick={handleToggle}
              type="button"
              className={`w-10 h-6 rounded-full transition-colors p-0.5 ${
                microSweepEnabled ? 'bg-[#00A950]' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  microSweepEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div className="text-xs text-slate-300 mt-2">
            <span className="text-emerald-400 font-mono font-bold">+฿{sweptToday}</span> swept into K-eSavings today
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            Zero-effort automated savings
          </div>
        </div>
      </div>
    </div>
  );
};
