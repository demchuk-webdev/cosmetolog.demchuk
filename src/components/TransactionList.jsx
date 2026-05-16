import { Trash2 } from 'lucide-react';

export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <p>Історія порожня.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Історія</h3>
      <div className="space-y-4">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="font-medium text-gray-800">{t.category}</p>
              <p className="text-xs text-gray-500">
                {new Date(t.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} 
                {t.note && ` • ${t.note}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {t.type === 'income' ? '+' : '-'}{t.amount} ₴
              </span>
              <button 
                onClick={() => onDelete(t.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
