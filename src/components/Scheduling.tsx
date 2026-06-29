import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Car, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const servicesOptions = [
  'Vitrificação de Pintura',
  'Polimento Técnico',
  'Higienização Interna',
  'Lavagem Premium',
];

const Scheduling: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    carModel: '',
    service: '',
    date: '',
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.name.length > 2;
      case 2: return formData.carModel.length > 2;
      case 3: return formData.service !== '';
      case 4: return formData.date !== '';
      default: return false;
    }
  };

  const handleSubmit = () => {
    // Integração WhatsApp
    const phone = "5511999999999"; // Substituir pelo número real
    const text = `Olá! Meu nome é ${formData.name}, tenho um ${formData.carModel}. Gostaria de agendar o serviço de ${formData.service} para a data ${formData.date}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <section id="scheduling" className="py-24 bg-premium-dark relative">
      <div className="absolute inset-0 bg-gradient-to-t from-premium-base to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Agende sua <span className="text-accent">Avaliação</span></h2>
          <p className="text-gray-400">Garanta o melhor cuidado para o seu veículo em poucos passos.</p>
        </motion.div>

        <div className="bg-premium-light border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col">
          
          {/* Progress Bar */}
          <div className="w-full bg-premium-dark h-2 rounded-full mb-10 overflow-hidden">
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="flex-grow relative">
            <AnimatePresence mode="wait" custom={1}>
              
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0 flex flex-col"
                >
                  <h3 className="text-2xl font-semibold mb-6 flex items-center text-white"><User className="mr-3 text-accent"/> Qual o seu nome?</h3>
                  <input 
                    type="text" 
                    placeholder="Seu nome completo"
                    className="w-full bg-premium-dark border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors text-lg"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0 flex flex-col"
                >
                  <h3 className="text-2xl font-semibold mb-6 flex items-center text-white"><Car className="mr-3 text-accent"/> Qual o modelo do seu carro?</h3>
                  <input 
                    type="text" 
                    placeholder="Ex: Porsche 911, BMW 320i, etc."
                    className="w-full bg-premium-dark border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors text-lg"
                    value={formData.carModel}
                    onChange={(e) => setFormData({...formData, carModel: e.target.value})}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0 flex flex-col"
                >
                  <h3 className="text-2xl font-semibold mb-6 text-white">Qual serviço deseja realizar?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {servicesOptions.map((srv) => (
                      <button
                        key={srv}
                        onClick={() => setFormData({...formData, service: srv})}
                        className={`p-4 rounded-xl border text-left transition-all ${formData.service === srv ? 'border-accent bg-accent/10 text-accent' : 'border-white/10 bg-premium-dark text-gray-300 hover:border-white/30'}`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  custom={1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0 flex flex-col"
                >
                  <h3 className="text-2xl font-semibold mb-6 flex items-center text-white"><Calendar className="mr-3 text-accent"/> Qual a melhor data?</h3>
                  <input 
                    type="date" 
                    className="w-full bg-premium-dark border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent transition-colors text-lg [color-scheme:dark]"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-12 pt-6 border-t border-white/5">
            <button 
              onClick={handlePrev}
              disabled={step === 1}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white bg-premium-dark hover:bg-white/5'}`}
            >
              Voltar
            </button>

            {step < 4 ? (
              <button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-8 py-3 rounded-xl font-medium flex items-center transition-all ${isStepValid() ? 'bg-white text-premium-dark hover:bg-gray-200 shadow-lg' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}
              >
                Próximo <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className={`px-8 py-3 rounded-xl font-semibold flex items-center transition-all ${isStepValid() ? 'bg-accent text-premium-dark shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]' : 'bg-accent/20 text-accent/50 cursor-not-allowed'}`}
              >
                Confirmar no WhatsApp <CheckCircle className="ml-2 w-5 h-5" />
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Scheduling;
