import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E60023', // Pinterest red
      light: '#FF5A5F', // Slightly lighter red
      dark: '#A4001A', // Darker red
      contrastText: '#ffffff', // White text
    },
    secondary: {
      main: '#ffffff', // White for clean design
      light: '#f5f5f5', // Light grey for hover effects
      dark: '#cccccc', // Darker grey
      contrastText: '#333333', // Dark grey text
    },
    background: {
      default: '#ffffff', // White for the main background
      paper: '#f9f9f9', // Slightly off-white for cards and containers
    },
    text: {
      primary: '#333333', // Dark grey for main text
      secondary: '#666666', // Medium grey for secondary text
    },
    divider: '#e0e0e0', // Light grey for dividers
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
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 700, fontSize: '2rem' },
    h3: { fontWeight: 600, fontSize: '1.75rem' },
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
  },
});

export default theme;
