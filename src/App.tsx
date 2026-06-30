import { useState } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { WhatsAppFAB } from './components/shared/WhatsAppFAB';
import { AnimatePresence, motion } from 'framer-motion';

type ViewState = 'landing' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  return (
    <div className="antialiased selection:bg-neve-blue selection:text-white font-sans bg-neve-dark text-white min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onDashboardClick={() => setCurrentView('dashboard')} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard onLogout={() => setCurrentView('landing')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exibe o FAB do WhatsApp apenas na Landing Page */}
      {currentView === 'landing' && <WhatsAppFAB />}
    </div>
  );
}
