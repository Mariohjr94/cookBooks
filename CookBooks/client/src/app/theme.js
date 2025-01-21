import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF', // White
      light: '#FAF9F6', // Off White
      dark: '#F5F5F5', // Whitesmoke
      contrastText: '#333333', // Dark Grey text for contrast
    },
    secondary: {
      main: '#F6F8FF', // Ghost White
      light: '#FFFFFF', // Light white
      dark: '#E0E0E0', // Slightly darker grey for accents
      contrastText: '#666666', // Medium grey for secondary text
    },
    background: {
      default: '#FFFFFF', // Main background
      paper: '#FAF9F6', // Off White for cards and containers
    },
    text: {
      primary: '#333333', // Dark grey for main text
      secondary: '#666666', // Medium grey for secondary text
    },
    divider: '#E0E0E0', // Light grey for dividers
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#f57c00',
    },
    info: {
      main: '#1976d2',
    },
    success: {
      main: '#388e3c',
    },
  },
  typography: {
    fontFamily: 'Roboto Mono, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', color: '#333333' },
    h2: { fontWeight: 700, fontSize: '2rem', color: '#333333' },
    h3: { fontWeight: 600, fontSize: '1.75rem', color: '#333333' },
    h4: { fontWeight: 600, fontSize: '1.5rem', color: '#333333' },
    body1: { fontSize: '1rem', lineHeight: 1.5, color: '#666666' },
    body2: { fontSize: '0.875rem', lineHeight: 1.5, color: '#666666' },
  },
});

export default theme;
