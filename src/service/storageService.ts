// src/service/storageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa el módulo de almacenamiento local para React Native

// Define un objeto llamado StorageService que contiene métodos reutilizables para trabajar con AsyncStorage
export const StorageService = {
  // Método para guardar un valor genérico en AsyncStorage
  async save<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value); // Convierte el valor a formato JSON string
      await AsyncStorage.setItem(key, jsonValue); // Guarda el valor bajo la clave especificada
    } catch (error) {
      console.warn(`❌ Error guardando en AsyncStorage (${key}):`, error); // Muestra advertencia si ocurre un error al guardar
    }
  },

  // Método para cargar un valor de AsyncStorage
  async load<T = any>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key); // Intenta obtener el valor almacenado
      return jsonValue != null ? JSON.parse(jsonValue) as T : null; // Si existe, lo convierte de JSON a objeto y lo retorna; si no, retorna null
    } catch (error) {
      console.warn(`❌ Error cargando de AsyncStorage (${key}):`, error); // Muestra advertencia si ocurre un error al cargar
      return null; // Retorna null si falla la operación
    }
  },

  // Método para eliminar un valor de AsyncStorage por su clave
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key); // Elimina el valor almacenado bajo la clave especificada
    } catch (error) {
      console.warn(`❌ Error eliminando de AsyncStorage (${key}):`, error); // Muestra advertencia si ocurre un error al eliminar
    }
  },
};
