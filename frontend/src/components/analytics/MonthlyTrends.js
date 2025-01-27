import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatCurrency } from '../../utils/formatters';

const MonthlyTrends = ({ data }) => {
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
            Month: {label}
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
        Monthly Trends
      </Typography>
      <Box sx={{ width: '100%', height: '90%' }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke={theme.palette.text.primary} />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
              stroke={theme.palette.text.primary}
            />
            <Tooltip content={<CustomTooltip />} 
              contentStyle={{
                backgroundColor: theme.palette.mode === 'dark' ? '#333' : 'white',
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.divider}`
              }}
            />
            <Bar dataKey="amount" fill={theme.palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default MonthlyTrends;
