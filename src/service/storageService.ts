// src/service/storageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  async save<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.warn(`❌ Error guardando en AsyncStorage (${key}):`, error);
    }
  },

  async load<T = any>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) as T : null;
    } catch (error) {
      console.warn(`❌ Error cargando de AsyncStorage (${key}):`, error);
      return null;
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn(`❌ Error eliminando de AsyncStorage (${key}):`, error);
    }
  },
};
