import React, { useState } from 'react';
import { Grid, Container, Typography, Box, Alert } from '@mui/material';
import MonthlyTrends from './MonthlyTrends';
import CategoryBreakdown from './CategoryBreakdown';
import DailySpending from './DailySpending';
import ExpenseComparison from './ExpenseComparison';
import PredictiveAnalytics from './PredictiveAnalytics';
import AnalyticsFilters from './AnalyticsFilters';
import useAnalytics from '../../hooks/useAnalytics';
import { useExpense } from '../../context/ExpenseContext';

const AnalyticsDashboard = () => {
  const { expenses } = useExpense();
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [timeFrame, setTimeFrame] = useState('monthly');

  const {
    monthlyData,
    categoryData,
    dailyData,
    comparisonData,
    predictionData,
    nextMonthPrediction,
    spendingPatterns
  } = useAnalytics(dateRange, categoryFilter, timeFrame);

  const handleExport = () => {
    // Export detailed expenses
    const detailedData = formatDataForExport(expenses, dateRange);
    exportToExcel(detailedData, 'Detailed_Expenses');

    // Export summary data
    const summaryData = generateSummaryData(expenses, dateRange);
    exportToExcel(summaryData, 'Expense_Summary');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Expense Analytics
      </Typography>

      <AnalyticsFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        categories={[...new Set(expenses.map(expense => expense.category))]}
        onExport={handleExport}
      />

      {spendingPatterns && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Highest spending day: {spendingPatterns.highestSpendingDay.day} (₹{spendingPatterns.highestSpendingDay.amount.toFixed(2)})
          | Average daily spending: ₹{spendingPatterns.averageDailySpending.toFixed(2)}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        {/* Monthly Trends */}
        <Grid item xs={12}>
          <MonthlyTrends data={monthlyData} />
        </Grid>

        {/* Predictive Analytics */}
        <Grid item xs={12}>
          <PredictiveAnalytics 
            data={predictionData}
            prediction={nextMonthPrediction}
          />
        </Grid>

        {/* Category Breakdown */}
        <Grid item xs={12} md={6}>
          <CategoryBreakdown data={categoryData} />
        </Grid>

        {/* Month-over-Month Comparison */}
        <Grid item xs={12} md={6}>
          <ExpenseComparison data={comparisonData} />
        </Grid>

        {/* Daily Spending */}
        <Grid item xs={12}>
          <DailySpending data={dailyData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsDashboard;
