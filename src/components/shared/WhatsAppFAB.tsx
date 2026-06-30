import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFAB() {
  const whatsappNumber = "5511937696256";
  const message = "Olá! Gostaria de mais informações sobre os serviços de estética automotiva.";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center opacity-80 backdrop-blur-sm"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-8 h-8 fill-current" />
    </motion.a>
  );
}
