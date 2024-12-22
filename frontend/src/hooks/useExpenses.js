import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user logged in');

      const { data, error: fetchError } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (fetchError) throw fetchError;

      setExpenses(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = async (expenseData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('expenses')
        .insert([{
          ...expenseData,
          user_id: user.id,
          amount: parseFloat(expenseData.amount)
        }]);

      if (error) throw error;
      await fetchExpenses();
      return { error: null };
    } catch (err) {
      return { error: err.message };
    }
  };

  const deleteExpense = async (id) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchExpenses();
      return { error: null };
    } catch (err) {
      return { error: err.message };
    }
  };

  const getExpenseSummary = useCallback(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const byCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
    
    const last30Days = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return expenseDate >= thirtyDaysAgo;
    }).reduce((sum, expense) => sum + expense.amount, 0);

    return {
      total,
      byCategory,
      last30Days
    };
  }, [expenses]);

  useEffect(() => {
    fetchExpenses();

    const channel = supabase
      .channel('expenses_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'expenses' },
        () => {
          fetchExpenses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    addExpense,
    deleteExpense,
    getExpenseSummary,
    refreshExpenses: fetchExpenses
  };
}
