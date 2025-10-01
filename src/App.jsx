import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LanguageToggle from './components/LanguageToggle';
import { translations } from './utils/translations';
import { fetchWeather } from './store/weatherSlice';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.weather);
  const { language } = useSelector((state) => state.language);
  const t = translations[language];

  // Load default city on mount
  useEffect(() => {
    dispatch(fetchWeather('Cairo'));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #e0f7fa 0%, #80deea 100%)',
          py: 4,
          position: 'relative',
        }}
      >
        <LanguageToggle />
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {t.title}
          </Typography>

          <SearchBar />

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 4, maxWidth: 600, margin: 'auto' }}>
              {error.includes('404') ? t.cityNotFound : t.networkError}
            </Alert>
          )}

          {!loading && !error && data && <WeatherCard />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
