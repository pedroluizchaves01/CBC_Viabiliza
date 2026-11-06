// DMC: VIA-20-00-00-300A | Título: Cadastros base › Investidor › acesso a dados
// BREX: VIA-00-00-00-022A

import { supabase } from '@/lib/supabase'
import type { Investidor } from './schemas'

type InvestidorRow = {
  id: string
  nome: string
  contato: string | null
}

function paraInvestidor(row: InvestidorRow): Investidor {
  return { id: row.id, nome: row.nome, contato: row.contato ?? undefined }
}

export async function listarInvestidores(): Promise<Investidor[]> {
  const { data, error } = await supabase
    .from('investidores')
    .select('id, nome, contato')
    .order('nome')
  if (error) throw error
  return (data ?? []).map(paraInvestidor)
}

/** Reaproveita um investidor existente com o mesmo nome, ou cria um novo. */
export async function obterOuCriarInvestidor(nome: string): Promise<Investidor> {
  const { data: existente, error: erroConsulta } = await supabase
    .from('investidores')
    .select('id, nome, contato')
    .eq('nome', nome)
    .maybeSingle()
  if (erroConsulta) throw erroConsulta
  if (existente) return paraInvestidor(existente)

  const { data: criado, error: erroCriacao } = await supabase
    .from('investidores')
    .insert({ nome })
    .select('id, nome, contato')
    .single()
  if (erroCriacao) throw erroCriacao
  return paraInvestidor(criado)
}
