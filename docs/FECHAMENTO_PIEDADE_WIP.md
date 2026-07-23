# MANUAL DE FECHAMENTO DA PIEDADE — documento de consulta (EM CONSTRUÇÃO)
## Tudo o que é obrigatório para um fechamento perfeito · Regional Coxim-MS

> ⚠️ **DOCUMENTO EM CONSTRUÇÃO (WIP).** Está sendo montado a partir de **32 arquivos** enviados
> em lotes de 5. Ao final, será **confrontado com o `super_manual_piedade_ccb.md`** e virado o
> documento de consulta definitivo. **Progresso: lote 1 de 7 processado (arquivos 1–5 de 32).**
>
> **Método (para você confiar no conteúdo):** eu **só transcrevo e organizo** o que está nas
> fontes — não invento regra. Marco `[LACUNA]` onde falta informação, `[CONFLITO]` onde duas
> fontes divergem, e `[FONTE: arquivo]` a origem de cada regra. Números e normas serão
> **confirmados por você/equipe** antes da versão final.

---

## Índice
1. Prazos-chave do ciclo mensal
2. Documentos obrigatórios do fechamento
3. Reuniões de atendimento — o que anexar
4. Conferências e conciliações contábeis obrigatórias
5. Regras por conta (contas que devem zerar; saldos esperados)
6. Plano de contas VIVO de Coxim (+ contas inativas)
7. Segregação de funções e controles internos
8. Regras por processo (viagens, almoxarifado, Santa Ceia, transferências/pares-espelho)
9. Verificações de campo (anotações de reunião de treinamento)
10. Fontes processadas / pendentes

---

## 1. Prazos-chave do ciclo mensal
| Prazo | Regra | Fonte |
|---|---|---|
| **Dia 10 do mês seguinte** | Repasse de **coletas/ofertas** ADM → Piedade | CHECKPOINT_E3 (DOC-24 slide 133) |
| **Dia 20 do mês subsequente** | **Fechamento no SIGA** | CHECKPOINT_E3 (DOC-16/18/24) |
| **Dia 30 do mês subsequente** | **Digitalização completa** dos documentos | CHECKPOINT_E3 (DOC-18/19) |
| **Até 2 meses** | Prazo máximo de **prestação de contas de viagem** (pendência **bloqueia nova viagem**) | CHECKPOINT_E3 (DOC-01) |
| **Mínimo 2×/ano** | **Inventário físico** (conciliação da conta 1054 é **mensal**) | CHECKPOINT_E3 (DOC-21/17) |

## 2. Documentos obrigatórios do fechamento (anexar na janela de encerramento)
> `[FONTE: conv_critiane.txt]` (anotação de reunião) + a consolidar com o manual:
- **Atas** de **todas** as reuniões de atendimento;
- **Posição Financeira** de **todas** as reuniões;
- **Lista de Presença** de **todas** as reuniões;
- **Balancete completo** (referente ao mês);
- **C-9 — Movimentação Financeira**;
- **Protocolo de Documentos** (finalizar → entregar na secretaria da ADM para assinar → guardar
  na Secretaria da Piedade).

> `[LACUNA]` O manual (script #1) lista **6 blocos obrigatórios** de fechamento; a anotação acima
> lista itens parecidos mas não idênticos. **Confrontar e unificar** com o super manual.

## 3. Reuniões de atendimento — o que anexar (cada reunião)
> `[FONTE: conv_critiane.txt]`
- **Ata + Lista de Presença + Posição Financeira** (as três, por reunião).
- **Todos os envelopes**: **baixados** e **escaneados** — junto com **ficha (C-1)**, **envelope**
  e **DT de roupa/cestas** quando houver.
- Exemplo de pendência real anotada: *"reunião 10/01, 15:55, ata 001 — falta anexar ata, posição
  financeira e lista de presença"* (ilustra o tipo de falha que o motor de auditoria deve pegar).
- **Carimbo** a providenciar: *"Atendimento de Emergência — vide recibo nº ___"*.

## 4. Conferências e conciliações contábeis obrigatórias
> `[FONTE: BLOCO1A / DOC-21 — Plano de Contas Comentado]`
- **Termo de Conferência do Caixa:** ao fim do mês, **2 ou 3 Diáconos** conferem os valores em
  cofre, emitem o **"Termo de Conferência do Caixa"**, **assinam**, e **confrontam com a
  contabilidade** (vale para 10010, 10020, 10030).
- **Conciliação bancária mensal** de **todos** os bancos (10110/1011x, 10120/1012x, 10130).
- **Conciliação mensal das aplicações financeiras** (10310, 10320, 10330); rendimentos pelo
  **regime de competência**.
- **Adiantamentos de viagem (1044/1047):** a **listagem de adiantamentos em aberto** (módulo
  Viagens do CCBSiga) deve **coincidir com a contabilidade**; o **relatório de viagens do mês**
  deve **igualar** as despesas lançadas.
- **Adiantamentos a fornecedores (1040) e para despesas (1045):** manter **composição dos
  adiantamentos em aberto**.

## 5. Regras por conta (saldos esperados e contas que devem zerar)
> `[FONTE: BLOCO1A + CHECKPOINT_E3]`
| Conta | Regra de saldo / obrigação | Fonte |
|---|---|---|
| **10010/10020/10030** (Caixas) | Saldo **sempre devedor ou zero** | DOC-21 |
| **10110.../10120.../10130** (Bancos) | Saldo **sempre devedor ou zero**; conciliar mensal | DOC-21 |
| **10310/10320/10330** (Aplicações) | Saldo **devedor ou zero**; conciliar mensal | DOC-21 |
| **1040/1044/1045** (Adiantamentos) | Saldo **devedor ou zero** | DOC-21 |
| **1046** (Adto reuniões atendimento) | **Não deve ser diferente de zero** (sempre zerada) | DOC-21 / CHECKPOINT_E3 (#033) |
| **1047** (Adto viagens-cartão) | Pode ser **devedor, credor ou zero** | DOC-21 |
| **1054** (Estoque materiais atendimento) | Saldo **devedor ou zero**; conciliar **mensal** | DOC-21 |
| **2041** (Depósitos não identificados) | Após **3 meses** sem identificação → baixar como oferta (**C 4011, hist. 099**) | CHECKPOINT_E3 (#055) |
| **3100** (Atendimentos realizados) | Atendimento **não realizado** → crédito em **3100** | CHECKPOINT_E3 (#152) |
| **3900** (Transf. estoques entre almoxarifados) | Soma entre almoxarifados = **zero mensalmente** | CHECKPOINT_E3 (#136) |

## 6. Plano de contas VIVO de Coxim (+ inativas)
> `[FONTE: contas_coxim.txt]` — **as contas realmente em uso** na RRM-Coxim:

**100 — CAIXA:** 10010 Caixa Obra da Piedade · 10020 Caixa Viagens Missionárias · 10030 Caixa
Assembleias e Reuniões.
**101 — BANCOS CONTA MOVIMENTO:** 10110 BB ag 0552 cc 16.020-2 (Piedade) · 10112 Santander ag 3109
cc 130027576 (Piedade) · 10113 Santander cc 130027569 (Viagem) · 10114 Santander cc 130027583 (Música).
**103 — APLICAÇÕES FINANCEIRAS:** 10360 Santander cc 130027583 (Música) · 2019 Cartão de Crédito ·
2049 Cartão de Débito.
**INATIVAS:** 10120 BB cc 16030-X · 10130 BB cc 16.020-2.

> ⚠️ `[CONFLITO importante]` No **Plano de Contas Comentado (DOC-21)** os exemplos usam **10120**
> (bancos viagens) e **10130** (bancos assembleias) como **ativas**; mas em **Coxim essas duas
> estão INATIVAS** (as contas vivas de viagem/música são 10113/10114). **Atenção do motor de
> auditoria:** usar o plano **de Coxim** como verdade, não os exemplos genéricos do manual.
> Confirmar com a equipe qual conta recebe hoje o movimento de "assembleias e reuniões".

## 7. Segregação de funções e controles internos
> `[FONTE: CHECKPOINT_E3]`
- **Compras:** quem **recebe** ≠ quem **aprova** ≠ quem **paga** (segregação obrigatória) (DOC-14).
- **Conta bancária do Grupo Gestor:** movimentação **sempre com 2 Diáconos conjuntamente** (DOC-08).
- **Placar Power BI:** <50 vermelho · ≥50 e <70 amarelo · ≥70 verde (DOC-12).
- **Vinculação de Diáconos** cadastrada **apenas** na localidade PIA-Sede-da-RRM (DOC-13).

## 8. Regras por processo
> `[FONTE: CHECKPOINT_E3 + BLOCO1A]`
- **Santa Ceia:** compra **exclusiva via Distribuidoras** (Circular 234/2025, a partir de
  21/07/2025).
- **Estoque:** máximo de **4 reuniões** por item.
- **Viagens:** prestação de contas em até **2 meses**; pendência **bloqueia nova viagem**.
- **Transferências — pares espelho** (remetente Despesa ↔ receptora Receita), a bater sempre:
  | Remetente (Despesa) | Receptora (Receita) |
  |---|---|
  | 3401 Transf. Obra Piedade | 4201 Transf. recebidas Obra Piedade |
  | 3402 Transf. Viagens | 4202 Transf. recebidas Viagens |
  | 3406 Transf. Assemb./Reuniões | 4206 Transf. recebidas Assemb./Reuniões |
  | 3409 Transf. Necessidades diversas | 4209 Transf. recebidas Necess. diversas |
  | 3410 Transf. Materiais Obra Piedade | 4211 Transf. de materiais Obra Piedade |

## 9. Verificações de campo (anotações da reunião de treinamento)
> `[FONTE: conv_critiane.txt]` — itens a confirmar/resolver com a equipe:
- Verificar se **todos os fechamentos** foram feitos (prestação de contas).
- `[A confirmar com Dales]` Por que no **referencial de receitas fica tudo zerado** — Fundo
  Musical não está aparecendo?
- `[Tesouraria]` Pedir à ADM **relatório real e fiel** da realidade financeira; acompanhar o
  **extrato da conta ADM**; **lançar cada movimento no extrato**.
- `[A confirmar com Fernando]` Por que as **Casas de Oração não estão fechadas**?

---

## 10. Fontes processadas / pendentes
**Lote 1 (1–5) — PROCESSADO:**
1. `BLOCO1A_SubRodada_DOC21_ParteA_Contas100_210.md` — Plano de Contas Comentado (contas 100–210).
   *(fonte extensa — regras-chave extraídas; texto integral fica no arquivo original.)*
2. `CHECKPOINT_E3_Contexto_Producao.md` — meta do projeto anterior + **achados críticos** (usados acima).
3. `CHECKPOINT_E3_Inventario_Artefatos.md` — meta/inventário do projeto anterior (Mapa 198 itens).
4. `contas_coxim.txt` — **plano de contas vivo de Coxim** (Seção 6).
5. `conv_critiane.txt` — anotações de reunião (Seções 2, 3, 9).

**Lotes 2–7 (6–32):** aguardando envio.

> `[NOTA]` Os arquivos CHECKPOINT referem-se a um trabalho anterior que gerou o
> `FASE5_MapaProcessos_Contas_CCB_Piedade_v1.0.md` (198 itens, 9 seções) a partir do
> `super_manual_piedade_ccb.md` (24 DOCs). **Se você tiver esses dois arquivos**, enviá-los
> enriquece muito o confronto final.
