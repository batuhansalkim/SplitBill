import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface MenuState {
  // State
  categories: Category[];
  products: Product[];
  selectedCategory: string | null;
  isLoading: boolean;
  
  // Actions
  setCategories: (categories: Category[]) => void;
  setProducts: (products: Product[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setLoading: (loading: boolean) => void;
  getProductsByCategory: (categoryId: string) => Product[];
}

export const useMenuStore = create<MenuState>((set, get) => ({
  // Initial state
  categories: [],
  products: [],
  selectedCategory: null,
  isLoading: false,

  // Actions
  setCategories: (categories: Category[]) => 
    set({ categories }),
  
  setProducts: (products: Product[]) => 
    set({ products }),
  
  setSelectedCategory: (categoryId: string | null) => 
    set({ selectedCategory: categoryId }),
  
  setLoading: (loading: boolean) => 
    set({ isLoading: loading }),
  
  getProductsByCategory: (categoryId: string) => {
    const { products } = get();
    return products.filter(product => product.category === categoryId);
  },
})); 