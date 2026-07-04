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
    const section = sectionRef.current;
    if (!section) return;

    // ── 1. Transição suave de cor: o fundo "clareia" do preto ao branco
    // conforme a seção entra na tela (mata a quebra seca preto → branco)
    gsap.fromTo(
      section,
      { backgroundColor: '#050505' },
      {
        backgroundColor: '#ffffff',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top -10%',
          scrub: true,
        },
      }
    );

    // Títulos acompanham: nascem brancos no fundo escuro e escurecem junto
    gsap.fromTo(
      '.services-title',
      { color: '#ffffff' },
      {
        color: '#111827',
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: 'top 90%',
          end: 'top 30%',
          scrub: true,
        },
      }
    );

    // ── 2. Scroll horizontal com pinning
    const cards = gsap.utils.toArray<HTMLElement>('.service-card');

    const getTotalWidth = () => {
      let width = 0;
      cards.forEach((card) => (width += card.offsetWidth));
      width += (cards.length - 1) * 24; // gap
      return width;
    };

    const scrollTween = gsap.to(containerRef.current, {
      x: () => -(getTotalWidth() - window.innerWidth + 200),
      ease: 'none',
      scrollTrigger: {
        trigger: pinWrapRef.current,
        pin: pinWrapRef.current,
        start: 'top top',
        scrub: 0.4,
        end: () => '+=' + getTotalWidth(),
        invalidateOnRefresh: true,
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

    // ── 3. Foco e desfoque dos cards no centro da tela
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0.45, scale: 0.94, filter: 'blur(3px)' });

      gsap.to(card, {
        scale: 1.03,
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: 'left center+=400',
          end: 'center center',
          scrub: 0.5,
        },
      });

      gsap.to(card, {
        scale: 0.94,
        opacity: 0.45,
        filter: 'blur(3px)',
        ease: 'power2.in',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: 'center center-=400',
          end: 'right center-=500',
          scrub: 0.5,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="servicos" className="relative" style={{ backgroundColor: '#050505' }}>

      {/* Transição compacta: o fundo clareia enquanto a página desliza livre */}
      <div className="py-16 md:py-20 flex flex-col items-center justify-center text-center px-6">
        <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-neve-blue to-transparent mb-6"></div>
        <p className="text-neve-blue font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 font-heading">Do escuro ao brilho</p>
        <p className="services-title text-2xl md:text-4xl font-bold max-w-2xl leading-snug" style={{ color: '#ffffff' }}>
          Cada detalhe do seu carro merece um processo à altura.
        </p>
      </div>

      <div ref={pinWrapRef} className="h-screen flex flex-col justify-center pt-20 overflow-hidden">

        <div className="px-6 lg:px-16 mb-10 shrink-0 flex items-end justify-between gap-8">
          <div>
            <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">
              Nosso Portfólio
            </h2>
            <h3 className="services-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight whitespace-normal break-words max-w-4xl" style={{ color: '#ffffff' }}>
              Serviços Premium
            </h3>
          </div>

          {/* Barra de progresso do carrossel */}
          <div className="hidden md:block w-48 shrink-0 mb-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-2 text-right">Deslize</p>
            <div className="h-[3px] w-full bg-gray-200/40 rounded-full overflow-hidden">
              <div className="services-progress h-full w-full bg-neve-blue rounded-full origin-left" style={{ transform: 'scaleX(0)' }}></div>
            </div>
          </div>
        </div>

        {/* Container que desliza horizontalmente */}
        <div ref={containerRef} className="flex gap-6 px-6 lg:px-16 pb-14 w-max items-stretch">
          {servicesData.map(({ title, desc, Icon }, idx) => (
            <div
              key={idx}
              className="service-card group relative w-[85vw] max-w-[320px] md:max-w-[440px] md:w-[440px] shrink-0 p-7 md:p-10 rounded-[2rem] bg-white border border-gray-100 shadow-[0_20px_60px_-20px_rgba(15,40,80,0.12)] cursor-pointer overflow-hidden will-change-[transform,filter,opacity] transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(30,144,255,0.25)]"
            >
              {/* Brilho sutil no topo do card */}
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-neve-blue/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              {/* Número marca d'água */}
              <div className="absolute top-6 right-7 md:top-8 md:right-9 text-5xl md:text-6xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-100 group-hover:from-neve-blue/30 group-hover:to-transparent transition-all duration-500 select-none">
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Ícone */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-neve-blue to-blue-400 text-white shadow-lg shadow-blue-500/25 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              <h4 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 tracking-wide group-hover:text-neve-blue transition-colors whitespace-normal break-words">
                {title}
              </h4>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light whitespace-normal break-words mb-8">
                {desc}
              </p>

              {/* CTA discreto */}
              <a href="#agendamento" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-neve-blue transition-colors">
                Agendar este serviço
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Linha de acento que cresce no hover */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-neve-blue to-blue-300 group-hover:w-full transition-all duration-700 ease-organic"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Saída suave para a próxima seção escura (gradiente alto, sem borda dura) */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-neve-dark via-neve-dark/40 to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}
