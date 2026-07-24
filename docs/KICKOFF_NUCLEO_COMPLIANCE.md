# 🚀 BRIEF DE PARTIDA — Construção do Núcleo de Compliance da Piedade
## Documento de handoff para uma NOVA sessão do Claude Code (janela limpa)

> **Por que este arquivo existe:** a construção do núcleo de compliance (processar dezenas de
> manuais/PDFs e gerar um roteiro-mestre + 12 Google Docs em estilo “receita de bolo”) é um
> trabalho **grande e pesado**. Fazê-lo numa **janela nova e limpa** garante qualidade e evita
> degradar o contexto. Como **tudo já está versionado no repositório**, a nova sessão começa sem
> perder nada — basta ler este brief e os arquivos citados.

---

## 0. Primeira coisa que a nova sessão deve fazer
1. Ler este arquivo inteiro.
2. Ler `docs/ROTEIRO_COMPLIANCE_PIEDADE.md` (a estrutura dos 12 módulos já definida).
3. Ler `docs/MANUAL_FECHAMENTO_PIEDADE.md` e `docs/super_manual_piedade_ccb.md` (fontes ricas).
4. Confirmar acesso ao Google Drive (tools `mcp__Google_Drive__*`) com os IDs da Seção 3.

---

## 1. O objetivo (o que o dono pediu)
Construir o **“coração” do sistema**: um **roteiro-mestre `.md`** de todo o compliance da Piedade,
com **cada etapa = um capítulo/módulo**, e **um Google Doc por módulo** na pasta do Drive do dono,
em estilo **receita de bolo** (comandos curtos e claros) + explicações simples. Um leigo, lendo,
deve conseguir **executar qualquer procedimento** do SIGA/Piedade/Tesouraria.

### 1.1 O “coração” (arquivo-mestre `.md`) — sugestões de nome
Escolher um com o dono: **`NUCLEO_COMPLIANCE_PIEDADE.md`** · `CORACAO_REGRAS_PIEDADE.md` ·
`COMPLIANCE_PIEDADE_MASTER.md` · `REGRAS_MESTRAS_PIEDADE.md`. É o arquivo que vira o **núcleo duro**
do futuro Motor de Conciliação/Verificação.

### 1.2 Estilo obrigatório
- **Instruções = receita de bolo:** passos curtos, numerados, verbo no imperativo, sem jargão.
- **Explicações/justificativas = linguagem simples**, para leigo entender o “porquê”.
- **Dois níveis por documento:** (a) resumo geral rápido; (b) detalhamento passo a passo.

---

## 2. Escopo dos módulos (12 capítulos — já estruturados)
A estrutura completa está em `docs/ROTEIRO_COMPLIANCE_PIEDADE.md` (Parte A EAPI + Parte B ACPI).
**Cada módulo vira um Google Doc.** Os processos SIGA que o dono exige cobrir (lista dele, para o
brief não perder nada):

- **Reuniões de atendimento:** criar/abrir/encontrar/fechar as **3 reuniões** (Piedade, Música,
  Sigiloso/Ministério); controle de acesso/autenticação de presença; transferir dinheiro da
  **10010** para a mesa; lançar/cadastrar cada atendimento; conferir cada documento; gerar
  envelopes; gerar documentos da reunião; cadastro de prontuários; grupos de atendimento; cartões.
- **Produtos/Serviços:** compra de materiais; entradas por compra; saídas de atendimento; trocas;
  remessas para outras localidades; prestações de contas; adiantamento a fornecedores; inventário.
- **Viagem:** cadastro de missões aprovadas; cartões; aprovadores; envelopes de adiantamento;
  prestação de contas; lançamento de NFC-e; **tipos de despesa e seus códigos**.
- **Tesouraria:** cartões (viagem e Piedade); caixas e bancos (receitas, despesas, despesas em
  lote, movimentação interna); provisionamento e adiantamento de contas a pagar; transferência de
  numerários (entre departamentos e entre administrações); doações; reconhecer receitas.
- **Fechamento:** impressão/assinatura/conciliação de **C-9, Protocolo de Documentos, Termo de
  Verificação do Caixa, extratos, relatório de viagens, ata + lista + posição financeira das 3
  reuniões, inventário de produtos**.
- **Conciliações — Tesouraria:** extrato, contas a pagar, adiantamento, fluxo de caixa, mapa de
  coletas, despesas, depósitos, razão gerencial, balancete financeiro, protocolo, C-9.
- **Conciliações — Contabilidade:** razão, diário, balancete, etiqueta contábil, balancete
  comparativo, movimentação.

---

## 3. Recursos no Google Drive (IDs reais — já verificados)
| Recurso | ID | Uso |
|---|---|---|
| **Pasta de trabalho** “Documentos orientadores de procedimentos e compliance da piedade” | `1it6qnSzzgczVLfuFcXf_UecoZXGDZ_8B` | onde criar os Google Docs dos módulos |
| **Doc existente** `Manual_Fechamento_Piedade - RRM_Coxim` | `1OkISPyYWgjNzuXPHTDlxRAYmoUCi7dh3dHl81gArf9k` | Módulo 11 (Fechamento), em edição pela equipe |
| **Pasta “Manuais e orientações”** (matéria-prima) | `1RM121AxkdP1MgTPgIEJspRVp4NVrJ0oA` | ler os manuais-fonte |

**Matéria-prima na pasta “Manuais e orientações”** (ler via `read_file_content`/`download_file_content`):
Manual da Obra da Piedade.pdf · Manual da Tesouraria.pdf · Plano de Contas Comentado Piedade 2025
Completo.pdf · Manual SIGA – Cap. 03 Piedade.pdf · SIGA – Manual de Procedimentos.pdf · Formulários
Obra da Piedade V1.6.1.xlsx · IT.PIA.BPG.01 BI Piedade.pdf · Pontos a serem observados em Coxim.docx
· estatuto CCB 2013 · código de ética · Seção 09 Conselho Fiscal · Serviços bancários Santander/
Bradesco · subpastas **Formulários**, **Orientações**, **Solicitações**.

---

## 4. Fluxo de trabalho com os Google Docs (o que o dono pediu)
1. **Criar** um Google Doc por módulo na pasta de trabalho (`create_file`, mimeType
   `application/vnd.google-apps.document`, `parentId` da pasta).
2. **Preencher** cada um (geral + detalhado, estilo receita de bolo) a partir das fontes.
3. **Varredura periódica:** quando o dono pedir, reorganizar o conteúdo que a equipe editou —
   deduplicar, resolver ambiguidades, **perguntar em caso de conflito**, reeditar.
4. **Versões históricas:** antes de sobrescrever um Doc, **copiar a versão atual** (`copy_file`)
   para uma **subpasta “_Histórico de versões”** — assim qualquer versão anterior pode voltar.
5. Depois de cada varredura, **atualizar o roteiro-mestre `.md`** (o coração).

### 4.1 ⚠️ Limitações técnicas HONESTAS (a nova sessão deve saber)
- **O caminho `H:\Meu Drive\...` é local do Windows do dono — eu NÃO acesso isso.** Eu acesso o
  **Google Drive pela API** (as tools `mcp__Google_Drive__*`). Felizmente, as pastas/docs **estão
  acessíveis** por ID (Seção 3). Sempre usar **ID**, não o caminho `H:`.
- **Compartilhar “qualquer um com o link pode comentar”:** as tools atuais do Drive **criam, leem,
  copiam e escrevem**, mas **não têm** função de **alterar compartilhamento/permissões**
  (só `get_file_permissions` para ler). Então: **o dono precisará ligar o compartilhamento
  manualmente** (ou confirmamos se surge uma tool de permissão). Registrar isso e não prometer o
  que a tool não faz.
- **PDFs grandes:** ler via `read_file_content` (extrai texto). Alguns são escaneados/imagem —
  pode faltar texto; nesse caso, sinalizar `[LACUNA]`.
- **Editar Google Doc:** confirmar na nova sessão a melhor via (recriar conteúdo via `create_file`
  + versão, ou API de update) e **sempre** guardar a versão anterior no histórico antes.

---

## 5. Visão de futuro registrada (não é para agora, é o rumo)
O dono quer que, no futuro, **o superusuário edite as regras** (o `.md` do coração, ou os Google
Docs de cada módulo) e o Claude Code, **em outra sessão/a qualquer momento**, transforme isso no
**código/arquivo correto** que é **substituído no GitHub** e passa a valer. Cada “depuração” gera
**nova versão do engine**, documentada — inclusive um **capítulo de “novidades da versão” na Ajuda**.
Isso é o **modelo de regras como configuração** (config-driven) — desenhar quando implementarmos.

---

## 6. Como o DONO inicia a nova sessão
Abrir uma **janela nova** do Claude Code no mesmo repositório e colar algo como:

> “Leia `docs/KICKOFF_NUCLEO_COMPLIANCE.md` e execute a construção do núcleo de compliance a
> partir dele. Comece confirmando o acesso ao Drive e me proponha o nome do arquivo-mestre.”

A nova sessão então segue este brief. **Modelo recomendado:** o mais capaz (Opus), esforço alto —
é processamento e geração pesados.

---

## 7. Estado atual (o que já existe e não se perde)
- `docs/ROTEIRO_COMPLIANCE_PIEDADE.md` — estrutura dos 12 módulos (base do coração).
- `docs/MANUAL_FECHAMENTO_PIEDADE.md` + `.docx` — Módulo 11 já bem avançado.
- `docs/super_manual_piedade_ccb.md` — 24 DOCs oficiais.
- `docs/FONTES_FECHAMENTO_PIEDADE_COMPILADO.txt` — 27 fontes integrais.
- `docs/FASE5_...` (referência) · `docs/README.md` (índice da pasta).
- Google Drive: doc do Fechamento em edição + pasta de manuais (Seção 3).
