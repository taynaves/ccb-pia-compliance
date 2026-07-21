# MAPA — Armazenamento, Retenção, Recuperação e Editor de Checklist
## Documento de análise e desenho (v1 — 20/07/2026) · complementa o MAPA_PERMISSOES_RELATORIOS_v1

> **É desenho, não código.** Consolida as decisões novas do dono (20/07/2026): fonte da verdade
> no Firebase com gestão de cota + backup no Drive da Regional; retenção variável (6 meses a 2 anos);
> alertas de espaço; recuperação do superusuário; e o **editor de checklist** (partes/seções/itens).

---

## 1. Estimativa de capacidade (a pergunta-chave do dono)

**Cota grátis do Firebase Realtime Database ≈ 1 GB armazenado** (e 10 GB/mês de download).
Estimando o tamanho de dados por **ponto de atendimento por mês** (checklist + fechamento +
relatórios .md com versões + logs), em três cenários:

| Escala | enxuto (~50 KB) | médio (~100 KB) | pesado (~200 KB) |
|---|---|---|---|
| **1 RML (25 pontos)** — 2 anos | 0,03 GB | 0,1 GB | 0,1 GB |
| **1 Regional (750 pontos)** — 2 anos | 0,9 GB | 1,7 GB | 3,4 GB |
| **Estadual (20×30×25 = 15.000)** — 2 anos | 17 GB | 34 GB | 69 GB |
| **Estadual ×4 (60.000)** — 2 anos | 69 GB | 137 GB | 275 GB |

### Conclusão honesta
- ✅ **Uma RML, ou poucos pontos:** cabe folgado no Firebase grátis por 2 anos. Sem problema.
- ⚠️ **Uma Regional inteira:** passa de 1 GB em algum ponto entre ~9 meses e ~2 anos. Precisa
  **arquivar** parte no Drive.
- ❌ **Estadual (e além):** **impossível** guardar tudo só no Firebase grátis — falta de **17× a 275×**
  o espaço. Aqui o **backup no Drive da Regional é obrigatório**, com **poda** do Firebase.

> Portanto: sua intuição estava certa. A resposta não é "só Firebase" nem "só Drive", e sim
> **armazenamento em dois níveis** (quente + frio), descrito abaixo.

---

## 2. Arquitetura de armazenamento reformulada (dois níveis)

```mermaid
flowchart LR
  subgraph Quente["🔥 FIREBASE (fonte da verdade — quente)"]
    A[Trabalho do mês atual + meses recentes]
    B[Metadados / índice / situação]
    C[Logs append-only]
    D[Última versão VALIDADA de cada relatório geral e parcial]
  end
  subgraph Frio["🗄️ GOOGLE DRIVE DA REGIONAL (arquivo — frio)"]
    E[TODAS as versões .md, todos os meses]
    F[1 conta por Regional — isolada das outras]
  end
  A -- backup contínuo --> E
  D -. sempre preservada .-> A
  Quente -- "poda quando lotar" --> Frio
```

### Regras (do dono, refinadas)
1. **Firebase = fonte da verdade** do trabalho corrente e do que o sistema mostra na tela.
2. **Drive da Regional = backup/arquivo** de TODA a documentação (todas as versões .md). É uma
   conta **da Regional** (ou da administração local, que tem a guarda física), **não** pessoal.
   Cada Regional guarda **apenas os seus** relatórios (isolamento).
3. **Poda com consentimento (NUNCA automática):** ao chegar a **95%** de um **orçamento
   configurável**, o sistema **avisa o superusuário e pede autorização** para podar. Só **depois do
   consentimento explícito** ele (a) confirma que o backup no Drive está **atualizado** e (b) remove
   os dados **mais antigos** até voltar a **50%** — **sempre preservando no Firebase a última versão
   validada** de cada relatório **geral e parcial** de cada mês. Nada é apagado sem o "OK" humano.
   Antes de podar, mostra um **resumo do que sairá** (meses/áreas/versões) para revisão.
4. **Retenção variável:** de **6 meses a 2 anos** (configurável pelo superusuário/regional).
   Passado o prazo, o Firebase mantém só a última versão; o Drive mantém o histórico enquanto houver espaço.
5. **Alertas de espaço aos administradores:** em **50%, 75%, 90%, 95%** (e 98% crítico) do orçamento.
6. **PDF nunca é armazenado** — sempre gerado na hora a partir do .md. **Reimpressão não gera versão.**

### Custódia e responsabilidade (do dono)
- A **administração local** tem a guarda física dos documentos → é a **responsável** e a dona
  natural do Drive de backup da sua área. A **Regional** orienta e coordena.
- **Todos os usuários**, mesmo do menor nível, são responsáveis pela informação que lançam.
- **Segurança forte no digital** (Security Rules + isolamento por localidade); o físico já tem
  seus próprios controles.

### ⚠️ Ponto técnico honesto (Drive)
Ler/escrever no Drive exige o **Google Apps Script** (grátis, já previsto) ou OAuth. Como agora é
**uma conta por Regional** (e não dezenas de pessoais), isso fica **viável e gerenciável** — foi o
que destravou a ideia. A limpeza dos 6–24 meses roda por Apps Script agendado, **mas só executa a
poda após consentimento** (item 3 acima).

### 2.1 Sistema agnóstico de BaaS + capacidade máxima estimada (pedido do dono)
O sistema **não fica preso ao Firebase**. Existe o conceito de **provedor de armazenamento (BaaS)**:
- **Firebase = padrão-ouro e recomendado** (é o que usaremos). Um futuro superusuário, ao **ampliar**,
  pode plugar **outro BaaS** (ex.: Supabase, Appwrite) — talvez mais barato em escala.
- **Ao conectar/escolher o BaaS**, o sistema mostra um **alerta/aviso com a capacidade máxima
  estimada** do sistema para aquele provedor, calculada a partir da **tabela da Seção 1** (bytes por
  ponto/mês) × **retenção escolhida** × **orçamento do provedor**.
- Essa **capacidade máxima (em pontos de atendimento)** fica visível em **local apropriado** (ex.:
  no painel do superusuário e no painel do Admin), com um medidor de uso atual × máximo.

**Fórmula (transparente):**
```
pontos_máx ≈ (orçamento_GB × 1.048.576 KB) ÷ (KB_por_ponto_mês × meses_de_retenção)
```
**No nosso caso (Firebase):** orçamento ~0,8 GB · ~100 KB/ponto/mês · retenção 12 meses →
**≈ 700–750 pontos de atendimento** como teto seguro. (E MS não chega nem a **⅓** disso — folga enorme.)
Ao aproximar-se do teto (junto com os alertas de 50/75/90/95%), o sistema avisa o superusuário para
**podar** (com consentimento), **ampliar a conta/BaaS**, ou **reduzir a retenção**.

### 2.2 Auto-calibração pelo uso REAL (não ficar preso à estimativa da Seção 1)
A tabela da Seção 1 é um **chute inicial**. Depois de alguns meses de uso, o sistema **mede o
tamanho real** (KB por ponto/mês de verdade) e **recalibra** a capacidade máxima e os alertas.
- **Manual ou automática** (o superusuário escolhe o modo).
- Mostra lado a lado: **estimado × medido** (com margem/confiança), e a nova "capacidade máxima real".
- Recalibra sozinha quando houver amostra suficiente (ex.: ≥ 3 meses e ≥ N pontos), ou sob pedido.
> Ganho: o teto de "750 pontos" deixa de ser suposição e passa a refletir a realidade daquela
> instalação (que pode ser mais leve ou mais pesada que o chute).

### 2.3 Console de Gestão de Armazenamento (poda granular + previsão ao vivo)
Quando o superusuário for **podar** (sempre com consentimento — nunca automático), ele não recebe
uma lista "pegar ou largar": recebe um **console interativo** onde **ajusta o que sai**, por
qualquer combinação de filtros e por **níveis**:
- **Por período:** de/até quais meses (incluir/excluir mais ou menos meses).
- **Por área (hierárquico):** Regional → ADM Local (RML) → Ponto de atendimento — marcar um nível
  inteiro ou combinações (ex.: "só as versões antigas dos pontos da RML X").
- **Por tipo:** só **versões anteriores** (mantendo a última validada) **ou** também a última
  validada (esta só entra na **exclusão definitiva** — ver 2.4).
- **Seleção por nível:** alterar um ou vários níveis de uma vez (ex.: desmarcar uma Regional inteira).

**Previsão ao vivo:** a cada ajuste no seletor, mostra **antes × depois** — espaço
**ocupado/livre previsto** após executar — para o superusuário decidir com números na tela.
Além dos números, um **recurso visual** ajuda a percepção: um **medidor tipo barra horizontal ou
pizza** (como o do **Google Drive / Dropbox**), com **código de cores** (ex.: ocupado atual · o que
será liberado · livre resultante) e a barra "andando" conforme o superusuário ajusta a seleção.
Só executa após **confirmação**; toda execução vira registro no **log append-only**.

```mermaid
flowchart LR
  S[Seletor granular<br/>período · área · tipo · nível] --> P[Previsão ao vivo<br/>ocupado/livre depois]
  P --> C{Confirmar?}
  C -- sim --> X[Executar: garante backup no Drive → remove do Firebase]
  C -- ajustar --> S
  X --> L[Registra no log]
```

### 2.4 Exclusão DEFINITIVA (irreversível) — só o superusuário, nunca automática
Diferente da poda (que arquiva no Drive e é reversível), aqui os dados **somem de vez**, inclusive as
**últimas versões validadas** de relatórios gerais e parciais.
- **Somente o superusuário.** **Nunca automática.** **Dupla verificação** (confirmar + reconfirmar,
  ex.: digitar uma palavra-chave/senha de recuperação).
- **Só para relatórios com mais de 2 anos de criação.**
- Usa o **mesmo console granular** (2.3), com a previsão ao vivo, mas marcado como **"EXCLUSÃO
  DEFINITIVA"** (visual de alerta forte, vermelho).
- **Salvaguarda que sugiro (necessidade inferida):** antes de excluir de vez, oferecer/registrar uma
  **exportação final** (para o Drive ou download) — para que nada se perca por engano — e respeitar
  **retenções legais** (ver abaixo). Todo o ato vai para o log com **justificativa obrigatória**.

### 2.5 Sugestões que infiro da sua real necessidade (novas)
- **Retenção legal / "trava de guarda" (legal hold):** poder marcar meses/relatórios específicos como
  **"não excluir"** (ex.: sob auditoria, questão jurídica). A poda e a exclusão **pulam** o que estiver
  travado. Isso protege de apagar por engano algo que precisa ser guardado — comum em sistemas de
  compliance. *(Recomendo fortemente.)*
- **Modo "simulação" (dry-run):** o console sempre mostra o resultado **antes** de executar (já embutido
  na previsão ao vivo), e permite salvar a seleção como um "plano de limpeza" para revisar depois.
- **Relatório de saúde do armazenamento:** um painel com tendência de crescimento (GB/mês), previsão de
  "quando vou encher", e recomendação (podar / ampliar / reduzir retenção).
- **Confirmação em duas pessoas para exclusão definitiva em massa:** para grandes exclusões, exigir
  também um 2º superusuário/admin (como no break-glass) — evita erro catastrófico de um só clique.

---

## 3. Recuperação de acesso do superusuário

> Realidade: como o app roda no navegador, **não** há um cofre de senhas próprio. A base é o
> **login Google + Firebase Auth**. Proponho 3 camadas, da mais forte para a de emergência:

1. **Camada 1 — Conta Google com verificação em 2 etapas (2FA).** É a proteção mais forte e
   **gratuita**. Recomendação: exigir/orientar 2FA na conta Google do superusuário. A própria
   recuperação de conta do Google é a 1ª linha se ele perder acesso.
2. **Camada 2 — Segredo de recuperação.** Um código/senha de recuperação definido pelo superusuário,
   guardado **apenas como "impressão digital" (hash)** no Firebase (nunca o texto puro). Serve para
   provar identidade ao promover um novo superusuário. *(Caveat honesto: em app client-side isso é
   proteção média, não perfeita; por isso vem depois do 2FA.)*
3. **Camada 3 — Superusuários de emergência (break-glass).** O sistema mantém **2 indicados
   automáticos**: os **dois supervisores com maior volume de trabalho nos últimos 3 meses**. Se o
   superusuário sumir, esses dois, **em conjunto** (os dois confirmando), podem promover um novo
   superusuário. Exigir os **dois juntos** evita golpe de um só.
> Toda recuperação/promoção gera **registro no log append-only**.

---

## 4. Editor de Checklist (resolve ARQ-01) — o superusuário edita tudo

Hoje as 14 seções e 90 itens estão **fixos no código**. O objetivo: o superusuário **cria, edita,
renomeia, remove e reordena** partes, seções e itens — por tela, a qualquer tempo. Passa a morar em
`/appConfig/checklistDef` no Firebase, com **semente** = `checklist_def.json` (na raiz) e fallback
no código. Já criei os arquivos `CHECKLIST_CONTEUDO.md` (legível) e `checklist_def.json` (estruturado).

### 4.1 Três coisas que você NÃO pediu, mas são essenciais (senão corrompe o histórico)
1. **IDs estáveis e imutáveis.** Cada item tem um **ID interno fixo** (ex.: `it_a1b2`), separado do
   **número visível** (1.1, 1.2) e da **ordem**. Reordenar ou renumerar muda a exibição, **não** o
   ID. Isso é vital porque os relatórios antigos guardam respostas **por ID** — sem isso, reorganizar
   o checklist embaralharia respostas de meses passados.
2. **Versão da definição + "vale a partir de".** Editar o checklist cria uma **nova versão** da
   definição, que vale para os **meses futuros**. Meses já fechados guardam a versão que usaram —
   **nunca reescrevemos o passado**. Cada checklist mensal anota qual versão da definição usou.
3. **Arquivar em vez de apagar (soft-delete).** Remover um item não destrói respostas antigas: o item
   vira **"descontinuado"** (some dos novos meses, mas o histórico continua íntegro e legível).

### 4.2 Modelo de dados (checklistDef)
```
/appConfig/checklistDef
  version, updatedAt, updatedBy, status(rascunho|publicado)
  parts[]  → { id, nome, ordem }
  sections[] → { id, partId, titulo, ordem, momentoPadrão, visibilidadePadrão }
  items[]  → { id, sectionId, numero, momento, texto, orientação?, ordem, ativo }
```

### 4.3 Como o superusuário edita (UX — sóbrio, moderno, com requinte)
- **Árvore** Partes → Seções → Itens, expansível.
- **Reordenar:** por setas ▲▼ (confiável) — e, como evolução, **arrastar-e-soltar** (mais elegante).
- **Renomear / editar:** clique no texto → edita ali mesmo (inline), com salvar/cancelar.
- **Criar:** botões "+ Parte", "+ Seção", "+ Item" no nível certo.
- **Remover:** com **aviso de impacto** ("este item tem respostas em N relatórios; será arquivado,
  não apagado").
- **Rascunho → Publicar:** as edições ficam em rascunho e só valem quando o superusuário **publica**
  (evita usuários pegarem um checklist meio-editado). Publicar **incrementa a versão**.
- **Pré-visualizar** o checklist como o usuário verá, antes de publicar.

### 4.4 Extras sugeridos (provável necessidade futura)
- **Orientação por item** (texto/vídeo/link) — semente do futuro "Sistema de Orientação aos
  Trabalhos" (ARQ-06). O editor já deixa o campo pronto.
- **Importar/exportar** a definição (o próprio `checklist_def.json`) — para editar em massa,
  versionar, ou compartilhar entre instalações.
- **Validações**: número único por seção, sem seção vazia, sem item órfão.
- **Histórico de mudanças** da definição (quem mudou o quê e quando) — no log append-only.
- **Momento e criticidade** editáveis por item; filtro/etiquetas por momento.

---

## 5. Princípio de design (tom de TODO o sistema)
Sóbrio, profissional, moderno, com requinte — como ficou o cabeçalho e a identificação do relatório.
Isso vira **regra de UX**: espaçamento generoso, paleta institucional (azul CCB + cinzas), tipografia
limpa, estados claros, e **nada de "clica e nada acontece"** (todo erro é visível e específico).

---

## 6. Decisões — FECHADAS pelo dono (20/07/2026)
1. ✅ **Orçamento do BaaS**: sim, com "teto" configurável (Firebase ~0,8 GB) disparando alertas.
2. ✅ **Dono do Drive de backup:** qualquer uma (Regional **ou** administração local), **respeitando
   a área de cobertura de cada uma** (cada conta guarda só o que é da sua área).
3. ✅ **Retenção padrão:** **12 meses** (ajustável de 6 a 24).
4. ✅ **2FA obrigatório** para superusuário e admins.
5. ✅ **Editor de checklist:** reordenar por **setas ▲▼** primeiro; arrastar-soltar como evolução.

### Refinamentos adicionais (20/07/2026)
6. ✅ **Poda NUNCA automática** — só após consentimento explícito do superusuário (item 2.3).
7. ✅ **Sistema agnóstico de BaaS** — Firebase é o padrão-ouro; ao conectar um BaaS, exibir a
   **capacidade máxima estimada de pontos** (Seção 2.1), em local apropriado (painel do superusuário
   e do Admin). Firebase ≈ **750 pontos** de teto seguro no nosso cenário.

> Continuamos em **modo desenho** (sem mexer no código do sistema). Quando o desenho geral estiver
> fechado, voltamos ao início e implementamos fase a fase, testando — com baixo risco de reviravolta.
