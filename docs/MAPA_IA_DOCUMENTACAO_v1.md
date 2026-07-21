# MAPA — Módulo de IA para Documentação (Drive, OCR, organização e auditoria)
## Documento de análise e desenho (v1 — 21/07/2026) · é desenho, não código

> **Para que serve:** um módulo (paralelo ao sistema de checklist, integrado a ele ou construído
> depois) que permite a um **conferidor** guardar **toda a documentação física de um ponto**
> (notas, extratos, documentos escaneados) numa pasta do **Google Drive**, e uma **IA**:
> 1. **lê e reconhece** o conteúdo de cada arquivo (inclusive imagem, via OCR);
> 2. **renomeia** cada arquivo com um **padrão legível por humano** (dá para saber do que se
>    trata só pelo nome, sem abrir, e anexar no **SIGA** no lugar certo);
> 3. **reorganiza a pasta** por **mês de competência** → **módulo do SIGA**;
> 4. **gera um relatório de conferência**, como se fosse um **conferidor humano**, apontando
>    tudo que estiver **em desacordo** com as normas internas (documento faltando, carimbo
>    faltando, assinatura faltando, rubrica no lugar de assinatura, conta que não bate,
>    lançamento sem documento, documento sem lançamento, etc.).
>
> **Contexto crítico:** os arquivos contêm **dados extremamente sigilosos** (documentos
> financeiros e pessoais de um ponto de atendimento). **Tudo aqui precisa seguir a LGPD à
> risca.** E o uso de IA precisa ser **econômico**: o objetivo é que **todo** o trabalho de IA
> deste módulo, num mês, **consuma menos tokens do que uma janela de 5h do Claude Pro** — ou
> seja, tem que ser **barato e eficiente**, não um "IA lê tudo palavra por palavra".

---

## 1. O problema em números (por que "eficiência" é a palavra-chave)
- Centenas, às vezes **milhares**, de imagens escaneadas **sem OCR** por ponto/mês.
- Poucos PDFs (extratos bancários etc., também sem OCR).
- Alguns arquivos de texto/XML (notas fiscais eletrônicas).
- **Se cada imagem for enviada inteira para um modelo de IA "de visão" a cada operação**
  (reconhecer + renomear + auditar), o custo explode rápido — é o principal risco deste módulo.
- **Conclusão:** este módulo **não pode ser "IA ingênua"**. Precisa de uma arquitetura em
  **camadas**, onde a IA cara (visão/raciocínio) só é chamada **quando realmente precisa**, e
  o grosso do trabalho é feito por **passos determinísticos e baratos** (OCR local/dedicado,
  regras, comparação de dados).

---

## 2. Arquitetura em camadas (do mais barato ao mais caro)

```mermaid
graph TD
  A[1. Ingestão: ler a pasta do Drive] --> B[2. Triagem barata: tipo de arquivo, tamanho, já processado?]
  B --> C[3. OCR/extração de texto — motor de OCR dedicado, NÃO o modelo de IA de conversa]
  C --> D[4. Classificação por regras + texto extraído: já dá para nomear a maioria sem IA cara]
  D -->|casos claros| E[5a. Renomear e mover — sem chamar IA de raciocínio]
  D -->|casos ambíguos/poucos| F[5b. IA de raciocínio SÓ para os casos difíceis, em lote]
  E --> G[6. Reorganização por mês + módulo SIGA]
  F --> G
  G --> H[7. Auditoria: compara documentos × lançamentos SIGA, gera relatório]
  H --> I[8. IA de raciocínio SÓ para redigir o relatório final (texto curto, resumido)]
```

### Por que isso economiza tokens (o "pulo do gato")
1. **OCR não é trabalho de "IA generativa cara".** Existem motores de OCR dedicados (rodando no
   Apps Script/servidor ou via uma API de OCR específica) que **só extraem texto** — muito mais
   baratos que mandar a imagem para um modelo de conversa "olhar e descrever".
2. **A maior parte da classificação é regra, não IA.** Depois do OCR, um extrato bancário tem
   palavras-chave óbvias ("saldo", "extrato", nome do banco); uma nota fiscal eletrônica em XML
   já vem com **campos estruturados** (não precisa nem de IA — é leitura direta do XML). Só
   documentos **realmente ambíguos** (ex.: escaneado torto, carimbo sujo, sem cabeçalho claro)
   precisam da IA "pensar".
3. **A IA de raciocínio trabalha em LOTE, com texto já extraído — nunca com a imagem crua
   repetida.** Em vez de 1.000 chamadas (uma por imagem), agrupamos o **texto já extraído** de
   várias dezenas de documentos numa única chamada, pedindo para a IA classificar/nomear todos
   de uma vez. Isso reduz drasticamente o número de chamadas.
4. **Cache de decisões.** Um tipo de documento que já foi visto e resolvido (ex.: "Termo de
   Verificação do Caixa, mesmo layout de sempre") vira uma **regra aprendida**, e da próxima vez
   nem precisa da IA — é reconhecido por padrão/regra.
5. **O relatório final é gerado com dados já estruturados** (lista do que falta, o que não bate)
   — a IA só **redige o texto** a partir de uma tabela pronta, não analisa tudo do zero.

> **Meta prática:** o **grosso do custo** deste módulo deve estar no **OCR** (que é barato e
> previsível por página) — a **IA de raciocínio cara** deve ser usada em **poucas dezenas de
> chamadas por mês**, cada uma processando **muitos documentos de uma vez**, não um documento
> por chamada.

---

## 3. Passo 2 — Renomeação padronizada (o "nome fala por si")
Depois do reconhecimento, cada arquivo é renomeado seguindo um **padrão fixo**, por exemplo
(a definir com você — Seção 8):

```
AAAA-MM_MODULO-SIGA_TIPO-DOCUMENTO_DESCRICAO-CURTA_SEQ.ext
```//exemplo:
```
2026-07_TESOURARIA_extrato-bancario_banco-do-brasil-cc-1234_01.pdf
2026-07_ALMOXARIFADO_nota-fiscal_compra-material-limpeza_03.xml
2026-07_CAIXA_termo-verificacao_conferencia-mensal_01.jpg
```
- **Qualquer humano lê o nome e já sabe do que se trata**, sem abrir o arquivo — exatamente o
  que você pediu, para conseguir **anexar no SIGA direto no módulo certo**.
- Nomes **não** carregam dado sigiloso desnecessário (nome de pessoa física, número de conta
  completo) — ver LGPD, Seção 6.

> **Regras específicas já registradas (decisão FINAL adiada — ver nota abaixo):**
> - Documento **de conta** → nome sempre inclui o **número da conta**, conforme o **plano de
>   contas** da instituição.
> - **Comprovante** (nota, cupom, cheque etc.) → nome sempre inclui o **valor financeiro** do
>   documento.
> - **Cheque** → nome sempre inclui o **número do cheque**.
> - **Movimentação de cartão de débito pré-pago** → nome sempre inclui o **número de
>   identificação do cartão**.
> - *(e outras regras semelhantes, por tipo de documento, a mapear junto com você.)*
>
> `[SUPOSIÇÃO / DECISÃO ADIADA]` O **padrão definitivo de nomenclatura** (Seção 3 como um todo)
> só será fechado **depois que o módulo de IA estiver funcionando**, testando com uma **amostra
> de documentos reais** — para validar se o reconhecimento consegue extrair esses campos
> (número de conta, valor, número de cheque, ID de cartão) com confiabilidade suficiente antes
> de virar regra fixa. As regras acima já ficam **anotadas como requisito**, não como versão
> final.

## 4. Passo 3 — Reorganização da pasta do Drive
```
📁 [Ponto] /
  📁 2026-07/
    📁 Tesouraria/
    📁 Almoxarifado/
    📁 Caixa/
    📁 (demais módulos do SIGA)
  📁 2026-08/
    ...
```
- A IA **move** (não copia) os arquivos renomeados para a subpasta certa, criando a estrutura
  se não existir.
- **Antes de mover em massa:** roda em modo **"prévia"** (mostra o plano: "vou mover X para Y")
  — o conferidor confirma antes da execução real. **Nunca move/renomeia sem essa prévia** na
  primeira vez que o módulo roda numa pasta nova (depois, para pastas já confiáveis, pode ficar
  mais automático — configurável).

## 5. Passo 4 — O relatório de auditoria (o "conferidor-IA")
Depois de organizado, o módulo **compara documentos × lançamentos do SIGA** e aponta:
- **Falta de documento** de um tipo exigido num processo (ex.: processo sem o extrato correspondente).
- **Falta de carimbo/assinatura** (ou presença de **rubrica** onde deveria ter **assinatura por
  extenso** — via OCR + comparação de padrão visual, não é 100% garantido, então o relatório
  marca isso como "**verificar**", não como certeza absoluta).
- **Inconsistência contábil** (contas que não batem, valores divergentes entre documento e SIGA).
- **Lançamento sem documento físico** (tem no SIGA, não tem o papel).
- **Documento sem lançamento** (tem o papel, não tem no SIGA).

> **Postura do relatório:** a IA **aponta e sinaliza para revisão humana** — ela **não decide**
> que algo está errado de forma definitiva. Linguagem do tipo "possível falta de X — verificar"
> em vez de "está errado". Quem decide e assina a conferência final é **sempre uma pessoa**.

---

## 6. LGPD — não é opcional, é a espinha dorsal do desenho
1. **Minimização:** a IA só processa o que precisa para o objetivo (nomear/organizar/auditar);
   não deve **extrair e guardar** dados pessoais sensíveis (CPF, número de conta completo,
   assinatura) em nenhum lugar além do necessário para o nome do arquivo (e mesmo aí, evitar).
2. **Nomes de arquivo sem dado sensível desnecessário.** Prefira "extrato-bancario" a
   "extrato-cpf-xxxxx"; se precisar diferenciar, usar um **código interno** (não o CPF cru).
3. **Onde ficam os dados durante o processamento:** o texto extraído por OCR **passa** pela IA
   (para classificar/nomear) mas **não deve ficar armazenado** em log do provedor de IA além do
   necessário — usar, quando disponível, configurações de **não retenção** / **zero data
   retention** do provedor (Claude e Gemini têm opções empresariais nesse sentido — a confirmar
   qual plano/API oferece isso; é um `[LACUNA]` técnico a validar antes de implementar).
4. **Controle de acesso:** só o **conferidor dono** do ponto (e supervisores/superusuário do
   domínio, mesma regra de sigilo do resto do sistema) pode disparar o processamento e ver o
   relatório de auditoria.
5. **Log de auditoria** de cada rodada de processamento (quem rodou, quando, quantos arquivos,
   resumo) — sem guardar o conteúdo sensível no log, só metadados.
6. **Retenção e descarte:** os documentos ficam no **Drive do próprio ponto/regional** (não em
   um servidor nosso) — o sistema **acessa**, não **copia para fora**. Isso reduz a superfície
   de risco de vazamento (coerente com o desenho de armazenamento do `MAPA_ARMAZENAMENTO`).
7. **Base legal:** processar documentação financeira/administrativa de uma entidade religiosa
   para fins de conferência interna é uma finalidade legítima e específica — mas recomendo
   **formalizar** isso (um aviso interno de que documentos são processados por IA para
   organização/conferência), para transparência com quem entrega/gera esses documentos.

> `[LACUNA]` Este ponto (retenção de dados pelo provedor de IA, contratos de processamento de
> dados/DPA) precisa de checagem técnica específica **antes** de implementar — não é algo que eu
> deva prometer sem confirmar a política vigente de cada provedor no momento da implementação.

---

## 7. Orçamento de tokens (o requisito "menos que uma janela de 5h do Claude Pro")
- **Meta:** todo o processamento de IA (reconhecimento de ambíguos + redação do relatório) de
  **um mês inteiro**, mesmo com **milhares de imagens**, deve consumir **menos tokens do que o
  limite de uma janela de uso de 5h do Claude Pro**.
- **Como isso é viável, na prática (graças à arquitetura em camadas da Seção 2):**
  - OCR **não conta como tokens de IA de raciocínio** — é outro serviço, custo separado e menor.
  - IA de raciocínio só entra para **casos ambíguos** (uma fração pequena do total) e **para
    redigir o relatório final** (texto curto, a partir de dados já prontos).
  - Processamento **em lote** (várias dezenas de documentos por chamada) em vez de 1-por-1.
- **Salvaguarda:** um **teto de gasto/tokens configurável** (igual ao proposto em `MAPA_IA_v1`)
  específico para este módulo, com **alerta antes de estourar** e opção de **pausar** o
  processamento de um lote grande para revisão manual.
- `[SUPOSIÇÃO]` "Uma janela de 5h do Claude Pro" é uma referência de **ordem de grandeza** para
  guiar o orçamento, não uma métrica técnica exata (são sistemas de cobrança diferentes: Claude
  Pro é assinatura com limite de uso; a API deste módulo é paga por token). Na implementação,
  vamos converter isso num **número real de tokens/mês** como meta de engenharia.

---

## 8. Decisões que preciso confirmar com você
1. **Padrão de nome do arquivo:** o modelo da Seção 3 serve, ou você quer um formato diferente
   (ordem dos campos, abreviações específicas do SIGA)?
2. **Estrutura de pastas:** mês → módulo SIGA (como na Seção 4) é o que você imagina, ou prefere
   módulo SIGA → mês (pastas ao contrário)?
3. **Confirmação antes de mover/renomear:** sempre pedir prévia, ou só na primeira vez por pasta
   (depois roda mais automático)? *(sugiro: sempre a opção de revisar antes, mas com modo
   "confiar e automatizar" opcional para pastas já usadas antes.)*
4. **Quem pode disparar este módulo:** só o conferidor do próprio ponto, ou também
   supervisores/administradores da regional podem rodar para um ponto sob sua responsabilidade?
5. **Nível de detalhe do relatório de auditoria:** um resumo por processo, ou item por item
   (mais longo, mais completo)?
6. **Este módulo entra no MESMO sistema** (mesma sessão de login, mesmo Firebase) ou você prefere
   que seja um **satélite separado** (outro Apps Script/ferramenta, só linkado)? *(Isso muda
   bastante a arquitetura de implementação — recomendo conversarmos especificamente sobre isso.)*

---

## 9. Impacto e ordem (honestidade)
- Este é um módulo **grande e sensível** (dados críticos, custo de IA, integração com Drive e
  potencialmente com o SIGA). **Não é** parte do fluxo do checklist em si — é complementar.
- Recomendo tratá-lo como uma **fase própria**, **depois** da Fase 0 (permissões/segurança) já
  estar valendo, porque ele herda as mesmas regras de sigilo por localidade.
- **Não faz sentido implementar OCR/IA de documentos antes de resolver a arquitetura de
  segurança e permissões do sistema principal** — a base de "quem pode ver o quê" é a mesma.

---

## 10. Resumo de uma linha
> **Um "conferidor-IA" que lê a pasta do Drive de um ponto, usa OCR barato (não IA cara) para a
> maior parte do trabalho, renomeia e reorganiza os arquivos por mês/módulo do SIGA, e gera um
> relatório de auditoria apontando o que está fora das normas — tudo dentro da LGPD, com um
> orçamento de tokens pensado para caber em bem menos do que uma janela de uso do Claude Pro.**
