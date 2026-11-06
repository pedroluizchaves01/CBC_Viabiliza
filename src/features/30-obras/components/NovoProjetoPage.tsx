// DMC: VIA-30-00-00-400C | Título: Obras › Novo projeto
// BREX: VIA-00-00-00-022A

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button, Field, SegmentedControl } from '@/components/ui'
import { obterOuCriarInvestidor } from '@/features/20-cadastros'
import { criarProjeto } from '../api'
import { tipoEmpreendimentoSchema } from '../schemas'

const novoProjetoSchema = z.object({
  investidorNome: z.string().min(2, 'Informe o nome do cliente investidor'),
  nome: z.string().min(2, 'Informe o nome do projeto'),
  tipo: tipoEmpreendimentoSchema,
  endereco: z.string().optional(),
  areaTerreno: z.string().optional(),
})
type NovoProjetoForm = z.infer<typeof novoProjetoSchema>

export function NovoProjetoPage() {
  const navigate = useNavigate()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NovoProjetoForm>({
    resolver: zodResolver(novoProjetoSchema),
    defaultValues: { tipo: 'unidade_unica' },
  })

  const criar = useMutation({
    mutationFn: async (dados: NovoProjetoForm) => {
      const investidor = await obterOuCriarInvestidor(dados.investidorNome)
      return criarProjeto({
        investidorId: investidor.id as string,
        nome: dados.nome,
        tipo: dados.tipo,
        endereco: dados.endereco,
        areaTerreno: dados.areaTerreno ? Number(dados.areaTerreno) : undefined,
        status: 'em_elaboracao',
      })
    },
    onSuccess: (projeto) => navigate(`/obras/${projeto.id}`),
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-10 text-[#f5f3ef]">
      <form
        onSubmit={handleSubmit((dados) => criar.mutate(dados))}
        className="glass-panel w-full max-w-[480px] rounded-[22px] p-8"
      >
        <h1 className="m-0 mb-6 text-[24px] font-bold">Novo projeto</h1>

        <div className="flex flex-col gap-[18px]">
          <Field label="Cliente investidor" {...register('investidorNome')} error={errors.investidorNome?.message} />
          <Field label="Nome do projeto" {...register('nome')} error={errors.nome?.message} />

          <div>
            <div className="mb-[6px] text-xs font-semibold text-[#9c988c]">Tipo de empreendimento</div>
            <Controller
              control={control}
              name="tipo"
              render={({ field }) => (
                <SegmentedControl
                  name="Tipo de empreendimento"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: 'unidade_unica', label: 'Unidade única' },
                    { value: 'multiplas_unidades', label: 'Múltiplas unidades' },
                  ]}
                />
              )}
            />
          </div>

          <Field label="Endereço / terreno" {...register('endereco')} />
          <Field
            label="Área do terreno (m²)"
            type="number"
            {...register('areaTerreno')}
            error={errors.areaTerreno?.message}
          />
        </div>

        <div className="mt-8 flex justify-between">
          <Link to="/obras" className="btn-secondary">
            Cancelar
          </Link>
          <Button type="submit" disabled={isSubmitting || criar.isPending}>
            {criar.isPending ? 'Criando…' : 'Criar projeto'}
          </Button>
        </div>

        {criar.isError && (
          <p className="mt-4 text-[13px] text-[#ff453a]">
            Não foi possível criar o projeto. Tente novamente.
          </p>
        )}
      </form>
    </div>
  )
}
