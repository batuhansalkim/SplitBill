import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * User State Interface
 * 
 * @description Defines the structure of user-related state
 */
interface UserState {
  // User and table information
  tableId: string | null;
  userId: string | null;
  userName: string | null;
  isConnected: boolean;
  lastConnectionTime: Date | null;
  
  // Actions
  connectToTable: (tableId: string) => void;
  setUserInfo: (userId: string, userName: string) => void;
  disconnect: () => void;
  updateConnectionTime: () => void;
}

/**
 * User Store - Enterprise-level user state management
 * 
 * @description Manages user authentication, table connection, and session state
 * @example
 * ```tsx
 * const { tableId, isConnected, connectToTable } = useUserStore();
 * ```
 */
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      tableId: null,
      userId: null,
      userName: null,
      isConnected: false,
      lastConnectionTime: null,

      // Actions
      connectToTable: (tableId: string) => {
        set({ 
          tableId, 
          isConnected: true,
          lastConnectionTime: new Date()
        });
      },
      
      setUserInfo: (userId: string, userName: string) => {
        set({ userId, userName });
      },
      
      disconnect: () => {
        set({ 
          tableId: null, 
          userId: null, 
          userName: null, 
          isConnected: false,
          lastConnectionTime: null
        });
      },

      updateConnectionTime: () => {
        set({ lastConnectionTime: new Date() });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        tableId: state.tableId,
        userId: state.userId,
        userName: state.userName,
        isConnected: state.isConnected,
        lastConnectionTime: state.lastConnectionTime,
      }),
    }
  )
);

export default useUserStore; 