import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, Clock, Car, Shield, CheckCircle2, ChevronRight, ChevronLeft, Loader2, Sparkles, Droplets, X, CalendarCheck2 } from 'lucide-react';
import { SERVICOS, formatBRL, type ServicoId } from '../../lib/servicos';
import { supabase } from '../../lib/supabase';

const ICONES: Record<ServicoId, React.ReactNode> = {
  vitrificacao: <Shield className="w-6 h-6" />,
  polimento: <Sparkles className="w-6 h-6" />,
  higienizacao: <Car className="w-6 h-6" />,
  lavagem: <Droplets className="w-6 h-6" />,
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sending, setSending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sendError, setSendError] = useState('');

  // Horário de funcionamento: 8h às 18h (de hora em hora)
  // Página travada enquanto o card está aberto
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const fecharModal = () => {
    setModalOpen(false);
    if (step === 4) resetForm();
    setSendError('');
  };

  const timeSlotsConfig = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const todayDateStr = new Date().toISOString().split('T')[0];

  const toggleService = (id: ServicoId) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const precoTotal = selectedServices.reduce((acc, id) => acc + SERVICOS[id].preco, 0);
  const nomesServicos = selectedServices.map(id => SERVICOS[id].nome).join(' + ');

  // Consulta horários ocupados e dias fechados no banco
  useEffect(() => {
    if (!selectedDate || !supabase) return;
    let ativo = true;
    setLoadingSlots(true);
    (async () => {
      const [ags, fech] = await Promise.all([
        supabase.from('agendamentos').select('horario').eq('data', selectedDate).in('status', ['pendente', 'confirmado']),
        supabase.from('dias_fechados').select('data').eq('data', selectedDate),
      ]);
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
      servico: nomesServicos,
      preco: precoTotal,
      data: selectedDate,
      horario: selectedTime,
      status: 'pendente',
    };

    if (supabase) {
      const { error } = await supabase.from('agendamentos').insert(registro);
      if (error) {
        setSending(false);
        if (error.code === '23505') {
          // Outro cliente reservou este horário segundos atrás (trava do banco)
          setOcupados(prev => [...prev, selectedTime]);
          setSelectedTime('');
          setSendError('⏰ Poxa, esse horário acabou de ser reservado por outro cliente! Escolha outro horário, por favor.');
          goToStep(2);
        } else {
          setSendError('Não foi possível enviar. Tente novamente ou chame no WhatsApp.');
        }
        return;
      }
    }
    setSending(false);
    goToStep(4);
  };

  const handleNext = () => {
    if (step === 3) { handleSubmit(); return; }
    if (step < 4) goToStep(step + 1);
  };
  const handlePrev = () => { if (step > 1) goToStep(step - 1); };

  const resetForm = () => {
    setSelectedServices([]); setSelectedDate(''); setSelectedTime('');
    setNome(''); setWhatsapp(''); setVeiculo('');
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
      <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} className="flex items-center justify-center p-3 md:p-6">
        {/* Fundo travado */}
        <div onClick={fecharModal} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)' }} />

        {/* Card do agendamento */}
        <div className="relative w-full max-w-2xl max-h-[92dvh] overflow-y-auto overscroll-contain bg-[#0b1320] border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl">
          <button
            onClick={fecharModal}
            aria-label="Fechar"
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

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
                        <p className="text-gray-500 text-xs md:text-sm flex items-center"><Clock className="w-3.5 h-3.5 mr-1 shrink-0" /> {SERVICOS[id].tempo}</p>
                      </div>
                      <span className={`shrink-0 text-sm md:text-base font-bold ${ativo ? 'text-neve-blue' : 'text-gray-400'}`}>
                        {formatBRL(SERVICOS[id].preco)}
                      </span>
                    </div>
                  );})}
                </div>
                {selectedServices.length > 0 && (
                  <div className="mt-5 text-center md:text-right text-sm text-gray-300">
                    {selectedServices.length} serviço{selectedServices.length > 1 ? 's' : ''} • Total: <span className="text-neve-blue font-bold text-base">{formatBRL(precoTotal)}</span>
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
                    <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} type="tel" placeholder="(11) 99999-9999" className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Modelo do Veículo</label>
                    <input value={veiculo} onChange={e => setVeiculo(e.target.value)} type="text" placeholder="Ex: Honda Civic Preto 2022" className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors" />
                  </div>
                </div>

                {/* Resumo do pedido */}
                {selectedServices.length > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-neve-blue/5 border border-neve-blue/20 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    <span className="text-gray-300"><b className="text-white">{nomesServicos}</b></span>
                    <span className="text-gray-400">{dataFormatada} às {selectedTime}</span>
                    <span className="text-neve-blue font-bold">{formatBRL(precoTotal)}</span>
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
                  (step === 3 && (!nome.trim() || whatsapp.replace(/\D/g, '').length < 10 || !veiculo.trim()))
                }
                className="flex items-center justify-center bg-neve-blue text-white px-5 md:px-8 py-4 rounded-xl font-bold text-sm md:text-base whitespace-nowrap hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(30,144,255,0.3)] hover:shadow-[0_0_30px_rgba(30,144,255,0.5)]"
              >
                {sending ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...</>) : step === 3 ? (<>Confirmar <CheckCircle2 className="w-5 h-5 ml-2" /></>) : (<>Avançar <ChevronRight className="w-5 h-5 ml-2" /></>)}
              </button>
            </div>
          )}

        </div>
      </div>,
      document.body
    )}
    </>
  );
}
