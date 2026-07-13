// Service worker: só cuida de push notification (site fechado/minimizado).
// Não faz cache/offline - o app normal continua servido pelo Vite/Netlify.

self.addEventListener('push', (event) => {
  let data = { title: 'Neve na Nave', body: 'Novo agendamento recebido.' };
  try { if (event.data) data = { ...data, ...event.data.json() }; } catch { /* payload não era JSON, usa o padrão */ }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/logo-mark.png',
      badge: '/logo-mark.png',
      tag: 'nn-agendamento',
      data: { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
