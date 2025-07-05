import { create } from 'zustand';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  tableId: string;
  userId: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    notes?: string;
  }>;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  estimatedTime?: number; // dakika cinsinden
  notes?: string;
}

interface OrderState {
  // State
  currentOrder: Order | null;
  orderHistory: Order[];
  isLoading: boolean;
  
  // Actions
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setCurrentOrder: (order: Order | null) => void;
  addToHistory: (order: Order) => void;
  setLoading: (loading: boolean) => void;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  // Initial state
  currentOrder: null,
  orderHistory: [],
  isLoading: false,

  // Actions
  createOrder: (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    set({ currentOrder: newOrder });
  },

  updateOrderStatus: (orderId: string, status: OrderStatus) => {
    const { currentOrder, orderHistory } = get();
    
    if (currentOrder && currentOrder.id === orderId) {
      set({ 
        currentOrder: { ...currentOrder, status },
        orderHistory: [...orderHistory, { ...currentOrder, status }]
      });
    }
  },

  setCurrentOrder: (order: Order | null) => {
    set({ currentOrder: order });
  },

  addToHistory: (order: Order) => {
    const { orderHistory } = get();
    set({ orderHistory: [...orderHistory, order] });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  clearCurrentOrder: () => {
    set({ currentOrder: null });
  },
})); 