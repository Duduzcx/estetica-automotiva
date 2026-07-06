import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface CarroCatalogo {
  id: number;
  marca: string;
  modelo: string;
  ano_min: number;
  ano_max: number;
  multiplicador: number;
  ordem: number;
}

// Catálogo de demonstração (usado se o Supabase ainda não tiver a tabela/dados)
const DEMO: CarroCatalogo[] = [
  { id: 1, marca: 'Fiat', modelo: 'Mobi', ano_min: 2016, ano_max: 2026, multiplicador: 0.85, ordem: 1 },
  { id: 2, marca: 'Chevrolet', modelo: 'Onix', ano_min: 2019, ano_max: 2026, multiplicador: 0.9, ordem: 2 },
  { id: 3, marca: 'Volkswagen', modelo: 'T-Cross', ano_min: 2019, ano_max: 2026, multiplicador: 1.15, ordem: 3 },
  { id: 4, marca: 'Toyota', modelo: 'Corolla', ano_min: 2015, ano_max: 2026, multiplicador: 1.1, ordem: 4 },
  { id: 5, marca: 'Honda', modelo: 'Civic', ano_min: 2007, ano_max: 2026, multiplicador: 1.05, ordem: 5 },
  { id: 6, marca: 'Jeep', modelo: 'Compass', ano_min: 2017, ano_max: 2026, multiplicador: 1.25, ordem: 6 },
  { id: 7, marca: 'BMW', modelo: 'X6', ano_min: 2015, ano_max: 2026, multiplicador: 1.7, ordem: 7 },
  { id: 8, marca: 'Porsche', modelo: '911 Carrera', ano_min: 2012, ano_max: 2026, multiplicador: 1.9, ordem: 8 },
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

  const marcas = Array.from(new Set(carros.map(c => c.marca))).sort();
  const modelosPorMarca = (marca: string) => carros.filter(c => c.marca === marca);

  return { carros, marcas, modelosPorMarca, loading };
}
