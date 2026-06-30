import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neve-black border-t border-white/5 pt-24 pb-12 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase mb-6 font-heading">Neve<span className="text-neve-blue">na Nave</span></span>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">A referência definitiva em estética automotiva de alto padrão. Tratamos seu veículo como uma obra de arte.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 tracking-[0.1em] uppercase text-xs font-heading">Contato</h4>
            <ul className="text-gray-400 text-sm space-y-5 font-light">
              <li className="flex items-center"><MapPin className="w-5 h-5 text-neve-blue mr-3" /> 📍 Santana de Parnaíba - SP</li>
              <li className="flex items-center"><Phone className="w-5 h-5 text-neve-blue mr-3" /> (11) 99999-9999</li>
              <li className="flex items-center"><Mail className="w-5 h-5 text-neve-blue mr-3" /> contato@nevenanave.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 tracking-[0.1em] uppercase text-xs font-heading">Redes Sociais</h4>
            <div className="flex space-x-5">
              <a href="https://www.instagram.com/nevenanavee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-neve-dark border border-white/5 flex items-center justify-center text-white hover:bg-neve-blue hover:text-white hover:border-neve-blue transition-all duration-300"><i className="fa-brands fa-instagram text-xl"></i></a>
              <a href="#" className="w-12 h-12 rounded-full bg-neve-dark border border-white/5 flex items-center justify-center text-white hover:bg-neve-blue hover:text-white hover:border-neve-blue transition-all duration-300"><i className="fa-brands fa-tiktok text-xl"></i></a>
              <a href="#" className="w-12 h-12 rounded-full bg-neve-dark border border-white/5 flex items-center justify-center text-white hover:bg-neve-blue hover:text-white hover:border-neve-blue transition-all duration-300"><i className="fa-brands fa-youtube text-xl"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light">
          <p>&copy; {new Date().getFullYear()} Neve na Nave. Todos os direitos reservados.</p>
          <p className="mt-6 md:mt-0 font-medium tracking-wide">
            Desenvolvido por <a href="#" className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 font-bold tracking-[0.15em] hover:from-neve-blue hover:via-[#fff3b8] hover:to-neve-blue transition-all duration-700 cursor-pointer animate-shimmer">ZcxPages</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
