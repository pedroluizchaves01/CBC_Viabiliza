import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App.tsx'
import { garantirSessao } from './lib/auth.ts'
import './index.css'

const queryClient = new QueryClient()

const elementoRaiz = document.getElementById('root')
if (!elementoRaiz) throw new Error('elemento #root não encontrado')
const raiz = createRoot(elementoRaiz)

garantirSessao()
  .then(() => {
    raiz.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </StrictMode>,
    )
  })
  .catch((erro: unknown) => {
    raiz.render(
      <div style={{ padding: 40, color: '#F5F3EF', background: '#000', minHeight: '100vh' }}>
        Não foi possível iniciar a sessão: {String(erro)}
      </div>,
    )
  })
