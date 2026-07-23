# MAPA — Motor de Conciliação e Auditoria Contínua (o "auditor-IA" que confere sozinho)
## Documento de análise e desenho (v1 — 22/07/2026) · é desenho, não código

> **Origem:** o dono descreveu um fluxo em que **o checklist começa pela digitalização dos
> documentos**; conforme as páginas entram na pasta, o módulo de Documentação (conferidor-IA) já
> identifica, renomeia e arquiva, **captura os dados de cada documento num `.md`** e vai
> **conferindo e conciliando** — comparando documento com documento, e com os relatórios do SIGA
> — para, ao final, **listar o que está conciliado e o que falta**, **avisar o que falta**,
> **sinalizar automaticamente no relatório/checklist as não conformidades** e **marcar o que
> está OK — mas sempre com confirmação humana**. Pediu que eu comparasse com o que uma
> conciliação/auditoria contábil de verdade exige, pesquisasse metodologias reais e propusesse
> uma solução **ainda melhor**, que reduza erros humanos (por inépcia, imperícia, desconhecimento,
> prevaricação, improbidade).

---

## 1. Sua ideia, traduzida para a linguagem da auditoria profissional
O que você descreveu **não é uma invenção amadora** — é, quase item a item, o que a profissão
chama de **Auditoria Contínua** (Continuous Auditing) e **Conciliação Automatizada**. Pesquisei e
confirmo que sua intuição bate com o estado da arte:

| O que você descreveu | Nome profissional | O que a prática diz |
|---|---|---|
| Conferir os documentos **conforme entram** (não só no fim) | **Auditoria Contínua / Monitoramento Contínuo** | Exame automático de transações/controles **à medida que ocorrem**, em vez de esperar o fechamento — detecta problema na hora ([IIA GTAG-3](https://www.theiia.org/globalassets/documents/content/articles/guidance/gtag/gtag-3-continuous-auditing/gtag-3-continuous-auditing-2nd-edition.pdf)) |
| Cruzar **ficha C-1 + envelope + recibo** | **Three-way match** (conferência de 3 vias) | Cruza 3 documentos (autorização + entrega + comprovante); **aprova se batem, sinaliza a exceção se não** ([NetSuite](https://www.netsuite.com/portal/resource/articles/accounting/three-way-matching.shtml)) |
| Cruzar tudo com o Relatório do SIGA, razão, diário, balancete | **Conciliação / rastreamento (tracing)** | Comparar conjuntos de dados e apontar inconsistências; seguir o valor de ponta a ponta |
| "Perguntas de relacionamento documental" | **Motor de regras / CAAT** | Técnicas assistidas por computador que **interrogam 100% dos dados** buscando exceções, duplicidades, lacunas de sequência e padrões estranhos ([CAAT](https://plutuseducation.com/wp-content/uploads/caat.pdf)) |
| Detectar fraude/improbidade | **Lei de Benford + testes de anomalia** | Distribuição dos dígitos denuncia lançamentos fabricados em massa ([Journal of Accountancy](https://www.journalofaccountancy.com/issues/2022/sep/using-benfords-law-reveal-journal-entry-irregularities/)) |
| Sinalizar só o que está errado, humano confirma | **Exception-based auditing** | O sistema testa tudo e **mostra só as exceções** para revisão humana |

> **Conclusão:** você está pedindo um **motor de auditoria contínua e conciliação** — algo que
> grandes empresas compram caro (ACL, IDEA, Arbutus). A diferença é que o **seu** já nasce
> **integrado ao fluxo de digitalização** e **específico para as normas da CCB/Piedade**.

---

## 2. O que uma conciliação/auditoria completa DE VERDADE exige (e seu plano já cobre quase tudo)
Uma auditoria financeira séria se apoia em **asserções** (o que precisa ser verdade sobre cada
número/documento). As principais, aplicadas ao seu caso:

1. **Existência/Ocorrência:** o atendimento realmente aconteceu? (há ficha C-1 + recibo assinado?)
2. **Integralidade (completeness):** **todos** os documentos existem? (nenhum atendimento do
   Relatório do SIGA está sem ficha; nenhuma ficha está sem lançamento).
3. **Exatidão (accuracy):** os **valores batem** entre documento, envelope, razão, balancete?
4. **Autorização:** tem as **assinaturas e carimbos** exigidos (3 diáconos, conferido, rubrica)?
5. **Corte (cutoff):** está no **mês de competência** certo? (envelope pode ser anterior ao cupom,
   **nunca** o contrário — regra do seu manual).
6. **Classificação:** foi lançado na **conta certa** do plano de contas?

> **Seu plano já contempla os 6.** O que proponho abaixo é **organizar isso num motor** e
> **adicionar camadas** que você não citou mas vão te blindar contra fraude e erro.

---

## 3. A solução proposta — "Motor de Conciliação e Auditoria Contínua"
Um módulo (extensão do M5 Documentação) que roda **enquanto você escaneia** e entrega uma
**auditoria pré-pronta** para o humano só confirmar.

### 3.1 Começa na digitalização (auditoria contínua)
Confirmado do seu desenho: o **checklist inicia pela digitalização**. Conforme cada página cai na
pasta, o pipeline (M5 + M6) **identifica, renomeia, arquiva** e **extrai os dados-chave para um
`.md` estruturado** (uma "ficha de dados" por documento). **A conferência começa aí**, não no fim.

### 3.2 Conferência documento-a-documento (testes de controle)
Para cada tipo, o motor aplica a **lista de exigências das normas internas** (do seu manual — o
"script #1"). Ex.: **Ficha C-1** confere:
- nome do atendido e do cônjuge (se esposo batizado, envelope no nome dele);
- **número do prontuário** + **checagem de duplicidade** de prontuários;
- **assinaturas** (regra: 3 diáconos/irmãs; mínimo 2 em casos excepcionais);
- **carimbo "conferido" + rubrica do conferente** + demais carimbos obrigatórios;
- **envelope de atendimento** anexo, assinado e carimbado;
- **recibo de atendimento** anexo, assinado e carimbado;
- se a ficha menciona **roupas/cesta básica** → a **DT** correspondente está anexa? E o inverso:
  se há **DT**, a ficha registra que seria atendido com roupas/cesta?

> Isso é o **three-way match da CCB**: **envelope (autorização) + ficha C-1 (o atendimento) +
> recibo (comprovante)** — mais a **DT** quando há mercadoria. O motor cruza os quatro.

### 3.3 Conciliação cruzada (o coração)
1. **Lista `.md` de todos os atendimentos × Relatório de Atendimentos do SIGA** → aponta
   **quem está no SIGA e não tem ficha** e **quem tem ficha e não está no SIGA** (completeness).
2. **Posição Financeira da reunião × soma dos envelopes escaneados** → têm que ser **iguais**.
3. **Rastreamento financeiro completo (tracing):** seguir o dinheiro **da saída do banco → caixa
   → envelope → atendido**, localizando o **documento comprobatório de cada etapa** e batendo com
   **livro razão, diário e balancete**. É a **conciliação contábil de ponta a ponta**.

### 3.4 O motor de "perguntas de relacionamento documental" (a sua sacada — generalizada)
Sua ideia de criar **perguntas que relacionam documentos** é, tecnicamente, um **motor de regras
(assertions)** — e é o que torna o sistema **extensível sem programar**. Proponho uma
**biblioteca de tipos de asserção**, que o superusuário (ou testadores) monta como "peças de
Lego", em linguagem quase natural:

| Tipo de asserção | Exemplo (seu) |
|---|---|
| **Igualdade / soma** | "Σ créditos da conta X = Σ débitos das contas Y, Z, W?" |
| **Correspondência de campo** | "valor do campo *x* no doc *y* = valor *z* no doc *k*?" |
| **Lançamento × documento** | "lançamento *h* no relatório *c* = total do documento *Y*?" |
| **Presença em pasta** | "a pasta *M* contém os documentos *n, o, p, q, r, s*?" |
| **Assinaturas/carimbos** | "todos assinados com 3 assinaturas, nome completo, cargo e rubrica?" |
| **Ordem de datas** | "data do envelope ≤ data do cupom?" |
| **Sem duplicidade** | "algum número de prontuário se repete?" |
| **Sequência** | "há lacuna na numeração de recibos?" |

- Cada asserção vira um **item especial do checklist** ("item de conciliação"), autorável no
  **editor de checklist (Fase 1)** e testável no **modo de teste (Fase 8)**. **Responde sua
  dúvida do "onde entra":** é **transversal** — o motor mora no M5, mas as regras são **itens do
  checklist** e aparecem no **fluxo por seção (Fase 3)**.
- Assim, **você e os testadores criam novas conferências sem eu precisar programar** cada uma.

### 3.5 Camada anti-fraude (o que você NÃO pediu, mas precisa — contra improbidade/prevaricação)
Erro por inépcia/desconhecimento as camadas acima já pegam. Para **má-fé**, acrescento:
- **Lei de Benford** nos valores (a distribuição dos primeiros dígitos denuncia lançamentos
  fabricados em massa). `[Honestidade]` só funciona **com volume** e **não pega** 1 ou 2
  lançamentos falsificados — é um **rastreador**, não prova.
- **Detecção de duplicidade** (mesmo valor+data+favorecido lançado 2x; prontuário repetido).
- **Números "redondos" demais** e **valores logo abaixo de limites** de alçada (sinal clássico).
- **Mesma assinatura/rubrica em tudo** (quando deveria haver assinantes diferentes).
- **Datas fora de ordem** (comprovante anterior à autorização).
- Tudo isso vira **alerta "verificar"** — nunca acusação automática.

### 3.6 Saída: exceção-primeiro + humano sempre confirma
Como você pediu, e como manda a prática ("exception-based"):
- **Lista do que está conciliado × do que falta** (um "placar" da reunião/mês).
- **Mensagem/notificação** com a **lista do que falta** (para providenciar).
- **Pré-preenche o checklist automaticamente:** marca as **não conformidades** encontradas e
  deixa as **prováveis conformidades** pré-marcadas — **mas sempre como "confirmar"**. **Nenhuma
  decisão final sem um humano** clicar "confirmo". (Isso preserva a responsabilidade humana e
  atende à norma: a máquina **adianta**, não **decide**.)

---

## 4. Por que isto é MUITO melhor que a conferência manual (o ganho real)
1. **Testa 100%, não amostra.** O auditor humano confere **por amostragem** (não dá tempo de ver
   tudo). O motor confere **todos** os documentos e **todos** os cruzamentos — e mostra só as
   exceções. É o maior salto de qualidade.
2. **É um segundo par de olhos independente e incorruptível.** Ajuda contra **prevaricação/
   improbidade**: quem quiser burlar tem que enganar também o motor e o **log imutável**.
3. **Não esquece regra** (contra **inépcia/desconhecimento**): as normas do manual viram
   verificações que rodam sempre igual, sem depender da memória de quem confere.
4. **Rastreabilidade total:** todo achado tem o "porquê" e o documento de origem — vai ao **log
   append-only** (Fase 8), que **ninguém apaga**.
5. **Padroniza entre pontos:** a mesma régua para todas as localidades da Regional.

---

## 5. Cabe no orçamento de tokens? SIM — e sobra (ponto técnico importante)
A parte mais cara de IA (**OCR**) já estava prevista. **A conciliação em si quase não usa IA:**
- **Comparar valores, somar, cruzar listas, checar presença de documento, contar assinaturas** é
  **matemática determinística** — **custo de IA = zero** (é código, não modelo).
- A IA de raciocínio só entra para **(a)** ler campo ambíguo (letra feia) e **(b)** **redigir o
  resumo** para humano. Ou seja, **a auditoria "pensa" de graça**; só **ler e explicar** custa
  token — e pouco, em lote.

> **Resultado:** uma conciliação completa de um mês inteiro cabe **folgado** no seu limite ("menos
> que uma janela de 5h do Claude Pro"), porque o trabalho pesado é **conta**, não **conversa com
> IA**.

---

## 6. Onde entra na arquitetura (respondendo seu "não sei onde entra")
**É transversal, sim — mas com âncoras claras:**
- **Motor** vive como extensão do **M5 (Documentação)** — consome os `.md` extraídos + os
  relatórios do SIGA (que você **exporta** para a pasta: Relatório de Atendimentos, Posição
  Financeira, razão, diário, balancete).
- **As regras** são **itens de checklist** → autoradas no **editor (Fase 1)**, testadas no **modo
  de teste (Fase 8)**.
- **Os resultados** aparecem no **fluxo por seção (Fase 3)** (pré-preenchendo o checklist) e no
  **relatório de auditoria** (Fase 5).
- Portanto, no Plano Mestre, ele é uma **Fase 5-B**, logo após o M5, e **alimenta** as Fases 1/3.

---

## 7. Limitações honestas (para você não ter surpresa)
1. **Depende dos relatórios do SIGA exportados** para a pasta. Não há (que eu saiba) API do SIGA
   para puxar sozinho — então a conciliação com o SIGA **só roda** se você **exportar** os
   relatórios (PDF/Excel) para a pasta. `[LACUNA]` confirmar formatos que o SIGA exporta.
2. **Letra manuscrita** (nomes, valores à mão nas fichas) é o **ponto fraco do OCR** — nesses
   campos o motor vai **pedir confirmação humana** mais vezes, em vez de arriscar. Honesto: aqui
   o acerto não é 100%.
3. **Benford e anomalias** são **rastreadores**, não provas — apontam "onde olhar", não condenam.
4. **A régua é o manual.** A qualidade da auditoria depende de mapearmos bem as normas internas
   (assinaturas por tipo, carimbos, contas). Vamos extrair isso do manual + com você.
5. **Nada decide sozinho.** É desenho intencional: o humano confirma sempre (responsabilidade +
   validade).

---

## 8. Decisões que preciso confirmar com você
1. **Nome do motor:** "Conferidor-IA"? "Motor de Conciliação"? "Auditoria Automática"?
2. **Editor de regras (3.4):** confirma que quer o **motor de asserções montável** (você/testadores
   criam conferências novas sem programar)? *(recomendo muito — é o que dá vida longa ao sistema.)*
3. **Camada anti-fraude (3.5):** entra desde já (Benford + duplicidade + anomalias) ou fica para
   uma etapa posterior? *(sugiro desenhar já, ligar depois.)*
4. **Relatórios do SIGA:** quais você consegue **exportar** (e em que formato: PDF, Excel)? Isso
   define o que dá para conciliar automaticamente.
5. **Mapa de normas por tipo de documento:** topa a gente montar, a partir do manual, uma
   **tabela "por tipo de documento → o que é obrigatório"** (assinaturas, carimbos, anexos,
   contas)? É a base de tudo.

---

## 9. Resumo de uma linha
> **Um motor de auditoria contínua que, enquanto você escaneia, confere cada documento contra as
> normas, cruza tudo (three-way match + conciliação de ponta a ponta com o SIGA/razão/balancete),
> roda "perguntas de relacionamento documental" que você mesmo cria, rastreia fraude por Benford/
> anomalias, e entrega o checklist pré-preenchido só com o que falta e o que está OK — testando
> 100% (não por amostra), quase sem gastar tokens, e sempre deixando a palavra final para um
> humano.**

---

### Fontes consultadas (metodologia profissional)
- Auditoria contínua — IIA GTAG-3: https://www.theiia.org/globalassets/documents/content/articles/guidance/gtag/gtag-3-continuous-auditing/gtag-3-continuous-auditing-2nd-edition.pdf
- Three-way matching — NetSuite: https://www.netsuite.com/portal/resource/articles/accounting/three-way-matching.shtml
- Lei de Benford (journal entries) — Journal of Accountancy: https://www.journalofaccountancy.com/issues/2022/sep/using-benfords-law-reveal-journal-entry-irregularities/
- CAAT (técnicas assistidas por computador) — guia MTC: https://www.mtc.gov/wp-content/uploads/2023/04/caat.pdf
- Continuous auditing vs monitoring — DFIN: https://www.dfinsolutions.com/knowledge-hub/blog/continuous-auditing-vs-continuous-monitoring
