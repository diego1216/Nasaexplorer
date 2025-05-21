import axios from 'axios';
import { NASA_API_KEY } from "@env";
import { AstronomyPicture } from "../../domain/entites/AstronomyPicture";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class NasaApiDatasource {
  private readonly STORAGE_KEY = "apod_latest";

  async fetchAstonomyPicture(): Promise<AstronomyPicture[]> {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Guardar en AsyncStorage como string
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch (error) {
      console.warn("FALLBACK desde AsyncStorage APOD");
      const cached = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (cached) return JSON.parse(cached);
      throw new Error("Error al cargar APOD, sin datos cache disponibles.");
    }
  }
}
