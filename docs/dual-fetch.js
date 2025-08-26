/* dual-fetch.js :: DUAL=discernimento (rede única) */
(function(){
  const DEFAULTS = {
    endpoint: 'https://api.openrouter.ai/v1/chat/completions',
    model: 'openai/gpt-4o-mini',
    temperature: 0.6,
    max_tokens: 1200,
    headers: {}
  };
  let LAST_CTRL = null;

  function normalizeMessages(systemText, userText){
    const msgs = [];
    if (systemText) msgs.push({ role: 'system', content: systemText });
    msgs.push({ role: 'user', content: userText });
    return msgs;
  }

  async function call({system, user, endpoint, model, temperature, max_tokens, headers}){
    // Cancela chamada anterior em voo (evita estouro de render)
    if (LAST_CTRL) LAST_CTRL.abort();
    LAST_CTRL = new AbortController();

    const url = endpoint || DEFAULTS.endpoint;
    const body = {
      model: model || DEFAULTS.model,
      messages: normalizeMessages(system, user),
      temperature: temperature ?? DEFAULTS.temperature,
      max_tokens: max_tokens ?? DEFAULTS.max_tokens
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, DEFAULTS.headers, headers||{}),
      body: JSON.stringify(body),
      signal: LAST_CTRL.signal
    });
    if (!res.ok){
      const t = await res.text().catch(()=>'');
      throw new Error(`DualFetchError ${res.status}: ${t}`);
    }
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content || '';
    return { raw: data, text: content };
  }

  window.DualFetch = {
    config: Object.assign({}, DEFAULTS),
    set(k, v){ this.config[k] = v; return this; },
    async call(systemText, userText, extra={}){
      const cfg = Object.assign({}, this.config, extra);
      return call({ system: systemText, user: userText, ...cfg });
    },
    abort(){ if (LAST_CTRL) LAST_CTRL.abort(); }
  };
})();