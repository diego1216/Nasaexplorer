import { NasaMediaItem } from "../entites/NasaMediaItem"; // Importa la interfaz NasaMediaItem que define la estructura de un ítem multimedia

// Define una interfaz que representa el contrato que debe cumplir cualquier repositorio de medios de la NASA
export interface NasaMediaRepository {
  // Método que debe implementar el repositorio para buscar medios por una consulta (query)
  // Devuelve una Promesa que resuelve en un arreglo de NasaMediaItem
  searchMedia(query: string): Promise<NasaMediaItem[]>;
}
