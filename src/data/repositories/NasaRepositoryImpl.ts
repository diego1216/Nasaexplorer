import { NasaRepository } from '../../domain/repositories/NasaRepository'
import { AstronomyPicture } from '../../domain/entites/AstronomyPicture'
import { NasaApiDatasource } from '../datasources/NasaApiDatasource'

export class NasaRepositoryImpl implements NasaRepository {
  private api: NasaApiDatasource;

  constructor(api: NasaApiDatasource) {
    this.api = api;
  }

  async getAstronomyPicture(): Promise<AstronomyPicture[]> {
    return this.api.fetchAstonomyPicture();
  }
}
