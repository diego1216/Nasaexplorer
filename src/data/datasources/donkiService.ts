// src/data/datasources/donkiService.ts
import { NASA_API_KEY } from "@env";   //importar la clave api
import axios from "axios";//importaaxios para hacer peticiones http
import AsyncStorage from "@react-native-async-storage/async-storage";

export const donkiService = {
  async getCmeEvents(startDate: string, endDate: string) {
    const url = `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
    const key = `donki_${startDate}_${endDate}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return data;
    } catch (error) {
      console.warn("FALLBACK desde AsyncStorage DONKI");
      const cached = await AsyncStorage.getItem(key);
      if (cached) return JSON.parse(cached);
      throw new Error("No se pudo cargar datos DONKI ni desde la red ni desde cache.");
    }
  }
};
