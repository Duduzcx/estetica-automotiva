import { BarChart3 } from 'lucide-react';
import { mesAtualLocal } from '../../lib/datas';
import { motion } from 'framer-motion';
import type { Agendamento } from '../../lib/supabase';

interface Props { agendamentos: Agendamento[]; }

const CORES = ['bg-neve-blue', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];

export function TopServicesChart({ agendamentos }: Props) {
  const mesAtual = mesAtualLocal();
  const base = agendamentos.filter(a => a.data?.startsWith(mesAtual) && a.status !== 'recusado');

  const contagem = new Map<string, number>();
  let total = 0;
  base.forEach(a => {
    a.servico.split(' + ').forEach(nome => {
      contagem.set(nome, (contagem.get(nome) || 0) + 1);
      total += 1;
    });
  });

  const services = [...contagem.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, qtd], i) => ({
      name,
      qtd,
      percentage: total ? Math.round((qtd / total) * 100) : 0,
      color: CORES[i % CORES.length],
    }));

  return (
    <div className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl h-full">
      <h3 className="text-xl font-bold mb-6 text-white flex items-center">
        <BarChart3 className="w-5 h-5 mr-3 text-neve-blue" /> Serviços do Mês
      </h3>
      {services.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center">Sem dados neste mês ainda.</p>
      ) : (
        <div className="space-y-6">
          {services.map((service, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300 font-medium">{service.name} <span className="text-gray-500">({service.qtd})</span></span>
                <span className="text-white font-bold">{service.percentage}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${service.percentage}%` }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                  className={`h-2.5 rounded-full ${service.color}`}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
