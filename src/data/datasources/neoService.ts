import { NASA_API_KEY } from "@env"; // Importa la clave API desde el archivo .env de manera segura
import axios from "axios"; // Importa Axios para realizar peticiones HTTP
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage para almacenamiento local persistente (modo offline)

// Exporta un objeto llamado neoService que contiene funciones relacionadas con la API de objetos cercanos a la Tierra (NEO)
export const neoService = {
  // Método asíncrono que obtiene datos de asteroides entre dos fechas dadas
  async getAsteroids(startDate: string, endDate: string) {
    // Construye la URL para acceder al endpoint "feed" de la API NEO, incluyendo fechas y la API key
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;

    // Genera una clave única para guardar/leer los datos desde AsyncStorage
    const key = `neo_${startDate}_${endDate}`;

    try {
      // Realiza una petición HTTP a la API NEO
      const response = await axios.get(url);

      // Extrae los datos de objetos cercanos a la Tierra (near_earth_objects) del cuerpo de la respuesta
      const neoData = response.data.near_earth_objects;

      // Declara un array vacío para almacenar los asteroides recolectados
      const asteroids: any[] = [];

      // Recorre las claves (fechas) del objeto de asteroides
      Object.keys(neoData).forEach(date => {
        // Para cada fecha, recorre los asteroides del día y los agrega al array con su fecha incluida
        neoData[date].forEach((asteroid: any) => {
          asteroids.push({ ...asteroid, date }); // Añade cada asteroide y le agrega el campo `date`
        });
      });

      // Guarda los datos procesados en AsyncStorage como string
      await AsyncStorage.setItem(key, JSON.stringify(asteroids));

      // Retorna el array de asteroides, ordenado de forma descendente por fecha
      return asteroids.sort((a, b) => b.date.localeCompare(a.date));
    } catch {
      // Si ocurre un error (como falta de red), intenta recuperar los datos desde el almacenamiento local
      const cached = await AsyncStorage.getItem(key);

      // Si hay datos guardados en caché, los transforma de string a objeto y los retorna
      if (cached) return JSON.parse(cached);

      // Si no hay datos en red ni en caché, lanza un error personalizado
      throw new Error("Error al cargar NEO, sin datos cache.");
    }
  }
};
