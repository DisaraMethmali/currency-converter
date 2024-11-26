import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const DarkModeToggle = ({ toggleDarkMode, darkMode }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <IconButton onClick={toggleDarkMode} color="primary">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Typography variant="body2" color={darkMode ? 'text.primary' : 'text.secondary'}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </Typography>
    </div>
  );
};

export default DarkModeToggle;
