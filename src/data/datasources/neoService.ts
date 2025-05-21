import { NASA_API_KEY } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const neoService = {
  async getAsteroids(startDate: string, endDate: string) {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
    const key = `neo_${startDate}_${endDate}`;

    try {
      const response = await axios.get(url);
      const neoData = response.data.near_earth_objects;
      const asteroids: any[] = [];

      Object.keys(neoData).forEach(date => {
        neoData[date].forEach((asteroid: any) => {
          asteroids.push({ ...asteroid, date });
        });
      });

      await AsyncStorage.setItem(key, JSON.stringify(asteroids));
      return asteroids.sort((a, b) => b.date.localeCompare(a.date));
    } catch {
      const cached = await AsyncStorage.getItem(key);
      if (cached) return JSON.parse(cached);
      throw new Error("Error al cargar NEO, sin datos cache.");
    }
  }
};
