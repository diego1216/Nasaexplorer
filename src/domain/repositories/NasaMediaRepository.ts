import { NasaMediaItem } from "../entites/NasaMediaItem";

export interface NasaMediaRepository {
  searchMedia(query: string): Promise<NasaMediaItem[]>;
}
