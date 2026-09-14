import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg text-center space-y-6 border-red-500/20">
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
          <AlertCircle className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white">404</h1>
          <h2 className="text-xl font-bold text-slate-200">ไม่พบหน้าที่คุณต้องการ</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            เส้นทาง URL นี้ไม่มีอยู่ในระบบ K-Sentinel &amp; WealthPilot กรุณาตรวจสอบลิงก์หรือกลับสู่หน้าหลัก
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#00A950] hover:bg-[#008F43] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
        >
          <Home className="w-4 h-4" />
          <span>กลับสู่หน้าแรก (Home)</span>
        </Link>
      </div>
    </div>
  );
}
