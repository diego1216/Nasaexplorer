// src/presentation/slices/eonetSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eonetRepository } from "../../domain/repositories/eonetRepository";

interface EonetState {
  data: any[];
  loading: boolean;
  error: string | null;
  limit: number;
  loadingMore: boolean;
}

const initialState: EonetState = {
  data: [],
  loading: false,
  error: null,
  limit: 20,
  loadingMore: false,
};

export const fetchEonetEvents = createAsyncThunk(
  "eonet/fetch",
  async (limit: number) => {
    const events = await eonetRepository.fetchEvents(limit);
    return events;
  }
);

const eonetSlice = createSlice({
  name: "eonet",
  initialState,
  reducers: {
    increaseLimit(state) {
      state.limit += 20;
      state.loadingMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEonetEvents.pending, (state) => {
        state.loading = state.data.length === 0;
        state.error = null;
      })
      .addCase(fetchEonetEvents.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.loadingMore = false;
      })
      .addCase(fetchEonetEvents.rejected, (state) => {
        state.error = "Error al cargar los eventos EONET.";
        state.loading = false;
        state.loadingMore = false;
      });
  },
});

export const { increaseLimit } = eonetSlice.actions;
export default eonetSlice.reducer;
