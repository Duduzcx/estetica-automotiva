import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neve-black border-t border-white/5 pt-24 pb-12 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <img src="/logo-mark.png" alt="Neve na Nave" className="h-14 w-auto drop-shadow-[0_0_14px_rgba(30,144,255,0.45)]" />
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
              <li className="flex items-center"><Mail className="w-5 h-5 text-neve-blue mr-3" /><a href="https://www.instagram.com/nevenanavee" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">@nevenanavee</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 tracking-[0.1em] uppercase text-xs font-heading">Redes Sociais</h4>
            <div className="flex space-x-5">
              <a href="https://www.instagram.com/nevenanavee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-full bg-neve-dark border border-white/5 flex items-center justify-center text-white hover:bg-neve-blue hover:text-white hover:border-neve-blue transition-all duration-300">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.14 0-3.5.01-4.74.07-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.34.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.83.18.46.4.79.74 1.13.34.34.67.56 1.13.74.35.14.87.3 1.83.34 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.4 1.13-.74.34-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.83a3 3 0 0 0-.74-1.13 3 3 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34-1.24-.06-1.6-.07-4.74-.07zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm4.7-2a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"/></svg>
              </a>
              <a href="#" aria-label="TikTok" className="w-12 h-12 rounded-full bg-neve-dark border border-white/5 flex items-center justify-center text-white hover:bg-neve-blue hover:text-white hover:border-neve-blue transition-all duration-300">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16.6 2h-3.2v13.7c0 1.5-1.2 2.7-2.7 2.7a2.7 2.7 0 0 1-2.7-2.7c0-1.5 1.2-2.7 2.7-2.7.3 0 .6.05.85.13V9.8a5.9 5.9 0 0 0-.85-.06 5.9 5.9 0 1 0 5.9 5.9V8.9c1.2.86 2.68 1.37 4.27 1.37V7.06c-2.1 0-3.9-1.4-4.3-3.36-.02-.1-.02-.6-.02-.6z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-12 h-12 rounded-full bg-neve-dark border border-white/5 flex items-center justify-center text-white hover:bg-neve-blue hover:text-white hover:border-neve-blue transition-all duration-300">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.6-.46-5.32a2.9 2.9 0 0 0-2.05-2.05C18.77 4.17 12 4.17 12 4.17s-6.77 0-8.49.46A2.9 2.9 0 0 0 1.46 6.68C1 8.4 1 12 1 12s0 3.6.46 5.32a2.9 2.9 0 0 0 2.05 2.05c1.72.46 8.49.46 8.49.46s6.77 0 8.49-.46a2.9 2.9 0 0 0 2.05-2.05C23 15.6 23 12 23 12zM9.75 15.5v-7l6 3.5-6 3.5z"/></svg>
              </a>
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
