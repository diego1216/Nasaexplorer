import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EONET_API_URL = "https://eonet.gsfc.nasa.gov/api/v3/events";

export const eonetService = {
  async getEvents(limit = 20) {
    const key = `eonet_limit_${limit}`;

    try {
      const response = await axios.get(`${EONET_API_URL}?status=open&limit=${limit}`);
      const data = response.data.events;
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return data;
    } catch {
      const cached = await AsyncStorage.getItem(key);
      if (cached) return JSON.parse(cached);
      throw new Error("Error al cargar EONET, sin datos cache.");
    }
  }
};
