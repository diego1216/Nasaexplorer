import { donkiService } from "../../data/datasources/donkiService";

export const donkiRepository = {
  fetchCmeEvents: (startDate: string, endDate: string) => {
    return donkiService.getCmeEvents(startDate, endDate);
  }
};
