// DMC: VIA-30-20-00-400A | Título: Obras › Terreno e custos › seção
// BREX: VIA-00-00-00-022A

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Card, DonutChart, Field } from '@/components/ui'
import { atualizarProjeto, atualizarUnidade, salvarItensCustoPadrao } from '../api'
import { calcularComposicaoInvestimento } from '../20-terreno-custos/logic'
import { ITENS_CUSTO_PADRAO } from '../schemas'
import type { ItemCusto, Projeto, TipoItemCusto, Unidade } from '../schemas'

const ICONE = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l9 5-9 5-9-5z" />
    <path d="M3 13l9 5 9-5" />
  </svg>
)

const CORES_DONUT = { terreno: '#ABA594', construcao: '#C9A876', ajustes: '#6E6A5F' }

type SecaoTerrenoCustosProps = {
  projeto: Projeto
  unidade: Unidade
  itensCusto: ItemCusto[]
}

export function SecaoTerrenoCustos({ projeto, unidade, itensCusto }: SecaoTerrenoCustosProps) {
  const queryClient = useQueryClient()
  const [valorTerreno, setValorTerreno] = useState(projeto.valorTerreno ?? 0)
  const [cubEstado, setCubEstado] = useState(projeto.cubEstado ?? 0)
  const [areaConstruida, setAreaConstruida] = useState(unidade.areaConstruida)
  const [valoresAjuste, setValoresAjuste] = useState<Record<TipoItemCusto, number>>(() => {
    const mapa = {} as Record<TipoItemCusto, number>
    for (const { tipo } of ITENS_CUSTO_PADRAO) {
      mapa[tipo] = itensCusto.find((i) => i.tipo === tipo)?.valor ?? 0
    }
    return mapa
  })

  const invalidar = () => {
    queryClient.invalidateQueries({ queryKey: ['projeto', projeto.id] })
    queryClient.invalidateQueries({ queryKey: ['itensCusto', projeto.id] })
  }

  const salvarProjeto = useMutation({
    mutationFn: (dados: Partial<Projeto>) => atualizarProjeto(projeto.id as string, dados),
    onSuccess: invalidar,
  })
  const salvarUnidade = useMutation({
    mutationFn: (area: number) => atualizarUnidade(unidade.id as string, { areaConstruida: area }),
    onSuccess: invalidar,
  })
  const salvarAjustes = useMutation({
    mutationFn: (valores: Record<TipoItemCusto, number>) => salvarItensCustoPadrao(projeto.id as string, valores),
    onSuccess: invalidar,
  })

  const composicao = calcularComposicaoInvestimento(
    [{ ...unidade, areaConstruida }],
    cubEstado,
    ITENS_CUSTO_PADRAO.map(({ tipo }) => ({ projetoId: projeto.id as string, tipo, valor: valoresAjuste[tipo] })),
    valorTerreno,
  )

  const formatarMoeda = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <Card id="terreno-custos" icon={ICONE} title="Terreno e orçamento de obra">
      <div className="mb-[22px] flex flex-wrap gap-4">
        <div style={{ width: 160 }}>
          <Field
            label="Valor do terreno (R$)"
            type="number"
            value={valorTerreno}
            onChange={(e) => setValorTerreno(Number(e.target.value) || 0)}
            onBlur={() => salvarProjeto.mutate({ valorTerreno })}
          />
        </div>
        <div style={{ width: 130 }}>
          <Field
            label="Área construída (m²)"
            type="number"
            value={areaConstruida}
            onChange={(e) => setAreaConstruida(Number(e.target.value) || 0)}
            onBlur={() => salvarUnidade.mutate(areaConstruida)}
          />
        </div>
        <div style={{ width: 130 }}>
          <Field
            label="CUB do estado (R$/m²)"
            type="number"
            value={cubEstado}
            onChange={(e) => setCubEstado(Number(e.target.value) || 0)}
            onBlur={() => salvarProjeto.mutate({ cubEstado })}
          />
        </div>
        <div>
          <div className="mb-[6px] text-xs font-semibold text-[#76726a]">Custo pelo CUB</div>
          <div className="min-w-[120px] rounded-[11px] bg-[#2a2a2c] p-[10px_12px] text-[14px] font-semibold text-[#f5f3ef]">
            {formatarMoeda(composicao.custoCub)}
          </div>
        </div>
      </div>

      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#76726a]">
        Ajustes adicionais ao CUB
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {ITENS_CUSTO_PADRAO.map(({ tipo, rotulo }) => (
            <tr key={tipo} className="border-b border-white/[.06]">
              <td className="py-[11px] pr-[10px] text-[14px] text-[#f5f3ef]">{rotulo}</td>
              <td className="py-[11px] text-right" style={{ width: 150 }}>
                <input
                  type="number"
                  aria-label={rotulo}
                  className="field-input text-right"
                  style={{ padding: '7px 10px' }}
                  value={valoresAjuste[tipo]}
                  onChange={(e) =>
                    setValoresAjuste({ ...valoresAjuste, [tipo]: Number(e.target.value) || 0 })
                  }
                  onBlur={() => salvarAjustes.mutate(valoresAjuste)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-[18px] flex items-center justify-between border-t border-white/10 pt-[18px]">
        <div className="text-[15px] font-semibold text-[#f5f3ef]">Total da obra</div>
        <div className="text-[19px] font-bold text-[#f5f3ef]">{formatarMoeda(composicao.totalObra)}</div>
      </div>

      <div className="mt-[22px] border-t border-white/10 pt-[22px]">
        <DonutChart
          centroRotulo="investimento"
          centroValor={formatarMoeda(composicao.investimentoTotal)}
          segmentos={[
            { rotulo: 'Terreno', valor: composicao.valorTerreno, cor: CORES_DONUT.terreno },
            { rotulo: 'Construção (CUB)', valor: composicao.custoCub, cor: CORES_DONUT.construcao },
            { rotulo: 'Ajustes adicionais', valor: composicao.totalAjustes, cor: CORES_DONUT.ajustes },
          ]}
        />
      </div>
    </Card>
  )
}
