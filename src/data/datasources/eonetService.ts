import axios from "axios";

const EONET_API_URL = "https://eonet.gsfc.nasa.gov/api/v3/events";

export const eonetService = {
  async getEvents() {
    const response = await axios.get(EONET_API_URL);
    return response.data;
  }
};
