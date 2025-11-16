import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppSettings} from '../../types';

const initialState: AppSettings = {
  darkMode: false,
  notifications: true,
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
    },
    toggleNotifications: state => {
      state.notifications = !state.notifications;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'es' | 'fr'>) => {
      state.language = action.payload;
    },
  },
});

export const {toggleDarkMode, toggleNotifications, setLanguage} =
  settingsSlice.actions;
export default settingsSlice.reducer;
