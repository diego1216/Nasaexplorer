// src/redux/slices/imageLibrarySlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NasaMediaDatasource } from '../../data/datasources/NasaMediaDatasource';
import { NasaMediaItem } from '../../domain/entites/NasaMediaItem';
import { StorageService } from '../../service/storageService';

interface ImageLibraryState {
  images: NasaMediaItem[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  page: number;
  query: string;
  hasMore: boolean;
}

const initialState: ImageLibraryState = {
  images: [],
  loading: false,
  loadingMore: false,
  error: null,
  page: 1,
  query: '',
  hasMore: true,
};

const dataSource = new NasaMediaDatasource();

export const fetchImages = createAsyncThunk(
  'imageLibrary/fetchImages',
  async (_, { getState }) => {
    const { query, page } = (getState() as any).imageLibrary;
    const key = `imageLibrary_${query}_${page}`;

    try {
      const data = await dataSource.search(query, page);
      await StorageService.save(key, data);
      return { data, page };
    } catch (e) {
      console.warn('⚠️ Cargando desde AsyncStorage (fallback)');
      const cached = await StorageService.load<NasaMediaItem[]>(key);
      if (cached) return { data: cached, page };
      throw new Error('No se pudieron obtener imágenes');
    }
  }
);

const imageLibrarySlice = createSlice({
  name: 'imageLibrary',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
      state.images = [];
      state.hasMore = true;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetLibrary: (state) => {
      state.page = 1;
      state.images = [];
      state.error = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = state.page === 1;
        state.loadingMore = state.page > 1;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        const newImages = action.payload.data;
        state.images = state.page === 1 ? newImages : [...state.images, ...newImages];
        state.hasMore = newImages.length > 0;
        state.loading = false;
        state.loadingMore = false;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.error.message || 'Error al cargar imágenes';
      });
  },
});

export const { setQuery, resetLibrary, setPage } = imageLibrarySlice.actions;
export default imageLibrarySlice.reducer;
