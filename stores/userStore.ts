import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  // Masa ve kullanıcı bilgileri
  tableId: string | null;
  userId: string | null;
  userName: string | null;
  isConnected: boolean;
  
  // Actions
  connectToTable: (tableId: string) => void;
  setUserInfo: (userId: string, userName: string) => void;
  disconnect: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state
      tableId: null,
      userId: null,
      userName: null,
      isConnected: false,

      // Actions
      connectToTable: (tableId: string) => 
        set({ tableId, isConnected: true }),
      
      setUserInfo: (userId: string, userName: string) => 
        set({ userId, userName }),
      
      disconnect: () => 
        set({ 
          tableId: null, 
          userId: null, 
          userName: null, 
          isConnected: false 
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 