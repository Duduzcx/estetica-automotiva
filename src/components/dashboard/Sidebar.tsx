import type { ReactNode } from 'react';
import { LayoutDashboard, CalendarDays, Users, DollarSign, Settings, LogOut, ChevronLeft } from 'lucide-react';

export type TabKey = 'visao' | 'agendamentos' | 'clientes' | 'financeiro' | 'config';

export const TABS: { key: TabKey; label: string; icon: ReactNode }[] = [
  { key: 'visao', label: 'Visão Geral', icon: <LayoutDashboard className="w-5 h-5" /> },
  { key: 'agendamentos', label: 'Agendamentos', icon: <CalendarDays className="w-5 h-5" /> },
  { key: 'clientes', label: 'Clientes', icon: <Users className="w-5 h-5" /> },
  { key: 'financeiro', label: 'Financeiro', icon: <DollarSign className="w-5 h-5" /> },
  { key: 'config', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
];

interface SidebarProps {
  active: TabKey;
  onSelect: (key: TabKey) => void;
  onLogout: () => void;
  onBackToSite: () => void;
}

export function Sidebar({ active, onSelect, onLogout, onBackToSite }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-neve-dark border-r border-white/5 hidden md:flex flex-col sticky top-0">
      <div className="p-8 border-b border-white/5">
        <img src="/logo-mark.png" alt="Neve na Nave" className="h-14 w-auto drop-shadow-[0_0_14px_rgba(30,144,255,0.45)]" />
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2">
        {TABS.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              active === item.key
                ? 'bg-neve-blue/10 text-neve-blue'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1">
        <button
          onClick={onBackToSite}
          className="w-full flex items-center px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
        >
          <ChevronLeft className="w-5 h-5 mr-3" />
          Voltar ao Site
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-all font-medium text-sm"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair da Conta
        </button>
      </div>
    </div>
  );
}
