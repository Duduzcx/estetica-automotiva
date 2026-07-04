// Catálogo de serviços com preços (FICTÍCIOS por enquanto — ajuste aqui!)
export const SERVICOS = {
  vitrificacao: { nome: 'Vitrificação Cerâmica', preco: 1200, tempo: '2-3 dias' },
  polimento: { nome: 'Polimento Técnico', preco: 600, tempo: '1-2 dias' },
  higienizacao: { nome: 'Higienização Interna', preco: 350, tempo: '4-6 horas' },
  lavagem: { nome: 'Lavagem Detalhada', preco: 180, tempo: '2-3 horas' },
} as const;

export type ServicoId = keyof typeof SERVICOS;

export const formatBRL = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
