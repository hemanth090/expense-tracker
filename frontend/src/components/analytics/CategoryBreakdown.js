import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const CategoryBreakdown = ({ data }) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const totalValue = data.reduce((sum, item) => sum + item.value, 0);
      const percentage = (payload[0].value / totalValue);
      
      return (
        <Box
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? '#333' : 'white',
            p: 1,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2">
            {payload[0].name}: {formatCurrency(payload[0].value)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {formatPercentage(percentage * 100)}
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
        Category Breakdown
      </Typography>
      <Box sx={{ width: '100%', height: '90%' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${formatPercentage(percent * 100)}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default CategoryBreakdown;
