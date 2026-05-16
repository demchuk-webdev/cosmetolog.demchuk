import { supabase } from './supabase';

export const getTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });
    
  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
  return data || [];
};

export const saveTransaction = async (transaction) => {
  if (transaction.id) {
    // Edit existing
    const { error } = await supabase
      .from('transactions')
      .update({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        note: transaction.note,
        date: transaction.date
      })
      .eq('id', transaction.id);
      
    if (error) console.error('Error updating:', error);
  } else {
    // Add new
    const { error } = await supabase
      .from('transactions')
      .insert([{
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        note: transaction.note,
        date: transaction.date || new Date().toISOString()
      }]);
      
    if (error) console.error('Error inserting:', error);
  }
};

export const deleteTransaction = async (id) => {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);
    
  if (error) console.error('Error deleting:', error);
};

export const getSummary = (transactions, month, year) => {
  let income = 0;
  let expenses = 0;
  const categoryTotals = {};

  transactions.forEach(t => {
    const tDate = new Date(t.date);
    if (tDate.getMonth() === month && tDate.getFullYear() === year) {
      const amount = Number(t.amount);
      if (t.type === 'income') {
        income += amount;
      } else {
        expenses += amount;
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
      }
    }
  });

  return { income, expenses, profit: income - expenses, categoryTotals };
};
