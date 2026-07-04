import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Home, Sparkles, Image, CalendarCheck, MapPin } from 'lucide-react';

interface NavbarProps {
  onDashboardClick: () => void;
}

const LINKS = [
  { label: 'Início', href: '#inicio', Icon: Home },
  { label: 'Serviços', href: '#servicos', Icon: Sparkles },
  { label: 'Galeria', href: '#galeria', Icon: Image },
  { label: 'Agendamento', href: '#agendamento', Icon: CalendarCheck },
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
      <nav className="fixed w-full z-40 transition-all duration-300 backdrop-blur-md bg-neve-dark/30 border-b border-white/5" id="navbar">
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

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-neve-dark/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-4 text-white text-xl font-bold py-4 px-4 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors"
                >
                  <l.Icon className="w-5 h-5 text-neve-blue" />
                  {l.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto mb-10 flex flex-col gap-3">
              <a
                href="#agendamento"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-neve-blue text-white px-8 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(30,144,255,0.3)]"
              >
                Agendar Avaliação
              </a>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onDashboardClick(); }}
                className="w-full flex items-center justify-center px-4 py-4 rounded-xl text-gray-300 bg-white/5 border border-white/10 font-bold"
              >
                <Shield className="w-5 h-5 mr-2" /> Área Restrita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
