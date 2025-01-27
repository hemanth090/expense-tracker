export const validateExpense = (data) => {
  const errors = {};

  // Amount validation
  if (!data.amount) {
    errors.amount = 'Amount is required';
  } else if (isNaN(data.amount) || parseFloat(data.amount) <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  // Description validation
  if (!data.description) {
    errors.description = 'Description is required';
  } else if (data.description.length < 3) {
    errors.description = 'Description must be at least 3 characters long';
  } else if (data.description.length > 100) {
    errors.description = 'Description must be less than 100 characters';
  }

  // Category validation
  if (!data.category) {
    errors.category = 'Category is required';
  }

  // Date validation
  if (!data.date) {
    errors.date = 'Date is required';
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    if (selectedDate > today) {
      errors.date = 'Date cannot be in the future';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    );
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};
