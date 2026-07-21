# MAPA — Módulo de IA (provedor: Claude ou Gemini)
## Documento de análise e desenho (v1 — 21/07/2026) · é desenho, não código

> **Pergunta do dono:** "estava pensando em usar o Gemini no módulo de IA. Mas agora estou
> considerando integrar com o Claude. Seria possível?"
>
> **Resposta curta: SIM, é totalmente possível — e não muda a arquitetura do sistema.** O
> provedor de IA é **trocável** sem reescrever o site. Abaixo o porquê e como.
>
> **Requisito firmado pelo dono (v1.1):** deve ser **sempre possível usar Claude E Gemini** — e
> ainda deixar aberto para **outra IA** que dê conta do trabalho. Por isso o desenho abaixo é
> **multi-provedor por padrão**: o proxy fala uma "língua comum" e cada provedor é um "adaptador"
> plugável. O superusuário só escolhe qual usar (ou deixa a IA fazer a fusão dos testes — ver
> `MAPA_MODO_TESTE_v1`, Seção 5-B).

---

## 1. Como a IA se conecta ao sistema (a peça-chave)
O site (`index.html`) **nunca** fala direto com a IA. Ele fala com um **intermediário** nosso —
o **proxy** (um Google Apps Script, já previsto como `AI_PROXY_URL`). O proxy é quem conversa
com a IA e devolve a resposta para o site.

```
[ site no navegador ] → [ nosso proxy (Apps Script) ] → [ IA: Claude OU Gemini ]
        (sem chave)              (guarda a chave secreta)         (responde)
```

**Por que isso importa (segurança):** a **chave de acesso** (a "senha" que paga e libera a IA)
**JAMAIS pode ficar no navegador** — qualquer visitante do site conseguiria copiá-la e gastar
em nome da igreja. A chave fica **só no proxy**, no servidor. Isso vale **igual** para Gemini e
para Claude. Ou seja: **trocar de Gemini para Claude é trocar qual chave o proxy guarda e para
qual endereço ele liga** — o site nem percebe a diferença.

---

## 2. É possível integrar com o Claude? Sim. O que muda:
| Item | Gemini (Google) | Claude (Anthropic) |
|---|---|---|
| Onde a chave mora | no proxy (Apps Script) | no proxy (Apps Script) — **mesmo lugar** |
| O site muda? | não | **não** |
| O que o proxy chama | endpoint do Gemini | endpoint do Claude (`/v1/messages`) |
| Formato da resposta | JSON do Google | JSON da Anthropic (o proxy converte para o padrão que o site espera) |
| Conta necessária | Google AI Studio | conta na Anthropic (console.anthropic.com) com crédito |

> **Conclusão:** a decisão Gemini × Claude é **isolada dentro do proxy**. Podemos, inclusive,
> deixar o proxy preparado para **os dois**, e o superusuário escolhe o provedor numa
> configuração — sem mexer no site depois.

---

## 3. Para que a IA seria usada neste sistema (usos previstos)
- **Resumir os feedbacks dos testes** e redigir a "proposta consolidada" (ver `MAPA_MODO_TESTE`).
- **Ajudar a redigir observações** de itens do checklist (rascunho que o humano revisa).
- **Explicar pendências** em linguagem simples para quem for preencher.
- *(Sempre com o humano no controle — a IA propõe, a pessoa aprova.)*

---

## 4. Custo — ponto sensível para a igreja
A IA é **paga por uso** (por quantidade de texto). Para um sistema de igreja, com orçamento
apertado, a recomendação é usar o **modelo mais econômico** que dê conta:

- **Claude Haiku 4.5** — o mais barato da família Claude (aprox. **US$ 1 por milhão de
  "pedaços" de texto de entrada** e **US$ 5 por milhão na saída**). Para resumir feedbacks e
  redigir observações curtas, é **mais que suficiente** e mantém o custo baixíssimo.
- Só subir para um modelo maior (Sonnet/Opus) **se** algum uso específico exigir raciocínio
  mais pesado — o que **não parece** ser o caso aqui.

> `[SUPOSIÇÃO]` Os usos previstos são todos "leves" (resumir/redigir texto curto). Se no futuro
> você quiser algo como analisar planilhas grandes, revemos o modelo.

> **Controle de gasto:** o proxy pode ter um **limite mensal** (ex.: trava ao atingir X
> chamadas/mês) para nunca haver surpresa na fatura. Recomendo incluir isso no desenho do proxy.

---

## 5. Recomendação
1. **Sim, integrar com o Claude é viável** e não custa retrabalho no site — a troca vive no proxy.
2. **Multi-provedor por padrão** (requisito seu): o proxy é desenhado com **adaptadores**
   plugáveis — Claude e Gemini **sempre** disponíveis, com "gancho" para uma terceira IA. O
   superusuário escolhe numa configuração ("usar Claude" / "usar Gemini" / "usar outra"), sem
   tocar no site. Cada provedor tem **sua própria chave**, todas guardadas **só no proxy**.
3. Para **custo mínimo**: começar com **Claude Haiku 4.5**, com **teto de gasto mensal** no proxy.
4. **Nada disso mexe no `index.html` agora** — é desenho. Quando chegarmos à implementação do
   módulo de IA (final do projeto, Fase 6), seguimos este mapa.

---

## 6. Decisões que preciso confirmar com você
1. **Provedor:** Claude, Gemini, ou **proxy com os dois** (recomendo os dois, para você escolher
   depois testando)?
2. **Teto de gasto mensal** no proxy: quer definir um limite (ex.: um valor máximo por mês)?
3. **Escopo de uso da IA:** começamos só pelo "resumir feedbacks dos testes", ou já incluímos
   "ajudar a redigir observações do checklist"?

---

## 7. Resumo de uma linha
> **Integrar com o Claude é possível e sem retrabalho: a chave e o provedor ficam no proxy
> (nunca no navegador), o site não muda, e para o bolso da igreja o ideal é o modelo mais barato
> (Claude Haiku 4.5) com teto de gasto mensal.**
