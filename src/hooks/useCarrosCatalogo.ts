import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export type TipoVeiculo = 'carro' | 'moto' | 'caminhao';

export interface CarroCatalogo {
  id: number;
  tipo: TipoVeiculo;
  marca: string;
  modelo: string;
  ano_min: number;
  ano_max: number;
  multiplicador: number;
  ordem: number;
}

// Catálogo de demonstração (usado se o Supabase ainda não tiver a tabela/dados)
const DEMO: CarroCatalogo[] = [
  { id: 1, tipo: 'carro', marca: 'Fiat', modelo: 'Mobi', ano_min: 2016, ano_max: 2026, multiplicador: 0.85, ordem: 1 },
  { id: 2, tipo: 'carro', marca: 'Chevrolet', modelo: 'Onix', ano_min: 2019, ano_max: 2026, multiplicador: 0.9, ordem: 2 },
  { id: 3, tipo: 'carro', marca: 'Volkswagen', modelo: 'T-Cross', ano_min: 2019, ano_max: 2026, multiplicador: 1.15, ordem: 3 },
  { id: 4, tipo: 'carro', marca: 'Toyota', modelo: 'Corolla', ano_min: 2015, ano_max: 2026, multiplicador: 1.1, ordem: 4 },
  { id: 5, tipo: 'carro', marca: 'Honda', modelo: 'Civic', ano_min: 2007, ano_max: 2026, multiplicador: 1.05, ordem: 5 },
  { id: 6, tipo: 'carro', marca: 'Jeep', modelo: 'Compass', ano_min: 2017, ano_max: 2026, multiplicador: 1.25, ordem: 6 },
  { id: 7, tipo: 'carro', marca: 'BMW', modelo: 'X6', ano_min: 2015, ano_max: 2026, multiplicador: 1.7, ordem: 7 },
  { id: 8, tipo: 'carro', marca: 'Porsche', modelo: '911 Carrera', ano_min: 2012, ano_max: 2026, multiplicador: 1.9, ordem: 8 },
  { id: 9, tipo: 'moto', marca: 'Honda', modelo: 'CG 160', ano_min: 2016, ano_max: 2026, multiplicador: 0.55, ordem: 9 },
  { id: 10, tipo: 'moto', marca: 'Harley-Davidson', modelo: 'Iron 883', ano_min: 2014, ano_max: 2026, multiplicador: 1.9, ordem: 10 },
  { id: 11, tipo: 'caminhao', marca: 'Mercedes-Benz Caminhões', modelo: 'Atego 1719', ano_min: 2014, ano_max: 2026, multiplicador: 1.9, ordem: 11 },
];

export function useCarrosCatalogo() {
  const [carros, setCarros] = useState<CarroCatalogo[]>(isSupabaseConfigured ? [] : DEMO);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('carros_catalogo')
      .select('*')
      .order('ordem', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) setCarros(data as CarroCatalogo[]);
        else if (!error) setCarros(DEMO); // tabela ainda vazia/não criada: usa demo
        setLoading(false);
      });
  }, []);

  const marcasPorTipo = (tipo: TipoVeiculo) =>
    Array.from(new Set(carros.filter(c => c.tipo === tipo).map(c => c.marca))).sort();
  const modelosPorMarca = (tipo: TipoVeiculo, marca: string) =>
    carros.filter(c => c.tipo === tipo && c.marca === marca);

  return { carros, marcasPorTipo, modelosPorMarca, loading };
}
