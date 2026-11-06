# Viabiliza

Estudos de viabilidade financeira de obras residenciais, para apresentar a clientes investidores.

## Stack

React + Vite, TypeScript `strict`, Tailwind CSS v4, TanStack Query, React Hook Form + Zod, Supabase (Postgres, Auth).

## Rodando localmente

```bash
npm install
cp .env.example .env   # preencha com a URL e a chave publicável do seu projeto Supabase
npm run dev
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor local |
| `npm run build` | Build de produção (`tsc -b && vite build`) |
| `npm run typecheck` | Checagem de tipos, sem emitir arquivos |
| `npm run test` | Roda os testes (Vitest) |
| `npm run lint` | Lint (oxlint) |

## Documentação

- [`docs/programa.md`](docs/programa.md) — programa do produto
- [`docs/decisoes.md`](docs/decisoes.md) — diário de decisões
- [`docs/glossario.md`](docs/glossario.md) — glossário
- [`docs/SNS.md`](docs/SNS.md) — numeração de sistemas
- [`docs/DMRL.md`](docs/DMRL.md) — lista de módulos previstos
- [`supabase/migrations/`](supabase/migrations/) — esquema do banco

## Nível atual

**N1 — MVP local.** Ver `docs/programa.md` para o critério de evolução para N2 (VPS/Coolify).
