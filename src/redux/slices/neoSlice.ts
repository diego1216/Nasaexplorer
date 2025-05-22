// src/data/slices/neoSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { neoService } from "../../data/datasources/neoService";
import { Neo } from "../../domain/entites/Neo";

interface NeoState {
  data: Neo[];
  loading: boolean;
  error: string | null;
}

const initialState: NeoState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchAsteroids = createAsyncThunk(
  "neo/fetchAsteroids",
  async ({ startDate, endDate }: { startDate: string; endDate: string }) => {
    const data = await neoService.getAsteroids(startDate, endDate);
    return data;
  }
);

const neoSlice = createSlice({
  name: "neo",
  initialState,
  reducers: {
    resetNeos: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsteroids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsteroids.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload];
        state.loading = false;
      })
      .addCase(fetchAsteroids.rejected, (state) => {
        state.loading = false;
        state.error = "Error al cargar los asteroides.";
      });
  },
});

export const { resetNeos } = neoSlice.actions;
export default neoSlice.reducer;
