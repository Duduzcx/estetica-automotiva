// Datas no fuso LOCAL do usuário (evita o bug do "hoje" virar amanhã à noite,
// que acontecia com toISOString, que usa horário de Londres/UTC)
export const hojeLocal = (): string => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
};

export const mesAtualLocal = (): string => hojeLocal().slice(0, 7); // YYYY-MM
