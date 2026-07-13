import { useEffect, useState } from 'react';
import { Settings, Save, CheckCircle2, Volume2, Bell, BellOff, BellRing, Loader2 } from 'lucide-react';
import { ativarNotificacoes, desativarNotificacoes, pushSuportado, statusInscricao } from '../../lib/push';

const CONFIG_KEY = 'nn_config_painel';

interface ConfigPainel {
  nomeNegocio: string;
  whatsappContato: string;
  endereco: string;
  horarioFuncionamento: string;
  somNovoAgendamento: boolean;
}

const PADRAO: ConfigPainel = {
  nomeNegocio: 'Neve na Nave',
  whatsappContato: '11950467014',
  endereco: 'Rua Delta, 537 - Jaguari, Santana de Parnaíba',
  horarioFuncionamento: 'Seg a Sáb, 8h às 18h',
  somNovoAgendamento: true,
};

const lerConfig = (): ConfigPainel => {
  try {
    const salvo = localStorage.getItem(CONFIG_KEY);
    return salvo ? { ...PADRAO, ...JSON.parse(salvo) } : PADRAO;
  } catch {
    return PADRAO;
  }
};

export function Configuracoes() {
  const [config, setConfig] = useState<ConfigPainel>(lerConfig);
  const [salvo, setSalvo] = useState(false);
  const [notifStatus, setNotifStatus] = useState<'ativo' | 'inativo' | 'negado' | 'carregando'>('carregando');
  const [notifErro, setNotifErro] = useState('');

  useEffect(() => {
    if (!salvo) return;
    const t = setTimeout(() => setSalvo(false), 2500);
    return () => clearTimeout(t);
  }, [salvo]);

  useEffect(() => {
    statusInscricao().then(setNotifStatus);
  }, []);

  const campo = (chave: keyof ConfigPainel) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, [chave]: e.target.value }));
  };

  const salvar = () => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    setSalvo(true);
  };

  const alternarNotificacoes = async () => {
    setNotifErro('');
    setNotifStatus('carregando');
    if (notifStatus === 'ativo') {
      await desativarNotificacoes();
      setNotifStatus('inativo');
      return;
    }
    const { ok, erro } = await ativarNotificacoes();
    if (!ok) { setNotifErro(erro || 'Não foi possível ativar.'); setNotifStatus(await statusInscricao()); return; }
    setNotifStatus('ativo');
  };

  return (
    <div className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl max-w-2xl">
      <h3 className="text-xl font-bold mb-6 text-white flex items-center">
        <Settings className="w-5 h-5 mr-3 text-neve-blue" /> Configurações
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Nome do negócio</label>
          <input
            value={config.nomeNegocio}
            onChange={campo('nomeNegocio')}
            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">WhatsApp de contato</label>
          <input
            value={config.whatsappContato}
            onChange={campo('whatsappContato')}
            placeholder="Só números, com DDD"
            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Endereço</label>
          <input
            value={config.endereco}
            onChange={campo('endereco')}
            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Horário de funcionamento</label>
          <input
            value={config.horarioFuncionamento}
            onChange={campo('horarioFuncionamento')}
            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors"
          />
        </div>

        <label className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer">
          <span className="flex items-center gap-3 text-white font-medium text-sm">
            <Volume2 className="w-5 h-5 text-neve-blue" /> Alerta sonoro para novo agendamento
          </span>
          <input
            type="checkbox"
            checked={config.somNovoAgendamento}
            onChange={e => setConfig(prev => ({ ...prev, somNovoAgendamento: e.target.checked }))}
            className="w-5 h-5 accent-neve-blue"
          />
        </label>

        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="flex items-center gap-3 text-white font-medium text-sm">
              {notifStatus === 'ativo' ? <BellRing className="w-5 h-5 text-neve-blue" /> : <Bell className="w-5 h-5 text-neve-blue" />}
              Notificação neste aparelho (painel fechado ou aberto)
            </span>
            {!pushSuportado() ? (
              <span className="text-gray-500 text-xs font-semibold">Não suportado neste navegador</span>
            ) : notifStatus === 'negado' ? (
              <span className="text-red-400 text-xs font-semibold">Bloqueada nas permissões do navegador</span>
            ) : (
              <button
                onClick={alternarNotificacoes}
                disabled={notifStatus === 'carregando'}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  notifStatus === 'ativo'
                    ? 'bg-white/10 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
                    : 'bg-neve-blue text-white hover:bg-blue-600'
                }`}
              >
                {notifStatus === 'carregando' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : notifStatus === 'ativo' ? (
                  <><BellOff className="w-4 h-4" /> Desativar</>
                ) : (
                  <><Bell className="w-4 h-4" /> Ativar</>
                )}
              </button>
            )}
          </div>
          {notifErro && <p className="text-red-400 text-xs mt-3">{notifErro}</p>}
          <p className="text-gray-500 text-xs mt-3">
            Ative em cada aparelho/navegador que deve receber o aviso de novo agendamento.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={salvar}
            className="flex items-center justify-center px-6 py-3 rounded-xl bg-neve-blue text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(30,144,255,0.3)]"
          >
            <Save className="w-4 h-4 mr-2" /> Salvar alterações
          </button>
          {salvo && (
            <span className="flex items-center gap-1.5 text-green-400 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" /> Salvo neste aparelho
            </span>
          )}
        </div>
        <p className="text-gray-500 text-xs">
          Essas configurações ficam salvas neste navegador/aparelho, ainda não sincronizam entre dispositivos.
        </p>
      </div>
    </div>
  );
}
