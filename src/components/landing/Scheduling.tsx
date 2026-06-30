import { useState } from 'react';
import { Calendar, Clock, Car, Shield, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export function Scheduling() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const services = [
    { id: 'vitrificacao', name: 'Vitrificação Cerâmica', icon: <Shield className="w-6 h-6" />, time: '2-3 dias' },
    { id: 'polimento', name: 'Polimento Técnico', icon: <Car className="w-6 h-6" />, time: '1-2 dias' },
    { id: 'higienizacao', name: 'Higienização Interna', icon: <CheckCircle2 className="w-6 h-6" />, time: '4-6 horas' },
    { id: 'lavagem', name: 'Lavagem Detalhada', icon: <Clock className="w-6 h-6" />, time: '2-3 horas' },
  ];

  const timeSlotsConfig = ["08:00", "09:00", "10:00", "11:30", "13:30", "15:00", "16:30", "18:00"];
  const todayDateStr = new Date().toISOString().split('T')[0];

  const handleNext = () => {
    if (step < 4) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };
  const handlePrev = () => {
    if (step > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(step - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const generateTimeSlots = (dateStr: string) => {
    const charSum = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return timeSlotsConfig.filter((_, index) => (charSum + index) % 3 !== 0);
  };

  const availableTimeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  return (
    <section id="agendamento" className="py-24 md:py-32 bg-[#050505] relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Reserva Exclusiva</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Agende sua Avaliação</h3>
        </div>

        <div className="bg-neve-dark/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="flex justify-between items-center mb-12 relative z-10">
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

          <div className={`transition-opacity duration-150 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Step 1: Services */}
            {step === 1 && (
              <div>
                <h4 className="text-2xl font-bold text-white mb-6 text-center md:text-left">Selecione o Serviço Principal</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((srv) => (
                    <div 
                      key={srv.id}
                      onClick={() => setSelectedService(srv.id)}
                      className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                        selectedService === srv.id 
                          ? 'border-neve-blue bg-neve-blue/10 shadow-[0_0_30px_rgba(30,144,255,0.15)]' 
                          : 'border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${selectedService === srv.id ? 'bg-neve-blue text-white' : 'bg-white/5 text-gray-400'}`}>
                        {srv.icon}
                      </div>
                      <h5 className="text-lg font-bold text-white mb-1">{srv.name}</h5>
                      <p className="text-gray-500 text-sm flex items-center"><Clock className="w-4 h-4 mr-1" /> Tempo médio: {srv.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div>
                <h4 className="text-2xl font-bold text-white mb-6 text-center md:text-left">Escolha o Melhor Momento</h4>
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
                        availableTimeSlots.length > 0 ? (
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
                          <div className="col-span-3 text-center py-4 text-gray-500 text-sm">Sem horários nesta data.</div>
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
                    <input type="text" placeholder="Ex: João Silva" className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">WhatsApp</label>
                    <input type="tel" placeholder="(11) 99999-9999" className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Modelo do Veículo</label>
                    <input type="text" placeholder="Ex: Porsche 911 Carrera S - Preto" className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 px-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors" />
                  </div>
                </div>
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
                  Nossa equipe de especialistas analisará sua solicitação e entrará em contato via WhatsApp em até 15 minutos para confirmar o agendamento.
                </p>
                <button 
                  onClick={() => setStep(1)}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-colors"
                >
                  Fazer Novo Agendamento
                </button>
              </div>
            )}

          </div>

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="mt-12 flex justify-between border-t border-white/10 pt-8">
              <button 
                onClick={handlePrev}
                className={`flex items-center px-6 py-4 rounded-xl font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" /> Voltar
              </button>
              
              <button 
                onClick={handleNext}
                disabled={
                  (step === 1 && !selectedService) || 
                  (step === 2 && (!selectedDate || !selectedTime))
                }
                className="flex items-center bg-neve-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(30,144,255,0.3)] hover:shadow-[0_0_30px_rgba(30,144,255,0.5)]"
              >
                Avançar <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
