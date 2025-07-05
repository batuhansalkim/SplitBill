/**
 * Store Exports - Enterprise-level state management
 * 
 * @description Centralized export for all Zustand stores
 */

// User Management
export { useUserStore } from './slices/userSlice';
export type { UserState } from './slices/userSlice';

// Menu Management
export { useMenuStore } from './slices/menuSlice';
export type { Category, MenuState, Product } from './slices/menuSlice';

// Cart Management
export { useCartStore } from './slices/cartSlice';
export type { CartItem, CartState } from './slices/cartSlice';

// Order Management
export { useOrderStore } from './slices/orderSlice';
export type { Order, OrderState, OrderStatus } from './slices/orderSlice';

// Group Management
export { useGroupStore } from './groupStore';
export type { GroupState, GroupUser, SharedItem } from './groupStore';

