import { useState, useEffect, Component, lazy, Suspense, type ReactNode } from 'react';
import { LandingPage } from './components/landing/LandingPage';
const Dashboard = lazy(() => import('./components/dashboard/Dashboard').then(m => ({ default: m.Dashboard })));
const LoginGate = lazy(() => import('./components/dashboard/LoginGate').then(m => ({ default: m.LoginGate })));
import { FloatingButtons } from './components/shared/FloatingButtons';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { supabase } from './lib/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A barra de endereço do celular aparecendo/sumindo dispara um recálculo
// completo de todas as animações no meio do scroll = engasgo. Desligado:
ScrollTrigger.config({ ignoreMobileResize: true });

type ViewState = 'landing' | 'dashboard';

// Rede de segurança: um erro em qualquer componente não derruba mais o site inteiro
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; msg: string }> {
  state = { hasError: false, msg: '' };
  static getDerivedStateFromError(e: any) {
    return { hasError: true, msg: String(e?.message || e).slice(0, 300) };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, textAlign: 'center' }}>
          <img src="/logo-mark.png" alt="Neve na Nave" style={{ height: 80 }} />
          <p style={{ color: '#fff', fontWeight: 700 }}>Ops, algo deu errado por aqui.</p>
          <p style={{ color: '#fca5a5', fontSize: 12, maxWidth: 420, wordBreak: 'break-word', fontFamily: 'monospace' }}>
            [DIAGNÓSTICO] {this.state.msg}
          </p>
          <button onClick={() => window.location.reload()} style={{ backgroundColor: '#1E90FF', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '12px 28px' }}>
            Recarregar o site
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem('nn_auth_device') === '1' || sessionStorage.getItem('nn_auth') === '1');

  // A porta do painel obedece à sessão REAL do Supabase (é ela que o banco
  // respeita). O supabase-js guarda e renova essa sessão sozinho no aparelho.
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setIsAuthed(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_ev, session) => {
      setIsAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleLogout = () => {
    supabase?.auth.signOut();
    sessionStorage.removeItem('nn_auth');
    localStorage.removeItem('nn_auth_device');
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
    <ErrorBoundary>
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
            <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>Carregando painel...</div>}>
              {isAuthed ? (
                <Dashboard onLogout={handleLogout} onBackToSite={() => setCurrentView('landing')} />
              ) : (
                <LoginGate onLogin={() => setIsAuthed(true)} onBack={() => setCurrentView('landing')} />
              )}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exibe os botões flutuantes apenas na Landing Page */}
      {currentView === 'landing' && <FloatingButtons />}
    </div>
    </ErrorBoundary>
  );
}
