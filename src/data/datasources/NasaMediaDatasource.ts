export interface NasaMediaItem {
  title: string;
  description: string;
  imageUrl: string;
}

import AsyncStorage from "@react-native-async-storage/async-storage";

export class NasaMediaDatasource {
  async search(query: string, page: number = 1): Promise<NasaMediaItem[]> {
    const key = `media_query_${query}_page_${page}`;
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page=${page}`;

    try {
      const res = await fetch(url);
      const json = await res.json();
      const items = json.collection?.items || [];

      const result = items.map((item: any) => ({
        title: item.data?.[0]?.title || "Sin título",
        description: item.data?.[0]?.description || "Sin descripción",
        imageUrl: item.links?.[0]?.href || "",
      }));

      await AsyncStorage.setItem(key, JSON.stringify(result));
      return result;
    } catch {
      const cached = await AsyncStorage.getItem(key);
      if (cached) return JSON.parse(cached);
      throw new Error("Error al cargar biblioteca de imágenes, sin datos cache.");
    }
  }
}
