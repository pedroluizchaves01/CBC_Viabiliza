// DMC: VIA-30-00-00-100A | Título: Obras › schemas
// BREX: VIA-00-00-00-022A

import { z } from 'zod'

export const tipoEmpreendimentoSchema = z.enum(['unidade_unica', 'multiplas_unidades'])
export type TipoEmpreendimento = z.infer<typeof tipoEmpreendimentoSchema>

export const statusProjetoSchema = z.enum(['em_elaboracao', 'apresentado', 'aprovado', 'reprovado'])
export type StatusProjeto = z.infer<typeof statusProjetoSchema>

export const projetoSchema = z.object({
  id: z.string().uuid().optional(),
  investidorId: z.string().uuid(),
  nome: z.string().min(2, 'Informe o nome do projeto'),
  tipo: tipoEmpreendimentoSchema.default('unidade_unica'),
  endereco: z.string().optional(),
  areaTerreno: z.number().positive().optional(),
  valorTerreno: z.number().nonnegative().optional(),
  cubEstado: z.number().nonnegative().optional(),
  status: statusProjetoSchema.default('em_elaboracao'),
})
export type Projeto = z.infer<typeof projetoSchema>

export const padraoAcabamentoSchema = z.enum(['popular', 'medio', 'alto'])
export type PadraoAcabamento = z.infer<typeof padraoAcabamentoSchema>

export const unidadeSchema = z.object({
  id: z.string().uuid().optional(),
  projetoId: z.string().uuid(),
  nome: z.string().optional(),
  areaConstruida: z.number().nonnegative(),
  padraoAcabamento: padraoAcabamentoSchema.default('medio'),
  valorVendaEstimado: z.number().nonnegative().optional(),
})
export type Unidade = z.infer<typeof unidadeSchema>

export const tipoItemCustoSchema = z.enum([
  'projeto_aprovacoes',
  'fundacoes_especiais',
  'taxas_licencas',
  'bdi_administracao',
  'outro',
])
export type TipoItemCusto = z.infer<typeof tipoItemCustoSchema>

export const itemCustoSchema = z.object({
  id: z.string().uuid().optional(),
  projetoId: z.string().uuid(),
  tipo: tipoItemCustoSchema,
  descricao: z.string().optional(),
  valor: z.number().nonnegative(),
})
export type ItemCusto = z.infer<typeof itemCustoSchema>

export const ITENS_CUSTO_PADRAO: { tipo: TipoItemCusto; rotulo: string }[] = [
  { tipo: 'projeto_aprovacoes', rotulo: 'Projeto e aprovações' },
  { tipo: 'fundacoes_especiais', rotulo: 'Fundações especiais' },
  { tipo: 'taxas_licencas', rotulo: 'Taxas e licenças' },
  { tipo: 'bdi_administracao', rotulo: 'BDI / administração' },
]

export const comparavelMercadoSchema = z.object({
  id: z.string().uuid().optional(),
  projetoId: z.string().uuid(),
  enderecoBairro: z.string().min(2, 'Informe o endereço ou bairro'),
  area: z.number().positive('Informe a área'),
  preco: z.number().positive('Informe o preço'),
  fonte: z.string().optional(),
  url: z.string().optional(),
})
export type ComparavelMercado = z.infer<typeof comparavelMercadoSchema>
