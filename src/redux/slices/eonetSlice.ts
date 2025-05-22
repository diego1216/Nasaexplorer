// src/presentation/slices/eonetSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Importa funciones de Redux Toolkit para crear slices y thunks
import { eonetRepository } from "../../domain/repositories/eonetRepository"; // Importa el repositorio que accede a los datos EONET

// Define la estructura del estado para el slice EONET
interface EonetState {
  data: any[];               // Lista de eventos EONET (tipo any, puede mejorarse con tipado)
  loading: boolean;          // Indica si se están cargando datos por primera vez
  error: string | null;      // Mensaje de error, si ocurre
  limit: number;             // Límite de eventos a obtener (para paginación)
  loadingMore: boolean;      // Indica si se están cargando más eventos (scroll infinito)
}

// Estado inicial del slice
const initialState: EonetState = {
  data: [],               // Lista vacía de eventos al inicio
  loading: false,         // No está cargando inicialmente
  error: null,            // Sin errores al iniciar
  limit: 20,              // Límite inicial de eventos a obtener
  loadingMore: false,     // No está cargando más al inicio
};

// Acción asíncrona para obtener eventos desde el repositorio EONET
export const fetchEonetEvents = createAsyncThunk(
  "eonet/fetch",           // Nombre de la acción
  async (limit: number) => { // Recibe el límite como argumento
    const events = await eonetRepository.fetchEvents(limit); // Llama al repositorio para obtener los eventos
    return events; // Devuelve los eventos para actualizar el estado
  }
);

// Crea el slice para manejar el estado de los eventos EONET
const eonetSlice = createSlice({
  name: "eonet",            // Nombre del slice
  initialState,             // Estado inicial definido arriba
  reducers: {
    // Reducer para aumentar el límite de eventos (paginación)
    increaseLimit(state) {
      state.limit += 20;        // Incrementa el límite en 20
      state.loadingMore = true; // Activa el estado de carga de más resultados
    },
  },
  extraReducers: (builder) => {
    builder
      // Caso cuando comienza la acción fetchEonetEvents
      .addCase(fetchEonetEvents.pending, (state) => {
        state.loading = state.data.length === 0; // Solo activa loading si no hay datos previos
        state.error = null;                      // Limpia cualquier error anterior
      })
      // Caso cuando se completa exitosamente la acción
      .addCase(fetchEonetEvents.fulfilled, (state, action) => {
        state.data = action.payload;      // Actualiza los datos con los eventos obtenidos
        state.loading = false;            // Finaliza la carga inicial
        state.loadingMore = false;        // Finaliza la carga adicional
      })
      // Caso cuando ocurre un error al obtener los eventos
      .addCase(fetchEonetEvents.rejected, (state) => {
        state.error = "Error al cargar los eventos EONET."; // Establece el mensaje de error
        state.loading = false;           // Finaliza la carga inicial
        state.loadingMore = false;       // Finaliza la carga adicional
      });
  },
});

// Exporta la acción increaseLimit para ser usada en los ViewModels o componentes
export const { increaseLimit } = eonetSlice.actions;

// Exporta el reducer para ser integrado en el store principal
export default eonetSlice.reducer;
