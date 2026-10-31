# IDIOMA_RULES — legenda bilíngue

Todo vídeo editado sai com legenda em **dois idiomas**: português (pt-BR) e inglês. Um deles é
a **legenda principal**, com o visual padrão do modelo (`VIDEO_RULES.md`) e da identidade
(`VISUAL_RULES.md`). O outro é a **legenda secundária**: mais sutil, logo abaixo de cada linha da
principal.

## Regra 1: sempre perguntar o idioma prioritário

Sempre que um vídeo chegar para edição, pergunte qual idioma tem prioridade na legenda, mesmo
que um vídeo anterior da conversa tenha usado uma resposta. A pergunta vai **na mesma mensagem**
que pergunta o modelo (Aula ou Reels) e a identidade visual (ver `AGENTS.md`, passo 0).

| Opção | Legenda principal (visual padrão) | Legenda secundária (sutil, embaixo) |
|---|---|---|
| **Português** | pt-BR | inglês |
| **Inglês** | inglês | pt-BR |

A escolha vale só para a legenda. Ganchos, infográficos, cartelas e CTA seguem o idioma
principal.

## Texto das duas legendas

- A transcrição do Whisper (corrigida, ver `VIDEO_RULES.md`) é a fonte. O idioma falado é o que
  tem timestamps por palavra.
- **Tradução:** traduza frase a frase, de forma natural, sem traduzir palavra por palavra.
  Mantenha termos técnicos, nomes de ferramentas e código como são usados na área (por exemplo,
  "deploy", "pull request", `useEffect` ficam iguais nos dois idiomas). Não acrescente nem
  omita ideias.
- Inclua as traduções no plano apresentado para aprovação (passo 5 do fluxo), junto com os
  inserts, para o usuário revisar antes de renderizar.

## Sincronização

- **Principal no idioma falado** (caso mais comum): mantém a animação do modelo. Em Reels,
  palavra a palavra com a palavra ativa destacada. Em Aula, blocos de frase.
- **Principal no idioma traduzido:** não existem timestamps por palavra na tradução. Use blocos
  de frase em ambos os modelos (sem destaque de palavra ativa), com os tempos de início e fim da
  frase falada correspondente. Em Reels, mantenha os blocos curtos (2–4 palavras, ~20
  caracteres): divida a frase traduzida em partes e reparta o tempo da frase proporcionalmente
  ao número de caracteres de cada parte.
- **Secundária:** sempre em bloco de frase, sem animação por palavra. Entra e sai com fade curto
  (~150 ms) junto com a frase da principal que ela traduz. Em Reels, a principal troca a cada
  2–4 palavras, mas a secundária mostra a **frase inteira** (até ~42 caracteres por linha, no
  máximo 2 linhas) enquanto ela é falada, para continuar legível.
- As duas nunca ficam dessincronizadas por mais de ~200 ms do início da fala.

## Visual da legenda secundária

A secundária apoia a principal sem competir com ela.

| | Aula | Reels |
|---|---|---|
| Tamanho | ~70% da principal (≈ 28–30px em 1080p) | ~40% da principal (≈ 44–48px em 1080×1920) |
| Fonte | fonte de corpo da identidade, peso 400–500 | fonte de corpo da identidade, peso 500 |
| Cor | texto principal da identidade com opacidade ~80% | texto principal com opacidade ~85% |
| Contraste | o mesmo véu/caixa da principal, se houver; senão sombra suave | sombra suave (sem o contorno grosso da principal) |
| Estilo | sem caixa alta, sem itálico, sem destaque de acento | sem caixa alta, sem itálico, sem destaque de acento |
| Linhas | até 2, ~42 caracteres por linha | até 2, ~42 caracteres por linha |

- **Posição:** imediatamente abaixo da principal, centralizada, com espaçamento de ~0,3× a
  altura da linha principal. O bloco das duas cresce para cima a partir da linha de base do
  modelo, para a secundária nunca invadir a área segura de baixo (Reels) nem a borda do quadro
  (Aula).
- **Acento só na principal:** a palavra ativa e as palavras-chave em cor de acento ficam só na
  legenda principal.
- Na identidade **Liga Dev**, a secundária fica dentro do mesmo cartão branco da principal, em
  `#55617a` (texto secundário), em vez de texto claro com sombra.
- Respeite as regras de layout do modelo: em Aula, quando houver infográfico embaixo, o bloco
  inteiro (principal + secundária) sobe ou o infográfico vai para a lateral.

## No Remotion

- `remotion/src/Captions.tsx` aceita a prop `secondary` (lista de `SubtitleSegment`:
  `{ startMs, endMs, text }`, em ms na timeline do corte) e desenha a linha secundária abaixo
  da principal. Guarde as frases em `remotion/src/data/subs.json`.
- Quando a principal for o idioma traduzido, gere um `words.json` com os blocos traduzidos (um
  `Caption` por bloco) e passe a transcrição falada, por frase, como `secondary`.
- Ajuste tamanho, fonte e cor da secundária aos tokens da identidade escolhida (`theme.ts`).
