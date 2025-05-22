import { NasaRepository } from '../repositories/NasaRepository'
import { AstronomyPicture } from '../entites/AstronomyPicture'

export class GetAstronomyPicture {
  constructor(private nasaRepository: NasaRepository) {}

  execute(): Promise<AstronomyPicture[]> {
    return this.nasaRepository.getAstronomyPicture();
  }
}
