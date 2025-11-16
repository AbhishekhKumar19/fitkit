import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {MealState, Meal, PredictionResult} from '../../types';
import {mealService} from '../../services/mealService';

const initialState: MealState = {
  meals: [],
  todayMeals: [],
  weeklyMeals: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const uploadMealImage = createAsyncThunk(
  'meals/uploadImage',
  async (imageUri: string, {rejectWithValue}) => {
    try {
      const response = await mealService.uploadImage(imageUri);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Upload failed');
    }
  },
);

export const addMeal = createAsyncThunk(
  'meals/add',
  async (mealData: Partial<Meal>, {rejectWithValue}) => {
    try {
      const response = await mealService.addMeal(mealData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add meal');
    }
  },
);

export const getTodayMeals = createAsyncThunk(
  'meals/getToday',
  async (_, {rejectWithValue}) => {
    try {
      const response = await mealService.getTodayMeals();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch meals');
    }
  },
);

export const getWeeklyMeals = createAsyncThunk(
  'meals/getWeekly',
  async (_, {rejectWithValue}) => {
    try {
      const response = await mealService.getWeeklyMeals();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch weekly meals');
    }
  },
);

export const deleteMeal = createAsyncThunk(
  'meals/delete',
  async (mealId: string, {rejectWithValue}) => {
    try {
      await mealService.deleteMeal(mealId);
      return mealId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete meal');
    }
  },
);

// Slice
const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    addLocalMeal: (state, action: PayloadAction<Meal>) => {
      state.todayMeals.unshift(action.payload);
      state.meals.unshift(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      // Upload image
      .addCase(uploadMealImage.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadMealImage.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(uploadMealImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add meal
      .addCase(addMeal.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todayMeals.unshift(action.payload);
        state.meals.unshift(action.payload);
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get today meals
      .addCase(getTodayMeals.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTodayMeals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todayMeals = action.payload;
      })
      .addCase(getTodayMeals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get weekly meals
      .addCase(getWeeklyMeals.fulfilled, (state, action) => {
        state.weeklyMeals = action.payload;
      })
      // Delete meal
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.todayMeals = state.todayMeals.filter(m => m._id !== action.payload);
        state.meals = state.meals.filter(m => m._id !== action.payload);
      });
  },
});

export const {clearError, addLocalMeal} = mealSlice.actions;
export default mealSlice.reducer;
