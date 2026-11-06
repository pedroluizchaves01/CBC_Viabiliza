// DMC: VIA-30-00-00-300A | Título: Obras › acesso a dados
// BREX: VIA-00-00-00-022A

import { supabase } from '@/lib/supabase'
import { ITENS_CUSTO_PADRAO } from './schemas'
import type { ItemCusto, Projeto, StatusProjeto, TipoEmpreendimento, Unidade } from './schemas'

type ProjetoRow = {
  id: string
  investidor_id: string
  nome: string
  tipo: TipoEmpreendimento
  endereco: string | null
  area_terreno: number | null
  valor_terreno: number | null
  cub_estado: number | null
  status: StatusProjeto
}

function paraProjeto(row: ProjetoRow): Projeto {
  return {
    id: row.id,
    investidorId: row.investidor_id,
    nome: row.nome,
    tipo: row.tipo,
    endereco: row.endereco ?? undefined,
    areaTerreno: row.area_terreno ?? undefined,
    valorTerreno: row.valor_terreno ?? undefined,
    cubEstado: row.cub_estado ?? undefined,
    status: row.status,
  }
}

const PROJETO_COLUNAS =
  'id, investidor_id, nome, tipo, endereco, area_terreno, valor_terreno, cub_estado, status'

export type ProjetoComInvestidor = Projeto & { investidorNome: string }

export async function listarProjetos(): Promise<ProjetoComInvestidor[]> {
  const { data, error } = await supabase
    .from('projetos')
    .select(`${PROJETO_COLUNAS}, investidores(nome)`)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map((row) => {
    const investidor = row.investidores as unknown as { nome: string } | null
    return { ...paraProjeto(row as ProjetoRow), investidorNome: investidor?.nome ?? '—' }
  })
}

export async function obterProjeto(id: string): Promise<Projeto> {
  const { data, error } = await supabase.from('projetos').select(PROJETO_COLUNAS).eq('id', id).single()
  if (error) throw error
  return paraProjeto(data)
}

export async function obterProjetoComInvestidor(id: string): Promise<ProjetoComInvestidor> {
  const { data, error } = await supabase
    .from('projetos')
    .select(`${PROJETO_COLUNAS}, investidores(nome)`)
    .eq('id', id)
    .single()
  if (error) throw error
  const investidor = data.investidores as unknown as { nome: string } | null
  return { ...paraProjeto(data as ProjetoRow), investidorNome: investidor?.nome ?? '—' }
}

/** Cria o projeto e já deixa uma unidade padrão pronta para edição. */
export async function criarProjeto(dados: Omit<Projeto, 'id'>): Promise<Projeto> {
  const { data, error } = await supabase
    .from('projetos')
    .insert({
      investidor_id: dados.investidorId,
      nome: dados.nome,
      tipo: dados.tipo,
      endereco: dados.endereco,
      area_terreno: dados.areaTerreno,
      valor_terreno: dados.valorTerreno,
      cub_estado: dados.cubEstado,
      status: dados.status,
    })
    .select(PROJETO_COLUNAS)
    .single()
  if (error) throw error

  const { error: erroUnidade } = await supabase
    .from('unidades')
    .insert({ projeto_id: data.id, area_construida: 0, padrao_acabamento: 'medio' })
  if (erroUnidade) throw erroUnidade

  return paraProjeto(data)
}

export async function atualizarProjeto(id: string, dados: Partial<Omit<Projeto, 'id'>>): Promise<void> {
  const { error } = await supabase
    .from('projetos')
    .update({
      nome: dados.nome,
      tipo: dados.tipo,
      endereco: dados.endereco,
      area_terreno: dados.areaTerreno,
      valor_terreno: dados.valorTerreno,
      cub_estado: dados.cubEstado,
      status: dados.status,
    })
    .eq('id', id)
  if (error) throw error
}

type UnidadeRow = {
  id: string
  projeto_id: string
  nome: string | null
  area_construida: number
  padrao_acabamento: Unidade['padraoAcabamento']
  valor_venda_estimado: number | null
}

function paraUnidade(row: UnidadeRow): Unidade {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    nome: row.nome ?? undefined,
    areaConstruida: row.area_construida,
    padraoAcabamento: row.padrao_acabamento,
    valorVendaEstimado: row.valor_venda_estimado ?? undefined,
  }
}

/** No MVP uma obra tem 1 unidade por padrão; retorna a primeira cadastrada. */
export async function obterUnidadePrincipal(projetoId: string): Promise<Unidade> {
  const { data, error } = await supabase
    .from('unidades')
    .select('id, projeto_id, nome, area_construida, padrao_acabamento, valor_venda_estimado')
    .eq('projeto_id', projetoId)
    .order('created_at')
    .limit(1)
    .single()
  if (error) throw error
  return paraUnidade(data)
}

export async function atualizarUnidade(id: string, dados: Partial<Omit<Unidade, 'id' | 'projetoId'>>): Promise<void> {
  const { error } = await supabase
    .from('unidades')
    .update({
      area_construida: dados.areaConstruida,
      padrao_acabamento: dados.padraoAcabamento,
      valor_venda_estimado: dados.valorVendaEstimado,
    })
    .eq('id', id)
  if (error) throw error
}

export async function listarItensCusto(projetoId: string): Promise<ItemCusto[]> {
  const { data, error } = await supabase
    .from('itens_custo')
    .select('id, projeto_id, tipo, descricao, valor')
    .eq('projeto_id', projetoId)
  if (error) throw error
  return (data ?? []).map((row) => ({
    id: row.id,
    projetoId: row.projeto_id,
    tipo: row.tipo,
    descricao: row.descricao ?? undefined,
    valor: row.valor,
  }))
}

/** Grava os 4 itens de custo padrão do projeto (upsert por tipo). */
export async function salvarItensCustoPadrao(
  projetoId: string,
  valores: Record<(typeof ITENS_CUSTO_PADRAO)[number]['tipo'], number>,
): Promise<void> {
  const linhas = ITENS_CUSTO_PADRAO.map(({ tipo }) => ({
    projeto_id: projetoId,
    tipo,
    valor: valores[tipo] ?? 0,
  }))
  const { error } = await supabase.from('itens_custo').upsert(linhas, { onConflict: 'projeto_id,tipo' })
  if (error) throw error
}
