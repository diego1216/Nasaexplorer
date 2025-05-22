// src/redux/slices/imageLibrarySlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'; // Importa funciones de Redux Toolkit para crear slices, thunks y manejar acciones tipadas
import { NasaMediaDatasource } from '../../data/datasources/NasaMediaDatasource'; // Importa el datasource que accede a la API de imágenes de la NASA
import { NasaMediaItem } from '../../domain/entites/NasaMediaItem'; // Importa la interfaz que define la estructura de cada imagen
import { StorageService } from '../../service/storageService'; // Servicio personalizado para manejar caché local

// Define el estado del slice
interface ImageLibraryState {
  images: NasaMediaItem[];     // Lista de imágenes obtenidas
  loading: boolean;            // Estado de carga inicial
  loadingMore: boolean;        // Estado de carga para paginación
  error: string | null;        // Mensaje de error, si lo hay
  page: number;                // Número de página actual para paginación
  query: string;               // Término de búsqueda actual
  hasMore: boolean;            // Indica si hay más imágenes por cargar
}

// Estado inicial del slice
const initialState: ImageLibraryState = {
  images: [],
  loading: false,
  loadingMore: false,
  error: null,
  page: 1,
  query: '',
  hasMore: true,
};

// Instancia del datasource que provee acceso a los datos reales o cache
const dataSource = new NasaMediaDatasource();

// Acción asíncrona (thunk) para obtener imágenes desde la API o AsyncStorage
export const fetchImages = createAsyncThunk(
  'imageLibrary/fetchImages', // Nombre de la acción
  async (_, { getState }) => { // Accede al estado actual para usar `query` y `page`
    const { query, page } = (getState() as any).imageLibrary; // Extrae query y page del estado
    const key = `imageLibrary_${query}_${page}`; // Crea una clave única para caché

    try {
      const data = await dataSource.search(query, page); // Llama al datasource para obtener resultados
      await StorageService.save(key, data); // Guarda los resultados en caché
      return { data, page }; // Devuelve los datos y la página para el reducer
    } catch (e) {
      console.warn('⚠️ Cargando desde AsyncStorage (fallback)'); // Muestra advertencia en consola
      const cached = await StorageService.load<NasaMediaItem[]>(key); // Intenta cargar desde caché
      if (cached) return { data: cached, page }; // Si hay datos, los retorna
      throw new Error('No se pudieron obtener imágenes'); // Lanza error si no hay ni red ni caché
    }
  }
);

// Crea el slice con sus reducers y manejadores de estados asíncronos
const imageLibrarySlice = createSlice({
  name: 'imageLibrary', // Nombre del slice
  initialState,         // Estado inicial
  reducers: {
    // Acción para establecer un nuevo término de búsqueda
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;  // Actualiza el término de búsqueda
      state.page = 1;                // Reinicia la paginación
      state.images = [];             // Limpia las imágenes actuales
      state.hasMore = true;          // Reinicia el indicador de más resultados
    },
    // Acción para establecer manualmente la página
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    // Acción para reiniciar completamente el estado de la biblioteca
    resetLibrary: (state) => {
      state.page = 1;
      state.images = [];
      state.error = null;
      state.hasMore = true;
    },
  },
  // Define cómo manejar los distintos estados de la acción fetchImages
  extraReducers: (builder) => {
    builder
      // Cuando se inicia la carga
      .addCase(fetchImages.pending, (state) => {
        state.loading = state.page === 1;         // loading solo si es la primera página
        state.loadingMore = state.page > 1;       // loadingMore si es una página siguiente
        state.error = null;                       // Limpia errores anteriores
      })
      // Cuando la carga se completa exitosamente
      .addCase(fetchImages.fulfilled, (state, action) => {
        const newImages = action.payload.data; // Extrae nuevas imágenes
        // Si es la primera página, reemplaza las imágenes; si no, las agrega
        state.images = state.page === 1 ? newImages : [...state.images, ...newImages];
        state.hasMore = newImages.length > 0;  // Indica si hay más imágenes para paginar
        state.loading = false;                 // Finaliza loading
        state.loadingMore = false;             // Finaliza loadingMore
      })
      // Cuando ocurre un error al obtener las imágenes
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;                 // Finaliza loading
        state.loadingMore = false;             // Finaliza loadingMore
        state.error = action.error.message || 'Error al cargar imágenes'; // Establece mensaje de error
      });
  },
});

// Exporta las acciones del slice para usarlas en los ViewModels o componentes
export const { setQuery, resetLibrary, setPage } = imageLibrarySlice.actions;

// Exporta el reducer del slice para ser integrado al store global
export default imageLibrarySlice.reducer;
