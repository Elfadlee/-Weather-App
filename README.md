 Weather App with Redux Toolkit, React, and MUI

This project demonstrates a professional real-world setup** using React, Redux Toolkit, React-Redux, Material UI (MUI), Day.js, and i18next for internationalization.

---

 Features
- Fetches real-time weather data from OpenWeather API
- State management with Redux Toolkit (createSlice, createAsyncThunk)
- Async API handling (pending, fulfilled, rejected states).
- Language switching (English , Arabic) with `i18next`.
- Day.js for localized dates.
- Material UI for modern responsive UI.
- Error handling and loading states included.

---

Installation

git clone <your-repo-url>
cd project-folder
npm install
npm start



npm install @reduxjs/toolkit react-redux axios dayjs i18next react-i18next @mui/material @mui/icons-material


---

Project Structure

src/
│── App.js
│── index.js
│── store.js
│── weatherAPISlice.js
│── MainPage.js
│── i18n.js
│── App.css / index.css



Redux Setup

 1. Slice (`weatherAPOSlice.js`)
- Defines the state (`data, status, error`).
- `fetchDataWeather` thunk fetches weather from API.
- Reducers & extraReducers handle state transitions.

```js --- 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

const url = "https://api.openweathermap.org/data/2.5/weather?q=Liverpool,GB&units=metric&appid=YOUR_API_KEY";

export const fetchDataWeather = createAsyncThunk("weather/fetchDataWeather", async () => {
  const response = await axios.get(url);
  return {
    weatherTemp: Math.round(response.data.main.temp),
    weatherMaxTemp: Math.round(response.data.main.temp_max),
    weatherMinTemp: Math.round(response.data.main.temp_min),
    weatherIcon: response.data.weather[0].icon,
    weatherDescription: response.data.weather[0].description,
    currentDate: dayjs().format("dddd, D MMMM YYYY , h:mm A"),
  };
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, status: "idle", error: null },
  reducers: {
    changeResult: (state) => {
      state.result = "changed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDataWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { changeResult } = weatherSlice.actions;
export default weatherSlice.reducer;
```

---

2. Store (`store.js`)
```js
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherAPOSlice";

export const store = configureStore({
  reducer: { weather: weatherReducer },
});
```

---

3. Provider (`index.js`)
```js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

UI Component (`MainPage.js`)
- Uses `useSelector` to read weather data.
- Uses `useDispatch` to call `fetchDataWeather`.
- Handles **loading, error, and success states**.
- Language switching with `i18next` and `dayjs`.

```js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataWeather } from "./weatherAPOSlice";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import { Container, CardContent, Typography, Button, Stack } from "@mui/material";

export default function MainContainer() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchDataWeather());
  }, [dispatch]);

  if (status === "idle" || status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const { weatherTemp, weatherMaxTemp, weatherMinTemp, weatherIcon, weatherDescription, currentDate } = data || {};

  const toggleLanguage = () => {
    const next = currentLanguage === "ar" ? "en" : "ar";
    setCurrentLanguage(next);
    i18n.changeLanguage(next);
    dayjs.locale(next);
  };

  return (
    <Container maxWidth="xl">
      <CardContent>
        <Typography variant="h2">{t("Liverpool, UK")}</Typography>
        <Typography variant="subtitle2">{currentDate}</Typography>
        <Typography variant="h1">
          {weatherTemp}°C <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherDescription} />
        </Typography>
        <Typography variant="h5">{t(weatherDescription)}</Typography>
        <Typography variant="h5">
          {t("max")}: {weatherMaxTemp}°C | {t("min")}: {weatherMinTemp}°C
        </Typography>

        <Stack direction="row">
          <Button onClick={toggleLanguage}>
            {currentLanguage === "en" ? "Arabic" : "English"}
          </Button>
        </Stack>
      </CardContent>
    </Container>
  );
}
```

---

How it Works
1. The app starts and `MainPage` dispatches `fetchDataWeather()`.
2. Redux updates `status` (`loading → succeeded/failed`).
3. Once fulfilled, the weather data is stored in Redux and displayed.
4. User can toggle English/Arabic, and both UI & date format update.

---

Key Concepts
- Redux Toolkit simplifies reducers and async logic.  
- createAsyncThunk handles async API calls automatically.  
- useSelector reads data from Redux store.  
- useDispatch sends actions to Redux.  
- i18next + dayjs handle internationalization and date localization.  
- Material UI gives modern styled components.

---

Next Steps
- Add more cities (pass `city` to thunk).  
- Use Redux Persist to cache last weather data.  
- Add tests with Jest + React Testing Library.  
- Deploy on Vercel/Netlify.

---

<img src="./App Screenshot" alt="App Screenshot" width="500"/>
