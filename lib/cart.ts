"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          return set({
            items: items.map(item => 
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        }
        
        set({ items: [...items, { product, quantity }] });
      },
      
      removeItem: (productId: string) => {
        const { items } = get();
        set({
          items: items.filter(item => item.product.id !== productId),
        });
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          return get().removeItem(productId);
        }
        
        set({
          items: items.map(item => 
            item.product.id === productId 
              ? { ...item, quantity }
              : item
          ),
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      get subtotal() {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      
      get tax() {
        return get().subtotal * 0.1; // 10% tax
      },
      
      get shipping() {
        const subtotal = get().subtotal;
        return subtotal > 100 ? 0 : 10; // Free shipping on orders over $100
      },
      
      get total() {
        return get().subtotal + get().tax + get().shipping;
      },
    }),
    {
      name: 'electronics-cart', // name for the persisted storage
    }
  )
);