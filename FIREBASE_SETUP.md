# 🔥 Configuração do Firebase — Passo a Passo Completo
**Para quem nunca usou Firebase. Cada passo indica exatamente o que clicar.**

---

## O que é o Firebase e por que precisamos dele?

Firebase é um serviço gratuito do Google que fornece:
- **Autenticação** (login com Google)
- **Banco de dados em tempo real** (vários usuários veem as mudanças instantaneamente)
- Funciona diretamente no browser, sem servidor próprio

O plano gratuito (Spark) é mais do que suficiente para uso da secretaria.

---

## PARTE 1 — Criar o Projeto Firebase

### Passo 1: Acessar o Firebase Console
1. Abra o browser e acesse: **https://console.firebase.google.com**
2. Faça login com sua **conta Google** (a mesma que você usa no Drive)
3. Você verá a tela inicial do Firebase Console

### Passo 2: Criar um novo projeto
1. Clique no botão azul **"Criar um projeto"** (ou "Add project")
2. No campo **"Nome do projeto"**, digite: `ccb-pia-compliance`
3. Clique em **"Continuar"** (botão azul no rodapé)
4. Na tela "Google Analytics": **DESATIVE** o toggle (não precisamos)
5. Clique em **"Criar projeto"** e aguarde ~30 segundos
6. Quando aparecer "Seu novo projeto está pronto", clique em **"Continuar"**

---

## PARTE 2 — Registrar o Aplicativo Web

### Passo 3: Adicionar app da web ao projeto
1. Na tela principal do projeto, clique no ícone **`</>`** (Web)
   - Fica logo abaixo do nome do projeto, numa linha com outros ícones
2. No campo **"Apelido do app"**, digite: `compliance-web`
3. **NÃO** marque "Configurar também o Firebase Hosting"
4. Clique em **"Registrar app"** (botão azul)
5. Vai aparecer um bloco de código com `firebaseConfig`. **Deixe esta tela aberta** — você vai precisar copiar esses dados

### Passo 4: Copiar as credenciais para o config.js
O bloco exibido tem este formato:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "ccb-pia-compliance.firebaseapp.com",
  databaseURL: "https://ccb-pia-compliance-default-rtdb.firebaseio.com",
  projectId: "ccb-pia-compliance",
  storageBucket: "ccb-pia-compliance.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

Abra o arquivo **`config.js`** e preencha a seção `FIREBASE:` com esses valores.
Exemplo:
```javascript
FIREBASE: {
  apiKey:            "AIzaSy...",       // ← cole aqui
  authDomain:        "ccb-pia...",      // ← cole aqui
  databaseURL:       "https://ccb...",  // ← cole aqui (IMPORTANTE!)
  projectId:         "ccb-pia...",      // ← cole aqui
  storageBucket:     "ccb-pia...",      // ← cole aqui
  messagingSenderId: "123456...",       // ← cole aqui
  appId:             "1:123...",        // ← cole aqui
},
```

⚠️ O campo `databaseURL` é especialmente importante. Se não aparecer automaticamente, adicione manualmente no formato:
`https://SEU-PROJETO-default-rtdb.firebaseio.com`

6. Clique em **"Continuar no console"** (botão cinza)

---

## PARTE 3 — Ativar o Login com Google

### Passo 5: Ativar autenticação
1. No menu lateral esquerdo, clique em **"Authentication"** (ícone de pessoa)
2. Clique no botão **"Começar"** (ou "Get started")
3. Na aba **"Sign-in method"**, procure **"Google"** na lista
4. Clique em **"Google"** para expandir
5. Clique no toggle para **ATIVAR** (fica azul)
6. No campo **"E-mail de suporte do projeto"**, selecione seu e-mail
7. Clique em **"Salvar"**

### Passo 6: Adicionar domínio autorizado
1. Na mesma tela de Authentication, clique na aba **"Settings"**
2. Procure a seção **"Domínios autorizados"**
3. Clique em **"Adicionar domínio"**
4. Digite: `SEU-USUARIO.github.io` (substitua pelo seu usuário do GitHub)
5. Clique em **"Adicionar"**

---

## PARTE 4 — Criar o Banco de Dados

### Passo 7: Criar o Realtime Database
1. No menu lateral, clique em **"Realtime Database"**
2. Clique no botão **"Criar banco de dados"**
3. Na tela de localização, selecione **"Estados Unidos (us-central1)"** (opção padrão)
4. Clique em **"Próxima etapa"**
5. Na tela de regras de segurança, selecione **"Iniciar no modo de teste"**
6. Clique em **"Ativar"**
7. O banco vai criar e mostrar a URL — ela termina em `.firebaseio.com`

### Passo 8: Configurar as Regras de Segurança
1. No painel do Realtime Database, clique na aba **"Regras"**
2. Apague todo o conteúdo que está lá
3. Cole exatamente isto:

```json
{
  "rules": {
    "appConfig": {
      ".read": "auth != null",
      ".write": "auth != null && root.child('users').child(auth.uid).child('isSuperUser').val() == true"
    },
    "users": {
      ".read": "auth != null",
      "$uid": {
        ".write": "auth != null && (auth.uid == $uid || root.child('users').child(auth.uid).child('isSuperUser').val() == true)"
      }
    },
    "checklists": {
      ".read": "auth != null",
      ".write": "auth != null && root.child('users').child(auth.uid).child('approved').val() == true"
    },
    "presence": {
      ".read": "auth != null",
      "$checklistId": {
        "$uid": {
          ".write": "auth != null && auth.uid == $uid"
        }
      }
    }
  }
}
```

4. Clique em **"Publicar"** (botão azul no topo direito)

---

## PARTE 5 — Publicar no GitHub Pages

### Passo 9: Subir os arquivos para o GitHub
1. Acesse **github.com** e faça login
2. Crie um repositório chamado `ccb-pia-compliance` (público)
3. Faça upload dos arquivos na seguinte estrutura:
   ```
   ccb-pia-compliance/
   ├── index.html
   ├── config.js          ← com as credenciais Firebase preenchidas
   ├── FIREBASE_SETUP.md
   ├── README.md
   └── assets/
       └── ccb_church.png  ← a imagem da CCB
   ```
4. Para criar a pasta `assets`: clique em "Add file" → "Create new file"
   - No campo do nome, digite: `assets/ccb_church.png`
   - Faça upload da imagem

### Passo 10: Ativar o GitHub Pages
1. No repositório, clique em **"Settings"** (engrenagem)
2. No menu lateral, clique em **"Pages"**
3. Em "Branch", selecione **"main"** e a pasta **(root)**
4. Clique em **"Save"**
5. Aguarde 2-3 minutos
6. O link aparece: `https://SEU-USUARIO.github.io/ccb-pia-compliance`

---

## PARTE 6 — Primeiro Acesso

### Passo 11: Configurar o superusuário
1. Acesse o link do site
2. Clique em **"Entrar com Google"**
3. Faça login com sua conta Google
4. **Você é automaticamente o superusuário** (primeiro usuário = superusuário)
5. Preencha seu perfil (nome, cargo, funções)
6. Clique em ⚙ **Admin** para cadastrar as localidades:
   - Adicione a RRM (ex.: RRM-Coxim.MS)
   - Adicione as RMAs (ex.: RMA-Coxim.MS, RMA-Costa Rica.MS)
   - Adicione os pontos de atendimento de cada RMA

### Passo 12: Convidar outros usuários
1. Compartilhe o link do site com os outros Diáconos
2. Eles fazem login com Google → cadastro automático → aguardam aprovação
3. No Painel Admin (⚙), clique **"Aprovar"** para cada novo usuário

---

## ❓ Problemas comuns

**"Erro ao entrar" no login Google**
→ Verifique se adicionou `SEU-USUARIO.github.io` nos domínios autorizados (Passo 6)

**Banco de dados não encontrado**
→ Confirme que o campo `databaseURL` no `config.js` está preenchido e no formato correto

**Usuário aprovado mas não consegue entrar**
→ Peça para o usuário sair (botão "Sair") e entrar novamente

**Imagem da CCB não aparece**
→ Confirme que o arquivo `assets/ccb_church.png` foi carregado no GitHub

---

*V.2.0 — Created by Dr. Taynã Naves in June 2026*
