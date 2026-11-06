# VIDEO_RULES — modelos de edição

Instruções para o agente editor. Há dois modelos: **Aula** e **Reels**. As cores, fontes e o
movimento vêm da identidade escolhida em `VISUAL_RULES.md`. Este arquivo define *o que* editar
e *como* o vídeo se comporta.

## Fluxo comum (os dois modelos)

1. **Perguntar** sempre que um vídeo chegar em `input/`, antes de qualquer outra etapa, com três
   perguntas na mesma chamada: o estilo de vídeo (Aula ou Reels), a identidade visual
   (`VISUAL_RULES.md`) e o idioma prioritário da legenda (`IDIOMA_RULES.md`).
2. **Inspecionar** o vídeo com `ffmpeg-skill` (`probe.py`): duração, resolução, fps, áudio. Gere
   uma contact sheet para ver onde o apresentador fica no quadro e que áreas estão livres.
3. **Transcrever** com `faster-whisper`, com timestamps por palavra. A transcrição é a base de
   tudo: legendas, detecção de conceitos e o momento exato em que cada elemento entra.
4. **Mapear o conteúdo:** leia a transcrição e liste os momentos editáveis (conceitos, listas,
   números, comparações, passos, exemplos) com início e fim em segundos.
5. **Apresentar o plano** antes de renderizar: a lista de inserts (tipo, texto, início–fim,
   posição), os efeitos sonoros de cada insert (`SFX_RULES.md`), as traduções da legenda
   (`IDIOMA_RULES.md`) e o formato de saída. Espere aprovação. Em vídeos longos, uma renderização errada
   custa caro.
6. **Renderizar:** use Remotion (`remotion-best-practices`) para infográficos, animações e
   legendas, e `ffmpeg-skill` para cortes, áudio, composição e exportação.
7. **Verificar:** gere uma contact sheet do resultado e confira os pontos com insert: nada sobre
   o rosto, legenda legível, cores da identidade. Confira também a loudness.

Regras gerais:

- Legenda sempre bilíngue (pt-BR + inglês), com o idioma escolhido como principal e o outro
  como linha sutil abaixo. Ver `IDIOMA_RULES.md`.
- Todo elemento gráfico que entra em tela leva efeito sonoro. Ver `SFX_RULES.md`.
- Não invente conteúdo. Infográficos e exemplos representam **só o que o apresentador disse**.
  Termos técnicos são escritos como a transcrição corrigida os mostra.
- Revise a transcrição antes de usar: corrija nomes próprios, termos técnicos e siglas que o
  Whisper errou.
- Nunca altere nem sobrescreva o arquivo de `input/`. O vídeo final vai para `output/` em `.mp4`.

---

## Modelo 1 — Aula

**Objetivo:** deixar o mais simples possível de entender o que está sendo apresentado, com o
apresentador **sempre em cena**. A edição apoia a explicação e não compete com ela.

### Formato

- Mantém a proporção original (normalmente 16:9) e a duração completa.
- Não corte conteúdo sem pedido. Corte de silêncio só se o usuário pedir.
- Loudness: −14 LUFS (YouTube) ou o alvo que o usuário indicar.

### Legenda discreta

- Embaixo, centralizada, no máximo **2 linhas** e ~42 caracteres por linha.
- Tamanho pequeno: ~3,5–4% da altura do quadro (≈ 38–42px em 1080p).
- Fonte de corpo da identidade, peso 500–600, cor de texto principal, sobre caixa de véu
  semitransparente ou com sombra suave. Sem caixa alta, sem emoji.
- **Sem animação palavra a palavra.** Blocos de frase aparecem e somem com fade curto (~150 ms).
- Quando houver um infográfico embaixo, a legenda sobe ou o infográfico ocupa a lateral. Os dois
  nunca se sobrepõem.

### Infográficos

O foco do modelo. A cada conceito explicado, mostre uma representação visual simples **em
paralelo ao apresentador ou em volta dele**.

| Quando o apresentador… | Mostre |
|---|---|
| define um termo | cartão de termo: palavra + definição de até 12 palavras |
| enumera itens ou passos | lista que revela cada item **no momento em que é dito** |
| descreve um processo ou fluxo | diagrama de caixas e setas que se desenha em sequência |
| compara duas coisas | duas colunas lado a lado (A × B), com os mesmos critérios |
| cita um número ou dado | número grande + rótulo curto, ou gráfico simples (barra/pizza) |
| conta uma evolução no tempo | linha do tempo horizontal |
| mostra ou cita código | bloco de código curto com a linha relevante destacada |

**Layout (apresentador sempre visível):**

- Use as áreas livres do quadro. Se o apresentador está num lado, o infográfico ocupa o outro.
- Se não houver espaço, reduza o vídeo do apresentador para ~60–65% da largura, alinhado a um
  lado, e use o restante como painel sobre o fundo da identidade. Volte ao quadro cheio quando
  o infográfico sair, com uma transição suave (~400 ms).
- **Nunca cubra o rosto nem as mãos** quando ele estiver gesticulando ou mostrando algo.

**Simplicidade:**

- Um infográfico por vez.
- No máximo 5 itens e ~7 palavras por item. Um ícone por item, no máximo.
- Sem enfeites: só formas, ícones outline e as cores da identidade, com o acento só no que
  importa.
- **Tempo:** entra quando o conceito começa a ser dito, fica enquanto ele é discutido (mínimo de
  4 s) e sai antes do próximo assunto. Itens de lista entram sincronizados com a fala.

**Renderização em vídeo longo:** não re-renderize a aula inteira no Remotion. Renderize cada
infográfico como clipe com transparência (ProRes 4444 ou WebM VP9 com alpha) e componha com
FFmpeg nos timestamps do plano.

---

## Modelo 2 — Reels

**Objetivo:** algo visualmente impactante para redes de vídeo curto (Reels, TikTok, Shorts).
O apresentador sai de tela quando for conveniente, dando lugar a b-rolls, animações e exemplos
desenhados.

### Formato

- Vertical **9:16, 1080×1920**, 30 fps. Duração de até **3 min** (limite do Instagram Reels),
  a não ser que o usuário peça outra. Vídeo de origem dentro desse limite (depois dos jump
  cuts) é editado inteiro.
- Se o vídeo de origem passar de 3 min, proponha os trechos mais fortes (com timestamps) e
  deixe o usuário escolher antes de editar.
- **Gancho nos primeiros 2 s:** a frase mais forte ou a promessa do vídeo, com texto na tela.
- Cortes secos: remova silêncios, hesitações e repetições (jump cuts).
- **Corte do respiro após cada frase:** os silêncios depois de cada frase saem sempre, para
  acelerar o ritmo e prender a atenção, **sem comer o fim da palavra**. Corte pelos timestamps
  de palavra do Whisper, que costumam marcar o fim da palavra cedo demais: mantenha ~120 ms
  antes da primeira palavra e **~280 ms depois da última** palavra de cada frase, e emende na
  próxima. Dentro da frase, só pausas acima de ~450 ms são encurtadas. Trechos que se tocam
  depois da folga viram um só (nunca repetir áudio). Ouça os cortes das palavras que terminam
  em consoante fraca ou vogal arrastada ("-s", "-r", "-m", "né", "tá").
- Loudness: −14 LUFS. Voz sempre inteligível, com música de fundo em ducking se houver trilha.
- Final com CTA curto e logo da identidade.

### Legendas dinâmicas

- Grandes e centralizadas, mas sem dominar o quadro: ~4,5% da altura (≈ 84px em 1920), 2 a 4
  palavras por vez, fonte display da identidade em peso 700+.
- **Palavra ativa destacada** na cor de acento, com pop de entrada (escala 0.9 → 1.05 → 1 em
  ~150 ms). Palavras-chave podem ganhar caixa, sublinhado animado ou ícone.
- Sincronizadas por palavra (timestamps do Whisper). Ver a skill `caption-animation`.
- Contorno ou sombra forte para ler sobre qualquer fundo.
- **Longe do rosto:** a legenda (principal + secundária) nunca chega perto do rosto. Deixe
  ≥ ~250px entre o queixo (no maior zoom) e o topo do bloco de legenda. Punch-ins e
  alternância de enquadramento crescem a partir da linha do queixo (`transform-origin` na
  altura do queixo), para o rosto nunca descer em direção à legenda. Se faltar espaço, a
  legenda desce até ~340px da base e diminui, em vez de subir para perto do rosto.
- **Área segura:** fora dos ~250px do topo, dos ~420px de baixo e dos ~120px da direita, onde
  ficam a interface do app e os botões.

### B-roll, animações e exemplos desenhados

- **Ritmo:** algo muda na tela a cada 2–4 s (corte, zoom, insert, troca de plano).
- **Tirar o apresentador de tela** quando a fala explica algo abstrato, dá um exemplo ou
  descreve algo que pode ser mostrado. A voz continua por baixo da imagem. **Manter o
  apresentador** no gancho, em opiniões pessoais, momentos de emoção e no CTA.
- **Exemplos desenhados (Remotion):** diagramas que se desenham na tela, ícones animados,
  tipografia cinética, comparações animadas e contadores de números. Tudo nas cores e no
  movimento da identidade, ocupando a tela inteira.
- **B-roll:** use só material fornecido pelo usuário (pergunte se ele tem uma pasta de b-roll).
  Não baixe vídeo de banco de imagens sem pedido. Sem b-roll disponível, substitua por animação.
- **Com o apresentador em cena:** punch-in de 1.1–1.2× nas frases de ênfase e alternância de
  enquadramento entre cortes para dar movimento.
- Transições rápidas (≤ 300 ms): corte seco, whip, zoom. Sem transições de "apresentação de
  slides".
