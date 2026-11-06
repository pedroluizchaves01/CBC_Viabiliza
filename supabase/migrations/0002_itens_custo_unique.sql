-- DMC: VIA-30-20-00-600A | Título: Obras › Terreno e custos › restrição de unicidade

alter table itens_custo add constraint itens_custo_projeto_tipo_key unique (projeto_id, tipo);
