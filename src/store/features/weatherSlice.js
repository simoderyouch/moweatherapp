<<<<<<< HEAD
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    error: false,
    weatherInfo: null,
    forecast: null,
}
export const FetchWeather = createAsyncThunk(
    'weather/FetchWeather',
    async ({ lat, lon }, { rejectWithValue }) => {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

        try {
            const response = await fetch(weatherApiUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async ({ lat, lon }) => {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.REACT_APP_API_KEY}&lat=${lat}&lon=${lon}&units=metric`;

        const response = await fetch(weatherApiUrl);
        const data = await response.json();

        const forecast = data.list.filter((weather, index) => {
            if (index === 0 || index % 8 === 0) {
                return weather;
            }

            return false;
        });

        return forecast;
    }
);
export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {


    },
    extraReducers(builder) {
        builder
            .addCase(FetchWeather.pending, (state) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(FetchWeather.fulfilled, (state, action) => {
                state.isLoading = false

                state.weatherInfo = action.payload
                console.log("from red ;", action.payload)

            })
            .addCase(FetchWeather.rejected, (state) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(fetchForecast.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
                state.forecast = action.payload;
              /*   if (action.payload && action.payload.length > 0) {
                    state.forecast = action.payload;
                }
              else {
                state.error = true;
              } */

            })
            .addCase(fetchForecast.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    }
})

// Action creators are generated for each case reducer function

const weatherReducer = weatherSlice.reducer
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    error: false,
    weatherInfo: null,
    forecast: null,
}
export const FetchWeather = createAsyncThunk(
    'weather/FetchWeather',
    async ({ lat, lon }, { rejectWithValue }) => {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${"10ec1982ea4249160a1f52bc61f3bc91"}`;

        try {
            const response = await fetch(weatherApiUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async ({ lat, lon }) => {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${"10ec1982ea4249160a1f52bc61f3bc91"}&lat=${lat}&lon=${lon}&units=metric`;

        const response = await fetch(weatherApiUrl);
        const data = await response.json();

        const forecast = data.list.filter((weather, index) => {
            if (index === 0 || index % 8 === 0) {
                return weather;
            }

            return false;
        });

        return forecast;
    }
);
export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {


    },
    extraReducers(builder) {
        builder
            .addCase(FetchWeather.pending, (state) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(FetchWeather.fulfilled, (state, action) => {
                state.isLoading = false

                state.weatherInfo = action.payload
                console.log("from red ;", action.payload)

            })
            .addCase(FetchWeather.rejected, (state) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(fetchForecast.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.isLoading = false;
                state.forecast = action.payload;

            })
            .addCase(fetchForecast.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    }
})

// Action creators are generated for each case reducer function

const weatherReducer = weatherSlice.reducer
>>>>>>> origin/version2
export default weatherReducer