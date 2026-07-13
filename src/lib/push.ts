import { supabase } from './supabase';

// Chave pública VAPID: segura pra ficar no client (a privada fica só na
// Edge Function do Supabase, nunca aqui). Gerada com `npx web-push generate-vapid-keys`.
export const VAPID_PUBLIC_KEY = 'BAoH5pxbC-Rb28fY-8U0ct2Uz3Vw2Hrrlpg_J0J7b1B40fxy_1895e5J7kkESte8FRsneOcojkMnHWWRbJEqC9o';

export const pushSuportado = () =>
  typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window;

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function statusInscricao(): Promise<'ativo' | 'inativo' | 'negado'> {
  if (!pushSuportado()) return 'inativo';
  if (Notification.permission === 'denied') return 'negado';
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = await reg?.pushManager.getSubscription();
  return sub ? 'ativo' : 'inativo';
}

export async function ativarNotificacoes(): Promise<{ ok: boolean; erro?: string }> {
  if (!pushSuportado()) return { ok: false, erro: 'Esse navegador não suporta notificações push.' };

  const permissao = await Notification.requestPermission();
  if (permissao !== 'granted') return { ok: false, erro: 'Permissão de notificação negada.' };

  const reg = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  const json = sub.toJSON();
  if (supabase) {
    const { error } = await supabase.from('push_subscriptions').upsert({
      endpoint: json.endpoint,
      p256dh: json.keys?.p256dh,
      auth: json.keys?.auth,
    });
    if (error) return { ok: false, erro: 'Inscrito no navegador, mas falhou ao salvar no servidor: ' + error.message };
  }

  return { ok: true };
}

export async function desativarNotificacoes(): Promise<void> {
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = await reg?.pushManager.getSubscription();
  if (!sub) return;
  const endpoint = sub.endpoint;
  await sub.unsubscribe();
  if (supabase) {
    await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint);
  }
}
