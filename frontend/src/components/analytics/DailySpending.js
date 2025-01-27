import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatCurrency } from '../../utils/formatters';

const DailySpending = ({ data }) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? '#333' : 'white',
            p: 1,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2">
            Date: {label}
          </Typography>
          <Typography variant="body2">
            Amount: {formatCurrency(payload[0].value)}
          </Typography>
        </Box>
      );
    }
    return null;
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
        Daily Spending
      </Typography>
      <Box sx={{ width: '100%', height: '90%' }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default DailySpending;
