import { X, Trash2, Plus, Minus, Shovel as ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  setCurrentView: (view: any) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  setCurrentView,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    onClose();
    setCurrentView('checkout');
    setTimeout(() => {
      document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Backdrop overlay */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 transition-opacity"
          aria-hidden="true"
        ></div>

        {/* Drawer Position (Right Side slide-in) */}
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-300">
            <div className="flex h-full flex-col bg-white shadow-2xl">
              
              {/* Drawer Title Header */}
              <div className="px-4 py-6 sm:px-6 border-b border-stone-100 flex items-center justify-between rtl">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="bg-rose-50 text-rose-500 p-2 rounded-full font-bold text-xs">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} قطع
                  </span>
                  <h2 className="text-xl font-extrabold text-stone-900" id="slide-over-title">
                    سلة المشتريات والجمال
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-stone-50 p-2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  aria-label="Close cart side overlay"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Content Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
                {cart.length === 0 ? (
                  /* Empty state rendering */
                  <div className="flex flex-col items-center justify-center h-96 text-center rtl">
                    <span className="text-6xl mb-4 text-stone-300">🛍️</span>
                    <h3 className="text-lg font-bold text-stone-900">سلتك لا تزال فارغة تماماً!</h3>
                    <p className="text-sm text-stone-500 mt-2 max-w-xs leading-relaxed">
                      اختاري ما يناسبكِ من منتجات التغذية، مستحضرات التجميل، والزيوت المخملية المخصصة الآن واملئي السلة بالجمال.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        setCurrentView('shop');
                      }}
                      className="mt-6 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs py-3 px-6 rounded-xl transition-all cursor-pointer"
                    >
                      تسوقي مجموعات التجميل المتاحة
                    </button>
                  </div>
                ) : (
                  /* Cart Product Cards list */
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-right rtl"
                      >
                        {/* Image */}
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl border border-stone-200 bg-white"
                          referrerPolicy="no-referrer"
                        />

                        {/* Info details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-extrabold text-stone-900 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] text-stone-400 font-sans block truncate">
                            {item.product.englishName}
                          </span>
                          <span className="text-xs font-black text-rose-600 block mt-1">
                            {item.product.price} ج.م
                          </span>

                          <div className="flex items-center justify-between gap-2 mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-stone-200 rounded-lg bg-white px-1.5 py-0.5 scale-90 -mr-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="p-0.5 px-1.5 text-stone-400 hover:text-stone-950 transition-colors cursor-pointer"
                                aria-label="Subtract"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold text-stone-800 px-2 w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-0.5 px-1.5 text-stone-400 hover:text-stone-950 transition-colors cursor-pointer"
                                aria-label="Add"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Cost subtotal */}
                            <span className="text-xs font-bold text-stone-600 font-sans">
                              الإجمالي: {(item.product.price * item.quantity).toLocaleString()} ج.م
                            </span>
                          </div>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer Area */}
              {cart.length > 0 && (
                <div className="border-t border-stone-150 px-4 py-6 sm:px-6 bg-stone-50">
                  <div className="space-y-3 text-right rtl">
                    
                    {/* Sum of products */}
                    <div className="flex justify-between items-center text-sm text-stone-650">
                      <span>إجمالي المنتجات في السلة:</span>
                      <span className="font-bold text-stone-900">{subtotal.toLocaleString()} ج.م</span>
                    </div>

                    {/* Shipping reminder note */}
                    <div className="flex justify-between items-start text-xs text-stone-500 bg-stone-100 rounded-lg p-3">
                      <span>🚚 مصاريف وقيمة الشحن:</span>
                      <span className="font-bold text-luxury-charcoal text-left">
                        قيمة الشحن ثابتة ١٠٠ ج.م لجميع المحافظات.
                      </span>
                    </div>

                    {/* Grand estimate pre-shipping */}
                    <div className="flex justify-between items-center text-lg font-black text-stone-900 pt-2 border-t border-stone-200">
                      <span>المبلغ المطلوب (كاش):</span>
                      <span className="text-rose-600">{subtotal.toLocaleString()} ج.م</span>
                    </div>

                    {/* Delivery prompt assurance */}
                    <p className="text-[10px] text-stone-550 leading-relaxed">
                      * نقوم بالشحن في أسرع وقت لجميع المحافظات. لن نقوم بمطالبتك بأي معلومات دفع إلكتروني أو بطاقة ائتمان. دفع طلبك سيكون نقداً عند الاستلام ومراجعة المنتجات أمام باب منزلك بالكامل.
                    </p>

                    {/* CTA buttons */}
                    <div className="pt-4 flex flex-col gap-3">
                      <button
                        id="CartDrawer-CheckoutButton"
                        onClick={handleCheckoutClick}
                        className="w-full bg-stone-950 hover:bg-stone-800 text-white text-sm font-extrabold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>تأكيد الأوردر ومتابعة الشحن</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={onClose}
                        className="w-full bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 hover:text-stone-950 text-xs font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer text-center"
                      >
                        متابعة التسوق وإضافة منتجات إضافية
                      </button>
                    </div>

                    {/* Authenticity labels */}
                    <div className="flex justify-center items-center gap-2 pt-2 text-[9px] text-stone-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>متجر Silk& velevt الأصلي لروتين المرأة المشرقة</span>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
