import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Expense Tracker
          </Link>
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ mx: 1 }}
            className={location.pathname === '/' ? 'active' : ''}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/expenses"
            sx={{ mx: 1 }}
            className={location.pathname === '/expenses' ? 'active' : ''}
          >
            Expenses
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/analytics"
            sx={{ mx: 1 }}
            className={location.pathname === '/analytics' ? 'active' : ''}
          >
            Analytics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
