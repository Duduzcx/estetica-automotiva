-- Tabela de inscrições push (um registro por aparelho/navegador que ativou
-- as notificações do painel). Rode isso no SQL Editor do Supabase.
create table if not exists public.push_subscriptions (
  endpoint text primary key,
  p256dh text not null,
  auth text not null,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists push_subscriptions_user_id_idx on public.push_subscriptions(user_id);

alter table public.push_subscriptions enable row level security;

-- Cada usuário autenticado só enxerga/gerencia as próprias inscrições
-- (não as de outro dono logado em outro aparelho).
create policy "own subs select" on public.push_subscriptions
  for select to authenticated using (user_id = auth.uid());
create policy "own subs insert" on public.push_subscriptions
  for insert to authenticated with check (user_id = auth.uid());
create policy "own subs update" on public.push_subscriptions
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own subs delete" on public.push_subscriptions
  for delete to authenticated using (user_id = auth.uid());
