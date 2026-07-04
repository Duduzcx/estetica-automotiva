import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GalleryShowcase } from './GalleryShowcase';

gsap.registerPlugin(ScrollTrigger);

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  const portfolioItems = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 md:col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80', span: 'col-span-1 md:col-span-2 row-span-2', isFeatured: true },
    { type: 'image', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 md:col-span-2 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 row-span-2' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80', span: 'col-span-1 row-span-1' },
  ];

  useGSAP(() => {
    // Parallax on items
    const items = gsap.utils.toArray('.gallery-item');
    items.forEach((item: any) => {
      const isFeatured = item.dataset.featured === 'true';
      
      if (isFeatured) {
        gsap.fromTo(item, 
          { scale: 0.8, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            ease: "none", 
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100",
              end: "center center",
              scrub: 1
            }
          }
        );
      } else {
        gsap.fromTo(item, 
          { y: 100, opacity: 0, scale: 0.95 },
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
      }
    });

  }, { scope: sectionRef });

  return (
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
          {portfolioItems.slice(0, 4).map((item, idx) => (
            <div 
              key={idx}
              data-featured={item.isFeatured ? 'true' : 'false'}
              className={`gallery-item group relative rounded-2xl overflow-hidden cursor-default will-change-[transform,opacity] ${item.span}`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10 pointer-events-none"></div>
              
              <div className="w-full h-full pointer-events-none">
                <img src={item.src} alt={`Portfólio ${idx + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cena imersiva: expande pra tela cheia, arrasta, e solta */}
      <GalleryShowcase />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-8 auto-rows-[250px] md:auto-rows-[300px]">
          {portfolioItems.slice(4).map((item, idx) => (
            <div 
              key={idx}
              data-featured="false"
              className={`gallery-item group relative rounded-2xl overflow-hidden cursor-default will-change-[transform,opacity] ${item.span}`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10 pointer-events-none"></div>
              <div className="w-full h-full pointer-events-none">
                <img src={item.src} alt={`Portfólio ${idx + 5}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
