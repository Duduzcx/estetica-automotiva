import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Services() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Moves the content container left. The 'vw' calculation ensures we don't scroll past the content end on various screens.
  // Assuming 8 cards of ~320px/450px + gaps.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

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
    <section ref={targetRef} id="servicos" className="relative h-[300vh] bg-neve-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20">
        
        <div className="px-6 lg:px-16 mb-12 shrink-0">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading"
          >
            Nosso Portfólio
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white whitespace-normal break-words max-w-4xl"
          >
            Serviços Premium
          </motion.h3>
        </div>

        <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-6 lg:px-16 pb-12 w-max">
          {servicesData.map((srv, idx) => (
            <div 
              key={idx}
              className="group relative w-[85vw] max-w-[320px] md:max-w-[450px] md:w-[450px] p-6 md:p-10 rounded-[2rem] bg-neve-card/60 backdrop-blur-xl border border-white/5 cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(30,144,255,0.15)] hover:bg-white/5"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-neve-blue text-xl md:text-2xl transition-all duration-500 group-hover:bg-neve-blue group-hover:text-white">
                <i className={srv.icon}></i>
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white tracking-wide group-hover:text-neve-blue transition-colors whitespace-normal break-words">{srv.title}</h4>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light whitespace-normal break-words">{srv.desc}</p>
              
              <div className="absolute top-6 right-6 md:top-8 md:right-8 text-white/10 text-4xl md:text-5xl font-bold font-heading group-hover:text-white/20 transition-colors">
                0{idx + 1}
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
