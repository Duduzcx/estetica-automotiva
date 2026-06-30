import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

type OrderStatus = 'pendente' | 'confirmado' | 'recusado';

interface Order {
  id: string;
  client: string;
  service: string;
  vehicle: string;
  date: string;
  status: OrderStatus;
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', client: 'Eduardo Silva', service: 'Vitrificação Cerâmica', vehicle: 'Porsche 911 Carrera', date: 'Hoje, 14:00', status: 'pendente' },
    { id: '2', client: 'Marcos Almeida', service: 'Lavagem Detalhada', vehicle: 'BMW X6', date: 'Hoje, 16:30', status: 'pendente' },
    { id: '3', client: 'Juliana Costa', service: 'Higienização Interna', vehicle: 'Audi Q5', date: 'Amanhã, 09:00', status: 'confirmado' },
  ]);

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold mb-6 text-white flex items-center">
        <Clock className="w-5 h-5 mr-3 text-neve-blue" /> Agendamentos Recentes
      </h3>
      <div className="space-y-4">
        <AnimatePresence>
          {orders.map((order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-5 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center transition-all ${
                order.status === 'pendente' ? 'border-yellow-500/30 bg-yellow-500/5' :
                order.status === 'confirmado' ? 'border-green-500/30 bg-green-500/5' :
                'border-red-500/30 bg-red-500/5'
              }`}
            >
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-bold text-white">{order.client}</h4>
                <p className="text-gray-400 text-sm">{order.vehicle} • {order.service}</p>
                <p className="text-gray-500 text-xs mt-1 font-medium bg-black/30 inline-block px-2 py-1 rounded">{order.date}</p>
              </div>

              {order.status === 'pendente' ? (
                <div className="flex space-x-3 w-full md:w-auto">
                  <button onClick={() => updateStatus(order.id, 'confirmado')} className="flex-1 md:flex-none flex items-center justify-center bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Aprovar
                  </button>
                  <button onClick={() => updateStatus(order.id, 'recusado')} className="flex-1 md:flex-none flex items-center justify-center bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all">
                    <XCircle className="w-4 h-4 mr-2" /> Recusar
                  </button>
                </div>
              ) : (
                <div className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider ${
                  order.status === 'confirmado' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {order.status}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
