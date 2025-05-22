// src/data/slices/neoSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importa funciones de Redux Toolkit para crear slices y thunks
import { neoService } from "../../data/datasources/neoService"; // Importa el servicio que obtiene datos de asteroides desde la API
import { Neo } from "../../domain/entites/Neo"; // Importa la interfaz que define la estructura de un asteroide

// Define la estructura del estado para el slice de asteroides (NEO)
interface NeoState {
  data: Neo[];            // Lista de asteroides obtenidos
  loading: boolean;       // Estado de carga
  error: string | null;   // Mensaje de error, si ocurre alguno
}

// Estado inicial del slice
const initialState: NeoState = {
  data: [],          // Sin asteroides al inicio
  loading: false,    // No se está cargando inicialmente
  error: null,       // Sin error inicial
};

// Acción asíncrona para obtener asteroides entre dos fechas usando el servicio neoService
export const fetchAsteroids = createAsyncThunk(
  "neo/fetchAsteroids", // Nombre de la acción
  async ({ startDate, endDate }: { startDate: string; endDate: string }) => {
    const data = await neoService.getAsteroids(startDate, endDate); // Llama al servicio para obtener los datos
    return data; // Devuelve los datos para que los maneje el reducer
  }
);

// Crea el slice de Redux para manejar el estado de los asteroides
const neoSlice = createSlice({
  name: "neo",           // Nombre del slice
  initialState,          // Estado inicial
  reducers: {
    // Acción para reiniciar los datos de asteroides (útil para recargas o búsquedas nuevas)
    resetNeos: (state) => {
      state.data = [];       // Limpia los datos actuales
      state.error = null;    // Limpia errores previos
    },
  },
  extraReducers: (builder) => {
    builder
      // Caso cuando se inicia la acción fetchAsteroids
      .addCase(fetchAsteroids.pending, (state) => {
        state.loading = true; // Marca que se están cargando los datos
      })
      // Caso cuando la acción se resuelve exitosamente
      .addCase(fetchAsteroids.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload]; // Agrega los nuevos asteroides al array existente (scroll infinito)
        state.loading = false; // Termina la carga
      })
      // Caso cuando ocurre un error al obtener los asteroides
      .addCase(fetchAsteroids.rejected, (state) => {
        state.loading = false;                         // Finaliza la carga
        state.error = "Error al cargar los asteroides."; // Establece un mensaje de error
      });
  },
});

// Exporta la acción resetNeos para ser usada desde el ViewModel o UI
export const { resetNeos } = neoSlice.actions;

// Exporta el reducer del slice para integrarlo en el store principal
export default neoSlice.reducer;
