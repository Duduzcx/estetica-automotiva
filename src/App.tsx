import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Animações Stagger
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

const slideRightVariants: any = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export default function App() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 350]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // --- Booking System ---

  // --- Booking System ---
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
    setStep(prev => prev + 1);
    setTimeout(() => {
      const el = document.getElementById('agendamento');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };
  const handlePrev = () => {
    setStep(prev => prev - 1);
    setTimeout(() => {
      const el = document.getElementById('agendamento');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
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

  const servicesData = [
    { title: "Vitrificação Cerâmica", icon: "fa-solid fa-shield-halved", desc: "Proteção de até 5 anos com dureza 9H. Brilho espelhado e repelência extrema." },
    { title: "Polimento Técnico", icon: "fa-solid fa-wand-magic-sparkles", desc: "Correção de verniz em multiníveis. Remoção de riscos, hologramas e marcas." },
    { title: "Higienização Interna", icon: "fa-solid fa-car-side", desc: "Limpeza detalhada, hidratação de couro e oxi-sanitização para eliminar odores." },
    { title: "Lavagem Detalhada", icon: "fa-solid fa-droplet", desc: "Processo artesanal com snow foam, pincéis de detalhamento e ceras premium." },
    { title: "Aplicação de PPF", icon: "fa-solid fa-layer-group", desc: "A armadura transparente definitiva contra pedras, riscos e desgastes externos." },
    { title: "Restauração de Faróis", icon: "fa-regular fa-lightbulb", desc: "Devolvemos a transparência original e aplicamos proteção UV prolongada." },
    { title: "Detalhamento de Motor", icon: "fa-solid fa-gears", desc: "Limpeza a seco meticulosa e condicionamento de borrachas para proteção." },
    { title: "Proteção de Rodas", icon: "fa-solid fa-ring", desc: "Coating cerâmico para rodas, evitando impregnação de pó de freio e sujeira pesada." }
  ];

  return (
    <div className="antialiased selection:bg-neve-blue selection:text-white font-sans bg-neve-dark text-white min-h-screen relative overflow-hidden">
      
      {/* Navbar */}
      <nav className="fixed w-full z-40 transition-all duration-300 backdrop-blur-md bg-neve-dark/30 border-b border-white/5" id="navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-shrink-0">
              <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase font-heading">Neve<span className="text-neve-blue">na Nave</span></span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden md:block">
              <a href="#agendamento" className="bg-neve-blue text-white px-8 py-3.5 rounded-full font-bold tracking-wide hover:bg-neve-blueHover transition-all duration-300 shadow-[0_0_20px_rgba(30,144,255,0.2)] hover:shadow-[0_0_30px_rgba(30,144,255,0.5)] hover:-translate-y-1 inline-block">
                Agendar Avaliação
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:hidden flex items-center">
              <button className="text-white text-2xl focus:outline-none"><i className="fa-solid fa-bars"></i></button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-16 md:px-8 md:py-24">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=100" alt="Supercarro detalhado brilhante" className="w-full h-full object-cover object-center scale-[1.03]" style={{ filter: "brightness(0.35) contrast(1.1)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-neve-dark via-transparent to-transparent"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-5xl mx-auto mt-24"
        >
          <motion.p variants={itemVariants} className="text-neve-blue font-bold tracking-[0.3em] uppercase mb-6 text-xs md:text-sm font-heading">A excelência em cada milímetro</motion.p>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-8 leading-[1.1] tracking-tight">
            Sua nave <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neve-blue to-white animate-shimmer">impecável.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Estética automotiva premium. Proteção, limpeza profunda e vitrificação. Brilho extremo e cuidado em cada detalhe.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a href="#agendamento" className="inline-flex items-center justify-center bg-neve-blue text-white hover:bg-neve-blueHover px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(30,144,255,0.2)] hover:shadow-[0_0_40px_rgba(30,144,255,0.5)] hover:-translate-y-1">
              Agendar Avaliação
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/30 animate-bounce"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-neve-blue to-transparent mx-auto mb-2"></div>
        </motion.div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-16 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16 md:mb-24"
          >
            <motion.h2 variants={itemVariants} className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Nosso Portfólio</motion.h2>
            <motion.h3 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight text-white">Serviços Premium</motion.h3>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
          >
            {servicesData.map((srv, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group relative p-8 rounded-[2rem] bg-neve-card/60 backdrop-blur-xl border border-white/5 cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,0,255,0.15)] hover:border-neve-gradient1/50 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-neve-blue text-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-neve-blue group-hover:text-white group-hover:shadow-[0_0_20px_rgba(30,144,255,0.4)]">
                  <i className={srv.icon}></i>
                </div>
                <h4 className="text-xl font-bold mb-4 text-white tracking-wide group-hover:text-neve-blue transition-colors">{srv.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{srv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before/After Slider */}
      <section className="py-16 md:py-32 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 variants={slideRightVariants} className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Resultados Reais</motion.h2>
              <motion.h3 variants={slideRightVariants} className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">A Arte da <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 animate-shimmer">Transformação</span></motion.h3>
              <motion.p variants={slideRightVariants} className="text-gray-400 text-lg mb-10 font-light leading-relaxed">Deslize a linha ao lado para comparar a pintura cega, repleta de teias de aranha e hologramas, com o resultado do nosso Polimento Técnico. A profundidade e o reflexo são restaurados de forma impecável.</motion.p>
              <motion.ul variants={containerVariants} className="space-y-5 mb-8">
                {["Remoção de 95% dos micro-riscos", "Nivelamento perfeito do verniz", "Reflexo de espelho impecável"].map((item, i) => (
                  <motion.li key={i} variants={slideRightVariants} className="flex items-center text-gray-300 font-medium tracking-wide">
                    <div className="w-6 h-6 rounded-full bg-neve-blue/10 flex items-center justify-center mr-4">
                      <i className="fa-solid fa-check text-neve-blue text-xs"></i>
                    </div>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, type: "spring", bounce: 0.3 }} viewport={{ once: true }}
              className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Imagem de Fundo (DEPOIS) */}
              <img src="/carro-limpo.png" className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="Depois - Vitrificado" />
              
              {/* Imagem Sobreposta (ANTES) */}
              <img 
                src="/carro-sujo.png" 
                id="img-antes" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none animate-crossfade" 
                alt="Antes - Sujo e Opaco" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Booking System */}
      <section id="agendamento" className="py-24 md:py-40 relative z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full overflow-hidden">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 md:mb-24 px-2">
            <h3 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">Agende seu Horário</h3>
            <p className="text-gray-400 text-base md:text-xl font-light">Configure sua reserva com exclusividade em poucos cliques.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-neve-card/90 backdrop-blur-2xl border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-14 shadow-[0_20px_40px_rgba(0,0,0,0.5)] w-full max-w-[95%] md:max-w-none mx-auto">
            
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

            <AnimatePresence mode="wait">
              {/* Step 1 */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active w-full">
                  <h4 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 tracking-wide font-heading text-center md:text-left">Qual serviço seu carro precisa?</h4>
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
                  <h4 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 tracking-wide font-heading text-center md:text-left">Data da Reserva</h4>
                  <div className="mb-6 md:mb-10 w-full">
                    <input 
                      type="date" min={todayDateStr} value={date}
                      onChange={(e) => { setDate(e.target.value); setTime(''); }}
                      className="w-full bg-neve-dark border border-white/10 rounded-2xl p-5 md:p-8 text-white text-base md:text-xl focus:outline-none focus:border-neve-blue transition-all min-h-[64px] md:min-h-[72px]" 
                    />
                  </div>
                  <div className="mt-8 md:mt-14 flex flex-col-reverse md:flex-row justify-between items-center gap-4 w-full">
                    <button type="button" className="text-gray-400 hover:text-white px-6 py-4 md:py-5 w-full md:w-auto transition-colors text-sm md:text-base font-bold uppercase tracking-widest" onClick={handlePrev}><i className="fa-solid fa-arrow-left mr-2 md:mr-3"></i> Voltar</button>
                    <button type="button" disabled={!date} className="bg-neve-blue text-white px-8 md:px-12 py-4 md:py-5 w-full md:w-auto rounded-full font-bold uppercase tracking-widest text-sm md:text-base disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-neve-blueHover hover:shadow-[0_0_25px_rgba(30,144,255,0.4)]" onClick={handleNext}>Avançar</button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active w-full">
                  <h4 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 tracking-wide font-heading text-center md:text-left">Horário da Reserva</h4>
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
                          <div className="p-4 md:p-6 min-h-[64px] md:min-h-[72px] w-full text-center rounded-2xl border border-white/5 bg-neve-dark peer-checked:border-neve-blue peer-checked:bg-neve-blue peer-checked:text-white font-bold text-sm md:text-lg transition-all hover:border-neve-blue/30 flex items-center justify-center">
                            {slot.time}
                          </div>
                        </label>
                      )
                    ))}
                  </div>

                  <div className="mt-10 md:mt-14 flex flex-col-reverse md:flex-row justify-between items-center gap-4 w-full">
                    <button type="button" className="text-gray-400 hover:text-white px-6 py-4 md:py-5 w-full md:w-auto transition-colors text-sm md:text-base font-bold uppercase tracking-widest" onClick={handlePrev}><i className="fa-solid fa-arrow-left mr-2 md:mr-3"></i> Voltar</button>
                    <button type="button" disabled={!time} className="bg-neve-blue text-white px-8 md:px-12 py-4 md:py-5 w-full md:w-auto rounded-full font-bold uppercase tracking-widest text-sm md:text-base disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-neve-blueHover hover:shadow-[0_0_25px_rgba(30,144,255,0.4)]" onClick={handleNext}>Avançar</button>
                  </div>
                </motion.div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active w-full">
                  <h4 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 tracking-wide font-heading text-center md:text-left">Finalizar Reserva</h4>
                  <div className="space-y-4 md:space-y-8 w-full">
                    <div>
                      <input type="text" placeholder="Seu Nome Completo" value={name} onChange={e => setName(e.target.value)} className="w-full bg-neve-dark border border-white/10 rounded-2xl p-5 md:p-8 min-h-[64px] md:min-h-[72px] text-white text-base md:text-xl focus:outline-none focus:border-neve-blue transition-all" />
                    </div>
                    <div>
                      <input type="text" placeholder="Modelo do Veículo (ex: Porsche 911)" value={car} onChange={e => setCar(e.target.value)} className="w-full bg-neve-dark border border-white/10 rounded-2xl p-5 md:p-8 min-h-[64px] md:min-h-[72px] text-white text-base md:text-xl focus:outline-none focus:border-neve-blue transition-all" />
                    </div>
                  </div>
                  
                  <div className="bg-neve-dark/50 border border-neve-blue/20 rounded-2xl p-6 md:p-10 mt-8 md:mt-12 w-full">
                    <h5 className="text-neve-blue text-[10px] md:text-[11px] font-bold uppercase mb-4 md:mb-5 tracking-[0.2em] font-heading">Resumo do Agendamento</h5>
                    <p className="text-gray-400 mb-2 md:mb-3 text-sm md:text-lg font-light">Serviço: <span className="text-white font-medium">{service}</span></p>
                    <p className="text-gray-400 text-sm md:text-lg font-light">Data e Hora: <span className="text-white font-medium">{new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')} às {time}</span></p>
                  </div>

                  <div className="mt-10 md:mt-14 flex flex-col-reverse md:flex-row justify-between items-center gap-4 w-full">
                    <button type="button" className="text-gray-400 hover:text-white px-4 md:px-6 py-4 md:py-5 w-full md:w-auto transition-colors text-sm md:text-base font-bold uppercase tracking-widest" onClick={handlePrev}><i className="fa-solid fa-arrow-left mr-2 md:mr-3"></i> Voltar</button>
                    <button type="button" disabled={name.length < 3 || car.length < 3 || isRedirecting} className="bg-[#25D366] text-white px-6 md:px-10 py-4 md:py-6 w-full md:w-auto rounded-full font-bold text-sm md:text-base uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-[#20b858] flex justify-center items-center shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]" onClick={handleFinish}>
                      <i className={isRedirecting ? "fa-solid fa-circle-check text-xl md:text-2xl mr-3 md:mr-4 animate-pulse" : "fa-brands fa-whatsapp text-xl md:text-2xl mr-3 md:mr-4"}></i> 
                      <span>{isRedirecting ? "Conectando..." : "Confirmar Reserva"}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neve-black border-t border-white/5 pt-24 pb-12 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase mb-6 font-heading">Neve<span className="text-neve-blue">na Nave</span></span>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">A referência definitiva em estética automotiva de alto padrão. Tratamos seu veículo como uma obra de arte.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 tracking-[0.1em] uppercase text-xs font-heading">Contato</h4>
              <ul className="text-gray-400 text-sm space-y-5 font-light">
                <li className="flex items-center"><i className="fa-solid fa-location-dot w-6 text-neve-blue"></i> 📍 Santana de Parnaíba - SP</li>
                <li className="flex items-center"><i className="fa-solid fa-phone w-6 text-neve-blue"></i> (11) 99999-9999</li>
                <li className="flex items-center"><i className="fa-solid fa-envelope w-6 text-neve-blue"></i> contato@nevenanave.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 tracking-[0.1em] uppercase text-xs font-heading">Redes Sociais</h4>
              <div className="flex space-x-5">
                <a href="https://www.instagram.com/nevenanavee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-neve-dark border border-white/5 flex items-center justify-center text-white hover:bg-neve-blue hover:text-white hover:border-neve-blue transition-all duration-300"><i className="fa-brands fa-instagram text-xl"></i></a>
                <a href="#" className="w-12 h-12 rounded-full bg-neve-dark border border-white/5 flex items-center justify-center text-white hover:bg-neve-blue hover:text-white hover:border-neve-blue transition-all duration-300"><i className="fa-brands fa-tiktok text-xl"></i></a>
                <a href="#" className="w-12 h-12 rounded-full bg-neve-dark border border-white/5 flex items-center justify-center text-white hover:bg-neve-blue hover:text-white hover:border-neve-blue transition-all duration-300"><i className="fa-brands fa-youtube text-xl"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light">
            <p>&copy; {new Date().getFullYear()} Neve na Nave. Todos os direitos reservados.</p>
            <p className="mt-6 md:mt-0 font-medium tracking-wide">
              Desenvolvido por <a href="#" className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 font-bold tracking-[0.15em] hover:from-neve-blue hover:via-[#fff3b8] hover:to-neve-blue transition-all duration-700 cursor-pointer animate-shimmer">ZcxPages</a>
            </p>
          </div>
        </div>
      </footer>

      {/* FAB WhatsApp */}
      <motion.a 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
        href="https://wa.me/5511937696256" target="_blank" rel="noreferrer" 
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-[0_4px_14px_rgba(37,211,102,0.4)] opacity-70 backdrop-blur-sm hover:opacity-100 hover:scale-110 transition-all duration-300 z-50 animate-pulse" 
        aria-label="Falar no WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </motion.a>
    </div>
  );
}
