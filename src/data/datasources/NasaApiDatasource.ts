import axios from 'axios'; // Importa Axios para realizar peticiones HTTP a la API de la NASA
import { NASA_API_KEY } from "@env"; // Importa la clave API desde un archivo .env de forma segura
import { AstronomyPicture } from "../../domain/entites/AstronomyPicture"; // Importa la entidad que representa la estructura del dato APOD
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage para manejar almacenamiento local persistente en React Native

// Define una clase llamada NasaApiDatasource que actuará como fuente de datos (Datasource) para la API APOD
export class NasaApiDatasource {
  // Clave privada para guardar y recuperar los datos desde AsyncStorage
  private readonly STORAGE_KEY = "apod_latest";

  // Método asíncrono que obtiene la imagen astronómica del día (APOD)
  async fetchAstonomyPicture(): Promise<AstronomyPicture[]> {
    // Construye la URL de la API, incluyendo la clave de autenticación
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

    try {
      // Intenta hacer la petición HTTP a la URL usando Axios
      const response = await axios.get(url);

      // Extrae los datos de la respuesta
      const data = response.data;

      // Guarda los datos obtenidos en AsyncStorage como cadena JSON
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

      // Devuelve los datos al llamador (generalmente un ViewModel o UseCase)
      return data;
    } catch (error) {
      // Si falla la petición (por ejemplo, no hay conexión), intenta recuperar datos del almacenamiento local
      console.warn("FALLBACK desde AsyncStorage APOD");

      // Obtiene el valor almacenado anteriormente en AsyncStorage usando la clave
      const cached = await AsyncStorage.getItem(this.STORAGE_KEY);

      // Si hay datos almacenados, los convierte de string a objeto y los retorna
      if (cached) return JSON.parse(cached);

      // Si no hay datos en caché, lanza un error personalizado
      throw new Error("Error al cargar APOD, sin datos cache disponibles.");
    }
  }
}
