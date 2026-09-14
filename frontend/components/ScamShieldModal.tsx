import React, { useState, useEffect } from 'react';
import { ShieldAlert, Cpu, Camera, X } from 'lucide-react';

export interface ScamShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  beneficiaryAccount?: string;
  transferAmount?: number;
  initialSeconds?: number;
}

export const ScamShieldModal: React.FC<ScamShieldModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  beneficiaryAccount = 'ACC_0001 (PromptPay)',
  transferAmount = 35000,
  initialSeconds = 900 // 15:00 minutes
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(initialSeconds);
    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, initialSeconds]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-amber-500/50 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative shadow-amber-500/10">
        
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Banner */}
        <div className="flex items-center gap-3.5 border-b border-white/[0.08] pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 animate-pulse">
            <ShieldAlert className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 px-2.5 py-0.5 rounded-full">
              High-Risk Anomaly Detected
            </span>
            <h3 className="text-base font-bold text-white mt-1">Pre-Transaction Transfer Paused</h3>
          </div>
        </div>

        {/* Transaction Brief */}
        <div className="flex justify-between items-center text-xs py-3 border-b border-white/[0.06] text-slate-300">
          <span>Target: <b className="text-white font-mono">{beneficiaryAccount}</b></span>
          <span>Amount: <b className="text-rose-400 font-mono text-sm">฿{transferAmount.toLocaleString()}</b></span>
        </div>

        {/* Explainable AI (XAI) Box */}
        <div className="mt-4 p-4 bg-slate-900/90 rounded-2xl border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <Cpu className="w-4 h-4" />
            <span>Counterfactual Explainable AI (XAI)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Beneficiary account flagged in high-risk mule ring topology; account created <b>&lt; 12 hours ago</b> with rapid layering outflow velocity (19.8s). Suspicious Task Scam pattern detected.
          </p>
          <div className="text-[11px] text-emerald-400 font-mono pt-1">
            Current Risk: 94.2% ➔ Lowered to 12.0% with Biometric Face Liveness
          </div>
        </div>

        {/* Dynamic Step-up Friction: 15-Minute Countdown */}
        <div className="mt-4 p-4 rounded-2xl bg-[#080C14] border border-amber-500/30 text-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Dynamic Cool-Off Window Active
          </div>
          <div className="text-3xl font-mono font-black text-amber-400 mt-1 tracking-wider">
            {formattedTime}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Mandatory delay to disrupt social engineering &amp; psychological coercion
          </p>
        </div>

        {/* Dual Actions CTA */}
        <div className="mt-6 space-y-2.5">
          <button
            onClick={onVerify}
            type="button"
            className="w-full bg-[#00A950] hover:bg-[#008F43] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>Verify via Face Liveness to Proceed</span>
          </button>

          <button
            onClick={onClose}
            type="button"
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl border border-white/[0.08] transition-colors"
          >
            Cancel Transfer (Recommended)
          </button>
        </div>

      </div>
    </div>
  );
};
