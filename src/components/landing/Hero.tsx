import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_LOCAL = '/videos/hero-detalhamento.mp4';
const VIDEO_FALLBACK = 'https://res.cloudinary.com/demo/video/upload/v1689363065/docs/cars.mp4';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile: destrava o seek do vídeo no primeiro toque
    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    window.addEventListener('touchstart', unlock, { once: true });

    const setup = () => {
      const duration = video.duration || 5;
      const proxy = { time: 0 };

      // Trava curta da página (segura só um instante e solta)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=50%',
        pin: true,
        anticipatePin: 1,
      });

      // Vídeo com suavização própria (scrub alto): em vez de saltar
      // frame a frame com o dedo, ele desliza com inércia — fluido
      gsap.to(proxy, {
        time: Math.min(3, duration),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=50%',
          scrub: 1.2,
        },
        onUpdate: () => {
          if (Math.abs(video.currentTime - proxy.time) > 0.01) {
            video.currentTime = proxy.time;
          }
        },
      });

    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true });
    }

    return () => window.removeEventListener('touchstart', unlock);
  }, { scope: containerRef });

  // Entrada dos textos (Framer): reveal de baixo pra cima, escalonado
  const revealVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const containerVariants: any = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  return (
    <section ref={containerRef} className="relative h-screen bg-black">
      {/* Viewport grudado: o navegador segura isso na tela (liso, nativo) */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-neve-blue/20 blur-[150px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[150px] pointer-events-none z-0"></div>

        {/* Video Scrub Background */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <video
            ref={videoRef}
            src={VIDEO_LOCAL}
            onError={(e) => {
              const v = e.currentTarget;
              if (!v.src.includes('cloudinary')) v.src = VIDEO_FALLBACK;
            }}
            className="w-full h-full object-cover opacity-60"
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        </div>

        {/* Content Layer — GSAP só mexe na opacidade desta camada externa */}
        <div ref={contentRef} className="relative z-10 h-full will-change-[opacity]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl mx-auto px-6 h-full flex flex-col justify-center items-center"
          >
            <motion.p variants={revealVariants} className="text-neve-blue font-bold tracking-[0.3em] uppercase text-xs md:text-sm font-heading mb-6">
              A excelência em cada milímetro
            </motion.p>

            <motion.h1 variants={revealVariants} className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-white leading-[1.05] tracking-tight mb-8">
              Sua nave <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neve-blue to-white">impecável.</span>
            </motion.h1>

            <motion.p variants={revealVariants} className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Estética automotiva premium. Proteção, limpeza profunda e vitrificação. Brilho extremo e cuidado em cada detalhe.
            </motion.p>

            <motion.div variants={revealVariants}>
              <a href="#agendamento" className="inline-flex items-center justify-center bg-white text-black hover:bg-neve-blue hover:text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-500 hover:-translate-y-1">
                Agendar Avaliação
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 animate-pulse z-20 pointer-events-none">
          <p className="text-xs uppercase tracking-[0.3em] mb-3 text-center">Deslize</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
