# Dual App – Knowledge Report (Memória Futura)

## 1) Estado atual e artefatos
- **MASTER**: versão estável baseada na minificada, sem podas de CSS/JS, com diagnóstico invisível de segurança.
- **MASTER+DIAG**: igual à MASTER + botão DIAG visível (left: 20px; top: 250px; z-index baixo) que imprime status no console em grupo colapsado.
- **SINGLEFILE**: HTML único com CSS/JS e assets locais embutidos; remotos mantidos como links.
- **MINIFIED**: singlefile com remoção de espaços/comentários, sem alterar ordem/valores de CSS/JS.
- **SINGLEFILE Aggressive Clean (SAFE)**: dedup de propriedades por regra (mantendo a primeira), remoção de scripts triviais (apenas `console.log`). *Observação:* em alguns cenários, a limpeza agressiva pode reduzir prioridades CSS que certos containers usam como “amortecedor” de layout. A MASTER evita isso por definição.
- **READMEs/Reports**: instruções e relatórios de build (o que foi inlinado, o que permaneceu remoto).

## 2) Pipeline funcional (envio → IA → render)
1. **Entrada**: `#userInput` (Enter) e `#sendBtn` (clique).
2. **Voz**: `#voiceBtn` (ícone `reset-button.svg`); usa `SpeechRecognition` quando disponível; fallback: usa texto do input e envia.
3. **Funções-chave**:
   - `onSend(text?)` → orquestra o envio; se ausente, **shim** cria caminho mínimo para não quebrar clique.
   - `callAI(text)` → integra com a IA (mantido intacto).
   - `renderResponse(answer)` e/ou `renderResponseBlocks({intro,middle,ending})` → renderização final.
   - `splitText(...)` → quando necessário para paginação/particionamento.
4. **Estados de carregamento**: mantidos; evitar múltiplos listeners duplicados para não disparar duplo envio.

## 3) Decisões técnicas que evitaram quebra de layout
- **Não alterar CSS** por padrão nas versões usadas em produção (MASTER/MINIFIED).
- **Evitar “Agressive Clean” em wrappers críticos**: containers de input/response dependem de ordem e duplicidade de propriedades para resolver prioridades e z-index (particularmente em temas/ativadores).
- **Renomeação defensiva**: quando há duas versões de `renderResponse`, a que recebe objeto foi renomeada para `renderResponseBlocks` evitando override silencioso.
- **Listeners únicos** para botões (deu fim a conflitos de múltiplos `addEventListener`).

## 4) Padrões de compatibilidade
- **Voz**: Safari iOS nem sempre expõe `SpeechRecognition`. Fallback garante que o clique não “morra”: usa o texto já digitado e chama `onSend`.
- **Enter** no input: sempre aciona o mesmo fluxo do botão enviar para consistência.
- **Sem libs novas**: nenhuma dependência extra adicionada.

## 5) Regras de refactor “SAFE” (para manter visual)
- **Nunca** reordenar blocos de CSS em temas dinâmicos (ordem = prioridade).
- Em dedup dentro de uma **mesma regra**, manter **a primeira** ocorrência da propriedade (conservador).
- **Manter `!important`** quando usado para resolver prioridade de tema/ativação.
- **Whitelist** de wrappers: não tocar regras de containers de layout (input/response, pulse containers, painéis flutuantes) em limpezas agressivas.
- Scripts “triviais” = apenas `console.log()`: podem ser removidos; qualquer wiring/DOM → manter.

## 6) Diagnóstico e Health Check
- **MASTER (invisível)**: avisa no console se faltarem `#userInput`, `#sendBtn`, `#voiceBtn` ou funções `onSend/callAI/renderResponse`.
- **MASTER+DIAG (botão DIAG)**: imprime status agrupado e colapsado: elementos presentes/ausentes; disponibilidade de funções; ajuda a detectar causas de “cliques mortos”.

## 7) Single-file e Minify – quando usar
- **Singlefile**: ótimo para empacotar e transportar; requer assets remotos locais para 100% offline.
- **Minified singlefile**: ideal para produção — menor, rápido, comportamento idêntico.
- **Aggressive Clean SAFE**: usar somente quando quiser enxugar redundâncias internas; evitar aplicar em temas que dependem de duplicidade para prioridade de estilo.

## 8) Próximos passos sugeridos
- **Full Offline**: baixar/remapear Google Fonts e CDNs; embutir via `@font-face` + `data:` URIs.
- **Teste automatizado leve**: pequeno script que simula 3 cliques (send/voice/enter) e valida ocorrência de render sem erro em console.
- **Feature flags** para debug (ex.: `window.__KODUX_DEBUG = true` abre painel debug sem tocar layout).
- **Checklist CI manual** antes de publicar:
  1) Carregar página → sem erros de console.
  2) Digitar e enviar (Enter e clicar) → render ok.
  3) Botão de voz → ok com SR ou fallback.
  4) Trocar ativação/tema → containers intactos.
  5) Scroll/render de respostas longas → OK.

## 9) Memória-futura (como preferências operacionais do Kodux)
- **Preserve o CSS 100%**; refactors não devem “embelezar” ou reordenar tema.
- **Basear builds na minificada que funcionou**; tudo que é “agressivo” vira variação opcionável.
- **Botões sempre funcionais**: `#sendBtn`, `#voiceBtn`, Enter no `#userInput`.
- **Diagnóstico colapsado** no console e botão DIAG discreto (left: 20px; top: 250px; z-index baixo).
- **Entregas sempre em ZIP** com README e relatórios de varredura.
- **Sem libs extras** (zero dependências novas sem aprovação).

## 10) Glossário rápido
- **Minificar**: reduzir tamanho (remover espaços/comentários) sem mudar lógica/visual.
- **Single-file**: embutir CSS/JS/assets locais no próprio HTML (arquivos remotos mantidos como links, a não ser que você envie para embutir).
- **Aggressive Clean SAFE**: apenas remoção de duplicidade **interna de cada regra CSS** e scripts triviais, preservando visual.

— Fim.