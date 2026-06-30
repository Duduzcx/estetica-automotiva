import { Sidebar } from './Sidebar';
import { Scorecards } from './Scorecards';
import { OrderManagement } from './OrderManagement';
import { TopServicesChart } from './TopServicesChart';
import { Menu, LayoutDashboard, LogOut, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      
      {/* Desktop Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 w-full bg-neve-dark/80 backdrop-blur-md border-b border-white/5 z-40 p-4 flex justify-between items-center">
        <span className="text-xl font-bold font-heading">Neve<span className="text-neve-blue">na Nave</span></span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 z-50">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="md:hidden fixed inset-0 z-30 bg-neve-dark/95 backdrop-blur-xl pt-24 px-6 flex flex-col"
          >
             <button 
                onClick={onLogout}
                className="mt-8 w-full flex items-center justify-center px-4 py-4 rounded-xl text-white bg-red-500/20 border border-red-500/50 hover:bg-red-500 transition-all font-bold text-lg"
              >
                <LogOut className="w-6 h-6 mr-3" />
                Sair da Conta
              </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto pt-20 md:pt-0">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          
          <header className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-heading flex items-center">
                <LayoutDashboard className="w-6 h-6 mr-3 text-neve-blue hidden md:block" />
                Painel de Operações
              </h1>
              <p className="text-gray-400 mt-2 text-sm">Bem-vindo de volta, Eduardo.</p>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-neve-blue/20 border border-neve-blue flex items-center justify-center text-neve-blue font-bold">
                ES
              </div>
            </div>
          </header>

          <Scorecards />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <OrderManagement />
            </div>
            <div>
              <TopServicesChart />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
