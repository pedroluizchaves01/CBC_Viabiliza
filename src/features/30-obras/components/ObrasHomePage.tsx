// DMC: VIA-30-00-00-400D | Título: Obras › página inicial (sem projeto selecionado)
// BREX: VIA-00-00-00-022A

import { Link } from 'react-router-dom'
import { ListaProjetos } from './ListaProjetos'

export function ObrasHomePage() {
  return (
    <div className="min-h-screen bg-black text-[#f5f3ef]">
      <div className="glass-bar sticky top-3 z-20 mx-5 flex items-center gap-7 rounded-[22px] p-[10px_22px]">
        <span className="text-[15px] font-bold">Viabiliza</span>
      </div>
      <div className="flex flex-wrap">
        <ListaProjetos />
        <main className="flex flex-1 items-center justify-center p-10">
          <div className="text-center">
            <p className="mb-4 text-[#9c988c]">Selecione um projeto na lista ou crie um novo.</p>
            <Link to="/obras/novo" className="btn-primary">
              + Novo projeto
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
