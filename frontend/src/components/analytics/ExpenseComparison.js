import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatCurrency } from '../../utils/formatters';

const ExpenseComparison = ({ data }) => {
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
            Period: {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </Typography>
          ))}
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
        Period Comparison
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
            <XAxis dataKey="period" stroke={theme.palette.text.primary} />
            <YAxis tickFormatter={(value) => formatCurrency(value)} stroke={theme.palette.text.primary} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="current" name="Current Period" fill={theme.palette.primary.main} />
            <Bar dataKey="previous" name="Previous Period" fill={theme.palette.secondary.main} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ExpenseComparison;
