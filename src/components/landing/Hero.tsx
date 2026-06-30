import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Check if video exists and is loaded
    const video = videoRef.current;
    
    if (video) {
      // Ensure video data is loaded before setting up scroll trigger
      const setupScrollTrigger = () => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5, // Smooth scrubbing
            pin: true,  // Pin the hero section while scrubbing
          }
        });

        tl.to(video, {
          currentTime: video.duration || 5, // fallback duration if not fully loaded
          ease: "none"
        }, 0);

        tl.to(contentRef.current, {
          y: 200,
          opacity: 0,
          ease: "power1.inOut"
        }, 0);
      };

      if (video.readyState >= 1) {
        setupScrollTrigger();
      } else {
        video.addEventListener('loadedmetadata', setupScrollTrigger);
        return () => video.removeEventListener('loadedmetadata', setupScrollTrigger);
      }
    }
  }, { scope: containerRef });

  const revealVariants: any = {
    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 20 },
    visible: { 
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
      y: 0,
      transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1], staggerChildren: 0.2 }
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen bg-neve-dark overflow-hidden">
      
      {/* Video Scrub Layer */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video 
          ref={videoRef}
          src="https://assets.mixkit.co/videos/preview/mixkit-car-washing-in-a-dark-garage-41006-large.mp4" 
          className="w-full h-full object-cover opacity-50"
          muted 
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neve-dark via-neve-dark/40 to-transparent"></div>
      </div>

      {/* Content Layer */}
      <motion.div 
        ref={contentRef}
        variants={revealVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl mx-auto px-6 h-full flex flex-col justify-center items-center"
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

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/30 animate-pulse z-20">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-center">Scroll para Imersão</p>
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
      </div>
      
    </section>
  );
}
