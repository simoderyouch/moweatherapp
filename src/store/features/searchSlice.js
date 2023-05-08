import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const searchSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
  },
})

// Action creators are generated for each case reducer function
export const {  } = searchSlice.actions
const searchReducer = searchSlice.reducer
export default searchReducer