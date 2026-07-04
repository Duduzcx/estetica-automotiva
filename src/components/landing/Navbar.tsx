import { useState } from 'react';
import { motion } from 'framer-motion';
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

      {/* Menu Mobile: painel simples, estilos inline (à prova de falha de render) */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            zIndex: 60,
            backgroundColor: '#0b1320',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            padding: '8px 16px 16px',
          }}
          className="md:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                color: '#ffffff',
                fontSize: 18,
                fontWeight: 700,
                padding: '14px 8px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
              }}
            >
              <l.Icon style={{ width: 20, height: 20, color: '#1E90FF' }} />
              {l.label}
            </a>
          ))}
          <a
            href="#agendamento"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: '#1E90FF',
              color: '#ffffff',
              fontWeight: 700,
              borderRadius: 12,
              padding: '14px 0',
              marginTop: 14,
              textDecoration: 'none',
            }}
          >
            Agendar Avaliação
          </a>
          <button
            onClick={() => { setIsMobileMenuOpen(false); onDashboardClick(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#d1d5db',
              fontWeight: 700,
              borderRadius: 12,
              padding: '13px 0',
              marginTop: 10,
            }}
          >
            <Shield style={{ width: 18, height: 18 }} /> Área Restrita
          </button>
        </div>
      )}

    </>
  );
}
