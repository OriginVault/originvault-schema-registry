import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: {
      main: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      main?: string;
    };
  }
}

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Thiccboi", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
    subtitle1: { fontWeight: 400 },
    subtitle2: { fontWeight: 400 },
    button: { fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Thiccboi", "Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Thiccboi", "Roboto", "Helvetica", "Arial", sans-serif',
          backgroundColor: '#1c2a35',
        },
        html: {
          backgroundColor: '#1c2a35',
        },
      },
    },
  },
};

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: { main: '#add4ef' },
    secondary: { main: '#c9b36d' },
    accent: { main: '#fe9334' },
    background: {
      default: '#f5f5f5', // fallback, but use gradient in .App
      paper: '#f5f5f5',
    },
    text: {
      primary: '#1c2a35',
      secondary: '#5794b4',
    },
    divider: '#c9b36d',
  },
  components: {
    ...baseTheme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(230deg, #c9b36d, #f5be6b, #ecadef, #add4ef, #5794b4, #5794b4)',
          color: '#1c2a35',
          boxShadow: '0 2px 8px 0 rgba(173, 212, 239, 0.08)',
          borderBottom: '1.5px solid #c9b36d',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          color: '#1c2a35',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: { main: '#add4ef' },
    secondary: { main: '#c9b36d' },
    accent: { main: '#fe9334' },
    background: {
      default: '#1c2a35',
      paper: '#212831',
    },
    text: {
      primary: '#add4ef',
      secondary: '#c9b36d',
    },
    divider: '#3a6278',
  },
  components: {
    ...baseTheme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(230deg, #1c2a35, #212831, #3a6278, #9c27b0, #1c2a35)',
          color: '#add4ef',
          boxShadow: '0 2px 8px 0 rgba(173, 212, 239, 0.08)',
          borderBottom: '1.5px solid #3a6278',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#212831',
          color: '#add4ef',
        },
      },
    },
  },
});

export { lightTheme, darkTheme }; 