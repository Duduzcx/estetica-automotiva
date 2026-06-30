import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

interface NavbarProps {
  onDashboardClick: () => void;
}

export function Navbar({ onDashboardClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-40 transition-all duration-300 backdrop-blur-md bg-neve-dark/30 border-b border-white/5" id="navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-shrink-0">
              <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase font-heading">Neve<span className="text-neve-blue">na Nave</span></span>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden md:flex items-center space-x-6">
              <button onClick={onDashboardClick} className="text-gray-400 hover:text-white transition-colors flex items-center font-semibold text-sm">
                <Shield className="w-4 h-4 mr-2" /> Área Restrita
              </button>
              <a href="#agendamento" className="bg-neve-blue text-white px-8 py-3.5 rounded-full font-bold tracking-wide hover:bg-neve-blueHover transition-all duration-300 shadow-[0_0_20px_rgba(30,144,255,0.2)] hover:shadow-[0_0_30px_rgba(30,144,255,0.5)] hover:-translate-y-1 inline-block">
                Agendar Avaliação
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none w-10 h-10 flex items-center justify-center">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="fixed inset-0 z-30 bg-neve-dark/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col space-y-6 mt-8">
              <a href="#servicos" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white border-b border-white/5 pb-4">Serviços Premium</a>
              <a href="#galeria" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white border-b border-white/5 pb-4">Galeria</a>
              <a href="#agendamento" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white border-b border-white/5 pb-4">Agendamento</a>
              <button onClick={() => { setIsMobileMenuOpen(false); onDashboardClick(); }} className="text-2xl font-bold text-neve-blue border-b border-white/5 pb-4 text-left flex items-center">
                <Shield className="w-6 h-6 mr-3" /> Área Restrita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
