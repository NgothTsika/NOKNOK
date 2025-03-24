import { MMKV } from "react-native-mmkv";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const tokenStorage = new MMKV({
  id: "token-storage",
  encryptionKey: "token-storage-encryption-key",
});

export const storage = new MMKV({
  id: "my-app-storage",
  encryptionKey: "my-app-storage-encryption-key",
});

export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};
