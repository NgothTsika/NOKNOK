import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface authStore {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  setCurrentOrder: (order: any) => void;
  currentOrder: Record<string, any> | null;
  logout: () => void;
  // getUser: () => Record<string, any> | null;
}

export const useAuthStore = create<authStore>()(
  persist(
    (set, get) => ({
      user: null,
      currentOrder: null,
      setCurrentOrder: (order) => set({ currentOrder: order }),
      setUser: (data) => set({ user: data }),
      logout: () => set({ user: null, currentOrder: null }),
      getUser: () => get().user, // Now you can retrieve the user from the store
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
