import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchWeather } from '../store/weatherSlice';
import { translations } from '../utils/translations';

const SearchBar = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);
  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(fetchWeather(city));
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        maxWidth: 600,
        margin: 'auto',
        mt: 3,
        direction: language === 'ar' ? 'rtl' : 'ltr',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder={t.searchPlaceholder}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mr: language === 'ar' ? 0 : 1, ml: language === 'ar' ? 1 : 0 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
      >
        {t.searchButton}
      </Button>
    </Paper>
  );
};

export default SearchBar;
