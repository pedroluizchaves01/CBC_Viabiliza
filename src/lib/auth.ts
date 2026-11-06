// DMC: VIA-10-00-00-200A | Título: Identidade e acesso — sessão local (N1)
// BREX: VIA-00-00-00-022A
//
// N1: único usuário local. Login anônimo do Supabase garante um auth.uid()
// estável (persistido no navegador) para a RLS funcionar, sem exigir uma
// tela de login própria ainda — isso chega quando o módulo de Identidade
// for construído de fato (VIA-10).

import { supabase } from './supabase'

export async function garantirSessao(): Promise<void> {
  const { data } = await supabase.auth.getSession()
  if (data.session) return

  const { error } = await supabase.auth.signInAnonymously()
  if (error) throw error
}
