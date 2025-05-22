import { NasaMediaRepository } from "../repositories/NasaMediaRepository"; // Importa la interfaz del repositorio de medios de la NASA desde la capa de dominio
import { NasaMediaItem } from "../entites/NasaMediaItem"; // Importa la interfaz que define la estructura de un ítem multimedia (imagen)

// Clase que representa el caso de uso para buscar medios (imágenes) en la API de la NASA
export class SearchNasaMedia {
  // Constructor que recibe una instancia de NasaMediaRepository (inyección de dependencia)
  constructor(private repo: NasaMediaRepository) {}

  // Método público que ejecuta el caso de uso
  // Recibe una consulta (query) y retorna una promesa con los resultados en forma de arreglo de NasaMediaItem
  execute(query: string): Promise<NasaMediaItem[]> {
    return this.repo.searchMedia(query); // Llama al método del repositorio para realizar la búsqueda
  }
}
