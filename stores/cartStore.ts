import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from './menuStore';

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
  totalPrice: number;
}

interface CartState {
  // State
  items: CartItem[];
  totalAmount: number;
  
  // Actions
  addToCart: (product: Product, quantity?: number, notes?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  clearCart: () => void;
  calculateTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      totalAmount: 0,

      // Actions
      addToCart: (product: Product, quantity = 1, notes = '') => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          // Ürün zaten sepette varsa miktarını artır
          const updatedItems = items.map(item =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  totalPrice: (item.quantity + quantity) * product.price,
                  notes: notes || item.notes,
                }
              : item
          );
          set({ items: updatedItems });
        } else {
          // Yeni ürün ekle
          const newItem: CartItem = {
            product,
            quantity,
            notes,
            totalPrice: quantity * product.price,
          };
          set({ items: [...items, newItem] });
        }
        
        // Toplam tutarı güncelle
        get().calculateTotal();
      },

      removeFromCart: (productId: string) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.product.id !== productId);
        set({ items: updatedItems });
        get().calculateTotal();
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();
        const updatedItems = items.map(item =>
          item.product.id === productId
            ? {
                ...item,
                quantity,
                totalPrice: quantity * item.product.price,
              }
            : item
        );
        set({ items: updatedItems });
        get().calculateTotal();
      },

      updateNotes: (productId: string, notes: string) => {
        const { items } = get();
        const updatedItems = items.map(item =>
          item.product.id === productId
            ? { ...item, notes }
            : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [], totalAmount: 0 });
      },

      calculateTotal: () => {
        const { items } = get();
        const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
        set({ totalAmount: total });
        return total;
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 