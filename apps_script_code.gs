// ============================================================
//  CCB PIA Compliance — Proxy IA (Google Apps Script)
//  Cole este código num novo projeto em script.google.com
//  Veja APPS_SCRIPT_SETUP.md para o passo a passo completo.
// ============================================================

// ── CONFIGURAÇÃO (faça isso UMA VEZ via Configurações do projeto) ──
// Em "Propriedades do script", adicione:
//   GEMINI_API_KEY   → sua chave da API do Gemini (console.cloud.google.com)
//   MANUALS_FILE_ID  → ID do arquivo .md com todos os manuais no Drive (opcional)
// Nunca coloque a chave diretamente no código!

const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_BASE  = "https://generativelanguage.googleapis.com/v1beta";
const CACHE_TTL_DAYS = 28;   // dias de validade do cache Gemini

// ── ENTRY POINT (recebe chamadas do browser via GET) ──────────
function doGet(e) {
  // CORS: Apps Script permite GET de qualquer origem automaticamente
  try {
    if (!e.parameter.d) {
      return jsonResp({ success:false, error:"Parâmetro 'd' ausente." });
    }
    const payload = JSON.parse(decodeURIComponent(atob(e.parameter.d)));
    const result  = analyzeItems(payload);
    return jsonResp({ success:true, analysis: result });
  } catch(err) {
    Logger.log("Erro doGet: " + err.message);
    return jsonResp({ success:false, error: err.message });
  }
}

// ── ANÁLISE PRINCIPAL ─────────────────────────────────────────
function analyzeItems(payload) {
  const { items, month, pointName } = payload;
  if (!items || !items.length) return { items:[] };

  const props   = PropertiesService.getScriptProperties();
  const apiKey  = props.getProperty("GEMINI_API_KEY");
  if (!apiKey) throw new Error("GEMINI_API_KEY não configurada nas Propriedades do script.");

  const cacheId  = getOrCreateCache(props, apiKey);
  const sysPrmt  = buildSystemPrompt(!!cacheId);
  const userPrmt = buildUserPrompt(items, month, pointName);

  const reqBody = {
    system_instruction: { parts:[{ text: sysPrmt }] },
    contents: [{ role:"user", parts:[{ text: userPrmt }] }],
    generationConfig: { temperature:0.15, maxOutputTokens:2500, responseMimeType:"application/json" }
  };
  if (cacheId) reqBody.cachedContent = cacheId;

  const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const resp = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(reqBody),
    muteHttpExceptions: true
  });

  const code = resp.getResponseCode();
  const body = JSON.parse(resp.getContentText());
  if (code !== 200) throw new Error("Gemini retornou " + code + ": " + JSON.stringify(body.error||{}));

  const raw = body.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  try {
    return JSON.parse(raw);
  } catch(_) {
    // tenta extrair JSON do meio de texto
    const m = raw.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : { items:[], nota:"Resposta inesperada da IA." };
  }
}

// ── CONTEXT CACHING ───────────────────────────────────────────
function getOrCreateCache(props, apiKey) {
  const cacheId  = props.getProperty("GEMINI_CACHE_ID");
  const cacheExp = props.getProperty("GEMINI_CACHE_EXP");
  if (cacheId && cacheExp && new Date(cacheExp) > new Date()) {
    Logger.log("Usando cache existente: " + cacheId);
    return cacheId;
  }
  return createCache(props, apiKey);
}

function createCache(props, apiKey) {
  const fileId = props.getProperty("MANUALS_FILE_ID");
  if (!fileId) {
    Logger.log("MANUALS_FILE_ID não configurado — sem cache.");
    return null;
  }
  try {
    const file    = DriveApp.getFileById(fileId);
    const content = file.getBlob().getDataAsString("UTF-8");
    const ttl     = String(CACHE_TTL_DAYS * 86400) + "s";
    const body    = {
      model: "models/" + GEMINI_MODEL,
      contents: [{ role:"user", parts:[{ text: content }] }],
      ttl: ttl
    };
    const resp = UrlFetchApp.fetch(`${GEMINI_BASE}/cachedContents?key=${apiKey}`, {
      method:"post", contentType:"application/json",
      payload:JSON.stringify(body), muteHttpExceptions:true
    });
    const result = JSON.parse(resp.getContentText());
    if (result.name) {
      const exp = new Date(Date.now() + (CACHE_TTL_DAYS - 1)*86400*1000).toISOString();
      props.setProperty("GEMINI_CACHE_ID",  result.name);
      props.setProperty("GEMINI_CACHE_EXP", exp);
      Logger.log("Cache criado: " + result.name + " (expira " + exp + ")");
      return result.name;
    }
    Logger.log("Falha ao criar cache: " + JSON.stringify(result));
  } catch(e) {
    Logger.log("Erro ao criar cache: " + e.message);
  }
  return null;
}

// ── PROMPTS ───────────────────────────────────────────────────
function buildSystemPrompt(hasCache) {
  const base = `Você é um especialista em conformidade administrativa da Obra da Piedade da Congregação Cristã no Brasil.
Responda SEMPRE em JSON válido com este formato exato:
{
  "items": [
    {
      "itemNum": "X.X",
      "obrigatoriedade": "DOCUMENTO, Seção X, p.XX",
      "trechoExato": "trecho literal do manual entre aspas, ou vazio se não encontrado",
      "motivo": "por que este item é obrigatório",
      "comoResolver": "passos concretos para resolver a pendência",
      "prazo": "prazo ou urgência"
    }
  ],
  "observacaoGeral": "comentário geral opcional"
}`;

  if (hasCache) {
    return base + "\n\nUse EXCLUSIVAMENTE o documento de referência fornecido no contexto. Cite com precisão: documento, seção e página.";
  }
  return base + "\n\nATENÇÃO: O arquivo de manuais ainda não foi configurado. Use conhecimento geral sobre boas práticas administrativas eclesiásticas. Indique 'obrigatoriedade': '(manuais não configurados — consulte o administrador)' e 'trechoExato': '' para todos os itens.";
}

function buildUserPrompt(items, month, pointName) {
  let p = `Analise os seguintes itens PENDENTES do Checklist de Compliance:\n`;
  p += `Mês: ${month || "não informado"} | Ponto: ${pointName || "não informado"}\n\n`;
  items.forEach(it => {
    p += `• Item ${it.num}: ${it.acao}\n`;
    if (it.obs && it.obs !== "—") p += `  Observação: ${it.obs}\n`;
  });
  p += `\nForneça análise completa para cada item no formato JSON especificado.`;
  return p;
}

// ── ADMIN: testar a integração manualmente ────────────────────
// Execute esta função no editor para verificar se tudo está OK
function testarIntegracao() {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty("GEMINI_API_KEY");
  Logger.log("API Key configurada: " + (apiKey ? "SIM (" + apiKey.slice(0,10) + "...)" : "NÃO"));
  Logger.log("Manuals File ID: " + (props.getProperty("MANUALS_FILE_ID") || "não configurado"));
  Logger.log("Cache ID: " + (props.getProperty("GEMINI_CACHE_ID") || "sem cache"));

  const testPayload = {
    items:[{ num:"2.3", acao:"Carimbar e assinar todos os Documentos Fiscais pagos pelo banco", obs:"" }],
    month:"2026-06", pointName:"PIA-Coxim"
  };
  try {
    const r = analyzeItems(testPayload);
    Logger.log("Resposta IA: " + JSON.stringify(r, null, 2));
  } catch(e) {
    Logger.log("ERRO: " + e.message);
  }
}

// ── ADMIN: forçar recriação do cache ─────────────────────────
function forcarRecriacao() {
  const props = PropertiesService.getScriptProperties();
  props.deleteProperty("GEMINI_CACHE_ID");
  props.deleteProperty("GEMINI_CACHE_EXP");
  const apiKey = props.getProperty("GEMINI_API_KEY");
  if (apiKey) {
    const id = createCache(props, apiKey);
    Logger.log(id ? "Cache recriado: " + id : "Falha — verifique MANUALS_FILE_ID.");
  }
}

// ── UTILS ─────────────────────────────────────────────────────
function jsonResp(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
