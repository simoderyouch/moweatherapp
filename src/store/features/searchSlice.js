import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  isShow: false,
  searchLocation: null,
  isLoading: false,
  error: false,
  locationList: [],
  location: {

    lat: 0,
    lon: 0,

  },

}

export const FetchLocation = createAsyncThunk('search/FetchLocation', async (value) => {
<<<<<<< HEAD
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&appid=${process.env.REACT_APP_API_KEY}`;
=======
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&appid=${"10ec1982ea4249160a1f52bc61f3bc91"}`;
>>>>>>> origin/version2

  try {
    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    return { status: response.status, data: data }
  } catch (error) {
    console.log(error);
  }
})

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isShow = !state.isShow
    },
    searchForLocation: (state, action) => {
      state.searchLocation = action.payload

    },
    getTheLocation: (state, action) => {
      state.location = action.payload

    },

  },
  extraReducers(builder) {
    builder
      .addCase(FetchLocation.pending, (state) => {
        state.isLoading = true
        state.error = false
      })
      .addCase(FetchLocation.fulfilled, (state, action) => {
        state.isLoading = false
        console.log(action.payload)
<<<<<<< HEAD
        if (action.payload.status === 200 && action.payload.data.list.length > 0) {
=======
        if (action.payload.status !== 400 && action.payload.data.list.length > 0) {
>>>>>>> origin/version2
          state.locationList = action.payload.data.list
        } else {
          state.error = true
        }



      })
      .addCase(FetchLocation.rejected, (state) => {
        state.isLoading = false
        state.error = true
      })

  }
})

// Action creators are generated for each case reducer function
export const { toggle, searchForLocation, getTheLocation } = searchSlice.actions
const searchReducer = searchSlice.reducer
export default searchReducer