import React from 'react';
import { Card, CardContent, Typography, Grid, Skeleton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useExpense } from '../context/ExpenseContext';

const getExpenseSummary = (expenses) => {
  if (!expenses || expenses.length === 0) {
    return {
      total: 0,
      average: 0,
      highest: 0,
      lowest: 0
    };
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const average = total / expenses.length;
  const highest = Math.max(...expenses.map(expense => expense.amount));
  const lowest = Math.min(...expenses.map(expense => expense.amount));

  return {
    total,
    average,
    highest,
    lowest
  };
};

const SummaryCard = ({ title, value, loading }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 2,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          component="div" 
          gutterBottom 
          sx={{ 
            color: 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          {title}
        </Typography>
        {loading ? (
          <Skeleton variant="text" width="60%" height={40} />
        ) : (
          <Typography 
            variant="h4" 
            component="div"
            sx={{ 
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ${value.toFixed(2)}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const ExpenseSummary = () => {
  const { expenses, loading } = useExpense();
  const summary = getExpenseSummary(expenses);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          mb: 3,
          fontWeight: 600,
        }}
      >
        Expense Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Total Expenses" value={summary.total} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Average Expense" value={summary.average} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Highest Expense" value={summary.highest} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Lowest Expense" value={summary.lowest} loading={loading} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpenseSummary;
