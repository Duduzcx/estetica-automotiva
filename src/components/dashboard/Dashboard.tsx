import { Sidebar, TABS, type TabKey } from './Sidebar';
import { Scorecards } from './Scorecards';
import { OrderManagement } from './OrderManagement';
import { TopServicesChart } from './TopServicesChart';
import { Clientes } from './Clientes';
import { Financeiro } from './Financeiro';
import { Configuracoes } from './Configuracoes';
import { Menu, LayoutDashboard, LogOut, X, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgendamentos } from '../../hooks/useAgendamentos';
import { AgendaControl } from './AgendaControl';

interface DashboardProps {
  onLogout: () => void;
  onBackToSite: () => void;
}

const TITULOS: Record<TabKey, { titulo: string; sub: string }> = {
  visao: { titulo: 'Painel de Operações', sub: 'Bem-vindo de volta à Neve na Nave.' },
  agendamentos: { titulo: 'Agendamentos', sub: 'Todos os pedidos, ativos e no histórico.' },
  clientes: { titulo: 'Clientes', sub: 'Quem já passou pela Neve na Nave.' },
  financeiro: { titulo: 'Financeiro', sub: 'Faturamento e receita ao longo do tempo.' },
  config: { titulo: 'Configurações', sub: 'Preferências do painel.' },
};

export function Dashboard({ onLogout, onBackToSite }: DashboardProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>('visao');
  const { agendamentos, loading, updateStatus, deleteAgendamento } = useAgendamentos();
  const { titulo, sub } = TITULOS[tab];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      
      {/* Desktop Sidebar */}
      <Sidebar active={tab} onSelect={setTab} onLogout={onLogout} onBackToSite={onBackToSite} />

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 w-full bg-neve-dark/80 backdrop-blur-md border-b border-white/5 z-40 p-4 flex justify-between items-center">
        <button onClick={onBackToSite} className="flex items-center gap-1 text-gray-300 hover:text-white text-sm font-bold">
          <ChevronLeft className="w-5 h-5" /> Site
        </button>
        <img src="/logo-mark.png" alt="Neve na Nave" className="h-10 w-auto" />
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
            className="md:hidden fixed inset-0 z-30 bg-neve-dark/95 backdrop-blur-xl pt-24 px-6 flex flex-col overflow-y-auto pb-8"
          >
             <div className="space-y-2 mb-6">
               {TABS.map(item => (
                 <button
                   key={item.key}
                   onClick={() => { setTab(item.key); setMobileMenuOpen(false); }}
                   className={`w-full flex items-center px-4 py-4 rounded-xl transition-all font-bold text-base ${
                     tab === item.key ? 'bg-neve-blue/10 text-neve-blue' : 'text-gray-300 hover:text-white hover:bg-white/5'
                   }`}
                 >
                   <span className="mr-3">{item.icon}</span>
                   {item.label}
                 </button>
               ))}
             </div>
             <button
                onClick={onBackToSite}
                className="w-full flex items-center justify-center px-4 py-4 rounded-xl text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-lg"
              >
                <ChevronLeft className="w-6 h-6 mr-3" />
                Voltar ao Site
              </button>
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
                {titulo}
              </h1>
              <p className="text-gray-400 mt-2 text-sm">{sub}</p>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-neve-blue/20 border border-neve-blue flex items-center justify-center text-neve-blue font-bold">
                ES
              </div>
            </div>
          </header>

          {tab === 'visao' && (
            <>
              <Scorecards agendamentos={agendamentos} />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <OrderManagement agendamentos={agendamentos} loading={loading} updateStatus={updateStatus} deleteAgendamento={deleteAgendamento} />
                </div>
                <div>
                  <TopServicesChart agendamentos={agendamentos} />
                  <AgendaControl />
                </div>
              </div>
            </>
          )}

          {tab === 'agendamentos' && (
            <OrderManagement agendamentos={agendamentos} loading={loading} updateStatus={updateStatus} deleteAgendamento={deleteAgendamento} />
          )}

          {tab === 'clientes' && <Clientes agendamentos={agendamentos} />}

          {tab === 'financeiro' && <Financeiro agendamentos={agendamentos} />}

          {tab === 'config' && <Configuracoes />}

        </div>
      </div>
    </div>
  );
}
