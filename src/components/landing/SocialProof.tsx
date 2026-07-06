import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: 'Ricardo Alves', text: 'Trabalho impecável na minha BMW. O polimento técnico tirou todas as marcas de lavagem antiga e deixou um brilho que eu nunca tinha visto.', car: 'BMW X6' },
  { name: 'Mariana Souza', text: 'Atendimento de elite. Fizeram a higienização interna e hidratação do couro da minha Evoque, ficou com cheiro de carro zero.', car: 'Range Rover Evoque' },
  { name: 'Carlos Mendes', text: 'Levei para descontaminação de pintura e coating. Vale cada centavo pela paz de espírito. Recomendo de olhos fechados.', car: 'Porsche 911' },
  { name: 'Fernanda Lima', text: 'A lavagem técnica detalhada é outro nível: cada cantinho limpo, plásticos revitalizados. Meu carro nunca mais foi em lava rápido comum.', car: 'VW Nivus' },
  { name: 'João Pedro', text: 'Restauraram meus faróis e fizeram o polimento comercial. Parecia que eu tinha trocado a frente do carro inteira. Preço justo demais.', car: 'Honda Civic' },
];

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);

    // Uma única animação leve: os cards deslizam pro lado com o scroll
    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pinWrapRef.current,
        pin: pinWrapRef.current,
        start: 'top top',
        end: () => '+=' + getDistance() * 0.9,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative z-10">
      <div ref={pinWrapRef} className="h-[100svh] flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full mb-10">
          <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Feedback dos Clientes</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Experiência Comprovada</h3>
          <p className="text-gray-500 text-xs uppercase tracking-[0.25em] mt-4 md:hidden">Deslize ⟶</p>
        </div>

        {/* Trilho horizontal */}
        <div ref={trackRef} className="flex gap-6 px-6 lg:px-8 w-max items-stretch will-change-transform">
          {testimonials.map((testi, idx) => (
            <div
              key={idx}
              className="w-[80vw] max-w-[300px] md:max-w-[420px] shrink-0 bg-[#0b1320] border border-white/10 rounded-3xl p-7 md:p-8 shadow-2xl relative"
            >
              <div className="flex space-x-1 mb-5">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 font-light leading-relaxed mb-7 italic text-sm md:text-base">"{testi.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 border border-white/20">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testi.name}</h4>
                  <p className="text-neve-blue text-sm">{testi.car}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
