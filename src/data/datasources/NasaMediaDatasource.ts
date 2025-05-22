export interface NasaMediaItem {
  title: string; // Título de la imagen o recurso multimedia
  description: string; // Descripción del recurso
  imageUrl: string; // URL directa a la imagen
}

import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage para manejar almacenamiento local (modo offline)

// Clase que funciona como fuente de datos (datasource) para la búsqueda en la NASA Image and Video Library
export class NasaMediaDatasource {
  // Método asíncrono que busca imágenes por una consulta y una página específica
  async search(query: string, page: number = 1): Promise<NasaMediaItem[]> {
    // Define una clave única para guardar los datos en AsyncStorage
    const key = `media_query_${query}_page_${page}`;

    // Construye la URL de la API, codificando la consulta y especificando tipo de medio e índice de página
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page=${page}`;

    try {
      // Realiza una petición HTTP a la API usando fetch
      const res = await fetch(url);

      // Convierte la respuesta a JSON
      const json = await res.json();

      // Accede al array de ítems dentro de la colección, o usa array vacío si no existe
      const items = json.collection?.items || [];

      // Mapea cada item para extraer título, descripción y URL de imagen en un nuevo arreglo de objetos
      const result = items.map((item: any) => ({
        title: item.data?.[0]?.title || "Sin título", // Si falta el título, usa "Sin título"
        description: item.data?.[0]?.description || "Sin descripción", // Si falta la descripción, usa "Sin descripción"
        imageUrl: item.links?.[0]?.href || "", // Si falta el enlace, coloca string vacío
      }));

      // Guarda el resultado transformado en AsyncStorage como string
      await AsyncStorage.setItem(key, JSON.stringify(result));

      // Devuelve los resultados al llamador (usualmente un ViewModel o slice)
      return result;
    } catch {
      // Si ocurre un error, intenta recuperar los datos almacenados en AsyncStorage
      const cached = await AsyncStorage.getItem(key);

      // Si hay datos guardados, los convierte de string a objeto y los devuelve
      if (cached) return JSON.parse(cached);

      // Si no hay datos disponibles, lanza un error personalizado
      throw new Error("Error al cargar biblioteca de imágenes, sin datos cache.");
    }
  }
}
