import React from 'react';
import { MapPin, Clock, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tighter">Estética<span className="text-accent">Auto</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Elevando o padrão do cuidado automotivo com técnicas exclusivas, produtos premium e atenção obsessiva aos detalhes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-premium-dark flex items-center justify-center text-gray-400 hover:text-accent hover:bg-white/5 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-premium-dark flex items-center justify-center text-gray-400 hover:text-accent hover:bg-white/5 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg> {/* TikTok icon approx */}
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-premium-dark flex items-center justify-center text-gray-400 hover:text-accent hover:bg-white/5 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Serviços</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Vitrificação de Pintura</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Polimento Técnico</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Higienização de Couro</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Lavagem Detalhada</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Links Úteis</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Galeria de Resultados</a></li>
              <li><a href="#scheduling" className="hover:text-accent transition-colors">Agendar Avaliação</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contato</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="text-accent mr-3 mt-1 flex-shrink-0" />
                <span>Av. Fictícia, 1000 - Bairro Nobre<br/>São Paulo, SP</span>
              </li>
              <li className="flex items-start">
                <Clock size={16} className="text-accent mr-3 mt-1 flex-shrink-0" />
                <span>Segunda a Sábado<br/>08:00 às 18:00</span>
              </li>
              <li className="flex items-start mt-4">
                <Shield size={16} className="text-accent mr-3 mt-1 flex-shrink-0" />
                <span>Ambiente Monitorado e Seguro</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EstéticaAuto Premium. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            Desenvolvido com excelência.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
