import { useCallback, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, type Agendamento } from '../lib/supabase';

// Dados de demonstração exibidos enquanto o banco não está conectado
const DEMO: Agendamento[] = [
  { id: 'demo-1', created_at: new Date().toISOString(), nome: 'Eduardo Silva', whatsapp: '11999990001', veiculo: 'Porsche 911 Carrera', servico: 'Vitrificação Cerâmica', preco: 1200, data: new Date().toISOString().slice(0, 10), horario: '14:00', status: 'pendente' },
  { id: 'demo-2', created_at: new Date().toISOString(), nome: 'Marcos Almeida', whatsapp: '11999990002', veiculo: 'BMW X6', servico: 'Lavagem Detalhada', preco: 180, data: new Date().toISOString().slice(0, 10), horario: '16:30', status: 'pendente' },
  { id: 'demo-3', created_at: new Date().toISOString(), nome: 'Juliana Costa', whatsapp: '11999990003', veiculo: 'Audi Q5', servico: 'Higienização Interna', preco: 350, data: new Date().toISOString().slice(0, 10), horario: '09:00', status: 'confirmado' },
];

export function useAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(isSupabaseConfigured ? [] : DEMO);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const fetchAll = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('agendamentos')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setAgendamentos(data as Agendamento[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    fetchAll();
    // Tempo real: qualquer novo agendamento aparece sozinho no painel
    const channel = supabase
      .channel('agendamentos-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agendamentos' }, fetchAll)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchAll]);

  const updateStatus = useCallback(async (id: string, status: Agendamento['status']) => {
    setAgendamentos(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
    if (supabase) {
      await supabase.from('agendamentos').update({ status }).eq('id', id);
    }
  }, []);

  return { agendamentos, loading, updateStatus, refresh: fetchAll };
}
