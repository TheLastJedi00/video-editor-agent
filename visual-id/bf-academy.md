# Identidade Visual — BF Academy
[Logo](./bf-academy.svg)

Retrato da identidade visual da plataforma depois da padronização da spec 031 (2026-10-26). A fonte
da verdade é `fariasbarbara/src/styles.css`; os componentes do kit ficam em `src/app/shared/`. Este
texto também é a origem da **identidade de arte** que a página Campanha guarda no banco
(`barbarafarias-api/src/brand-studio/default-identity.ts`).

---

## 1. Princípios

- **Roxo é primary, dourado é accent.** O par existe em duas afinações: o tema claro usa a versão
  mais **escura** do gradiente (contraste sobre fundo claro); o escuro, a mais **clara**.
- **Componentes leem tokens semânticos (`--bf-*`), nunca hex nem paleta crua do Tailwind.** O
  `ThemeService` grava `data-theme="light|dark"` no `<html>` (persistido em `localStorage` sob
  `bf-theme`) e atualiza o `<meta name="theme-color">` (`#F8F5F9` / `#1A121C`).
- **Fixos nos dois temas, de propósito:** o dourado de marca dos CTAs (`.bf-cta-gold`,
  `.bf-chip-gold`), o texto sobre preenchimento sólido (`--bf-text-on-solid`), o fundo de conteúdo
  de terceiros (`--bf-third-party-bg`) e os painéis de marca da landing (escala `bf-purple-*`).
- **Movimento só por token.** Duração e curva vêm de `--bf-duration-*` / `--bf-ease-*`.
- **Hover muda a cor, nunca o tamanho; o clique afunda** em `--bf-active-scale`.
- **Mobile-first**, colunas antes de linhas, alvo de toque mínimo de **44px**.

---

## 2. Tipografia

| Papel | Fonte | Classe | Observação |
|---|---|---|---|
| Display (títulos) | **Outfit** 300–800 | `.font-display` | `letter-spacing: -0.02em` |
| Corpo / UI | **Inter** 300–800 | `.font-body` | padrão do `body`, com antialiasing |
| Legado | — | `.font-playfair` → display, `.font-jakarta` → body | aliases; código novo usa os papéis novos |

Títulos de página (`app-page-shell`) usam `font-display` + `.text-gradient-gold`, 2.25rem (3rem a
partir de `md`), `letter-spacing: -0.03em`, peso 700.

- `.text-gradient-gold` → `--bf-gradient-accent` recortado no texto.
- `.text-gradient-brand` → `--bf-gradient` (roxo → dourado) recortado no texto.

---

## 3. Paleta de marca (escalas em `@theme`)

Geram classes Tailwind (`bg-bf-purple-900`, `text-bf-gold-400`…). Use a escala **só** onde a cor é
fixa de propósito (painel de marca, marcador); no resto, os tokens semânticos da seção 4.

### Roxo (`--color-bf-purple-*`)

| 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#f8f5f9` | `#eee7ef` | `#d9ccdc` | `#bca6c0` | `#9b7fa0` | `#7a5880` | `#634768` | `#503357` | `#3a2a3d` | `#271c29` | `#1a121c` |

### Dourado (`--color-bf-gold-*`)

| 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|
| `#faf4e7` | `#f4e9cf` | `#eeddba` | `#e5be6b` | `#dcac44` | `#c4922a` | `#a87c21` | `#8b661b` | `#6b4f14` |

---

## 4. Tokens semânticos

### Superfície, texto e marca (por tema)

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--bf-bg` | `#f8f5f9` | `#1a121c` | fundo do `body` |
| `--bf-surface` | `#ffffff` | `#2b1f2e` | cards, modais |
| `--bf-surface-2` | `#f2edf3` | `#3a2a3d` | segundo nível: campos, botão secundário, blocos de código |
| `--bf-border` | `#e0d8e2` | `rgba(255,255,255,.12)` | bordas e divisórias |
| `--bf-overlay` | `rgba(26,18,28,.7)` | `rgba(10,6,11,.75)` | véu de modais, menu, loading e capas |
| `--bf-text-on-overlay` | `#ffffff` | `#ffffff` | texto e spinner sobre o véu |
| `--bf-text` | `#271c29` | `#f4eef5` | texto principal |
| `--bf-text-muted` | `#634768` | `#bca6c0` | texto secundário, placeholder (70%) |
| `--bf-primary` | `#271c29` | `#bca6c0` | botões roxos, badge da gerente |
| `--bf-primary-hover` | `#3a2a3d` | `#d9ccdc` | hover dos botões roxos |
| `--bf-text-on-primary` | `#ffffff` | `#1a121c` | |
| `--bf-accent` | `#a87c21` | `#dcac44` | foco de campo, hora da agenda, estrelas, bordas de destaque |
| `--bf-accent-hover` | `#8b661b` | `#e5be6b` | |
| `--bf-text-on-accent` | `#271c29` | `#1a121c` | |
| `--bf-link` / `--bf-link-hover` | purple-600 / purple-800 | purple-300 / purple-200 | ação secundária em texto |
| `--bf-hover` | `--bf-text` a 7% | (idem) | camada de hover: escurece no claro, clareia no escuro |

### Fixos nos dois temas

| Token / classe | Valor | Uso |
|---|---|---|
| `--bf-text-on-solid` | `#ffffff` | texto sobre preenchimento sólido de cor (botão de perigo, marcador pago, avatar no gradiente) |
| `--bf-third-party-bg` | `#ffffff` | fundo do QR do PIX e do desafio 3-D Secure, desenhados só para fundo claro |
| `.bf-cta-gold` / `.bf-chip-gold` | gold-500 → gold-300, texto purple-900 (7,8:1) | ação principal; chips e barras de progresso douradas |

### Gradientes

| Token | Claro | Escuro |
|---|---|---|
| `--bf-gradient` (assinatura) | `#503357 → #a87c21` | `#9b7fa0 → #dcac44` |
| `--bf-gradient-accent` | `#a87c21 → #c4922a` | `#dcac44 → #eeddba` |
| `--bf-shell` (fundo do app) | `#f8f5f9 ↘ #efe7f1` | `#1a121c ↘ #2e1f33` |
| `--bf-mesh-a` / `--bf-mesh-b` (halos dos heros e da aurora) | purple-300 40% / gold-300 45% | purple-500 45% / gold-600 35% |

### Chrome (header e menu lateral)

| Token | Claro | Escuro |
|---|---|---|
| `--bf-chrome-bg` | `rgba(255,255,255,.72)` (vidro branco) | purple-900 a 85% (vidro roxo) |
| `--bf-chrome-text` | purple-700 | `#f4eef5` |
| `--bf-chrome-border` | `rgba(39,28,41,.1)` | `rgba(255,255,255,.12)` |

O header usa `backdrop-blur-md` sobre o fundo translúcido; altura em `--bf-header-h: 5rem`.

### Status

Quatro peças por status: base (≥ 3:1), `-text` (AA ≥ 4,5:1), `-bg` (base a 14%) e `-border`
(base a 40%), os dois últimos derivados por `color-mix`. **Todo** aviso, selo, ícone de estado e
ponto de status usa estes tokens — nada de `red-*`, `amber-*`, `emerald-*` do Tailwind.

| Status | Base claro | Texto claro | Base escuro | Texto escuro |
|---|---|---|---|---|
| success | `#15803d` | `#166534` | `#22c55e` | `#86efac` |
| warning | `#d97706` | `#92400e` | `#f59e0b` | `#fcd34d` |
| danger | `#c0392b` | `#b42318` | `#e05c4c` | `#fca5a5` |
| info | `#2563eb` | `#1d4ed8` | `#3b82f6` | `#93c5fd` |
| neutral | `#7a5880` | `#634768` | `#bca6c0` | `#d9ccdc` |

Status de aula: `LESSON_STATUS_TONES` (selo) e `LESSON_STATUS_ACCENTS` (cor sólida) em
`models/lesson.model.ts` — agendada → info, concluída → success, falta do aluno / ausência da
professora → danger, cancelada pelo aluno → warning, cancelada → neutral.

Selos do kit: convite → neutral, rascunho de artigo → warning, inadimplência → danger.

### Gráficos (validados para daltonismo)

| Token | Claro | Escuro |
|---|---|---|
| `--bf-chart-teachers` | `#7b4a9e` | `#a063cb` |
| `--bf-chart-infra` | `#c9962b` | `#b98722` |
| `--bf-chart-revenue` | `#0f8a5f` | `#12a06f` |
| `--bf-chart-grid` | `rgba(39,28,41,.1)` | `rgba(255,255,255,.12)` |

### Elevação

Uma escala só, em duas camadas (ambiente + luz direcional); no escuro bem mais opaca.

| Token | Uso |
|---|---|
| `--bf-elev-sm` | atalhos do painel em repouso |
| `--bf-elev-md` (= `--bf-shadow`) | cards, hover de atalhos |
| `--bf-elev-lg` (= `--bf-shadow-lg`) | frames sólidos, cartão de login |
| `--bf-elev-glow` | halo dourado (accent a 22% claro / 28% escuro) |

---

## 5. Componentes e classes do kit

| Peça | Visual |
|---|---|
| `.card` | `--bf-surface`, borda `--bf-border`, `--bf-shadow`, raio 12px |
| `app-frame` (`.bf-frame--surface` / `--glass`) | sólido com `--bf-shadow-lg`, ou vidro (surface a 55%) com borda |
| `app-modal` | véu `--bf-overlay` + `backdrop-blur-sm`, painel `--bf-surface` `rounded-2xl shadow-2xl`, ✕ no canto (44px) |
| Modais de feedback / confirmação / erro | mesmo painel do `app-modal`, ícones com tokens de status |
| `app-fullscreen-loading` | véu `--bf-overlay`, spinner `--bf-text-on-overlay`, título `.text-gradient-gold` |
| `app-button` | variantes `purple`, `purple-sm`, `white`, `red` → classes `.button-*` |
| `.bf-cta-gold` | ação principal, dourado fixo |
| `.bf-btn-secondary` (`--glass`) | Cancelar: `--bf-surface-2`, borda, hover por camada `--bf-hover` |
| `.bf-primary-action`, `.dash-payment-alert__cta` | `--bf-gradient-accent` + `--bf-text-on-accent`, mínimo 44px |
| `.button-dashboard` | atalho do painel: superfície, `elev-sm`, raio 1rem, borda dourada no hover |
| Campos `.bf-field--light` / `--glass` | `surface-2` sólido ou surface a 65%; foco = borda `--bf-accent`; inválido = borda `--bf-danger` |
| Selos (`.bf-badge-*`, `.bf-article-card__status`) | pílula (`999px`), tokens de status, 0.6875rem |
| `.badge-manager` | `--bf-primary` no claro; no escuro, accent a 15% com texto accent |
| `.bf-teacher-avatar` | círculo com `--bf-gradient`, iniciais em Outfit bold, `--bf-text-on-solid` |
| `.bf-skeleton` | text a 8% sobre surface, shimmer de text a 7% |
| `.bf-mesh` / `.bf-aurora` | halos `--bf-mesh-a/b` (estático nos heros, animado no login) |
| Ação destrutiva | outline vermelho com `--bf-danger-*`; preenchida, `--bf-danger` + `--bf-text-on-solid` |
| Painéis de marca da landing (rodapé, depoimento) | `bg-bf-purple-900` com texto `bf-purple-50`/`-300`, fixos |

**Raios:** 0.75rem/12px (botões, cards, campos), 1rem (atalhos, cards de artigo), `rounded-2xl`
(modais, cartão de login), `999px` (selos, avatares, skeleton de linha).

---

## 6. Movimento

### Tokens (`:root`, independentes do tema)

| Token | Valor | Papel |
|---|---|---|
| `--bf-duration-fast` | 150ms | toque, saídas, press, hover de botão |
| `--bf-duration-normal` | 250ms | fades, troca de cor, ripple, entradas pequenas |
| `--bf-duration-slow` | 400ms | slides, bottom sheet, barras de progresso, reveal |
| `--bf-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | entradas e transições de estado — o elemento "chega" |
| `--bf-ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | saídas — o elemento acelera para fora |
| `--bf-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | confirmações e seleções, **nunca saídas** |
| `--bf-active-scale` | 0.96 | afundar do clique |
| `--bf-touch-target` | 44px | alvo mínimo |

O `transition` do Tailwind sem duração explícita também segue os tokens
(`--default-transition-duration` / `--default-transition-timing-function` no `@theme`). Nos
templates: `duration-(--bf-duration-*)`, `ease-(--bf-ease-*)`, `active:scale-(--bf-active-scale)`,
e `transition`/`transition-colors`/`transition-transform` — nunca `transition-all`.

Ficam fora dos tokens só os **laços ambientes e gestos de atenção**, que têm ritmo próprio:
spinners, shimmer, aurora, nudge e o halo pulsante.

### Classes de ciclo de vida

| Classe | Movimento | Uso |
|---|---|---|
| `.animate-enter` | fade + sobe 12px, normal · ease-out | classe comum: avisos, cartões, loading |
| `.animate-leave` | fade-out, fast · ease-in | `animate.leave="animate-leave"` em quem sai do DOM |

### Keyframes globais

Ficam em `styles.css` (e não nos componentes) para atravessar o encapsulamento do `animate.enter`.
As **entradas terminam em `transform: none`**: com `both`, o valor final fica aplicado, e um
`transform` diferente de `none` prenderia o `position: fixed` dos descendentes.

| Classe | Keyframe | Duração · curva | Movimento |
|---|---|---|---|
| `.bf-fade-in` / `.fade-in` | `bf-fade-in` | normal · ease-out | opacidade 0 → 1 |
| `.bf-fade-out` / `.fade-out` | `bf-fade-out` | fast · ease-in | 1 → 0 |
| `.bf-slide-up` | `bf-slide-up` | slow · ease-out | sobe 16px + fade |
| `.bf-slide-down` | `bf-slide-down` | slow · ease-out | desce 16px + fade |
| `.bf-scale-in` / `.pop-in` | `bf-scale-in` | normal · **spring** | 0.94 → 1 + fade |
| `.bf-scale-out` / `.pop-out` | `bf-scale-out` | fast · ease-in | 1 → 0.94 + fade |
| `.bf-sheet-in` | `bf-sheet-in` | slow · ease-out | bottom sheet de `translateY(100%)`, sem fade |
| `.bf-sheet-out` | `bf-sheet-out` | normal · ease-in | volta para baixo |
| `.bf-nudge` / `.dash-payment-alert--nudge` | `bf-nudge` | 600ms · ease-out, atraso 400ms, uma vez | tremor horizontal ±4px → ±2px |
| (inline) | `bf-pulse-glow` | 2s × 6 | halo dourado do CTA quando a sala da aula abre |
| (inline) | `bf-pop` | 320ms · spring | estrela selecionada cresce a 1.35 e assenta |
| `.bf-skeleton::after` | `bf-shimmer` | 1.4s linear infinito | brilho atravessando o placeholder |
| `.bf-slot-spinner` | `bf-slot-spin` | 0.7s linear infinito | spinner do slot da agenda |
| `.bf-aurora::before/::after` | `bf-aurora-drift` | 24s / 32s ease-in-out infinito | deriva lenta dos halos (só `transform`) |

### Onde cada um entra

| Elemento | Entrada | Saída |
|---|---|---|
| `app-modal` | véu `bf-fade-in`, painel `bf-scale-in` | `animate-leave` no conjunto |
| Modais de pagamento | painel `bf-scale-in` | — |
| Modal de aceite jurídico | véu `bf-fade-in`, painel `bf-sheet-in` | — |
| Menu lateral (`app-nav-menu`) | véu fade (normal · ease-out), painel `translateX(1.5rem)` + fade (normal · ease-out) | véu fast · ease-in, painel normal · ease-in |
| `app-fullscreen-loading` | `animate-enter` | — |
| `app-page-shell` | cabeçalho `bf-slide-down`; conteúdo `bf-slide-up` com 80ms de atraso | — |
| Troca de rota | `withViewTransitions`; título com `view-transition-name: page-title` | cross-fade |
| Listas | `appStagger`: `bf-slide-up`, 60ms por item, teto 480ms | — |
| Seções ao rolar | `appReveal`: fade + 24px, slow · ease-out, threshold 0.15 | — |
| Números | `appCountUp`: conta de zero até o valor | — |
| Avisos e erros inline | `animate-enter` | — |

### Transições de estado

| Onde | Comportamento |
|---|---|
| Troca de tema (`.app-shell`, `.card`, `.button-dashboard`, campos) | `background-color`, `color`, `border-color` em normal — desliza em vez de piscar |
| Botões roxos (`.button-purple*`, `.button-return`, back-button, icon-button) | hover → `--bf-primary-hover`; clique → `scale(--bf-active-scale)` |
| Botão de superfície (`.button-white`, `.bf-btn-secondary`, `.bf-hover-layer`) | hover → camada `--bf-hover`; clique afunda |
| Preenchimentos de cor (`.button-red`, `.bf-cta-gold`, `.bf-primary-action`) | hover → `brightness(1.06)`; clique afunda |
| `.bf-pressable` | clique → `scale(--bf-active-scale)`; sem tap highlight, `touch-action: manipulation` |
| `.bf-ripple` | `::after` radial dourado (accent 30%) cresce de 0.4 → 1 no clique |
| `.button-dashboard` / cards de atalho | hover (só `hover: hover`): sobe 2px, `elev-md`, borda accent; ícone cresce em spring |
| `.bf-article-card` | hover sobe 2px + borda accent; clique `scale(.995)` |
| Back-button do page-shell | clique → `translateX(-3px)`, apontando para onde volta |

### Movimento reduzido

- Regra coletiva no fim do `styles.css`: toda classe da cinética e as de ciclo de vida ficam com
  `animation-duration: 1ms` e `animation-delay: 0` (preserva o estado final de quem usa `both`).
- `.bf-pressable` e o ripple vão a 1ms; shimmer e aurora desligam; view transitions viram corte
  seco; a troca de tema perde a transição; o spinner do slot desacelera para 2s.
- `appReveal` consulta `prefers-reduced-motion` em JS (estilo inline vence a `@media`); o nav-menu
  desliga as próprias animações.

---

## 7. Regras de uso

1. Cor de texto/fundo/borda **sempre** por token `--bf-*`. Faltou token: crie em `styles.css` para os
   dois temas (ou nos fixos, se for fixo de propósito) — não resolva com hex no template.
2. Cor fixa de propósito: escala `bf-purple-*`/`bf-gold-*` ou um dos tokens fixos da seção 4, com
   comentário dizendo por quê.
3. Movimento por token; `transition-all` não entra.
4. Hover não muda tamanho; clique afunda em `--bf-active-scale`.
5. Entrada termina em `transform: none`.
6. Status sempre pelos tokens de status, com o texto carregando o significado (cor é reforço).
