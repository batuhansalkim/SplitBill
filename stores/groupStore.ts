import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from './menuStore';

export interface GroupUser {
  id: string;
  name: string;
  avatar: string;
  isActive: boolean;
}

export interface SharedItem {
  id: string;
  product: Product;
  quantity: number;
  sharedWith: string[]; // User IDs
  notes?: string;
  addedBy: string; // User ID who added this item
  addedAt: Date;
}

interface GroupState {
  // State
  users: GroupUser[];
  sharedItems: SharedItem[];
  currentUserId: string | null;
  
  // Actions
  addUser: (name: string) => string;
  removeUser: (userId: string) => void;
  setCurrentUser: (userId: string) => void;
  
  addSharedItem: (product: Product, quantity: number, sharedWith: string[], notes?: string) => void;
  removeSharedItem: (itemId: string) => void;
  updateSharedItemQuantity: (itemId: string, quantity: number) => void;
  updateSharedItemNotes: (itemId: string, notes: string) => void;
  
  addUserToSharedItem: (itemId: string, userId: string) => void;
  removeUserFromSharedItem: (itemId: string, userId: string) => void;
  
  calculatePerPersonAmount: (itemId: string) => number;
  calculateUserTotalAmount: (userId: string) => number;
  calculateTotalSharedAmount: () => number;
  
  clearGroup: () => void;
}

export const useGroupStore = create<GroupState>()(
  persist(
    (set, get) => ({
      // Initial state
      users: [
        { id: 'u1', name: 'Ali', avatar: 'A', isActive: true },
        { id: 'u2', name: 'Veli', avatar: 'V', isActive: true },
        { id: 'u3', name: 'Ayşe', avatar: 'A', isActive: true },
        { id: 'u4', name: 'Zeynep', avatar: 'Z', isActive: true },
      ],
      sharedItems: [],
      currentUserId: 'u1',

      // User Management
      addUser: (name: string) => {
        const { users } = get();
        const newUser: GroupUser = {
          id: `u${Date.now()}`,
          name: name.trim(),
          avatar: name.trim()[0].toUpperCase(),
          isActive: true,
        };
        set({ users: [...users, newUser] });
        return newUser.id;
      },

      removeUser: (userId: string) => {
        const { users, sharedItems } = get();
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, isActive: false } : user
        );
        
        // Bu kullanıcıyı tüm ortak ürünlerden çıkar
        const updatedSharedItems = sharedItems.map(item => ({
          ...item,
          sharedWith: item.sharedWith.filter(id => id !== userId)
        })).filter(item => item.sharedWith.length > 0); // Boş kalan ürünleri sil
        
        set({ users: updatedUsers, sharedItems: updatedSharedItems });
      },

      setCurrentUser: (userId: string) => {
        set({ currentUserId: userId });
      },

      // Shared Item Management
      addSharedItem: (product: Product, quantity: number, sharedWith: string[], notes = '') => {
        const { sharedItems, currentUserId } = get();
        const newItem: SharedItem = {
          id: `shared_${Date.now()}`,
          product,
          quantity,
          sharedWith,
          notes,
          addedBy: currentUserId || 'u1',
          addedAt: new Date(),
        };
        set({ sharedItems: [...sharedItems, newItem] });
      },

      removeSharedItem: (itemId: string) => {
        const { sharedItems } = get();
        const updatedItems = sharedItems.filter(item => item.id !== itemId);
        set({ sharedItems: updatedItems });
      },

      updateSharedItemQuantity: (itemId: string, quantity: number) => {
        const { sharedItems } = get();
        const updatedItems = sharedItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ sharedItems: updatedItems });
      },

      updateSharedItemNotes: (itemId: string, notes: string) => {
        const { sharedItems } = get();
        const updatedItems = sharedItems.map(item =>
          item.id === itemId ? { ...item, notes } : item
        );
        set({ sharedItems: updatedItems });
      },

      // User-Item Relationship Management
      addUserToSharedItem: (itemId: string, userId: string) => {
        const { sharedItems } = get();
        const updatedItems = sharedItems.map(item =>
          item.id === itemId && !item.sharedWith.includes(userId)
            ? { ...item, sharedWith: [...item.sharedWith, userId] }
            : item
        );
        set({ sharedItems: updatedItems });
      },

      removeUserFromSharedItem: (itemId: string, userId: string) => {
        const { sharedItems } = get();
        const updatedItems = sharedItems.map(item =>
          item.id === itemId
            ? { ...item, sharedWith: item.sharedWith.filter(id => id !== userId) }
            : item
        ).filter(item => item.sharedWith.length > 0); // Boş kalan ürünleri sil
        set({ sharedItems: updatedItems });
      },

      // Calculation Methods
      calculatePerPersonAmount: (itemId: string) => {
        const { sharedItems } = get();
        const item = sharedItems.find(i => i.id === itemId);
        if (!item || item.sharedWith.length === 0) return 0;
        return (item.product.price * item.quantity) / item.sharedWith.length;
      },

      calculateUserTotalAmount: (userId: string) => {
        const { sharedItems } = get();
        return sharedItems
          .filter(item => item.sharedWith.includes(userId))
          .reduce((total, item) => {
            const perPersonAmount = (item.product.price * item.quantity) / item.sharedWith.length;
            return total + perPersonAmount;
          }, 0);
      },

      calculateTotalSharedAmount: () => {
        const { sharedItems } = get();
        return sharedItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },

      clearGroup: () => {
        set({ users: [], sharedItems: [], currentUserId: null });
      },
    }),
    {
      name: 'group-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 