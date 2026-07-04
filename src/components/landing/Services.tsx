import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Shield, Sparkles, Car, Droplets, Layers, Lightbulb, Settings, Disc,
  ArrowRight,
} from 'lucide-react';
import { SERVICOS, precoLabel, type ServicoId } from '../../lib/servicos';

gsap.registerPlugin(ScrollTrigger);

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

const servicesData = (Object.keys(SERVICOS) as ServicoId[]).map(id => ({
  title: SERVICOS[id].nome,
  Icon: DESC[id].Icon,
  desc: DESC[id].desc,
  preco: precoLabel(id),
}));

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.service-card');

    const getTotalWidth = () => {
      let width = 0;
      cards.forEach((card) => (width += card.offsetWidth));
      width += (cards.length - 1) * 24; // gap
      return width;
    };

    // Scroll horizontal com pinning (sem tranco: anticipatePin)
    const scrollTween = gsap.to(containerRef.current, {
      x: () => -(getTotalWidth() - window.innerWidth + 100),
      ease: 'none',
      scrollTrigger: {
        trigger: pinWrapRef.current,
        pin: pinWrapRef.current,
        start: 'top top',
        scrub: 1,
        end: () => '+=' + getTotalWidth() * 0.85,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // Barra de progresso do carrossel
    gsap.fromTo(
      '.services-progress',
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: 'top top',
          end: () => '+=' + getTotalWidth() * 0.85,
          scrub: 0.3,
        },
      }
    );

    // Foco nos cards: apenas opacidade + escala (SEM blur —
    // filtros no scrub travam e causam artefatos em celular)
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0.6, scale: 0.96 });

      gsap.to(card, {
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: 'left center+=350',
          end: 'center center',
          scrub: 0.4,
        },
      });

      gsap.to(card, {
        scale: 0.96,
        opacity: 0.6,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: 'center center-=350',
          end: 'right center-=450',
          scrub: 0.4,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="relative z-10 bg-white rounded-t-[2.5rem] -mt-10 overflow-hidden"
    >
      {/* Alça decorativa no topo da "folha" branca */}
      <div className="pt-5 pb-0 flex justify-center">
        <div className="w-12 h-1.5 rounded-full bg-gray-200"></div>
      </div>

      <div ref={pinWrapRef} className="h-screen flex flex-col justify-center pt-16">

        <div className="px-6 lg:px-16 mb-10 shrink-0 flex items-end justify-between gap-8">
          <div>
            <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">
              Nosso Portfólio
            </h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 whitespace-normal break-words max-w-4xl">
              Serviços Premium
            </h3>
          </div>

          {/* Barra de progresso do carrossel (desktop) */}
          <div className="hidden md:block w-48 shrink-0 mb-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-2 text-right">Deslize</p>
            <div className="h-[3px] w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="services-progress h-full w-full bg-neve-blue rounded-full origin-left" style={{ transform: 'scaleX(0)' }}></div>
            </div>
          </div>
        </div>

        {/* Container que desliza horizontalmente */}
        <div ref={containerRef} className="flex gap-6 px-6 lg:px-16 pb-14 w-max items-stretch">
          {servicesData.map(({ title, desc, Icon, preco }, idx) => (
            <div
              key={idx}
              className="service-card group relative w-[82vw] max-w-[320px] md:max-w-[440px] md:w-[440px] shrink-0 p-7 md:p-10 rounded-[2rem] bg-white border border-gray-100 shadow-[0_20px_60px_-20px_rgba(15,40,80,0.12)] cursor-pointer overflow-hidden transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(30,144,255,0.25)]"
            >
              <div className="absolute top-6 right-7 md:top-8 md:right-9 text-5xl md:text-6xl font-bold font-heading text-gray-100 group-hover:text-neve-blue/20 transition-colors duration-500 select-none">
                {String(idx + 1).padStart(2, '0')}
              </div>

              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-neve-blue to-blue-400 text-white shadow-lg shadow-blue-500/25 transition-transform duration-500 group-hover:scale-110">
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              <h4 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 tracking-wide group-hover:text-neve-blue transition-colors whitespace-normal break-words">
                {title}
              </h4>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light whitespace-normal break-words mb-4">
                {desc}
              </p>
              <p className="text-neve-blue font-bold text-base md:text-lg mb-6">{preco}</p>

              <a href="#agendamento" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-neve-blue transition-colors">
                Agendar este serviço
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-neve-blue to-blue-300 group-hover:w-full transition-all duration-700 ease-organic"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
