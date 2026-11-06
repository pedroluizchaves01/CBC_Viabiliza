# Viabiliza — Programa do Produto

> DMC: VIA-00-00-00-000A · Emissão: não-verificado · Atualizado em 2026-11-06

## Problema e objetivo

Hoje os estudos de viabilidade financeira de obras são montados manualmente (planilha), sem padronização de cálculo e sem uma forma própria de apresentar os números para o cliente investidor. O Viabiliza existe para montar esses estudos de forma consistente e apresentá-los com confiança, direto da tela, numa conversa com o investidor.

**Métrica de sucesso:** o tempo de montagem de um estudo cai, os cálculos são consistentes entre projetos, e o usuário consegue conduzir a conversa com o investidor direto pela tela (sem depender de Excel/PDF externo).

## Perfil de usuário

Único perfil no ciclo atual: o dono do produto (engenheiro/consultor), que cadastra a obra, preenche os dados e conduz a conversa com o investidor a partir do dashboard.

## Jornada principal

1. Criar projeto (obra): nome, cliente investidor, endereço, terreno.
2. Informar terreno, orçamento de obra (CUB + ajustes) e, se houver, mais de uma unidade.
3. Pesquisar/informar o preço de venda (com apoio de busca de preços de mercado).
4. Informar o cronograma físico-financeiro da obra.
5. Informar financiamento (se houver): instituição, taxa, carência, forma de liberação, amortização.
6. Calcular o estudo e ver o Resumo: VGV, VPL, TIR, Payback, IL, EMC, fluxo de caixa, cenários.
7. Conversar com o investidor a partir da tela de Resumo; exportar PDF se necessário.

## Entidades e ações

**Entidades:** Investidor, Projeto (obra), Unidade, Item de custo, Etapa do cronograma, Financiamento, Comparável de mercado, Cenário, Resultado calculado.

**Ações:** cadastrar investidor, criar projeto, informar custos, informar cronograma, pesquisar preços de mercado, informar financiamento, calcular estudo, comparar cenários, exportar PDF.

## Decisões estruturais já fechadas (ver `decisoes.md` para o histórico completo)

- Parte sempre de **uma unidade** (casa unifamiliar), com suporte a múltiplas quando o caso pedir — não é o modelo clássico de incorporação com N unidades desde o início.
- Pode haver **financiamento** (prioritariamente Caixa), modelado de forma genérica (instituição, taxa, carência, forma de liberação, amortização) para não travar em uma regra única de um banco.
- Não existe "modo apresentação" de slideshow — existe uma tela de **Resumo do Estudo**, pensada para ficar aberta durante a conversa com o cliente.
- Interface em **página única (dashboard)** para edição; o Resumo abre como tela separada.
- Direção visual: estilo Apple (Liquid Glass / iOS mais recente), **tema escuro**, cor de marca greige/taupe (`#ABA594` claro / `#5E5B51` escuro), com elementos visuais (gráficos reais, donut de composição de custo, barras de progresso, avatares, selos).

## Fora do escopo deste ciclo

Múltiplos usuários/login de equipe, portal de acesso do investidor, integração com ERP, emissão de documento jurídico de incorporação/patrimônio de afetação, cobrança/pagamento dentro do próprio app.

## Nível de maturidade

**N1 — MVP local.** Uso real, só o usuário, local + Supabase (dev), dados em Postgres com migrações, Supabase Auth simples. Evolui para N2 (VPS) quando o uso for validado com clientes reais.
