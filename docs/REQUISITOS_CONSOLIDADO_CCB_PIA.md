# REQUISITOS CONSOLIDADOS — CCB PIA COMPLIANCE
## Documento-mestre unificado (v1.0 — 19/07/2026)

> **O que é este documento:** a consolidação de TODO o histórico do sistema CCB PIA Compliance,
> extraída de 3 chats de desenvolvimento (v1, v2, v3), 5 chats auxiliares e mais de 30 arquivos
> de documentação. Substitui, para fins de reconstrução/evolução, os documentos
> `REQUISITOS_VERSAO_2.md` e `REQUISITOS_VERSAO_3.md` (que permanecem como histórico).
>
> **Como editar manualmente:** cada requisito tem um código único (ex.: `RN-03`, `PEND-A`).
> Para alterar, edite o texto do item mantendo o código. Para remover, mude o status para 🚫.
> Para adicionar, crie um código novo na seção certa (ex.: `RN-13`). Se preferir, envie as
> alterações em linguagem natural ao chat integrador, citando o código, e a IA edita por você.
>
> **Legenda de status:** ✅ implementado e validado · 🔴 pendente (a implementar) ·
> ⚠️ implementado com ressalva/regressão · 🚫 obsoleto (NÃO reintroduzir) · ❓ decisão em aberto

---

## PARTE 1 — IDENTIDADE DO PROJETO

**Responsável:** Taynã Araujo Naves, Diácono — Secretário da Obra da Piedade,
Regional Coxim-MS, Congregação Cristã no Brasil (CCB).

**O que é o sistema:** aplicação web em arquivo único (HTML/CSS/JS puro, sem framework)
para preenchimento colaborativo, revisão e arquivamento do **Checklist Mensal de Compliance**
da Secretaria da Piedade (90 itens, 14 seções, base ACPI-REG/EAPI-REG), com uma segunda
camada de **Fechamento Contábil Mensal** (7 fases, 22 etapas). Múltiplos diáconos preenchem
simultaneamente em tempo real via Firebase Realtime Database.

**Site:** https://taynaves.github.io/ccb-pia-compliance/
**Repositório:** github.com/taynaves/ccb-pia-compliance (branch: main)
**Stack:** HTML/CSS/JS puro + Firebase Realtime DB + Firebase Auth (Google) + jsPDF
+ Google Apps Script (proxy IA/e-mail — externo, ainda não configurado)

**Por que o sistema existe (caso de uso real):** a auditoria do cofre físico (jan–mai/2026)
comprovou que a ausência de conferências mensais gera furos não explicados e erros contábeis
não detectados. O sistema é o instrumento de prevenção e detecção desses problemas.

---

## PARTE 2 — DECISÕES ARQUITETURAIS PARA A RECONSTRUÇÃO

Estas são decisões NOVAS, derivadas da análise integrada de todo o corpus. Devem ser
aplicadas em qualquer evolução ou reconstrução:

| Cód. | Decisão | Justificativa |
|---|---|---|
| ARQ-01 | 🔴 **O conteúdo do checklist (itens, seções, criticidade) deve ser DADO, não código.** Os 90 itens hoje estão hardcoded na constante `ITEMS`. Devem migrar para uma estrutura carregável (nó `/appConfig/checklistDef` no Firebase, com fallback embutido no código para o conjunto atual). | A Etapa 5a do Sistema de Gestão Normativa produzirá um novo checklist canônico que **incorpora e expande** o atual (decisão registrada: "incorporado e expandido, não substituído"). Sem isso, cada atualização normativa exigirá reescrever o sistema. Resolve definitivamente o antigo REQ-C/REQ-18 (itens ACPI da Piedade). |
| ARQ-02 | 🔴 **A imagem da CCB (base64, ~150 KB — 45% do arquivo) deve sair do `index.html`** e virar arquivo separado no repositório (`ccb_church_small.png`), referenciada por `<img src>`. Manter fallback base64 apenas se o PDF exigir. | O arquivo dobrou de tamanho (178→336 KB) por causa do base64 na linha 525. Arquivo menor = menos risco de truncamento/corrupção nas rodadas de edição por IA (causa comprovada de regressões). |
| ARQ-03 | ✅ **Manter arquitetura de arquivo único + `config.js` separado.** Não migrar para framework. | Decisão histórica validada; simplifica o deploy no GitHub Pages e o fluxo de edição. |
| ARQ-04 | 🔴 **Toda falha deve produzir mensagem de erro visível e específica.** Proibido o padrão "clica e nada acontece". | Identificado nos 3 chats como a principal origem da desconfiança no sistema. |
| ARQ-05 | 🔴 **O sistema deve funcionar como checklist manual imprimível mesmo com dados vazios** — relatório gera sempre, com aviso, nunca bloqueia. | Regra estabelecida na rodada 3 do chat v3. |
| ARQ-06 | ❓ **Interface com o futuro "Sistema de Orientação aos Trabalhos"** (checklist por setor + tutoriais SIGA + vídeos): decidir se será sistema separado ou módulo deste. Registrado como questão em aberto — NÃO implementar agora. | Projeto paralelo ainda em levantamento. |

---

## PARTE 3 — INFRAESTRUTURA TÉCNICA (fatos, não requisitos)

### 3.1 Firebase — config.js (valores reais desta instalação)
```javascript
window.APP_CONFIG = {
  APP_TITLE:   "Checklist Mensal de Compliance",
  APP_ORG:     "Congregação Cristã no Brasil",
  APP_VERSION: "3.0",   // ← atualizar na reconstrução (hoje ainda declara "2.0")
  APP_FOOTER:  "Secretaria da Piedade | Obra da Piedade",
  FIREBASE: {
    apiKey:            "AIzaSyAQqnWyijR4L1awcg4CMFTTcB6K29ycQ2w",
    authDomain:        "ccb-pia-compliance.firebaseapp.com",
    databaseURL:       "https://ccb-pia-compliance-default-rtdb.firebaseio.com",
    projectId:         "ccb-pia-compliance",
    storageBucket:     "ccb-pia-compliance.firebasestorage.app",
    messagingSenderId: "175284938289",
    appId:             "1:175284938289:web:67a4d8f447c86cb86a9710"
  },
  ALLOWED_DOMAINS: [],
  AI_PROXY_URL: "",
  LOGIN_IMAGE_SIZE_PCT: 100,
};
```

### 3.2 Schema do Realtime Database (pós-correções)
```
/users/{uid}
  name, email, role, locations[], isSuperUser, isSiteAdmin, approved
  systemDriveFolder, personalDriveFolder

/appConfig
  locations/{rrmId}/{rmaId}/{pointId}     ← árvore GLOBAL (Admin)
  systemDriveFolder, loginImageSize, aiProxyUrl
  checklistDef (ARQ-01, a criar)

/checklist/{rrmId}/{rmaId}/{pointId}
  status (draft|em_revisao|publicado) · month (YYYY-MM)
  items/{001-090}/status, obs, updatedBy, updatedByName
  fields/mes, dataEnc, municipio · signames[0-3] · contributors/{uid}
  reportCode, printCount              ← DENTRO do nó (nunca na raiz!)

/fechamento/{rrmId}/{rmaId}/{pointId}/{YYYY_MM}
  steps/{1-22}/status, valA, valB, justification, obs, date, resp
  attest/internal, external, divergences, signature, date
```

**⛔ PROIBIÇÃO ABSOLUTA:** caminhos de raiz `/reportCodes/` e `/reports/` ficam FORA das
Security Rules e geram `permission_denied`. Qualquer contador/código vive dentro do nó
do checklist. (Bug real, corrigido na rodada 4 do chat v3 — não reintroduzir.)

### 3.3 Distinção crítica: configuração global × perfil pessoal
- `/appConfig/locations` = árvore global gerenciada pelo Admin (⚙). Cadastrar aqui
  **não** dá acesso a ninguém.
- `/users/{uid}/locations[]` = localidades de CADA usuário, configuradas no Perfil (👤).
  O usuário só enxerga o checklist das localidades da SUA lista.
- Se `profile.locations` estiver vazio → `S.clRef = null` → **todo o checklist trava
  silenciosamente**. Causa-raiz comprovada dos "bugs de radio button" das rodadas 2–3.
  Deve haver aviso explicativo visível (já existe no `ident-card` — preservar).

---

## PARTE 4 — REGRAS DE NEGÓCIO (RN)

| Cód. | Regra | Fonte |
|---|---|---|
| RN-01 | ✅ Prazo do fechamento: **até o dia 20 do mês subsequente** (ago → 20/set). É limite obrigatório, não estimativa. Campo calcula automaticamente e atualiza ao trocar o mês. Rótulo: "Fechamento até (prazo máximo)". | v2/v3 + DOC-16/18/24 |
| RN-02 | ✅ **Superusuário único por instalação** = primeiro login em Firebase vazio; nunca fixo no código. "Administrador do Site" tem todos os poderes operacionais EXCETO designar/remover administradores e editar a Pasta Drive do sistema. Toda checagem usa `isPrivileged()`. | v2 |
| RN-03 | ✅ **Sigilo (Conselho Fiscal/Estatuto):** dados individuais de atendidos (nome, valor) nunca aparecem para não-privilegiados; Etapa 15 do fechamento visível só para `isPrivileged()`. Qualquer novo item que toque dados individuais herda essa regra. | v2 |
| RN-04 | ✅ Workflow do checklist: draft → em_revisao → publicado; envio à revisão dispara e-mail via proxy Apps Script (fetch), com toasts separados de sucesso/erro (não mascarar um pelo outro). | v3 |
| RN-05 | ✅ Relatório PDF/.md com código de rastreamento e contador de impressões (dentro do nó do checklist). Histórico de publicados com reimpressão. | v3 |
| RN-06 | ✅ Bloco dos **7 documentos obrigatórios no fechamento** (REQ-17), em destaque amarelo/laranja, com o texto oficial (Relatório de Viagem Missionária; Protocolo de Entrega; DTS Almoxarifado; Movimento Financeiro; Atas+Lista+Posição das 3 reuniões; Extratos Bancários e Sistema Consolidado; Inventário da Lojinha) + lembrete do dia 20. | v2 |
| RN-07 | ✅ Campo de **Município editável** na área de assinaturas (default "Coxim/MS"). | REQ-23 |
| RN-08 | 🔴 **Regras contábeis canônicas da Camada 2** (herdadas da auditoria real do cofre — incorporar como texto de orientação nas etapas correspondentes): (a) em divergência, o **Extrato SIGA prevalece** sobre o Razão Gerencial; (b) apuração de saldo cruza **no mínimo 3 fontes** (Razão, Extrato, C-9); (c) transferências entre PIAs (conta 21012) exigem **conciliação bilateral** com a PIA receptora; (d) cofre físico = **exclusivamente 10010+10020+10030** (bancos 101/x, aplicações 103/x e adiantamentos 104/4 ficam fora). | Chat auditoria |
| RN-09 | ✅ **Metodologia de conciliação em dois planos** (fundamento do Mapa v2): coerência interna (relações entre relatórios SIGA) + ancoragem externa (documento-fonte real). Conformidade total exige os dois. A robustez depende da ESTRUTURA das relações, não de valores de exemplo. | v2 |
| RN-10 | ✅ Overlay de aviso de rotação em mobile portrait, com "Usar na vertical mesmo" e reativação ao girar. | v3 |
| RN-11 | ✅ Presença online (usuários simultâneos) + atribuição de seções (ver PEND-C). | v3 |
| RN-12 | ✅ Autosave no fechamento (800 ms); atestado de conformidade da Fase 7 desabilitado até as 22 etapas concluídas. | v2 |

---

## PARTE 5 — TERMINOLOGIA E LINGUAGEM INSTITUCIONAL

| Cód. | Regra |
|---|---|
| TERM-01 | ⚠️ **RMA → RML** (Reunião dos Mordomos Locais) em TODO texto visível ao usuário. Variáveis internas (`rmaId`, `rmas`, `addRma()`) permanecem, por compatibilidade com o Firebase. **ATENÇÃO — REGRESSÃO DETECTADA:** a inspeção do `index.html` v03 (19/07/2026) encontrou ≥9 ocorrências de "RMA" em texto visível (linhas ~864, 1028, 1041, 1104, 1792, 1815, 1914, 1919, 1922) e nenhuma "RML" real. A troca deve ser (re)aplicada integralmente na próxima sessão. |
| TERM-02 | ✅ **"Verificação" → "Conferência"** APENAS nos papéis de assinatura (`SIGS`, `lbl` do responsável — já aplicado). NUNCA alterar nomes oficiais de documentos CCB ("Termo de Verificação do Caixa", FOR.TES.09, "Protocolo de Entrega de Documentos" etc.). |
| TERM-03 | ✅ Autoria neutra: "Criado pela RRM-COXIM.MS, para uso interno — V.X.X. Não faz parte de um programa/sistema oficial da CCB." (em PDF, login e rodapé). Proibida autoria pessoal **nesses locais**. **EXCEÇÃO autorizada pelo dono (20/07/2026):** APENAS na aba "Sobre" da Ajuda usa-se autoria pessoal — "Criado por: Dr. Taynã Naves, diácono / RRM COXIM, MS / Congregação Cristã no Brasil". PDF, login e rodapé permanecem neutros. |
| TERM-04 | ✅ Linguagem CCB em qualquer texto gerado: nunca "Vossa Cooperação" (→ irmão/irmã); nunca "Bom dia/Boa tarde" em texto formal (→ "A paz de Deus!" no informal); nunca "político" para deliberações (→ "deliberativo-distributivo"/"normativo-distributivo"). |

---

## PARTE 6 — FUNCIONALIDADES DE GUARDA (já funcionam — proibido quebrar)

Login Google · telas loading/login/pending/profile/select/app/fechamento · 3 níveis de
acesso · Painel Admin (localidades RRM→RML→Pontos, usuários, config) · checklist 90
itens/14 seções com radio buttons de linha inteira clicável e clique único · workflow
completo · relatório PDF+.md com rastreamento · exportação/importação .md · análise IA
Gemini (condicional a `AI_PROXY_URL`) · histórico com reimpressão · "↺ Novo mês"
re-renderizando · campo prazo dia 20 · bloco REQ-17 · município editável · Camada 2
completa (7 fases/22 etapas, conciliação, diferença automática) · overlay mobile ·
imagem real da CCB (não o SVG de IA) · e-mail via proxy com toasts separados ·
cabeçalho PDF com imagem 28×22 mm (proporção 287:228).

> Antes de QUALQUER entrega, verificar por leitura/grep que todas continuam presentes.

---

## PARTE 7 — PENDÊNCIAS A IMPLEMENTAR (rodada 7 do chat v3 — ainda válidas)

Ordem de execução recomendada: **E → D → F → A → B → C → CARGOS**.

| Cód. | Requisito |
|---|---|
| PEND-E | 🔴 Botão "📍 Qual localidade hoje?" deve ficar **à esquerda** do rótulo da localidade atual na topbar, e a condição de exibição deve ser `profile?.locations?.length >= 1` (a condição `> 1` é regressão confirmada). |
| PEND-D | 🔴 Dropdown de localidade/ponto na tela principal: implementar como `<select>` real populado com `profile.locations`, permitindo trocar de contexto sem ir à tela de seleção. Verificar se `#ctx-rrm`, `#ctx-rml`, `#ctx-pt` (rodada 3) ainda existem no HTML — houve regressão por reenvio de versão antiga. |
| PEND-F | 🔴 Cabeçalho do PDF: SEM mudar largura da imagem nem tamanho das fontes, recalcular as posições Y das 4 linhas dentro da altura útil da imagem (22 mm), de modo que: topo da 1ª linha = topo da imagem; base da 4ª = base da imagem; espaços 1-2 e 2-3 mínimos; espaço 3-4 maior. Usar altura real da fonte (≈ fontSize × 0,352 mm/pt), não posições fixas. |
| PEND-A | 🔴 Modal de relatório: **restaurar** "☁ Salvar no Google Drive" (do sistema/Admin, com aviso se OAuth ausente — removida por engano na rodada 6) e **adicionar** opção de salvar no Drive **pessoal** do usuário logado (`personalDriveFolder`). Coexistindo com Baixar PDF / Baixar .md / Baixar ambos. |
| PEND-B | 🔴 Ao gerar relatório, itens sem nenhum status recebem automaticamente "não realizado" (mapear para `PEND`). ❓ **Decisão em aberto (perguntar antes de codificar):** (a) só na exibição do relatório, sem gravar no Firebase [recomendado], ou (b) gravação permanente em `items/{id}/status`. |
| PEND-C | 🔴 Botão "👤 Atribuir" funcional: (1) nome do responsável pela conferência da seção aparece imediatamente à esquerda do botão; (2) atribuições saem no relatório (PDF e .md); (3) o atribuído entra como assinante extra do relatório — exceto se já estiver na lista (sem duplicidade). |
| PEND-G | 🔴 A guardrail de processo pedida pelo usuário ("não desfazer o que já funciona") está formalizada na PARTE 9 e no metaprompt — vale para toda sessão futura. |
| PEND-H | 🔴 **(FASE FUTURA) Gestão de permissões por nível.** O **superusuário** gerencia permissões e localidades de TODOS os usuários, em todos os níveis. O **administrador** gerencia no nível da sua RML. Ambos (superusuário e administrador) podem configurar o **perfil completo** de qualquer usuário (dados, cargo/função, localidades, papéis). Registrado a pedido do dono em 20/07/2026; NÃO implementar agora — depende de definição do modelo de administrador por RML. |

### CARGOS — Cadastro de cargos/funções + assinaturas + autocomplete (pacote à parte)
🔴 Tratar como pacote próprio, com rodada de confirmação antes de codificar:

1. **Listas oficiais** (cadastráveis/removíveis livremente):
   - Cargos: Diácono · Auxiliar
   - Funções dos auxiliares: Colaborador da Escrituração da Obra da Piedade · Colaborador
     de Estoque/Expedição · Triagem-Depósito Obra da Piedade · Colaborador de Escrituração
     Fiscal · Colaborador Administrativo-Assistente · Colaborador de Contabilidade
   - Funções exclusivas de diáconos: Secretário · Tesoureiro · Procurador (bancos e
     caixas) · Resp. Setor de Verificação · Resp. Setor de Voluntário · Resp. Setor da
     Piedade · Resp. Setor de Produtos/Serviços · Resp. Setor de Viagens · Resp. Setor
     de Contabilidade
   - Papéis de fluxo do checklist (não institucionais): Supervisor · Revisor ·
     Responsável pela Conferência
2. Interface no **Perfil (👤)**: o próprio usuário escolhe cargo e função(ões).
3. Interface no **Painel Admin (⚙)**: Admin cadastra diáconos/auxiliares e atribui
   cargos/funções a qualquer usuário.
4. **Assinaturas do relatório** — uma informação por linha, abaixo da linha de assinatura,
   sem sobrepor a área: (1) Nome completo; (2) Cargo; (3) Função; (4) Função secundária,
   se houver; (5) [só nos 2 primeiros signatários] responsabilidade: "Responsável pela
   conferência" ou "Responsável pela revisão (da conferência e do relatório)". Os 2
   últimos são apenas "Diácono", sem 5ª linha.
5. **Pré-carregamento**: sugerir os assinantes do último relatório do mesmo ponto; sem
   anterior, usar os do relatório atual.
6. **Autocomplete**: ao digitar, lista com nomes cadastrados que contenham o trecho
   (qualquer parte de nome/sobrenome); navegação por TAB/SHIFT+TAB ou clique. Fonte:
   cadastro mantido pelo Admin (nunca lista aberta de contas Google).

### Ajustes confirmados pelo dono (20/07/2026) sobre CARGOS
- **Cargos (só 1 por usuário):** Diácono · Irmã da Piedade · Auxiliar.
- **Irmã da Piedade** usa a MESMA lista de funções de Auxiliar (decisão "a").
- **Funções de auxiliar (7):** Colaborador de Escrituração da Obra da Piedade · Colaborador
  Financeiro · Colaborador de Estoque/Expedição · Colaborador de Triagem-Depósito Obra da
  Piedade · Colaborador de Escrituração Fiscal · Colaborador Administrativo-Assistente ·
  Colaborador de Contabilidade.
- **Funções de diácono (9):** Secretário · Tesoureiro · Procurador · Membro do Grupo
  Verificador · Responsável pelos Voluntários · Responsável pela Piedade · Responsável pelo
  Almoxarifado (Produtos/Serviços) · Responsável pelas Viagens · Responsável pela Contabilidade.
- **Quem atribui:** o Admin/superusuário define cargo e funções de cada usuário (NÃO é
  auto-atribuição). Novo usuário no 1º login nasce **Auxiliar / Colaborador de Escrituração
  da Obra da Piedade**. O usuário só escolhe **quais** das suas funções aparecem no relatório.
- **Papéis de fluxo** (Supervisor · Revisor · Responsável pela Conferência): tratados à parte,
  ligados às assinaturas do relatório (CARGOS-4), não como função institucional da pessoa.

## PARTE 7-B — MÓDULO DE PERMISSÕES E HIERARQUIA (PERM) — pedido em 20/07/2026
> Requisito do dono: **construir como MÓDULO ISOLADO** (seção própria do código, com suas
> constantes/funções e nós de Firebase bem delimitados), para que alterações aqui não afetem
> o restante do sistema. Sujeito à rodada de confirmação de arquitetura antes de codificar.

| Cód. | Regra |
|---|---|
| PERM-01 | 🔴 **Superusuário**: pode tudo. É o ÚNICO que altera o código do sistema e executa ações com questões críticas de segurança/sigilo. É **sempre supervisor geral**. Único por instalação (primeiro login). |
| PERM-02 | 🔴 **Três níveis de administrador e três de supervisor:** local (RML) · regional (RRM) · geral (supraregional, +de uma RRM). |
| PERM-03 | 🔴 Todo administrador (e o superusuário) é **supervisor por padrão**. Um administrador pode **revogar/reativar** a própria função de supervisor a qualquer momento (botão liga-desliga). |
| PERM-04 | 🔴 **Somente o superusuário** atribui o papel de supervisor e o **domínio** da supervisão (local/regional/geral), sem restrição. |
| PERM-05 | 🔴 **Supervisores** são responsáveis por um grupo de **revisores** e têm acesso a **todos os relatórios e versões** produzidos por sua equipe de revisores (dentro do seu domínio). |
| PERM-06 | 🔵 **(FASE FUTURA)** Cada supervisor terá uma **página de logs** com todas as ações de sua área de influência (todos os subordinados ao seu domínio). |
| PERM-07 | 🔴 Mapear a migração do atual `isSiteAdmin`/`isSuperUser`/`isPrivileged()` para este novo modelo de níveis (definir na rodada de arquitetura). |

---

## PARTE 8 — OBSOLETOS E EVOLUÍDOS (🚫 NÃO reintroduzir / histórico)

| Item | O que aconteceu |
|---|---|
| `promoteToSuperUser()` / múltiplos superusuários | 🚫 Substituído pelo conceito "Administrador do Site" (`makeSiteAdmin`/`removeSiteAdmin`/`isPrivileged`). |
| Ícone/loading em SVG gerado por IA | 🚫 Rejeitado pelo usuário → substituído pela imagem real `ccb_church_small.png` (287×228 px). |
| `MAPA_CONCILIACAO_PIEDADE_v1.md` | 🚫 Superado pelo v2 (o definitivo). |
| Caminhos `/reportCodes/` e `/reports/` na raiz | 🚫 Causa de `permission_denied` → dados movidos para o nó do checklist. |
| "Criado por Dr. Taynã Naves" | 🚫 no PDF, login e rodapé (texto institucional neutro — TERM-03). ⚠️ EXCEÇÃO: reautorizado pelo dono APENAS na aba "Sobre" da Ajuda (20/07/2026 — ver TERM-03). |
| Rótulo "Data prevista de fechamento" | 🚫 → "Fechamento até (prazo máximo)". |
| Regra "📊 RECOMENDAÇÃO DE MODELO" ao fim de cada resposta | 🚫 Regra de processo de UM chat específico (v2); não é requisito do sistema. Reavaliar só se o usuário pedir. |
| Campos Ponto/Local como texto disabled (BUG-04) | Evoluiu → decisão final é o dropdown real (PEND-D). |
| Itens "ACPI da Piedade" como lista manual (REQ-C/REQ-18) | Evoluiu → resolvido estruturalmente por ARQ-01 (checklist como dado) + insumos da Etapa 5a do Sistema de Gestão Normativa (239 itens + mapas das Etapas 1-3). |
| `PROMPT_AUDITORIA_COFRE_PIEDADE_v1.md` | 🚫 (projeto auditoria) Abordagem rejeitada; auditoria refeita mês a mês com documentos reais. Não usar CIs como fonte contábil. |

---

## PARTE 9 — GUARDRAILS DE PROCESSO (obrigatórios em toda sessão)

1. **Trabalhar sempre sobre o arquivo mais recente** — confirmar com o usuário qual
   `index.html` está de fato publicado (houve inconsistências comprovadas entre o
   entregue e o em uso).
2. **Nunca remover funcionalidade sem pedido explícito**; remoções propostas devem ser
   listadas para confirmação ANTES (a opção de Drive já foi perdida assim uma vez).
3. **Checagem de guarda**: antes de cada entrega, verificar por grep/leitura que TODOS
   os itens da PARTE 6 continuam no arquivo.
4. **Correções cirúrgicas** (str_replace pontual), nunca reescrita global quando um
   ajuste local resolve.
5. **`node --check` no JS extraído** antes de qualquer entrega.
6. **Causa-raiz antes do patch** — vários "bugs de CSS" eram dados ausentes no Firebase
   ou Security Rules.
7. **Uma entrega por rodada**, com validação do usuário antes de prosseguir.
8. **Terminologia CCB intocável** (TERM-02).
9. **Português** nas respostas; termos de código em inglês.
10. **Equivalência com âncora** (herdado do PROMPT_MESTRE): material refeito deve ter
    conteúdo ≥ ao anterior, com gate de paridade (tabela Seção|Status|Observação) antes
    da entrega; sem âncora, declarar `[LACUNA: ...]` e perguntar — nunca supor.
11. **Honestidade documental**: nunca inventar datas, números, nomes ou conteúdos; a
    incerteza é declarada, não preenchida.

---

## PARTE 10 — QUESTÕES EM ABERTO (❓ responder antes/durante a próxima sessão)

| Cód. | Questão |
|---|---|
| QA-01 | Qual `index.html` está publicado hoje no GitHub Pages? (O v03 analisado tem "RMA" visível e versão "2.0" — pode não ser o último entregue.) |
| QA-02 | PEND-B: atribuição automática de "não realizado" é só exibição (a) ou gravação (b)? |
| QA-03 | ARQ-01: migrar os 90 itens para `/appConfig/checklistDef` já nesta sessão ou preparar apenas a estrutura? |
| QA-04 | Lacunas nunca discutidas (da análise de engenharia do chat v2): backup/redundância do Firebase; log de auditoria completo (quem mudou o quê); recuperação do superusuário (perda da conta Google); comportamento offline; visão consolidada entre Pontos; reabertura de mês publicado. Priorizar alguma? |
| QA-05 | Apps Script (`sendEmail`, `saveToAdminDrive`, análise Gemini): configurar nesta fase ou manter como etapa externa? |
| QA-06 | Sistema de Orientação aos Trabalhos: separado ou módulo futuro? (ARQ-06) |

---

## PARTE 11 — FORA DO ESCOPO DO index.html

`ci_generator.py` (CIs/Ofícios .docx — numeração: última CI 33/26, último Ofício 03/2026)
· `MAPA_CONCILIACAO_PIEDADE_v2.md/.docx` (referência normativa da Camada 2) ·
`Checklist_Fechamento_Mensal_Piedade.docx` · configuração/publicação do
`apps_script_code.gs` como Web App · **Gestor de Documentos** (projeto GAS separado, com
documentação própria: `CHECKPOINT_GestorDocs_v5.md` + `REQUISITOS_v6.md`) · Sistema de
Gestão Normativa (Etapas 4-6 pendentes; alimentará ARQ-01 no futuro).

---

*Documento gerado pelo chat integrador em 19/07/2026 a partir do corpus completo
(4 lotes do sistema principal + 5 resumos auxiliares + inspeção técnica do index.html v03).
Nenhum requisito foi inventado; cada item é rastreável aos documentos-fonte.*
