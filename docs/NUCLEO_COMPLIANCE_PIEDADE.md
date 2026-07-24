# NÚCLEO DE COMPLIANCE DA OBRA DA PIEDADE
## O "coração" do sistema · Roteiro-mestre de todos os procedimentos · CCB · Regional Coxim-MS

> **O que é este arquivo (em uma frase):** é o **coração** (o *núcleo duro*) de todo o compliance
> da Piedade — o **índice-mestre** que amarra cada procedimento a um **módulo do SIGA**, diz de onde
> vem (fonte), onde vive a versão editável (Google Doc) e qual é o seu estado. No futuro, é este
> arquivo que vira a **régua** do Motor de Conciliação e Verificação automática.
>
> **Para quem lê pela primeira vez:** você **não precisa ser técnico**. Cada módulo terá um
> **Google Doc** próprio, escrito em estilo **"receita de bolo"** (passos curtos, em ordem, sem
> jargão). Este arquivo aqui é o **mapa** que diz onde está cada coisa.

- **Versão do núcleo:** v0.2 (reorganização por módulos do SIGA; proposta de topografia para validar).
- **Fontes de estrutura:** menu do **SIGA** (imagem enviada pelo dono, jul/2026) + `docs/ROTEIRO_COMPLIANCE_PIEDADE.md`.
- **Brief de origem:** `docs/KICKOFF_NUCLEO_COMPLIANCE.md`.
- **Destino final:** após validação, **publicação web só-leitura** (a equipe visualiza; **não** edita, **não** comenta, **não** solicita acesso).

---

## 1. Princípio organizador — duas equipes, dois modos de usar

O compliance da Piedade é usado por **dois públicos diferentes**, e a estrutura precisa servir aos dois:

| Público | Quando usa | Como navega | Precisa de |
|---|---|---|---|
| **Equipe de escrituração** (dia a dia) | O tempo todo | Pelo **menu do SIGA** (Secretaria, Piedade, Tesouraria…) | Achar rápido "como faço X no SIGA" |
| **Equipe de verificação** (1×/mês) | No fechamento/verificação | Pelos **relatórios EAPI e ACPI** (checklist) | Achar "onde está a regra do item Y do checklist" |

**Decisão de arquitetura (v0.2):** o **eixo principal** passa a ser o **menu do SIGA** — porque é por
ele que a equipe do dia a dia navega. A visão **EAPI/ACPI** (os 12 capítulos do checklist) **não é
abandonada**: ela vira um **índice de referência cruzada** (Seção 6) que aponta cada item do
checklist para o módulo do SIGA onde a regra vive. Assim, os dois públicos acham o que precisam.

> `[SUPOSIÇÃO — validar com o dono]` Esta é uma **proposta de topografia**. Se algo não fizer
> sentido para a rotina real da equipe, ajustamos antes de encher os Google Docs.

### 1.1 As três camadas de documento (não confundir)
| Camada | Onde vive | Papel |
|---|---|---|
| **Núcleo** (este arquivo) | Repositório, `docs/NUCLEO_COMPLIANCE_PIEDADE.md` | Índice-mestre + regras + estado. A **régua** do futuro motor. |
| **Google Doc do módulo** | Google Drive (pasta de trabalho) | **Fonte viva** e detalhada de um módulo; a equipe edita. |
| **Matéria-prima** | Google Drive (pasta "Manuais e orientações") + `docs/` | Os manuais/PDFs/anotações de onde o conteúdo é extraído. |

---

## 2. Regras de estilo dos Google Docs (obrigatórias)

- **Instruções = receita de bolo:** passos **curtos**, **numerados**, **verbo no imperativo**
  ("Abra…", "Clique…", "Confira…"), **sem jargão**.
- **Explicações do "porquê" = linguagem simples**, para um leigo entender a razão da regra.
- **Dois níveis por documento:**
  1. **Resumo geral rápido** — o que é o módulo e o que ele cobre, em poucas linhas.
  2. **Detalhamento passo a passo** — cada procedimento como uma receita.
- **Cabeçalhos espelham o caminho do SIGA** (ex.: `Tesouraria › Caixas e Bancos › Nova Despesa`) —
  isso permite os **links profundos** (Seção 5).
- **Convenções de sinalização:** ⏰ prazo · ✅ obrigatório · ⚠️ atenção/risco · ★ regra crítica ·
  `[CONFLITO]` fontes divergem · `[LACUNA]` falta confirmar · `[SUPOSIÇÃO]` dedução a validar.
- **Nada decide sozinho:** o documento é **guia de conferência**; a palavra final é sempre de um
  **Diácono responsável**. O sistema **nunca inventa nem remove norma** — só organiza e sinaliza.

---

## 3. Mapa do Google Drive (IDs reais — verificados nesta sessão)

| Recurso | ID | Uso |
|---|---|---|
| **Pasta de trabalho** — "Documentos orientadores de procedimentos e compliance da piedade" | `1it6qnSzzgczVLfuFcXf_UecoZXGDZ_8B` | **onde os Google Docs dos módulos são criados** |
| **Doc existente** — `Manual_Fechamento_Piedade - RRM_Coxim` | `1OkISPyYWgjNzuXPHTDlxRAYmoUCi7dh3dHl81gArf9k` | **Módulo 07** (Fechamento), em edição pela equipe |
| **Pasta "Manuais e orientações"** (matéria-prima) | `1RM121AxkdP1MgTPgIEJspRVp4NVrJ0oA` | ler os manuais-fonte |

**Matéria-prima confirmada na pasta "Manuais e orientações"** (ler via Drive):
Manual SIGA – Cap. 03 Piedade.pdf · SIGA – Manual de Procedimentos.pdf ·
Formulários Obra da Piedade V1.6.1.xlsx · Pontos a serem observados em Coxim.docx ·
BANNER Fluxo Geral CCB.pdf · Revista Seminovos.pdf · subpastas **Formulários**, **Orientações**,
**Solicitações – buscar orientação**.
`[LACUNA]` O brief cita ainda, nesta pasta: *Manual da Obra da Piedade*, *Manual da Tesouraria*,
*Plano de Contas Comentado Piedade 2025*, *IT.PIA.BPG.01 BI Piedade*, *estatuto CCB 2013*,
*código de ética*, *Seção 09 Conselho Fiscal*, *serviços bancários Santander/Bradesco* —
**confirmar a presença destes** ao entrar em cada subpasta.

---

## 4. Estrutura do SIGA (o menu, transcrito) — o eixo dos módulos

> Transcrição do menu lateral do SIGA (imagem enviada pelo dono). É a **espinha dorsal** da nova
> organização. Cada **módulo do menu** vira um **Google Doc** (ou parte de um).

- **Intranet** → InfoCCB
- **Secretaria** → Cadastro (Cadastro Responsáveis Piedade · Ministério · Administradores e outros Cargos) · Eventos · Controle de Acesso
- **Verificação** → Verificação Conselho Fiscal · Checklist Grupos de Trabalho
- **Voluntário** → Apontamentos · Cadastros (Livros · Voluntários · Funções)
- **Produtos/Serviços** → Fornecedor · Cotação de Preços · Pedidos de Compra · Estoque · Mov. Estoque · Montagem Kit · Reserva de Estoque · Expedição · Troca de Produtos · Sala de Costura · Relatórios (Pedidos de Compra · Mov. Produto · Inventário Produto · Mov. Estoque · Atend. Produtos)
- **Piedade** → Reunião · Prestação de Contas · Relatórios (Atendimentos · Ordem de Compra · Termo Livro de ATAs) · Cadastros (Prontuário · Grupo Atendimento · Cartão Crédito/Débito)
- **Viagem** → Viagem · Cadastros (Cartão Crédito · Missões Aprovadas · Aprovadores)
- **Tesouraria** → Cartões (Cartão Viagens · Cartão Piedade) · Caixas e Bancos · Contas a Pagar · Transf. Numerários · Doações · Reconhecer Receitas · Fech. Piedade · Relatórios (Extrato · Contas a Pagar · Adiantamento · Fluxo de Caixa · Mapa Coletas · Despesas · Depósitos · Razão Gerencial · Balancete Financ. · Protocolo de Doc. · Mov. Fin. C-9)
- **Contabilidade** → Relatórios (Razão · Diário · Balancete · Etiqueta Contábil · Balancete Comparativo · Movimentação)

### 4.1 Os módulos propostos (um Google Doc cada)

> Convenção de nome do Doc: **`<NN> <Módulo do SIGA> - Piedade RRM-Coxim`**.
> "Verif." = a que capítulo(s) do checklist **EAPI/ACPI** o módulo responde (referência cruzada, Seção 6).

| Nº | Módulo (por área do SIGA) | Abrange (subáreas do SIGA) | Verif. | Estado |
|---|---|---|---|---|
| **00** | Começar aqui: SIGA, InfoCCB e acesso | Intranet/InfoCCB · Controle de Acesso · login · onde ficam modelos (ex.: Termo de Verificação) | — | ⬜ a criar |
| **01** | Secretaria: responsáveis, cargos e estrutura | Secretaria › Cadastro (Responsáveis Piedade · Ministério · Administradores e outros Cargos) · Eventos · Controle de Acesso | EAPI-1 | ⬜ a criar |
| **02** | Voluntário: livros, voluntários e funções | Voluntário › Apontamentos · Cadastros (Livros · Voluntários · Funções) | EAPI-1/5 | ⬜ a criar |
| **03** | Piedade: reuniões, atendimento e Ficha C-1 | Piedade › Reunião · Prestação de Contas · Relatórios (Atendimentos · Ordem de Compra · Termo Livro de ATAs) · Cadastros (Prontuário · Grupo Atendimento · Cartão) | EAPI-2/3 | ⬜ a criar |
| **04** | Produtos/Serviços: almoxarifado, compras e materiais | Produtos/Serviços › todas as subáreas + Relatórios · Sala de Costura · seminovos | EAPI-4 / ACPI compras | ⬜ a criar |
| **05** | Viagem: missões, cartões e prestação | Viagem › Viagem · Cadastros (Cartão Crédito · Missões Aprovadas · Aprovadores) | ACPI-8 | ⬜ a criar |
| **06** | Tesouraria: caixas, bancos, cartões, contas a pagar, transferências, doações, receitas | Tesouraria › Cartões · Caixas e Bancos · Contas a Pagar · Transf. Numerários · Doações · Reconhecer Receitas | ACPI-7/9 | ⬜ a criar |
| **07** | Tesouraria: **Fechamento da Piedade** | Tesouraria › Fech. Piedade + relatórios do encerramento (Protocolo de Doc. · Mov. Fin. C-9 · Balancete) | ACPI-11 | 🟨 Doc existe |
| **08** | Conciliações e conferências (Tesouraria + Contabilidade) | Tesouraria › Relatórios (Extrato · Adiantamento · Mapa Coletas · Depósitos · Razão Gerencial · Balancete Financ.…) + Contabilidade › Relatórios | ACPI-10 | ⬜ a criar |
| **09** | Plano de contas e critérios de lançamento (transversal) | base de Tesouraria/Contabilidade: função das contas, históricos-padrão, ordem cronológica | ACPI-6 | ⬜ a criar |
| **10** | Verificação: Checklist Grupos de Trabalho (ACPI) e Conselho Fiscal | Verificação › Verificação Conselho Fiscal · Checklist Grupos de Trabalho | ACPI-12 | ⬜ a criar |
| **11** | Arquivo, digitalização e sigilo (transversal) | enviar documentos · deletar locais · o que (não) digitalizar · LGPD/sigilo | EAPI-5 | ⬜ a criar |

**Legenda de estado:** ⬜ a criar · 🟨 em edição (Doc existe) · 🟩 varrido/organizado nesta versão.

> `[SUPOSIÇÃO]` Alguns itens são **transversais** (09 Plano de contas, 11 Arquivo/sigilo) — não são um
> único item de menu, mas atravessam vários. Mantê-los como módulos próprios ajuda a consulta; se o
> dono preferir, podem ser **apêndices** dentro de outro módulo.

---

## 5. Links profundos (SIGA → gdoc → parágrafo)

Objetivo do dono: de cada **área/subárea do SIGA** (e de cada relatório EAPI/ACPI) chegar direto à
**informação exata** dentro de um Google Doc.

**O que dá para fazer (honesto):**
- ✅ Link até um **cabeçalho** ou **marcador (bookmark)** do Google Doc — precisão de **seção/parágrafo**.
  Como os cabeçalhos espelham o caminho do SIGA (Seção 2), o link cai no procedimento certo.
- ✅ Citar **página** de um PDF-fonte no texto (ex.: "Manual SIGA Cap. 03, p. 12").
- ⚠️ `[LACUNA técnica]` **"Linha" exata** não é um endereço estável no Google Docs — o texto reflui
  quando alguém edita. Por isso ancoramos em **cabeçalho/bookmark**, não em número de linha.

**Como fica montado:** este núcleo (e, no futuro, a página web) terá uma **tabela SIGA → link**,
onde cada subárea do menu leva ao cabeçalho correspondente no gdoc do módulo. Montamos essa tabela
**à medida que cada gdoc for criado** (o link só existe depois do documento).

---

## 6. Índice de referência cruzada EAPI/ACPI → módulo do SIGA

> Para a **equipe de verificação** (que pensa em checklist, não em menu). Cada capítulo do checklist
> aponta para o módulo do SIGA onde a regra vive. (Base: `ROTEIRO_COMPLIANCE_PIEDADE.md`.)

| Checklist (capítulo) | Assunto | Módulo(s) do SIGA |
|---|---|---|
| **EAPI-1** | Estrutura, cargos e responsabilidades | 01 · 02 |
| **EAPI-2** | Cadastros e preparação pré-reunião | 03 (e 04 p/ inventário lojinha) |
| **EAPI-3** | Reuniões de atendimento e Ficha C-1 | 03 |
| **EAPI-4** | Almoxarifado, materiais, cestas e seminovos | 04 |
| **EAPI-5** | Arquivo, digitalização e sigilo | 11 |
| **ACPI-6** | Plano de contas e critérios de lançamento | 09 |
| **ACPI-7** | Tesouraria: caixas, bancos, aplicações, cartões, cheques | 06 |
| **ACPI-8** | Adiantamentos, viagens e locomoções | 05 |
| **ACPI-9** | Coletas, ofertas e transferências | 06 |
| **ACPI-10** | Conciliações e conferências | 08 |
| **ACPI-11** | Fechamento mensal | 07 |
| **ACPI-12** | Verificação (Checklist ACPI) e controles internos | 10 |

O detalhe de objetivo/escopo/fontes de cada capítulo EAPI/ACPI continua em
`docs/ROTEIRO_COMPLIANCE_PIEDADE.md` (não repetido aqui para não duplicar).

---

## 7. Fluxo de trabalho com os Google Docs

1. **Criar** um Google Doc por módulo na pasta de trabalho (Seção 3), com o nome da convenção.
2. **Preencher** (resumo + detalhado, estilo receita de bolo) a partir das fontes.
3. **Varredura periódica (quando o dono pedir):** varrer todo o conteúdo (inclusive o que a equipe
   acrescentou) → reorganizar por assunto → deduplicar → marcar dúbio/incompleto/conflitante →
   **em caso de conflito, PERGUNTAR** antes de decidir → reedição final limpa.
4. **Versões históricas (proteção):** **antes de sobrescrever** um Doc, **copiar a versão atual**
   para a subpasta **`_Histórico de versões`** (criada na primeira sobrescrita).
5. **Após cada varredura, atualizar este núcleo** (`.md`): revisar o resumo do módulo, a tabela
   SIGA → link (Seção 5) e subir a versão do núcleo.

---

## 8. Pontos em aberto e conflitos (a validar com a equipe)

> Consolidado de `MANUAL_FECHAMENTO_PIEDADE.md` §13, do `ROTEIRO` e das orientações do dono.
> **Nenhum destes é decidido pelo sistema** — cada um espera confirmação humana.

1. ⚠️ `[CONFLITO]` **Contas 10120/10130:** o DOC-21 as trata como ativas; em Coxim estão **inativas**
   (vivas: 10113/10114). **O motor de auditoria usa o plano de Coxim como verdade.** Confirmar qual
   conta recebe hoje o movimento de "assembleias".
2. `[LACUNA]` **Semântica de cores no SIGA** (aparentemente contraintuitiva): *VERDE = reunião
   encerrada, sem prestação de contas; VERMELHO = prestação feita (baixado)*. **Confirmar.**
3. `[LACUNA]` **Lista dos "6 documentos" do fechamento:** consolidada no manual §6; **validar** a
   versão final com a equipe.
4. `[LACUNA]` **Como saber qual Casa de Oração está aberta** (impede o fechamento) — descobrir o
   caminho/responsável (citado: Power BI > Controle de Fechamentos Mensais).
5. `[LACUNA]` **Termo de Verificação do Caixa em atraso:** gerar para **todas as contas de jul/2025
   a fev/2026** (backlog citado pelo Dales).
6. `[LACUNA]` **Diáconos que assinam (Coxim):** adalto, nilson, joão — confirmar papéis atuais.
7. `[SUPOSIÇÃO]` **Topografia dos módulos (Seção 4.1):** eixo agora é o **menu do SIGA**; validar a
   divisão e o tratamento dos módulos transversais (09 Plano de contas, 11 Arquivo/sigilo).

### 8.1 Notas do dono (jul/2026) — registradas
- 🅝 **Manual de Fechamento (Módulo 07):** a atualização feita pela equipe no Google Doc foi
  **irrisória**. Confrontado com **todo o material-fonte**, o conteúdo ainda está **muito
  incompleto** — a varredura desse módulo deve **acrescentar bastante coisa**, não só reorganizar.
- 🅝 **Publicação final:** depois da fase de verificação/validação, os documentos vão para a **web em
  modo só-leitura** — a equipe **visualiza**, mas **não edita, não comenta e não pede acesso**.
  (Candidato natural: GitHub Pages, que o projeto já usa; ou "publicar na web" dos gdocs. A definir
  na fase de publicação.)
- 🅝 **Liberdade de reorganização:** autorizado **dividir este núcleo em mais de um arquivo** ou
  **migrar partes** para outros documentos, conforme a topografia pedir.

---

## 9. Visão de futuro (o rumo — não é para agora)

O dono quer que, adiante, **o superusuário edite as regras** (este núcleo `.md` ou os Google Docs de
cada módulo) e o Claude Code, **em outra sessão**, transforme isso no **código/arquivo correto**, que
é **substituído no GitHub** e passa a valer. Cada "depuração" gera **nova versão do engine**,
documentada — inclusive um **capítulo de "novidades da versão" na Ajuda**. É o modelo de **regras
como configuração** (config-driven), a ser desenhado quando implementarmos o Motor de Conciliação e
Auditoria (ver `docs/MAPA_CONCILIACAO_AUDITORIA_v1.md`).

---

## 10. Limitações técnicas honestas (o que as ferramentas fazem e o que NÃO fazem)

- **Caminho `H:\Meu Drive\...` (Windows do dono) NÃO é acessível** por aqui. O acesso é ao
  **Google Drive pela API**, sempre **por ID** (Seção 3), nunca pelo caminho `H:`.
- **Compartilhamento/permissões:** as ferramentas **criam, leem, copiam e escrevem** arquivos, mas
  **não alteram o compartilhamento** — só é possível **ler** as permissões. ⚠️ **O dono precisará
  ligar o compartilhamento/publicação manualmente** em cada Doc (ou na publicação web final).
- **PDFs grandes / escaneados:** lidos por extração de texto; alguns são imagem e podem vir **sem
  texto** — nesse caso, sinalizar `[LACUNA]` e combinar outra via.
- **Editar um Google Doc que já existe:** guardar a versão anterior no histórico (item 7.4) e então
  regravar o conteúdo. Para o Módulo 07 (Doc existente), a primeira varredura confirma a mecânica.
- **Links "linha exata" no gdoc:** não são estáveis (o texto reflui) — ancoramos em cabeçalho/bookmark.

---

## 11. Registro de versões do núcleo

| Versão | Data | O que mudou |
|---|---|---|
| v0.1 | 2026-07-24 | Fundação: índice dos 12 capítulos EAPI/ACPI, regras de estilo, mapa do Drive, protocolo de versões, limitações e pontos em aberto. |
| v0.2 | 2026-07-24 | **Reorganização por módulos do SIGA** (novo eixo primário, a partir do menu enviado pelo dono). EAPI/ACPI vira referência cruzada (Seção 6). Adiciona: transcrição do menu do SIGA (Seção 4), links profundos SIGA→gdoc (Seção 5), destino de publicação web só-leitura, e notas do dono (Seção 8.1). Proposta de topografia — a validar. |

---

> **Este é um documento vivo.** Ele é o índice e a régua; o conteúdo detalhado de cada módulo vive
> nos Google Docs e nos documentos-fonte da pasta `docs/`. Nada se perde: tudo está versionado no
> repositório.
