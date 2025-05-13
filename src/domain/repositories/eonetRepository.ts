import { eonetService } from "../../data/datasources/eonetService";

export const eonetRepository = {
  async fetchEvents() {
    const data = await eonetService.getEvents();
    return data.events;
  }
};
