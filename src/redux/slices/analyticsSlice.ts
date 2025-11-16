import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AnalyticsState} from '../../types';
import {analyticsService} from '../../services/analyticsService';

const initialState: AnalyticsState = {
  weeklyData: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const getWeeklyAnalytics = createAsyncThunk(
  'analytics/getWeekly',
  async (_, {rejectWithValue}) => {
    try {
      const response = await analyticsService.getWeeklyAnalytics();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch analytics');
    }
  },
);

// Slice
const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWeeklyAnalytics.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWeeklyAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weeklyData = action.payload;
      })
      .addCase(getWeeklyAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearError} = analyticsSlice.actions;
export default analyticsSlice.reducer;
