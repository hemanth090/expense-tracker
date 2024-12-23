import { useState, useEffect } from 'react';
import { useExpense } from '../context/ExpenseContext';

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const formatMonthYear = (date) => {
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

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
            key = formatDate(date);
            break;
          case 'weekly':
            key = formatDate(getStartOfWeek(date));
            break;
          case 'monthly':
            key = formatMonthYear(date);
            break;
          case 'yearly':
            key = date.getFullYear().toString();
            break;
          default:
            key = formatDate(date);
        }

        const current = timeFrameMap.get(key) || 0;
        timeFrameMap.set(key, current + expense.amount);
      });

      const timeFrameTrends = Array.from(timeFrameMap, ([date, amount]) => ({ date, amount }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setMonthlyData(timeFrameTrends);

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
        const date = formatDate(expense.date);
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
