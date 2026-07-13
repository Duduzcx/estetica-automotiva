import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Hourglass, XCircle } from 'lucide-react';
import type { Agendamento } from '../../lib/supabase';
import { formatBRL } from '../../lib/servicos';

interface Props { agendamentos: Agendamento[]; }

export function Financeiro({ agendamentos }: Props) {
  const { faturamento, potencial, perdido, ticketMedio, porMes } = useMemo(() => {
    const confirmados = agendamentos.filter(a => a.status === 'confirmado');
    const pendentes = agendamentos.filter(a => a.status === 'pendente');
    const recusados = agendamentos.filter(a => a.status === 'recusado');

    const faturamento = confirmados.reduce((acc, a) => acc + Number(a.preco || 0), 0);
    const potencial = pendentes.reduce((acc, a) => acc + Number(a.preco || 0), 0);
    const perdido = recusados.reduce((acc, a) => acc + Number(a.preco || 0), 0);
    const ticketMedio = confirmados.length ? faturamento / confirmados.length : 0;

    const meses = new Map<string, number>();
    confirmados.forEach(a => {
      const mes = a.data?.slice(0, 7); // YYYY-MM
      if (!mes) return;
      meses.set(mes, (meses.get(mes) || 0) + Number(a.preco || 0));
    });
    const porMes = [...meses.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(-6);

    return { faturamento, potencial, perdido, ticketMedio, porMes };
  }, [agendamentos]);

  const maxMes = Math.max(1, ...porMes.map(([, v]) => v));
  const nomeMes = (ym: string) => {
    const [ano, mes] = ym.split('-');
    const label = new Date(Number(ano), Number(mes) - 1, 1).toLocaleDateString('pt-BR', { month: 'short' });
    return label.replace('.', '');
  };

  const cards = [
    { title: 'Faturamento (confirmado)', value: formatBRL(faturamento), icon: <DollarSign className="w-7 h-7 text-green-500" />, color: 'text-green-400', bg: 'bg-green-400/10' },
    { title: 'Ticket médio', value: formatBRL(ticketMedio), icon: <TrendingUp className="w-7 h-7 text-blue-500" />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Receita potencial (pendente)', value: formatBRL(potencial), icon: <Hourglass className="w-7 h-7 text-yellow-500" />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { title: 'Receita perdida (recusado)', value: formatBRL(perdido), icon: <XCircle className="w-7 h-7 text-red-500" />, color: 'text-red-400', bg: 'bg-red-400/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-neve-dark/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white/5 p-3 rounded-xl">{card.icon}</div>
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
            <h3 className={`text-2xl font-bold ${card.color}`}>{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-6 text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-3 text-neve-blue" /> Faturamento por mês
        </h3>
        {porMes.length === 0 ? (
          <p className="text-gray-500 text-sm py-8 text-center">Sem agendamentos confirmados ainda.</p>
        ) : (
          <div className="flex items-end gap-4 h-48">
            {porMes.map(([mes, valor]) => (
              <div key={mes} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-xs text-gray-300 font-bold mb-2">{formatBRL(valor)}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(4, (valor / maxMes) * 100)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="w-full bg-gradient-to-t from-neve-blue to-neve-blue/40 rounded-t-lg"
                />
                <span className="text-[11px] uppercase text-gray-500 font-bold mt-2">{nomeMes(mes)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
