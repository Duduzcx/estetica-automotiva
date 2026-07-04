import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Shield, Sparkles, Car, Droplets, Layers, Lightbulb, Settings, Disc,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { title: 'Vitrificação Cerâmica', Icon: Shield, desc: 'Proteção de até 5 anos com dureza 9H. Brilho espelhado e repelência extrema.' },
  { title: 'Polimento Técnico', Icon: Sparkles, desc: 'Correção de verniz em multiníveis. Remoção de riscos, hologramas e marcas.' },
  { title: 'Higienização Interna', Icon: Car, desc: 'Limpeza detalhada, hidratação de couro e oxi-sanitização para eliminar odores.' },
  { title: 'Lavagem Detalhada', Icon: Droplets, desc: 'Processo artesanal com snow foam, pincéis de detalhamento e ceras premium.' },
  { title: 'Aplicação de PPF', Icon: Layers, desc: 'A armadura transparente definitiva contra pedras, riscos e desgastes externos.' },
  { title: 'Restauração de Faróis', Icon: Lightbulb, desc: 'Devolvemos a transparência original e aplicamos proteção UV prolongada.' },
  { title: 'Detalhamento de Motor', Icon: Settings, desc: 'Limpeza a seco meticulosa e condicionamento de borrachas para proteção.' },
  { title: 'Proteção de Rodas', Icon: Disc, desc: 'Coating cerâmico para rodas, evitando impregnação de pó de freio e sujeira pesada.' },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop: pin + scroll horizontal cinematográfico
    mm.add('(min-width: 768px)', () => {
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
        scrub: 0.4,
        end: () => '+=' + getTotalWidth(),
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
          end: () => '+=' + getTotalWidth(),
          scrub: 0.3,
        },
      }
    );

    // Foco nos cards: apenas opacidade + escala (SEM blur —
    // filtros no scrub travam e causam artefatos em celular)
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0.55, scale: 0.95 });

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
        scale: 0.95,
        opacity: 0.55,
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
    });
    // Celular: sem pin nenhum — o carrossel é nativo (arrastar com o dedo)
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

      <div ref={pinWrapRef} className="py-16 md:py-0 md:h-screen flex flex-col justify-center md:pt-16">

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
        <div ref={containerRef} className="flex gap-6 px-6 lg:px-16 pb-14 items-stretch overflow-x-auto snap-x snap-mandatory md:overflow-visible md:w-max [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {servicesData.map(({ title, desc, Icon }, idx) => (
            <div
              key={idx}
              className="service-card snap-center group relative w-[82vw] max-w-[320px] md:max-w-[440px] md:w-[440px] shrink-0 p-7 md:p-10 rounded-[2rem] bg-white border border-gray-100 shadow-[0_20px_60px_-20px_rgba(15,40,80,0.12)] cursor-pointer overflow-hidden transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(30,144,255,0.25)]"
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
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light whitespace-normal break-words mb-8">
                {desc}
              </p>

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
