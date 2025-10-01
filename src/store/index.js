import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import languageReducer from './languageSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    language: languageReducer,
  },
});
