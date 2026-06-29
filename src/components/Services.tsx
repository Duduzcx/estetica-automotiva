import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Droplets, Car } from 'lucide-react';

const services = [
  {
    title: 'Vitrificação de Pintura',
    description: 'Proteção nanométrica extrema que garante brilho profundo e repele água e sujeira por até 3 anos.',
    icon: Shield,
  },
  {
    title: 'Polimento Técnico',
    description: 'Correção de verniz de alta precisão para remover riscos, hologramas e restaurar o brilho original de fábrica.',
    icon: Sparkles,
  },
  {
    title: 'Higienização Interna',
    description: 'Limpeza profunda e hidratação de couro com produtos premium, eliminando odores e bactérias.',
    icon: Car,
  },
  {
    title: 'Lavagem Premium',
    description: 'Lavagem detalhada com técnica de dois baldes, snow foam e secagem com ar para zero atrito.',
    icon: Droplets,
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }
  }
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-premium-base relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Serviços de <span className="text-accent">Excelência</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Tratamentos estéticos meticulosamente desenhados para os clientes mais exigentes.</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px rgba(212, 175, 55, 0.15)",
                borderColor: "rgba(212, 175, 55, 0.5)"
              }}
              className="bg-premium-light border border-white/5 rounded-2xl p-8 flex flex-col items-start transition-all duration-500 relative group overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              
              <div className="w-14 h-14 rounded-xl bg-premium-dark flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-500 border border-white/10 group-hover:border-accent/30 z-10 relative">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-accent transition-colors duration-300 z-10 relative">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow z-10 relative">{service.description}</p>
              
              <button className="mt-auto text-sm font-medium flex items-center text-gray-300 group-hover:text-accent transition-colors duration-300 z-10 relative">
                Saber Mais
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
