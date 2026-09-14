import React from 'react';
import PersonaComparison from '../components/PersonaComparison';
import { Users, Target, TrendingUp, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PersonasPage() {
  return (
    <div className="py-12 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden border-amber-500/30">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse"></span>
              <span>Target Audience Intelligence</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              First Jobbers Personas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400">
                Data-Driven Behavioral Clustering
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              วิเคราะห์พฤติกรรมกลุ่มลูกค้าเริ่มทำงานอายุ 22–30 ปี จำนวนกว่า 3.2 ล้านคนบน K PLUS ผ่านโมเดล K-Means / GMM Clustering เพื่อออกแบบมาตรการช่วยเหลือที่ตรงจุด ทั้งการออมเงินอัตโนมัติและการป้องกันภัยไซเบอร์
            </p>
          </div>
        </div>
      </section>

      {/* Main Comparison Component */}
      <PersonaComparison />

      {/* Business Value Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold shadow-sm">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>ผลกระทบเชิงกลยุทธ์ (Strategic Value)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">ผลกระทบเชิงธุรกิจต่อธนาคารกสิกรไทย</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">CASA Deposit Growth</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              กวาดเงินฝากต้นทุนต่ำเข้าสู่ระบบ KBank ได้เพิ่มขึ้นประมาณ <strong>1.2 – 2.0 พันล้านบาท</strong> จากฐานลูกค้า First Jobber 3.2 ล้านคน ผ่านระบบ Micro-Sweeping
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Fraud Loss Mitigation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ลดความเสียหายจากการถูกหลอกโอนเงินของคนรุ่นใหม่กว่า <strong>45%</strong> ประหยัดงบดำเนินการไกล่เกลี่ยคดีความและภาระการประสานงานของศูนย์ AOC 1441
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Customer Lifetime Value</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              สร้างความผูกพันและยกระดับ Daily Active Users (DAU) ของ K PLUS ตั้งแต่วันแรกที่เริ่มทำงาน ต่อยอดสู่ผลิตภัณฑ์กองทุนรวม บัตรเครดิต และสินเชื่อบ้านในอนาคต
            </p>
          </div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl font-bold text-white">กลับไปยังหน้าแรกเพื่อดูภาพรวมทั้งหมด</h3>
            <p className="text-xs sm:text-sm text-slate-300">สัมผัสประสบการณ์ AI Copilot ที่ออกแบบมาเพื่ออนาคตทางการเงินของคนรุ่นใหม่</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#00A950] hover:bg-[#008F43] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
          >
            <span>กลับสู่หน้าแรก</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
