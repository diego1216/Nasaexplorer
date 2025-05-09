import { NASA_API_KEY } from "@env";
import { AstronomyPicture } from "../../domain/entites/AstronomyPicture";

export class NasaApiDatasource {
  async getAstronomyPicture(date?: string): Promise<AstronomyPicture> {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${
      date ? `&date=${date}` : ""
    }`;

    const res = await fetch(url);
    const data = await res.json();

    return {
      date: data.date,
      title: data.title,
      explanation: data.explanation,
      url: data.url,
      media_type: data.media_type,
    };
  }
}
