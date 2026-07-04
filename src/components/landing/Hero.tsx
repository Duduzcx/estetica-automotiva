import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Coloque seu vídeo de detalhamento em /public/videos/hero-detalhamento.mp4
const VIDEO_LOCAL = '/videos/hero-detalhamento.mp4';
// Fallback para o site nunca quebrar enquanto o vídeo local não existe
const VIDEO_FALLBACK = 'https://res.cloudinary.com/demo/video/upload/v1689363065/docs/cars.mp4';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile (iOS/Android): destrava o vídeo no primeiro toque,
    // senão o navegador bloqueia o seek do currentTime
    const unlock = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    window.addEventListener('touchstart', unlock, { once: true });

    const setup = () => {
      const duration = video.duration || 5;
      // Proxy + lerp: em vez de setar currentTime direto (que engasga),
      // animamos um objeto e sincronizamos o vídeo suavemente
      const proxy = { time: 0 };

      // Vídeo travado na tela: o scroll avança o vídeo (só os primeiros ~4s)
      // e depois libera a página para as próximas seções
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%', // trava bem curta: 1 tela de scroll
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // O vídeo avança conforme o usuário rola (limitado a 4 segundos)
      tl.to(
        proxy,
        {
          time: Math.min(4, duration),
          ease: 'none',
          duration: 1,
          onUpdate: () => {
            if (Math.abs(video.currentTime - proxy.time) > 0.01) {
              video.currentTime = proxy.time;
            }
          },
        },
        0
      );

      // Texto sobe suave e some na primeira metade da trava (sem brigar com o Framer)
      tl.to(
        contentRef.current,
        { y: -60, opacity: 0, ease: 'none', duration: 0.5 },
        0
      );
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true });
    }

    return () => window.removeEventListener('touchstart', unlock);
  }, { scope: containerRef });

  const revealVariants: any = {
    hidden: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', y: 20 },
    visible: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      y: 0,
      transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1], staggerChildren: 0.2 },
    },
  };

  return (
    <section ref={containerRef} className="relative h-screen bg-black">
      {/* Viewport grudado: fica na tela enquanto a seção alta rola por trás */}
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
          className="w-full h-full object-cover opacity-60 will-change-[transform,filter,opacity]"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
      </div>

      {/* Content Layer — camada externa (GSAP) separada da interna (Framer) */}
      <div ref={contentRef} className="relative z-10 h-full will-change-[transform,opacity]">
      <motion.div
        variants={revealVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-5xl mx-auto px-6 h-full flex flex-col justify-center items-center"
      >
        <motion.div variants={revealVariants} className="overflow-hidden mb-6">
          <p className="text-neve-blue font-bold tracking-[0.3em] uppercase text-xs md:text-sm font-heading">A excelência em cada milímetro</p>
        </motion.div>

        <motion.div variants={revealVariants} className="overflow-hidden mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-white leading-[1.05] tracking-tight whitespace-normal break-words">
            Sua nave <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neve-blue to-white">impecável.</span>
          </h1>
        </motion.div>

        <motion.div variants={revealVariants} className="overflow-hidden mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed whitespace-normal break-words">
            Estética automotiva premium. Proteção, limpeza profunda e vitrificação. Brilho extremo e cuidado em cada detalhe.
          </p>
        </motion.div>

        <motion.div variants={revealVariants}>
          <a href="#agendamento" className="inline-flex items-center justify-center bg-white text-black hover:bg-neve-blue hover:text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-500 hover:-translate-y-1">
            Agendar Avaliação
          </a>
        </motion.div>
      </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/30 animate-pulse z-20 pointer-events-none">
        <p className="text-xs uppercase tracking-[0.3em] mb-4 text-center">Scroll para Imersão</p>
        <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
      </div>
      </div>
    </section>
  );
}
