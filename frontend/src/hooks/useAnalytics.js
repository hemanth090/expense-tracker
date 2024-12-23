import { useState, useEffect } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { format, startOfWeek } from 'date-fns';
import { 
  predictNextMonth, 
  generatePredictionData, 
  analyzeSpendingPatterns 
} from '../utils/predictiveUtils';

const useAnalytics = (dateRange, categoryFilter, timeFrame) => {
  const { expenses } = useExpense();
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [nextMonthPrediction, setNextMonthPrediction] = useState(0);
  const [spendingPatterns, setSpendingPatterns] = useState(null);

  useEffect(() => {
    if (expenses) {
      // Filter expenses based on date range and category
      const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const categoryMatch = categoryFilter === 'all' || expense.category === categoryFilter;
        return expenseDate >= dateRange.start && 
               expenseDate <= dateRange.end && 
               categoryMatch;
      });

      // Process data based on timeFrame
      const timeFrameMap = new Map();
      filteredExpenses.forEach(expense => {
        const date = new Date(expense.date);
        let key;

        switch (timeFrame) {
          case 'daily':
            key = format(date, 'MM/dd/yyyy');
            break;
          case 'weekly':
            key = format(startOfWeek(date), 'MM/dd/yyyy');
            break;
          case 'monthly':
            key = format(date, 'MMM yyyy');
            break;
          case 'yearly':
            key = format(date, 'yyyy');
            break;
          default:
            key = format(date, 'MM/dd/yyyy');
        }

        const current = timeFrameMap.get(key) || 0;
        timeFrameMap.set(key, current + expense.amount);
      });

      const timeFrameTrends = Array.from(timeFrameMap, ([date, amount]) => ({ date, amount }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setMonthlyData(timeFrameTrends);

      // Generate prediction data
      const predictionResult = generatePredictionData(timeFrameTrends);
      setPredictionData(predictionResult);
      setNextMonthPrediction(predictNextMonth(timeFrameTrends));

      // Analyze spending patterns
      setSpendingPatterns(analyzeSpendingPatterns(filteredExpenses));

      // Process category data
      const categoryMap = new Map();
      filteredExpenses.forEach(expense => {
        const current = categoryMap.get(expense.category) || 0;
        categoryMap.set(expense.category, current + expense.amount);
      });
      const categoryBreakdown = Array.from(categoryMap, ([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
      setCategoryData(categoryBreakdown);

      // Generate comparison data
      const currentMonth = new Date().getMonth();
      const currentMonthExpenses = filteredExpenses.filter(
        expense => new Date(expense.date).getMonth() === currentMonth
      );
      const previousMonthExpenses = filteredExpenses.filter(
        expense => new Date(expense.date).getMonth() === currentMonth - 1
      );

      const comparisonByCategory = new Map();
      [...currentMonthExpenses, ...previousMonthExpenses].forEach(expense => {
        if (!comparisonByCategory.has(expense.category)) {
          comparisonByCategory.set(expense.category, {
            name: expense.category,
            currentMonth: 0,
            previousMonth: 0
          });
        }
        const entry = comparisonByCategory.get(expense.category);
        if (new Date(expense.date).getMonth() === currentMonth) {
          entry.currentMonth += expense.amount;
        } else {
          entry.previousMonth += expense.amount;
        }
      });

      setComparisonData(Array.from(comparisonByCategory.values()));

      // Process daily data
      const dailyMap = new Map();
      filteredExpenses.forEach(expense => {
        const date = format(new Date(expense.date), 'MM/dd/yyyy');
        const current = dailyMap.get(date) || 0;
        dailyMap.set(date, current + expense.amount);
      });
      const dailyTrends = Array.from(dailyMap, ([date, amount]) => ({ date, amount }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setDailyData(dailyTrends);
    }
  }, [expenses, dateRange, categoryFilter, timeFrame]);

  return {
    monthlyData,
    categoryData,
    dailyData,
    comparisonData,
    predictionData,
    nextMonthPrediction,
    spendingPatterns
  };
};

export default useAnalytics;
