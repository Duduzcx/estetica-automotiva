import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hojeLocal } from '../../lib/datas';
import { CheckCircle2, XCircle, Clock, MessageCircle, Car, Loader2, Archive, Inbox } from 'lucide-react';
import type { Agendamento } from '../../lib/supabase';
import { formatBRL } from '../../lib/servicos';

interface Props {
  agendamentos: Agendamento[];
  loading: boolean;
  updateStatus: (id: string, status: Agendamento['status']) => void;
}

const foneParaWa = (fone: string) => {
  const digits = fone.replace(/\D/g, '');
  return digits.startsWith('55') ? digits : '55' + digits;
};

const fmtData = (a: Agendamento) => {
  const hoje = hojeLocal();
  const dia = a.data === hoje ? 'Hoje' : a.data.split('-').reverse().slice(0, 2).join('/');
  return `${dia}, ${a.horario}`;
};

// Dias corridos entre a data do agendamento e hoje
const diasDesde = (data: string) => {
  const hoje = new Date(hojeLocal() + 'T00:00:00');
  const alvo = new Date(data + 'T00:00:00');
  return Math.floor((hoje.getTime() - alvo.getTime()) / 86400000);
};

export function OrderManagement({ agendamentos, loading, updateStatus }: Props) {
  const [aba, setAba] = useState<'ativos' | 'historico'>('ativos');

  const abrirWhats = (a: Agendamento, mensagem: string) => {
    const url = `https://wa.me/${foneParaWa(a.whatsapp)}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const aprovar = (a: Agendamento) => {
    updateStatus(a.id, 'confirmado');
    abrirWhats(a, [
      `Olá, ${a.nome}! ❄️🚗`,
      ``,
      `✅ *SEU AGENDAMENTO ESTÁ CONFIRMADO!*`,
      ``,
      `🧽 *Serviço:* ${a.servico}`,
      `💰 *Valor:* ${formatBRL(a.preco)}`,
      `📅 *Data:* ${fmtData(a)}`,
      `📍 *Endereço:* Rua Delta, 537 - Jaguari, Santana de Parnaíba`,
      ``,
      `Sua nave vai sair daqui impecável! ✨`,
      ``,
      `_Equipe Neve na Nave_ ☃️💙`,
    ].join('\n'));
  };

  const recusar = (a: Agendamento) => {
    updateStatus(a.id, 'recusado');
    abrirWhats(a, [
      `Olá, ${a.nome}! ❄️`,
      ``,
      `Poxa, infelizmente *não temos disponibilidade* para *${fmtData(a)}*. 😔`,
      ``,
      `Mas queremos muito cuidar da sua nave! 🚗💙`,
      `Me fala outro dia e horário que fica bom pra você, que a gente encaixa. 🗓️`,
      ``,
      `_Equipe Neve na Nave_ ☃️`,
    ].join('\n'));
  };

  const chamar = (a: Agendamento) => {
    abrirWhats(a, `Olá, ${a.nome}! ❄️ Aqui é da *Neve na Nave*, sobre seu agendamento de *${a.servico}*. 🚗✨`);
  };

  // Agendamentos já decididos (confirmado/recusado) com mais de 3 dias vão
  // pra "pasta" de Histórico, pra não lotar a lista principal do dia a dia
  const historico = agendamentos.filter(a => a.status !== 'pendente' && diasDesde(a.data) > 3);
  const ativos = agendamentos.filter(a => !historico.includes(a));
  const listaExibida = aba === 'ativos' ? ativos : historico;

  return (
    <div className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl h-full">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Clock className="w-5 h-5 mr-3 text-neve-blue" /> Agendamentos
        </h3>
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
          <button
            onClick={() => setAba('ativos')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${aba === 'ativos' ? 'bg-neve-blue text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Inbox className="w-3.5 h-3.5" /> Ativos
          </button>
          <button
            onClick={() => setAba('historico')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${aba === 'historico' ? 'bg-neve-blue text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Archive className="w-3.5 h-3.5" /> Histórico {historico.length > 0 && `(${historico.length})`}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-3" /> Carregando pedidos...
        </div>
      ) : listaExibida.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          {aba === 'ativos'
            ? 'Nenhum agendamento ativo. Assim que um cliente preencher o formulário do site, ele aparece aqui na hora.'
            : 'Nenhum agendamento no histórico ainda. Pedidos aprovados ou recusados há mais de 3 dias caem aqui.'}
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {listaExibida.map((a) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className={`p-5 rounded-xl border overflow-hidden transition-all ${
                  a.status === 'pendente' ? 'border-yellow-500/30 bg-yellow-500/5' :
                  a.status === 'confirmado' ? 'border-green-500/30 bg-green-500/5' :
                  'border-red-500/30 bg-red-500/5'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="font-bold text-white text-lg">{a.nome}</h4>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
                        a.status === 'pendente' ? 'bg-yellow-500/15 text-yellow-400' :
                        a.status === 'confirmado' ? 'bg-green-500/15 text-green-400' :
                        'bg-red-500/15 text-red-400'
                      }`}>{a.status}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 flex items-center gap-1.5 flex-wrap">
                      <Car className="w-4 h-4 shrink-0" /> {a.veiculo}
                      {(a as any).carroceria && (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                          {(a as any).carroceria}
                        </span>
                      )}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="text-white font-semibold">{a.servico}</span>
                      <span className="text-neve-blue font-bold ml-3">{formatBRL(a.preco)}</span>
                      <span className="text-gray-400 ml-3">{fmtData(a)}</span>
                    </p>
                  </div>

                  <div className={`grid gap-2 w-full md:flex md:w-auto ${a.status === 'pendente' ? 'grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]' : 'grid-cols-[auto_minmax(0,1fr)]'}`}>
                    <button onClick={() => chamar(a)} title="Chamar no WhatsApp"
                      className="shrink-0 p-3 rounded-xl bg-white/5 text-gray-300 hover:bg-[#25D366] hover:text-white transition-all">
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    {aba === 'ativos' && a.status !== 'confirmado' && (
                      <button onClick={() => aprovar(a)}
                        className="w-full md:w-auto flex items-center justify-center px-2 md:px-4 py-3 rounded-xl bg-green-500/15 text-green-400 hover:bg-green-500 hover:text-white font-bold text-sm transition-all">
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Aprovar
                      </button>
                    )}
                    {aba === 'ativos' && a.status !== 'recusado' && (
                      <button onClick={() => recusar(a)}
                        className="w-full md:w-auto flex items-center justify-center px-2 md:px-4 py-3 rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white font-bold text-sm transition-all">
                        <XCircle className="w-4 h-4 mr-1.5" /> Recusar
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
