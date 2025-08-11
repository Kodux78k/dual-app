# KOBLLUX Symbols Patch (Translit on-the-fly)

## Como usar
1) Aplique a classe `.kobllux-text` nos blocos de **resposta/ativação** que devem aparecer com símbolos.  
2) Inclua `kobllux-symbols.patch.js` antes de `</body>` (ou cole o código).  
3) O patch observa o DOM e translitera automaticamente o conteúdo de `.kobllux-text`.

## API
- `KoblluxSymbols.enable()` / `disable()` – liga/desliga e restaura texto original.
- `KoblluxSymbols.processAll(root?)` – força uma passada manual.
- `KoblluxSymbols.translit(text)` – converte uma string (para testes ou pré-processamento).

> Dica: evite aplicar em `<input>`/`<textarea>`.
