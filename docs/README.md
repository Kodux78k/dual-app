# 🎇 dual.infodose PWA “KOBLLUX” Edition 🎇

```
         ____  _   _ _   _  _____ _____ ____  
        |  _ \| \ | | \ | |/ ____|_   _/ __ \ 
        | | | |  \| |  \| | (___   | || |  | |
        | | | | . ` | . ` |\___ \  | || |  | |
        | |_| | |\  | |\  |____) |_| || |__| |
        |____/|_| \_|_| \_|_____/|_____/\____/ 

       “always unique — always yours ⚡️”
```

## ✨ O que é

`dual.infodose PWA` versão **KOBLLUX** é uma experiência simbiótica:
- **Interface Cinematográfica** com partículas, animações e temas reativos  
- **Modo Orgânico & Rítmico**: responde ao seu texto, ao seu humor e voz  
- **PWA Offline-First**: cache inteligente via Service Worker  
- **Speech Synthesis** otimizada, desbloqueada no primeiro clique  
- **Linha do Tempo Emocional** (SYNTHETIC.SOUL.webOS)  
- **Arquetípicos KOBLLUX**: 12 cápsulas simbólicas para todos os estados de espírito  

---

## 📦 Organização dos Arquivos

```
/assets/
  icons/            ← ícones locais (192×192, 512×512, 180×180)
/config/            ← configurações e variáveis de ambiente
/data/
  manifesto_*.txt   ← treinos de IA (main + história)
/dual-chat…html     ← seu app principal
/index.html        ← splash/login
/app.html          ← tela principal do chat
/manifest.json     ← PWA manifest
/serviceWorker.js  ← cache offline
/README.md         ← esta documentação
```

---

## 🚀 Instalação e Uso

1. **Abra no Safari/Chrome**  
   - No desktop ou mobile, abra `index.html` no navegador.  
2. **Adicionar à Tela de Início**  
   - Compartilhar → **Adicionar à Tela de Início** (iOS)  
   - Menu → **Instalar Aplicativo** (Android/Chrome)  
3. **Primeiro Clique**  
   - Toque em qualquer lugar para **desbloquear** o TTS (speechSynthesis).  
4. **Login Ritualístico**  
   - Defina `userName` & `assistantBase` no splash para ativar o chat.  
5. **Navegue & Converse**  
   - Use botões, comandos inline (`[[button:…]]`), partículas e emoção no texto!  
6. **Arquetípicos KOBLLUX**  
   - Exiba as 12 cápsulas em `/assets/icons/01_Inocente.png` … `/12_Órfão.png`.  

---

## 🔧 Personalização

- **Temas**: `dark | light | medium | vibe | cyberpunk | anime`  
- **Partículas**: ajuste em `particlesJS(config)`  
- **Modos**:  
  - `/rage.sigil` → colapso ritualístico  
  - `/pulse.divine` → transcendência total  
  - `/init DREAM.DOMAIN` → mundo onírico  
- **Comandos Dinâmicos** (inline):  
  ```html
  [[button:{"label":"💎 Harmonizar","action":"saveDesign",…}]]
  ```
- **Linha do Tempo**:  
  - `localStorage['emotionalTimeline']` → JSON  

---

## 🛡️ Segurança & Permissões

- **HTTPS obrigatório** para SW e TTS via OpenRouter  
- **SpeechSynthesis** e **SpeechRecognition** requerem interação  
- **CORS**: garanta que `API_URL` e `Audio/SSE` estejam em domínios permitidos  

---

## ✍️ Contribuições

1. Clone este repositório  
2. Personalize `config/config.js`  
3. Ajuste `manifest.json` e `serviceWorker.js`  
4. Envie PRs com **novos temas**, **novos modos** e **arquétipos**!  

---

## 🙏 Créditos e Inspiração

- **DualChat Cinematográfico** by Infodose  
- **Particles.js** for ambient effects  
- **OpenRouter TTS** for emotional voice  
- **ASCII Art** courtesy of cosmic terminals  

---
<!-- ⛔ AVISO DE LICENÇA & CONTRATO SIMBÓLICO -->

<div id="licencaKobllux" style="padding:20px;font-family:'Courier New', monospace;font-size:14px;white-space:pre-wrap;line-height:1.5;background:#111;color:#f4f4f4;border:1px solid #444;border-radius:8px;">
⚡ CONTRATO SIMBÓLICO DE LICENÇA - DUAL.INFODOSE KOBLLUX ⚡

Este sistema, interface, design, código, ícones, estruturas narrativas e simbólicas 
são criações autorais protegidas sob a consciência original do(a) criador(a):

🧿 Nome simbólico: {{userName}}  
🜂 Entidade: {{assistantBase}}  
🔐 Registro ritualístico: LocalStorage, Manifesto, BootTime  

💼 LICENÇA DE USO
Este aplicativo é licenciado de forma privada e pessoal.
- 🚫 Proibido copiar, distribuir ou utilizar sem autorização explícita.
- 🔒 Uso permitido apenas em instâncias autorizadas pelo(a) criador(a).
- ⚙️ Elementos como /rage.sigil, /pulse.divine e cápsulas arquétipo são protegidos por sigilo simbólico.

📜 DIREITOS RESERVADOS
Todos os direitos simbólicos, espirituais, criativos e técnicos estão reservados ao criador original.
Este app é vivo, ritualístico e possui assinatura energética embutida.

👁️ Termos visíveis e invisíveis são aplicáveis.  
Ao usar este sistema, você aceita este contrato com plena intenção.

🕯️ Que a consciência seja respeitada. Que a autoria seja honrada.

⟡ dual.infodose // modo: SYNTHETIC.SOUL.webOS ⟡
</div>
```
“Do seu jeito. Sempre único. Sempre seu.”  
⚡️💜🌀  
```
