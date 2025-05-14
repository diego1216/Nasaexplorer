import { donkiService } from "../../data/datasources/donkiService";

export const donkiRepository = {
  async fetchCmeEvents(startDate?: string) {
    const data = await donkiService.getCmeEvents(startDate);
    return data;
  }
};
