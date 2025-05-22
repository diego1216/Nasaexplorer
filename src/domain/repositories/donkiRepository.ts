import { donkiService } from "../../data/datasources/donkiService"; // Importa el servicio que contiene la lógica para acceder a la API DONKI (CME events)

// Define un repositorio donkiRepository como un objeto con métodos públicos
export const donkiRepository = {
  // Método fetchCmeEvents que recibe una fecha de inicio y una de fin
  fetchCmeEvents: (startDate: string, endDate: string) => {
    // Llama al método getCmeEvents del donkiService, pasando las fechas como argumentos
    return donkiService.getCmeEvents(startDate, endDate);
  }
};
