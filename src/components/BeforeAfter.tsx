import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-24 bg-premium-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">A Transformação em <span className="text-accent">Detalhes</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Arraste para visualizar a diferença que um tratamento premium pode fazer na pintura do seu veículo.</p>
        </motion.div>

        <motion.div 
          className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none border border-white/10"
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={onMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={onTouchMove}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* AFTER Image (Background) - The perfect one */}
          <img 
            src="/hero-bg.png" 
            alt="Depois do Tratamento" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-white/90 text-sm font-semibold border border-white/10 z-10">
            Depois (Vitrificado)
          </div>

          {/* BEFORE Image (Clipped) - Using CSS filters to simulate bad paint */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img 
              src="/hero-bg.png" 
              alt="Antes do Tratamento" 
              className="absolute inset-0 w-full h-full object-cover grayscale-[30%] saturate-50 contrast-75 brightness-75 blur-[0.5px]"
            />
            <div className="absolute inset-0 bg-black/20" /> {/* Extra layer of dullness */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-white/70 text-sm font-semibold border border-white/10 z-10">
              Antes
            </div>
          </div>

          {/* Slider Line and Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-accent/80 cursor-ew-resize pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.6)]"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-premium-dark border-2 border-accent rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BeforeAfter;
