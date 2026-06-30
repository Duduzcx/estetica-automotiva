import { Scorecards } from './Scorecards';
import { OrderManagement } from './OrderManagement';
import { TopServicesChart } from './TopServicesChart';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center">
            <LayoutDashboard className="w-8 h-8 text-neve-blue mr-3" />
            <h1 className="text-2xl font-bold font-heading">Painel de Controle</h1>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            onClick={onLogout}
            className="flex items-center text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-bold"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </motion.button>
        </header>

        <Scorecards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderManagement />
          </div>
          <div>
            <TopServicesChart />
          </div>
        </div>
      </div>
    </div>
  );
}
