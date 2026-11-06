// DMC: VIA-30-00-00-400A | Título: Obras › lista de projetos (barra lateral)
// BREX: VIA-00-00-00-022A

import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Button } from '@/components/ui'
import { listarProjetos } from '../api'

const STATUS_COR: Record<string, string> = {
  em_elaboracao: '#FFD60A',
  apresentado: '#30D158',
  aprovado: '#30D158',
  reprovado: '#FF453A',
}

export function ListaProjetos() {
  const { id: idAtual } = useParams()
  const { data: projetos, isLoading } = useQuery({ queryKey: ['projetos'], queryFn: listarProjetos })

  return (
    <aside className="glass-panel ml-5 my-4 flex h-fit w-[260px] flex-shrink-0 flex-col gap-[18px] rounded-[22px] p-[22px_16px]">
      <Link to="/obras/novo">
        <Button variant="primary" className="w-full rounded-[13px]">
          + Novo projeto
        </Button>
      </Link>

      <div className="flex flex-col gap-[3px]">
        <div className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wide text-[#76726a]">
          Projetos
        </div>

        {isLoading && <p className="px-3 text-[13px] text-[#76726a]">Carregando…</p>}

        {!isLoading && projetos?.length === 0 && (
          <p className="px-3 text-[13px] text-[#76726a]">Nenhum projeto ainda. Crie o primeiro.</p>
        )}

        {projetos?.map((p) => (
          <Link
            key={p.id}
            to={`/obras/${p.id}`}
            className="flex items-center gap-[10px] rounded-[13px] p-[9px_12px] text-[14px] text-[#f5f3ef]"
            style={
              p.id === idAtual
                ? {
                    background: 'linear-gradient(165deg, rgba(171,165,148,.22), rgba(171,165,148,.08))',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.08)',
                  }
                : undefined
            }
          >
            <Avatar nome={p.investidorNome} size={30} />
            <div>
              <div className="font-semibold">{p.nome}</div>
              <div className="flex items-center text-[12px] text-[#9c988c]">
                <span
                  className="mr-[5px] inline-block h-[6px] w-[6px] rounded-full"
                  style={{ background: STATUS_COR[p.status] }}
                />
                {p.investidorNome} · {p.status.replace('_', ' ')}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
