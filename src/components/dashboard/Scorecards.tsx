import { DollarSign, Car, Hourglass } from 'lucide-react';
import { mesAtualLocal } from '../../lib/datas';
import { motion } from 'framer-motion';
import type { Agendamento } from '../../lib/supabase';
import { formatBRL } from '../../lib/servicos';

interface Props { agendamentos: Agendamento[]; }

export function Scorecards({ agendamentos }: Props) {
  const mesAtual = mesAtualLocal();
  const doMes = agendamentos.filter(a => a.data?.startsWith(mesAtual));
  const confirmados = doMes.filter(a => a.status === 'confirmado');

  const faturamento = confirmados.reduce((acc, a) => acc + Number(a.preco || 0), 0);
  const pendentes = agendamentos.filter(a => a.status === 'pendente').length;

  const cards = [
    { title: 'Faturamento (Mês)', value: formatBRL(faturamento), sub: `${confirmados.length} serviços confirmados`, icon: <DollarSign className="w-8 h-8 text-green-500" />, color: 'text-green-400', bg: 'bg-green-400/10' },
    { title: 'Carros Atendidos (Mês)', value: String(confirmados.length), sub: 'agendamentos confirmados', icon: <Car className="w-8 h-8 text-blue-500" />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Aguardando Resposta', value: String(pendentes), sub: 'pedidos pendentes', icon: <Hourglass className="w-8 h-8 text-yellow-500" />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-neve-dark/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-white/10 transition-colors"
        >
          <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,100 L0,50 Q25,20 50,60 T100,30 L100,100 Z" fill="currentColor" className={card.color} />
          </svg>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-white">{card.value}</h3>
              <span className={`${card.color} text-xs font-semibold mt-2 inline-block ${card.bg} px-2 py-1 rounded`}>
                {card.sub}
              </span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">{card.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
