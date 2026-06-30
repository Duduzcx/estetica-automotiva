import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function Gallery() {
  const portfolioItems = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
    { type: 'video', src: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 md:col-span-2 row-span-1' },
    { type: 'video', src: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-2' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1611821064430-0d40221e4e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1503376713175-3507c6414777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 md:col-span-2 row-span-1' },
  ];

  return (
    <section id="galeria" className="py-24 md:py-40 relative z-10 bg-neve-dark overflow-hidden">
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
          {portfolioItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10"></div>
              
              <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full"
              >
                <img src={item.src} alt={`Portfólio ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </motion.div>
              
              {item.type === 'video' && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-neve-blue group-hover:border-neve-blue transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(30,144,255,0.5)]">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
