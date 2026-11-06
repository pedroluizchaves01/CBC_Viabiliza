// DMC: VIA-30-20-00-700A | Título: Obras › Terreno e custos › testes
// BREX: VIA-00-00-00-022A

import { describe, expect, it } from 'vitest'
import type { ItemCusto, Unidade } from '../schemas'
import { calcularComposicaoInvestimento, calcularCustoCub, calcularTotalAjustes } from './logic'

const unidadeUnica: Unidade[] = [
  { projetoId: 'p1', areaConstruida: 140, padraoAcabamento: 'medio' },
]

const ajustesExemplo: ItemCusto[] = [
  { projetoId: 'p1', tipo: 'projeto_aprovacoes', valor: 12000 },
  { projetoId: 'p1', tipo: 'fundacoes_especiais', valor: 0 },
  { projetoId: 'p1', tipo: 'taxas_licencas', valor: 4500 },
  { projetoId: 'p1', tipo: 'bdi_administracao', valor: 18000 },
]

describe('calcularCustoCub', () => {
  it('multiplica a área construída total pelo CUB do estado', () => {
    expect(calcularCustoCub(unidadeUnica, 2150)).toBe(301000)
  })

  it('soma a área de várias unidades', () => {
    const duasUnidades: Unidade[] = [
      { projetoId: 'p1', areaConstruida: 100, padraoAcabamento: 'medio' },
      { projetoId: 'p1', areaConstruida: 50, padraoAcabamento: 'medio' },
    ]
    expect(calcularCustoCub(duasUnidades, 2000)).toBe(300000)
  })

  it('rejeita CUB negativo', () => {
    expect(() => calcularCustoCub(unidadeUnica, -1)).toThrow()
  })
})

describe('calcularTotalAjustes', () => {
  it('soma os itens de custo informados', () => {
    expect(calcularTotalAjustes(ajustesExemplo)).toBe(34500)
  })

  it('retorna 0 quando não há ajustes', () => {
    expect(calcularTotalAjustes([])).toBe(0)
  })
})

describe('calcularComposicaoInvestimento', () => {
  it('combina CUB, ajustes e terreno no caso do prototipo aprovado', () => {
    const resultado = calcularComposicaoInvestimento(unidadeUnica, 2150, ajustesExemplo, 180000)
    expect(resultado.custoCub).toBe(301000)
    expect(resultado.totalAjustes).toBe(34500)
    expect(resultado.totalObra).toBe(335500)
    expect(resultado.investimentoTotal).toBe(515500)
  })
})
