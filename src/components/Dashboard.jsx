import { ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard({ summary }) {
  const chartData = {
    labels: ['Доходи', 'Витрати'],
    datasets: [
      {
        data: [summary.income, summary.expenses],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const hasData = summary.income > 0 || summary.expenses > 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <h2 className="text-gray-500 text-sm font-medium mb-1">Баланс (Поточний місяць)</h2>
      <div className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        {summary.profit} ₴
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 bg-green-50/50 p-3 rounded-xl border border-green-100">
          <ArrowUpCircle className="text-green-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">Доходи</p>
            <p className="font-semibold text-green-700">{summary.income} ₴</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-red-50/50 p-3 rounded-xl border border-red-100">
          <ArrowDownCircle className="text-red-500" size={24} />
          <div>
            <p className="text-xs text-gray-500">Витрати</p>
            <p className="font-semibold text-red-700">{summary.expenses} ₴</p>
          </div>
        </div>
      </div>

      {hasData && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-4 text-center">Співвідношення</h3>
          <div className="w-48 h-48 mx-auto">
            <Doughnut data={chartData} options={{ maintainAspectRatio: false, cutout: '75%' }} />
          </div>
        </div>
      )}
    </div>
  );
}
