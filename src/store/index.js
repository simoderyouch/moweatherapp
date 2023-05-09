import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice'
import weatherReducer from './features/weatherSlice'
export const store = configureStore({
  reducer: {
    searchInfo: searchReducer,
    weather: weatherReducer,
  },
})