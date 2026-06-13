# ⛪ CCB PIA Compliance — Checklist Mensal V2.0
**Secretaria da Piedade | Obra da Piedade | Congregação Cristã no Brasil**  
*Created by Dr. Taynã Naves in June 2026*

---

## O que é este sistema

Aplicação web completa para o preenchimento, revisão e arquivamento do **Checklist Mensal de Compliance** da Secretaria da Piedade (ACPI-REG + EAPI-REG, 90 itens). Funciona no browser sem instalação. Múltiplos Diáconos podem preencher simultaneamente em tempo real.

### Funcionalidades principais

| Funcionalidade | Descrição |
|---|---|
| 🔐 Login Google | Acesso exclusivo via conta Google (sem senha compartilhada) |
| 👥 Multi-usuário | Vários Diáconos preenchem ao mesmo tempo, em tempo real |
| 🏢 Multi-localidade | Um usuário pode gerenciar múltiplas RRMs, RMAs e pontos |
| 📋 90 itens ACPI+EAPI | Checklist completo com status automático por seção |
| 🔄 Fluxo Rascunho→Revisão→Publicado | Workflow institucional com ciência de Diáconos |
| 📄 PDF profissional | Relatório com cabeçalho CCB, itens pendentes, assinaturas, carimbo |
| 📝 Backup .md | Arquivo compacto que permite regenerar o PDF a qualquer momento |
| 🤖 Análise IA | Gemini 2.0 Flash cita normas e orienta sobre cada item pendente |
| 📜 Histórico | Todos os relatórios publicados ficam acessíveis para reimpressão |

---

## 🚀 Como fazer o deploy (ordem correta)

### ETAPA 1 — Firebase (obrigatório)
Siga o arquivo **`FIREBASE_SETUP.md`** passo a passo.
Ao final você terá: login Google funcionando + banco de dados em tempo real.

### ETAPA 2 — GitHub Pages
1. Crie um repositório público: `ccb-pia-compliance`
2. Faça upload de **todos os arquivos** na estrutura abaixo
3. Ative Pages: Settings → Pages → Branch: main → Save
4. Aguarde 2-3 min → link: `https://SEU-USUARIO.github.io/ccb-pia-compliance`

### ETAPA 3 — Primeiro acesso (Superusuário)
1. Acesse o link → Entre com Google → você vira **superusuário automaticamente**
2. Preencha seu perfil
3. Clique ⚙ **Admin** → **Gerenciar Localidades** → adicione:
   - RRM (ex.: RRM-Coxim.MS)
   - RMAs dentro de cada RRM (ex.: RMA-Coxim.MS)
   - Pontos de atendimento de cada RMA (ex.: PIA-Coxim, PIA-Sonora, PIA-São Gabriel)
4. Compartilhe o link com os outros Diáconos → aprove-os no Painel Admin

### ETAPA 4 — Integração IA (opcional)
Siga o arquivo **`APPS_SCRIPT_SETUP.md`**.
Ao final, o sistema incluirá um Anexo de Análise Normativa em cada PDF gerado.

---

## 📁 Estrutura dos arquivos

```
ccb-pia-compliance/
├── index.html              ← Aplicação completa (não edite)
├── config.js               ← Configurações (edite este)
├── FIREBASE_SETUP.md       ← Tutorial Firebase (12 passos)
├── APPS_SCRIPT_SETUP.md    ← Tutorial IA (8 passos, opcional)
├── apps_script_code.gs     ← Código do proxy IA (cole no Apps Script)
└── assets/
    └── ccb_church.png      ← Imagem da CCB (substitua se quiser)
```

---

## ⚙ O arquivo config.js

Edite apenas este arquivo. Os campos mais importantes:

```javascript
// Firebase — obrigatório (ver FIREBASE_SETUP.md)
FIREBASE: {
  apiKey: "AIzaSy...",
  authDomain: "...",
  databaseURL: "https://...-default-rtdb.firebaseio.com",
  // etc.
},

// Integração IA — opcional (ver APPS_SCRIPT_SETUP.md)
AI_PROXY_URL: "https://script.google.com/macros/s/.../exec",

// Tamanho da imagem de login (%)
LOGIN_IMAGE_SIZE_PCT: 100,
```

---

## 📋 Fluxo mensal de uso

```
1. Diáconos entram com Google e abrem o checklist do mês
2. Preenchem ✓ Realizado / ✗ Pendente / ⊘ N/A por item
   (mudanças aparecem em tempo real nas telas dos outros)
3. Seções mudam de cor automaticamente conforme o preenchimento
4. Responsável clica "→ Enviar para Revisão" e escolhe o revisor
5. Revisor analisa, faz ajustes e clica "✅ Publicar"
6. PDF é gerado: cabeçalho CCB + itens pendentes + N/A + assinaturas
   (+ Anexo IA se configurado, com citações dos manuais)
7. Próximo mês: botão "↺ Novo mês" — começa do zero
```

---

## 🔒 Segurança

- Login exclusivo via Google — sem senhas compartilhadas
- Novos usuários precisam de aprovação do superusuário
- Credenciais Firebase podem ficar no código público (segurança é pelas Security Rules)
- Chave da API Gemini fica **somente no Apps Script** — nunca no GitHub público
- Dados ficam no Firebase do próprio usuário (você é dono dos dados)

---

## 📞 Próximos passos sugeridos

1. **Super arquivo de manuais** — preparar o `.md` unificado com todos os manuais da Piedade para habilitar as citações precisas da IA (sessão separada)
2. **Itens adicionais** no checklist — baseados nos manuais revisados
3. **Compartilhar** com o Conselho Estadual de Diáconos para outras regionais

---

*V.2.0 — Fases 1+2+3+4 completas — Created by Dr. Taynã Naves in June 2026*
