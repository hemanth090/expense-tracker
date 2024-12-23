import * as XLSX from 'xlsx';

export const exportToExcel = (data, sheetName = 'Expenses') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `expense_report_${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const formatDataForExport = (expenses, dateRange) => {
  return expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= dateRange.start && expenseDate <= dateRange.end;
    })
    .map(expense => ({
      Date: new Date(expense.date).toLocaleDateString(),
      Category: expense.category,
      Description: expense.description,
      Amount: expense.amount,
    }));
};

export const generateSummaryData = (expenses, dateRange) => {
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= dateRange.start && expenseDate <= dateRange.end;
  });

  const categoryTotals = {};
  let totalAmount = 0;

  filteredExpenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    totalAmount += expense.amount;
  });

  const summaryData = [
    { Category: 'Total Expenses', Amount: totalAmount },
    { Category: '', Amount: '' }, // Empty row for spacing
    { Category: 'Category Breakdown', Amount: '' },
  ];

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    summaryData.push({
      Category: category,
      Amount: amount,
      'Percentage': ((amount / totalAmount) * 100).toFixed(2) + '%'
    });
  });

  return summaryData;
};
