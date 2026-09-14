import React from 'react';
import ScamShieldCard from '../components/ScamShieldCard';
import { ShieldAlert, Zap, Network, Eye, Lock, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SentinelPage({ onOpenScamModal }) {
  return (
    <div className="py-12 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden border-red-500/30">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Real-Time Relational Graph AI</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              K-Sentinel: เกราะสกัดกั้นบัญชีม้า <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400">
                ตอบสนองเร็ว &lt; 80ms พร้อมระบบ XAI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              ปกป้องเงินของผู้ใช้งาน K PLUS ก่อนถูกโอนออก ด้วยโครงข่ายประสาทกราฟ (Relational Graph Convolutional Networks) ผสานโมเดล LightGBM ที่ตรวจจับบัญชีม้าข้ามธนาคารและพฤติกรรม Task Scam ได้แม่นยำ พร้อมระบบอธิบายเหตุผลความเสี่ยง (Explainable AI)
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenScamModal}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-red-600/30 transition-all hover:scale-105"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>จำลองสถานการณ์ตรวจจับและระงับโอน</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScamShieldCard onOpenScamModal={onOpenScamModal} />
      </section>

      {/* Latency Benchmark SLA Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" />
                <span>Verified Benchmark (200 Iterations)</span>
              </div>
              <h2 className="text-2xl font-bold text-white">ประสิทธิภาพความเร็วเทียบ SLA ธนาคาร</h2>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
              Target SLA: &lt; 80.0 ms
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-400 bg-slate-900/60 border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">ขั้นตอนการประมวลผล (Pipeline Stage)</th>
                  <th className="py-3 px-4 text-center">เกณฑ์ SLA</th>
                  <th className="py-3 px-4 text-center">เวลาที่วัดได้จริง</th>
                  <th className="py-3 px-4 text-right">ความเร็วสัมพัทธ์</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-semibold text-white">K-Sentinel Pre-Transaction (P50 Median)</td>
                  <td className="py-3.5 px-4 text-center text-slate-400">&lt; 80.0 ms</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400">3.85 ms</td>
                  <td className="py-3.5 px-4 text-right text-emerald-400 font-bold">เร็วกว่าเกณฑ์ 20x</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-semibold text-white">K-Sentinel Pre-Transaction (P95)</td>
                  <td className="py-3.5 px-4 text-center text-slate-400">&lt; 80.0 ms</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400">5.11 ms</td>
                  <td className="py-3.5 px-4 text-right text-emerald-400 font-bold">เร็วกว่าเกณฑ์ 15x</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-semibold text-white">K-Sentinel Pre-Transaction (P99 Tail Latency)</td>
                  <td className="py-3.5 px-4 text-center text-slate-400">&lt; 80.0 ms</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400">11.62 ms</td>
                  <td className="py-3.5 px-4 text-right text-emerald-400 font-bold">เร็วกว่าเกณฑ์ 7x</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 font-semibold text-white">Core ONNX Model Inference (P99)</td>
                  <td className="py-3.5 px-4 text-center text-slate-400">&lt; 80.0 ms</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-cyan-400">0.27 ms</td>
                  <td className="py-3.5 px-4 text-right text-cyan-400 font-bold">Sub-millisecond</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3 Core Security Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">16D RGCN Graph Intelligence</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              สกัดข้อมูลโครงสร้างความสัมพันธ์เครือข่ายบัญชีม้า (Mule Rings) แม้มิจฉาชีพจะพยายามโอนเงินวนหลายชั้นเพื่ออำพรางเส้นทางเงิน
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Counterfactual XAI</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ไม่เพียงบอกว่าเสี่ยงกี่เปอร์เซ็นต์ แต่ระบุชัดเจนว่าเกิดจากปัจจัยใด เช่น บัญชีเพิ่งเปิด 21 วัน หรือพฤติกรรมรับเงินแล้วโอนออกทันทีใน 19 วินาที
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Dynamic Step-Up Friction</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              สลายภาวะความกดดันทางจิตวิทยา (Disrupt Psychological Coercion) ด้วยการนับเวลาถอยหลัง 15 นาที และยืนยันตัวตนด้วย Face Liveness WebRTC
            </p>
          </div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl font-bold text-white">สนใจศึกษาสถาปัตยกรรมระดับ Production ของระบบ?</h3>
            <p className="text-xs sm:text-sm text-slate-300">ดูแผนภาพสถาปัตยกรรม Two-Tier Pipeline เชื่อมโยง Kafka, Triton, และ Redis</p>
          </div>
          <Link
            to="/architecture"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
          >
            <span>ดู AI Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
