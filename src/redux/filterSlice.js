import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: ""
  },
  reducers: {
    setFilter(state, actions) {
      state.value = actions.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { setFilter } = filterSlice.actions;

export const selectFilterValue = state => state.filter.value;

