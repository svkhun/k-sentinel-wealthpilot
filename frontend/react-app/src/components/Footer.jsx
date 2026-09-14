import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#05080E] border-t border-white/[0.08] text-center text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-center gap-2 text-white font-bold text-base">
          <span className="text-[#00A950]">K-Sentinel</span> &amp; <span>WealthPilot</span>
        </div>
        <p>
          นวัตกรรมต้นแบบบน K PLUS สำหรับงาน KBTG Kampus Hackathon 2026 — Track 2: Data Science &amp; Intelligence
        </p>
        <p className="text-slate-500">
          ขับเคลื่อนด้วย HTML, CSS, JavaScript และ React 18
        </p>
      </div>
    </footer>
  );
}
