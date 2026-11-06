// DMC: VIA-30-00-00-400A | Título: Obras › Dashboard do projeto (página única)
// BREX: VIA-00-00-00-022A

import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { obterProjetoComInvestidor, listarItensCusto, obterUnidadePrincipal } from '../api'
import { ListaProjetos } from './ListaProjetos'
import { SecaoDadosGerais } from './SecaoDadosGerais'
import { SecaoTerrenoCustos } from './SecaoTerrenoCustos'
import { SecaoEmBreve } from './SecaoEmBreve'

const ABAS = [
  { href: '#dados-gerais', rotulo: 'Dados gerais' },
  { href: '#terreno-custos', rotulo: 'Terreno e custos' },
  { href: '#preco-venda', rotulo: 'Preço de venda' },
  { href: '#cronograma', rotulo: 'Cronograma' },
  { href: '#financiamento', rotulo: 'Financiamento' },
]

export function DashboardObra() {
  const { id } = useParams<{ id: string }>()
  if (!id) throw new Error('rota /obras/:id sem id')

  const projetoQuery = useQuery({ queryKey: ['projeto', id], queryFn: () => obterProjetoComInvestidor(id) })
  const unidadeQuery = useQuery({ queryKey: ['unidade', id], queryFn: () => obterUnidadePrincipal(id) })
  const itensCustoQuery = useQuery({ queryKey: ['itensCusto', id], queryFn: () => listarItensCusto(id) })

  const carregando = projetoQuery.isLoading || unidadeQuery.isLoading || itensCustoQuery.isLoading

  return (
    <div className="min-h-screen bg-black text-[#f5f3ef]">
      <div className="glass-bar sticky top-3 z-20 mx-5 flex items-center gap-7 rounded-[22px] p-[10px_22px]">
        <Link to="/obras" className="text-[15px] font-bold text-[#f5f3ef]">
          Viabiliza
        </Link>
        {projetoQuery.data && (
          <span className="text-[13px] text-[#9c988c]">{projetoQuery.data.nome}</span>
        )}
      </div>

      <div className="flex flex-wrap">
        <ListaProjetos />

        <main className="flex-[999_1_720px] min-w-0 p-8">
          {carregando && <p className="text-[#76726a]">Carregando projeto…</p>}

          {projetoQuery.data && (
            <>
              <div className="mb-[22px]">
                <h1 className="m-0 text-[30px] font-bold tracking-tight text-[#f5f3ef]">
                  {projetoQuery.data.nome}
                </h1>
                <p className="m-0 text-[15px] text-[#9c988c]">
                  Cliente investidor: {projetoQuery.data.investidorNome}
                </p>
              </div>

              <nav className="seg mb-[26px] overflow-x-auto">
                {ABAS.map((aba) => (
                  <a key={aba.href} href={aba.href} className="seg-opt-btn" data-active="false">
                    {aba.rotulo}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-4">
                <SecaoDadosGerais projeto={projetoQuery.data} />
                {unidadeQuery.data && (
                  <SecaoTerrenoCustos
                    projeto={projetoQuery.data}
                    unidade={unidadeQuery.data}
                    itensCusto={itensCustoQuery.data ?? []}
                  />
                )}
                <SecaoEmBreve id="preco-venda" titulo="Preço de venda e pesquisa de mercado" />
                <SecaoEmBreve id="cronograma" titulo="Cronograma físico-financeiro" />
                <SecaoEmBreve id="financiamento" titulo="Financiamento" />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
