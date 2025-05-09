import { NasaRepository } from '../repositories/NasaRepository'
import { AstronomyPicture } from '../entites/AstronomyPicture'

export class GetAstronomyPicture {
  constructor(private repository: NasaRepository) {}

  async execute(): Promise<AstronomyPicture> {
    return await this.repository.getAstronomypicture()
  }
}
