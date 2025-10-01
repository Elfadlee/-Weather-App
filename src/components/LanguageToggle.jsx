import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Box, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { toggleLanguage } from '../store/languageSlice';

const LanguageToggle = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {language === 'en' ? 'EN' : 'عربي'}
      </Typography>
      <IconButton
        onClick={() => dispatch(toggleLanguage())}
        color="primary"
        sx={{
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <LanguageIcon />
      </IconButton>
    </Box>
  );
};

export default LanguageToggle;
