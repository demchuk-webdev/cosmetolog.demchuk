import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

const CATEGORIES = ['Процедури', 'Матеріали', 'Оренда', 'Реклама', 'Інше'];

export default function TransactionForm({ onAdd, editingItem, onCancelEdit }) {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (editingItem) {
      setType(editingItem.type);
      setAmount(editingItem.amount.toString());
      setCategory(editingItem.category);
      setNote(editingItem.note || '');
      setDate(editingItem.date.split('T')[0]);
    } else {
      resetForm();
    }
  }, [editingItem]);

  const resetForm = () => {
    setType('income');
    setAmount('');
    setCategory(CATEGORIES[0]);
    setNote('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    // Create ISO string from selected date, keeping current time for sorting purposes
    // Or just appending arbitrary time
    const [year, month, day] = date.split('-');
    const now = new Date();
    const finalDate = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds()).toISOString();

    onAdd({
      ...(editingItem ? { id: editingItem.id } : {}),
      date: finalDate,
      type,
      amount: Number(amount),
      category,
      note
    });
    
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-light text-white uppercase tracking-widest">
          {editingItem ? 'Редагувати запис' : 'Новий запис'}
        </h3>
        {editingItem && (
          <button type="button" onClick={onCancelEdit} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="flex p-1 rounded-xl mb-6 bg-white/5 border border-white/10">
        <button
          type="button"
          className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${type === 'income' ? 'bg-gold-400 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setType('income')}
        >
          Дохід
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${type === 'expense' ? 'bg-rose-gold text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setType('expense')}
        >
          Витрата
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Сума (₴)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gold-400 text-white placeholder-gray-600 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Дата</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gold-400 text-white placeholder-gray-600 transition-colors [color-scheme:dark]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Категорія</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-premium-surface border border-white/10 rounded-xl focus:outline-none focus:border-gold-400 text-white appearance-none transition-colors"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Примітка</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Наприклад: Чистка обличчя"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gold-400 text-white placeholder-gray-600 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full btn-premium font-semibold py-4 text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 mt-2"
        >
          <Check size={18} />
          {editingItem ? 'Зберегти зміни' : 'Додати'}
        </button>
      </div>
    </form>
  );
}
