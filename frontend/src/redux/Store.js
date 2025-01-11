import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slice/filterslice';
import dataReducer from './slice/dataSlice';

const store = configureStore({
  reducer: {
    filters: filterReducer,
    data: dataReducer,
  },
});

export default store;
