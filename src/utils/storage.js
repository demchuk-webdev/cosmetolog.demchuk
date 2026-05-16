const STORAGE_KEY = 'cosmetolog_transactions';

export const getTransactions = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  const parsed = JSON.parse(data);
  return parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const saveTransaction = (transaction) => {
  const transactions = getTransactions();
  const newTransaction = {
    ...transaction,
    id: crypto.randomUUID(),
    date: new Date().toISOString()
  };
  transactions.unshift(newTransaction);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  return newTransaction;
};

export const deleteTransaction = (id) => {
  const transactions = getTransactions();
  const updated = transactions.filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getSummary = () => {
  const transactions = getTransactions();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let income = 0;
  let expenses = 0;
  const categoryTotals = {};

  transactions.forEach(t => {
    const tDate = new Date(t.date);
    if (tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear) {
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
