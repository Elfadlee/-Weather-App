# Weather App

A modern weather application built with React, Redux Toolkit, Material UI, and Day.js. It fetches real-time weather data from the OpenWeather API, supports English-Arabic language switching, and displays temperature, min/max values, description, and localized date/time.

![Weather App - English](https://github.com/user-attachments/assets/11b0db8d-62c8-4d05-92dd-7c0fde1e5068)
![Weather App - Arabic](https://github.com/user-attachments/assets/429fb27b-f772-4f5f-964b-5a1c073d9b4e)

## Features

- 🌡️ **Real-time Weather Data**: Fetches current weather information from OpenWeather API
- 🌍 **Bilingual Support**: Toggle between English and Arabic with full RTL support
- 📅 **Localized Date/Time**: Displays date and time in the selected language using Day.js
- 🎨 **Beautiful UI**: Modern interface built with Material UI components
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔄 **State Management**: Uses Redux Toolkit for efficient state management

## Tech Stack

- **React 19** - UI library
- **Redux Toolkit** - State management
- **Material UI** - Component library
- **Day.js** - Date/time formatting and localization
- **Axios** - HTTP client for API requests
- **Vite** - Build tool and dev server

## Weather Information Displayed

- Current temperature
- Feels like temperature
- Minimum and maximum temperatures
- Weather description (translated)
- Humidity percentage
- Wind speed
- Localized date and time
- City name and country code

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeather API key (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Elfadlee/-Weather-App.git
cd -Weather-App
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your OpenWeather API key to `.env`:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

> Get your free API key from [OpenWeather API](https://openweathermap.org/api)

### Running the App

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Lint code:
```bash
npm run lint
```

## Usage

1. **Search for a City**: Enter any city name in the search bar and click "Search"
2. **Toggle Language**: Click the language icon in the top-right corner to switch between English and Arabic
3. **View Weather Details**: See current temperature, min/max values, humidity, wind speed, and more

## Project Structure

```
src/
├── components/          # React components
│   ├── WeatherCard.jsx     # Weather information display
│   ├── SearchBar.jsx       # City search input
│   └── LanguageToggle.jsx  # Language switcher
├── store/               # Redux store and slices
│   ├── index.js            # Store configuration
│   ├── weatherSlice.js     # Weather state management
│   └── languageSlice.js    # Language state management
├── utils/               # Utility functions
│   └── translations.js     # Translation strings
├── App.jsx              # Main app component
└── main.jsx             # App entry point
```

## Features Implementation

### Redux Toolkit
- **weatherSlice**: Manages weather data fetching, loading states, and errors
- **languageSlice**: Handles language switching between English and Arabic

### Material UI
- Custom theme with primary/secondary colors
- Responsive Card, TextField, Button components
- Icons for search and language toggle

### Day.js
- Timezone conversion for accurate local time
- Localized date formatting in English and Arabic
- Plugin support for UTC and timezone handling

### Localization
- Complete UI translation in English and Arabic
- RTL (Right-to-Left) layout support for Arabic
- Translated weather descriptions from OpenWeather API

## API Information

This app uses the [OpenWeather API](https://openweathermap.org/api) to fetch weather data. The free tier allows:
- 60 calls/minute
- 1,000,000 calls/month
- Current weather data

## License

This project is open source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## Author

**Elfadlee**

- GitHub: [@Elfadlee](https://github.com/Elfadlee)

