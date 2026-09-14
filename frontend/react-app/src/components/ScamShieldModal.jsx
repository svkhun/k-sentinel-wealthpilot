import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, Clock, ScanFace, X } from 'lucide-react';

export default function ScamShieldModal({ isOpen, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(898);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(898);
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  const formattedTimer = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  const handleFaceScan = () => {
    alert("✅ สแกนใบหน้าสำเร็จ! ระบบ Biometric Liveness ยืนยันตัวตนผ่าน อนุญาตให้ดำเนินการต่อไปภายใต้การเฝ้าระวังความปลอดภัย");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border-red-500/40 relative shadow-2xl">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">K-Sentinel สกัดกั้นรายการ</h3>
              <p className="text-xs text-red-400 font-medium">ตรวจพบบัญชีม้าต้องสงสัยความเสี่ยงสูงมาก</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-sm space-y-2">
          <div className="font-bold text-red-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>เหตุผลที่ระบบระงับการโอนเงินชั่วคราว:</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>บัญชีปลายทางอยู่ในเครือข่ายเชื่อมโยงบัญชีม้า 3 ชั้น (Mule Ring)</li>
            <li>พฤติกรรมยอดเงินโอน ฿35,000 สูงผิดปกติจากประวัติการใช้งานของคุณ</li>
            <li>เวลาในการทำรายการตรงกับแบบแผนที่มิจฉาชีพมักกดดันให้เหยื่อโอน</li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs text-slate-400">เวลาดึงสติ (Cool-Off Timer)</div>
              <div className="text-sm font-bold text-white">กรุณาโทรปรึกษาคนใกล้ชิดก่อนดำเนินการ</div>
            </div>
          </div>
          <span className="font-mono text-xl font-bold text-amber-400">{formattedTimer}</span>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleFaceScan}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
          >
            <ScanFace className="w-4 h-4" />
            <span>ยืนยันด้วยการสแกนใบหน้า (Biometric Liveness)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-white/10"
          >
            ยกเลิกรายการโอนเงิน (ปลอดภัยที่สุด)
          </button>
        </div>

      </div>
    </div>
  );
}
