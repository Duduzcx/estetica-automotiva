import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export function Scheduling() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [car, setCar] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const timeSlotsConfig = ["08:00", "09:00", "10:00", "11:30", "13:30", "15:00", "16:30", "18:00"];
  const todayDateStr = new Date().toISOString().split('T')[0];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      setTimeout(() => {
        const el = document.getElementById('agendamento');
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }, 50);
    }
  };
  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setTimeout(() => {
        const el = document.getElementById('agendamento');
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }, 50);
    }
  };

  const generateTimeSlots = (dateStr: string) => {
    const charSum = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return timeSlotsConfig.map((t, index) => {
      const isBooked = (charSum + (index * 7)) % 3 === 0;
      return { time: t, isBooked };
    });
  };

  const timeSlots = date ? generateTimeSlots(date) : [];
  const progressPercentage = (step / 4) * 100;

  const handleFinish = () => {
    setIsRedirecting(true);
    const dateObj = new Date(date + 'T00:00:00');
    const dataFormatada = dateObj.toLocaleDateString('pt-BR');
    
    const message = `Olá! Meu nome é *${name}* e tenho um *${car}*.\n\nGostaria de agendar o serviço de *${service}*.\n\n🗓️ *Data:* ${dataFormatada}\n⏰ *Horário:* ${time}\n\nAguardo a confirmação.`;
    const whatsappNumber = "5511937696256";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(url, '_blank');
      setIsRedirecting(false);
    }, 800);
  };

  return (
    <section id="agendamento" className="py-24 md:py-40 relative z-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 md:mb-24 px-2">
          <h3 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight text-white">Agende seu Horário</h3>
          <p className="text-gray-400 text-base md:text-xl font-light">Configure sua reserva com exclusividade em poucos cliques.</p>
        </motion.div>

        <motion.div layout initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-neve-card/90 backdrop-blur-2xl border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-14 shadow-[0_20px_40px_rgba(0,0,0,0.5)] w-full max-w-[95%] md:max-w-none mx-auto">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-10 md:mb-16 relative px-2">
            <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-1 md:h-1.5 bg-white/5 z-0 rounded-full"></div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 h-1 md:h-1.5 bg-neve-blue z-0 transition-all duration-700 rounded-full shadow-[0_0_15px_rgba(30,144,255,0.8)]" style={{ width: `calc(${progressPercentage}% - 16px)` }}></div>
            
            {[1,2,3,4].map(num => (
              <div key={num} className={`step-indicator z-10 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold transition-all duration-500 text-sm md:text-base ${step >= num ? 'bg-neve-blue text-white shadow-[0_0_20px_rgba(30,144,255,0.4)] scale-110' : 'bg-neve-dark border border-white/10 text-gray-500 scale-100'}`}>
                {num}
              </div>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active w-full">
                <h4 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 tracking-wide font-heading text-white text-center md:text-left">Qual serviço seu carro precisa?</h4>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-6 w-full">
                  {[
                    { label: 'Vitrificação Cerâmica', desc: 'Proteção máxima e brilho' },
                    { label: 'Polimento Técnico', desc: 'Correção de pintura' },
                    { label: 'Higienização Interna', desc: 'Limpeza profunda' },
                    { label: 'Outros / Avaliação', desc: 'PPF, Motor, Faróis, etc.' }
                  ].map(item => (
                    <label key={item.label} className="cursor-pointer group w-full">
                      <input type="radio" name="service" value={item.label} className="peer sr-only" checked={service === item.label} onChange={() => setService(item.label)} />
                      <div className="p-5 md:p-8 min-h-[72px] md:min-h-[80px] w-full rounded-2xl border border-white/5 bg-neve-dark peer-checked:border-neve-blue peer-checked:bg-neve-blue/10 transition-all duration-300 hover:border-white/20">
                        <div className="font-bold text-base md:text-xl text-white group-hover:text-neve-blue transition-colors">{item.label}</div>
                        <div className="text-xs md:text-base text-gray-400 mt-2 md:mt-3 font-light">{item.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-8 md:mt-14 flex justify-end w-full">
                  <button type="button" disabled={!service} className="bg-neve-blue text-white w-full md:w-auto px-8 md:px-12 py-4 md:py-5 rounded-full font-bold uppercase tracking-widest text-sm md:text-base disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-neve-blueHover hover:shadow-[0_0_25px_rgba(30,144,255,0.4)]" onClick={handleNext}>Avançar</button>
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active w-full">
                <h4 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 tracking-wide font-heading text-white text-center md:text-left">Data da Reserva</h4>
                <div className="mb-6 md:mb-10 w-full">
                  <input 
                    type="date" min={todayDateStr} value={date}
                    onChange={(e) => { setDate(e.target.value); setTime(''); }}
                    className="w-full bg-neve-dark border border-white/10 rounded-2xl p-5 md:p-8 text-white text-base md:text-xl focus:outline-none focus:border-neve-blue transition-all min-h-[64px] md:min-h-[72px] cursor-pointer" 
                  />
                </div>
                <div className="mt-8 md:mt-14 flex flex-col-reverse md:flex-row justify-between items-center gap-4 w-full">
                  <button type="button" className="text-gray-400 hover:text-white px-6 py-4 md:py-5 w-full md:w-auto transition-colors text-sm md:text-base font-bold uppercase tracking-widest flex items-center justify-center" onClick={handlePrev}><ArrowLeft className="w-5 h-5 mr-2" /> Voltar</button>
                  <button type="button" disabled={!date} className="bg-neve-blue text-white px-8 md:px-12 py-4 md:py-5 w-full md:w-auto rounded-full font-bold uppercase tracking-widest text-sm md:text-base disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-neve-blueHover hover:shadow-[0_0_25px_rgba(30,144,255,0.4)]" onClick={handleNext}>Avançar</button>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active w-full">
                <h4 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 tracking-wide font-heading text-white text-center md:text-left">Horário da Reserva</h4>
                <p className="text-sm md:text-base text-gray-400 mb-8 md:mb-12 text-center md:text-left">Data selecionada: <span className="font-medium text-neve-blue">{new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {day: '2-digit', month: 'long'})}</span></p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full">
                  {timeSlots.map((slot, i) => (
                    slot.isBooked ? (
                      <label key={i} className="block relative cursor-not-allowed opacity-40 w-full">
                        <input type="radio" disabled className="peer sr-only" />
                        <div className="p-4 md:p-6 min-h-[64px] md:min-h-[72px] w-full text-center rounded-2xl border border-red-900/20 bg-neve-dark text-gray-600 overflow-hidden relative flex items-center justify-center">
                          <span className="line-through text-sm md:text-lg">{slot.time}</span>
                          <div className="absolute inset-0 flex items-center justify-center bg-[#050505]/80">
                            <span className="text-[9px] md:text-[10px] font-bold text-red-500 tracking-[0.2em] uppercase">Esgotado</span>
                          </div>
                        </div>
                      </label>
                    ) : (
                      <label key={i} className="block relative cursor-pointer w-full">
                        <input type="radio" name="time" value={slot.time} className="peer sr-only" checked={time === slot.time} onChange={() => setTime(slot.time)} />
                        <div className="p-4 md:p-6 min-h-[64px] md:min-h-[72px] w-full text-center rounded-2xl border border-white/5 bg-neve-dark peer-checked:border-neve-blue peer-checked:bg-neve-blue peer-checked:text-white font-bold text-sm md:text-lg transition-all hover:border-neve-blue/30 flex items-center justify-center text-white">
                          {slot.time}
                        </div>
                      </label>
                    )
                  ))}
                </div>

                <div className="mt-10 md:mt-14 flex flex-col-reverse md:flex-row justify-between items-center gap-4 w-full">
                  <button type="button" className="text-gray-400 hover:text-white px-6 py-4 md:py-5 w-full md:w-auto transition-colors text-sm md:text-base font-bold uppercase tracking-widest flex items-center justify-center" onClick={handlePrev}><ArrowLeft className="w-5 h-5 mr-2" /> Voltar</button>
                  <button type="button" disabled={!time} className="bg-neve-blue text-white px-8 md:px-12 py-4 md:py-5 w-full md:w-auto rounded-full font-bold uppercase tracking-widest text-sm md:text-base disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-neve-blueHover hover:shadow-[0_0_25px_rgba(30,144,255,0.4)]" onClick={handleNext}>Avançar</button>
                </div>
              </motion.div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active w-full">
                <h4 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 tracking-wide font-heading text-white text-center md:text-left">Finalizar Reserva</h4>
                <div className="space-y-4 md:space-y-8 w-full">
                  <div>
                    <input type="text" placeholder="Seu Nome Completo" value={name} onChange={e => setName(e.target.value)} className="w-full bg-neve-dark border border-white/10 rounded-2xl p-5 md:p-8 min-h-[64px] md:min-h-[72px] text-white text-base md:text-xl focus:outline-none focus:border-neve-blue transition-all placeholder:text-gray-500" />
                  </div>
                  <div>
                    <input type="text" placeholder="Modelo (ex: Porsche 911)" value={car} onChange={e => setCar(e.target.value)} className="w-full bg-neve-dark border border-white/10 rounded-2xl p-5 md:p-8 min-h-[64px] md:min-h-[72px] text-white text-sm md:text-xl placeholder:text-gray-500 focus:outline-none focus:border-neve-blue transition-all" />
                  </div>
                </div>
                
                <div className="bg-neve-dark/50 border border-neve-blue/20 rounded-2xl p-6 md:p-10 mt-8 md:mt-12 w-full">
                  <h5 className="text-neve-blue text-[10px] md:text-[11px] font-bold uppercase mb-4 md:mb-5 tracking-[0.2em] font-heading">Resumo do Agendamento</h5>
                  <p className="text-gray-400 mb-2 md:mb-3 text-sm md:text-lg font-light">Serviço: <span className="text-white font-medium">{service}</span></p>
                  <p className="text-gray-400 text-sm md:text-lg font-light">Data e Hora: <span className="text-white font-medium">{new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')} às {time}</span></p>
                </div>

                <div className="mt-10 md:mt-14 flex flex-col-reverse md:flex-row justify-between items-center gap-4 w-full">
                  <button type="button" className="text-gray-400 hover:text-white px-4 md:px-6 py-4 md:py-5 w-full md:w-auto transition-colors text-sm md:text-base font-bold uppercase tracking-widest flex items-center justify-center" onClick={handlePrev}><ArrowLeft className="w-5 h-5 mr-2" /> Voltar</button>
                  <button type="button" disabled={name.length < 3 || car.length < 3 || isRedirecting} className="bg-[#25D366] text-white px-6 md:px-10 py-4 md:py-6 w-full md:w-auto rounded-full font-bold text-sm md:text-base uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-[#20b858] flex justify-center items-center shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]" onClick={handleFinish}>
                    {isRedirecting ? <CheckCircle2 className="w-6 h-6 mr-3 animate-pulse" /> : <i className="fa-brands fa-whatsapp text-xl md:text-2xl mr-3 md:mr-4"></i>} 
                    <span>{isRedirecting ? "Conectando..." : "Confirmar Reserva"}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
