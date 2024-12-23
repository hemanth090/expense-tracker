const formatMonthYear = (date) => {
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};

// Simple linear regression for trend analysis
export const calculateTrend = (data) => {
  const n = data.length;
  if (n < 2) return { slope: 0, intercept: 0 };

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  data.forEach((point, index) => {
    sumX += index;
    sumY += point.amount;
    sumXY += index * point.amount;
    sumXX += index * index;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};

// Predict next month's expenses
export const predictNextMonth = (data) => {
  const { slope, intercept } = calculateTrend(data);
  return intercept + slope * data.length;
};

// Calculate month-over-month change
export const calculateMonthlyChange = (currentMonth, previousMonth) => {
  if (!previousMonth) return 0;
  return ((currentMonth - previousMonth) / previousMonth) * 100;
};

// Generate prediction data for chart
export const generatePredictionData = (historicalData, months = 3) => {
  const { slope, intercept } = calculateTrend(historicalData);
  
  const result = historicalData.map(point => ({
    date: point.date,
    actual: point.amount,
    predicted: null
  }));

  // Add predictions for future months
  const lastDate = new Date(historicalData[historicalData.length - 1].date);
  for (let i = 0; i < months; i++) {
    const nextDate = new Date(lastDate);
    nextDate.setMonth(nextDate.getMonth() + i + 1);
    
    result.push({
      date: formatMonthYear(nextDate),
      actual: null,
      predicted: intercept + slope * (historicalData.length + i)
    });
  }

  return result;
};

// Calculate spending patterns
export const analyzeSpendingPatterns = (expenses) => {
  const patterns = {
    highestSpendingDay: { day: '', amount: 0 },
    lowestSpendingDay: { day: '', amount: Infinity },
    averageDailySpending: 0,
    totalTransactions: expenses.length
  };

  const dailyTotals = new Map();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const day = days[date.getDay()];
    const current = dailyTotals.get(day) || 0;
    dailyTotals.set(day, current + expense.amount);
  });

  dailyTotals.forEach((amount, day) => {
    if (amount > patterns.highestSpendingDay.amount) {
      patterns.highestSpendingDay = { day, amount };
    }
    if (amount < patterns.lowestSpendingDay.amount) {
      patterns.lowestSpendingDay = { day, amount };
    }
  });

  const totalSpending = Array.from(dailyTotals.values()).reduce((a, b) => a + b, 0);
  patterns.averageDailySpending = totalSpending / 7;

  return patterns;
};
