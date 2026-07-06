import { WhatsAppFAB } from './WhatsAppFAB';
import { ScheduleFAB } from './ScheduleFAB';

// Coluna fixa que mantém os botões flutuantes sempre centralizados
// entre si, independente do tamanho de cada um.
export function FloatingButtons() {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3"
      style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
    >
      <ScheduleFAB />
      <WhatsAppFAB />
    </div>
  );
}
