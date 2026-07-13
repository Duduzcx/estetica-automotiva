-- Tabela de inscrições push (um registro por aparelho/navegador que ativou
-- as notificações do painel). Rode isso no SQL Editor do Supabase.
create table if not exists public.push_subscriptions (
  endpoint text primary key,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;

-- Só usuários autenticados (login da área restrita) podem gerenciar
-- as próprias inscrições.
create policy "authenticated pode gerenciar push_subscriptions"
  on public.push_subscriptions
  for all
  to authenticated
  using (true)
  with check (true);
