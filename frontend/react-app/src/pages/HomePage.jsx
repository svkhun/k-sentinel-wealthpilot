import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SafeToSpendGauge from '../components/SafeToSpendGauge';
import MicroSweepVault from '../components/MicroSweepVault';
import ScamShieldCard from '../components/ScamShieldCard';
import ArchitecturePipeline from '../components/ArchitecturePipeline';
import PersonaComparison from '../components/PersonaComparison';
import { Wallet, ShieldAlert, Cpu, Users, ArrowRight, Sparkles, CheckCircle, Zap, ShieldCheck } from 'lucide-react';

export default function HomePage({ onOpenScamModal }) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero onOpenScamModal={onOpenScamModal} />

      {/* Quick Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
            <span>React Router 6 Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            โครงสร้างระบบแยกโมดูลตามฟังก์ชัน
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            เลือกเจาะลึกฟังก์ชันและสถาปัตยกรรมระดับอุตสาหกรรมในแต่ละหน้าได้อย่างรวดเร็ว
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: WealthPilot */}
          <Link
            to="/wealthpilot"
            className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-emerald-500/50"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                WealthPilot
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                คำนวณเงินใช้จ่ายรายวัน (Safe-to-Spend) และกวาดเงินทอนเข้าตู้เซฟดอกเบี้ยสูงอัตโนมัติ
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mt-6 group-hover:translate-x-1 transition-transform">
              <span>เจาะลึกระบบ</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 2: K-Sentinel */}
          <Link
            to="/sentinel"
            className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-red-500/50"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                K-Sentinel Shield
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                สกัดบัญชีม้า Task Scam &amp; เครือข่ายฟอกเงินด้วย Relational GCN ภายในเวลาต่ำกว่า 80ms
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400 mt-6 group-hover:translate-x-1 transition-transform">
              <span>ทดสอบระบบ</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 3: Architecture */}
          <Link
            to="/architecture"
            className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-500/50"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                AI Architecture
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Two-Tier Production Pipeline: Kafka -&gt; RGCN -&gt; Feast In-Memory -&gt; ONNX Runtime P99 &lt;11.62ms
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mt-6 group-hover:translate-x-1 transition-transform">
              <span>ดูสถาปัตยกรรม</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 4: Personas */}
          <Link
            to="/personas"
            className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-amber-500/50"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                First Jobber Personas
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                เปรียบเทียบผลลัพธ์ Before/After ของคนเริ่มทำงาน 2 กลุ่มหลัก (เงินชนเดือน vs เสี่ยงโดนหลอก)
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mt-6 group-hover:translate-x-1 transition-transform">
              <span>ดูข้อมูลผู้ใช้</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* Featured WealthPilot Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
                <span>WealthPilot Copilot Preview</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                WealthPilot: บริหารสภาพคล่องและเงินออมอัตโนมัติ
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                คำนวณวงเงิน Safe-to-Spend รายวัน พร้อมฟังก์ชัน Auto Micro-Sweeping เข้า Protected Vault ดอกเบี้ย 1.50%
              </p>
            </div>
            <Link
              to="/wealthpilot"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs sm:text-sm font-bold border border-emerald-500/30 transition-all hover:scale-105"
            >
              <span>ดูรายละเอียดทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <SafeToSpendGauge />
            </div>
            <div className="lg:col-span-5">
              <MicroSweepVault />
            </div>
          </div>
        </div>
      </section>

      {/* Featured K-Sentinel Section */}
      <section className="py-14 bg-[#070B12]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185] animate-pulse"></span>
                <span>K-Sentinel Scam Shield</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                K-Sentinel: เกราะสกัดกั้นบัญชีม้าความเร็วสูง (&lt;80ms)
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                ตรวจจับเครือข่าย Task Scam ข้ามธนาคารด้วย Relational GCN 16D พร้อม Counterfactual XAI
              </p>
            </div>
            <Link
              to="/sentinel"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs sm:text-sm font-bold border border-rose-500/30 transition-all hover:scale-105"
            >
              <span>ดูข้อมูลการตรวจจับแบบเต็ม</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ScamShieldCard onOpenScamModal={onOpenScamModal} showHeader={false} />
        </div>
      </section>

      {/* Featured Pipeline Overview */}
      <ArchitecturePipeline />

      {/* Persona Comparison */}
      <PersonaComparison />
    </div>
  );
}
