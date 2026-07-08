import { useState, useEffect, useMemo } from 'react';
import { hojeLocal } from '../../lib/datas';
import { createPortal } from 'react-dom';
import { Calendar, Car, Shield, CheckCircle2, ChevronRight, ChevronLeft, Loader2, Sparkles, Droplets, X, CalendarCheck2, Layers, Lightbulb, Settings, Disc, BadgeCheck, Bike, Truck } from 'lucide-react';
import { SERVICOS, formatBRL, precoLabel, type ServicoId } from '../../lib/servicos';
import { supabase } from '../../lib/supabase';
import { useCarrosCatalogo } from '../../hooks/useCarrosCatalogo';

const CARRO_STORAGE_KEY = 'nn_ultimo_carro';
const OUTRO = '__outro__';

type Carroceria = 'hatch' | 'sedan' | 'suv' | 'caminhonete';

// Multiplicador de preço por porte do carro (o dono usa isso pra cobrar mais
// de um SUV/caminhonete do que de um hatch, já que dá mais trabalho)
const MULTIPLICADOR_CARROCERIA: Record<Carroceria, number> = {
  hatch: 1,
  sedan: 1.1,
  suv: 1.25,
  caminhonete: 1.4,
};

const CARROCERIAS: { valor: Carroceria; label: string }[] = [
  { valor: 'hatch', label: 'Hatch' },
  { valor: 'sedan', label: 'Sedan' },
  { valor: 'suv', label: 'SUV' },
  { valor: 'caminhonete', label: 'Caminhonete' },
];

const ICONES: Record<ServicoId, React.ReactNode> = {
  polimento_tecnico: <Sparkles className="w-6 h-6" />,
  polimento_comercial: <Sparkles className="w-6 h-6" />,
  restauracao_farois: <Lightbulb className="w-6 h-6" />,
  higienizacao: <Car className="w-6 h-6" />,
  descont_vidros: <Droplets className="w-6 h-6" />,
  descont_pintura: <Layers className="w-6 h-6" />,
  cristalizacao: <Shield className="w-6 h-6" />,
  limpeza_motor: <Settings className="w-6 h-6" />,
  revit_plasticos: <Disc className="w-6 h-6" />,
  coating: <Shield className="w-6 h-6" />,
  planos: <Sparkles className="w-6 h-6" />,
  lavagem_detalhada: <Droplets className="w-6 h-6" />,
  lavagem_entrada: <Droplets className="w-6 h-6" />,
};

export function Scheduling() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServicoId[]>([]);
  const [ocupados, setOcupados] = useState<string[]>([]);
  const [diaFechado, setDiaFechado] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [tentouAvancarStep3, setTentouAvancarStep3] = useState(false);
  const whatsappDigits = whatsapp.replace(/\D/g, '');
  const whatsappInvalido = whatsappDigits.length !== 11;
  const [carroTipo, setCarroTipo] = useState<'carro' | 'moto' | 'caminhao'>('carro');
  const [carroceria, setCarroceria] = useState<Carroceria | ''>('');
  const [carroMarca, setCarroMarca] = useState('');
  const [carroModelo, setCarroModelo] = useState('');
  const [carroAno, setCarroAno] = useState('');
  const [veiculoOutro, setVeiculoOutro] = useState('');
  const [lembrarCarro, setLembrarCarro] = useState(true);
  const [carroCarregadoDoStorage, setCarroCarregadoDoStorage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sending, setSending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sendError, setSendError] = useState('');

  // Página travada enquanto o card está aberto
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  // Botão fixo flutuante: abre o card de agendamento direto, sem enrolação
  useEffect(() => {
    const abrir = () => setModalOpen(true);
    window.addEventListener('abrir-agendamento', abrir);
    return () => window.removeEventListener('abrir-agendamento', abrir);
  }, []);

  const { marcasPorTipo, modelosPorMarca } = useCarrosCatalogo();

  // Pré-preenche com o último carro salvo pelo cliente neste aparelho
  useEffect(() => {
    if (carroCarregadoDoStorage) return;
    try {
      const salvo = localStorage.getItem(CARRO_STORAGE_KEY);
      if (salvo) {
        const { tipo, marca, modelo, ano } = JSON.parse(salvo);
        if (tipo) setCarroTipo(tipo);
        if (marca === OUTRO) {
          setCarroMarca(OUTRO);
          setVeiculoOutro(modelo || '');
        } else if (marca && modelo) {
          setCarroMarca(marca);
          setCarroModelo(modelo);
          setCarroAno(ano ? String(ano) : '');
        }
      }
    } catch { /* ignora storage corrompido */ }
    setCarroCarregadoDoStorage(true);
  }, [carroCarregadoDoStorage]);

  const marcasDisponiveis = marcasPorTipo(carroTipo);
  const modelosDisponiveis = carroMarca && carroMarca !== OUTRO ? modelosPorMarca(carroTipo, carroMarca) : [];
  const modeloSelecionado = modelosDisponiveis.find(m => m.modelo === carroModelo);
  const anosDisponiveis = useMemo(() => {
    if (!modeloSelecionado) return [];
    const { ano_min, ano_max } = modeloSelecionado;
    const anos: number[] = [];
    for (let a = ano_max; a >= ano_min; a--) anos.push(a);
    return anos;
  }, [modeloSelecionado]);

  // Monta o texto final do veículo (usado no registro e no WhatsApp)
  useEffect(() => {
    if (carroMarca === OUTRO) {
      setVeiculo(veiculoOutro.trim());
    } else if (carroMarca && carroModelo && carroAno) {
      setVeiculo(`${carroMarca} ${carroModelo} ${carroAno}`);
    } else {
      setVeiculo('');
    }
  }, [carroMarca, carroModelo, carroAno, veiculoOutro]);

  const fecharModal = () => {
    setModalOpen(false);
    if (step === 4) resetForm();
    setSendError('');
  };

  const timeSlotsConfig = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const todayDateStr = hojeLocal();

  const toggleService = (id: ServicoId) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const precoBase = selectedServices.reduce((acc, id) => acc + SERVICOS[id].preco, 0);
  // Só carro tem carroceria selecionável; moto/caminhão não usam esse multiplicador aqui
  const multiplicadorCarroceria = carroTipo === 'carro' && carroceria ? MULTIPLICADOR_CARROCERIA[carroceria] : 1;
  const precoTotal = Math.round(precoBase * multiplicadorCarroceria);
  const temAPartirDe = selectedServices.some(id => (SERVICOS[id] as any).aPartirDe);
  const totalLabel = `${temAPartirDe ? 'a partir de ' : ''}${formatBRL(precoTotal)}`;
  const nomesServicos = selectedServices.map(id => SERVICOS[id].nome).join(' + ');

  // Consulta horários ocupados e dias fechados no banco
  useEffect(() => {
    if (!selectedDate || !supabase) return;
    let ativo = true;
    setLoadingSlots(true);
    (async () => {
      let [ags, fech] = await Promise.all([
        // View pública só com dia+horário (não expõe nome/telefone de ninguém)
        supabase.from('horarios_ocupados').select('horario').eq('data', selectedDate),
        supabase.from('dias_fechados').select('data').eq('data', selectedDate),
      ]);
      if (ags.error) {
        // Fallback enquanto a view não for criada no banco
        ags = await supabase.from('agendamentos').select('horario').eq('data', selectedDate).in('status', ['pendente', 'confirmado']) as any;
      }
      if (!ativo) return;
      setOcupados(ags.data ? ags.data.map((r: any) => r.horario) : []);
      setDiaFechado(!!(fech.data && fech.data.length > 0));
      setLoadingSlots(false);
    })();
    return () => { ativo = false; };
  }, [selectedDate]);

  const scrollToCardIfNeeded = () => {
    const el = document.getElementById('agendamento-card');
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < 0) {
      window.scrollTo({ top: window.scrollY + rect.top - 90, behavior: 'smooth' });
    }
  };

  const goToStep = (next: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(next);
      setIsTransitioning(false);
      scrollToCardIfNeeded();
    }, 150);
  };

  const handleSubmit = async () => {
    if (selectedServices.length === 0) return;
    setSending(true);
    setSendError('');
    const registro = {
      nome: nome.trim(),
      whatsapp: whatsapp.replace(/\D/g, ''),
      veiculo: veiculo.trim(),
      carro_marca: carroMarca === OUTRO ? null : carroMarca || null,
      carro_modelo: carroMarca === OUTRO ? null : carroModelo || null,
      carro_ano: carroMarca === OUTRO ? null : (carroAno ? Number(carroAno) : null),
      carro_tipo: carroTipo,
      carroceria: carroTipo === 'carro' ? (carroceria || null) : null,
      servico: nomesServicos,
      preco: precoTotal,
      data: selectedDate,
      horario: selectedTime,
      status: 'pendente',
    };

    if (supabase) {
      let { error } = await supabase.from('agendamentos').insert(registro);

      // Coluna carro_marca/carro_modelo/carro_ano ainda não existe no banco
      // (o script SQL do catálogo de carros não foi rodado ainda): tenta de
      // novo sem esses campos, pra não travar o agendamento do cliente
      if (error && (error.code === 'PGRST204' || /column .* does not exist/i.test(error.message || ''))) {
        const { carro_marca, carro_modelo, carro_ano, carro_tipo, carroceria: _carroceriaFallback, ...registroSemCarroEstruturado } = registro;
        ({ error } = await supabase.from('agendamentos').insert(registroSemCarroEstruturado));
      }

      if (error) {
        setSending(false);
        console.error('Erro ao salvar agendamento:', error);
        if (error.code === '23505') {
          // Outro cliente reservou este horário segundos atrás (trava do banco)
          setOcupados(prev => [...prev, selectedTime]);
          setSelectedTime('');
          setSendError('⏰ Poxa, esse horário acabou de ser reservado por outro cliente! Escolha outro horário, por favor.');
          goToStep(2);
        } else {
          const detalhe = error.message ? ` (${error.code || '?'}: ${error.message})` : '';
          setSendError(`Não foi possível enviar. Tente novamente ou chame no WhatsApp.${detalhe}`);
        }
        return;
      }
    }

    // Lembra o carro pra próxima visita, se o cliente autorizou
    try {
      if (lembrarCarro && veiculo.trim()) {
        localStorage.setItem(CARRO_STORAGE_KEY, JSON.stringify(
          carroMarca === OUTRO
            ? { tipo: carroTipo, marca: OUTRO, modelo: veiculoOutro.trim() }
            : { tipo: carroTipo, marca: carroMarca, modelo: carroModelo, ano: carroAno }
        ));
      } else {
        localStorage.removeItem(CARRO_STORAGE_KEY);
      }
    } catch { /* localStorage indisponível: sem problema, só não lembra */ }

    setSending(false);
    goToStep(4);
  };

  const handleNext = () => {
    if (step === 3) {
      setTentouAvancarStep3(true);
      if (whatsappInvalido || !nome.trim() || !veiculo.trim() || (carroTipo === 'carro' && !carroceria)) return;
      handleSubmit();
      return;
    }
    if (step < 4) goToStep(step + 1);
  };
  const handlePrev = () => { if (step > 1) goToStep(step - 1); };

  const resetForm = () => {
    setSelectedServices([]); setSelectedDate(''); setSelectedTime('');
    setNome(''); setWhatsapp(''); setVeiculo('');
    setCarroTipo('carro'); setCarroceria(''); setCarroMarca(''); setCarroModelo(''); setCarroAno(''); setVeiculoOutro('');
    setCarroCarregadoDoStorage(false);
    setTentouAvancarStep3(false);
    setStep(1);
  };

  const availableTimeSlots = selectedDate ? timeSlotsConfig.filter(t => !ocupados.includes(t)) : [];
  const dataFormatada = selectedDate ? selectedDate.split('-').reverse().join('/') : '';

  return (
    <>
    <section id="agendamento" className="py-16 md:py-24 bg-[#050505] relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <div className="mb-8">
          <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Reserva Exclusiva</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Agende sua Avaliação</h3>
          <p className="text-gray-400 max-w-xl mx-auto">Escolha os serviços, o dia e o horário — em menos de 1 minuto sua nave está na agenda.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-3 bg-neve-blue hover:bg-blue-600 text-white text-lg font-bold px-10 py-5 rounded-2xl shadow-[0_0_30px_rgba(30,144,255,0.35)] hover:shadow-[0_0_45px_rgba(30,144,255,0.55)] hover:-translate-y-1 transition-all"
        >
          <CalendarCheck2 className="w-6 h-6" /> Agendar Horário
        </button>
        <p className="text-gray-600 text-xs mt-4">Seg a Sáb • 8h às 18h • Rua Delta, 537 - Jaguari</p>
      </div>
    </section>

    {modalOpen && createPortal(
      <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} className="md:flex md:items-center md:justify-center md:p-6">
        {/* Fundo travado */}
        <div onClick={fecharModal} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)' }} />

        {/* Card: tela cheia no celular, janela centrada no desktop */}
        <div className="relative w-full h-[100dvh] md:h-auto md:max-h-[90dvh] md:max-w-2xl bg-[#0b1320] md:border md:border-white/10 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden">

          {/* Cabeçalho fixo do card */}
          <div className="shrink-0 flex items-center justify-between px-5 md:px-8 py-4 border-b border-white/10 bg-[#0b1320]">
            <div className="flex items-center gap-3">
              <img src="/logo-mark.png" alt="" className="h-8 w-auto" />
              <span className="text-white font-bold">Agendar Avaliação</span>
            </div>
            <button
              onClick={fecharModal}
              aria-label="Fechar"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Corpo rolável */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 md:p-8">

          {/* Progress Bar */}
          <div className="flex justify-between items-center mb-8 relative z-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold font-heading text-sm transition-colors duration-500 ${step >= i ? 'bg-neve-blue text-white shadow-[0_0_20px_rgba(30,144,255,0.4)]' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
                  {step > i ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" /> : i}
                </div>
                <span className={`text-[10px] md:text-xs uppercase tracking-wider mt-3 font-semibold transition-colors duration-500 ${step >= i ? 'text-neve-blue' : 'text-gray-600'} hidden md:block`}>
                  {i === 1 ? 'Serviço' : i === 2 ? 'Data' : i === 3 ? 'Dados' : 'Confirmação'}
                </span>
              </div>
            ))}
            <div className="absolute top-5 md:top-6 left-0 w-full h-[2px] bg-white/5 -z-10">
              <div className="h-full bg-neve-blue transition-all duration-700 ease-out" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            </div>
          </div>

          <div className={`transition-opacity duration-150 ease-in-out min-h-[300px] ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>

            {/* Step 1: Services */}
            {step === 1 && (
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 text-center md:text-left">Selecione os Serviços</h4>
                <p className="text-gray-500 text-sm mb-6 text-center md:text-left">Pode escolher mais de um! ✨</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(SERVICOS) as ServicoId[]).map((id) => {
                    const ativo = selectedServices.includes(id);
                    return (
                    <div
                      key={id}
                      onClick={() => toggleService(id)}
                      className={`p-4 md:p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                        ativo
                          ? 'border-neve-blue bg-neve-blue/10 shadow-[0_0_30px_rgba(30,144,255,0.15)]'
                          : 'border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${ativo ? 'bg-neve-blue text-white' : 'bg-white/5 text-gray-400'}`}>
                        {ativo ? <CheckCircle2 className="w-6 h-6" /> : ICONES[id]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-base md:text-lg font-bold text-white mb-0.5">{SERVICOS[id].nome}</h5>
                        <p className={`text-xs md:text-sm font-semibold ${ativo ? 'text-neve-blue' : 'text-gray-500'}`}>{precoLabel(id)}</p>
                      </div>
                    </div>
                  );})}
                </div>
                {selectedServices.length > 0 && (
                  <div className="mt-5 text-center md:text-right text-sm text-gray-300">
                    {selectedServices.length} serviço{selectedServices.length > 1 ? 's' : ''} • Total: <span className="text-neve-blue font-bold text-base">{totalLabel}</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div>
                <h4 className="text-2xl font-bold text-white mb-6 text-center md:text-left">Escolha o Melhor Momento</h4>
                {sendError && <p className="text-yellow-400/90 text-sm font-semibold mb-4 -mt-2">{sendError}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-3 uppercase tracking-wider">Data Desejada</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="date"
                        min={todayDateStr}
                        value={selectedDate}
                        onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
                        className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors appearance-none"
                      />
                    </div>
                    {!selectedDate && <p className="text-neve-blue text-xs mt-3">Selecione uma data para ver os horários disponíveis.</p>}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-3 uppercase tracking-wider">Horários Disponíveis</label>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedDate ? (
                        loadingSlots ? (
                          <div className="col-span-3 text-center py-4 text-gray-500 text-sm">Verificando disponibilidade...</div>
                        ) : diaFechado ? (
                          <div className="col-span-3 text-center py-4 text-yellow-400/90 text-sm font-semibold">😴 Estamos fechados nesta data. Escolha outro dia!</div>
                        ) : availableTimeSlots.length > 0 ? (
                          availableTimeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                                selectedTime === time
                                  ? 'bg-neve-blue border-neve-blue text-white'
                                  : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                              }`}
                            >
                              {time}
                            </button>
                          ))
                        ) : (
                          <div className="col-span-3 text-center py-4 text-gray-500 text-sm">Todos os horários desta data já foram reservados. 🙈</div>
                        )
                      ) : (
                        <div className="col-span-3 text-center py-4 text-gray-600 text-sm italic">Aguardando data...</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <div>
                <h4 className="text-2xl font-bold text-white mb-6 text-center md:text-left">Seus Dados e do Veículo</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Nome Completo</label>
                    <input value={nome} onChange={e => setNome(e.target.value)} type="text" placeholder="Ex: João Silva" className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">WhatsApp</label>
                    <input
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className={`w-full bg-black/40 border rounded-xl py-4 px-4 focus:outline-none focus:ring-1 transition-colors text-white ${
                        tentouAvancarStep3 && whatsappInvalido
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-white/10 focus:border-neve-blue focus:ring-neve-blue'
                      }`}
                    />
                    {tentouAvancarStep3 && whatsappInvalido && (
                      <p className="text-red-400 text-xs mt-2">
                        {whatsappDigits.length === 0
                          ? 'Digite seu número de WhatsApp com DDD.'
                          : `Número inválido (você digitou ${whatsappDigits.length} dígito${whatsappDigits.length === 1 ? '' : 's'}). O WhatsApp precisa de 11 dígitos: DDD + 9 + número. Ex: (11) 93769-6256.`}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Tipo de Veículo</label>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { valor: 'carro' as const, label: 'Carro', Icon: Car },
                        { valor: 'moto' as const, label: 'Moto', Icon: Bike },
                        { valor: 'caminhao' as const, label: 'Caminhão', Icon: Truck },
                      ]).map(({ valor, label, Icon }) => (
                        <button
                          type="button"
                          key={valor}
                          onClick={() => { setCarroTipo(valor); setCarroMarca(''); setCarroModelo(''); setCarroAno(''); if (valor !== 'carro') setCarroceria(''); }}
                          className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border text-sm font-bold transition-all ${
                            carroTipo === valor
                              ? 'border-neve-blue bg-neve-blue/10 text-neve-blue'
                              : 'border-white/10 text-gray-400 hover:border-white/20'
                          }`}
                        >
                          <Icon className="w-5 h-5" /> {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {carroTipo === 'carro' && (
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Carroceria</label>
                      <div className="grid grid-cols-4 gap-2">
                        {CARROCERIAS.map(({ valor, label }) => (
                          <button
                            type="button"
                            key={valor}
                            onClick={() => setCarroceria(valor)}
                            className={`py-3 px-1 rounded-xl border text-xs md:text-sm font-bold transition-all ${
                              carroceria === valor
                                ? 'border-neve-blue bg-neve-blue/10 text-neve-blue'
                                : 'border-white/10 text-gray-400 hover:border-white/20'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      {tentouAvancarStep3 && carroTipo === 'carro' && !carroceria && (
                        <p className="text-red-400 text-xs mt-2">Selecione a carroceria do carro.</p>
                      )}
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Marca</label>
                    <select
                      value={carroMarca}
                      onChange={e => { setCarroMarca(e.target.value); setCarroModelo(''); setCarroAno(''); }}
                      className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors"
                    >
                      <option value="" disabled>Selecione a marca</option>
                      {marcasDisponiveis.map(m => <option key={m} value={m}>{m}</option>)}
                      <option value={OUTRO}>Outra / não está na lista</option>
                    </select>
                  </div>

                  {carroMarca === OUTRO ? (
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Modelo do Veículo</label>
                      <input value={veiculoOutro} onChange={e => setVeiculoOutro(e.target.value)} type="text" placeholder="Ex: Honda Civic Preto 2022" className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors" />
                    </div>
                  ) : carroMarca ? (
                    <>
                      <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Modelo</label>
                        <select
                          value={carroModelo}
                          onChange={e => { setCarroModelo(e.target.value); setCarroAno(''); }}
                          className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors"
                        >
                          <option value="" disabled>Selecione o modelo</option>
                          {modelosDisponiveis.map(m => <option key={m.id} value={m.modelo}>{m.modelo}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Ano</label>
                        <select
                          value={carroAno}
                          onChange={e => setCarroAno(e.target.value)}
                          disabled={!carroModelo}
                          className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors disabled:opacity-40"
                        >
                          <option value="" disabled>{carroModelo ? 'Selecione o ano' : 'Escolha o modelo primeiro'}</option>
                          {anosDisponiveis.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>
                    </>
                  ) : null}

                  <div className="md:col-span-2 flex items-center gap-2 -mt-2">
                    <input
                      id="lembrar-carro"
                      type="checkbox"
                      checked={lembrarCarro}
                      onChange={e => setLembrarCarro(e.target.checked)}
                      className="w-4 h-4 accent-neve-blue"
                    />
                    <label htmlFor="lembrar-carro" className="text-gray-400 text-sm flex items-center gap-1.5 cursor-pointer">
                      <BadgeCheck className="w-4 h-4 text-neve-blue" /> Lembrar este carro para o próximo agendamento
                    </label>
                  </div>
                </div>

                {/* Resumo do pedido */}
                {selectedServices.length > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-neve-blue/5 border border-neve-blue/20 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    <span className="text-gray-300"><b className="text-white">{nomesServicos}</b></span>
                    <span className="text-gray-400">{dataFormatada} às {selectedTime}</span>
                    <span className="text-neve-blue font-bold">{totalLabel}</span>
                  </div>
                )}
                {sendError && <p className="text-red-400 text-sm mt-4">{sendError}</p>}
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="text-center py-10">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h4 className="text-3xl font-bold text-white mb-4">Solicitação Recebida!</h4>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                  Seu pedido já chegou no painel da Neve na Nave. Nossa equipe vai analisar e te confirmar pelo WhatsApp em breve!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={fecharModal}
                    className="bg-neve-blue hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
                  >
                    Concluir
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-colors"
                  >
                    Fazer Novo Agendamento
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
              <button
                onClick={handlePrev}
                className={`flex items-center shrink-0 px-4 md:px-6 py-4 rounded-xl font-bold transition-all whitespace-nowrap ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <ChevronLeft className="w-5 h-5 mr-1 md:mr-2" /> Voltar
              </button>

              <button
                onClick={handleNext}
                disabled={
                  sending ||
                  (step === 1 && selectedServices.length === 0) ||
                  (step === 2 && (!selectedDate || !selectedTime || diaFechado)) ||
                  (step === 3 && (!nome.trim() || whatsappInvalido || !veiculo.trim() || (carroTipo === 'carro' && !carroceria)))
                }
                className="flex items-center justify-center bg-neve-blue text-white px-5 md:px-8 py-4 rounded-xl font-bold text-sm md:text-base whitespace-nowrap hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(30,144,255,0.3)] hover:shadow-[0_0_30px_rgba(30,144,255,0.5)]"
              >
                {sending ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...</>) : step === 3 ? (<>Confirmar <CheckCircle2 className="w-5 h-5 ml-2" /></>) : (<>Avançar <ChevronRight className="w-5 h-5 ml-2" /></>)}
              </button>
            </div>
          )}

          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
