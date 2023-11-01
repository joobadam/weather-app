import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('cities', JSON.stringify(state));
    },
  }
});

export const { addCity } = citiesSlice.actions;

export default citiesSlice.reducer;