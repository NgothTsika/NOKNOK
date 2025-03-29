import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

interface authStore {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  setCurrentOrder: (order: any) => void;
  currentOrder: Record<string, any> | null;
  logout: () => void;
}

export const useAuthStore = create<authStore>()(
  persist(
    (set, get) => ({
      user: null,
      currentOrder: null,
      setCurrentOrder: (order) => set({ currentOrder: order }),
      setUser: (data) => set({ user: data }),
      logout: () => set({ user: null, currentOrder: null }),
    }),
    {
      name: "auth-storage", // Name of the storage key
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage instead of mmkvStorage
    }
  )
);
