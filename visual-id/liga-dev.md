# Identidade Visual — Liga Dev
[Logo](./liga-dev.svg)

> Documento de referência para agentes e pessoas que vão criar telas, componentes,
> e-mails ou materiais novos. Extraído do código atual do `eduleno-front`
> (`src/styles.scss`, `src/index.html`, `src/app/shared/logo`, `src/app/components/*`).
> Em caso de divergência, **o código é a fonte da verdade** — atualize este arquivo.

Arquivos desta pasta:

| Arquivo | Uso |
| --- | --- |
| `logo.svg` | Símbolo completo, com drop-shadows nos traços. Para tamanhos ≥ 32px (cabeçalho, aside, hero, e-mail). |
| `logo-flat.svg` | Símbolo sem sombras (mesmo do `public/favicon.svg`). Para favicon e tamanhos < 32px. |
| `identidade-visual.md` | Este guia. |

---

## 1. Personalidade

- **Moderna, limpa e acolhedora** — produto educacional de programação, tom de professor próximo.
- Gradientes suaves ao redor do azul do logo, **sombras leves e difusas**, **cantos bem arredondados**.
- **Zero pixel-art.** Apesar de componentes se chamarem `pixel-button` / `pixel-panel` (legado de nome), o visual é liso e contemporâneo.
- Toques de "jogo" (XP, insígnias, ranking, typing effect na caixa de diálogo, cursor piscando) vêm de **micro-interações**, não de estética retrô.
- Idioma da interface: **pt-BR**. Comentários de código também em português.

---

## 2. Logo

- Símbolo quadrado com cantos `rx=80` em um viewBox `236×236` (≈ 34% de raio — "squircle").
- Fundo: gradiente diagonal **verde-petróleo → azul aço** (`#47807F` → `#4F74AE`) com um véu escuro na metade de baixo (`#000` a 62% de opacidade a partir de ~41%).
- Glifo branco em traço (`stroke-width: 9`, sem preenchimento): um quadrado arredondado no topo (o "pingo") e uma haste curva abaixo — lê-se como um **"i"/"L" estilizado**.
- **Não há wordmark** no componente. Quando o nome aparece ao lado, é texto: `font-weight: 700`, `letter-spacing: 0.05em`, cor `--ink`.

Regras:

- Tamanho padrão no app: `2.25rem` (componente `<app-logo>`); no dashboard `2.5rem`.
- O logo é decorativo (`aria-hidden="true"`); o nome acessível vem do link/texto ao redor.
- Ao embutir o SVG inline mais de uma vez na mesma página, **os ids (`clip0`, `paint0`, `filter0`…) precisam ser únicos por instância** — o componente Angular faz isso com um sufixo `uid`.
- Não recolorir, não distorcer, não aplicar sombra externa extra, não colocar sobre fundos com o mesmo azul-petróleo.
- Abaixo de 32px usar `logo-flat.svg` (a sombra não se lê e borra a silhueta).

> Observação: as cores do símbolo (`#47807F`/`#4F74AE`) são próprias do logo. A cor de
> acento da **interface** é o azul `#3986FF` (abaixo). `theme-color` do HTML: `#3986FF`.

---

## 3. Cores

### 3.1 Tokens base (`:root` em `src/styles.scss`)

| Token | Valor | Papel |
| --- | --- | --- |
| `--ink` | `#101828` | Texto principal; fundo de superfícies escuras (`tone-ink`, stat-tile). |
| `--ink-soft` | `#55617a` | Texto secundário, legendas, labels, eyebrows. |
| `--paper` | `#ffffff` | Fundo de cards, painéis, modais, inputs. |
| `--screen` | `#dce8fb` | Fundo azul-claro de chips, ícone-badge, item ativo, botão "cancelar". |
| `--screen-lit` | `#eef4ff` | Hover suave, fundo de input "destacado", texto claro sobre `--ink`. |
| `--screen-deep` | `#b6c3da` | Bordas de chips/badges, divisores, texto claro secundário sobre escuro. |
| `--accent` | `#3986ff` | Acento da marca: pontos de status, valores numéricos em destaque, foco sobre escuro, borda de hover. |
| `--accent-deep` | `#1f5fe0` | Acento para **texto** sobre claro (AA), ícones, eyebrows, item de menu ativo. |
| `--link-blue` | `#2563eb` | Links e anel de foco padrão. |
| `--violet` | `#7c5cff` | Cor secundária, só em gradientes/ênfase (título do hero, aurora). |

### 3.2 Gradientes

| Token | Valor | Uso |
| --- | --- | --- |
| `--gradient-accent` | `linear-gradient(135deg, #488fff 0%, #3986ff 55%, #6b6bff 100%)` | Fundos de destaque (`tone-accent`). Não usar para texto branco pequeno. |
| `--gradient-accent-strong` | `linear-gradient(135deg, #2f6fe0 0%, #1f5fe0 100%)` | **Botão primário** e qualquer fundo com texto branco pequeno (único com contraste AA ≥ 4.5:1). |
| `--gradient-hero` | `radial-gradient(120% 120% at 12% 0%, #e9f1ff 0%, #f4f7fc 55%, #ffffff 100%)` | Fundo do `body` (fixed). |
| `--gradient-panel` | `linear-gradient(160deg, #eef4ff 0%, #ffffff 65%)` | Painel "lit" (`tone-lit`). |
| Ênfase de título | `linear-gradient(115deg, var(--accent) 0%, var(--violet) 100%)` com `background-clip: text` | Trecho de destaque do H1. Sempre com `color: var(--accent-deep)` como fallback. |

Regra: **gradiente é para fundo**, nunca para texto de leitura longa.

### 3.3 Atmosfera (aurora)

- `--aurora-1: rgba(72, 143, 255, 0.42)` e `--aurora-2: rgba(124, 92, 255, 0.3)`.
- Classe `.aurora` (elemento `aria-hidden`, posicionado): duas manchas radiais que vagam devagar (19s e 24s, `alternate`). Uso em hero e seções de destaque.

### 3.4 Cores semânticas (ainda sem token global — usadas com fallback)

| Papel | Uso atual | Recomendado |
| --- | --- | --- |
| Erro / perigo | `var(--danger, #d64545)`, texto de erro `#c0392b`, botão perigo `#c0392b` → hover `#a5281b`, fundo `#fdf2f2`, borda `#f8b4b4` | `#c0392b` para texto/botão, `#fdf2f2` para fundo. |
| Sucesso | `var(--ok, #2f9e44)` (variações `#2e7d32`) | `#2f9e44`. |
| Aviso | `var(--warn, #e0a800)`, borda `#e9c46a`, fundo `#fff4e0`, texto `#8a5a00` | `#8a5a00` texto sobre `#fff4e0`. |
| Texto sobre acento | `var(--on-accent, #fff)` | `#fff`. |

> `--danger`, `--ok`, `--warn`, `--on-accent`, `--radius-md`, `--step--2` são referenciados
> em componentes mas **não estão definidos em `:root`**. Ao criar algo novo, use sempre com
> fallback (`var(--danger, #c0392b)`, `var(--radius-md, 0.75rem)`, `var(--step--2, 0.7rem)`)
> ou proponha adicioná-los ao `styles.scss`.

### 3.5 Overlays

- Backdrop de modal: `rgba(16, 24, 40, 0.6)` (até `0.72`) + `backdrop-filter: blur(4px)`.
- Vidro (chips sobre o hero): `rgba(255, 255, 255, 0.72)` + `backdrop-filter: blur(8px)`.

---

## 4. Tipografia

Carregadas do Google Fonts em `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet">
```

| Token | Família | Uso |
| --- | --- | --- |
| `--font-display` | `'Sora', 'Trebuchet MS', sans-serif` | Títulos (h1–h4), botões, títulos de card/modal, números. Peso 700 (800 disponível). |
| `--font-body` | `'Archivo', 'Segoe UI', sans-serif` | Texto corrido, menus, inputs. Pesos 400/500/600/700. |
| `--font-mono` | `'JetBrains Mono', 'Consolas', monospace` | Eyebrows (`.u-mono`), código, campos tipo "gamertag". |

### Escala (mobile first)

| Token | Mobile | ≥ 48rem |
| --- | --- | --- |
| `--step--2` | ~`0.7rem` (não definido; usar fallback) | — |
| `--step--1` | `0.79rem` | `0.79rem` |
| `--step-0` | `1rem` | `1rem` |
| `--step-1` | `1.25rem` | `1.25rem` |
| `--step-2` | `1.6rem` | `1.85rem` |
| `--step-3` | `2rem` | `2.5rem` |
| `--step-4` | `2.6rem` | `3.75rem` |

Regras:

- Body: `--step-0`, `line-height: 1.6`, `-webkit-font-smoothing: antialiased`.
- Headings: `--font-display`, `700`, `line-height: 1.05`, `letter-spacing: 0.01em`. H1 do hero: `--step-4`, `letter-spacing: -0.02em`, `text-wrap: balance`.
- Títulos de seção: `--step-3`; títulos de card/modal: `--step-1` com `line-height: 1.25`.
- Lead/parágrafo de apoio: cor `--ink-soft`, `max-width: 42–58ch`.
- **Eyebrow** (`.u-mono`): mono, `--step--1`, `letter-spacing: 0.06em`, `uppercase`, `font-weight: 700`, cor `--accent-deep` ou `--ink-soft`.
- Inputs nunca abaixo de `16px` (evita zoom no iOS).

---

## 5. Forma, borda, sombra e espaço

| Token | Valor | Uso |
| --- | --- | --- |
| `--border-w` | `1px` | Toda borda. |
| `--border-soft` | `rgba(16, 24, 40, 0.08)` | Borda padrão de card, painel, input, modal. |
| `--radius-sm` | `0.6rem` | Inputs, botões secundários/modais, itens de menu, ícone-badge. |
| `--radius` | `1rem` | Raio intermediário. |
| `--radius-lg` | `1.5rem` | Cards, painéis, modais, stat-tile. |
| `999px` | — | Pills: botão primário, chips, badges, XP. |
| `--shadow-hard-sm` | `0 10px 24px -14px rgba(16, 24, 40, 0.24)` | Sombra padrão de card/painel/botão. |
| `--shadow-hard` | `0 20px 45px -18px rgba(16, 24, 40, 0.32)` | Modais, gaveta, painel escuro. |
| `--shadow-glow` | `0 18px 40px -16px rgba(57, 134, 255, 0.55)` | Hover de botão primário e de card clicável. |
| `--space-section` | `4rem` → `6rem` (≥ 48rem) | Espaço vertical entre seções. |
| `--content-max` | `68rem` | Largura máxima de conteúdo. |

Layout:

- `.u-shell`: `max-width: var(--content-max)`, `margin-inline: auto`, `padding-inline: 1.25rem` → `2rem` (≥ 48rem).
- **Breakpoint único: `48rem`** (mobile first, `@media (min-width: 48rem)`).
- Gaps típicos: `0.75rem` (ações), `1rem`–`1.5rem` (grids), `2rem` (blocos de página).
- Padding de card: `1.5rem`; painel `1.25rem` → `2rem`; modal `1.5rem`.
- Alvos de toque ≥ `44px` (`min-height: 2.75rem`; inputs de destaque `3rem`).

---

## 6. Movimento

Tokens (spec 009) — três durações por **peso**, nunca acima de 400ms em transições:

| Token | Valor | Uso |
| --- | --- | --- |
| `--motion-1` | `120ms` | Feedback de toque. |
| `--motion-2` | `200ms` | Mudança de estado. |
| `--motion-3` | `320ms` | Entrada de tela. |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Curva padrão de tudo. |

Keyframes globais (`styles.scss`): `anim-rise` (sobe 14px + fade), `anim-pop` (escala 0.94→1.02→1), `anim-fade`, `anim-out`, `anim-blink` (cursor), `anim-ping` (anel de status ao vivo), `anim-sheen` (brilho que atravessa o botão primário a cada 4.5s), `anim-float` (respira 6px), `anim-aurora-a/b`, `anim-draw` (trilha via `animation-timeline: view()`), `anim-spin` (loading).

Classes: `.animate-enter` (+ `--pop`, `--fade`), `.animate-leave`, `.reveal-idle`, `.delay-1`…`.delay-5` (passos de 120ms), diretiva `appReveal` escreve `--reveal-delay`.

Padrões de interação:

- Hover em card clicável/botão primário: `translateY(-2px)` + `--shadow-glow` (+ `border-color: var(--accent)` no card). `:active` volta a `0`.
- Modal abrindo: `anim-rise 240ms var(--ease-out)`.
- **Sempre respeitar `prefers-reduced-motion: reduce`** (já zerado globalmente; remover `transform` de hover em componentes).

---

## 7. Componentes de referência

### Botão primário (`app-pixel-button`, `variant="primary"`)
```css
padding: 0.85rem 1.5rem; border: none; border-radius: 999px;
background: var(--gradient-accent-strong); color: #fff; box-shadow: var(--shadow-hard-sm);
font-family: var(--font-display); font-size: var(--step-0); font-weight: 700; letter-spacing: 0.01em;
/* ::after com brilho anim-sheen 4.5s; hover: translateY(-2px) + --shadow-glow */
```
### Botão ghost (`variant="ghost"`)
Fundo `--paper`, borda `1px var(--border-soft)`, texto `--ink`, sem sombra e sem brilho.

### Botões de modal (menores)
`padding: 0.6rem 1.2rem; border-radius: var(--radius-sm); font: 700 var(--step--1) var(--font-display);`
- Cancelar: fundo `--screen`, borda `--screen-deep`, hover `--screen-lit`.
- Confirmar: `--gradient-accent-strong`, texto branco, hover `translateY(-1px)` + glow.
- Perigo: `#c0392b` → hover `#a5281b`.
- Salvar em formulários densos: fundo `--ink`, texto `--paper`.

### Painel (`app-pixel-panel`, tons)
Base: borda `--border-soft`, `--radius-lg`, `--shadow-hard-sm`, padding `1.25rem`/`2rem`.
- `screen` → `--paper` · `lit` → `--gradient-panel` · `ink` → fundo `--ink`, texto `--screen-lit`, `--shadow-hard` · `accent` → `--gradient-accent`, texto branco.
- Sobre `tone-ink`, o anel de foco usa `--accent`.

### Card de navegação (dashboard)
`padding: 1.5rem; border-radius: var(--radius-lg); background: var(--paper); box-shadow: var(--shadow-hard-sm); min-height: 12.5rem;`
Ícone em badge `3rem` quadrado, `--radius-sm`, fundo `--screen`, cor `--accent-deep`. Título `--font-display` `--step-1`; descrição `--ink-soft` `--step--1`; ação em `--accent-deep`. Desabilitado: `opacity: 0.7`, borda tracejada.

### Chips / badges / contadores
Pill `999px`, borda `--screen-deep`, fundo `--screen` ou `--paper`, `--step--1` (XP: `0.7rem`), `font-weight: 700`, `letter-spacing: 0.03–0.06em`; número em `--accent-deep`, restante em `--ink-soft`.

### Stat tile
Fundo `--ink`, texto `--screen-lit`, valor em `--font-display` `--step-2` cor `--accent`.

### Inputs
`min-height: 2.75rem; padding: 0.6rem 0.75rem; border: 1px solid var(--border-soft); border-radius: var(--radius-sm); background: var(--paper);`
Label `--step--1` 700 `--ink-soft`; hint `--ink-soft`; erro `#c0392b` `--step--1`; inválido: `border-color: var(--danger, #d64545)`. Foco: `outline: 2px solid var(--accent-deep)` (ou `--accent`), `offset 1px`.

### Modal (`<dialog>` nativo + `showModal()`)
`width: min(26–28rem, calc(100vw - 2rem)); padding: 1.5rem; border-radius: var(--radius-lg); background: var(--paper); box-shadow: var(--shadow-hard);` backdrop escuro com blur 4px; título `--step-1` display; mensagem `--ink-soft`; ações alinhadas à direita com gap `0.75rem`.

### Menu lateral (dashboard-aside)
Gaveta no mobile (`17rem`, `max-width: 85vw`, desliza 260ms), fixa no desktop. Item: `padding: 0.65rem 0.75rem; border-radius: var(--radius-sm); font-weight: 600;` hover `--screen-lit` + texto `--accent-deep`; ativo (`.is-active`, `aria-current="page"`) fundo `--screen`, borda `--screen-deep`, texto `--accent-deep`, 700.

### Caixa de diálogo "digitando" (`app-dialog-box`)
Card branco; texto revelado caractere a caractere com cursor bloco piscando (`anim-blink 700ms steps(1)`); clique revela tudo; texto completo sempre disponível para leitor de tela.

### Indicador "ao vivo"
Ponto `0.55rem` em `--accent` com anel `anim-ping 2.4s` — reservado a um único sinal por página.

---

## 8. Ícones

- Componentes Angular em `src/app/components/icons/icon-*.ts` (`app-icon-*`).
- Estilo **outline estilo Feather/Lucide**: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, tamanho padrão `24` (alertas `28`, fechar `20`).
- Sempre `aria-hidden="true"` e `focusable="false"`; cor herdada do texto.
- Ícones de tecnologia (Angular, Java, Spring, NestJS, SQL, Docker, GCP, Vercel, Supabase, Firebase…) seguem o mesmo traço monocromático, não logos coloridos.

---

## 9. Acessibilidade (inegociável)

- Contraste AA: texto branco só sobre `--gradient-accent-strong`, `--accent-deep` ou `--ink`. Texto azul sobre claro usa `--accent-deep`/`--link-blue`, nunca `--accent`.
- `:focus-visible { outline: 3px solid var(--link-blue); outline-offset: 3px; }` global — não remover outline.
- `.u-visually-hidden` para texto só de leitor de tela.
- Decorativos (`.aurora`, logo, ícones) com `aria-hidden`.
- `prefers-reduced-motion` respeitado.
- Links: `text-underline-offset: 3px`.

---

## 10. Do / Don't para agentes

**Faça**
- Use sempre os tokens `var(--…)`; não invente hex novos para o que já existe.
- Use `app-pixel-button`, `app-pixel-panel`, `app-logo`, `app-icon-*` antes de criar algo novo.
- Mobile first, breakpoint `48rem`, conteúdo até `68rem`.
- Títulos em Sora 700, corpo em Archivo, eyebrow em JetBrains Mono maiúsculo.
- Cantos generosos (`--radius-lg` em superfícies, pill em ações principais) e sombras negativas-spread suaves.

**Não faça**
- Pixel-art, bordas grossas, sombras duras deslocadas, cantos retos.
- Gradiente em parágrafos, texto branco sobre `--gradient-accent` (claro demais).
- Mais de três velocidades de transição, ou transições > 400ms.
- Dark mode: **o produto hoje é só tema claro**; superfícies escuras são pontuais (`tone-ink`, stat-tile).

---

## 11. Bloco de tokens pronto para copiar

```css
:root {
  --ink: #101828;
  --ink-soft: #55617a;
  --screen: #dce8fb;
  --screen-lit: #eef4ff;
  --screen-deep: #b6c3da;
  --accent: #3986ff;
  --accent-deep: #1f5fe0;
  --link-blue: #2563eb;
  --violet: #7c5cff;
  --paper: #ffffff;

  --gradient-accent: linear-gradient(135deg, #488fff 0%, #3986ff 55%, #6b6bff 100%);
  --gradient-accent-strong: linear-gradient(135deg, #2f6fe0 0%, #1f5fe0 100%);
  --gradient-hero: radial-gradient(120% 120% at 12% 0%, #e9f1ff 0%, #f4f7fc 55%, #ffffff 100%);
  --gradient-panel: linear-gradient(160deg, #eef4ff 0%, #ffffff 65%);

  --font-display: 'Sora', 'Trebuchet MS', sans-serif;
  --font-body: 'Archivo', 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;

  --step--1: 0.79rem;
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.6rem;
  --step-3: 2rem;
  --step-4: 2.6rem;

  --border-w: 1px;
  --border-soft: rgba(16, 24, 40, 0.08);
  --radius-sm: 0.6rem;
  --radius: 1rem;
  --radius-lg: 1.5rem;
  --shadow-hard: 0 20px 45px -18px rgba(16, 24, 40, 0.32);
  --shadow-hard-sm: 0 10px 24px -14px rgba(16, 24, 40, 0.24);
  --shadow-glow: 0 18px 40px -16px rgba(57, 134, 255, 0.55);
  --space-section: 4rem;
  --content-max: 68rem;

  --aurora-1: rgba(72, 143, 255, 0.42);
  --aurora-2: rgba(124, 92, 255, 0.3);

  --motion-1: 120ms;
  --motion-2: 200ms;
  --motion-3: 320ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* Semânticos usados com fallback no código (ainda não declarados no projeto) */
  --danger: #c0392b;
  --ok: #2f9e44;
  --warn: #e0a800;
  --on-accent: #fff;
  --radius-md: 0.75rem;
  --step--2: 0.7rem;
}

@media (min-width: 48rem) {
  :root {
    --step-2: 1.85rem;
    --step-3: 2.5rem;
    --step-4: 3.75rem;
    --space-section: 6rem;
  }
}

body {
  background: var(--gradient-hero) fixed;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: var(--step-0);
  line-height: 1.6;
}
```
