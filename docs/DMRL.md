# DMRL — Lista de Módulos Previstos (Viabiliza)

Status: **verificação-1** (construído e testado localmente, usuário já viu rodando) · **não-verificado** (ainda não construído).

## Núcleo e infraestrutura

| DMC | Título | Arquivo | Depende de | Status |
|---|---|---|---|---|
| VIA-00-00-00-022A | BREX do projeto | `brex/BREX.md` | — | não-verificado |
| VIA-00-00-00-400A | Design system (GlassBar, Card, SegmentedControl, Avatar, Button, Field, DonutChart) | `src/components/ui/` | — | verificação-1 |
| VIA-00-00-00-900A | Configuração (env, cliente Supabase) | `src/lib/supabase.ts` | — | verificação-1 |
| VIA-10-00-00-200A | Sessão local (login anônimo, N1) | `src/lib/auth.ts` | VIA-00-00-00-900A | verificação-1 |

## SS 20 — Cadastros base

| DMC | Título | Arquivo | Depende de | Status |
|---|---|---|---|---|
| VIA-20-00-00-100A | Schema de Investidor | `src/features/20-cadastros/schemas.ts` | — | verificação-1 |
| VIA-20-00-00-300A | Acesso a dados de Investidor | `src/features/20-cadastros/api.ts` | VIA-20-00-00-100A | verificação-1 |

## SS 30 — Obras (domínio principal)

| DMC | Título | Arquivo | Depende de | Status |
|---|---|---|---|---|
| VIA-30-00-00-600A | Migração — esquema inicial (todas as tabelas de Obras) | `supabase/migrations/0001_init.sql`, `0002_itens_custo_unique.sql` | — | verificação-1 |
| VIA-30-00-00-100A | Schemas de Projeto, Unidade, Item de custo, Comparável | `src/features/30-obras/schemas.ts` | VIA-30-00-00-600A | verificação-1 |
| VIA-30-00-00-300A | Acesso a dados de Projeto/Unidade/Custos/Comparáveis | `src/features/30-obras/api.ts` | VIA-30-00-00-100A | verificação-1 |
| VIA-30-00-00-400A | Tela Dashboard do Projeto (página única) + lista de projetos + novo projeto | `src/features/30-obras/components/DashboardObra.tsx`, `ListaProjetos.tsx`, `NovoProjetoPage.tsx`, `ObrasHomePage.tsx` | VIA-30-00-00-300A | verificação-1 |
| VIA-30-10-00-400A | Seção Dados gerais | `src/features/30-obras/components/SecaoDadosGerais.tsx` | VIA-30-00-00-400A | verificação-1 |
| VIA-30-20-00-200A | Lógica — custo pelo CUB + ajustes + composição do investimento | `src/features/30-obras/20-terreno-custos/logic.ts` | VIA-30-00-00-100A | verificação-1 |
| VIA-30-20-00-400A | Seção Terreno e custos (+ donut de composição) | `src/features/30-obras/components/SecaoTerrenoCustos.tsx` | VIA-30-20-00-200A | verificação-1 |
| VIA-30-50-00-200A | Lógica — média de mercado e estimativa de venda | `src/features/30-obras/50-pesquisa-mercado/logic.ts` | VIA-30-00-00-100A | verificação-1 |
| VIA-30-50-00-400A | Seção Preço de venda e pesquisa de mercado (cadastro manual de comparáveis) | `src/features/30-obras/components/SecaoPrecoVenda.tsx` | VIA-30-50-00-200A | verificação-1 |
| VIA-30-30-00-400A | Seção Cronograma físico-financeiro | `src/features/30-obras/30-cronograma/` | VIA-30-00-00-400A | não-verificado |
| VIA-30-40-00-400A | Seção Financiamento | `src/features/30-obras/40-financiamento/` | VIA-30-00-00-400A | não-verificado |
| VIA-30-50-00-500A | Edge Function — busca de preços de mercado com IA (automatiza o cadastro manual) | `supabase/functions/busca-precos-mercado/` | VIA-30-50-00-400A | não-verificado — depende de decidir e contratar o serviço de busca/IA |
| VIA-30-60-00-200A | Lógica — fluxo de caixa, VPL, TIR, Payback, IL, EMC | `src/features/30-obras/60-indicadores/logic.ts` | VIA-30-20-00-200A, VIA-30-50-00-200A | não-verificado |
| VIA-30-60-00-700A | Testes da lógica de cálculo (validados contra caso de referência real) | `src/features/30-obras/60-indicadores/logic.test.ts` | VIA-30-60-00-200A | não-verificado |
| VIA-30-60-00-300A | Acesso a dados de Cenários e Resultados | `src/features/30-obras/60-indicadores/api.ts` | VIA-30-60-00-200A | não-verificado |
| VIA-30-70-00-400A | Tela Resumo do Estudo (gráfico, cenários, exportar PDF) | `src/features/30-obras/70-resultado/components/ResumoEstudo.tsx` | VIA-30-60-00-300A | não-verificado |
| VIA-30-00-00-400B | Tela Boas-vindas | `src/app/Boasvindas.tsx` | VIA-00-00-00-400A | verificação-1 |

## SS 90 — Infraestrutura e administração

| DMC | Título | Arquivo | Depende de | Status |
|---|---|---|---|---|
| VIA-90-00-00-900A | Dockerfile + nginx para deploy (Coolify) | `Dockerfile`, `nginx.conf` | — | não-verificado — build revisado, não executado (sem Docker daemon no ambiente de desenvolvimento) |

Módulo fora desta lista não é criado sem antes entrar aqui.
