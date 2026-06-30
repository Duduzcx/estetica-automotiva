import { motion, useScroll, useTransform } from 'framer-motion';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export function Hero() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 350]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-16 md:px-8 md:py-24">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=100" 
          alt="Supercarro detalhado brilhante" 
          className="w-full h-full object-cover object-center scale-[1.03]" 
          style={{ filter: "brightness(0.35) contrast(1.1)" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neve-dark via-transparent to-transparent"></div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl mx-auto mt-4 md:mt-16"
      >
        <motion.p variants={itemVariants} className="text-neve-blue font-bold tracking-[0.3em] uppercase mb-6 text-xs md:text-sm font-heading">A excelência em cada milímetro</motion.p>
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-8 leading-[1.1] tracking-tight">
          Sua nave <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neve-blue to-white animate-shimmer">impecável.</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Estética automotiva premium. Proteção, limpeza profunda e vitrificação. Brilho extremo e cuidado em cada detalhe.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-10 md:mt-0">
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
  );
}
