import { NASA_API_KEY } from "@env";
import axios from "axios";

export const donkiService = {
  async getCmeEvents(startDate: string = "2024-01-01") {
    const url = `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&api_key=${NASA_API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  }
};

