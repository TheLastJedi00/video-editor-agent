# SFX_RULES — efeitos sonoros

Todo elemento gráfico que **entra em tela** (animação, gráfico, infográfico, componente, cartão,
chip, item de lista, texto digitado, gancho, cartela) leva um efeito sonoro, nos dois modelos
(Aula e Reels). O som reforça o movimento sem cobrir a voz.

## Biblioteca

Os arquivos ficam em `remotion/public/sfx/`, em WAV mono 48 kHz com pico normalizado em
−3 dBFS. No Remotion, use os componentes de `remotion/src/Sfx.tsx` (`<Sfx name="..." at={s} />`
e `<TypeSfx />`). Fora do Remotion, mixe os mesmos arquivos com `ffmpeg-skill`.

| Categoria | Nome (`SFX`) | Arquivo | Uso típico |
|---|---|---|---|
| Whoosh | `whoosh`, `whip` | `whoosh/whoosh.wav`, `whoosh/whip.wav` | entrada rápida de painel, troca de cena, whip pan (Reels) |
| | `whooshSoft` | `whoosh/soft.wav` | entrada de infográfico em Aula |
| | `whooshOut` | `whoosh/out.wav` | saída de elemento (opcional, sempre mais baixo) |
| | `pageTurn` | `whoosh/page-turn.wav` | troca de slide/cartão, passo seguinte |
| Digitação | `key1`…`key5`, `typeReturn` | `type/key-*.wav`, `type/return.wav` | efeito "digitando": termos, código, títulos |
| Pop | `pop1`, `pop2`, `pop3`, `pluck` | `pop/*.wav` | itens de lista, chips, ícones, cards pequenos |
| Interface | `click`, `switch`, `select`, `open`, `close` | `ui/*.wav` | cursor, botões, abrir/fechar painel, destacar linha de código |
| | `confirm`, `error` | `ui/confirm.wav`, `ui/error.wav` | certo × errado, check, comparação |
| | `tick`, `counterTick` | `ui/tick.wav`, `ui/counter-tick.wav` | marcadores de linha do tempo, contador de número |
| | `scroll`, `zap` | `ui/scroll.wav`, `ui/zap.wav` | rolagem de lista longa, glitch/transição digital (Reels) |
| Acento | `ding`, `glass` | `accent/ding.wav`, `accent/glass.wav` | resposta, conclusão, número final revelado |
| | `shutter` | `accent/shutter.wav` | screenshot, "foto" de um resultado |
| | `riser` | `accent/riser.wav` | antecipação antes de uma revelação (1,4 s, termina no impacto) |
| | `powerUp`, `twoTone` | `accent/*.wav` | conquista, nível, toque de jogo (combina com Liga Dev) |
| Impacto | `boom` | `impact/boom.wav` | gancho de Reels, número grande, frase de efeito |
| | `punch`, `soft`, `thud` | `impact/*.wav` | texto cinético batendo na tela, punch-in |

Origem: Kenney (CC0, licenças em `remotion/public/sfx/licenses/`), remotion.media, e
sintetizados com FFmpeg (`whooshSoft`, `whooshOut`, `riser`, `boom`, `counterTick`). Para
refazer ou ampliar a biblioteca, edite e rode `python remotion/scripts/build_sfx.py`. Mais sons
CC0: <https://github.com/kapishdima/soundcn/tree/main/assets>. Não use sons de meme nem
material com direitos sem pedido do usuário.

## Quando cada som entra

| Elemento entrando | Aula | Reels |
|---|---|---|
| Infográfico / painel / cartão grande | `whooshSoft` | `whoosh` ou `whip` |
| Item de lista, chip, ícone, passo | `pop1`–`pop3` (alterne) | `pop1`–`pop3` (alterne) |
| Texto ou código digitado | `TypeSfx` (1 tecla por caractere) | `TypeSfx` |
| Caixa e seta de diagrama se desenhando | `tick` em cada caixa | `pop` em cada caixa, `whoosh` na seta longa |
| Número grande / contador | `counterTick` durante a contagem + `ding` no valor final | `riser` antes + `boom` ou `ding` no valor final |
| Comparação A × B | `pageTurn` na segunda coluna | `whip` entre os lados, `confirm`/`error` no veredito |
| Linha do tempo | `tick` em cada marco | `tick` em cada marco |
| Gancho (primeiros 2 s) | — | `boom` ou `punch` na frase de gancho |
| Texto cinético / palavra-chave em tela | — | `punch` ou `thud` |
| Troca de cena / tirar o apresentador | — | `whoosh` / `whip` / `zap` |
| Cartela final / logo | `whooshSoft` + `ding` suave | `whoosh` + `ding` |
| Saída de elemento | nada (ou `whooshOut` bem baixo) | `whooshOut`, opcional |

## Mixagem

- **A voz manda.** Os efeitos ficam bem abaixo da fala. Os ganhos padrão de `SFX` já estão
  calibrados para isso: use `volume` (multiplicador) só para ajuste fino.
- **Aula é discreta:** multiplique os ganhos por ~0,6 (por exemplo, `volume={0.6}`) e evite
  `boom`, `punch`, `zap` e `riser`. Um som por elemento, nunca em sequência rápida, a não ser
  itens de lista.
- **Reels é mais presente:** ganhos padrão. Ainda assim, no máximo um impacto forte (`boom`,
  `punch`) a cada ~5 s, para não cansar.
- **Sincronia:** o som começa no **mesmo frame** em que o elemento começa a se mover (os
  arquivos já não têm silêncio inicial). O `riser` é a exceção: começa 1,4 s antes, para
  terminar no frame do impacto.
- **Sem repetição mecânica:** alterne as variantes (`pop1`/`pop2`/`pop3`, teclas de
  `TypeSfx`) em sequências.
- **Digitação:** sincronize `TypeSfx` com a velocidade da animação (`charsPerSecond` igual ao
  do texto). Acima de ~25 caracteres por segundo, use `volume` menor ou só uma tecla a cada 2
  caracteres.
- Com trilha de fundo em ducking, os efeitos ficam fora do ducking (sobre a trilha), mas
  continuam abaixo da voz.
- A loudness final (−14 LUFS) é medida **com** os efeitos. Confira no passo de verificação que
  nenhum efeito estoura nem mascara uma palavra.

## No plano

No passo 5 do fluxo (`VIDEO_RULES.md`), cada insert do plano lista também seus efeitos
sonoros: nome e momento em segundos. Exemplo: `12,24 s — card Senioridade — whoosh; itens
em 12,9 / 13,6 / 14,3 s — pop1, pop2, pop3`.
