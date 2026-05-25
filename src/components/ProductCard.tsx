import React from 'react';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onOpenDetails: (product: Product) => void;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails, addToCart }: ProductCardProps) {
  return (
    <div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Panel */}
      <div className="relative overflow-hidden aspect-square shrink-0 bg-stone-50">
        
        {/* Hover image scaling and eye zoom icon Overlay */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
          <button
            id={`ProductCard-QuickView-${product.id}`}
            onClick={() => onOpenDetails(product)}
            className="bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-bold py-2.5 px-4 rounded-full shadow-lg hover:bg-white transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-rose-505" />
            <span>عرض التفاصيل</span>
          </button>
        </div>

        {/* Product Tag */}
        {product.tag && (
          <span className="absolute top-3 right-3 bg-stone-900/90 text-[10px] text-white px-3 py-1 rounded-full font-bold z-20 shadow-sm rtl">
            {product.tag}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Size Badge */}
        <span className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-xs border border-stone-100 text-stone-600 text-[10px] font-bold px-2 py-0.5 rounded-md z-20">
          {product.size}
        </span>
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 text-right flex-1 flex flex-col justify-between rtl">
        <div>
          {/* Category under-title */}
          <span className="text-[10px] font-bold text-rose-500 tracking-wider uppercase">
            {product.category === 'skincare' ? 'العناية بالبشرة' :
             product.category === 'makeup' ? 'مكياج فاخر' :
             product.category === 'haircare' ? 'علاج وتغذية الشعر' :
             product.category === 'fragrance' ? 'عطور حصرية منتقاة' : 'باقات الهدايا التوفيرية'}
          </span>

          <h3 className="text-base font-extrabold text-stone-950 group-hover:text-rose-600 transition-colors line-clamp-1 mt-1">
            {product.name}
          </h3>
          <p className="text-[10px] text-stone-400 font-sans tracking-wide truncate">
            {product.englishName}
          </p>

          <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {product.description}
          </p>

          {/* Ratings & Volume Review */}
          <div className="flex items-center justify-start gap-1 mt-3">
            <span className="text-xs font-semibold text-stone-600">({product.reviewsCount} تقييم)</span>
            <span className="text-xs font-bold text-amber-500 mr-2">{product.rating.toFixed(1)}</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 fill-current ${
                    i < Math.floor(product.rating) ? 'text-amber-400' : 'text-stone-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & Add controls */}
        <div className="mt-4 pt-3 border-t border-stone-150 flex items-center justify-between gap-2">
          
          {/* Prices */}
          <div className="text-right">
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through block">
                {product.originalPrice} ج.م
              </span>
            )}
            <span className="text-lg font-black text-rose-600">
              {product.price} <span className="text-[11px] font-normal text-stone-700">ج.م</span>
            </span>
          </div>

          {/* Quick Add To Cart Button */}
          <button
            id={`ProductCard-AddToCart-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2.5 sm:px-4 sm:py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl active:scale-95 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4 hidden sm:inline" />
            <span>أضيفي للسلة</span>
          </button>

        </div>
      </div>
    </div>
  );
}
