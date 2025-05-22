// src/domain/repositories/eonetRepository.ts

import { eonetService } from "../../data/datasources/eonetService"; // Importa el servicio que contiene la lógica para obtener eventos desde la API EONET

// Define y exporta un objeto llamado eonetRepository que actúa como repositorio para los eventos EONET
export const eonetRepository = {
  // Método fetchEvents que recibe un parámetro "limit" para limitar la cantidad de eventos a obtener
  fetchEvents: (limit: number) => {
    // Llama al método getEvents del eonetService, pasando el límite como argumento
    return eonetService.getEvents(limit);
  }
};
