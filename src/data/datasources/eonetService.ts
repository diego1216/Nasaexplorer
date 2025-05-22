// src/data/datasources/donkiService.ts

import { NASA_API_KEY } from "@env"; // Importa la clave API desde el archivo .env (segura y fuera del código fuente)
import axios from "axios"; // Importa la librería Axios para hacer peticiones HTTP a la API de la NASA
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage para guardar datos localmente (modo offline)

// Exporta un objeto llamado donkiService que contiene métodos para interactuar con la API DONKI
export const donkiService = {
  // Método asíncrono que obtiene eventos CME entre dos fechas dadas
  async getCmeEvents(startDate: string, endDate: string) {
    // Construye la URL con los parámetros de fecha y la API key
    const url = `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;

    // Crea una clave única para guardar/leer los datos del almacenamiento local
    const key = `donki_${startDate}_${endDate}`;

    try {
      // Intenta hacer la petición GET a la URL usando Axios
      const response = await axios.get(url);

      // Extrae los datos de la respuesta
      const data = response.data;

      // Guarda los datos obtenidos en AsyncStorage en formato JSON string
      await AsyncStorage.setItem(key, JSON.stringify(data));

      // Devuelve los datos al llamador (normalmente un ViewModel o slice)
      return data;
    } catch (error) {
      // Si falla la petición, se lanza este fallback para intentar obtener los datos guardados
      console.warn("FALLBACK desde AsyncStorage DONKI");

      // Intenta obtener datos previamente guardados del almacenamiento local
      const cached = await AsyncStorage.getItem(key);

      // Si existen datos en caché, los convierte de string a objeto y los retorna
      if (cached) return JSON.parse(cached);

      // Si no hay datos en red ni en caché, lanza un error
      throw new Error("No se pudo cargar datos DONKI ni desde la red ni desde cache.");
    }
  }
};
