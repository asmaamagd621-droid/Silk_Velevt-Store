import React, { useState, useEffect } from 'react';
import { Truck, Landmark, User, Phone, MapPin, Send, HelpCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { governorates } from '../data';
import { CartItem, Governorate, Order } from '../types';

interface CheckoutFormProps {
  cart: CartItem[];
  placeOrder: (orderData: {
    customerName: string;
    phone: string;
    alternativePhone?: string;
    governorate: Governorate;
    address: string;
    nearestLandmark?: string;
    notes?: string;
  }) => Order | null;
  setCurrentView: (view: any) => void;
}

export default function CheckoutForm({ cart, placeOrder, setCurrentView }: CheckoutFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternativePhone, setAlternativePhone] = useState('');
  const [selectedGovId, setSelectedGovId] = useState('cairo');
  const [address, setAddress] = useState('');
  const [nearestLandmark, setNearestLandmark] = useState('');
  const [notes, setNotes] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const selectedGov = governorates.find((g) => g.id === selectedGovId) || governorates[0];
  const shippingFee = selectedGov.shippingFee;
  const total = subtotal + shippingFee;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (cart.length === 0) {
      setErrorMsg('سلة المشتريات فارغة تماماً. يرجى إضافة منتجات أولاً قبل إتمام الطلب!');
      return;
    }

    // Name length check
    if (customerName.trim().length < 5) {
      setErrorMsg('فضلاً، يرجى كتابة اسمك الكامل ثلاثياً على الأقل لضمان تسجيل شحن الأوردر بنجاح.');
      return;
    }

    // Egyptian phone formats check: 11 digits, starts with 010, 011, 012, 015
    const egPhoneRegex = /^01[0125][0-9]{8}$/;
    if (!egPhoneRegex.test(phone.trim())) {
      setErrorMsg('خطأ في رقم الهاتف! يجب أن يكون رقم جوال مصري صحيح يتكون من 11 رقماً ويبدأ بـ (010، 011، 012، 015).');
      return;
    }

    if (alternativePhone.trim() && !egPhoneRegex.test(alternativePhone.trim())) {
      setErrorMsg('رقم الهاتف البديل يجب أن يكون رقم جوال مصري صحيح ومكون من 11 رقماً.');
      return;
    }

    if (address.trim().length < 10) {
      setErrorMsg('فضلاً، يرجى كتابة العنوان بشكل واضح ومفصل ومكتمل (مثال: اسم المنطقة، اسم الشارع، رقم العمارة أو البيت، الدور الشقة).');
      return;
    }

    // Core execution
    const newOrder = placeOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      alternativePhone: alternativePhone.trim() || undefined,
      governorate: selectedGov,
      address: address.trim(),
      nearestLandmark: nearestLandmark.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    if (newOrder) {
      setSuccessOrder(newOrder);
      // Change view immediately after state registers to success tracking panel
      setTimeout(() => {
        setCurrentView('tracking');
      }, 500);
    } else {
      setErrorMsg('حدث خطأ غير متوقع أثناء معالجة وتسجيل طلبك بالمنظومة الشاحنة. الرجاء المحاولة مجدداً.');
    }
  };

  if (cart.length === 0 && !successOrder) {
    return (
      <div className="bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 text-center rtl">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-stone-200 shadow-md">
          <span className="text-5xl">🛍️</span>
          <h2 className="text-xl font-bold mt-4 text-stone-900">سلة المشتريات فارغة حالياً</h2>
          <p className="text-sm text-stone-500 mt-2">يرجى إضافة مستحضرات التجميل المفضلة وسيروم الحرير لسلتك أولاً لتتمكني من تأكيد طلب الشحن والدفع عند المنزل.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="mt-6 bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold py-3 px-6 rounded-xl transition-all cursor-pointer"
          >
            تصفح المتجر والمجموعات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout-form" className="bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 text-right rtl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-stone-950 text-center mb-1 pb-2">📦 إتمام الأوردر وتأكيد الشحن الفوري</h2>
        <p className="text-stone-500 text-sm mb-10 text-center">نظام الدفع عند الاستلام كاش نقداً مع ضمان معاينة وتفتيش الطرد لمصداقية تامة</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Column: Address, Phone & Delivery details checkout Inputs */}
          <form onSubmit={handleFormSubmit} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center gap-2">
              <span className="bg-rose-50 p-1.5 rounded-lg text-rose-500">✍️</span>
              <span>بيانات التوصيل والتواصل الفوري</span>
            </h3>

            {/* Error messaging bar if any validations fail */}
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs sm:text-sm font-bold flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Grid for Name and Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name INPUT */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">اسم المستلمة ثلاثياً أو كاملاً <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="اكتبي اسمك بالكامل هنا..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-25 border border-stone-200 rounded-xl py-3 pl-4 pr-10 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-rose-450 focus:bg-white text-right"
                  />
                  <User className="absolute right-3.5 top-3.5 w-4 h-4 text-stone-400" />
                </div>
              </div>

              {/* Core Mobile Number INPUT */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">رقم الجوال الفعال <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 01012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-25 border border-stone-200 rounded-xl py-3 pl-4 pr-10 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-rose-450 focus:bg-white text-right font-mono"
                  />
                  <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-stone-400" />
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">رقم شركة الشحن للتنسيق وموعد غسيل الفواتير</span>
              </div>

            </div>

            {/* Alternative Phone and Governorate Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Alternate Phone */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">رقم جوال بديل للاحتياط (اختياري)</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="رقم آخر لضمان عدم حدوث عطل تواصل..."
                    value={alternativePhone}
                    onChange={(e) => setAlternativePhone(e.target.value)}
                    className="w-full bg-stone-25 border border-stone-200 rounded-xl py-3 pl-4 pr-10 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-rose-450 focus:bg-white text-right font-mono"
                  />
                  <Phone className="absolute right-3.5 top-3.5 w-4 h-4 text-stone-405" />
                </div>
              </div>

              {/* Governorate Selection Dropping List */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">محافظة التوصيل الشاحنة <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <select
                    value={selectedGovId}
                    onChange={(e) => setSelectedGovId(e.target.value)}
                    className="w-full bg-stone-25 border border-stone-200 rounded-xl py-3 pl-4 pr-10 text-xs text-stone-800 focus:outline-hidden focus:border-rose-450 focus:bg-white text-right appearance-none"
                  >
                    {governorates.map((gov) => (
                      <option key={gov.id} value={gov.id}>
                        {gov.nameAr} - (شحن: {gov.shippingFee} ج.م / {gov.deliveryTime})
                      </option>
                    ))}
                  </select>
                  <MapPin className="absolute right-3.5 top-3.5 w-4 h-4 text-stone-400 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Address Details input text-area */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">عنوان التوصيل بالتفصيل الممل <span className="text-rose-500">*</span></label>
              <div className="relative">
                <textarea
                  required
                  rows={3}
                  placeholder="مثال: التجمع الخامس، شارع التسعين الشمالي، بجوار مول أركان، عمارة ٤٥ الدور الثالث شقة ٩..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-stone-25 border border-stone-200 rounded-xl p-3 pr-10 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-rose-450 focus:bg-white text-right resize-none"
                />
                <MapPin className="absolute right-3.5 top-3.5 w-4 h-4 text-stone-400" />
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">كلما كان العنوان واضحاً وبسيطاً، كلما وصلك الطرد في وقت قياسي أسرع.</span>
            </div>

            {/* Nearest Landmark block */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">مدرسة، مسجد أو علامة مميزة كبرى بالمنطقة (اختياري)</label>
              <input
                type="text"
                placeholder="مثال: بجوار مستشفى الجولف، أو سوبر ماركت خير زمان..."
                value={nearestLandmark}
                onChange={(e) => setNearestLandmark(e.target.value)}
                className="w-full bg-stone-25 border border-stone-200 rounded-xl py-3 px-4 text-xs text-stone-850 placeholder-stone-400 focus:outline-hidden"
              />
            </div>

            {/* Special Delivery Notes */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">ملاحظات خاصة لمندوب شركة الشحن (اختياري)</label>
              <textarea
                rows={2}
                placeholder="مثال: أرجو الاتصال بيا قبل التحرك بساعة للتواجد بالمنزل، أو التوصيل بعد الساعة ٤ عصراً..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-stone-25 border border-stone-200 rounded-xl p-3 text-xs text-stone-850 placeholder-stone-400 focus:outline-hidden resize-none"
              />
            </div>

            {/* Payment Method Selected Indicator (Disabling choice as COD only) */}
            <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-200/60 mt-4">
              <span className="block text-xs font-extrabold text-rose-800 mb-2">💳 طريقة الدفع المؤكدة المتاحة للطلبية:</span>
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-rose-250 shadow-2xs">
                <input
                  type="radio"
                  id="cod_payment"
                  name="payment"
                  checked
                  disabled
                  className="w-4 h-4 text-rose-500 accent-rose-500 pointer-events-none"
                />
                <label htmlFor="cod_payment" className="flex items-center gap-2 text-xs font-extrabold text-stone-900 cursor-pointer">
                  <Landmark className="w-4 h-4 text-rose-500" />
                  <span>الدفع عند الاستلام كاش (COD) نقداً</span>
                </label>
              </div>
              <span className="text-[10px] text-rose-700/85 mt-2 block">
                ملاحظة أمان: لست بحاجة لكتابة أي بيانات بنكية للفيزا أو الماستر كارد. متجرنا يضمن أمانك بنظام الكاش الكامل بعد فحص ومراجعة المنتجات.
              </span>
            </div>

            {/* Secure Trigger Submission Buttons */}
            <button
              id="CheckoutForm-SubmitButton"
              type="submit"
              className="w-full py-4 bg-stone-950 hover:bg-stone-850 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.005] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 ml-1" />
              <span>تأكيد تسجيل الأوردر وشحن الطرد فوراً بالتواجد</span>
            </button>

            {/* Security Guarantee Labels */}
            <div className="flex justify-center items-center gap-2 pt-2 text-[10px] text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>منظومة تشفير بيانات المستلم مؤمنة بشكل كامل ومثالي وموثوق بموجب عقد ٢٠٢٦</span>
            </div>

          </form>

          {/* Left Column: Side Order Items and Shipping Fee Tally */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box summary representing what is inside the cart */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
              <h3 className="text-base font-extrabold text-stone-900 pb-3 border-b border-stone-100 flex items-center justify-between">
                <span>ملخص محتويات الأوردر ({cart.reduce((s, i) => s + i.quantity, 0)} قطع)</span>
                <span className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer" onClick={() => setCurrentView('shop')}>تعديل السلة</span>
              </h3>

              {/* Items List */}
              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto py-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between gap-4 text-right">
                    
                    {/* Small preview image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-md border border-stone-200"
                      referrerPolicy="no-referrer"
                    />

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-extrabold text-stone-800 truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-stone-400 font-sans tracking-wide truncate">{item.product.size} | {item.quantity} قطعة</p>
                    </div>

                    {/* Price Tally */}
                    <span className="text-xs font-bold text-stone-900 shrink-0">{(item.product.price * item.quantity).toLocaleString()} ج.م</span>

                  </div>
                ))}
              </div>

              {/* Breakdown tally values */}
              <div className="border-t border-stone-100 pt-4 space-y-3">
                
                {/* Total items before shipping */}
                <div className="flex justify-between items-center text-xs text-stone-500">
                  <span>قيمة المنتجات بالأوردر:</span>
                  <span className="font-bold text-stone-800">{subtotal.toLocaleString()} ج.م</span>
                </div>

                {/* Direct Shipping Fee based on Egypt selective directory */}
                <div className="flex justify-between items-center text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <span>مصاريف وقيمة التوصيل لـ (<span className="font-bold text-stone-800">{selectedGov.nameAr}</span>):</span>
                  </div>
                  <span className="font-bold text-stone-850">{shippingFee === 0 ? 'مجاناً' : `${shippingFee} ج.م`}</span>
                </div>

                {/* Shipping duration indicator */}
                <div className="bg-stone-50 p-2.5 rounded-xl text-[11px] text-stone-550 flex items-center gap-2 border border-stone-150">
                  <Truck className="w-3.5 h-3.5 text-rose-500" />
                  <span>زمن الشحن والتسليم المتوقع لمحافظتك: <strong className="text-stone-850">{selectedGov.deliveryTime}</strong></span>
                </div>

                {/* GRAND TOTAL */}
                <div className="flex justify-between items-center text-base font-black text-stone-950 pt-3 border-t border-stone-200">
                  <span>المبلغ الكلي كاش عند الاستلام:</span>
                  <span className="text-xl text-rose-600">{total.toLocaleString()} ج.م</span>
                </div>

              </div>

            </div>

            {/* Quick Assurance Checklist */}
            <div className="bg-stone-100 p-5 rounded-3xl space-y-3 border border-stone-200">
              <h4 className="text-xs font-extrabold text-stone-800">ضمان وفحوصات Silk& velevt الموثوقة:</h4>
              <ul className="space-y-2 text-[11px] text-stone-550 list-disc pr-4 space-x-reverse">
                <li>يرجى إبقاء هاتفك قريباً ونشطاً لتلقي اتصال مندوبي شركات الشحن الكبرى بمصر للتسليم.</li>
                <li>نوفر لكِ إمكانية مراجعة الأوردر وتفتيشه من الداخل للتأكد من سلامة الزجاجات والعبوات وصلاحيتها قبل التوقيع.</li>
                <li>تتم معالجة الطلبات وإعداد الكراتين الفاخرة المبطنة خلال ساعات من تلقينا إشعار التأكيد بنجاح.</li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
