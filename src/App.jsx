import { useState, useEffect } from 'react';
import { getSummary, getTransactions, saveTransaction, deleteTransaction } from './utils/storage';
import { Wallet } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [summary, setSummary] = useState({ income: 0, expenses: 0, profit: 0, categoryTotals: {} });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setSummary(getSummary());
    setTransactions(getTransactions());
  };

  const handleAddTransaction = (data) => {
    saveTransaction(data);
    refreshData();
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Видалити цей запис?')) {
      deleteTransaction(id);
      refreshData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-10">
      <header className="bg-white shadow-sm px-4 py-4 mb-6 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-center gap-2">
          <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
            <Wallet size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Фінанси Косметолога</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4">
        <Dashboard summary={summary} />
        <TransactionForm onAdd={handleAddTransaction} />
        <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
      </main>
    </div>
  );
}

export default App;
