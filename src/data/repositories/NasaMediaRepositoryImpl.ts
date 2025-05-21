import { NasaMediaItem } from "../../domain/entites/NasaMediaItem";
import { NasaMediaRepository } from "../../domain/repositories/NasaMediaRepository";
import { NasaMediaDatasource } from "../datasources/NasaMediaDatasource";

export class NasaMediaRepositoryImpl implements NasaMediaRepository {
  constructor(private datasource: NasaMediaDatasource) {}

  async searchMedia(query: string): Promise<NasaMediaItem[]> {
    return this.datasource.search(query);
  }
}
