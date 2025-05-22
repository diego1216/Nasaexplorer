// src/presentation/slices/apodSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NasaApiDatasource } from '../../data/datasources/NasaApiDatasource';
import { AstronomyPicture } from '../../domain/entites/AstronomyPicture';
import { StorageService } from '../../service/storageService';

interface ApodState {
  data: AstronomyPicture[];
  loading: boolean;
  error: string | null;
}

const initialState: ApodState = {
  data: [],
  loading: false,
  error: null,
};

const datasource = new NasaApiDatasource();

export const fetchApod = createAsyncThunk('apod/fetch', async (_, { rejectWithValue }) => {
  const key = 'apod_cache';

  try {
    const data = await datasource.fetchAstonomyPicture();
    const normalized = Array.isArray(data) ? data : [data];
    await StorageService.save(key, normalized);
    return normalized;
  } catch (error) {
    console.warn('Fallo al cargar desde red, intentando AsyncStorage...');
    const cached = await StorageService.load<AstronomyPicture[]>(key);
    if (cached) return cached;
    return rejectWithValue('No se pudo cargar la imagen APOD');
  }
});

const apodSlice = createSlice({
  name: 'apod',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchApod.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApod.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default apodSlice.reducer;
