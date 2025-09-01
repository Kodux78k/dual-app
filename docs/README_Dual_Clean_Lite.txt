
Dual Clean — Lite Path (KOBLLUX)

Arquivos:
- Dual_App_io100_0_base_1_R__CLEAN_LITE_path.html

Como ativar/desativar o modo Lite:
- (Padrão) Lite ligado: localStorage.setItem('perf.mode','lite')
- Para desativar e voltar ao normal: localStorage.setItem('perf.mode','normal'); location.reload();

Recursos do Lite Path:
- particlesJS: no-op seguro (evita custo inicial)
- initKoblluxPlayer / initVisualizer / initWaveform / initSpectrogram / bootAudioEngine: lazy na primeira chamada
- Logging reduzido (console.debug/trace silenciosos)
- API: __dual_set_perf('lite'|'normal')

Objetivo:
- Rumo aos 14 KB no core efetivo, sem alterar o visual e mantendo o núcleo 1:1.
