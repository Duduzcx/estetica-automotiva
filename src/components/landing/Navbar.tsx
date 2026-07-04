import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Menu, X, Shield, Car, Sparkles, Droplets, Calendar, MapPin } from 'lucide-react';

interface NavbarProps {
  onDashboardClick: () => void;
}

const LINKS = [
  { label: 'Início', href: '#inicio', Icon: Car },
  { label: 'Serviços', href: '#servicos', Icon: Sparkles },
  { label: 'Galeria', href: '#galeria', Icon: Droplets },
  { label: 'Agendamento', href: '#agendamento', Icon: Calendar },
  { label: 'Localização', href: '#localizacao', Icon: MapPin },
];

const Foam = () => (
  <svg aria-hidden="true" className="absolute -top-[0.55em] left-0 w-full h-[0.75em] z-10 pointer-events-none" viewBox="0 0 120 22" fill="none" preserveAspectRatio="none">
    <ellipse cx="12" cy="16" rx="13" ry="7" fill="#eef2f7"/>
    <ellipse cx="33" cy="11" rx="15" ry="9" fill="#ffffff"/>
    <ellipse cx="58" cy="14" rx="16" ry="9" fill="#f8fafc"/>
    <ellipse cx="83" cy="10" rx="14" ry="9" fill="#ffffff"/>
    <ellipse cx="106" cy="15" rx="13" ry="7" fill="#eef2f7"/>
    <circle cx="117" cy="5" r="2.2" fill="#ffffff"/>
    <circle cx="3.5" cy="6" r="1.8" fill="#eef2f7"/>
  </svg>
);

export function Navbar({ onDashboardClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav style={{ zIndex: 70 }} className="fixed w-full transition-all duration-300 bg-[#04070d] md:bg-neve-dark/30 md:backdrop-blur-md border-b border-white/5" id="navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-shrink-0">
              <a href="#inicio" className="flex items-center gap-3">
                <img src="/logo-mark.png" alt="Neve na Nave" className="h-10 w-auto md:h-12 md:w-auto drop-shadow-[0_0_14px_rgba(30,144,255,0.45)]" />
                <span className="relative inline-block pt-[0.35em]">
                  <Foam />
                  <span className="brand-text text-xl md:text-2xl relative">Neve na Nave</span>
                </span>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden md:flex items-center space-x-6">
              {LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-gray-300 hover:text-white transition-colors font-semibold text-sm">
                  {l.label}
                </a>
              ))}
              <button onClick={onDashboardClick} className="text-gray-400 hover:text-white transition-colors flex items-center font-semibold text-sm">
                <Shield className="w-4 h-4 mr-2" /> Área Restrita
              </button>
              <a href="#agendamento" className="bg-neve-blue text-white px-6 py-3 rounded-full font-bold tracking-wide hover:bg-neve-blueHover transition-all duration-300 shadow-[0_0_20px_rgba(30,144,255,0.2)] hover:shadow-[0_0_30px_rgba(30,144,255,0.5)] hover:-translate-y-1 inline-block text-sm">
                Agendar
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu" className="text-white focus:outline-none w-10 h-10 flex items-center justify-center">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Menu Mobile: drawer lateral animado (portal: renderiza direto no body,
          imune a overflow/transform de qualquer seção da página) */}
      {createPortal(<AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Fundo escurecido (fecha ao tocar) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 55, backgroundColor: 'rgba(0,0,0,0.6)' }}
              className="md:hidden"
            />

            {/* Painel lateral */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 60, width: '80%', maxWidth: 320, backgroundColor: '#0b1320', borderLeft: '1px solid rgba(255,255,255,0.08)', boxShadow: '-20px 0 60px rgba(0,0,0,0.5)' }}
              className="md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <img src="/logo-mark.png" alt="Neve na Nave" className="h-12 w-auto drop-shadow-[0_0_14px_rgba(30,144,255,0.45)]" />
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Fechar" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white rounded-xl hover:bg-white/5">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 px-3 py-4 overflow-y-auto">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.3 }}
                    className="flex items-center gap-4 text-white text-lg font-bold py-4 px-4 rounded-xl active:bg-white/10 transition-colors border-b border-white/5"
                  >
                    <span className="w-10 h-10 rounded-xl bg-neve-blue/10 flex items-center justify-center">
                      <l.Icon className="w-5 h-5 text-neve-blue" />
                    </span>
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="p-4 border-t border-white/10 space-y-3"
              >
                <a
                  href="#agendamento"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center bg-neve-blue text-white font-bold rounded-xl py-4 shadow-[0_0_20px_rgba(30,144,255,0.3)] active:bg-blue-600"
                >
                  Agendar Avaliação
                </a>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onDashboardClick(); }}
                  className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-gray-300 font-bold rounded-xl py-3.5 active:bg-white/10"
                >
                  <Shield className="w-4 h-4" /> Área Restrita
                </button>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>, document.body)}

    </>
  );
}
