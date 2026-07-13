# Relatório de Avaliação Heurística — Projeto 1
Autor: Thyago Diniz
Data: 13/07/2026
Score Lighthouse (Acessibilidade): 78 / 100

## Problema 1
- Onde: Campos de formulário
- O que observei: Os campos de formulário não têm elementos de <label> associados, apenas placeholder
- Heurística violada: #4 Consistência e padrões
- Gravidade: 3
- Correção proposta: Colocar <label> em todos os campos de fórmulário
- Evidência: images/problema-1.png

## Problema 2
- Onde: Erros na página
- O que observei: Erros são indicados apenas por cor e texto
- Heurística violada: #9 Reconhecer e resolver erros
- Gravidade: 2
- Correção proposta: Colocar ícones de erro e mensagens mais descritivas
- Evidência: images/problema-2.png

## Problema 3
- Onde: Fórmulários
- O que observei: Ao criar/remover algo, o usuário não recebe feedback visual
- Heurística violada: #1 Visibilidade do status
- Gravidade: 2
- Correção proposta: Adicionar feedback visual para ações do usuário, como mensagens de sucesso ou erro
- Evidência: images/problema-3.png

## Problema 4
- Onde: Lista de itens
- O que observei: Quando o JS injeta ou atualiza a lista no DOM, não há aviso para um leitor de tela
- Heurística violada: #1 Visibilidade do status
- Gravidade: 2
- Correção proposta: Colocar <aria-live="polite"> em regiões que recebem atualizações dinâmicas
- Evidência: images/problema-4.png

## Problema 5
- Onde: Lista de itens
- O que observei: Após remover um item, o foco cai no vazio
- Heurística violada: #1 Visibilidade do status
- Gravidade: 3
- Correção proposta: Após remover um item, colocar o foco no próximo item da lista
- Evidência: images/problema-5.png

## Resumo
- Total de problemas: 5
- Problemas de gravidade 3–4 (prioritários): 2
- Score de acessibilidade: 78 / 100
- Os 3 que vou corrigir primeiro no E7: Problema 1, Problema 5 e Problema 3