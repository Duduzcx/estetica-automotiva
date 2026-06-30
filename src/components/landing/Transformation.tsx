import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const slideRightVariants: any = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, x: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export function Transformation() {
  return (
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
                    <Check className="text-neve-blue w-3 h-3" />
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
            
            {/* Imagem Sobreposta (ANTES) com animação crossfade do index.css */}
            <img 
              src="/carro-sujo.png" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none animate-crossfade" 
              alt="Antes - Sujo e Opaco" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
