## Pacote Dual Response Style

Este pacote contém uma implementação limpa do **contêiner de respostas** com a estética original do Dual_App.  A estrutura mantém o tema dark/light/medium/vibe, o contêiner de páginas com navegação, os botões de controle (copiar, colar, voz, login, kitty, upload, gerenciadores de chave e patches), a barra de símbolos e o painel de entrada.

### Conteúdo

- **dual_base_beautiful.css** – Folha de estilos consolidada que reproduz os gradientes, bordas, animações e temas do Dual original, sem duplicações.
- **Dual_App_io100_0_response_style.html** – Versão linkada do aplicativo, que carrega o CSS através de `<link rel="stylesheet" href="dual_base_beautiful.css">`.
- **Dual_App_io100_0_response_style_inlined.html** – Versão com o CSS incorporado diretamente no `<style>`, facilitando o uso isolado sem dependências externas.
  
Além disso, o pacote inclui as seguintes novidades em relação às versões anteriores:
  - **Botão de ditar voz ao lado do envio**: Um pequeno botão circular ao lado da seta de envio permite transcrever sua fala diretamente no campo de texto e enviar.
  - **Painel de Chaves & Treinamentos ampliado**: Agora você pode salvar, além da chave de API, o modelo e o papel (role), também um **Role System** para fins de treinamento. Esses valores são armazenados em `localStorage` sob a chave `dual.clean`.
  - **Traço de reset de página**: agora o reset é um risquinho vertical com gradiente (#0f0f0f → #00ffff) à direita do botão de tema. Ao ser clicado, ele recarrega a página, ajudando a limpar estados.
  - **Rodapé interativo**: A frase “Do seu jeito. Sempre único. Sempre seu.” funciona como botão: clicando nela você a oculta ou exibe novamente. O estado é persistido em `localStorage` na chave `dual.showFooter`.
  - **Fundo escuro com transparência**: O tema padrão utiliza um gradiente escuro semi‑transparente em vez de preto sólido, aproximando‑se do visual original.

  - **Controles extras colapsáveis**: apenas os três últimos botões (Patches, Player e Layout) são agrupados em uma pequena lista que expande para baixo quando você clica no botão “⋮”. Isso evita que a barra de controles ultrapasse os limites horizontais e mantém os controles principais sempre visíveis.


  - **Personalização de controles**: dentro do menu de controles extras há um ícone "+". Ao clicá-lo abre-se um painel de gerenciamento que permite ocultar ou mostrar os botões padrão, excluir controles personalizados existentes e criar novos botões fornecendo um rótulo e um trecho de código JavaScript a ser executado quando ele é pressionado. As preferências de visibilidade e os controles personalizados são salvos em `localStorage.dual.controlsVisibility` e `localStorage.dual.customControls`, permanecendo válidas após recarregar a página.
  - **Segmentação de blocos de resposta**: internamente a função de renderização considera as fases do fluxo Dual — *Recompensa Inicial*, *Curiosidade*, *Exploração* e *Antecipação Vibracional* — para organizar cada parágrafo. Os nomes não são mais renderizados na interface, mas essa estrutura facilita customizações futuras.

### Instruções de uso

1. Descompacte o pacote e copie **dual_base_beautiful.css** e os arquivos HTML para a pasta desejada do seu projeto (por exemplo, `public/` ou `variants/`).
2. Para usar a versão linkada, abra **Dual_App_io100_0_response_style.html** em um navegador. Esta versão espera que `dual_base_beautiful.css` esteja no mesmo diretório ou em um caminho acessível.
3. Para usar a versão inlined, abra **Dual_App_io100_0_response_style_inlined.html**. Não é necessário nenhum arquivo CSS externo, pois todos os estilos estão incorporados.
4. Os botões de controle referenciam ícones via `<object>` apontando para `assets/icons/...`. Certifique‑se de que esses arquivos existam no caminho relativo `assets/icons/` do seu projeto para que os ícones sejam exibidos corretamente. Se não tiver os ícones, substitua a tag `<object>` por imagens ou símbolos de sua preferência.
5. O script JavaScript incluído fornece funcionalidades básicas: alternância de tema, inserção de símbolos, reconhecimento de voz (se suportado), cópia/cola de mensagens, envio de mensagem simulada e armazenamento de configuração de chave/modelo/papel em `localStorage`.
  
   Nesta versão foram incluídas funções adicionais:
   - **Armazenamento de Role System**: O painel “Chaves & Treinamentos” possui um campo para instruções de sistema. Ao salvar, o valor é persistido em `localStorage.dual.clean.roleSystem` e retornado pela função simulada `callAI`.
   - **Eventos de ocultar/exibir rodapé e reset**: clique no rodapé para alternar sua visibilidade; clique no traço abaixo do botão de tema para recarregar a página.

### Novidades do painel “joguinho” e player

- **Painel de Layout & Estilo**: um novo botão 🎮 na barra de controle abre um painel lúdico para personalizar o aplicativo. Lá você pode alternar entre temas (padrão, claro, médio, vibe), estilos visuais (glass, paper, neon), tamanhos de fonte e espaçamento entre blocos. O painel também oferece botões de reset e fechar. Tudo é aplicado de forma dinâmica através de classes CSS e pode ser combinado com seus plugins.

- **Player de áudio KOBLLUX**: o botão de fones de ouvido 🎧 agora abre um painel de áudio no canto superior esquerdo. Clique no círculo superior para expandir/contrair os controles. Ele permite:
  - Selecionar uma trilha principal (como *Sono Profundo*, *Manifestação*, *Ativação Pineal*, etc.).
  - Selecionar uma faixa binaural complementar ou desativá‑la.
  - Ajustar independentemente o volume da trilha principal e da binaural.
  - Tocar/pausar ambas as faixas de forma sincronizada.

  Para que as trilhas sejam reproduzidas, coloque os arquivos nas pastas `assets/sounds/trilhas/` (formato `.mp3`) e `assets/sounds/binaural/` (formato `.wav`) com os mesmos nomes usados nas opções do seletor. Se as pastas estiverem vazias, o player abrirá sem reproduzir áudio, mas a interface permanece funcional.

Esta base serve como ponto de partida para evoluir o aplicativo, preservando o visual original enquanto simplifica a lógica de renderização. Personalize as funções de **callAI**, **renderResponse**, o player ou os painéis de gerenciamento conforme necessário para integrar seu próprio back‑end ou patch manager.