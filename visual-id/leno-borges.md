# Identidade visual — Leno Borges
[Logo](./leno-borges.svg)

Guia de marca extraído do portfólio (spec 002). Documento único e autocontido: guia, tokens prontos para Tailwind v4 e prompt para agents. Os arquivos da logo ficam em `logo/`, ao lado deste arquivo.

## Essência

- **Moderno, sólido, levemente neomórfico.** Base grafite neutra, um único acento azul vindo da logo.
- **Sóbrio e técnico.** Pouca cor, muita hierarquia por peso, tamanho e espaço. O azul é tempero, não fundo.
- **Tema escuro nativo.** Não existe versão clara da marca; superfícies são sempre grafite.

## Logo

Monograma "LB" geométrico em azul com gradiente, dobras sombreadas em cinza e sombra interna sutil.

| Arquivo | Uso |
| --- | --- |
| `logo/logo.svg` | Principal (619×544). Gradiente + dobras + sombra interna. Usar sobre fundos escuros. |
| `logo/logo-square.svg` | Mesma arte em viewBox quadrado (619×619) — favicon, avatar, app icon. |
| `logo/logo-flat.svg` | Só a silhueta com o gradiente, sem dobras/sombras — tamanhos pequenos, impressão, bordado. |
| `logo/logo-mono.svg` | Silhueta em `currentColor` — uma cor (branco, `paper`, `ink`, marca d'água). |
| `logo/favicon.ico` | 16 e 32 px. |
| `logo/apple-touch-icon.png` | 180×180. |

**Regras**

- Proporção fixa 619:544 (~1,14:1). No header usa-se 32 px de altura (`h-8`, `width=37 height=32`).
- Área de respiro mínima: 1/4 da altura da logo em todos os lados.
- Tamanho mínimo: 16 px de altura (abaixo de 24 px prefira `logo-flat.svg`).
- Não recolorir a versão principal, não aplicar sombra externa, não distorcer, não colocar sobre fotos sem véu escuro.
- Gradiente: `#488FFF` (canto superior direito) → `#3986FF` (canto inferior esquerdo), eixo diagonal ~43°.
- Dobras: preto com opacidade 0 → 0,6 e cinzas `#383838`, `#494949`, `#737373`. Sombra interna: blur 50, preto 25 %.

## Paleta

### Neutros (grafite)

| Token | Hex | Papel |
| --- | --- | --- |
| `ink` | `#1C1C1E` | Fundo da página, `theme-color` |
| `surface` | `#232326` | Cards, chips, header ao rolar |
| `raised` | `#2A2A2D` | Elemento ativo/elevado (ex.: idioma selecionado) |
| `line` | `#383838` | Bordas finas, divisores, linha do tempo |
| `paper` | `#F2F3F5` | Títulos e texto de destaque |
| `muted` | `#A3A7AD` | Texto corrido (cor padrão do `body`) |
| `faint` | `#8E8E93` | Metadados, legendas, rótulos mono |

### Acento (azul da logo)

| Token | Hex | Papel |
| --- | --- | --- |
| `accent` | `#3986FF` | Ênfase em títulos grandes, métricas, marcadores, foco, hover de ícones |
| `accent-soft` | `#488FFF` | Texto pequeno em azul (rótulos, badges, subtítulos) |
| `accent-deep` | `#2563D9` | Fundo de botão primário com texto branco |

### Contraste (WCAG 2.1)

| Texto ↓ / Fundo → | `ink` | `surface` | `raised` |
| --- | --- | --- | --- |
| `paper` | 15,32 | 14,12 | 12,89 |
| `muted` | 7,04 | 6,48 | 5,92 |
| `faint` | 5,22 | 4,81 | **4,39** ✗ |
| `accent` | 4,88 | **4,50** (limite) | **4,11** ✗ |
| `accent-soft` | 5,39 | 4,96 | 4,53 |
| branco sobre `accent-deep` | — | — | 5,43 |
| branco sobre `accent` | — | — | **3,48** ✗ |

- Texto pequeno azul → `accent-soft`. `accent` puro só em texto grande (≥ 24 px ou ≥ 18,66 px bold) ou elementos não textuais.
- Botão com texto branco → sempre `accent-deep`, nunca `accent`.
- Não usar `faint` sobre `raised`.
- O cinza `#737373` da logo **não** é cor de texto (não passa AA sobre `ink`); por isso `faint` é `#8E8E93`.

### Proporção de uso

~85 % grafite (`ink`/`surface`), ~12 % texto neutro, ≤ 3 % azul. Nada de blocos grandes azuis nem gradiente azul em texto corrido.

### Transparências recorrentes

- Véu sobre foto: gradiente `ink/80` → transparente (de baixo para cima).
- Header ao rolar: `ink/80` + `backdrop-blur-md` + borda `line/70`.
- Poços (wells) dentro de cards: `ink/40` + `shadow-inset`.
- Badge: fundo `accent/10`, texto `accent-soft`.
- Seleção de texto: `accent` 40 % misturado com transparente, texto `paper`.

## Tipografia (Google Fonts)

| Token | Família | Pesos | Uso |
| --- | --- | --- | --- |
| `font-display` | **Outfit** | 500–700 | Nome, títulos, métricas, valores de destaque |
| `font-sans` | **DM Sans** (opsz 9..40) | 400–700 | Corpo e UI (padrão do `body`) |
| `font-mono` | **JetBrains Mono** | 400–500 | Eyebrows, datas, rótulos, chips pequenos, seletor de idioma |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..700&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@500..700&display=swap" rel="stylesheet">
```

### Escala usada

| Papel | Classes Tailwind |
| --- | --- |
| Hero (nome) | `font-display text-[clamp(3.25rem,10vw,7rem)] font-semibold leading-[0.95] tracking-tight text-paper` |
| Subtítulo do hero | `font-display text-2xl sm:text-3xl font-medium leading-snug text-paper/90` |
| Título de seção (h2) | `font-display text-4xl sm:text-5xl font-semibold tracking-tight text-paper` |
| Título de card (h3) | `font-display text-2xl sm:text-3xl font-semibold tracking-tight text-paper` |
| Métrica | `font-display text-3xl sm:text-4xl font-semibold tracking-tight text-accent` |
| Lead / destaque | `font-display text-xl sm:text-2xl font-medium leading-snug text-paper` |
| Corpo | `text-base leading-relaxed text-muted` (cards: `text-[15px]`) |
| Eyebrow / rótulo | `font-mono text-xs uppercase tracking-[0.2em] text-faint` |
| Data / período | `font-mono text-xs uppercase tracking-wider text-muted` |
| Badge | `font-mono text-[11px] uppercase tracking-wider text-accent-soft` |

**Ênfase** = peso ou cor do acento (ex.: o `&` do cargo em `accent`). Sem itálico, sem serifa, sem sublinhado decorativo.

## Superfícies — neomorfismo leve

Luz vinda do canto **superior esquerdo**: sombra escura para baixo/direita, brilho quase imperceptível para cima/esquerda e um filete de luz no topo.

| Token | Valor | Uso |
| --- | --- | --- |
| `shadow-raised` | `6px 6px 16px rgb(0 0 0/.42), -4px -4px 12px rgb(255 255 255/.025), inset 0 1px 0 rgb(255 255 255/.04)` | Cards, chips, botões, ícones sociais |
| `shadow-raised-lg` | `10px 10px 28px rgb(0 0 0/.5), -6px -6px 18px rgb(255 255 255/.03), inset 0 1px 0 rgb(255 255 255/.05)` | Hover de card, foto, bloco de contato |
| `shadow-inset` | `inset 3px 3px 7px rgb(0 0 0/.5), inset -2px -2px 6px rgb(255 255 255/.03)` | Eyebrows, toggles, poços, estado `active` de botão |

- Aplicar em elementos interativos e cards. Texto corrido e seções continuam **planos**.
- Interação: repouso `raised` → hover `raised-lg` (+ `-translate-y-0.5` em cards) → clique `inset`.
- Sem bordas visíveis em cards: a separação vem da sombra.

## Forma e espaço

- **Raios:** `rounded-full` (botões, chips, pills, ícones), `rounded-xl` (poços internos), `rounded-2xl` (cards), `rounded-[2rem]` (blocos de destaque: foto, contato; imagem interna `1.6rem`).
- **Container:** `max-w-6xl mx-auto px-4 sm:px-8`. Seções `py-20`; hero `pt-28 md:pt-36 pb-20`.
- **Cards:** `p-6 sm:p-8`; grids com `gap-6`; chips com `gap-2`/`gap-2.5`.
- **Marcador:** ponto `h-1.5 w-1.5 rounded-full bg-accent` antes de eyebrows; na timeline, anel `border-2 border-accent` que preenche no hover.
- Seções numeradas `01`, `02`, … em eyebrow mono `accent-soft` sobre pill `shadow-inset`.

## Componentes de referência

```html
<!-- Botão primário -->
<a class="rounded-full bg-accent-deep px-6 py-3 text-sm font-semibold text-white shadow-raised transition-[filter,box-shadow] hover:brightness-110 active:shadow-inset">…</a>

<!-- Botão secundário -->
<a class="rounded-full bg-surface px-6 py-3 text-sm font-semibold text-paper shadow-raised transition-[color,box-shadow] hover:text-accent active:shadow-inset">…</a>

<!-- Eyebrow -->
<p class="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 font-mono text-xs text-accent-soft shadow-inset">
  <span aria-hidden="true" class="h-1.5 w-1.5 rounded-full bg-accent"></span>01
</p>

<!-- Card -->
<article class="rounded-2xl bg-surface p-6 shadow-raised transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-raised-lg sm:p-8">…</article>

<!-- Chip de tecnologia (ícone monocromático, cor da marca no hover) -->
<span class="group inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 font-mono text-xs text-muted shadow-raised hover:text-paper">
  <svg class="h-3.5 w-3.5 fill-current group-hover:text-(--brand)" style="--brand:#3178C6">…</svg>TypeScript
</span>

<!-- Ícone social -->
<a class="grid h-10 w-10 place-items-center rounded-full bg-surface text-muted shadow-raised transition-[color,box-shadow] hover:text-accent active:shadow-inset">…</a>

<!-- Toggle segmentado (idioma) -->
<div class="flex gap-0.5 rounded-full bg-surface p-1 shadow-inset">
  <button class="rounded-full bg-raised px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-paper shadow-raised">en</button>
  <button class="rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-faint hover:text-paper">fr</button>
</div>
```

**Ícones:** sociais em SVG inline 18 px `currentColor`; logos de tecnologia via `simple-icons` (CC0), monocromáticos em `muted` e com a cor oficial da marca no hover — marcas quase pretas (luminância < 0,06) usam `paper` no hover; Angular usa `#DD0031`.

## Movimento

- Entrada: `animate-rise` — 0,8 s `cubic-bezier(0.2, 0.7, 0.2, 1)`, de `opacity 0 / translateY(16px)` para o lugar. Só em `motion-safe:`.
- Transições de hover 150–300 ms em cor, sombra e `translate`. Nada de bounce ou parallax.
- `scroll-behavior: smooth` com `scroll-padding-top: 5rem` (header fixo).
- `prefers-reduced-motion: reduce` zera animações e transições.

## Acessibilidade

- Foco visível: `outline 2px solid accent`, `offset 3px`.
- Contraste AA conforme a tabela acima. Ícones decorativos com `aria-hidden`, links só-ícone com `sr-only`.
- Imagens de pessoa com `alt` descritivo; um `h1` por página.

## Fazer / Não fazer

| Fazer | Não fazer |
| --- | --- |
| Grafite + um azul | Segunda cor de acento, verde/roxo/laranja de enfeite |
| Ênfase por peso e `accent` | Itálico, serifas, texto em gradiente |
| Sombras neomórficas sutis em cards e controles | Neomorfismo em tudo, bordas grossas, glassmorphism pesado |
| `accent-deep` atrás de texto branco | Texto branco sobre `accent` |
| Mono para metadados em caixa alta | Mono em parágrafos |
| Muito espaço negativo | Cards colados, densidade de dashboard |

## Tokens (Tailwind v4)

Cole no CSS global logo depois de `@import "tailwindcss";`. Gera utilitários como `bg-ink`, `text-accent-soft`, `shadow-raised`, `font-display`, `animate-rise`. Use também `<meta name="theme-color" content="#1c1c1e">` e o `<link>` do Google Fonts da seção Tipografia.

```css
@theme {
  /* Neutros grafite */
  --color-ink: #1c1c1e;
  --color-surface: #232326;
  --color-raised: #2a2a2d;
  --color-line: #383838;
  --color-paper: #f2f3f5;
  --color-muted: #a3a7ad;
  /* #737373 da logo não passa AA sobre ink; tom levemente mais claro */
  --color-faint: #8e8e93;

  /* Acento azul da logo */
  --color-accent: #3986ff;
  --color-accent-soft: #488fff;
  /* Fundo de botões com texto branco (contraste AA) */
  --color-accent-deep: #2563d9;

  --font-display: "Outfit", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "DM Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  /* Neomorfismo leve: luz do canto superior esquerdo */
  --shadow-raised:
    6px 6px 16px rgb(0 0 0 / 0.42), -4px -4px 12px rgb(255 255 255 / 0.025),
    inset 0 1px 0 rgb(255 255 255 / 0.04);
  --shadow-raised-lg:
    10px 10px 28px rgb(0 0 0 / 0.5), -6px -6px 18px rgb(255 255 255 / 0.03),
    inset 0 1px 0 rgb(255 255 255 / 0.05);
  --shadow-inset:
    inset 3px 3px 7px rgb(0 0 0 / 0.5), inset -2px -2px 6px rgb(255 255 255 / 0.03);

  --animate-rise: rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
  }

  body {
    background-color: var(--color-ink);
    color: var(--color-muted);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background-color: color-mix(in oklab, var(--color-accent) 40%, transparent);
    color: var(--color-paper);
  }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

## Prompt para agents

Bloco compacto para colar no system prompt / instruções de um agent.

```text
Você segue a identidade visual de Leno Borges.

ESTÉTICA: moderno, sólido, levemente neomórfico. Tema escuro sempre. Base grafite neutra + UM acento azul (da logo). Sóbrio, técnico, muito espaço negativo.

CORES (Tailwind v4 @theme, ver seção Tokens):
- ink #1C1C1E (fundo) · surface #232326 (cards) · raised #2A2A2D (ativo) · line #383838 (bordas)
- paper #F2F3F5 (títulos) · muted #A3A7AD (corpo) · faint #8E8E93 (metadados)
- accent #3986FF (ênfase grande, foco, marcadores) · accent-soft #488FFF (texto pequeno azul) · accent-deep #2563D9 (fundo de botão com texto branco)
- Azul ≤ 3% da tela. Nunca texto branco sobre accent; nunca faint sobre raised; texto azul pequeno = accent-soft.

TIPOGRAFIA: Outfit 500–700 (títulos, nome, métricas, tracking-tight) · DM Sans 400–700 (corpo, leading-relaxed) · JetBrains Mono 400–500 (eyebrows, datas, rótulos em caixa alta com tracking largo). Ênfase só por peso ou cor do accent — sem itálico, serifa ou texto em gradiente.

SUPERFÍCIES: luz do canto superior esquerdo.
- shadow-raised: 6px 6px 16px rgb(0 0 0/.42), -4px -4px 12px rgb(255 255 255/.025), inset 0 1px 0 rgb(255 255 255/.04)
- shadow-raised-lg: 10px 10px 28px rgb(0 0 0/.5), -6px -6px 18px rgb(255 255 255/.03), inset 0 1px 0 rgb(255 255 255/.05)
- shadow-inset: inset 3px 3px 7px rgb(0 0 0/.5), inset -2px -2px 6px rgb(255 255 255/.03)
Cards = bg-surface rounded-2xl shadow-raised, sem borda; hover shadow-raised-lg + -translate-y-0.5; active shadow-inset. Texto corrido e seções ficam planos.

FORMA: botões/chips rounded-full; cards rounded-2xl; poços internos rounded-xl bg-ink/40 shadow-inset; blocos de destaque rounded-[2rem]. Container max-w-6xl px-4 sm:px-8, seções py-20.

COMPONENTES-CHAVE:
- Botão primário: rounded-full bg-accent-deep px-6 py-3 text-sm font-semibold text-white shadow-raised hover:brightness-110 active:shadow-inset
- Botão secundário: rounded-full bg-surface text-paper shadow-raised hover:text-accent
- Eyebrow: pill bg-surface shadow-inset font-mono text-xs text-accent-soft com ponto h-1.5 w-1.5 bg-accent; seções numeradas 01, 02…
- Chips de tecnologia: logo monocromática (simple-icons) em muted, cor oficial da marca no hover.

MOVIMENTO: entrada rise 0.8s cubic-bezier(0.2,0.7,0.2,1) (fade + translateY 16px), hovers 150–300ms, respeitar prefers-reduced-motion.

ACESSIBILIDADE: contraste WCAG AA; foco = outline 2px accent offset 3px; ícones decorativos aria-hidden.

LOGO: monograma "LB" azul em gradiente #488FFF→#3986FF (diagonal), proporção 619:544. Arquivos em logo/. Não recolorir, distorcer nem pôr sombra externa; respiro mínimo de 1/4 da altura; < 24px usar logo-flat.svg; uma cor = logo-mono.svg.
```

## Manutenção

A fonte de verdade do site é `src/styles.css`. Ao mudar um token lá, atualize a seção Tokens, a tabela de contraste e o prompt para agents deste arquivo.
