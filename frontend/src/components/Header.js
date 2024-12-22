import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  Button,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  LogoutOutlined as LogoutIcon,
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

const Header = () => {
  const theme = useTheme();
  const { toggleTheme } = useCustomTheme();
  const { user, signOut } = useAuth();
  const { showSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      showSnackbar('Successfully logged out', 'success');
    } catch (error) {
      showSnackbar(error.message || 'Error logging out', 'error');
    }
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Expense Tracker
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                color: 'text.primary',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {theme.palette.mode === 'dark' ? <LightIcon /> : <DarkIcon />}
            </IconButton>
          </Tooltip>

          {user && (
            <>
              <Tooltip title={user.email}>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'primary.dark'
                      : 'primary.light',
                  }}
                >
                  {user.email[0].toUpperCase()}
                </Avatar>
              </Tooltip>
              
              <Button
                variant="text"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                size="small"
                sx={{
                  ml: 1,
                  color: 'text.primary',
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
