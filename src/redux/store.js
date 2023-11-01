import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './citiesSlice';

const savedCities = JSON.parse(localStorage.getItem('cities'));
const initialState = savedCities || [];

export const store = configureStore({
  reducer: {
    cities: citiesReducer
  },
  preloadedState: {
    cities: initialState
  }
});
