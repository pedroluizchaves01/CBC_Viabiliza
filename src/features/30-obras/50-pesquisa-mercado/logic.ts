// DMC: VIA-30-50-00-200A | Título: Obras › Pesquisa de mercado › lógica
// BREX: VIA-00-00-00-022A

import type { ComparavelMercado } from '../schemas'

export type MediaMercado = {
  mediaPrecoM2: number
  quantidade: number
}

/** Preço por m² de um comparável. */
export function calcularPrecoM2(comparavel: Pick<ComparavelMercado, 'preco' | 'area'>): number {
  if (comparavel.area <= 0) throw new Error('área deve ser positiva')
  return comparavel.preco / comparavel.area
}

/** Média simples de R$/m² entre os comparáveis informados. */
export function calcularMediaMercado(comparaveis: readonly ComparavelMercado[]): MediaMercado {
  if (comparaveis.length === 0) return { mediaPrecoM2: 0, quantidade: 0 }
  const soma = comparaveis.reduce((acc, c) => acc + calcularPrecoM2(c), 0)
  const mediaPrecoM2 = soma / comparaveis.length
  if (!Number.isFinite(mediaPrecoM2)) throw new Error('média de mercado inválida')
  return { mediaPrecoM2, quantidade: comparaveis.length }
}

/** Valor de venda estimado a partir da média de mercado e da área construída da unidade. */
export function estimarValorVendaPorMedia(mediaPrecoM2: number, areaConstruida: number): number {
  if (mediaPrecoM2 < 0 || areaConstruida < 0) throw new Error('valores não podem ser negativos')
  return Math.round(mediaPrecoM2 * areaConstruida)
}
