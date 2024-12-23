import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PredictiveAnalytics = ({ data, prediction }) => {
  const theme = useTheme();

  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}k`;
    }
    return `₹${value}`;
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        height: '400px',
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'white'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Expense Forecast
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Predicted next month's expenses: ₹{prediction.toFixed(2)}
      </Alert>

      <Box sx={{ width: '100%', height: '75%' }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              stroke={theme.palette.text.primary}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              stroke={theme.palette.text.primary}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme.palette.mode === 'dark' ? '#333' : 'white',
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`
              }}
              formatter={(value) => [`₹${value}`, 'Amount']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke={theme.palette.primary.main} 
              name="Actual"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke={theme.palette.secondary.main} 
              name="Predicted"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default PredictiveAnalytics;
