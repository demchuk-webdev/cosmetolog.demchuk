import { ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ summary }) {
  const chartData = {
    labels: ['Доходи', 'Витрати'],
    datasets: [
      {
        data: [summary.income, summary.expenses],
        backgroundColor: ['#D4AF37', '#B76E79'],
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };

  const hasData = summary.income > 0 || summary.expenses > 0;

  return (
    <div className="glass-panel rounded-2xl p-6 mb-6 animate-fade-in">
      <h2 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Баланс</h2>
      <div className="text-4xl font-light text-white mb-8 flex items-center gap-2">
        {summary.profit.toLocaleString('uk-UA')} <span className="text-gold-400">₴</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 text-gold-400">
            <ArrowUpCircle size={18} />
            <span className="text-xs uppercase tracking-wider font-semibold">Доходи</span>
          </div>
          <p className="font-light text-xl text-white">{summary.income.toLocaleString('uk-UA')} ₴</p>
        </div>
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 text-rose-gold">
            <ArrowDownCircle size={18} />
            <span className="text-xs uppercase tracking-wider font-semibold">Витрати</span>
          </div>
          <p className="font-light text-xl text-white">{summary.expenses.toLocaleString('uk-UA')} ₴</p>
        </div>
      </div>

      {hasData && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="text-xs font-medium text-gray-400 mb-6 text-center uppercase tracking-wider">Співвідношення</h3>
          <div className="w-48 h-48 mx-auto relative">
            <Doughnut 
              data={chartData} 
              options={{ 
                maintainAspectRatio: false, 
                cutout: '80%',
                plugins: {
                  legend: { display: false }
                }
              }} 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Прибуток</span>
              <span className="text-sm font-semibold text-white">{((summary.profit / (summary.income || 1)) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
