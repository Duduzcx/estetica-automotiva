// Catálogo REAL da Neve na Nave
export const SERVICOS = {
  polimento_tecnico:   { nome: 'Polimento Técnico',           preco: 400, aPartirDe: true },
  polimento_comercial: { nome: 'Polimento Comercial',         preco: 200, aPartirDe: true },
  restauracao_farois:  { nome: 'Restauração de Faróis',       preco: 200, aPartirDe: true, obs: 'o par' },
  higienizacao:        { nome: 'Higienização',                preco: 250, aPartirDe: true },
  descont_vidros:      { nome: 'Descontaminação de Vidros',   preco: 150, aPartirDe: false },
  descont_pintura:     { nome: 'Descontaminação de Pintura',  preco: 150, aPartirDe: false },
  cristalizacao:       { nome: 'Cristalização de Vidros',     preco: 100, aPartirDe: false },
  limpeza_motor:       { nome: 'Limpeza Técnica do Motor',    preco: 130, aPartirDe: true },
  revit_plasticos:     { nome: 'Revitalização de Plásticos',  preco: 40,  aPartirDe: false },
  coating:             { nome: 'Coating Cerâmico',            preco: 100, aPartirDe: false },
  planos:              { nome: 'Planos de Manutenção',        preco: 60,  aPartirDe: true },
  lavagem_detalhada:   { nome: 'Lavagem Técnica Detalhada',   preco: 130, aPartirDe: true },
  lavagem_entrada:     { nome: 'Lavagem de Entrada',          preco: 70,  aPartirDe: false },
} as const;

export type ServicoId = keyof typeof SERVICOS;

export const formatBRL = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });

// Ex.: "a partir de R$ 400" | "R$ 150" | "a partir de R$ 200 (o par)"
export const precoLabel = (id: ServicoId) => {
  const s = SERVICOS[id] as { preco: number; aPartirDe: boolean; obs?: string };
  return `${s.aPartirDe ? 'a partir de ' : ''}${formatBRL(s.preco)}${s.obs ? ` (${s.obs})` : ''}`;
};
