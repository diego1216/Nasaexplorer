import { NasaRepository } from '../repositories/NasaRepository' // Importa la interfaz del repositorio de la NASA desde la capa de dominio
import { AstronomyPicture } from '../entites/AstronomyPicture' // Importa la interfaz que define la estructura de una imagen astronómica (APOD)

// Clase que representa un caso de uso para obtener la imagen astronómica del día
export class GetAstronomyPicture {
  // Constructor que recibe una instancia de NasaRepository (inyección de dependencia)
  constructor(private nasaRepository: NasaRepository) {}

  // Método público que ejecuta el caso de uso
  // Llama al repositorio para obtener la imagen astronómica
  execute(): Promise<AstronomyPicture[]> {
    return this.nasaRepository.getAstronomyPicture();
  }
}
