import { DollarSign, TrendingUp, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function Scorecards() {
  const cards = [
    { title: "Receita Total (Mês)", value: "R$ 45.850", icon: <DollarSign className="w-8 h-8 text-green-500" />, trend: "+12.5%" },
    { title: "Lucro Estimado", value: "R$ 28.300", icon: <TrendingUp className="w-8 h-8 text-blue-500" />, trend: "+8.2%" },
    { title: "Agendamentos (Hoje)", value: "14", icon: <CalendarCheck className="w-8 h-8 text-purple-500" />, trend: "+3" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex items-center justify-between"
        >
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
            <h3 className="text-3xl font-bold text-white">{card.value}</h3>
            <span className="text-green-400 text-xs font-semibold mt-2 inline-block bg-green-400/10 px-2 py-1 rounded">{card.trend} vs último mês</span>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            {card.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
