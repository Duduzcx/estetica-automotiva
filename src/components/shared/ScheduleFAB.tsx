import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export function ScheduleFAB() {
  return (
    <motion.button
      onClick={() => window.dispatchEvent(new CustomEvent('abrir-agendamento'))}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      className="schedule-fab bg-neve-blue text-white p-2.5 rounded-full shadow-[0_0_20px_rgba(30,144,255,0.3)] hover:shadow-[0_0_30px_rgba(30,144,255,0.6)] transition-all duration-300 flex items-center justify-center opacity-90"
      style={{ backfaceVisibility: 'hidden', willChange: 'transform, opacity' }}
      aria-label="Agendar horário"
    >
      <Calendar className="w-5 h-5" />
    </motion.button>
  );
}
