import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export function Gallery() {
  const portfolioItems = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
    { type: 'video', src: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 md:col-span-2 row-span-1' },
    { type: 'video', src: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 row-span-2' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 row-span-1' },
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % portfolioItems.length);
    }
  };

  const prevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + portfolioItems.length) % portfolioItems.length);
    }
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <>
      <section id="galeria" ref={containerRef} className="py-24 md:py-40 relative z-10 bg-neve-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Galeria Imersiva</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Nossas Obras de Arte</h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-sm mt-6 md:mt-0 text-sm md:text-base"
            >
              Cada detalhe importa. Veja de perto o resultado do nosso perfeccionismo aplicado aos carros mais exclusivos.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
            {portfolioItems.map((item, idx) => {
              // Creating a staggered parallax effect based on column index
              const yParallax = useTransform(scrollYProgress, [0, 1], [100 - (idx % 3) * 50, -100 + (idx % 3) * 50]);
              
              return (
                <motion.div 
                  key={idx}
                  style={{ y: yParallax }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: (idx % 4) * 0.1, type: "spring", bounce: 0.3 }}
                  onClick={() => openLightbox(idx)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10 pointer-events-none"></div>
                  
                  <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full h-full pointer-events-none"
                  >
                    <img src={item.src} alt={`Portfólio ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </motion.div>
                  
                  {item.type === 'video' && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-neve-blue group-hover:border-neve-blue transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(30,144,255,0.5)]">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            <button 
              className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors z-50 p-4"
              onClick={prevItem}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button 
              className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors z-50 p-4"
              onClick={nextItem}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div 
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={portfolioItems[lightboxIndex].src} 
                alt="Zoomed" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              {portfolioItems[lightboxIndex].type === 'video' && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                      <Play className="w-8 h-8 fill-current ml-2" />
                    </div>
                 </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
