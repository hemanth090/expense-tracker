import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchExpenses(user.id);
    } else {
      setExpenses([]);
      setLoading(false);
    }
  }, [user]);

  const fetchExpenses = async (userId) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('expenses')
        .insert([{
          ...expenseData,
          user_id: user.id,
          amount: parseFloat(expenseData.amount)
        }]);

      if (error) throw error;
      await fetchExpenses(user.id);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const deleteExpense = async (id) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchExpenses(user.id);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const value = {
    expenses,
    loading,
    addExpense,
    deleteExpense,
    fetchExpenses
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
