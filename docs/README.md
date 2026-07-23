# 📁 Documentação do projeto CCB-PIA-Compliance
## Mapa de todos os documentos desta pasta (índice de navegação)

> Este arquivo existe para você (e a equipe) **acharem tudo rapidamente**. Cada documento tem uma
> frase do que é e para que serve. Abra este `README.md` sempre que se perder na pasta.

---

## 1. Fonte de verdade e requisitos
| Arquivo | O que é |
|---|---|
| [`REQUISITOS_CONSOLIDADO_CCB_PIA.md`](REQUISITOS_CONSOLIDADO_CCB_PIA.md) | **A fonte única de requisitos, regras, terminologia, pendências e proibições** do sistema. Ler antes de qualquer alteração. |
| [`CHECKLIST_CONTEUDO.md`](CHECKLIST_CONTEUDO.md) | Extração canônica do conteúdo do checklist (partes, seções, itens). |
| [`checklist_def.json`](checklist_def.json) | O checklist como **dado** (semente do futuro editor). |

## 2. Desenho do sistema (os “MAPAs” — planejamento antes de codificar)
| Arquivo | O que é |
|---|---|
| [`MAPA_PERMISSOES_RELATORIOS_v1.md`](MAPA_PERMISSOES_RELATORIOS_v1.md) | Hierarquia de permissões (Regional → Localidade → Ponto), papéis e sigilo. |
| [`MAPA_FLUXO_POR_SECAO_v1.md`](MAPA_FLUXO_POR_SECAO_v1.md) | Fluxo colaborativo por seção (conferir → enviar → aprovar/devolver). |
| [`MAPA_ARMAZENAMENTO_E_EDITOR_v1.md`](MAPA_ARMAZENAMENTO_E_EDITOR_v1.md) | Armazenamento (Firebase + Drive), poda, capacidade, editor de checklist, recuperação do superusuário. |
| [`MAPA_MODO_TESTE_v1.md`](MAPA_MODO_TESTE_v1.md) | Modo de teste/homologação isolado (gaveta privada por testador; usuários reais/virtuais; import/mescla). |
| [`MAPA_IA_v1.md`](MAPA_IA_v1.md) | Módulo de IA multi-provedor (Claude/Gemini/outra) atrás do proxy; chave nunca no navegador. |
| [`MAPA_IA_DOCUMENTACAO_v1.md`](MAPA_IA_DOCUMENTACAO_v1.md) | Módulo de Documentação (Drive/OCR/renomear/auditoria) — o “conferidor-IA”. |
| [`MAPA_CONCILIACAO_AUDITORIA_v1.md`](MAPA_CONCILIACAO_AUDITORIA_v1.md) | Motor de conciliação e auditoria contínua (three-way match, Benford, exceção-primeiro). |
| [`MAPA_MODULO_PDF_v1.md`](MAPA_MODULO_PDF_v1.md) | Estúdio de PDF (juntar/dividir/converter/editar/assinar) + pipeline escanear→arquivar + assinatura ICP-Brasil. |

## 3. Plano de implementação
| Arquivo | O que é |
|---|---|
| [`PLANO_MESTRE_IMPLEMENTACAO_v1.md`](PLANO_MESTRE_IMPLEMENTACAO_v1.md) | **A ordem de construção de tudo**, em fases (0 a 9), com dependências. O mapa de “quando voltarmos a codificar”. |

## 4. Base de conhecimento do FECHAMENTO da Piedade
> Material extraído do super manual e das anotações da equipe, para o manual de fechamento e para
> alimentar o motor de auditoria.

| Arquivo | O que é |
|---|---|
| [`ROTEIRO_COMPLIANCE_PIEDADE.md`](ROTEIRO_COMPLIANCE_PIEDADE.md) | **🧭 Roteiro consolidado do compliance** — 12 módulos/capítulos (EAPI + ACPI), cada um ligado a um Google Doc de trabalho na pasta do Drive. Índice-mestre. |
| [`Manual_Fechamento_Piedade.docx`](Manual_Fechamento_Piedade.docx) | **📄 Documento de consulta (Word) para a equipe validar** — conciliação, documentos obrigatórios e escrituração. |
| [`MANUAL_FECHAMENTO_PIEDADE.md`](MANUAL_FECHAMENTO_PIEDADE.md) | A versão navegável (Markdown) do documento de consulta definitivo. |
| [`super_manual_piedade_ccb.md`](super_manual_piedade_ccb.md) | **O super manual** (24 documentos oficiais da CCB) — fonte primária. |
| [`FONTES_FECHAMENTO_PIEDADE_COMPILADO.txt`](FONTES_FECHAMENTO_PIEDADE_COMPILADO.txt) | Compilado **integral, sem resumo**, dos 27 arquivos-fonte enviados pela equipe. |
| [`FECHAMENTO_PIEDADE_WIP.md`](FECHAMENTO_PIEDADE_WIP.md) | ⚠️ **Rascunho de trabalho — SUPERADO** pelo `MANUAL_FECHAMENTO_PIEDADE.md`. Mantido só como histórico. |

## 5. Setups técnicos (configuração de serviços)
| Arquivo | O que é |
|---|---|
| [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md) | Configuração do Firebase (Security Rules etc.). |
| [`APPS_SCRIPT_SETUP.md`](APPS_SCRIPT_SETUP.md) | Configuração do Google Apps Script (proxy de IA/e-mail). |

---

## Onde vive o site publicado
O site em si (`index.html`, `config.js`, `assets/`) e o `CLAUDE.md` ficam na **raiz** do
repositório — **não** nesta pasta. Esta pasta `docs/` guarda **planejamento e apoio**.

## Estado atual (julho/2026)
- Fase de **desenho** das grandes áreas: **concluída** (todos os MAPAs acima).
- **Manual de Fechamento**: entregue em `.docx` para **validação da equipe** (aguardando retorno).
- **Implementação de código** (Fases 0–9 do Plano Mestre): **ainda não iniciada** — começa quando
  o dono disser “vamos implementar”. Até lá, o `index.html` permanece intocado.
