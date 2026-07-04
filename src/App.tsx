import { useState, useEffect } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { LoginGate } from './components/dashboard/LoginGate';
import { WhatsAppFAB } from './components/shared/WhatsAppFAB';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ViewState = 'landing' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('nn_auth') === '1');

  const handleLogout = () => {
    sessionStorage.removeItem('nn_auth');
    setIsAuthed(false);
    setCurrentView('landing');
  };

  // Scroll suave global (Lenis) sincronizado com o GSAP
  useEffect(() => {
    if (currentView !== 'landing') return;

    const lenis = new Lenis({
      lerp: 0.11,          // inércia suave no desktop
      smoothWheel: true,
      syncTouch: false,     // celular usa o scroll nativo (mais leve e natural)
    });

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [currentView]);

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
            {isAuthed ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <LoginGate onLogin={() => setIsAuthed(true)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exibe o FAB do WhatsApp apenas na Landing Page */}
      {currentView === 'landing' && <WhatsAppFAB />}
    </div>
  );
}
