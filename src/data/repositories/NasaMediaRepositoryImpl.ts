import { NasaMediaItem } from "../../domain/entites/NasaMediaItem"; // Importa la interfaz que define la estructura de un item multimedia de la NASA
import { NasaMediaRepository } from "../../domain/repositories/NasaMediaRepository"; // Importa la interfaz del repositorio (contrato que debe cumplir)
import { NasaMediaDatasource } from "../datasources/NasaMediaDatasource"; // Importa el datasource que contiene la lógica para acceder a la API

// Implementación concreta del repositorio NasaMediaRepository
export class NasaMediaRepositoryImpl implements NasaMediaRepository {
  // Constructor que recibe una instancia del datasource e inyecta su dependencia
  constructor(private datasource: NasaMediaDatasource) {}

  // Implementación del método definido en la interfaz NasaMediaRepository
  async searchMedia(query: string): Promise<NasaMediaItem[]> {
    // Delegación de la lógica al datasource: realiza la búsqueda en la API
    return this.datasource.search(query);
  }
}
