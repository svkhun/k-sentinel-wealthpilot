import React from 'react';
import ArchitecturePipeline from '../components/ArchitecturePipeline';
import { Cpu, Server, Database, Activity, ShieldCheck, ArrowRight, Layers, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArchitecturePage() {
  return (
    <div className="py-12 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden border-blue-500/30">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>Production ML Engineering</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Enterprise AI Architecture <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                Two-Tier Low-Latency Pipeline
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              สถาปัตยกรรมระดับอุตสาหกรรมธนาคารที่แก้ปัญหาคอขวดของ Graph Neural Networks ด้วยการแยกการคำนวณกราฟแบบออฟไลน์/เนียร์ไลน์ ออกจากการอนุมานผลแบบเรียลไทม์ (Sub-80ms Pre-Transaction Screening)
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Visual Pipeline */}
      <ArchitecturePipeline />

      {/* Technical Tier Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-6 space-y-4 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                T1
              </div>
              <h3 className="text-lg font-bold text-white">Tier 1: Graph Feature Store</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              โครงข่ายธุรกรรมทั่วประเทศประมวลผลผ่าน Relational GCN (PyG) สกัดออกมาเป็น 16-Dimensional Node Embeddings และจัดเก็บไว้ใน In-Memory Feature Store (Redis Simulation) ทำให้การดึงข้อมูลเครือข่ายบัญชีม้ามีเวลาเข้าถึงเพียง <strong className="text-purple-400">O(1) (&lt;0.5ms)</strong>
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                T2
              </div>
              <h3 className="text-lg font-bold text-white">Tier 2: Real-Time Inference</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              เมื่อผู้ใช้กดโอนเงินใน K PLUS ข้อมูล Pre-transaction จะวิ่งเข้าสู่ FastAPI Banking Gateway และผ่านโมเดล <strong>ONNX Runtime LightGBM</strong> โดยตรง ใช้เวลาเพียง <strong className="text-emerald-400">0.27ms (P99)</strong> สำหรับ Inference และส่งผลลัพธ์กลับใน <strong className="text-emerald-400">11.62ms (P99)</strong>
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4 border-l-4 border-l-blue-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                T3
              </div>
              <h3 className="text-lg font-bold text-white">Tier 3: Modular Client SPA</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              แอปพลิเคชันฝั่ง Client พัฒนาด้วย <strong>React 18 + React Router 6 + Vite + Tailwind CSS</strong> พร้อม WebRTC Biometric Face Scan และ Vis.js Network Topology Interactive Sandbox สำหรับทีมวิเคราะห์ความปลอดภัย (SecOps)
            </p>
          </div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl font-bold text-white">ศึกษาผลกระทบที่มีต่อกลุ่มเป้าหมาย First Jobber</h3>
            <p className="text-xs sm:text-sm text-slate-300">สำรวจ Persona Comparison และความคุ้มค่าทางธุรกิจ (Business Impact)</p>
          </div>
          <Link
            to="/personas"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
          >
            <span>ดูข้อมูล Personas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
