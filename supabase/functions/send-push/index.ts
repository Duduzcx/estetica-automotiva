// Edge Function acionada por um Database Webhook (INSERT em `agendamentos`).
// Manda push pra todo aparelho inscrito em `push_subscriptions`.
//
// Deploy: supabase functions deploy send-push
// Secrets: supabase secrets set VAPID_PUBLIC_KEY=... VAPID_PRIVATE_KEY=... VAPID_SUBJECT=mailto:seu@email.com
// Webhook: Dashboard > Database > Webhooks > New > tabela "agendamentos",
//          evento INSERT, tipo "HTTP Request" apontando pra URL desta função,
//          com o header "Authorization: Bearer <service_role key>".

import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;
const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT') || 'mailto:contato@nevenanave.com';

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

const formatBRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const registro = payload.record;
    if (!registro) return new Response('sem record', { status: 400 });

    const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data: subs, error } = await supabaseAdmin.from('push_subscriptions').select('*');
    if (error) throw error;
    if (!subs || subs.length === 0) return new Response('sem inscritos', { status: 200 });

    const notificacao = JSON.stringify({
      title: 'Novo agendamento! ❄️',
      body: `${registro.nome} - ${registro.servico} (${formatBRL(registro.preco)})`,
      url: '/',
    });

    const resultados = await Promise.allSettled(
      subs.map((s) =>
        webpush.sendNotification(
          { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
          notificacao
        )
      )
    );

    // Limpa inscrições mortas (aparelho desinstalou/expirou o navegador)
    const mortas = subs.filter((_, i) => {
      const r = resultados[i];
      return r.status === 'rejected' && [404, 410].includes((r.reason as any)?.statusCode);
    });
    if (mortas.length > 0) {
      await supabaseAdmin.from('push_subscriptions').delete().in('endpoint', mortas.map((m) => m.endpoint));
    }

    return new Response('ok', { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(String(e), { status: 500 });
  }
});
