// src/presentation/slices/apodSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Importa funciones de Redux Toolkit para crear slices y thunks asíncronos
import { NasaApiDatasource } from '../../data/datasources/NasaApiDatasource'; // Importa el datasource que obtiene la imagen APOD
import { AstronomyPicture } from '../../domain/entites/AstronomyPicture'; // Importa la interfaz que define la estructura de una imagen astronómica
import { StorageService } from '../../service/storageService'; // Importa un servicio genérico para manejo de almacenamiento persistente (cache)

// Define la forma del estado para el slice de APOD
interface ApodState {
  data: AstronomyPicture[]; // Lista de imágenes APOD
  loading: boolean;         // Estado de carga
  error: string | null;     // Mensaje de error si ocurre alguno
}

// Estado inicial del slice
const initialState: ApodState = {
  data: [],       // Inicia vacío
  loading: false, // No se está cargando inicialmente
  error: null,    // Sin errores al inicio
};

// Instancia del datasource que se usará para obtener los datos
const datasource = new NasaApiDatasource();

// Acción asíncrona para obtener la imagen del día desde la API o desde caché
export const fetchApod = createAsyncThunk('apod/fetch', async (_, { rejectWithValue }) => {
  const key = 'apod_cache'; // Clave de almacenamiento para guardar/leer desde cache

  try {
    const data = await datasource.fetchAstonomyPicture(); // Intenta obtener datos desde la red
    const normalized = Array.isArray(data) ? data : [data]; // Normaliza el resultado en un array
    await StorageService.save(key, normalized); // Guarda los datos normalizados en el almacenamiento
    return normalized; // Retorna los datos a Redux
  } catch (error) {
    console.warn('Fallo al cargar desde red, intentando AsyncStorage...'); // Mensaje de advertencia
    const cached = await StorageService.load<AstronomyPicture[]>(key); // Intenta cargar los datos desde almacenamiento local
    if (cached) return cached; // Si hay datos cacheados, los retorna
    return rejectWithValue('No se pudo cargar la imagen APOD'); // Si no hay datos ni en red ni en cache, lanza un error controlado
  }
});

// Crea el slice de Redux para manejar el estado de APOD
const apodSlice = createSlice({
  name: 'apod',          // Nombre del slice
  initialState,          // Estado inicial
  reducers: {},          // No hay reducers sincrónicos definidos en este caso
  extraReducers: builder => {
    builder
      .addCase(fetchApod.pending, state => {
        state.loading = true;   // Marca el estado como cargando
        state.error = null;     // Limpia errores anteriores
      })
      .addCase(fetchApod.fulfilled, (state, action) => {
        state.loading = false;  // Termina la carga
        state.data = action.payload; // Guarda los datos obtenidos
      })
      .addCase(fetchApod.rejected, (state, action) => {
        state.loading = false;  // Termina la carga
        state.error = action.payload as string; // Guarda el error recibido
      });
  },
});

// Exporta el reducer del slice para ser incluido en el store de Redux
export default apodSlice.reducer;
