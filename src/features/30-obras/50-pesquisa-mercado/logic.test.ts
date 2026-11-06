// DMC: VIA-30-50-00-700A | Título: Obras › Pesquisa de mercado › testes
// BREX: VIA-00-00-00-022A

import { describe, expect, it } from 'vitest'
import type { ComparavelMercado } from '../schemas'
import { calcularMediaMercado, calcularPrecoM2, estimarValorVendaPorMedia } from './logic'

const comparaveis: ComparavelMercado[] = [
  { projetoId: 'p1', enderecoBairro: 'Jardim das Flores · casa térrea', area: 135, preco: 465000 },
  { projetoId: 'p1', enderecoBairro: 'Jardim das Flores · sobrado', area: 150, preco: 512000 },
  { projetoId: 'p1', enderecoBairro: 'Bairro vizinho · casa térrea', area: 128, preco: 440000 },
  { projetoId: 'p1', enderecoBairro: 'Jardim das Flores · casa térrea', area: 145, preco: 505000 },
]

describe('calcularPrecoM2', () => {
  it('divide o preço pela área', () => {
    expect(calcularPrecoM2({ preco: 465000, area: 135 })).toBeCloseTo(3444.44, 1)
  })

  it('rejeita área zero ou negativa', () => {
    expect(() => calcularPrecoM2({ preco: 100, area: 0 })).toThrow()
  })
})

describe('calcularMediaMercado', () => {
  it('calcula a média de R$/m² dos comparáveis do caso aprovado no protótipo', () => {
    const { mediaPrecoM2, quantidade } = calcularMediaMercado(comparaveis)
    expect(quantidade).toBe(4)
    expect(Math.round(mediaPrecoM2)).toBe(3445)
  })

  it('retorna 0 quando não há comparáveis', () => {
    expect(calcularMediaMercado([])).toEqual({ mediaPrecoM2: 0, quantidade: 0 })
  })
})

describe('estimarValorVendaPorMedia', () => {
  it('multiplica a média de mercado pela área construída', () => {
    expect(estimarValorVendaPorMedia(3445, 140)).toBe(482300)
  })
})
