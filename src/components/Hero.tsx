import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToScheduling = () => {
    const schedulingSection = document.getElementById('scheduling');
    if (schedulingSection) {
      schedulingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-premium-dark/70 via-premium-dark/80 to-premium-dark z-10" />
        <img 
          src="/hero-bg.png" 
          alt="Carro de luxo com polimento premium" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-20">
        
        <div className="overflow-hidden mb-4">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            Eleve o Nível do <br className="hidden md:block"/>
            <span className="text-accent text-glow">Seu Veículo.</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.p 
            className="text-lg md:text-2xl text-gray-300 max-w-2xl font-light"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            Estética Automotiva de Alta Performance focada na exclusividade e cuidado absoluto que seu carro merece.
          </motion.p>
        </div>

        <motion.button
          onClick={scrollToScheduling}
          className="px-8 py-4 bg-accent text-premium-dark font-semibold text-lg rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:bg-accent-hover transition-all duration-300 transform"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Agendar Avaliação Gratuita
        </motion.button>
        
        {/* Pulsing rings around button (absolute positioned behind it for effect) */}
        <motion.div 
           className="absolute z-[-1] w-48 h-16 rounded-full border-2 border-accent/50"
           initial={{ opacity: 0, scale: 1 }}
           animate={{ opacity: [0, 0.5, 0], scale: [1, 1.2, 1.4] }}
           transition={{ duration: 2, repeat: Infinity, delay: 1 }}
           style={{ bottom: "10px" }} // Rough approximation to center behind button
        />

      </div>
    </section>
  );
};

export default Hero;
