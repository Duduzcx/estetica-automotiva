import { useMemo, useState } from 'react';
import { Users, Search, MessageCircle, Car } from 'lucide-react';
import type { Agendamento } from '../../lib/supabase';
import { formatBRL } from '../../lib/servicos';

interface Props { agendamentos: Agendamento[]; }

interface Cliente {
  whatsapp: string;
  nome: string;
  veiculos: string[];
  totalAgendamentos: number;
  totalGasto: number;
  ultimoAgendamento: string;
}

const foneParaWa = (fone: string) => {
  const digits = fone.replace(/\D/g, '');
  return digits.startsWith('55') ? digits : '55' + digits;
};

export function Clientes({ agendamentos }: Props) {
  const [busca, setBusca] = useState('');

  const clientes = useMemo(() => {
    const porWhats = new Map<string, Cliente>();
    // Mais recentes primeiro, pra "nome"/"último agendamento" ficarem atualizados
    [...agendamentos]
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
      .forEach(a => {
        const key = a.whatsapp || a.nome;
        const atual = porWhats.get(key);
        if (atual) {
          atual.totalAgendamentos += 1;
          if (a.status === 'confirmado') atual.totalGasto += Number(a.preco || 0);
          if (!atual.veiculos.includes(a.veiculo)) atual.veiculos.push(a.veiculo);
        } else {
          porWhats.set(key, {
            whatsapp: a.whatsapp,
            nome: a.nome,
            veiculos: [a.veiculo],
            totalAgendamentos: 1,
            totalGasto: a.status === 'confirmado' ? Number(a.preco || 0) : 0,
            ultimoAgendamento: a.data,
          });
        }
      });
    return [...porWhats.values()].sort((a, b) => b.totalAgendamentos - a.totalAgendamentos);
  }, [agendamentos]);

  const filtrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.whatsapp.includes(busca) ||
    c.veiculos.some(v => v.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <div className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Users className="w-5 h-5 mr-3 text-neve-blue" /> Clientes ({clientes.length})
        </h3>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar nome, WhatsApp ou carro..."
            className="bg-black/40 border border-white/10 text-white text-sm rounded-xl py-2.5 pl-9 pr-4 w-full sm:w-72 focus:outline-none focus:border-neve-blue transition-colors"
          />
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-gray-500 text-sm py-16 text-center">
          {clientes.length === 0 ? 'Nenhum cliente ainda. Assim que o primeiro agendamento chegar, ele aparece aqui.' : 'Nenhum cliente encontrado com essa busca.'}
        </p>
      ) : (
        <div className="space-y-3">
          {filtrados.map(c => (
            <div key={c.whatsapp} className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-white">{c.nome}</h4>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-neve-blue/15 text-neve-blue">
                    {c.totalAgendamentos} agendamento{c.totalAgendamentos > 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1 flex items-center gap-1.5 flex-wrap">
                  <Car className="w-4 h-4 shrink-0" /> {c.veiculos.join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-gray-500 text-xs">Total gasto</p>
                  <p className="text-green-400 font-bold">{formatBRL(c.totalGasto)}</p>
                </div>
                <a
                  href={`https://wa.me/${foneParaWa(c.whatsapp)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 p-3 rounded-xl bg-white/5 text-gray-300 hover:bg-[#25D366] hover:text-white transition-all"
                  title="Chamar no WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
