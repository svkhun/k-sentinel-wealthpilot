import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export default function PersonaComparison() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-5xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight whitespace-normal md:whitespace-nowrap">
            ผลลัพธ์ที่เปลี่ยนไปของ First Jobber
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-4xl mx-auto leading-relaxed">
            เปรียบเทียบชีวิตการเงินก่อนและหลังเปิดใช้งาน K-Sentinel &amp; WealthPilot
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/20 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-red-400">ก่อนใช้งาน (ปัญหาเดิม)</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>เงินเดือนออกแล้วใช้เพลิน สัปดาห์สุดท้ายก่อนสิ้นเดือนเงินหมด ต้องพึ่งพาบัตรกดเงินสด</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>ไม่มีเงินสำรองฉุกเฉิน เมื่อมีเหตุจำเป็นต้องกู้หนี้ยืมสิน</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>ตกเป็นเหยื่อมิจฉาชีพคอลเซ็นเตอร์ กดโอนเงินเก็บทั้งก้อนไปบัญชีม้าโดยไม่มีระบบเตือน</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-emerald-400">หลังใช้งาน (ผลลัพธ์ใหม่)</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>รู้ตัวเลข Safe-to-Spend รายวัน มีเงินเหลือใช้ทุกวันอย่างสบายใจ ไม่ต้องอดช่วงสิ้นเดือน</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>เงินเก็บก้อนแรกเติบโตใน Protected Vault ได้ดอกเบี้ย 1.50% อัตโนมัติ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>อุ่นใจทุกการโอนเงิน ด้วย AI สแกนบัญชีม้าและดึงสติทันทีหากมีความเสี่ยง</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
