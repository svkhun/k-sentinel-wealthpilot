import React, { useState } from 'react';
import { Lock, Shield } from 'lucide-react';

export default function MicroSweepVault() {
  const [isSwept, setIsSwept] = useState(true);

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Protected Vault (K-eSavings)</h3>
              <p className="text-xs text-slate-400">แยกเงินสำรองไว้ในตู้เซฟ ป้องกันโดนดูดเงิน</p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
            ดอกเบี้ย 1.50%
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-teal-500/30 shadow-lg flex-shrink-0">
            <img
              src="/static/img/glass_vault_3d.jpg"
              alt="3D Glass Vault"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-xs text-slate-400">ยอดเงินในกระปุกนิรภัย</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-num">
              {isSwept ? "฿ 15,240.00" : "฿ 15,120.00"}
            </div>
            <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
              <Shield className="w-3.5 h-3.5" />
              <span>มีระบบหน่วงเวลา 15 นาทีเมื่อถอน</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-white">Auto Micro-Sweeping</h4>
            <p className="text-xs text-slate-400 mt-0.5">กวาดเงินเหลือรายวันอัตโนมัติเวลา 23:00 น.</p>
          </div>

          <button
            onClick={() => setIsSwept(!isSwept)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              isSwept ? "bg-[#00A950]" : "bg-slate-700"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ${
                isSwept ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        <div className="mt-4 p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-xs">
          <span className="text-slate-300">สถานะกวาดเงินคืนนี้:</span>
          <span className="font-bold font-num text-emerald-400 text-sm">
            {isSwept ? "+฿120.00 (กำลังจะโอนเข้า Vault)" : "ปิดการทำงานชั่วคราว"}
          </span>
        </div>
      </div>
    </div>
  );
}
