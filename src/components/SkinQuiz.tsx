import { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShoppingBag, Landmark } from 'lucide-react';
import { quizQuestions, products } from '../data';
import { Product, CartItem } from '../types';

interface SkinQuizProps {
  addToCart: (product: Product, quantity?: number) => void;
  setCurrentView: (view: any) => void;
  setSelectedCategory: (cat: any) => void;
}

export default function SkinQuiz({ addToCart, setCurrentView, setSelectedCategory }: SkinQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const handleOptionSelect = (categoryTag: string) => {
    const updatedAnswers = [...answers, categoryTag];
    setAnswers(updatedAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Recommendations
      calculateRecommendations(updatedAnswers);
    }
  };

  const calculateRecommendations = (finalAnswers: string[]) => {
    // Find the most voted category
    const categoryCounts: { [key: string]: number } = {};
    finalAnswers.forEach((cat) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    let topCategory = 'skincare';
    let maxCount = 0;
    Object.keys(categoryCounts).forEach((cat) => {
      if (categoryCounts[cat] > maxCount) {
        maxCount = categoryCounts[cat];
        topCategory = cat;
      }
    });

    // Get products of this category, sorted by rating
    const matched = products.filter((p) => p.category === topCategory);
    setRecommendedProducts(matched.length > 0 ? matched : products.slice(0, 2));
    setQuizFinished(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setQuizFinished(false);
    setRecommendedProducts([]);
  };

  const handleRecommendedAddCart = (product: Product) => {
    addToCart(product, 1);
    // Visual feedback highlight or notify
  };

  return (
    <div className="bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white border border-stone-200 shadow-xl rounded-3xl overflow-hidden">
        
        {/* Decorative Top header */}
        <div className="bg-gradient-to-l from-rose-500 to-amber-500 p-8 text-center text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <Sparkles className="w-12 h-12 text-amber-200 mx-auto mb-3 animate-spin" style={{ animationDuration: '8s' }} />
          <h2 className="text-2xl sm:text-3xl font-extrabold">مستشار التجميل والعناية الذكي</h2>
          <p className="text-xs sm:text-sm text-rose-100 mt-2 max-w-xl mx-auto">
            أجيبي عن ٣ أسئلة بسيطة وسيقوم ذكاء Silk& velevt باقتراح الروتين الأمثل والمناسب لنوع بشرتك واحتياجاتك الفعلية.
          </p>
        </div>

        {/* Quiz Steps */}
        {!quizFinished ? (
          <div className="p-6 sm:p-10 text-right rtl">
            {/* Step Indicator */}
            <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-4">
              <span className="text-xs font-semibold text-rose-600">
                السؤال {currentStep + 1} من {quizQuestions.length}
              </span>
              <div className="flex space-x-1.5 space-x-reverse">
                {quizQuestions.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentStep ? 'w-8 bg-rose-500' : 'w-2 bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2 leading-tight">
              {quizQuestions[currentStep].questionAr}
            </h3>
            <p className="text-xs text-stone-400 font-sans mb-8">
              {quizQuestions[currentStep].questionEn}
            </p>

            {/* Answers Options Grid */}
            <div className="space-y-4">
              {quizQuestions[currentStep].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.categoryTag)}
                  className="w-full text-right p-5 bg-stone-50 hover:bg-rose-50 border border-stone-200 hover:border-rose-350 rounded-2xl transition-all duration-200 flex items-center justify-between group focus:outline-hidden cursor-pointer"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-700 font-bold text-sm group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-colors">
                      ✨
                    </span>
                    <div className="pr-3">
                      <span className="block text-base font-semibold text-stone-800 group-hover:text-rose-900 transition-colors">
                        {option.textAr}
                      </span>
                      <span className="block text-[11px] text-stone-400 font-sans group-hover:text-rose-700 transition-colors">
                        {option.textEn}
                      </span>
                    </div>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-stone-400 group-hover:text-rose-600 transform group-hover:-translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* Back to Home action */}
            {currentStep > 0 && (
              <button
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  setAnswers(answers.slice(0, -1));
                }}
                className="mt-8 text-stone-500 hover:text-stone-800 text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>الرجوع للسؤال السابق</span>
              </button>
            )}
          </div>
        ) : (
          /* Quiz Results View */
          <div className="p-6 sm:p-10 text-right rtl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full border border-emerald-100 text-emerald-500 mb-4 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">لقد انتهينا بنجاح!</h3>
              <p className="text-sm text-stone-500 mt-2">بناءً على تفضيلاتك للعناية بجمالك، نقترح عليكِ المجموعات الفائقة المخصصة التالية:</p>
            </div>

            {/* Recommended Products Display Panel */}
            <div className="space-y-6">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-stone-50 border border-stone-200 rounded-3xl p-5 flex flex-col md:flex-row-reverse gap-6 items-center hover:shadow-lg transition-shadow"
                >
                  {/* Recommended Image */}
                  <div className="w-full md:w-1/3 h-52 rounded-2xl overflow-hidden shadow-xs relative shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                      منتج ملائم لكِ 🎀
                    </span>
                  </div>

                  {/* Recommended details */}
                  <div className="flex-1 text-right">
                    <span className="inline-block bg-rose-50 text-rose-600 text-[10px] px-2.5 py-1 rounded-full font-bold mb-2">
                      ترشيح ذكي بالكامل
                    </span>
                    <h4 className="text-xl font-bold text-stone-900">{product.name}</h4>
                    <p className="text-xs text-stone-400 font-sans mt-0.5">{product.englishName}</p>
                    <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {product.benefits.slice(0, 2).map((b, idx) => (
                        <span key={idx} className="bg-white border border-stone-200 text-stone-600 text-xs px-3 py-1 rounded-full">
                          ⭐ {b}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-6 border-t border-stone-200 pt-4">
                      <div>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-450 line-through block">{product.originalPrice} ج.م</span>
                        )}
                        <span className="text-2xl font-extrabold text-rose-600">{product.price} ج.م</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            handleRecommendedAddCart(product);
                            // Highlight the item addition
                          }}
                          className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>أضيفي للسلة</span>
                        </button>

                        <button
                          onClick={() => {
                            handleRecommendedAddCart(product);
                            setCurrentView('checkout');
                          }}
                          className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs cursor-pointer"
                        >
                          <span>اشتري الآن (الدفع كاش)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons to rest of store */}
            <div className="mt-10 pt-8 border-t border-stone-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <button
                onClick={resetQuiz}
                className="text-stone-500 hover:text-stone-850 font-semibold text-sm cursor-pointer"
              >
                إعادة المحاولة من جديد 🔄
              </button>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('shop');
                  }}
                  className="bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                >
                  تصفح كافة منتجات التجميل
                </button>

                <button
                  onClick={() => {
                    setCurrentView('home');
                  }}
                  className="bg-stone-900 text-white hover:bg-stone-800 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                >
                  العودة للرئيسية
                </button>
              </div>
            </div>

            {/* Quick cash on delivery assurance */}
            <div className="mt-6 text-center bg-rose-50 p-4 rounded-2xl flex items-center justify-center gap-2 border border-rose-100">
              <span className="text-lg">💵</span>
              <span className="text-xs text-rose-800 font-semibold">تذكير: جميع طلبيات التوصيل تخضع لخطة "الدفع عند الاستلام كاش" مع التفتيش المباشر للأوردر.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
