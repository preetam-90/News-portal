import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material'; // Sun and Moon icons

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={toggleTheme}
      color="inherit"
      aria-label="toggle theme"
    >
      {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggleButton; 