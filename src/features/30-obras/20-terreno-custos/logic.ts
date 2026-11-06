// DMC: VIA-30-20-00-200A | Título: Obras › Terreno e custos › lógica
// BREX: VIA-00-00-00-022A

import type { ItemCusto, Unidade } from '../schemas'

export type ComposicaoInvestimento = {
  custoCub: number
  totalAjustes: number
  totalObra: number
  valorTerreno: number
  investimentoTotal: number
}

/** Custo de construção pelo CUB: soma das áreas construídas × CUB do estado. */
export function calcularCustoCub(unidades: readonly Unidade[], cubEstado: number): number {
  if (cubEstado < 0) throw new Error('cubEstado não pode ser negativo')
  const areaTotal = unidades.reduce((soma, u) => soma + u.areaConstruida, 0)
  const custo = areaTotal * cubEstado
  if (!Number.isFinite(custo)) throw new Error('custo pelo CUB inválido')
  return custo
}

/** Soma dos ajustes adicionais ao CUB (projeto, fundações, taxas, BDI, outros). */
export function calcularTotalAjustes(itensCusto: readonly ItemCusto[]): number {
  return itensCusto.reduce((soma, item) => soma + item.valor, 0)
}

export function calcularComposicaoInvestimento(
  unidades: readonly Unidade[],
  cubEstado: number,
  itensCusto: readonly ItemCusto[],
  valorTerreno: number,
): ComposicaoInvestimento {
  const custoCub = calcularCustoCub(unidades, cubEstado)
  const totalAjustes = calcularTotalAjustes(itensCusto)
  const totalObra = custoCub + totalAjustes
  const investimentoTotal = totalObra + valorTerreno
  if (investimentoTotal < 0) throw new Error('investimento total não pode ser negativo')
  return { custoCub, totalAjustes, totalObra, valorTerreno, investimentoTotal }
}
