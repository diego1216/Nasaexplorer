import { NASA_API_KEY } from "@env";
import axios from "axios";

export const getAsteroids = async () => {
  const today = new Date().toISOString().split("T")[0];
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`;

  const response = await axios.get(url);
  return response.data.near_earth_objects[today];
};
