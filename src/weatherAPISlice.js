import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Liverpool,GB&units=metric&appid=f9d8fef79bc53f7472d2f46351b5efc7';

export const fetchDataWeather = createAsyncThunk('weather/fetchDataWeather', async () => {
   const response = await axios.get(url);

   const weatherTemp = Math.round(response.data.main.temp);
   const weatherMaxTemp = Math.round(response.data.main.temp_max);
   const weatherMinTemp = Math.round(response.data.main.temp_min);
   const weatherIcon = response.data.weather[0].icon;
   const weatherDescription = response.data.weather[0].description;
   const currentDate = dayjs().format('dddd, D MMMM YYYY , h:mm A');

   return { weatherTemp, weatherMaxTemp, weatherMinTemp, weatherIcon, weatherDescription, currentDate };
});


      



const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    changeResult: (state) => {
      state.result = "changed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDataWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});


export const { changeResult } = weatherSlice.actions;

export default weatherSlice.reducer;
