import { useState, useEffect } from 'react';
import { getSummary, getTransactions, saveTransaction, deleteTransaction } from './utils/storage';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [summary, setSummary] = useState({ income: 0, expenses: 0, profit: 0, categoryTotals: {} });
  const [transactions, setTransactions] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshData();
  }, [currentDate]);

  const refreshData = async () => {
    setIsLoading(true);
    const allTransactions = await getTransactions();
    
    setSummary(getSummary(allTransactions, currentDate.getMonth(), currentDate.getFullYear()));
    
    const filtered = allTransactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
    });
    setTransactions(filtered);
    setIsLoading(false);
  };

  const handleAddTransaction = async (data) => {
    await saveTransaction(data);
    setEditingItem(null);
    refreshData();
  };

  const handleEditTransaction = (item) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей запис?')) {
      await deleteTransaction(id);
      refreshData();
    }
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const monthName = currentDate.toLocaleString('uk-UA', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen pb-20 selection:bg-gold-400 selection:text-black">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gold-600/20 to-transparent pointer-events-none"></div>
      
      <header className="relative z-10 px-4 py-8 mb-2">
        <div className="max-w-md mx-auto flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-2 text-gold-400 mb-2">
            <Sparkles size={20} />
            <h1 className="text-sm font-semibold tracking-widest uppercase">cosmetolog.demchuk</h1>
          </div>
          <h2 className="text-2xl font-light text-white tracking-wide">Фінанси</h2>
        </div>
      </header>

      <main className="relative z-10 max-w-md mx-auto px-4">
        <div className="flex items-center justify-between glass-panel rounded-full px-4 py-2 mb-6 animate-fade-in">
          <button onClick={prevMonth} className="p-2 text-gray-400 hover:text-gold-400 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-white uppercase tracking-widest">{monthName}</span>
          <button onClick={nextMonth} className="p-2 text-gray-400 hover:text-gold-400 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-400"></div>
          </div>
        ) : (
          <>
            <Dashboard summary={summary} />
            
            <TransactionForm 
              onAdd={handleAddTransaction} 
              editingItem={editingItem} 
              onCancelEdit={() => setEditingItem(null)} 
            />
            
            <TransactionList 
              transactions={transactions} 
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction} 
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
