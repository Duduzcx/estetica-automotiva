import { LayoutDashboard, CalendarDays, Users, DollarSign, Settings, LogOut } from 'lucide-react';


interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Visão Geral", active: true },
    { icon: <CalendarDays className="w-5 h-5" />, label: "Agendamentos", active: false },
    { icon: <Users className="w-5 h-5" />, label: "Clientes", active: false },
    { icon: <DollarSign className="w-5 h-5" />, label: "Financeiro", active: false },
    { icon: <Settings className="w-5 h-5" />, label: "Configurações", active: false },
  ];

  return (
    <div className="w-64 h-screen bg-neve-dark border-r border-white/5 hidden md:flex flex-col sticky top-0">
      <div className="p-8 border-b border-white/5">
        <span className="text-2xl font-bold tracking-tighter text-white uppercase font-heading">
          Neve<span className="text-neve-blue">na Nave</span>
        </span>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              item.active 
                ? 'bg-neve-blue/10 text-neve-blue' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
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
