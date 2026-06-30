import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { 
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 }
  }
};

export function Gallery() {
  const portfolioItems = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
    { type: 'video', src: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', span: 'col-span-1 md:col-span-2 row-span-1' },
  ];

  return (
    <section id="galeria" className="py-16 md:py-32 relative z-10 bg-black/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16 md:mb-24"
        >
          <motion.h2 variants={itemVariants} className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Galeria Imersiva</motion.h2>
          <motion.h3 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight text-white">Nossas Obras de Arte</motion.h3>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 md:gap-6 auto-rows-[250px]"
        >
          {portfolioItems.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
              <img src={item.src} alt={`Portfólio ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              {item.type === 'video' && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-neve-blue/80 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-neve-blue group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(30,144,255,0.5)]">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
