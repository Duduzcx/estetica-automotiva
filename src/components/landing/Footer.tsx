import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neve-black border-t border-white/5 pt-24 pb-12 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <img src="/logo.png" alt="Neve na Nave" className="h-14 w-14 rounded-full shadow-[0_0_18px_rgba(30,144,255,0.35)]" />
              <span className="relative inline-block pt-[0.35em]">
                <svg aria-hidden="true" className="absolute -top-[0.55em] left-0 w-full h-[0.75em] z-10 pointer-events-none" viewBox="0 0 120 22" fill="none" preserveAspectRatio="none">
                  <ellipse cx="12" cy="16" rx="13" ry="7" fill="#eef2f7"/>
                  <ellipse cx="33" cy="11" rx="15" ry="9" fill="#ffffff"/>
                  <ellipse cx="58" cy="14" rx="16" ry="9" fill="#f8fafc"/>
                  <ellipse cx="83" cy="10" rx="14" ry="9" fill="#ffffff"/>
                  <ellipse cx="106" cy="15" rx="13" ry="7" fill="#eef2f7"/>
                  <circle cx="117" cy="5" r="2.2" fill="#ffffff"/>
                  <circle cx="3.5" cy="6" r="1.8" fill="#eef2f7"/>
                </svg>
                <span className="brand-text text-2xl relative">Neve na Nave</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">A referência definitiva em estética automotiva de alto padrão. Tratamos seu veículo como uma obra de arte.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 tracking-[0.1em] uppercase text-xs font-heading">Contato</h4>
            <ul className="text-gray-400 text-sm space-y-5 font-light">
              <li className="flex items-center"><MapPin className="w-5 h-5 text-neve-blue mr-3" /> Rua Delta, 537 - Jaguari, Santana de Parnaíba - SP</li>
              <li className="flex items-center"><Phone className="w-5 h-5 text-neve-blue mr-3" /> (11) 95046-7014</li>
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
