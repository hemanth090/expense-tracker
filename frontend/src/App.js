import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { useTheme } from './context/ThemeContext';
import getTheme from './theme';
import Auth from './components/Auth';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import { supabase } from './supabaseClient';

const ThemedApp = () => {
  const { theme } = useTheme();
  const muiTheme = getTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <ExpenseProvider>
            <Box
              sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Header />
              <Box
                component="main"
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  py: 3,
                }}
              >
                <Container maxWidth="lg">
                  <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                      path="/expenses"
                      element={
                        <ProtectedRoute>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <ExpenseForm />
                            <ExpenseSummary />
                            <ExpenseList />
                          </Box>
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/" element={<Navigate to="/expenses" replace />} />
                    <Route path="*" element={<Navigate to="/expenses" replace />} />
                  </Routes>
                </Container>
              </Box>
            </Box>
          </ExpenseProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <CustomThemeProvider>
      <ThemedApp />
    </CustomThemeProvider>
  );
};

export default App;
