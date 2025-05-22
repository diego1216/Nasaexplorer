import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { donkiService } from '../../data/datasources/donkiService';

interface DonkiState {
  events: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DonkiState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchDonkiEvents = createAsyncThunk(
  'donki/fetchEvents',
  async ({ startDate, endDate }: { startDate: string; endDate: string }, { rejectWithValue }) => {
    try {
      return await donkiService.getCmeEvents(startDate, endDate);
    } catch (err) {
      return rejectWithValue("No se pudo cargar datos DONKI.");
    }
  }
);

const donkiSlice = createSlice({
  name: 'donki',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDonkiEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonkiEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchDonkiEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default donkiSlice.reducer;
