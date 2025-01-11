import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeStamp: '',
  brand: '',
};



const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.timeStamp = action.payload.timeStamp;
      state.brand = action.payload.brand;
    },
  },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
