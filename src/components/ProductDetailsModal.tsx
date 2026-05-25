import { Star, X, Plus, Minus, ShoppingBag, ShieldCheck, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  addToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailsModal({ product, onClose, addToCart }: ProductDetailsModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background Overlay */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/65 transition-opacity duration-300"
          aria-hidden="true"
        ></div>

        {/* Center the modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel content */}
        <div className="inline-block align-bottom bg-white rounded-3xl text-right overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 focus:outline-hidden p-2 rounded-full shadow-lg border border-stone-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column (Feminine design imagery focus) */}
            <div className="relative bg-stone-50 h-72 md:h-full min-h-[350px]">
              {product.tag && (
                <span className="absolute top-4 right-4 bg-stone-900/95 text-white text-[11px] font-bold px-4 py-1.5 rounded-full z-10 shadow-sm">
                  {product.tag}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-4 left-4 bg-stone-900/80 text-white text-xs px-3 py-1 rounded-md z-10 font-mono">
                {product.size}
              </span>
            </div>

            {/* Right Column (Arabic copywriting information details) */}
            <div className="p-6 sm:p-8 flex flex-col justify-between rtl">
              <div>
                
                {/* Category tags */}
                <div className="text-xs font-bold text-rose-500 mb-1">
                  {product.category === 'skincare' ? 'العناية بالبشرة والترطيب والترميم' :
                   product.category === 'makeup' ? 'مستحضرات التجميل والمكياج الفاخر' :
                   product.category === 'haircare' ? 'علاجات الشعر الجاف والتالف وتجديده' :
                   product.category === 'fragrance' ? 'روائع العطور الشرقية الممتدة' : 'علب الهدايا والتوفير الشامل'}
                </div>

                {/* Name */}
                <h3 className="text-2xl font-black text-stone-900">{product.name}</h3>
                <p className="text-xs text-stone-400 font-sans tracking-wide mt-0.5">{product.englishName}</p>

                {/* Rating line */}
                <div className="flex items-center justify-start gap-1 mt-3 pb-4 border-b border-stone-100">
                  <span className="text-xs font-bold text-stone-500">({product.reviewsCount} تقييم حقيقي من عميلاتنا)</span>
                  <span className="text-sm font-bold text-amber-500 mr-2">{product.rating.toFixed(1)}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 fill-current ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-stone-200'}`} />
                    ))}
                  </div>
                </div>

                {/* Full Description text */}
                <p className="text-sm text-stone-600 mt-4 leading-relaxed">
                  {product.longDescription}
                </p>

                {/* Benefits / Features Checklist */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold text-stone-800 tracking-wider mb-2">مميزات وفوائد ومواصفات المنتج:</h4>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-semibold text-sm shrink-0">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to use guidelines */}
                <div className="mt-5 bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <h4 className="text-xs font-extrabold text-stone-850 mb-1.5 flex items-center justify-start gap-1.5">
                    <HelpCircle className="w-4 h-4 text-rose-500" />
                    <span>طريقة وكيفية الاستعمال الصحيحة:</span>
                  </h4>
                  <p className="text-xs text-stone-550 leading-relaxed">
                    {product.howToUse}
                  </p>
                </div>

              </div>

              {/* Action Area (Quantity counting and checkout add Button) */}
              <div className="mt-8 pt-5 border-t border-stone-150 flex flex-wrap items-center justify-between gap-4">
                
                {/* Quantity adjuster */}
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 px-2 text-stone-500 hover:text-stone-900 transition-colors focus:outline-hidden cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-stone-800 px-4 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 px-2 text-stone-500 hover:text-stone-900 transition-colors focus:outline-hidden cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Price Display */}
                <div className="text-left">
                  {product.originalPrice && (
                    <span className="text-xs text-stone-400 line-through block">
                      {(product.originalPrice * quantity).toLocaleString()} ج.م
                    </span>
                  )}
                  <span className="text-2xl font-black text-rose-600">
                    {(product.price * quantity).toLocaleString()} <span className="text-xs font-normal text-stone-600">ج.م</span>
                  </span>
                </div>

                {/* Add trigger */}
                <button
                  id={`ProductDetails-AddToCart-${product.id}`}
                  onClick={handleAdd}
                  className="bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>إضافة لسلة المشتريات ({quantity} قطع)</span>
                </button>

              </div>
              
              {/* Authenticity Guarantee Label */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-stone-500 bg-stone-25 px-3 py-1.5 rounded-md border border-dotted border-stone-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>ضمان الجودة: يحق لك مراجعة وفحص المكونات مع المندوب قبل الدفع كاش عند الاستلام.</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
