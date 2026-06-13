// ============================================================
//  CCB PIA COMPLIANCE — CONFIG V2.0
//  Edite APENAS este arquivo. Nunca edite o index.html.
// ============================================================
window.APP_CONFIG = {

  APP_TITLE:   "Checklist Mensal de Compliance",
  APP_ORG:     "Congregação Cristã no Brasil",
  APP_VERSION: "2.0",
  APP_FOOTER:  "Secretaria da Piedade | Obra da Piedade",

  // ----------------------------------------------------------
  // FIREBASE — cole aqui os dados do seu projeto Firebase.
  // Veja o FIREBASE_SETUP.md para o passo a passo completo.
  // ATENÇÃO: é seguro ter esses dados num repo público.
  // A segurança real vem das Regras do Firebase (Security Rules).
  // ----------------------------------------------------------
  FIREBASE: {
    apiKey:            "AIzaSyAQqnWyijR4L1awcg4CMFTTcB6K29ycQ2w",
    authDomain:        "ccb-pia-compliance.firebaseapp.com",
    databaseURL:       "https://ccb-pia-compliance-default-rtdb.firebaseio.com",   // ex.: https://SEU-PROJETO-default-rtdb.firebaseio.com
    projectId:         "ccb-pia-compliance",
    storageBucket:     "ccb-pia-compliance.firebasestorage.app",
    messagingSenderId: "175284938289",
    appId:             "1:175284938289:web:67a4d8f447c86cb86a9710"
  },

  // ----------------------------------------------------------
  // RESTRIÇÃO DE DOMÍNIO DE E-MAIL (opcional)
  // Deixe [] para aceitar qualquer conta Google.
  // Exemplo: ["congregacao.org.br"] aceita só e-mails CCB.
  // ----------------------------------------------------------
  ALLOWED_DOMAINS: [],

  // ----------------------------------------------------------
  // GOOGLE APPS SCRIPT — URL do proxy para IA (Fase 4)
  // Deixe "" por enquanto; será preenchido na Fase 4.
  // ----------------------------------------------------------
  AI_PROXY_URL: "",

  // ----------------------------------------------------------
  // TAMANHO PADRÃO DA IMAGEM DE LOGIN (% do padrão = 220px)
  // O superusuário pode alterar isso pelo painel admin.
  // ----------------------------------------------------------
  LOGIN_IMAGE_SIZE_PCT: 100,
};
