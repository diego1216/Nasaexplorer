import { NasaRepository } from '../../domain/repositories/NasaRepository'
import { AstronomyPicture } from '../../domain/entites/AstronomyPicture'
import { NasaApiDatasource } from '../datasources/NasaApiDatasource'

export class NasaRepositoryImpl implements NasaRepository {
  constructor(private datasource: NasaApiDatasource) {}
  getAstronomypicture(): Promise<AstronomyPicture> {
    throw new Error('Method not implemented.');
  }

  async getAstronomyPicture(): Promise<AstronomyPicture> {
    return await this.datasource.getAstronomyPicture();
  }
}
