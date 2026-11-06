# SNS — Numeração de Sistemas do Viabiliza

Formato `SS-SE-AS` (sistema-seção-assunto), seções em múltiplos de 10.

| SS | Sistema | Status |
|---|---|---|
| 00 | Núcleo — design system (GlassBar, Card, SegmentedControl, Avatar, Badge, gráficos), tokens visuais, layout | ativo |
| 10 | Identidade e acesso — login (Supabase Auth), 1 usuário no ciclo atual | ativo |
| 20 | Cadastros base — Investidores | ativo |
| 30 | **Obras** (domínio principal) — ver detalhamento abaixo | ativo |
| 40 | Domínio principal B | reservado — sem uso neste ciclo |
| 50 | Financeiro e pagamentos | reservado — sem cobrança no MVP |
| 60 | Documentos e conformidade | reservado — futura exportação/exclusão LGPD dos dados do investidor |
| 70 | Arquivos e mídia | reservado — futuro anexo de fotos do terreno/obra |
| 80 | Integrações externas — busca de preços de mercado (Edge Function) | ativo |
| 90 | Infraestrutura e administração — configuração, variáveis de ambiente | ativo |

## Detalhamento do SS 30 — Obras

| SE | Assunto |
|---|---|
| 00 | Geral — CRUD do projeto raiz, status (em elaboração / apresentado / aprovado / reprovado) |
| 10 | Dados gerais e unidades |
| 20 | Terreno e orçamento de obra (CUB + ajustes) |
| 30 | Cronograma físico-financeiro |
| 40 | Financiamento |
| 50 | Pesquisa de mercado (comparáveis) |
| 60 | Cenários e indicadores (motor de cálculo: VGV, VPL, TIR, Payback, IL, EMC) |
| 70 | Resultado e exportação (tela de Resumo, PDF) |

Um sistema só importa outro pela sua interface pública (`index.ts`); regra de negócio só vive em `logic.ts` (IC200), nunca em componente de tela.
