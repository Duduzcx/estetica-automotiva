import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogIn } from 'lucide-react';

interface Props { onLogin: () => void; }

export function LoginGate({ onLogin }: Props) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = (e?: React.FormEvent) => {
    e?.preventDefault();
    // POR ENQUANTO: acesso liberado (sem validação), conforme combinado.
    // Quando definir as credenciais, a validação entra aqui (ou Supabase Auth).
    sessionStorage.setItem('nn_auth', '1');
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-neve-blue/10 blur-[150px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-neve-dark/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Neve na Nave" className="h-32 w-auto drop-shadow-[0_0_25px_rgba(30,144,255,0.4)] mb-4" />
          <h1 className="text-2xl font-bold text-white">Área Restrita</h1>
          <p className="text-gray-400 text-sm mt-1">Painel de operações da Neve na Nave</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              value={usuario} onChange={e => setUsuario(e.target.value)}
              type="text" placeholder="Usuário"
              className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              value={senha} onChange={e => setSenha(e.target.value)}
              type="password" placeholder="Senha"
              onKeyDown={e => e.key === 'Enter' && entrar()}
              className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-neve-blue focus:ring-1 focus:ring-neve-blue transition-colors"
            />
          </div>
          <button
            onClick={() => entrar()}
            className="w-full flex items-center justify-center bg-neve-blue hover:bg-blue-600 text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(30,144,255,0.3)]"
          >
            <LogIn className="w-5 h-5 mr-2" /> Entrar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
