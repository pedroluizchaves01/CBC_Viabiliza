// DMC: VIA-30-10-00-400A | Título: Obras › Dados gerais e unidades › seção
// BREX: VIA-00-00-00-022A

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Card, Field, SegmentedControl } from '@/components/ui'
import { atualizarProjeto } from '../api'
import type { Projeto } from '../schemas'

const ICONE = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
)

type SecaoDadosGeraisProps = {
  projeto: Projeto
}

export function SecaoDadosGerais({ projeto }: SecaoDadosGeraisProps) {
  const queryClient = useQueryClient()
  const [campos, setCampos] = useState(projeto)

  const salvar = useMutation({
    mutationFn: (dados: Partial<Projeto>) => atualizarProjeto(projeto.id as string, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projeto', projeto.id] })
      queryClient.invalidateQueries({ queryKey: ['projetos'] })
    },
  })

  function aoSairDoCampo() {
    salvar.mutate(campos)
  }

  return (
    <Card id="dados-gerais" icon={ICONE} title="Dados gerais">
      <div className="flex flex-col gap-[18px]">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1" style={{ flexBasis: 240 }}>
            <Field
              label="Nome do projeto"
              value={campos.nome}
              onChange={(e) => setCampos({ ...campos, nome: e.target.value })}
              onBlur={aoSairDoCampo}
            />
          </div>
          <div className="flex-1" style={{ flexBasis: 200 }}>
            <Field
              label="Endereço / terreno"
              value={campos.endereco ?? ''}
              onChange={(e) => setCampos({ ...campos, endereco: e.target.value })}
              onBlur={aoSairDoCampo}
            />
          </div>
        </div>

        <div>
          <div className="mb-[6px] block text-xs font-semibold text-[#9c988c]">Tipo de empreendimento</div>
          <SegmentedControl
            name="Tipo de empreendimento"
            value={campos.tipo}
            onChange={(tipo) => {
              setCampos({ ...campos, tipo })
              salvar.mutate({ tipo })
            }}
            options={[
              { value: 'unidade_unica', label: 'Unidade única' },
              { value: 'multiplas_unidades', label: 'Múltiplas unidades' },
            ]}
          />
        </div>

        <div style={{ width: 160 }}>
          <Field
            label="Área do terreno (m²)"
            type="number"
            value={campos.areaTerreno ?? ''}
            onChange={(e) => setCampos({ ...campos, areaTerreno: Number(e.target.value) || undefined })}
            onBlur={aoSairDoCampo}
          />
        </div>
      </div>
    </Card>
  )
}
