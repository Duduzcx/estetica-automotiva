import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export function TopServicesChart() {
  const services = [
    { name: "Vitrificação Cerâmica", percentage: 45, color: "bg-neve-blue" },
    { name: "Lavagem Premium", percentage: 30, color: "bg-purple-500" },
    { name: "Higienização Interna", percentage: 15, color: "bg-green-500" },
    { name: "Polimento Técnico", percentage: 10, color: "bg-orange-500" },
  ];

  return (
    <div className="bg-neve-dark/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl h-full">
      <h3 className="text-xl font-bold mb-6 text-white flex items-center">
        <BarChart3 className="w-5 h-5 mr-3 text-neve-blue" /> Serviços Mais Utilizados
      </h3>
      <div className="space-y-6">
        {services.map((service, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300 font-medium">{service.name}</span>
              <span className="text-white font-bold">{service.percentage}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${service.percentage}%` }}
                transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                className={`h-2.5 rounded-full ${service.color}`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
