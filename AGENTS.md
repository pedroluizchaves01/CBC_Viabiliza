# AGENTS.md — Viabiliza

Ferramenta de estudos de viabilidade financeira de obras residenciais, para apresentar a clientes investidores. Nível atual: **N1 — MVP local**.

## Stack e comandos

React + Vite + TypeScript `strict` + Tailwind CSS v4 + TanStack Query + React Hook Form + Zod + Supabase (Postgres, Auth).

- `npm run dev` — servidor local
- `npm run build` — build de produção
- `npm run typecheck` — checagem de tipos
- `npm run test` — testes (Vitest)
- `npm run lint` — lint (oxlint)

## Documentação de referência

- `docs/programa.md` — programa do produto (problema, perfis, jornada, decisões)
- `docs/decisoes.md` — diário de decisões estruturais
- `docs/glossario.md` — um termo, um significado
- `docs/SNS.md` — numeração de sistemas (domínio concentrado no capítulo 30 — Obras)
- `docs/DMRL.md` — lista de módulos previstos; nada fora dela é criado
- `supabase/migrations/` — esquema do banco, com RLS por usuário desde o N1

## Design system

Tema escuro, estilo Apple (Liquid Glass), cor de marca greige/taupe (`#ABA594` claro / `#5E5B51` escuro para contraste). Componentes em `src/components/ui/`. Indicadores financeiros (positivo/negativo) usam verde/vermelho universal, não a cor de marca.

## Estrutura

Um sistema só importa outro pela sua interface pública (`index.ts`). Regra de negócio só em `logic.ts`, nunca em componente de tela. Cada seção do dashboard é um componente de feature próprio, montado junto na mesma página (`DashboardObra.tsx`).

## Fluxo de git

Branch por módulo/fatia → preview local → aprovação do usuário → commit → push. Nada é commitado ou enviado ao GitHub sem o usuário ver o resultado rodando primeiro.
