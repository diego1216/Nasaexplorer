import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Importa funciones de Redux Toolkit para crear slices y acciones asíncronas
import { donkiService } from '../../data/datasources/donkiService'; // Importa el servicio que obtiene datos de la API DONKI

// Define la estructura del estado para el slice DONKI
interface DonkiState {
  events: any[];         // Lista de eventos obtenidos (tipo 'any' por ahora, puede mejorarse con tipado)
  loading: boolean;      // Indica si se están cargando los datos
  error: string | null;  // Mensaje de error, si ocurre alguno
}

// Estado inicial del slice
const initialState: DonkiState = {
  events: [],        // Sin eventos al iniciar
  loading: false,    // No está cargando inicialmente
  error: null,       // Sin errores al iniciar
};

// Define una acción asíncrona para obtener eventos DONKI entre dos fechas
export const fetchDonkiEvents = createAsyncThunk(
  'donki/fetchEvents', // Nombre de la acción
  async ({ startDate, endDate }: { startDate: string; endDate: string }, { rejectWithValue }) => {
    try {
      // Intenta obtener los eventos desde el servicio
      return await donkiService.getCmeEvents(startDate, endDate);
    } catch (err) {
      // Si ocurre un error, lo maneja con un mensaje personalizado
      return rejectWithValue("No se pudo cargar datos DONKI.");
    }
  }
);

// Crea el slice de Redux para manejar el estado de DONKI
const donkiSlice = createSlice({
  name: 'donki',        // Nombre del slice
  initialState,         // Estado inicial definido arriba
  reducers: {},         // No se definen reducers sincrónicos en este caso
  extraReducers: builder => { // Maneja estados del asyncThunk (fetchDonkiEvents)
    builder
      .addCase(fetchDonkiEvents.pending, (state) => {
        state.loading = true;  // Marca el estado como cargando
        state.error = null;    // Limpia errores anteriores
      })
      .addCase(fetchDonkiEvents.fulfilled, (state, action) => {
        state.loading = false;     // Finaliza la carga
        state.events = action.payload; // Guarda los eventos obtenidos
      })
      .addCase(fetchDonkiEvents.rejected, (state, action) => {
        state.loading = false;         // Finaliza la carga
        state.error = action.payload as string; // Guarda el mensaje de error
      });
  },
});

// Exporta el reducer para ser integrado en el store global
export default donkiSlice.reducer;
