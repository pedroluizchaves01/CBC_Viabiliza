# DMRL — Lista de Módulos Previstos (Viabiliza)

Nenhum módulo abaixo foi construído ainda (E4). Status inicial de todos: **não-verificado**.

## Núcleo e infraestrutura

| DMC | Título | Arquivo | Depende de |
|---|---|---|---|
| VIA-00-00-00-022A | BREX do projeto | `brex/BREX.md` | — |
| VIA-00-00-00-400A | Design system (GlassBar, Card, SegmentedControl, Avatar, Badge, ProgressBar, DonutChart, LineChart) | `src/components/ui/` | — |
| VIA-00-00-00-900A | Configuração (env, cliente Supabase) | `src/lib/supabase.ts` | — |
| VIA-10-00-00-300A | Autenticação (Supabase Auth) | `src/features/10-identidade/` | VIA-00-00-00-900A |

## SS 20 — Cadastros base

| DMC | Título | Arquivo | Depende de |
|---|---|---|---|
| VIA-20-00-00-100A | Schema de Investidor | `src/features/20-cadastros/schemas.ts` | — |
| VIA-20-00-00-300A | Acesso a dados de Investidor | `src/features/20-cadastros/api.ts` | VIA-20-00-00-100A |

## SS 30 — Obras (domínio principal)

| DMC | Título | Arquivo | Depende de |
|---|---|---|---|
| VIA-30-00-00-600A | Migração — esquema inicial (todas as tabelas de Obras) | `supabase/migrations/0001_init.sql` | — |
| VIA-30-00-00-100A | Schema de Projeto (dados gerais) | `src/features/30-obras/schemas.ts` | VIA-30-00-00-600A |
| VIA-30-00-00-300A | Acesso a dados de Projeto | `src/features/30-obras/api.ts` | VIA-30-00-00-100A |
| VIA-30-00-00-400A | Tela Dashboard do Projeto (página única) | `src/features/30-obras/components/DashboardObra.tsx` | VIA-30-00-00-300A |
| VIA-30-10-00-400A | Seção Dados gerais e unidades | `src/features/30-obras/10-dados-gerais/` | VIA-30-00-00-400A |
| VIA-30-20-00-200A | Lógica — custo pelo CUB + ajustes | `src/features/30-obras/20-terreno-custos/logic.ts` | VIA-30-00-00-100A |
| VIA-30-20-00-400A | Seção Terreno e custos (+ donut de composição) | `src/features/30-obras/20-terreno-custos/` | VIA-30-20-00-200A |
| VIA-30-30-00-400A | Seção Cronograma físico-financeiro | `src/features/30-obras/30-cronograma/` | VIA-30-00-00-400A |
| VIA-30-40-00-400A | Seção Financiamento | `src/features/30-obras/40-financiamento/` | VIA-30-00-00-400A |
| VIA-30-50-00-500A | Edge Function — busca de preços de mercado | `supabase/functions/busca-precos-mercado/` | — |
| VIA-30-50-00-400A | Seção Preço de venda e pesquisa de mercado | `src/features/30-obras/50-pesquisa-mercado/` | VIA-30-50-00-500A |
| VIA-30-60-00-200A | Lógica — fluxo de caixa, VPL, TIR, Payback, IL, EMC | `src/features/30-obras/60-indicadores/logic.ts` | VIA-30-20-00-200A |
| VIA-30-60-00-700A | Testes da lógica de cálculo (validados contra caso de referência real) | `src/features/30-obras/60-indicadores/logic.test.ts` | VIA-30-60-00-200A |
| VIA-30-60-00-300A | Acesso a dados de Cenários e Resultados | `src/features/30-obras/60-indicadores/api.ts` | VIA-30-60-00-200A |
| VIA-30-70-00-400A | Tela Resumo do Estudo (gráfico, cenários, exportar PDF) | `src/features/30-obras/70-resultado/components/ResumoEstudo.tsx` | VIA-30-60-00-300A |
| VIA-30-00-00-400B | Tela Boas-vindas | `src/app/Boasvindas.tsx` | VIA-00-00-00-400A |

## SS 80 — Integrações externas

| DMC | Título | Arquivo | Depende de |
|---|---|---|---|
| VIA-80-00-00-500A | Integração de busca/IA usada pela Edge Function de preços | `supabase/functions/busca-precos-mercado/index.ts` | — (serviço externo a decidir na implementação) |

Módulo fora desta lista não é criado sem antes entrar aqui.
