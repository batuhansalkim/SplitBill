import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Product Interface
 * 
 * @description Defines the structure of a product
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image?: string;
  available: boolean;
  preparationTime?: number; // minutes
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  tags?: string[];
  isPopular?: boolean;
  isNew?: boolean;
  discountPercentage?: number;
}

/**
 * Category Interface
 * 
 * @description Defines the structure of a menu category
 */
export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  image?: string;
}

/**
 * Menu State Interface
 * 
 * @description Defines the structure of menu-related state
 */
interface MenuState {
  // Data
  products: Product[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    allergens: string[];
    tags: string[];
    availability: 'all' | 'available' | 'unavailable';
  };
  
  // Loading states
  isLoading: boolean;
  isRefreshing: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<MenuState['filters']>) => void;
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  removeProduct: (productId: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (categoryId: string, updates: Partial<Category>) => void;
  removeCategory: (categoryId: string) => void;
  setLoading: (loading: boolean) => void;
  setRefreshing: (refreshing: boolean) => void;
  
  // Computed values
  getProductsByCategory: (categoryId: string) => Product[];
  getFilteredProducts: () => Product[];
  getPopularProducts: () => Product[];
  getNewProducts: () => Product[];
  getDiscountedProducts: () => Product[];
}

/**
 * Menu Store - Enterprise-level menu state management
 * 
 * @description Manages menu data, categories, search, and filtering
 * @example
 * ```tsx
 * const { products, categories, selectedCategory, getProductsByCategory } = useMenuStore();
 * ```
 */
export const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      categories: [],
      selectedCategory: null,
      searchQuery: '',
      filters: {
        priceRange: [0, 1000],
        allergens: [],
        tags: [],
        availability: 'all',
      },
      isLoading: false,
      isRefreshing: false,

      // Actions
      setProducts: (products) => set({ products }),
      
      setCategories: (categories) => set({ categories }),
      
      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
      
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      
      addProduct: (product) => set((state) => ({
        products: [...state.products, product]
      })),
      
      updateProduct: (productId, updates) => set((state) => ({
        products: state.products.map(product =>
          product.id === productId ? { ...product, ...updates } : product
        )
      })),
      
      removeProduct: (productId) => set((state) => ({
        products: state.products.filter(product => product.id !== productId)
      })),
      
      addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
      })),
      
      updateCategory: (categoryId, updates) => set((state) => ({
        categories: state.categories.map(category =>
          category.id === categoryId ? { ...category, ...updates } : category
        )
      })),
      
      removeCategory: (categoryId) => set((state) => ({
        categories: state.categories.filter(category => category.id !== categoryId)
      })),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setRefreshing: (isRefreshing) => set({ isRefreshing }),

      // Computed values
      getProductsByCategory: (categoryId) => {
        const { products } = get();
        return products.filter(product => product.categoryId === categoryId);
      },
      
      getFilteredProducts: () => {
        const { products, searchQuery, filters, selectedCategory } = get();
        
        let filtered = products;
        
        // Filter by category
        if (selectedCategory) {
          filtered = filtered.filter(product => product.categoryId === selectedCategory);
        }
        
        // Filter by search query
        if (searchQuery) {
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Filter by price range
        filtered = filtered.filter(product =>
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );
        
        // Filter by allergens
        if (filters.allergens.length > 0) {
          filtered = filtered.filter(product =>
            !product.allergens?.some(allergen => filters.allergens.includes(allergen))
          );
        }
        
        // Filter by tags
        if (filters.tags.length > 0) {
          filtered = filtered.filter(product =>
            product.tags?.some(tag => filters.tags.includes(tag))
          );
        }
        
        // Filter by availability
        if (filters.availability !== 'all') {
          filtered = filtered.filter(product =>
            filters.availability === 'available' ? product.available : !product.available
          );
        }
        
        return filtered;
      },
      
      getPopularProducts: () => {
        const { products } = get();
        return products.filter(product => product.isPopular).slice(0, 10);
      },
      
      getNewProducts: () => {
        const { products } = get();
        return products.filter(product => product.isNew).slice(0, 10);
      },
      
      getDiscountedProducts: () => {
        const { products } = get();
        return products.filter(product => product.discountPercentage && product.discountPercentage > 0);
      },
    }),
    {
      name: 'menu-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        selectedCategory: state.selectedCategory,
        filters: state.filters,
      }),
    }
  )
);

export default useMenuStore; 