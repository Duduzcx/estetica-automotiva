import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const portfolioItems = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
    { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-mechanic-polishing-a-car-40995-large.mp4', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 md:col-span-2 row-span-1' },
    { type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-car-washing-in-a-dark-garage-41006-large.mp4', span: 'col-span-1 row-span-2' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 row-span-1' },
  ];

  useGSAP(() => {
    // Parallax on images
    const items = gsap.utils.toArray('.gallery-item');
    items.forEach((item: any) => {
      gsap.fromTo(item, 
        { y: 100, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          ease: "power2.out", 
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Scrubbing for videos
    videoRefs.current.forEach((video) => {
      if (!video) return;
      
      const setupVideoScrub = () => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: video,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        });
        tl.to(video, { currentTime: video.duration || 3, ease: "none" });
      };

      if (video.readyState >= 1) {
        setupVideoScrub();
      } else {
        video.addEventListener('loadedmetadata', setupVideoScrub);
      }
    });
  }, { scope: sectionRef });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % portfolioItems.length);
  };
  const prevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + portfolioItems.length) % portfolioItems.length);
  };

  return (
    <>
      <section id="galeria" ref={sectionRef} className="py-24 md:py-40 relative z-10 bg-neve-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
            <div>
              <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Galeria Imersiva</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Nossas Obras de Arte</h3>
            </div>
            <p className="text-gray-400 max-w-sm mt-6 md:mt-0 text-sm md:text-base">
              Cada detalhe importa. Veja de perto o resultado do nosso perfeccionismo aplicado aos carros mais exclusivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-8 auto-rows-[250px] md:auto-rows-[300px]">
            {portfolioItems.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => openLightbox(idx)}
                className={`gallery-item group relative rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10 pointer-events-none"></div>
                
                <div className="w-full h-full pointer-events-none">
                  {item.type === 'image' ? (
                    <img src={item.src} alt={`Portfólio ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  ) : (
                    <video 
                      ref={el => { videoRefs.current[idx] = el; }}
                      src={item.src} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80" 
                      muted 
                      playsInline 
                    />
                  )}
                </div>
                
                {item.type === 'video' && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-neve-blue group-hover:border-neve-blue transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(30,144,255,0.5)]">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeLightbox}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2" onClick={closeLightbox}>
              <X className="w-8 h-8" />
            </button>
            <button className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors z-50 p-4" onClick={prevItem}>
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors z-50 p-4" onClick={nextItem}>
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="max-w-[90vw] max-h-[85vh] relative animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
              {portfolioItems[lightboxIndex].type === 'image' ? (
                <img src={portfolioItems[lightboxIndex].src} alt="Zoomed" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
              ) : (
                <video src={portfolioItems[lightboxIndex].src} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" controls autoPlay />
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
