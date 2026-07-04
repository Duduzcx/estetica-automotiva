import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Preenchido automaticamente quando o projeto Supabase for criado
const SUPABASE_URL = 'PENDENTE';
const SUPABASE_KEY = 'PENDENTE';

export const isSupabaseConfigured = SUPABASE_URL.startsWith('https://');

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

export interface Agendamento {
  id: string;
  created_at: string;
  nome: string;
  whatsapp: string;
  veiculo: string;
  servico: string;
  preco: number;
  data: string;    // YYYY-MM-DD
  horario: string; // HH:MM
  status: 'pendente' | 'confirmado' | 'recusado';
}
