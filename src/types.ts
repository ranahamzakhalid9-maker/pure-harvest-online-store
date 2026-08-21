export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  description: string;
  detailedDescription?: string;
  netWeight: string;
  origin: string;
  inStock: boolean;
  bestseller?: boolean;
  isOrganic?: boolean;
  benefits?: string[];
  ingredients?: string;
  howToUse?: string;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  image: string;
  description?: string;
  icon?: string;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  saveAddress: boolean;
}

export interface DeliveryOption {
  id: 'standard' | 'express';
  name: string;
  duration: string;
  description: string;
  price: number;
}

export type ActivePage = 'home' | 'shop' | 'categories' | 'product-detail' | 'cart' | 'checkout' | 'about' | 'contact';
