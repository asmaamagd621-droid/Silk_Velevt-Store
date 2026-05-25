import React, { useState, useEffect } from 'react';
import { Sparkles, Star, ShieldCheck, Landmark, Heart, HelpCircle, ChevronDown, ShoppingBag } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkinQuiz from './components/SkinQuiz';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CheckoutForm from './components/CheckoutForm';
import OrderTracking from './components/OrderTracking';
import Footer from './components/Footer';
import ExportModal from './components/ExportModal';

import { products } from './data';
import { Product, CartItem, Order, Category } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'quiz' | 'tracking' | 'checkout'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Load cart and orders from localStorage on boot
  useEffect(() => {
    const cachedCart = localStorage.getItem('silk_velvet_cart');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error('Error parsing cart cache', e);
      }
    }

    const cachedOrders = localStorage.getItem('silk_velvet_orders');
    if (cachedOrders) {
      try {
        setOrders(JSON.parse(cachedOrders));
      } catch (e) {
        console.error('Error parsing orders cache', e);
      }
    }
  }, []);

  // Sync cart helper
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('silk_velvet_cart', JSON.stringify(updatedCart));
  };

  // Add to Cart
  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { product, quantity }];
    }

    saveCartToStorage(updatedCart);
    
    // Auto trigger slide open drawer to signal instant add and prompt checkout
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const updated = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCartToStorage(updated);
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter((item) => item.product.id !== productId);
    saveCartToStorage(updated);
  };

  // Process checkout order registration
  const handlePlaceOrder = (customerDetails: {
    customerName: string;
    phone: string;
    alternativePhone?: string;
    governorate: any; // Governorate type
    address: string;
    nearestLandmark?: string;
    notes?: string;
  }) => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shippingFee = customerDetails.governorate.shippingFee;
    const total = subtotal + shippingFee;

    // Generate a unique Egyptian order number format: e.g. SV-2026-X
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `SV-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: generatedId,
      customerName: customerDetails.customerName,
      phone: customerDetails.phone,
      alternativePhone: customerDetails.alternativePhone,
      governorate: customerDetails.governorate,
      address: customerDetails.address,
      nearestLandmark: customerDetails.nearestLandmark,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      subtotal,
      shippingFee,
      total,
      paymentMethod: 'cod',
      createdAt: new Date().toISOString(),
      status: 'pending',
      notes: customerDetails.notes,
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('silk_velvet_orders', JSON.stringify(updatedOrders));

    // Wipe cart active storage
    saveCartToStorage([]);

    return newOrder;
  };

  // Filter products by category tab and live search term
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.includes(searchTerm) ||
      prod.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const faqs = [
    {
      q: 'هل التوصيل متوفر لجميع المحافظات بمصر؟',
      a: 'نعم بالكامل! متجر Silk& velevt يشحن لجميع الـ 27 محافظة مصرية دون شروط معقدة. التوصيل يشمل القاهرة والجيزة وكل محافظات الدلتا، القناة، والصعيد والمحافظات الحدودية والبحر الأحمر وسيناء في غضون ٢ إلى ٧ أيام كحد أقصى حسب المحافظة.'
    },
    {
      q: 'كيف تنظمون عملية "الدفع عند الاستلام كاش"؟',
      a: 'تسهيلاً وتبسيطاً لجميع عميلاتنا، لا نطلب منكِ أي معلومات بطاقة ائتمان أو فيزا مطلقاً. تقومين فقط بتعبئة وتأكيد الأوردر ومراجعة تكلفة الشحن للمحافظة، وسوف يصلك المندوب ويقوم بتسليم الطرد، وتقومين بدفع القيمة كاش نقداً بعد استلامك ومعاينتك للمحتوى.'
    },
    {
      q: 'هل يمكنني فحص ومعاينة مستحضرات التجميل قبل دفع الكاش ومغادرة المندوب؟',
      a: 'بكل تأكيد! هذه سياستنا الصارمة للثقة. لكِ مطلق الحق بموجب تعاقدنا مع شركات الشحن بمصر أن تطلبي من المندوب فتح العبوة الكرتونية وفحص زجاجات ومستحضرات Silk& velevt ومراجعتها من حيث الجودة والسلامة قبل سداد ثمن الفاتورة كاش.'
    },
    {
      q: 'ما هي مواصفات منتجات Silk& velevt وهل هي آمنة ومصرحة؟',
      a: 'جميع منتجاتنا العلاجية والتجميلية مصممة بأعلى معايير الرعاية الطبيعية. تركيبات الهيالورونيك، الأرجان، وبلاشر الخدود مصنوعة بمكونات تجميلية مرخصة وأصلية ١٠٠٪، وهي خالية من الكيماويات القاسية ومناسبة تماماً لكل أنواع البشرة وخاصة البشرة الحساسة والمختلطة.'
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-beige flex flex-col justify-between font-sans text-luxury-charcoal">
      
      {/* Top Banner Offer Line */}
      <div className="bg-luxury-charcoal text-white text-[11px] sm:text-xs text-center py-2 px-4 flex items-center justify-center gap-2 font-medium tracking-wide rtl border-b border-luxury-gold/20">
        <span>🚚 عرض حصري: شحن مخفض وسريع بجميع المحافظات ودفع كاش نقداً عند منزلك</span>
        <span className="hidden sm:inline bg-luxury-gold text-luxury-charcoal text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">COD</span>
      </div>

      {/* Main Header Routing Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={(v) => {
          setCurrentView(v);
          setSearchTerm('');
        }}
        cart={cart}
        setIsCartOpen={setIsCartDrawerOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenExport={() => setIsExportModalOpen(true)}
      />

      {/* CORE ROUTING PANEL RENDERINGS */}
      <main className="flex-1">
        
        {/* VIEW: HOME SCREEN */}
        {currentView === 'home' && (
          <div>
            <Hero
              setCurrentView={(v) => setCurrentView(v)}
              setSelectedCategory={(cat) => setSelectedCategory(cat)}
            />

            {/* Featured Luxury Carousel Catalog line */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 rtl text-right">
              <div className="flex flex-col sm:flex-row-reverse sm:justify-between sm:items-end mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-luxury-charcoal font-serif">المجموعات الأكثر طلباً وشهرة</h2>
                  <p className="text-stone-650 text-sm mt-1">تألقي بمنتجات نالت رضا وثقة آلاف السيدات وتعتبر رفيقة الترطيب والجمال المعتمدة لديهن.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('shop');
                  }}
                  className="bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-charcoal text-xs font-bold py-2.5 px-6 rounded-full transition-all shrink-0 cursor-pointer self-start shadow-xs"
                >
                  تصفح كامل المتجر المفتوح
                </button>
              </div>

              {/* Grid with premier products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, 4).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onOpenDetails={(p) => setSelectedProductDetails(p)}
                    addToCart={(p) => addToCart(p, 1)}
                  />
                ))}
              </div>
            </div>

            {/* AI Promoted Banner Banner */}
            <div className="bg-gradient-to-l from-luxury-gold/5 via-luxury-beige/40 to-luxury-gold/15 py-16 px-4">
              <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-luxury-gold/25 shadow-xl flex flex-col md:flex-row-reverse items-center justify-between gap-8 rtl text-right">
                <div className="w-full md:w-1/2 h-72 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600"
                    alt="Cosmetics and beauty care setup"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 space-y-6">
                  <span className="inline-flex items-center gap-1.5 bg-luxury-beige text-luxury-charcoal text-xs font-bold px-3 py-1 rounded-full border border-luxury-gold/25">
                    <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>مستشار روتين التجميل المجاني</span>
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-luxury-charcoal leading-tight">حائرة بشأن تحديد ما يناسب نوع بشرتك وشعرك؟</h3>
                  
                  <p className="text-stone-600 text-sm leading-relaxed max-w-xl">
                    دعي مستشار الجمال الذكي لـ <strong>Silk& velevt</strong> يرشدك للحل الفعال. أجيبي عن بضعة أسئلة شخصية وسنوفر لك روتيناً مقترحاً متكاملاً وملائماً لجمالك وتغذيتك الفورية.
                  </p>

                  <button
                    onClick={() => setCurrentView('quiz')}
                    className="bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-charcoal font-bold text-sm py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>ابدئي اختبار جمال البشرة والشعر المجاني</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Elegant Cosmetics FAQ Accordion Section */}
            <div id="faq-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 rtl text-right">
              <h3 className="text-3xl font-extrabold text-luxury-charcoal text-center mb-1 font-serif">الأسئلة الأكثر شيوعاً وتكراراً</h3>
              <p className="text-stone-500 text-sm text-center mb-12">كل ما تودين معرفته حول المحافظات المستفيدة، الدفع الكاش وسرية الطلب بأمان</p>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                      className="w-full py-5 px-6 font-bold text-luxury-charcoal flex justify-between items-center text-right cursor-pointer hover:bg-luxury-beige transition-colors focus:outline-hidden"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-stone-500 transform transition-transform duration-350 ${faqOpenIndex === idx ? 'rotate-180 text-luxury-gold' : ''}`} />
                    </button>
                    {faqOpenIndex === idx && (
                      <div className="px-6 pb-6 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100/65 font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: PRODUCTS CATALOG AND SHOPPING SCREEN */}
        {currentView === 'shop' && (
          <div id="shop-section" className="bg-luxury-beige py-12 px-4 sm:px-6 lg:px-8 text-right rtl">
            <div className="max-w-7xl mx-auto">
              
              <div className="text-center mb-12">
                <h1 className="text-4xl font-black text-luxury-charcoal">صالة العرض والمستحضرات الفائقة</h1>
                <p className="text-stone-650 text-sm mt-2 max-w-xl mx-auto">تسوّقي رغد الحرير ونعومة المخمل في كبسولات تجميلية استثنائية وباقات هدايا قيمة توفيرية لجميع المحافظات بمصر</p>
              </div>

              {/* Category selector Filters and Search summary */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-luxury-gold-hover/20 pb-8 mb-10">
                
                {/* Search summary indicator */}
                <div className="text-sm text-luxury-charcoal/90 font-semibold order-last md:order-first">
                  {searchTerm ? (
                    <span>نتائج البحث عن "<strong className="text-luxury-gold">{searchTerm}</strong>": تم العثور على <strong className="text-luxury-charcoal font-bold">{filteredProducts.length}</strong> منتج</span>
                  ) : (
                    <span>نعرض لكِ تشكيلة الـ <strong className="text-luxury-charcoal font-bold">{filteredProducts.length}</strong> منتجات المتكاملة</span>
                  )}
                </div>

                {/* Filter Tabs list */}
                <div className="flex flex-wrap gap-2.5 justify-center">
                  {[
                    { id: 'all', label: 'كافة المنتجات' },
                    { id: 'skincare', label: 'العناية بالبشرة' },
                    { id: 'makeup', label: 'المكياج الفاخر' },
                    { id: 'haircare', label: 'عناية الشعر وجفافه' },
                    { id: 'fragrance', label: 'العطور وروح الشرق' },
                    { id: 'bundles', label: 'علب هدايا توفيرية' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id as Category | 'all')}
                      className={`py-2.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === tab.id
                          ? 'bg-luxury-gold text-luxury-charcoal shadow-md border border-luxury-gold'
                          : 'bg-white border border-stone-200 text-luxury-charcoal hover:bg-stone-55'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Products Rendering Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-luxury-gold/25 shadow-xs">
                  <span className="text-5xl block">🔎</span>
                  <h3 className="text-lg font-bold text-luxury-charcoal mt-4">عذراً، لم نجد أي تطابق لبحثكِ!</h3>
                  <p className="text-sm text-stone-500 mt-1">جربي استخدام كلمات بحث عامة وصالحة مثل "سيروم" أو "بلاشر" أو تصفية تصنيف المكياج.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="mt-6 bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-charcoal hover:opacity-90 text-xs font-bold py-2.5 px-6 rounded-lg cursor-pointer"
                  >
                    تصفير كلمات البحث بالكامل
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onOpenDetails={(p) => setSelectedProductDetails(p)}
                      addToCart={(p) => addToCart(p, 1)}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* VIEW: SKIN TYPE & BEAUTY QUIZ SCREEN */}
        {currentView === 'quiz' && (
          <SkinQuiz
            addToCart={addToCart}
            setCurrentView={(view) => setCurrentView(view)}
            setSelectedCategory={(cat) => setSelectedCategory(cat)}
          />
        )}

        {/* VIEW: INVOICE AND DETAILED ORDER TRACKING SCREEN */}
        {currentView === 'tracking' && (
          <OrderTracking
            orders={orders}
            setOrders={setOrders}
          />
        )}

        {/* VIEW: CHECKOUT FORM AND SUMMARY SCREEN */}
        {currentView === 'checkout' && (
          <CheckoutForm
            cart={cart}
            placeOrder={handlePlaceOrder}
            setCurrentView={(view) => setCurrentView(view)}
          />
        )}

      </main>

      {/* RETAINED MODALS & DRAWER PORTALS (Overlays) */}
      
      {/* Product specs popup Detail Modal */}
      {selectedProductDetails && (
        <ProductDetailsModal
          product={selectedProductDetails}
          onClose={() => setSelectedProductDetails(null)}
          addToCart={addToCart}
        />
      )}

      {/* Cart Drawer Slide Overlay */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        updateQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        setCurrentView={(view) => setCurrentView(view)}
      />

      {/* Export Code / Download ZIP modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Base Global Luxury footer */}
      <Footer setCurrentView={(v) => setCurrentView(v)} />

    </div>
  );
}
