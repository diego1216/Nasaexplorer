import { NasaMediaRepository } from "../repositories/NasaMediaRepository";
import { NasaMediaItem } from "../entites/NasaMediaItem";

export class SearchNasaMedia {
  constructor(private repo: NasaMediaRepository) {}

  execute(query: string): Promise<NasaMediaItem[]> {
    return this.repo.searchMedia(query);
  }
}
