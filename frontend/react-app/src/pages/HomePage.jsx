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
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            Modular Platform
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            โครงสร้างระบบแบบแบ่งโมดูล (React Router Powered)
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            เลือกเจาะลึกฟีเจอร์และสถาปัตยกรรมระดับอุตสาหกรรมในแต่ละหน้าได้อย่างรวดเร็ว
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
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                Live Preview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                WealthPilot: ตัวช่วยสภาพคล่องรายวัน
              </h2>
            </div>
            <Link
              to="/wealthpilot"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300"
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
      <section className="py-12 bg-[#070B12]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full">
                High-Speed AI Shield
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                K-Sentinel: เกราะสกัดกั้นบัญชีม้า
              </h2>
            </div>
            <Link
              to="/sentinel"
              className="inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300"
            >
              <span>ดูข้อมูลการตรวจจับแบบเต็ม</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ScamShieldCard onOpenScamModal={onOpenScamModal} />
        </div>
      </section>

      {/* Featured Pipeline Overview */}
      <ArchitecturePipeline />

      {/* Persona Comparison */}
      <PersonaComparison />
    </div>
  );
}
