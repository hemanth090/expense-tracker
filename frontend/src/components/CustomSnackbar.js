import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ 
          width: '100%',
          boxShadow: (theme) => 
            theme.palette.mode === 'dark' 
              ? '0 4px 6px rgba(0, 0, 0, 0.2)'
              : '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
