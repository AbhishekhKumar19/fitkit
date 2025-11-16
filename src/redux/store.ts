import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import mealReducer from './slices/mealSlice';
import analyticsReducer from './slices/analyticsSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meals: mealReducer,
    analytics: analyticsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
