# VISUAL_RULES — identidades visuais para vídeo

Este arquivo traduz as três identidades de `visual-id/` para vídeo: legendas, infográficos,
animações, cartelas e logo. Os guias completos (`visual-id/*.md`) são a fonte da verdade. Este
arquivo resume só o que importa na edição. Se os dois divergirem, vale o guia de `visual-id/`.
Atualize este resumo quando o guia mudar.

## Regra 1: sempre perguntar a identidade

**Toda vez que um vídeo for enviado para edição, pergunte qual identidade seguir antes de
planejar ou renderizar qualquer coisa**, mesmo que um vídeo anterior da conversa tenha usado
uma identidade. Pergunte com as três opções abaixo e, na mesma mensagem, pergunte sempre o
modelo de edição (Aula ou Reels, ver `VIDEO_RULES.md`) e o idioma prioritário da legenda
(Português ou Inglês, ver `IDIOMA_RULES.md`). Use a ferramenta de perguntas do agente, se houver
(como o `AskUserQuestion` do Claude Code). Ver `AGENTS.md`, passo 0.

| Opção | Tom | Base | Acento | Fontes |
|---|---|---|---|---|
| **BF Academy** | Elegante, premium, acolhedor | Roxo profundo | Dourado | Outfit + Inter |
| **Leno Borges** | Sóbrio, técnico, minimalista | Grafite | Um azul (≤ 3% da tela) | Outfit + DM Sans + JetBrains Mono |
| **Liga Dev** | Moderno, limpo, educacional com toque de jogo | Branco / azul-claro | Azul + violeta em gradiente | Sora + Archivo + JetBrains Mono |

Não misture identidades no mesmo vídeo, não invente cores fora da paleta e não use fontes que
a identidade não lista.

## Regras comuns de vídeo

- **Fontes:** as fontes vêm do Google Fonts. No Remotion, carregue com `@remotion/google-fonts`.
  No FFmpeg/ASS, a fonte precisa estar instalada no sistema. Se não estiver, avise antes de
  renderizar em vez de deixar cair numa fonte padrão.
- **Contraste sobre vídeo:** texto nunca fica direto sobre imagem em movimento sem um véu,
  uma caixa ou um contorno/sombra. As combinações de cor seguem as regras de contraste (AA) de
  cada guia.
- **Logo:** use o SVG de `visual-id/` sem recolorir, distorcer ou aplicar sombra externa, com
  respiro mínimo de 1/4 da altura da logo. Em vídeo, ela aparece só na abertura, no encerramento
  ou como marca d'água discreta (canto, opacidade 60–80%, nunca sobre o rosto).
- **Movimento:** use as curvas e durações de cada identidade. Elementos entram desacelerando
  (ease-out) e saem acelerando (ease-in). Sem bounce, a não ser onde a identidade permite.
- **Ícones:** traço outline monocromático (estilo Lucide/Feather, stroke 2, pontas arredondadas)
  nas três identidades, na cor do texto ou do acento.

---

## Opção 1 — BF Academy

Logo: `visual-id/bf-academy.svg` (quadrado, dourado sobre roxo). Guia: `visual-id/bf-academy.md`.

**Essência:** roxo é a base, dourado é o acento. Premium e acolhedor.
**Em vídeo, use a afinação escura** (tons mais claros do gradiente sobre fundos escuros), que
lê melhor sobre imagem.

| Papel em vídeo | Cor |
|---|---|
| Fundo de cartela / painel de infográfico | `#1a121c` (bg) · `#2b1f2e` (superfície) · `#3a2a3d` (segundo nível) |
| Véu sobre vídeo | `rgba(10,6,11,.75)` |
| Texto principal / secundário | `#f4eef5` / `#bca6c0` |
| Acento (destaques, palavra ativa, marcadores) | `#dcac44` (hover/realce `#e5be6b`) |
| Gradiente assinatura (títulos, fundos de abertura) | `#9b7fa0 → #dcac44` |
| Gradiente dourado (palavra-chave em título) | `#dcac44 → #eeddba` |
| Destaque CTA (chip/barra) | dourado `#dcac44 → #eeddba` com texto `#271c29` |
| Séries de gráfico | `#a063cb` · `#b98722` · `#12a06f` (validados para daltonismo) |

- **Tipografia:** títulos em Outfit 700 (`letter-spacing -0.02em`). Legenda e corpo em Inter
  500–600. Título de destaque pode usar o gradiente dourado recortado no texto.
- **Formas:** pílulas (`999px`) para chips e selos. Cards com cantos arredondados e halo dourado
  suave (`--bf-elev-glow`).
- **Movimento:** 150 / 250 / 400 ms. Entrada `cubic-bezier(0.16, 1, 0.3, 1)`, saída
  `cubic-bezier(0.7, 0, 0.84, 0)`. Spring `cubic-bezier(0.34, 1.56, 0.64, 1)` só em
  confirmações e destaques, nunca em saídas. O elemento termina em `transform: none`.

---

## Opção 2 — Leno Borges

Logo: `visual-id/leno-borges.svg` (monograma "LB" azul, proporção 619:544). Guia:
`visual-id/leno-borges.md`.

**Essência:** grafite neutro e **um único** azul. Sóbrio, técnico, muito espaço negativo.
Só existe tema escuro.

| Papel em vídeo | Cor |
|---|---|
| Fundo de cartela / painel | `#1C1C1E` (ink) · `#232326` (surface) · `#2A2A2D` (raised) |
| Bordas / divisores | `#383838` |
| Véu sobre vídeo | gradiente `#1C1C1E` 80% → transparente (de baixo para cima) |
| Texto principal / corpo / metadado | `#F2F3F5` / `#A3A7AD` / `#8E8E93` |
| Acento em texto grande e marcadores | `#3986FF` |
| Acento em texto pequeno | `#488FFF` |
| Fundo de botão/caixa com texto branco | `#2563D9` (nunca branco sobre `#3986FF`) |

- **Proporção:** ~85% grafite, ~12% texto neutro, **≤ 3% azul**. Nada de blocos grandes azuis,
  segunda cor de acento ou gradiente em texto.
- **Tipografia:** títulos e números em Outfit 600 (tracking apertado). Legenda e corpo em DM Sans
  500. Rótulos e eyebrows em JetBrains Mono, caixa alta, tracking largo. Ênfase só por peso ou
  azul, sem itálico.
- **Formas:** cards `#232326` com cantos ~16px e sombra neomórfica sutil (luz do canto superior
  esquerdo), sem borda. Chips em pílula. Seções numeradas `01`, `02`… em mono azul.
- **Movimento:** entrada "rise" de 0,8 s `cubic-bezier(0.2, 0.7, 0.2, 1)` (fade + sobe 16px).
  Transições de 150–300 ms. Sem bounce nem parallax.

---

## Opção 3 — Liga Dev

Logo: `visual-id/liga-dev.svg` (squircle verde-petróleo → azul aço, glifo branco). Abaixo de
32px de altura, use a versão sem sombra. Guia: `visual-id/liga-dev.md`.

**Essência:** moderna, limpa e acolhedora (tom de professor próximo). Tema claro, cantos bem
arredondados, sombras difusas, toques de jogo vindos de micro-interações e nunca de pixel-art.

| Papel em vídeo | Cor |
|---|---|
| Painel / card de infográfico | `#ffffff` com borda `rgba(16,24,40,.08)` e sombra difusa |
| Fundo de cartela | `radial-gradient(#e9f1ff → #f4f7fc → #ffffff)` + aurora `rgba(72,143,255,.42)` / `rgba(124,92,255,.3)` |
| Chips / destaque leve | `#dce8fb` · `#eef4ff` (bordas `#b6c3da`) |
| Texto principal / secundário | `#101828` / `#55617a` |
| Acento em texto sobre claro | `#1f5fe0` |
| Acento em pontos, números, bordas | `#3986ff` |
| Caixa com texto branco | gradiente `#2f6fe0 → #1f5fe0` ou `#101828` |
| Ênfase de título | gradiente `#3986ff → #7c5cff` recortado no texto (só em título) |
| Erro / sucesso / aviso | `#c0392b` / `#2f9e44` / `#8a5a00` sobre `#fff4e0` |

- **Sobre vídeo:** como o tema é claro, legendas e infográficos vão em **cartões brancos**
  (ou em `#101828` com texto `#eef4ff` quando o fundo do vídeo for muito claro). Nunca texto
  branco sobre o gradiente claro `#488fff → #6b6bff`.
- **Tipografia:** títulos e números em Sora 700. Legenda e corpo em Archivo 500–600. Eyebrows em
  JetBrains Mono maiúsculo 700.
- **Formas:** raio de 24px em cards, pílula em chips e destaques. Sombra
  `0 20px 45px -18px rgba(16,24,40,.32)`, com brilho azul `0 18px 40px -16px rgba(57,134,255,.55)`
  no elemento em foco.
- **Movimento:** 120 / 200 / 320 ms, nunca acima de 400 ms em transições, curva
  `cubic-bezier(0.16, 1, 0.3, 1)`. "Pop" (0.94 → 1.02 → 1) para entrada de itens, efeito
  "digitando" com cursor piscando para termos e código.
