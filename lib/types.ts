// Type definitions for the e-commerce application

// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features: string[];
  specifications: Record<string, string>;
  isFeatured: boolean;
  isNew: boolean;
  discount?: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  featured: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
}

// Cart types
export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'credit_card' | 'paypal' | 'apple_pay';
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Filter types
export interface ProductFilter {
  category?: string;
  brand?: string;
  price?: {
    min?: number;
    max?: number;
  };
  rating?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular';
  inStock?: boolean;
}