import { ShoppingBag, Search, Sparkles, Clock, Star, Menu, X, FolderDown } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: any) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpenExport: () => void;
}

export default function Navbar({
  currentView,
  setCurrentView,
  cart,
  setIsCartOpen,
  searchTerm,
  setSearchTerm,
  onOpenExport,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'shop', label: 'المتجر والمنتجات' },
    { id: 'quiz', label: 'مستشار الجمال والباشرة', icon: <Sparkles className="w-4 h-4 text-amber-500 inline ml-1" /> },
    { id: 'tracking', label: 'تتبع طلبك', icon: <Clock className="w-4 h-4 text-emerald-500 inline ml-1" /> },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-luxury-gold text-luxury-charcoal shadow-md border-b border-luxury-gold-hover/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-luxury-charcoal hover:opacity-85 focus:outline-hidden p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Luxury Brand Logo */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex flex-col items-center justify-center focus:outline-hidden cursor-pointer"
            >
              <span className="font-serif text-2xl font-bold tracking-widest text-luxury-charcoal hover:opacity-80 transition-colors uppercase">
                Silk& velevt
              </span>
              <span className="text-[9px] tracking-[0.3em] text-luxury-charcoal/80 uppercase font-sans mt-0.5">
                Luxury Cosmetics & Care
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 lg:space-x-12 rtl:space-x-reverse items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative py-2 text-[15px] font-bold transition-colors duration-200 cursor-pointer ${
                  currentView === item.id
                    ? 'text-white'
                    : 'text-luxury-charcoal/90 hover:text-white'
                }`}
              >
                <span className="flex items-center">
                  {item.icon}
                  {item.label}
                </span>
                {currentView === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Quick Actions & Search */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Search Bar (Desktop) */}
            <div className="hidden lg:relative lg:block w-64">
              <input
                type="text"
                placeholder="ابحثي عن منتج تجميلي مخصص..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (currentView !== 'shop' && currentView !== 'home') {
                    setCurrentView('shop');
                  }
                }}
                className="w-full bg-luxury-beige border border-luxury-beige rounded-full py-1.5 pl-4 pr-10 text-xs text-luxury-charcoal placeholder-luxury-charcoal/65 focus:outline-hidden focus:border-white focus:bg-white transition-all text-right rtl"
              />
              <Search className="absolute right-3 top-2 w-4 h-4 text-luxury-charcoal/60 pointer-events-none" />
            </div>

            {/* Direct Mobile Search Button (triggers navigating to shop) */}
            <button
              onClick={() => {
                setCurrentView('shop');
                setTimeout(() => {
                  const searchInput = document.getElementById('mobile-search') as HTMLInputElement | null;
                  if (searchInput) searchInput.focus();
                }, 100);
              }}
              className="lg:hidden p-2 text-luxury-charcoal hover:text-white hover:bg-luxury-gold-hover/20 rounded-full transition-colors cursor-pointer"
              aria-label="Search items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Trust Badges Indicator (Delivery and COD info) */}
            <div className="hidden xl:flex flex-col items-end text-[11px] text-luxury-charcoal border-r border-luxury-charcoal/20 pr-4">
              <span className="font-bold text-luxury-charcoal">الدفع عند الاستلام 💵</span>
              <span className="opacity-95">توصيل لجميع المحافظات</span>
            </div>

            {/* Export Code Base Trigger */}
            <button
              onClick={onOpenExport}
              className="relative p-2.5 bg-white hover:bg-luxury-beige text-luxury-charcoal border border-luxury-charcoal/20 rounded-full shadow-xs transition-transform active:scale-95 duration-100 flex items-center justify-center cursor-pointer"
              title="تصدير وتحميل الكود المصدري"
              aria-label="Export Code Base"
            >
              <FolderDown className="w-5 h-5" />
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="Navbar-CartButton"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-luxury-charcoal hover:bg-black text-white rounded-full shadow-xs transition-transform active:scale-95 duration-100 flex items-center justify-center cursor-pointer"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-luxury-charcoal border border-luxury-gold text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slider */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-luxury-gold border-t border-luxury-gold-hover/80 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {/* Interactive Search inside Mobile Menu */}
          <div className="relative my-2">
            <input
              id="mobile-search"
              type="text"
              placeholder="ابحثي عن منتجات العناية بالبشرة، الشعر..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (currentView !== 'shop') {
                  setCurrentView('shop');
                }
              }}
              className="w-full bg-luxury-beige border border-luxury-beige rounded-lg py-2 pl-4 pr-10 text-sm text-luxury-charcoal placeholder-luxury-charcoal/60 focus:outline-hidden text-right rtl"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-luxury-charcoal/60 pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-2 px-3 text-center rounded-lg text-sm font-bold transition-colors duration-200 cursor-pointer ${
                  currentView === item.id
                    ? 'bg-luxury-charcoal text-white'
                    : 'bg-luxury-beige text-luxury-charcoal hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-center">
                  {item.icon}
                  <span className="mr-1">{item.label}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenExport();
            }}
            className="w-full py-2.5 px-4 bg-white border border-luxury-charcoal/10 hover:border-luxury-gold rounded-lg font-bold text-xs text-luxury-charcoal flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <FolderDown className="w-4 h-4 text-luxury-gold" />
            <span>تحميل المشروع كاملاً كـ ZIP 📦</span>
          </button>

          <div className="pt-2 border-t border-luxury-gold-hover/40 flex items-center justify-between text-xs text-luxury-charcoal bg-luxury-beige rounded-lg p-3 rtl">
            <span className="font-bold text-luxury-charcoal">🚚 شحن سريع وآمن:</span>
            <span className="opacity-95">لجميع محافظات الجمهورية مع دفع عند الاستلام</span>
          </div>
        </div>
      )}
    </nav>
  );
}
