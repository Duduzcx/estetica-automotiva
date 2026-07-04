import { useEffect, useState } from 'react';
import { hojeLocal } from '../../lib/datas';
import { CalendarDays, Plus, X, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DiaFechado { data: string; motivo: string | null; }

export function AgendaControl() {
  const [dias, setDias] = useState<DiaFechado[]>([]);
  const [novaData, setNovaData] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const hoje = hojeLocal();

  const carregar = async () => {
    if (!supabase) { setCarregando(false); return; }
    const { data, error } = await supabase
      .from('dias_fechados')
      .select('*')
      .gte('data', hoje)
      .order('data');
    if (error) setErro('Tabela da agenda ainda não criada no banco.');
    else setDias((data as DiaFechado[]) || []);
    setCarregando(false);
  };

  useEffect(() => { carregar(); }, []);

  const fecharDia = async () => {
    if (!novaData || !supabase) return;
    setSalvando(true);
    const { error } = await supabase.from('dias_fechados').insert({ data: novaData, motivo: 'Fechado' });
    if (!error) { setNovaData(''); await carregar(); }
    setSalvando(false);
  };

  const reabrirDia = async (data: string) => {
    if (!supabase) return;
    setDias(prev => prev.filter(d => d.data !== data));
    await supabase.from('dias_fechados').delete().eq('data', data);
  };

  const fmt = (d: string) => {
    const [y, m, dd] = d.split('-');
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return `${dias[new Date(`${d}T12:00:00`).getDay()]}, ${dd}/${m}/${y.slice(2)}`;
  };

  return (
    <div className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl mt-6">
      <h3 className="text-xl font-bold mb-2 text-white flex items-center">
        <CalendarDays className="w-5 h-5 mr-3 text-neve-blue" /> Controle da Agenda
      </h3>
      <p className="text-gray-500 text-sm mb-5">Feche a loja em dias específicos — o cliente verá a data como indisponível no site.</p>

      <div className="flex gap-2 mb-5">
        <input
          type="date"
          min={hoje}
          value={novaData}
          onChange={e => setNovaData(e.target.value)}
          className="flex-1 min-w-0 bg-black/40 border border-white/10 text-white rounded-xl py-3 px-3 focus:outline-none focus:border-neve-blue text-sm"
        />
        <button
          onClick={fecharDia}
          disabled={!novaData || salvando}
          className="shrink-0 flex items-center gap-1.5 bg-neve-blue hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-sm px-4 rounded-xl transition-colors"
        >
          {salvando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Fechar dia
        </button>
      </div>

      {carregando ? (
        <p className="text-gray-500 text-sm">Carregando...</p>
      ) : erro ? (
        <p className="text-yellow-400/80 text-sm">{erro}</p>
      ) : dias.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhum dia fechado por enquanto — agenda toda aberta. 🎉</p>
      ) : (
        <div className="space-y-2">
          {dias.map(d => (
            <div key={d.data} className="flex items-center justify-between bg-black/30 border border-white/5 rounded-xl px-4 py-3">
              <span className="text-white font-semibold text-sm">🔒 {fmt(d.data)}</span>
              <button
                onClick={() => reabrirDia(d.data)}
                title="Reabrir este dia"
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
