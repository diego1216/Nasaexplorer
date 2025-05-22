import { NasaRepository } from '../../domain/repositories/NasaRepository' // Importa la interfaz del repositorio definida en la capa de dominio
import { AstronomyPicture } from '../../domain/entites/AstronomyPicture' // Importa el tipo de datos que representa una imagen astronómica
import { NasaApiDatasource } from '../datasources/NasaApiDatasource' // Importa el datasource que contiene la lógica para acceder a la API APOD

// Implementación concreta de la interfaz NasaRepository
export class NasaRepositoryImpl implements NasaRepository {
  // Propiedad privada que contiene la instancia del datasource
  private api: NasaApiDatasource;

  // Constructor que recibe el datasource como parámetro (inyección de dependencia)
  constructor(api: NasaApiDatasource) {
    this.api = api;
  }

  // Implementación del método definido en la interfaz del repositorio
  async getAstronomyPicture(): Promise<AstronomyPicture[]> {
    // Llama al método del datasource que obtiene la imagen astronómica del día
    return this.api.fetchAstonomyPicture();
  }
}
