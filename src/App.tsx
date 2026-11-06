// DMC: VIA-00-00-00-400B | Título: Núcleo — rotas da aplicação

import { Navigate, Route, Routes } from 'react-router-dom'
import { Boasvindas } from '@/app/Boasvindas'
import { DashboardObra, NovoProjetoPage, ObrasHomePage } from '@/features/30-obras'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Boasvindas />} />
      <Route path="/obras" element={<ObrasHomePage />} />
      <Route path="/obras/novo" element={<NovoProjetoPage />} />
      <Route path="/obras/:id" element={<DashboardObra />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
