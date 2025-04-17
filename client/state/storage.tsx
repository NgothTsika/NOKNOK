// storage.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStorage = {
  setItem: async (key: string, value: any) => {
    try {
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Error storing item with key "${key}"`, error);
    }
  },

  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return null;
      try {
        return JSON.parse(value);
      } catch {
        return value; // Return raw string if not JSON
      }
    } catch (error) {
      console.error(`Error retrieving item with key "${key}"`, error);
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item with key "${key}"`, error);
    }
  },

  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing all storage", error);
    }
  },
};
