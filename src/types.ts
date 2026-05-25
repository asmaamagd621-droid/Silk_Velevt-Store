export type Category = 'skincare' | 'makeup' | 'haircare' | 'fragrance' | 'bundles';

export interface Product {
  id: string;
  name: string;
  englishName: string;
  category: Category;
  description: string;
  longDescription: string;
  price: number; // Price in EGP
  originalPrice?: number; // For discount display
  rating: number;
  reviewsCount: number;
  image: string;
  tag?: string; // e.g., "الأكثر مبيعاً" or "جديد" or "عرض لفترة محدودة"
  size: string; // e.g., "50ml", "100ml", "واحد"
  benefits: string[];
  howToUse: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string; // Optional if product has options
}

export interface Governorate {
  id: string;
  nameAr: string;
  nameEn: string;
  shippingFee: number;
  deliveryTime: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string; // e.g., SV-2026-X
  customerName: string;
  phone: string;
  alternativePhone?: string;
  governorate: Governorate;
  address: string;
  nearestLandmark?: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'cod'; // Cash on Delivery only
  createdAt: string;
  status: OrderStatus;
  notes?: string;
}

export interface QuizQuestion {
  id: number;
  questionAr: string;
  questionEn: string;
  options: {
    id: string;
    textAr: string;
    textEn: string;
    categoryTag: Category; // Which category of products suits this recommendation
  }[];
}
