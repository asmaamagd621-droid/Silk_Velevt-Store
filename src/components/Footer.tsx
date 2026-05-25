import { ShieldCheck, Truck, Landmark, RotateCcw, Landmark as LandmarkIcon } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: any) => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  return (
    <footer className="bg-luxury-gold text-luxury-charcoal py-16 px-4 sm:px-6 lg:px-8 border-t border-luxury-gold-hover/35 text-right rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Top trust visual widgets grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-luxury-gold-hover/25 pb-12 mb-12">
          
          <div className="flex items-center gap-4">
            <div className="bg-luxury-beige text-luxury-charcoal p-3 rounded-2xl shadow-xs">
              <Truck className="w-6 h-6 text-luxury-gold" />
            </div>
            <div>
              <h4 className="text-luxury-charcoal text-sm font-bold">٢٧ محافظة بمصر</h4>
              <p className="text-xs text-luxury-charcoal/90 mt-1">توصيل منزلي سريع لجميع المحافظات بشحن ثابت ١٠٠ ج.م فقط.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-luxury-beige text-luxury-charcoal p-3 rounded-2xl shadow-xs">
              <LandmarkIcon className="w-6 h-6 text-luxury-gold" />
            </div>
            <div>
              <h4 className="text-luxury-charcoal text-sm font-bold">الدفع عند الاستلام كاش</h4>
              <p className="text-xs text-luxury-charcoal/90 mt-1">مطلق الأمان! نوفر لكِ خيار الدفع كاش عند معاينة الطرد.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-luxury-beige text-luxury-charcoal p-3 rounded-2xl shadow-xs">
              <ShieldCheck className="w-6 h-6 text-luxury-gold" />
            </div>
            <div>
              <h4 className="text-luxury-charcoal text-sm font-bold">منتجات مرخصة وأصلية</h4>
              <p className="text-xs text-luxury-charcoal/90 mt-1">تصاميم ومكونات آمنة وطبيعية وخالية بالكامل من السموم.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-luxury-beige text-luxury-charcoal p-3 rounded-2xl shadow-xs">
              <RotateCcw className="w-6 h-6 text-luxury-gold" />
            </div>
            <div>
              <h4 className="text-luxury-charcoal text-sm font-bold">سياسة معاينة مرنة</h4>
              <p className="text-xs text-luxury-charcoal/90 mt-1">لكِ حق رفض الطرد مع المندوب دون دفع ثمن المستحضرات.</p>
            </div>
          </div>

        </div>

        {/* Core footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Intro info */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-widest text-luxury-charcoal uppercase block">
              Silk& velevt
            </span>
            <span className="text-[10px] tracking-widest text-white uppercase font-mono block -mt-2">
              Luxury Cosmetic Routine
            </span>
            <p className="text-xs text-luxury-charcoal/90 leading-relaxed max-w-sm">
              نحن في <strong className="text-luxury-charcoal font-bold">Silk& velevt</strong> نؤمن بأن الجمال والنعومة هما أبسط حقوق المرأة. نوثق عهد الجاذبية والملمس الحريري والوردي من خلال تركيبات متطورة للعالم العربي والجمهورية بمقاييس النخبة.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-luxury-charcoal text-sm font-extrabold border-r-2 border-luxury-charcoal pr-3">مستشار الجمال والوصول</h4>
            <div className="flex flex-col space-y-2 text-xs">
              <button onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-luxury-charcoal/90 hover:text-white transition-colors text-right cursor-pointer">الصفحة الرئيسية</button>
              <button onClick={() => { setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-luxury-charcoal/90 hover:text-white transition-colors text-right cursor-pointer">متصفح المنتجات والتسوّق</button>
              <button onClick={() => { setCurrentView('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-luxury-charcoal/90 hover:text-white transition-colors text-right cursor-pointer">اختبار ومستشار البشرة الذكي</button>
              <button onClick={() => { setCurrentView('tracking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-luxury-charcoal/90 hover:text-white transition-colors text-right cursor-pointer">تتبع طلبياتك شحن</button>
            </div>
          </div>

          {/* Contact coordinates */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-luxury-charcoal text-sm font-extrabold border-r-2 border-luxury-charcoal pr-3">تواصل سريع ودعم ممتد</h4>
            <ul className="text-xs text-luxury-charcoal/90 space-y-2 leading-relaxed">
              <li>📞 خدمة عملاء مصر: <span className="font-mono font-bold text-luxury-charcoal">19999</span> (سعر المكالمة العادي)</li>
              <li>💬 واتساب الاستفسارات: <span className="font-mono font-black text-luxury-charcoal">01099887766</span></li>
              <li>📧 البريد الإداري الفاخر: <span className="font-mono">support@silkvelvet.com</span></li>
              <li>⏰ ساعات استقبال الاستفسارات: يومياً من ٩ صباحاً وحتى ١٠ مساءً</li>
            </ul>
          </div>

          {/* Verification Stamps / Certificates */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-luxury-charcoal text-sm font-extrabold border-r-2 border-luxury-charcoal pr-3">الضمان والمصداقية</h4>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 self-start bg-luxury-beige text-luxury-charcoal text-[10px] px-3 py-1.5 rounded-lg border border-luxury-gold-hover/20 font-bold shadow-2xs">
                ⭐ 4.97 تقييم العميلات
              </span>
              <span className="inline-flex items-center gap-1.5 self-start bg-luxury-beige text-luxury-charcoal text-[10px] px-3 py-1.5 rounded-lg border border-luxury-gold-hover/20 shadow-2xs">
                🛡️ ١٠٠٪ دفع عند الاستلام كاش
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-luxury-gold-hover/25 mt-12 pt-6 text-center text-xs text-luxury-charcoal flex flex-col sm:flex-row-reverse justify-between items-center gap-4">
          <div className="flex gap-4 text-[11px]">
            <span className="hover:text-white transition-colors cursor-pointer">شروط الشحن</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">سياسة الخصوصية</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">مكافحة التقليد</span>
          </div>
          <p className="font-mono text-[10px] text-luxury-charcoal/80">
            © 2026 متجر Silk& velevt لمنتجات المرأة التجميلية والعناية. جميع الحقوق محفوظة لجمهورية مصر العربية.
          </p>
        </div>

      </div>
    </footer>
  );
}
