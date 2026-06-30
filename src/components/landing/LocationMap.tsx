import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export function LocationMap() {
  return (
    <section className="py-16 md:py-32 relative z-10 bg-neve-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <h2 className="text-neve-blue font-bold tracking-[0.2em] uppercase text-xs mb-4 font-heading">Nossa Localização</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight text-white">Onde a <br/>Mágica Acontece</h3>
            <p className="text-gray-400 text-lg mb-10 font-light leading-relaxed">
              Estamos localizados em um ponto estratégico para atender os clientes mais exigentes da região. Venha conhecer nosso estúdio e tomar um café enquanto avaliamos sua nave.
            </p>
            
            <div className="bg-neve-dark/80 border border-white/5 rounded-2xl p-6 mb-8 flex items-start">
              <div className="w-12 h-12 bg-neve-blue/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin className="text-neve-blue w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Endereço Premium</h4>
                <p className="text-gray-400">Av. das Estrelas, 1000 - Alphaville<br/>Santana de Parnaíba - SP, 06500-000</p>
              </div>
            </div>

            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:border-neve-blue/50 group"
            >
              <Navigation className="w-4 h-4 mr-2 group-hover:text-neve-blue transition-colors" />
              Como Chegar
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="h-[400px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 relative"
          >
            <div className="absolute inset-0 bg-neve-blue/10 pointer-events-none z-10 mix-blend-overlay"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117032.54011885816!2d-47.01693836171542!3d-23.46513251503378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf02517830b05b%3A0xc3f60f644b93fb7a!2sSantana%20de%20Parna%C3%ADba%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1689871141753!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(80%)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
