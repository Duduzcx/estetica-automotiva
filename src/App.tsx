import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Animações Stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

const slideRightVariants = {
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

  // --- Before/After Slider ---
  const [sliderValue, setSliderValue] = useState(50);

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

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

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
    <div className="antialiased selection:bg-elite-gold selection:text-black font-sans bg-[#050505] text-white min-h-screen relative overflow-hidden">
      
      {/* Dynamic Background: CSS Grid & Soft Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-elite-gold/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 blur-[180px] rounded-full pointer-events-none z-0"></div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-xl bg-[#050505]/70 border-b border-white/5" id="navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-shrink-0">
              <span className="text-3xl font-bold tracking-tighter text-white uppercase">Elite<span className="text-elite-gold">AutoSpa</span></span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden md:block">
              <a href="#agendamento" className="bg-elite-gold text-[#050505] px-8 py-3.5 rounded-full font-bold tracking-wide hover:bg-[#f3c63a] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-1 inline-block">
                Agendar Avaliação
              </a>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          {/* Nova imagem 4K do Unsplash com overlay mais elegante */}
          <img src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=100" alt="Supercarro detalhado brilhante" className="w-full h-full object-cover object-center scale-[1.03]" style={{ filter: "brightness(0.35) contrast(1.1)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-24"
        >
          <motion.p variants={itemVariants} className="text-elite-gold font-bold tracking-[0.3em] uppercase mb-6 text-xs md:text-sm">A excelência em cada milímetro</motion.p>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-8 leading-[1.1] tracking-tight">
            Eleve o Nível do seu <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3c63a] to-[#fff3b8]">Veículo.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Estética automotiva de alta performance. Proteção extrema, brilho inigualável e um cuidado obsessivo com os detalhes mais ínfimos.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a href="#agendamento" className="inline-flex items-center justify-center bg-[#050505]/50 backdrop-blur-md border border-elite-gold/50 text-elite-gold hover:bg-elite-gold hover:text-black px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-1">
              Agendar Serviço <i className="fa-brands fa-whatsapp ml-3 text-lg"></i>
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/30 animate-bounce"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-elite-gold to-transparent mx-auto mb-2"></div>
        </motion.div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-24"
          >
            <motion.h2 variants={itemVariants} className="text-elite-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">Nosso Portfólio</motion.h2>
            <motion.h3 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight text-white">Serviços Premium</motion.h3>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {servicesData.map((srv, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group relative p-8 rounded-[2rem] bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:border-elite-gold/50 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-elite-gold text-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-elite-gold group-hover:text-[#050505] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <i className={srv.icon}></i>
                </div>
                <h4 className="text-xl font-bold mb-4 text-white tracking-wide group-hover:text-elite-gold transition-colors">{srv.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{srv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Before/After Slider */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 variants={slideRightVariants} className="text-elite-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">Resultados Reais</motion.h2>
              <motion.h3 variants={slideRightVariants} className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">A Arte da <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Transformação</span></motion.h3>
              <motion.p variants={slideRightVariants} className="text-gray-400 text-lg mb-10 font-light leading-relaxed">Deslize a linha ao lado para comparar a pintura cega, repleta de teias de aranha e hologramas, com o resultado do nosso Polimento Técnico. A profundidade e o reflexo são restaurados de forma impecável.</motion.p>
              <motion.ul variants={containerVariants} className="space-y-5 mb-8">
                {["Remoção de 95% dos micro-riscos", "Nivelamento perfeito do verniz", "Reflexo de espelho impecável"].map((item, i) => (
                  <motion.li key={i} variants={slideRightVariants} className="flex items-center text-gray-300 font-medium tracking-wide">
                    <div className="w-6 h-6 rounded-full bg-elite-gold/10 flex items-center justify-center mr-4">
                      <i className="fa-solid fa-check text-elite-gold text-xs"></i>
                    </div>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, type: "spring", bounce: 0.3 }} viewport={{ once: true }}
              className="relative h-[450px] md:h-[600px] w-full rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden bg-[#050505]"
            >
              {/* Imagem DEPOIS (Fundo 100%) */}
              <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Carro polido e brilhante (Depois)" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              
              {/* Imagem ANTES (Clipped via state) */}
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1582239474722-e3e7f41b2fcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Carro arranhado (Antes)" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  style={{ filter: "sepia(30%) contrast(80%) brightness(80%)" }} 
                />
              </div>
              
              {/* Handle visual da divisória neon */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-elite-gold shadow-[0_0_20px_#d4af37] pointer-events-none z-20"
                style={{ left: `${sliderValue}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#050505] border border-elite-gold rounded-full flex items-center justify-center text-elite-gold shadow-[0_0_30px_rgba(212,175,55,0.6)] backdrop-blur-md">
                  <i className="fa-solid fa-arrows-left-right text-sm"></i>
                </div>
              </div>

              {/* Badges Flutuantes */}
              <div className="absolute top-8 left-8 bg-[#050505]/60 backdrop-blur-xl border border-white/10 text-gray-400 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] z-10 pointer-events-none shadow-lg">Antes</div>
              <div className="absolute top-8 right-8 bg-[#d4af37]/10 backdrop-blur-xl border border-elite-gold/30 text-elite-gold px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] z-10 pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.15)]">Depois</div>

              {/* Input Range invisível para capturar touch/mouse nativamente com precisão milimétrica */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderValue} 
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize appearance-none"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Booking System */}
      <section id="agendamento" className="py-32 relative z-10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Agende seu Horário</h3>
            <p className="text-gray-400 text-lg font-light">Configure sua reserva com exclusividade em poucos cliques.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-14 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 z-0 rounded-full"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-elite-gold z-0 transition-all duration-700 rounded-full shadow-[0_0_15px_#d4af37]" style={{ width: `${progressPercentage}%` }}></div>
              
              {[1,2,3,4].map(num => (
                <div key={num} className={`step-indicator z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 text-sm ${step >= num ? 'bg-elite-gold text-[#050505] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-110' : 'bg-[#121212] border border-white/10 text-gray-500 scale-100'}`}>
                  {num}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1 */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active">
                  <h4 className="text-2xl font-semibold mb-8 tracking-wide">Qual serviço seu carro precisa?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { label: 'Vitrificação Cerâmica', desc: 'Proteção máxima e brilho' },
                      { label: 'Polimento Técnico', desc: 'Correção de pintura' },
                      { label: 'Higienização Interna', desc: 'Limpeza profunda' },
                      { label: 'Outros / Avaliação', desc: 'PPF, Motor, Faróis, etc.' }
                    ].map(item => (
                      <label key={item.label} className="cursor-pointer group">
                        <input type="radio" name="service" value={item.label} className="peer sr-only" checked={service === item.label} onChange={() => setService(item.label)} />
                        <div className="p-6 rounded-2xl border border-white/5 bg-[#121212] peer-checked:border-elite-gold peer-checked:bg-elite-gold/5 transition-all duration-300 hover:border-white/20">
                          <div className="font-bold text-lg text-white group-hover:text-elite-gold transition-colors">{item.label}</div>
                          <div className="text-sm text-gray-500 mt-2 font-light">{item.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-end">
                    <button type="button" disabled={!service} className="bg-elite-gold text-[#050505] px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-[#f3d568] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]" onClick={handleNext}>Avançar</button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active">
                  <h4 className="text-2xl font-semibold mb-8 tracking-wide">Data da Reserva</h4>
                  <div className="mb-8">
                    <input 
                      type="date" min={todayDateStr} value={date}
                      onChange={(e) => { setDate(e.target.value); setTime(''); }}
                      className="w-full bg-[#121212] border border-white/10 rounded-2xl p-6 text-white text-lg focus:outline-none focus:border-elite-gold transition-all" 
                    />
                  </div>
                  <div className="mt-12 flex justify-between items-center">
                    <button type="button" className="text-gray-500 hover:text-white px-4 py-4 transition-colors text-sm font-bold uppercase tracking-widest" onClick={handlePrev}><i className="fa-solid fa-arrow-left mr-2"></i> Voltar</button>
                    <button type="button" disabled={!date} className="bg-elite-gold text-[#050505] px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-[#f3d568] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]" onClick={handleNext}>Avançar</button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active">
                  <h4 className="text-2xl font-semibold mb-4 tracking-wide">Horário da Reserva</h4>
                  <p className="text-sm text-gray-400 mb-10">Data selecionada: <span className="font-medium text-elite-gold">{new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {day: '2-digit', month: 'long'})}</span></p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {timeSlots.map((slot, i) => (
                      slot.isBooked ? (
                        <label key={i} className="block relative cursor-not-allowed opacity-40">
                          <input type="radio" disabled className="peer sr-only" />
                          <div className="p-5 text-center rounded-2xl border border-red-900/20 bg-[#121212] text-gray-600 overflow-hidden relative flex items-center justify-center">
                            <span className="line-through">{slot.time}</span>
                            <div className="absolute inset-0 flex items-center justify-center bg-[#050505]/80">
                              <span className="text-[9px] font-bold text-red-500 tracking-[0.2em] uppercase">Esgotado</span>
                            </div>
                          </div>
                        </label>
                      ) : (
                        <label key={i} className="block relative cursor-pointer">
                          <input type="radio" name="time" value={slot.time} className="peer sr-only" checked={time === slot.time} onChange={() => setTime(slot.time)} />
                          <div className="p-5 text-center rounded-2xl border border-white/5 bg-[#121212] peer-checked:border-elite-gold peer-checked:bg-elite-gold peer-checked:text-[#050505] font-bold transition-all hover:border-elite-gold/30">
                            {slot.time}
                          </div>
                        </label>
                      )
                    ))}
                  </div>

                  <div className="mt-12 flex justify-between items-center">
                    <button type="button" className="text-gray-500 hover:text-white px-4 py-4 transition-colors text-sm font-bold uppercase tracking-widest" onClick={handlePrev}><i className="fa-solid fa-arrow-left mr-2"></i> Voltar</button>
                    <button type="button" disabled={!time} className="bg-elite-gold text-[#050505] px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-[#f3d568] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]" onClick={handleNext}>Avançar</button>
                  </div>
                </motion.div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="step-container active">
                  <h4 className="text-2xl font-semibold mb-8 tracking-wide">Finalizar Reserva</h4>
                  <div className="space-y-6">
                    <div>
                      <input type="text" placeholder="Seu Nome Completo" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#121212] border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-elite-gold transition-all" />
                    </div>
                    <div>
                      <input type="text" placeholder="Modelo do Veículo (ex: Porsche 911)" value={car} onChange={e => setCar(e.target.value)} className="w-full bg-[#121212] border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-elite-gold transition-all" />
                    </div>
                  </div>
                  
                  <div className="bg-[#121212]/50 border border-elite-gold/20 rounded-2xl p-8 mt-10">
                    <h5 className="text-elite-gold text-[10px] font-bold uppercase mb-4 tracking-[0.2em]">Resumo do Agendamento</h5>
                    <p className="text-gray-400 mb-2 font-light">Serviço: <span className="text-white font-medium">{service}</span></p>
                    <p className="text-gray-400 font-light">Data e Hora: <span className="text-white font-medium">{new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')} às {time}</span></p>
                  </div>

                  <div className="mt-12 flex justify-between items-center">
                    <button type="button" className="text-gray-500 hover:text-white px-2 py-4 transition-colors text-sm font-bold uppercase tracking-widest" onClick={handlePrev}><i className="fa-solid fa-arrow-left"></i> Voltar</button>
                    <button type="button" disabled={name.length < 3 || car.length < 3 || isRedirecting} className="bg-[#25D366] text-white px-8 py-5 rounded-full font-bold text-sm uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-[#20b858] flex items-center shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]" onClick={handleFinish}>
                      <i className={isRedirecting ? "fa-solid fa-circle-check text-xl mr-3 animate-pulse" : "fa-brands fa-whatsapp text-xl mr-3"}></i> 
                      <span>{isRedirecting ? "Conectando..." : "Confirmar via WhatsApp"}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030303] border-t border-white/5 pt-24 pb-12 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div className="flex flex-col">
              <span className="text-3xl font-bold tracking-tighter text-white uppercase mb-6">Elite<span className="text-elite-gold">AutoSpa</span></span>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">A referência definitiva em estética automotiva de alto padrão. Tratamos seu veículo como uma obra de arte.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 tracking-[0.1em] uppercase text-xs">Contato</h4>
              <ul className="text-gray-400 text-sm space-y-5 font-light">
                <li className="flex items-center"><i className="fa-solid fa-location-dot w-6 text-elite-gold"></i> Av. das Nações Unidas, 1000 - SP</li>
                <li className="flex items-center"><i className="fa-solid fa-phone w-6 text-elite-gold"></i> (11) 99999-9999</li>
                <li className="flex items-center"><i className="fa-solid fa-envelope w-6 text-elite-gold"></i> contato@eliteautospa.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 tracking-[0.1em] uppercase text-xs">Redes Sociais</h4>
              <div className="flex space-x-5">
                <a href="#" className="w-12 h-12 rounded-full bg-[#121212] border border-white/5 flex items-center justify-center text-white hover:bg-elite-gold hover:text-[#050505] hover:border-elite-gold transition-all duration-300"><i className="fa-brands fa-instagram text-xl"></i></a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#121212] border border-white/5 flex items-center justify-center text-white hover:bg-elite-gold hover:text-[#050505] hover:border-elite-gold transition-all duration-300"><i className="fa-brands fa-tiktok text-xl"></i></a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#121212] border border-white/5 flex items-center justify-center text-white hover:bg-elite-gold hover:text-[#050505] hover:border-elite-gold transition-all duration-300"><i className="fa-brands fa-youtube text-xl"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light">
            <p>&copy; 2024 Elite AutoSpa. Todos os direitos reservados.</p>
            <p className="mt-6 md:mt-0 font-medium tracking-wide">
              Desenvolvido por <a href="#" className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 font-bold tracking-[0.15em] hover:from-elite-gold hover:via-[#fff3b8] hover:to-elite-gold transition-all duration-700 cursor-pointer">ZcxPages</a>
            </p>
          </div>
        </div>
      </footer>

      {/* FAB WhatsApp */}
      <motion.a 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
        href="https://wa.me/5511937696256" target="_blank" rel="noreferrer" 
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-[0_4px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform z-50 animate-bounce" 
        aria-label="Falar no WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </motion.a>
    </div>
  );
}
