import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Projeto Supabase da Neve na Nave (chave publishable: segura pra ficar no site)
const SUPABASE_URL = 'https://rqvhtnbarlbhlyhyoimq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_35uAuKNTYUQHWEIKWQj8lQ_nzd52EuQ';

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
  carro_marca?: string | null;
  carro_modelo?: string | null;
  carro_ano?: number | null;
  servico: string;
  preco: number;
  data: string;    // YYYY-MM-DD
  horario: string; // HH:MM
  status: 'pendente' | 'confirmado' | 'recusado';
}
