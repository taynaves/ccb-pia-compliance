# 🤖 Configuração da Integração IA — Google Apps Script + Gemini
**Para integrar a análise de IA ao Checklist Compliance CCB.**
*Siga cada passo na ordem indicada. Cada instrução diz exatamente o que clicar.*

---

## O que isso faz?

Quando você gerar um relatório com itens **Pendentes**, o sistema vai perguntar:
> "Incluir Análise e Orientações (IA)?"

Se você disser sim, o Gemini 2.0 Flash vai analisar cada item pendente e incluir no PDF:
- **A obrigatoriedade** (documento, seção e página)
- **O trecho exato** do manual que determina aquele item
- **Como resolver** a pendência
- **O prazo** recomendado

A chave da API fica segura no Google Apps Script — nunca fica exposta no código público do GitHub.

---

## PARTE 1 — Obter a Chave da API Gemini (grátis)

### Passo 1: Acessar o Google AI Studio
1. Acesse: **https://aistudio.google.com**
2. Faça login com sua conta Google
3. No topo da tela, clique em **"Get API key"** (botão azul)
4. Clique em **"Create API key"**
5. Selecione o projeto Firebase que você criou (ou crie um novo)
6. Clique em **"Create API key in existing project"**
7. **Copie a chave gerada** (começa com `AIzaSy...`) — guarde em local seguro

---

## PARTE 2 — Criar o Projeto Google Apps Script

### Passo 2: Abrir o Apps Script
1. Acesse: **https://script.google.com**
2. Faça login com a mesma conta Google
3. Clique em **"Novo projeto"** (botão azul, canto superior esquerdo)
4. Clique no título "Projeto sem título" (topo da tela)
5. Digite o nome: `ccb-pia-compliance-ai` e clique em **"Renomear"**

### Passo 3: Colar o código
1. Na aba do editor (já aberta com um arquivo `Código.gs` vazio)
2. **Selecione todo o conteúdo** (Ctrl+A) e **delete**
3. Abra o arquivo `apps_script_code.gs` (que está no ZIP que você baixou)
4. **Copie todo o conteúdo** (Ctrl+A → Ctrl+C)
5. Cole no editor do Apps Script (Ctrl+V)
6. Clique no ícone de **💾 disquete** (ou Ctrl+S) para salvar

### Passo 4: Configurar a chave da API (de forma segura)
1. No menu lateral esquerdo, clique no ícone de **⚙ engrenagem** (Configurações do projeto)
2. Role para baixo até **"Propriedades do script"**
3. Clique em **"Adicionar propriedade"**
4. Preencha:
   - **Propriedade:** `GEMINI_API_KEY`
   - **Valor:** cole a chave que você copiou no Passo 1
5. Clique em **"Salvar propriedades do script"**

*(Opcional — só necessário quando o super arquivo .md estiver pronto):*
6. Clique em **"Adicionar propriedade"** novamente
7. Preencha:
   - **Propriedade:** `MANUALS_FILE_ID`
   - **Valor:** ID do arquivo .md com todos os manuais no Google Drive
8. Clique em **"Salvar propriedades do script"**

> O ID do arquivo está na URL do Drive ao abrir o arquivo:
> `drive.google.com/file/d/`**`ESTE-E-O-ID`**`/view`

### Passo 5: Testar a integração
1. No editor, no menu suspenso de funções (topo, próximo ao botão ▶), selecione **`testarIntegracao`**
2. Clique no botão ▶ **"Executar"**
3. Se aparecer uma janela pedindo permissões, clique em **"Examinar permissões"** → selecione sua conta → clique em **"Avançado"** → **"Ir para ccb-pia-compliance-ai"** → **"Permitir"**
4. No painel **"Log de execução"** (embaixo do editor), verifique:
   - `API Key configurada: SIM (AIzaSy...)`
   - `Resposta IA: {...}` (deve ter um item com análise)

Se aparecer algum erro, verifique se a chave foi colada corretamente.

---

## PARTE 3 — Publicar como Aplicativo Web

### Passo 6: Implantar como Web App
1. No canto superior direito, clique em **"Implantar"** (botão azul)
2. Clique em **"Nova implantação"**
3. Clique no ícone de ⚙ ao lado de "Selecionar tipo" e escolha **"Aplicativo da Web"**
4. Preencha os campos:
   - **Descrição:** `V1 - Compliance CCB`
   - **Executar como:** `Eu (seu e-mail)` ← IMPORTANTE
   - **Quem pode acessar:** `Qualquer pessoa` ← IMPORTANTE
5. Clique em **"Implantar"**
6. Copie a **URL do aplicativo Web** que aparece — ela tem este formato:
   `https://script.google.com/macros/s/AKfycbXXXXXXXXXXXXXXXXXXXX/exec`

### Passo 7: Configurar a URL no sistema
**Opção A — via config.js (mais simples):**
1. Abra o arquivo `config.js` no GitHub
2. Preencha o campo `AI_PROXY_URL:` com a URL do Passo 6
3. Clique em "Commit changes"

**Opção B — via Painel Admin (sem mexer no código):**
1. Acesse o sistema → Painel Admin (⚙)
2. Na seção "Integração IA", cole a URL no campo "URL do Proxy IA"
3. Clique em "Salvar"

---

## PARTE 4 — Adicionar o arquivo de manuais (quando estiver pronto)

*Faça isto quando o super arquivo .md com todos os manuais estiver preparado.*

### Passo 8: Subir o arquivo de manuais ao Drive
1. Acesse **drive.google.com**
2. Na pasta do sistema CCB, faça upload do arquivo `manuais_ccb_piedade.md`
3. Abra o arquivo → copie o ID da URL (entre `/d/` e `/view`)
4. Em **script.google.com** → seu projeto → Configurações → Propriedades do script
5. Edite `MANUALS_FILE_ID` e cole o ID
6. Clique em **"Salvar propriedades do script"**
7. No menu suspenso, selecione `forcarRecriacao` e clique ▶ **"Executar"**
8. Verifique no Log: `Cache criado: cachedContents/XXX`

Pronto! A partir de agora, o Gemini vai usar os manuais reais da Piedade para as análises.

---

## ❓ Problemas comuns

**"Você não tem permissão para acessar"**
→ Em "Quem pode acessar", certifique-se de ter selecionado **"Qualquer pessoa"** (não "Qualquer pessoa com conta Google")

**"Error 403 / Authentication required"**
→ Reimplante com uma **nova implantação** (não atualização) e verifique o campo "Executar como: Eu"

**Análise retorna "manuais não configurados"**
→ O `MANUALS_FILE_ID` ainda não foi configurado — as análises funcionam mas sem citar o manual. Configure quando o super .md estiver pronto.

**PDF gerado sem a seção de análise**
→ Verifique se marcou o checkbox "Incluir Análise IA" no modal de geração de relatório. Verifique também se a URL do proxy está correta no config.js ou no painel admin.

---

*V.2.0 — Created by Dr. Taynã Naves in June 2026*
