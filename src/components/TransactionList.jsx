import { useState } from 'react';
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 glass-panel rounded-2xl border border-white/5">
        <p className="text-gray-500 text-sm tracking-wider uppercase">Історія порожня</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group"
      >
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest group-hover:text-gold-400 transition-colors">
          Історія записів ({transactions.length})
        </h3>
        <div className="text-gray-400 group-hover:text-gold-400 transition-colors p-1 bg-white/5 rounded-full">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="space-y-3 mt-6">
          {transactions.map((t) => (
            <div key={t.id} className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
              <div>
                <p className="font-medium text-gray-200">{t.category}</p>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider mt-1">
                  {new Date(t.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} 
                  {t.note && ` • ${t.note}`}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-semibold ${t.type === 'income' ? 'text-gold-400' : 'text-rose-gold'}`}>
                  {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('uk-UA')} ₴
                </span>
                <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(t)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="text-gray-400 hover:text-rose-gold transition-colors p-2 rounded-lg hover:bg-white/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
