import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice'
export const store = configureStore({
  reducer: {
    searchInfo : searchReducer,
  },
})