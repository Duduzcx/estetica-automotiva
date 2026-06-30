import { motion } from 'framer-motion';

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

export function Services() {
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
  );
}
