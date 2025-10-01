import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
} from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { translations } from '../utils/translations';

dayjs.extend(utc);
dayjs.extend(timezone);

const WeatherCard = () => {
  const { data } = useSelector((state) => state.weather);
  const { language } = useSelector((state) => state.language);
  const t = translations[language];

  if (!data) return null;

  const localTime = dayjs()
    .utc()
    .add(data.timezone, 'second')
    .locale(language);

  const formattedDate = localTime.format('dddd, MMMM D, YYYY');
  const formattedTime = localTime.format('h:mm A');

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        mt: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        direction: language === 'ar' ? 'rtl' : 'ltr',
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom align="center">
          {data.name}, {data.sys.country}
        </Typography>

        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Typography variant="body1">{formattedDate}</Typography>
          <Typography variant="body1">{formattedTime}</Typography>
        </Box>

        <Box sx={{ textAlign: 'center', my: 3 }}>
          <Typography variant="h1" component="div" sx={{ fontSize: '4rem' }}>
            {Math.round(data.main.temp)}°C
          </Typography>
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {data.weather[0].description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {t.feelsLike}: {Math.round(data.main.feels_like)}°C
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">{t.min}</Typography>
              <Typography variant="h6">
                {Math.round(data.main.temp_min)}°C
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">{t.max}</Typography>
              <Typography variant="h6">
                {Math.round(data.main.temp_max)}°C
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">{t.humidity}</Typography>
              <Typography variant="h6">{data.main.humidity}%</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">{t.wind}</Typography>
              <Typography variant="h6">{data.wind.speed} m/s</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
