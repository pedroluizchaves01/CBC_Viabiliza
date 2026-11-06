-- DMC: VIA-30-00-00-600A | Título: Obras — esquema inicial

create extension if not exists "pgcrypto";

create table investidores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  nome text not null,
  contato text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table investidores is 'SNS 20-00-00';

create table projetos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  investidor_id uuid not null references investidores(id),
  nome text not null,
  tipo text not null check (tipo in ('unidade_unica', 'multiplas_unidades')) default 'unidade_unica',
  endereco text,
  area_terreno numeric(10,2),
  valor_terreno numeric(14,2),
  cub_estado numeric(10,2),
  status text not null check (status in ('em_elaboracao', 'apresentado', 'aprovado', 'reprovado')) default 'em_elaboracao',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table projetos is 'SNS 30-00-00';

create table unidades (
  id uuid primary key default gen_random_uuid(),
  projeto_id uuid not null references projetos(id) on delete cascade,
  nome text,
  area_construida numeric(10,2) not null,
  padrao_acabamento text check (padrao_acabamento in ('popular', 'medio', 'alto')) default 'medio',
  valor_venda_estimado numeric(14,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table unidades is 'SNS 30-10-00';

create table itens_custo (
  id uuid primary key default gen_random_uuid(),
  projeto_id uuid not null references projetos(id) on delete cascade,
  tipo text not null check (tipo in ('projeto_aprovacoes', 'fundacoes_especiais', 'taxas_licencas', 'bdi_administracao', 'outro')),
  descricao text,
  valor numeric(14,2) not null default 0,
  created_at timestamptz not null default now()
);
comment on table itens_custo is 'SNS 30-20-00';

create table etapas_cronograma (
  id uuid primary key default gen_random_uuid(),
  projeto_id uuid not null references projetos(id) on delete cascade,
  ordem int not null,
  nome text not null,
  mes_inicio int not null,
  mes_fim int not null,
  percentual_custo numeric(5,2) not null,
  created_at timestamptz not null default now()
);
comment on table etapas_cronograma is 'SNS 30-30-00';

create table financiamentos (
  id uuid primary key default gen_random_uuid(),
  projeto_id uuid not null unique references projetos(id) on delete cascade,
  tem_financiamento boolean not null default false,
  instituicao text,
  percentual_financiado numeric(5,2),
  valor_financiado numeric(14,2),
  taxa_juros_aa numeric(5,2),
  carencia_meses int,
  forma_liberacao text check (forma_liberacao in ('medicao', 'parcela_unica')),
  amortizacao text check (amortizacao in ('sac', 'price', 'outro')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table financiamentos is 'SNS 30-40-00';

create table comparaveis_mercado (
  id uuid primary key default gen_random_uuid(),
  projeto_id uuid not null references projetos(id) on delete cascade,
  endereco_bairro text,
  area numeric(10,2),
  preco numeric(14,2),
  preco_m2 numeric(10,2),
  fonte text,
  url text,
  usado_como_referencia boolean not null default false,
  buscado_em timestamptz not null default now()
);
comment on table comparaveis_mercado is 'SNS 30-50-00';

create table cenarios (
  id uuid primary key default gen_random_uuid(),
  projeto_id uuid not null references projetos(id) on delete cascade,
  nome text not null default 'Base',
  delta_custo_pct numeric(5,2) not null default 0,
  delta_prazo_meses int not null default 0,
  delta_preco_venda_pct numeric(5,2) not null default 0,
  taxa_desconto_aa numeric(5,2) not null default 12,
  created_at timestamptz not null default now()
);
comment on table cenarios is 'SNS 30-60-00';

create table resultados_calculados (
  id uuid primary key default gen_random_uuid(),
  cenario_id uuid not null references cenarios(id) on delete cascade,
  vgv numeric(14,2),
  vpl numeric(14,2),
  tir numeric(6,3),
  payback_simples_meses int,
  payback_descontado_meses int,
  indice_lucratividade numeric(6,3),
  emc_valor numeric(14,2),
  emc_mes int,
  fluxo_caixa jsonb,
  calculado_em timestamptz not null default now()
);
comment on table resultados_calculados is 'SNS 30-60-00';

-- RLS: cada usuário só vê suas próprias obras e investidores.
-- Tabelas filhas herdam o acesso pelo projeto_id (exemplo para 'unidades'; repetir o padrão nas demais).

alter table investidores enable row level security;
alter table projetos enable row level security;
alter table unidades enable row level security;
alter table itens_custo enable row level security;
alter table etapas_cronograma enable row level security;
alter table financiamentos enable row level security;
alter table comparaveis_mercado enable row level security;
alter table cenarios enable row level security;
alter table resultados_calculados enable row level security;

create policy "dono ve e edita seus investidores" on investidores
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "dono ve e edita seus projetos" on projetos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "dono ve e edita unidades de seus projetos" on unidades
  for all using (exists (select 1 from projetos p where p.id = unidades.projeto_id and p.user_id = auth.uid()))
  with check (exists (select 1 from projetos p where p.id = unidades.projeto_id and p.user_id = auth.uid()));

create policy "dono ve e edita custos de seus projetos" on itens_custo
  for all using (exists (select 1 from projetos p where p.id = itens_custo.projeto_id and p.user_id = auth.uid()))
  with check (exists (select 1 from projetos p where p.id = itens_custo.projeto_id and p.user_id = auth.uid()));

create policy "dono ve e edita cronograma de seus projetos" on etapas_cronograma
  for all using (exists (select 1 from projetos p where p.id = etapas_cronograma.projeto_id and p.user_id = auth.uid()))
  with check (exists (select 1 from projetos p where p.id = etapas_cronograma.projeto_id and p.user_id = auth.uid()));

create policy "dono ve e edita financiamento de seus projetos" on financiamentos
  for all using (exists (select 1 from projetos p where p.id = financiamentos.projeto_id and p.user_id = auth.uid()))
  with check (exists (select 1 from projetos p where p.id = financiamentos.projeto_id and p.user_id = auth.uid()));

create policy "dono ve e edita comparaveis de seus projetos" on comparaveis_mercado
  for all using (exists (select 1 from projetos p where p.id = comparaveis_mercado.projeto_id and p.user_id = auth.uid()))
  with check (exists (select 1 from projetos p where p.id = comparaveis_mercado.projeto_id and p.user_id = auth.uid()));

create policy "dono ve e edita cenarios de seus projetos" on cenarios
  for all using (exists (select 1 from projetos p where p.id = cenarios.projeto_id and p.user_id = auth.uid()))
  with check (exists (select 1 from projetos p where p.id = cenarios.projeto_id and p.user_id = auth.uid()));

create policy "dono ve e edita resultados de seus cenarios" on resultados_calculados
  for all using (exists (
    select 1 from cenarios c join projetos p on p.id = c.projeto_id
    where c.id = resultados_calculados.cenario_id and p.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from cenarios c join projetos p on p.id = c.projeto_id
    where c.id = resultados_calculados.cenario_id and p.user_id = auth.uid()
  ));
