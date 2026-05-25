import { Sparkles, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Landmark } from 'lucide-react';
import { Category } from '../types';

interface HeroProps {
  setCurrentView: (view: any) => void;
  setSelectedCategory: (cat: Category | 'all') => void;
}

export default function Hero({ setCurrentView, setSelectedCategory }: HeroProps) {
  const handleCategoryClick = (category: Category | 'all') => {
    setSelectedCategory(category);
    setCurrentView('shop');
    setTimeout(() => {
      document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const categories = [
    { id: 'skincare', name: 'العناية بالبشرة', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200', count: '٣ منتجات' },
    { id: 'makeup', name: 'المكياج الفاخر', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200', count: 'منتجان' },
    { id: 'haircare', name: 'العناية بالشعر', img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=200', count: 'منتج واحد' },
    { id: 'fragrance', name: 'العطور الثمينة', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=200', count: 'منتج واحد' },
    { id: 'bundles', name: 'علب الهدايا', img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=200', count: 'توفير فخم' }
  ];

  const features = [
    {
      icon: <Truck className="w-10 h-10 text-rose-500" />,
      title: 'شحن لجميع المحافظات',
      desc: 'نسلم طلبك لباب منزلك في الـ 27 محافظة مصرية في أسرع وقت.'
    },
    {
      icon: <Landmark className="w-10 h-10 text-rose-500" />,
      title: 'الدفع عند الاستلام',
      desc: 'ادفعي نقداً بأمان تام بعد فحص ومعاينة الأوردر بنفسك.'
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-rose-500" />,
      title: 'أصلي وطبيعي 100%',
      desc: 'منتجاتنا مرخصة ومصممة بأجود تفاصيل مكونات الحرير والورد.'
    },
    {
      icon: <RefreshCcw className="w-10 h-10 text-rose-500" />,
      title: 'معاينة مجانية للمنتج',
      desc: 'لكِ حق مراجعة الغلاف والتأكد من الأوردر مع مندوب التوصيل.'
    }
  ];

  return (
    <div id="Hero-Section" className="relative bg-stone-50 overflow-hidden">
      {/* Visual background decorations in luxury tones */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-40 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40 -ml-20 -mb-20"></div>

      {/* Hero Banner Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text/CTA Area */}
          <div className="lg:col-span-7 flex flex-col justify-center text-right order-last lg:order-first rtl">
            
            <div className="inline-flex items-center self-end bg-rose-50 border border-rose-100 rounded-full px-4 py-1.5 mb-6 shadow-2xs">
              <span className="text-xs font-semibold text-rose-700">عروض صيف 2026: خصومات تصل لـ 30% وشحن سريع</span>
              <Sparkles className="w-4 h-4 text-rose-500 mr-2" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-tight tracking-tight mb-6">
              جمالك يستحق ملمس <span className="text-rose-600 font-serif">الحرير</span> ونعومة <span className="text-rose-500 font-serif">المخمل</span>
            </h1>

            <p className="text-lg text-stone-600 mb-8 max-w-2xl leading-relaxed">
              اكتشفي تشكيلة <span className="font-semibold text-stone-900">Silk& velevt</span> الاستثنائية من أرقى تركيبات العناية بالبشرة، الشعر، مستحضرات التجميل والعطور الفاخرة. روتين جمالي صمم ليدوم طويلاً، متوفر الآن بين يديكِ مع تسهيلات دفع مرنة وموثوقة عند المنزل.
            </p>

            <div className="flex flex-col sm:flex-row-reverse gap-4 justify-start items-stretch sm:items-center">
              <button
                id="Hero-ShopButton"
                onClick={() => handleCategoryClick('all')}
                className="bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-charcoal font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer"
              >
                <span>تسوقي المجموعة الفاخرة</span>
                <ArrowLeft className="w-5 h-5 mr-3" />
              </button>

              <button
                id="Hero-QuizButton"
                onClick={() => setCurrentView('quiz')}
                className="bg-transparent border-2 border-luxury-gold text-luxury-charcoal hover:bg-luxury-gold/10 hover:text-black font-bold px-6 py-4 rounded-full transition-all flex items-center justify-center shadow-xs cursor-pointer"
              >
                <Sparkles className="w-5 h-5 ml-2 text-luxury-gold" />
                <span>اختبار مستشار الجمال المجاني</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200 mt-10 pt-8 text-center">
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-stone-900">١٠٠٪</span>
                <span className="text-xs text-stone-500">أصلي ومصرح طبياً</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-stone-900">٢٧</span>
                <span className="text-xs text-stone-500">محافظة نصل إليها</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-stone-900">١٠ آلاف+</span>
                <span className="text-xs text-stone-500">عميلة سعيدة بمصر</span>
              </div>
            </div>

          </div>

          {/* Interactive Hero Media Cards (Right Side representation) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Background elements */}
            <div className="absolute inset-0 bg-radial from-rose-200/40 via-transparent to-transparent rounded-full filter blur-xl"></div>
            
            {/* Main Premium Card Visual */}
            <div className="relative bg-white/80 backdrop-blur-xs border border-stone-200 rounded-3xl p-6 shadow-2xl max-w-md w-full overflow-hidden transform hover:scale-[1.01] transition-all">
              <div className="absolute top-0 left-0 bg-rose-500 text-white text-xs font-bold px-4 py-1.5 rounded-br-2xl">
                المنتج الأعلى تقييماً ⭐ 5.0
              </div>
              
              <img
                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600"
                alt="Silk and Velvet Luxury Box"
                className="w-full h-72 object-cover rounded-2xl mb-5 shadow-xs"
                referrerPolicy="no-referrer"
              />

              <div className="text-right rtl">
                <span className="text-xs font-bold text-luxury-gold tracking-wider">الجمال المتكامل</span>
                <h3 className="text-xl font-bold text-luxury-charcoal mt-1">مجموعة "النعومة المطلقة" المتكاملة</h3>
                <p className="text-xs text-stone-500 mt-1">المكياج ومقشرات التجميل وعلاج الأرجان في معلب فاخر ومخملي مجاني</p>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-stone-400 line-through">1,195 ج.م</span>
                  <div className="text-left">
                    <span className="text-xs text-stone-500 ml-1">السعر الاستثنائي</span>
                    <span className="text-2xl font-bold text-luxury-charcoal bg-luxury-gold/25 px-2 py-0.5 rounded">890 ج.م</span>
                  </div>
                </div>

                <button
                  id="Hero-BuyFeaturedButton"
                  onClick={() => handleCategoryClick('bundles')}
                  className="w-full mt-4 bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-charcoal text-sm font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>استكشفي المجموعة الفخمة ووفرّي ٣٠٠ ج.م</span>
                </button>
              </div>
            </div>

            {/* Float Badge 1 */}
            <div className="absolute bottom-4 -left-6 sm:-left-12 bg-white border border-stone-250 rounded-2xl p-3 shadow-lg flex items-center space-x-3 rtl:space-x-reverse animate-bounce" style={{ animationDuration: '4s' }}>
              <span className="text-xl">🚚</span>
              <div className="text-right">
                <span className="block text-xs font-bold text-luxury-charcoal">شحن سريع</span>
                <span className="text-[10px] text-stone-400">للقاهرة الكبرى في يوم</span>
              </div>
            </div>

            {/* Float Badge 2 */}
            <div className="absolute top-8 -right-4 bg-luxury-charcoal text-white rounded-2xl p-2.5 px-4 shadow-lg flex items-center space-x-2 rtl:space-x-reverse border border-luxury-gold/30">
              <span className="text-xs font-bold">الدفع عند الاستسلام الكاش 💵</span>
            </div>

          </div>

        </div>
      </div>

      {/* Luxury Quick Category Jumps */}
      <div className="bg-luxury-beige/30 border-t border-b border-luxury-gold-hover/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-2xl font-bold tracking-tight text-luxury-charcoal mb-8">تسوقي حسب المجموعات العطرية والجمالية</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id as Category)}
                className="group flex flex-col items-center p-4 bg-white hover:bg-luxury-beige border border-stone-200 hover:border-luxury-gold rounded-2xl transition-all duration-300 focus:outline-hidden cursor-pointer shadow-2xs"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-white group-hover:border-luxury-gold shadow-md group-hover:scale-105 transition-all">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="text-sm font-bold text-luxury-charcoal group-hover:text-black transition-colors">{cat.name}</span>
                <span className="text-[10px] text-stone-400 mt-1">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Trust Features Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <div key={i} className="flex flex-col items-center bg-white border border-luxury-gold/15 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300">
              <div className="bg-luxury-beige text-luxury-gold p-4 rounded-full mb-4">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-luxury-charcoal mb-2">{feat.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed max-w-xs">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
