// src/domain/repositories/eonetRepository.ts

import { eonetService } from "../../data/datasources/eonetService";

export const eonetRepository = {
  fetchEvents: (limit: number) => {
    return eonetService.getEvents(limit);
  }
};
