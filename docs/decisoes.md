# Diário de Decisões — Viabiliza

| Data | Decisão | Alternativas descartadas | Motivo |
|---|---|---|---|
| 2026-11-06 | Nível de maturidade: N1 (MVP local) | N0 (protótipo sem dados reais); N2 (VPS direto) | Já há dados reais de projeto/cliente desde o início; VPS é o destino, não o ponto de partida |
| 2026-11-06 | Sigla do projeto para DMC: `VIA` | — | Curta, memorável, sem conflito |
| 2026-11-06 | Modelo de dados parte de 1 unidade (suporta N) | Modelo clássico de incorporação (N unidades desde o início) | O caso real do usuário é obra única; multi-unidade é exceção, não regra |
| 2026-11-06 | Financiamento modelado de forma genérica (instituição, taxa, carência, liberação, amortização) | Regra fixa só para Caixa | Mantém o modelo correto mesmo com outro banco; detalhes finos da linha Caixa se calibram com um caso real |
| 2026-11-06 | Sem "modo apresentação" (slideshow); uma única tela de Resumo | Apresentação em tela cheia com navegação própria | Uso real é conversa ao lado do cliente, não apresentação formal |
| 2026-11-06 | Dashboard em página única (todas as seções editáveis sem trocar de tela); Resumo abre em tela separada | Fluxo em etapas (wizard) | Pedido explícito do usuário; também casa com o uso real (preencher tudo numa sessão) |
| 2026-11-06 | Indicadores financeiros (VPL positivo/negativo) mantêm verde/vermelho universal, não seguem a cor de marca | Tudo na cor de marca | Convenção forte do mercado financeiro; misturar com a marca arrisca confundir a leitura do investidor |
| 2026-11-06 | Direção visual: Apple HIG (Liquid Glass), tema escuro, cor de marca greige/taupe `#ABA594` (claro) / `#5E5B51` (escuro) | Paleta mustard inicial (interpretação errada do termo "fendi"); tema claro | Pedido explícito do usuário, com a cor exata extraída de uma amostra fornecida |
| 2026-11-06 | Resultados calculados (VPL, TIR, etc.) são guardados como snapshot por cenário (`resultados_calculados`), não recalculados a cada leitura de tela | Calcular sempre on-the-fly (view/função) | Mantém histórico de como os indicadores mudaram, e a tela de Resumo abre rápido sem recomputar fluxo de caixa toda vez |
| 2026-11-06 | Busca de preços de mercado via Edge Function (IA + busca web), com confirmação manual do usuário antes de usar o valor | Preencher automaticamente sem confirmação; só abrir link de busca pronto sem IA | Equilíbrio entre automação real (o que foi pedido) e confiabilidade — o usuário sempre valida antes do número entrar no estudo |
