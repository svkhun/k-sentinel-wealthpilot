import React from 'react';
import SafeToSpendGauge from '../components/SafeToSpendGauge';
import MicroSweepVault from '../components/MicroSweepVault';
import { Wallet, TrendingUp, ShieldCheck, Sparkles, ArrowRight, DollarSign, Calendar, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WealthPilotPage() {
  return (
    <div className="py-12 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden border-emerald-500/30">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autonomous Cashflow Copilot</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              WealthPilot: ใช้ชีวิตอย่างมั่นใจ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                หมดปัญหาเงินเดือนชนเดือน
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              นวัตกรรมจัดการกระแสเงินสดสำหรับคนเริ่มทำงาน (First Jobbers) โดยระบบจะแยกค่าใช้จ่ายประจำคงที่อัตโนมัติ คำนวณเงินใช้วันต่อวัน (Safe-to-Spend) และกวาดเงินเหลือเก็บเข้ากระปุกนิรภัยดอกเบี้ยสูง 1.50% ทุกคืน
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Components */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <SafeToSpendGauge />
          </div>
          <div className="lg:col-span-5">
            <MicroSweepVault />
          </div>
        </div>
      </section>

      {/* Deep-Dive Technical Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            Under The Hood
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            3 กลไกอัจฉริยะของ WealthPilot
          </h2>
          <p className="text-sm text-slate-400">
            ผสานการคำนวณแบบ Real-time และโมเดล Machine Learning เพื่อสร้างวินัยการเงินโดยไม่ต้องจดบันทึก
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Automated Payroll Isolation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ทันทีที่เงินเดือนเข้า บัญชีจะคำนวณและกันภาระค่าใช้จ่ายคงที่ (Fixed Expenses เช่น ค่าเช่าคอนโด, ค่าน้ำไฟ, ผ่อนบัตร/กู้กยศ.) แยกไว้ล่วงหน้าทันที เพื่อป้องกันการนำเงินส่วนสำคัญไปใช้โดยไม่รู้ตัว
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Dynamic Safe-to-Spend</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              คำนวณวงเงินที่สามารถใช้จ่ายได้สบายใจในแต่ละวัน (Daily Disposable Budget) โดยกระจายตามจำนวนวันที่เหลือจนถึงวันเงินเดือนออก หากวันไหนใช้น้อย วันถัดไปจะปรับเพิ่มขึ้นอัตโนมัติ
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">3. Protected Vault (1.50% APY)</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              กวาดเงินเหลือประจำวัน (Micro-Sweeping) ไปเก็บในตู้เซฟดอกเบี้ยสูง พร้อมฟังก์ชัน Heightened Friction (หน่วงเวลา 15 นาที + ยืนยันสองชั้นเมื่อถอน) ช่วยป้องกันเงินเก็บถูกถอนไปใช้จ่ายฟุ่มเฟือยหรือถูกมิจฉาชีพดูด
            </p>
          </div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl font-bold text-white">ต้องการทดสอบการสกัดกั้นภัยการเงินด้วย AI?</h3>
            <p className="text-xs sm:text-sm text-slate-300">สัมผัสเกราะคุ้มกัน K-Sentinel ที่ตอบสนองเร็วกว่า 80ms</p>
          </div>
          <Link
            to="/sentinel"
            className="inline-flex items-center gap-2 bg-[#00A950] hover:bg-[#008F43] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
          >
            <span>ไปที่หน้า K-Sentinel</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
