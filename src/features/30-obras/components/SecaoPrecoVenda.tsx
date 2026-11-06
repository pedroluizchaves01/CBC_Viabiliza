// DMC: VIA-30-50-00-400A | Título: Obras › Preço de venda e pesquisa de mercado › seção
// BREX: VIA-00-00-00-022A

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Button, Card, Field } from '@/components/ui'
import { atualizarUnidade, criarComparavel, removerComparavel } from '../api'
import { calcularMediaMercado, calcularPrecoM2, estimarValorVendaPorMedia } from '../50-pesquisa-mercado/logic'
import type { ComparavelMercado, Unidade } from '../schemas'

const ICONE = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41L13.42 20.6a2 2 0 01-2.83 0L3 13V3h10z" />
    <circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

type FormComparavel = { enderecoBairro: string; area: string; preco: string; fonte: string; url: string }
const FORM_VAZIO: FormComparavel = { enderecoBairro: '', area: '', preco: '', fonte: '', url: '' }

const formatarMoeda = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type SecaoPrecoVendaProps = {
  projetoId: string
  unidade: Unidade
  comparaveis: ComparavelMercado[]
}

export function SecaoPrecoVenda({ projetoId, unidade, comparaveis }: SecaoPrecoVendaProps) {
  const queryClient = useQueryClient()
  const [valorVenda, setValorVenda] = useState(unidade.valorVendaEstimado ?? 0)
  const [form, setForm] = useState<FormComparavel>(FORM_VAZIO)

  const invalidar = () => {
    queryClient.invalidateQueries({ queryKey: ['comparaveis', projetoId] })
    queryClient.invalidateQueries({ queryKey: ['unidade', projetoId] })
  }

  const salvarValorVenda = useMutation({
    mutationFn: (valor: number) => atualizarUnidade(unidade.id as string, { valorVendaEstimado: valor }),
    onSuccess: invalidar,
  })

  const adicionar = useMutation({
    mutationFn: () =>
      criarComparavel({
        projetoId,
        enderecoBairro: form.enderecoBairro,
        area: Number(form.area),
        preco: Number(form.preco),
        fonte: form.fonte || undefined,
        url: form.url || undefined,
      }),
    onSuccess: () => {
      setForm(FORM_VAZIO)
      invalidar()
    },
  })

  const remover = useMutation({
    mutationFn: (id: string) => removerComparavel(id),
    onSuccess: invalidar,
  })

  const media = calcularMediaMercado(comparaveis)
  const areaUnidade = unidade.areaConstruida
  const rSm2 = areaUnidade > 0 ? valorVenda / areaUnidade : 0

  const formValido = form.enderecoBairro.length > 1 && Number(form.area) > 0 && Number(form.preco) > 0

  return (
    <Card id="preco-venda" icon={ICONE} title="Preço de venda e pesquisa de mercado">
      <div className="mb-[22px] flex flex-wrap gap-4">
        <div style={{ width: 160 }}>
          <Field
            label="Valor de venda estimado (R$)"
            type="number"
            value={valorVenda}
            onChange={(e) => setValorVenda(Number(e.target.value) || 0)}
            onBlur={() => salvarValorVenda.mutate(valorVenda)}
          />
        </div>
        <div>
          <div className="mb-[6px] text-xs font-semibold text-[#76726a]">R$/m² equivalente</div>
          <div className="min-w-[120px] rounded-[11px] bg-[#2a2a2c] p-[10px_12px] text-[14px] font-semibold text-[#f5f3ef]">
            {formatarMoeda(rSm2)}/m²
          </div>
        </div>
      </div>

      <div className="rounded-[16px] bg-[#F2F2F7]/0 p-[18px]" style={{ background: '#141416' }}>
        <div className="mb-4 text-[13px] font-semibold text-[#f5f3ef]">
          Pesquisa de preços na região
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (formValido) adicionar.mutate()
          }}
          className="mb-4 flex flex-wrap items-end gap-3"
        >
          <div style={{ flex: '2 1 220px' }}>
            <Field
              label="Endereço / bairro"
              value={form.enderecoBairro}
              onChange={(e) => setForm({ ...form, enderecoBairro: e.target.value })}
            />
          </div>
          <div style={{ width: 90 }}>
            <Field
              label="Área (m²)"
              type="number"
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            />
          </div>
          <div style={{ width: 130 }}>
            <Field
              label="Preço (R$)"
              type="number"
              value={form.preco}
              onChange={(e) => setForm({ ...form, preco: e.target.value })}
            />
          </div>
          <div style={{ flex: '1 1 120px' }}>
            <Field
              label="Fonte"
              placeholder="Viva Real, OLX…"
              value={form.fonte}
              onChange={(e) => setForm({ ...form, fonte: e.target.value })}
            />
          </div>
          <div style={{ flex: '1 1 160px' }}>
            <Field
              label="Link do anúncio"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>
          <Button type="submit" disabled={!formValido || adicionar.isPending}>
            {adicionar.isPending ? 'Adicionando…' : '+ Adicionar'}
          </Button>
        </form>

        {comparaveis.length > 0 && (
          <div className="rounded-[13px] bg-[#1c1c1e] p-[4px_14px]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-[10px] pr-[10px] text-left text-[11px] font-semibold uppercase tracking-wide text-[#76726a]">
                    Imóvel
                  </th>
                  <th className="py-[10px] text-left text-[11px] font-semibold uppercase tracking-wide text-[#76726a]">
                    Área
                  </th>
                  <th className="py-[10px] text-left text-[11px] font-semibold uppercase tracking-wide text-[#76726a]">
                    Preço
                  </th>
                  <th className="py-[10px] text-left text-[11px] font-semibold uppercase tracking-wide text-[#76726a]">
                    R$/m²
                  </th>
                  <th className="py-[10px] text-left text-[11px] font-semibold uppercase tracking-wide text-[#76726a]">
                    Fonte
                  </th>
                  <th className="py-[10px]" />
                </tr>
              </thead>
              <tbody>
                {comparaveis.map((c) => (
                  <tr key={c.id} className="border-t border-white/[.06]">
                    <td className="py-[11px] pr-[10px] text-[14px] text-[#f5f3ef]">{c.enderecoBairro}</td>
                    <td className="py-[11px] text-[14px] text-[#f5f3ef]">{c.area} m²</td>
                    <td className="py-[11px] text-[14px] text-[#f5f3ef]">{formatarMoeda(c.preco)}</td>
                    <td className="py-[11px] text-[14px] text-[#f5f3ef]">
                      {formatarMoeda(calcularPrecoM2(c))}
                    </td>
                    <td className="py-[11px] text-[14px] text-[#9c988c]">
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noreferrer" className="text-[#ABA594]">
                          {c.fonte ?? 'anúncio'} ↗
                        </a>
                      ) : (
                        (c.fonte ?? '—')
                      )}
                    </td>
                    <td className="py-[11px] text-right">
                      <button
                        type="button"
                        aria-label={`Remover ${c.enderecoBairro}`}
                        onClick={() => remover.mutate(c.id as string)}
                        className="text-[12px] text-[#9c988c]"
                      >
                        remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {comparaveis.length === 0 && (
          <p className="text-[13px] text-[#76726a]">Nenhum comparável cadastrado ainda.</p>
        )}

        <div className="mt-[14px] flex flex-wrap items-center justify-between gap-[10px]">
          <div className="text-[13px] text-[#CFCBC2]">
            {media.quantidade > 0 ? (
              <>
                Preço médio da região: <strong className="text-[#f5f3ef]">{formatarMoeda(media.mediaPrecoM2)}/m²</strong>{' '}
                ({media.quantidade} {media.quantidade === 1 ? 'anúncio encontrado' : 'anúncios encontrados'})
              </>
            ) : (
              'Adicione comparáveis para calcular a média da região.'
            )}
          </div>
          <Button
            type="button"
            variant="secondary"
            disabled={media.quantidade === 0 || areaUnidade <= 0}
            onClick={() => {
              const novoValor = estimarValorVendaPorMedia(media.mediaPrecoM2, areaUnidade)
              setValorVenda(novoValor)
              salvarValorVenda.mutate(novoValor)
            }}
          >
            Usar este valor
          </Button>
        </div>
      </div>
    </Card>
  )
}
