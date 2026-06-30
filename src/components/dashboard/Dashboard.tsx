import { Sidebar } from './Sidebar';
import { Scorecards } from './Scorecards';
import { OrderManagement } from './OrderManagement';
import { TopServicesChart } from './TopServicesChart';
import { Menu, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      
      <Sidebar onLogout={onLogout} />

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 w-full bg-neve-dark/80 backdrop-blur-md border-b border-white/5 z-40 p-4 flex justify-between items-center">
        <span className="text-xl font-bold font-heading">Neve<span className="text-neve-blue">na Nave</span></span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

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
