import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export function SocialProof() {
  const testimonials = [
    { name: "Ricardo Alves", text: "Trabalho impecável na minha BMW. O polimento técnico tirou todas as marcas de lavagem antiga e a vitrificação deixou um brilho que eu nunca tinha visto.", car: "BMW X6" },
    { name: "Mariana Souza", text: "Atendimento de elite. Fizeram a higienização interna e hidratação do couro da minha Evoque, ficou com cheiro de carro zero.", car: "Range Rover Evoque" },
    { name: "Carlos Mendes", text: "A aplicação do PPF frontal salvou minha pintura em uma viagem longa. Vale cada centavo pela paz de espírito. Recomendo de olhos fechados.", car: "Porsche 911" }
  ];

  return (
    <section className="py-16 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2 variants={itemVariants} className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Feedback dos Clientes</motion.h2>
          <motion.h3 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight text-white">Experiência Comprovada</motion.h3>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testi, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative"
            >
              <div className="flex space-x-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 font-light leading-relaxed mb-8 italic">"{testi.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 border border-white/20">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testi.name}</h4>
                  <p className="text-neve-blue text-sm">{testi.car}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
