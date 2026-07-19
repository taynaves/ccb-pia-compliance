# CLAUDE.md — Regras permanentes do repositório ccb-pia-compliance
> Este arquivo é lido automaticamente pelo Claude Code em TODA sessão.
> Ele existe para impedir regressões. Nunca apagar ou ignorar.

## O projeto
Sistema web de compliance da Secretaria da Piedade (CCB, Regional Coxim-MS).
Arquivo único `index.html` + `config.js`. Publicado via GitHub Pages em
https://taynaves.github.io/ccb-pia-compliance/ (branch main).
O dono do projeto (Taynã) NÃO é programador: explique tudo em português simples,
sem jargão, e nunca presuma conhecimento técnico dele.

## Fonte de verdade
`REQUISITOS_CONSOLIDADO_CCB_PIA.md` (na raiz deste repositório) é a ÚNICA fonte de
requisitos, regras, terminologia, pendências e proibições. Leia-o integralmente
antes de qualquer alteração. Em conflito entre código e documento, pergunte.

## Regras invioláveis (resumo — detalhes no consolidado)
1. **Uma entrega por rodada.** Implementar → verificar → commitar em branch →
   mostrar ao usuário como testar → aguardar aprovação → só então merge na main.
2. **Edições cirúrgicas.** Nunca reescrever funções inteiras quando um ajuste
   pontual resolve. Nunca remover funcionalidade sem confirmação explícita.
3. **Antes de cada commit:** (a) extrair o JS do index.html e rodar `node --check`;
   (b) checagem de guarda — confirmar por grep que TODAS as funcionalidades da
   PARTE 6 do consolidado continuam presentes; (c) confirmar que nenhum item da
   PARTE 8 (obsoletos) foi reintroduzido; (d) comparar tamanho do arquivo — queda
   >2% sem remoção autorizada = investigar antes de commitar.
4. **Relatório de integridade** ao fim de cada rodada: o que mudou e por quê,
   resultado das checagens acima, suposições marcadas `[SUPOSIÇÃO]`, lacunas
   marcadas `[LACUNA]`, e classificação do risco de regressão/alucinação da
   entrega (BAIXO/MÉDIO/ALTO) com justificativa.
5. **Causa-raiz antes do patch.** Muitos "bugs de UI" deste projeto eram dados
   ausentes no Firebase (`profile.locations` vazio) ou Security Rules
   (`/reportCodes/` na raiz é PROIBIDO — tudo vive dentro do nó do checklist).
6. **Terminologia CCB:** "RMA"→"RML" só em texto visível (variáveis `rmaId` etc.
   ficam); nomes oficiais de documentos ("Termo de Verificação do Caixa",
   FOR.TES.09) são intocáveis; autoria sempre institucional neutra.
7. **Git como rede de segurança:** cada rodada em branch própria
   (`rodada/PEND-X`); se o usuário reportar quebra, oferecer `git revert`
   imediatamente. Nunca fazer force-push na main.
8. **Falha 2× no mesmo item = PARAR**, expor o problema e alternativas em
   linguagem simples, e aguardar decisão do usuário.
9. Respostas em português; código em inglês.

## Ordem de trabalho pendente
PEND-E → PEND-D → PEND-F → PEND-A → PEND-B → PEND-C → pacote CARGOS → ARQ-01/02
(definições completas no consolidado, PARTE 7). Antes da 1ª rodada, executar a
FASE 0 (auditoria) descrita no PROMPT_INICIAL e resolver TERM-01 (regressão RMA).
