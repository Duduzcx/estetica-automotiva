import { motion } from 'framer-motion';
import {
  Shield, Sparkles, Car, Droplets, Layers, Lightbulb, Settings, Disc,
  ArrowRight,
} from 'lucide-react';
import { SERVICOS, precoLabel, type ServicoId } from '../../lib/servicos';

const DESC: Record<ServicoId, { Icon: any; desc: string }> = {
  polimento_tecnico:   { Icon: Sparkles,  desc: 'Correção de verniz em multiníveis. Remove riscos, hologramas e marcas profundas.' },
  polimento_comercial: { Icon: Sparkles,  desc: 'Renovação rápida de brilho para realçar a pintura no dia a dia.' },
  restauracao_farois:  { Icon: Lightbulb, desc: 'Transparência original de volta, com proteção UV prolongada.' },
  higienizacao:        { Icon: Car,       desc: 'Limpeza interna profunda, hidratação e eliminação de odores.' },
  descont_vidros:      { Icon: Droplets,  desc: 'Remove chuva ácida, minerais e manchas — visão cristalina.' },
  descont_pintura:     { Icon: Layers,    desc: 'Elimina partículas cravadas que a lavagem comum não tira.' },
  cristalizacao:       { Icon: Shield,    desc: 'Repelência de água nos vidros: muito mais segurança na chuva.' },
  limpeza_motor:       { Icon: Settings,  desc: 'Cofre do motor limpo e conservado, com produtos seguros.' },
  revit_plasticos:     { Icon: Disc,      desc: 'Plásticos externos com cor e viço de carro novo.' },
  coating:             { Icon: Shield,    desc: 'Camada de proteção cerâmica com brilho intenso e duradouro.' },
  planos:              { Icon: Sparkles,  desc: 'Sua nave sempre impecável com cuidados recorrentes.' },
  lavagem_detalhada:   { Icon: Droplets,  desc: 'Processo artesanal completo, cantinho por cantinho.' },
  lavagem_entrada:     { Icon: Droplets,  desc: 'Lavagem cuidadosa e caprichada para o dia a dia.' },
};

const FOTOS: Record<ServicoId, string> = {
  polimento_tecnico: '/gallery/card-polimento.jpg',
  polimento_comercial: '/gallery/classico-vw.jpg',
  restauracao_farois: '/gallery/nivus.jpg',
  higienizacao: '/gallery/interior-mercedes.jpg',
  descont_vidros: '/gallery/card-civic.jpg',
  descont_pintura: '/gallery/card-mercedes.jpg',
  cristalizacao: '/gallery/card-civic.jpg',
  limpeza_motor: '/gallery/card-polimento.jpg',
  revit_plasticos: '/gallery/card-lancer.jpg',
  coating: '/gallery/card-mercedes.jpg',
  planos: '/gallery/fachada.jpg',
  lavagem_detalhada: '/gallery/estudio-bmw.jpg',
  lavagem_entrada: '/gallery/fachada.jpg',
};

const servicesData = (Object.keys(SERVICOS) as ServicoId[]).map(id => ({
  title: SERVICOS[id].nome,
  Icon: DESC[id].Icon,
  desc: DESC[id].desc,
  preco: precoLabel(id),
  foto: FOTOS[id],
}));

export function Services() {
  return (
    <section
      id="servicos"
      className="relative z-10 bg-white rounded-t-[2.5rem] -mt-10 overflow-hidden"
    >
      {/* Alça decorativa no topo da "folha" branca */}
      <div className="pt-5 pb-0 flex justify-center">
        <div className="w-12 h-1.5 rounded-full bg-gray-200"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">
            Nosso Portfólio
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Serviços Premium
          </h3>
        </div>

        {/* Grade organizada: leve, sem travas de scroll */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
          {servicesData.map(({ title, desc, Icon, preco, foto }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (idx % 2) * 0.06, ease: 'easeOut' }}
              className="group relative rounded-2xl md:rounded-[1.75rem] bg-white border border-gray-100 shadow-[0_16px_50px_-24px_rgba(15,40,80,0.16)] overflow-hidden hover:shadow-[0_24px_60px_-20px_rgba(30,144,255,0.22)] transition-shadow duration-500"
            >
              {/* Foto de fundo com véu branco pra leitura */}
              <div className="absolute inset-0 pointer-events-none">
                <img src={foto} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/60 group-hover:via-white/85 group-hover:to-white/45 transition-colors duration-500"></div>
              </div>
              <a href="#agendamento" className="relative block p-4 md:p-7 h-full">
                <div className="hidden md:block absolute top-5 right-6 text-4xl font-bold font-heading text-gray-100 group-hover:text-neve-blue/20 transition-colors duration-500 select-none">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className="relative w-10 h-10 md:w-13 md:h-13 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-5 bg-gradient-to-br from-neve-blue to-blue-400 text-white shadow-lg shadow-blue-500/25 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="w-4 h-4 md:w-6 md:h-6" />
                </div>

                <h4 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-gray-900 leading-snug group-hover:text-neve-blue transition-colors">
                  {title}
                </h4>
                <p className="hidden md:block text-gray-600 text-sm leading-relaxed font-light mb-3">
                  {desc}
                </p>
                <p className="text-neve-blue font-bold text-xs md:text-base">{preco}</p>

                <span className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-neve-blue transition-colors mt-4">
                  Agendar este serviço
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-neve-blue to-blue-300 group-hover:w-full transition-all duration-700"></div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
