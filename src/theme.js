import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { themeMode } from './store/useHandleThemeStore';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#611f69'
    }
  },
  colors: {
    purple: '#611f69',
    green: '#2eb67d',
    red: '#e01e5a',
    yellow: '#ecb22e',
    blue: '#36c5f0',
    white: '#fff',
    black: 'rgb(18, 18, 18)',
    gray: 'rgba(0,0,0,0.4)',
    grayLight: '#F2F2F2'
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e01e5a'
    }
  },
  colors: {
    purple: '#611f69',
    green: '#2eb67d',
    red: '#e01e5a',
    yellow: '#ecb22e',
    blue: '#36c5f0',
    white: '#fff',
    black: 'rgb(18, 18, 18)',
    gray: '#ccc',
    grayLight: '#F2F2F2'
  }
});

const theme = mode => (mode === themeMode.dark ? darkTheme : lightTheme);

export { theme };
