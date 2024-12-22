import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Grid,
  Container,
  CircularProgress,
} from '@mui/material';
import {
  ReceiptLong as TrackIcon,
  TrendingUp as AnalyticsIcon,
  Category as CategoryIcon,
  CloudSync as SyncIcon,
} from '@mui/icons-material';
import { supabase } from '../supabaseClient';
import { validateEmail, validatePassword } from '../utils/validation';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import CustomSnackbar from './CustomSnackbar';

const FeatureCard = ({ icon: Icon, title, description }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        mb: 3,
      }}
    >
      <Icon
        sx={{
          fontSize: 24,
          color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
        }}
      />
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('sign-in');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { signIn, signUp, resetPassword, user } = useAuth(); 
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      navigate('/expenses');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (view === 'sign-up') {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setSnackbar({
          open: true,
          message: 'Check your email for the confirmation link!',
          severity: 'success'
        });
      } else if (view === 'forgot-password') {
        const { error } = await resetPassword(email);
        if (error) throw error;
        setSnackbar({
          open: true,
          message: 'Password reset instructions sent to your email!',
          severity: 'success'
        });
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        setSnackbar({
          open: true,
          message: 'Successfully logged in!',
          severity: 'success'
        });
        // Wait for snackbar to be visible before navigating
        setTimeout(() => {
          navigate('/expenses');
        }, 1000);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({
        [error.message.toLowerCase().includes('password') ? 'password' : 'email']: error.message
      });
      setSnackbar({
        open: true,
        message: error.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        pt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="flex-start">
          {/* Left side - Features */}
          <Grid item xs={12} md={7}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h3"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                ExpenseTracker
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
                  fontWeight: 500,
                  mb: 4,
                }}
              >
                Track Your Expenses with Ease
              </Typography>

              <Box sx={{ mt: 4 }}>
                <FeatureCard
                  icon={TrackIcon}
                  title="Easy Expense Tracking"
                  description="Record and categorize your daily expenses effortlessly. Keep track of every penny spent."
                />

                <FeatureCard
                  icon={AnalyticsIcon}
                  title="Smart Analytics"
                  description="Get insights into your spending patterns with detailed charts and summaries."
                />

                <FeatureCard
                  icon={CategoryIcon}
                  title="Category Management"
                  description="Organize expenses by categories and track spending across different areas."
                />

                <FeatureCard
                  icon={SyncIcon}
                  title="Cloud Sync"
                  description="Access your expense data from anywhere, anytime. All data is securely stored in the cloud."
                />
              </Box>
            </Box>
          </Grid>

          {/* Right side - Auth Form */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                width: '100%',
                bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                {view === 'sign-up' ? 'Create Account' : view === 'forgot-password' ? 'Reset Password' : 'Welcome Back'}
              </Typography>
              <Typography 
                variant="body2" 
                align="center" 
                sx={{ 
                  mb: 3,
                  color: theme.palette.text.secondary 
                }}
              >
                {view === 'sign-up' ? 'Sign up to start tracking your expenses' : view === 'forgot-password' ? 'Enter your email to receive a password reset link' : 'Sign in to manage your expenses'}
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: '' });
                    }
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  margin="normal"
                  autoComplete="email"
                  InputProps={{
                    sx: {
                      bgcolor: theme.palette.mode === 'dark' ? '#333' : '#fff',
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? '#404040' : '#fff',
                      },
                    },
                  }}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.text.secondary,
                    },
                    '& .MuiInputBase-input': {
                      color: theme.palette.text.primary,
                    },
                  }}
                />

                {view !== 'forgot-password' && (
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors({ ...errors, password: '' });
                      }
                    }}
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                    margin="normal"
                    autoComplete={view === 'sign-up' ? 'new-password' : 'current-password'}
                    InputProps={{
                      sx: {
                        bgcolor: theme.palette.mode === 'dark' ? '#333' : '#fff',
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' ? '#404040' : '#fff',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                      },
                      '& .MuiInputBase-input': {
                        color: theme.palette.text.primary,
                      },
                    }}
                  />
                )}

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? '#42a5f5' : '#1565c0',
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : view === 'sign-up' ? (
                    'Sign Up'
                  ) : view === 'forgot-password' ? (
                    'Send Reset Link'
                  ) : (
                    'Sign In'
                  )}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  {view === 'sign-in' && (
                    <>
                      <Link
                        component="button"
                        type="button"
                        variant="body2"
                        onClick={() => {
                          setView('forgot-password');
                          setErrors({});
                        }}
                        sx={{
                          color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Forgot your password?
                      </Link>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: theme.palette.text.secondary,
                          fontSize: { xs: '0.875rem', sm: '0.9rem' },
                        }}
                      >
                        Don't have an account?{' '}
                        <Link
                          component="button"
                          type="button"
                          variant="body2"
                          onClick={() => {
                            setView('sign-up');
                            setErrors({});
                          }}
                          sx={{
                            color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
                            textDecoration: 'none',
                            fontWeight: 500,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Sign up
                        </Link>
                      </Typography>
                    </>
                  )}

                  {(view === 'sign-up' || view === 'forgot-password') && (
                    <Typography 
                      variant="body2"
                      sx={{ 
                        color: theme.palette.text.secondary,
                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                      }}
                    >
                      Already have an account?{' '}
                      <Link
                        component="button"
                        type="button"
                        variant="body2"
                        onClick={() => {
                          setView('sign-in');
                          setErrors({});
                        }}
                        sx={{
                          color: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
                          textDecoration: 'none',
                          fontWeight: 500,
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Sign in
                      </Link>
                    </Typography>
                  )}
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default Auth;
