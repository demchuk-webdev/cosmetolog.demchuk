import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const CATEGORIES = ['Процедури', 'Матеріали', 'Оренда', 'Реклама', 'Інше'];

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    onAdd({
      type,
      amount: Number(amount),
      category,
      note
    });

    setAmount('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Новий запис</h3>
      
      <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${type === 'income' ? 'bg-white shadow text-green-600' : 'text-gray-500'}`}
          onClick={() => setType('income')}
        >
          Дохід
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${type === 'expense' ? 'bg-white shadow text-red-600' : 'text-gray-500'}`}
          onClick={() => setType('expense')}
        >
          Витрата
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Сума (₴)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Категорія</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Примітка (опціонально)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Наприклад: Чистка обличчя"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle size={20} />
          Додати
        </button>
      </div>
    </form>
  );
}
