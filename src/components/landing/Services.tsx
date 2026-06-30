import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.service-card');
    
    // Calculate total width needed to scroll
    const getTotalWidth = () => {
      let width = 0;
      cards.forEach((card: any) => {
        width += card.offsetWidth;
      });
      width += (cards.length - 1) * 24; // gap
      return width;
    };

    let scrollTween = gsap.to(containerRef.current, {
      x: () => -(getTotalWidth() - window.innerWidth + 200),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.5,
        end: () => "+=" + (getTotalWidth() * 2), // Dobro da distância para um scroll mais lento e suave
        invalidateOnRefresh: true
      }
    });

    // Focus & Blur effect on cards as they come into the center of the screen
    cards.forEach((card: any) => {
      // Set initial inactive state
      gsap.set(card, { opacity: 0.4, scale: 0.9, filter: "blur(4px)" });
      
      gsap.to(card, {
        scale: 1.05,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: "left center+=400", // Fica nítido mais cedo
          end: "center center",
          scrub: 1.5,
        }
      });

      // Fade out and blur again when leaving the center
      gsap.to(card, {
        scale: 0.9,
        opacity: 0.4,
        filter: "blur(4px)",
        ease: "power2.in",
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: "center center-=400", // Só começa a embaçar quando já está bem à esquerda
          end: "right center-=500",
          scrub: 1.5,
        }
      });
    });
  }, { scope: sectionRef });

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
    <section ref={sectionRef} id="servicos" className="relative bg-white overflow-hidden">
      <div ref={wrapperRef} className="h-screen flex flex-col justify-center pt-20">
        
        <div className="px-6 lg:px-16 mb-12 shrink-0">
          <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">
            Nosso Portfólio
          </h2>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 whitespace-normal break-words max-w-4xl">
            Serviços Premium
          </h3>
        </div>

        {/* This container will slide left */}
        <div ref={containerRef} className="flex gap-6 px-6 lg:px-16 pb-12 w-max">
          {servicesData.map((srv, idx) => (
            <div 
              key={idx}
              className="service-card group relative w-[85vw] max-w-[320px] md:max-w-[450px] md:w-[450px] shrink-0 p-6 md:p-10 rounded-[2rem] bg-gray-50 border border-gray-200 cursor-pointer will-change-[transform,filter,opacity]"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-8 text-neve-blue text-xl md:text-2xl transition-all duration-500 group-hover:bg-neve-blue group-hover:text-white">
                <i className={srv.icon}></i>
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 tracking-wide group-hover:text-neve-blue transition-colors whitespace-normal break-words">{srv.title}</h4>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light whitespace-normal break-words">{srv.desc}</p>
              
              <div className="absolute top-6 right-6 md:top-8 md:right-8 text-gray-200 text-4xl md:text-5xl font-bold font-heading group-hover:text-gray-300 transition-colors">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
