import { Edit2, Trash2 } from 'lucide-react';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 glass-panel rounded-2xl border border-white/5">
        <p className="text-gray-500 text-sm tracking-wider uppercase">Історія порожня</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h3 className="text-sm font-medium text-gray-400 mb-6 uppercase tracking-widest">Історія записів</h3>
      <div className="space-y-3">
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
    </div>
  );
}
