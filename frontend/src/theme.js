import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#1976d2',
              light: '#42a5f5',
              dark: '#1565c0',
            },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: '#1a1a1a',
              secondary: '#666666',
            },
          }
        : {
            primary: {
              main: '#90caf9',
              light: '#e3f2fd',
              dark: '#42a5f5',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b3b3b3',
            },
          }),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 4,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.23)' 
                  : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.text.secondary,
            },
            '& .MuiInputBase-input': {
              color: theme.palette.text.primary,
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h6: {
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
      },
      button: {
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 4,
    },
  });
};

export default getTheme;
