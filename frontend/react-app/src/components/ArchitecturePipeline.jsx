import React from 'react';
import { Cpu } from 'lucide-react';

export default function ArchitecturePipeline() {
  const steps = [
    {
      num: "01",
      title: "Apache Kafka",
      subtitle: "Event Ingestion",
      desc: "รับคำสั่งโอนเงินทุก Transaction แบบ Real-time Streaming Throughput สูง",
      tag: "< 2ms Latency"
    },
    {
      num: "02",
      title: "PyG Relational GCN",
      subtitle: "Graph Neural Network",
      desc: "โมเดลโครงข่ายกราฟเชื่อมโยงโครงสร้างบัญชีม้า 3 ชั้น วิเคราะห์ Money Laundering Flow",
      tag: "Triton Inference"
    },
    {
      num: "03",
      title: "Feast & Redis",
      subtitle: "Online Feature Store",
      desc: "ดึงข้อมูลประวัติย้อนหลังและความถี่ของบัญชีในระดับ Sub-millisecond เพื่อป้อนเข้าโมเดล",
      tag: "Low-Latency Cache"
    },
    {
      num: "04",
      title: "K PLUS Interception",
      subtitle: "Real-time Action",
      desc: "สกัดกั้นก่อนตัดเงินจาก Core Banking ขึ้นหน้าต่างเตือนและหน่วงเวลาดึงสติทันที",
      tag: "End-to-End < 80ms"
    }
  ];

  return (
    <section id="architecture" className="py-20 bg-[#0E1524]/40 border-y border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-5xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Production Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight whitespace-normal md:whitespace-nowrap">
            สถาปัตยกรรม Data Science ระดับ Production
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-4xl mx-auto leading-relaxed">
            ออกแบบตามมาตรฐานธนาคารพาณิชย์ รองรับปริมาณคำสั่งโอนเงินมหาศาลด้วย SLA ต่ำกว่า 80ms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-extrabold text-[#00A950] opacity-80">{step.num}</span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-emerald-500/20">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-xs font-semibold text-emerald-400 mb-2">{step.subtitle}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
