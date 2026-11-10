import { Easing, interpolate } from "remotion";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// BF Academy identity, dark tuning for video (VISUAL_RULES.md, option 1; visual-id/bf-academy.md).
// Same token shape as ligaDev.ts, so identity.ts can swap one for the other.
export const L = {
  card: "#2b1f2e", // --bf-surface (dark)
  cardBorder: "rgba(255,255,255,.12)", // --bf-border
  chip: "#3a2a3d", // --bf-surface-2
  chipLight: "rgba(220,172,68,.14)", // accent at 14%
  chipBorder: "rgba(255,255,255,.16)",
  text: "#f4eef5",
  text2: "#bca6c0",
  accentText: "#dcac44",
  accent: "#dcac44",
  violet: "#9b7fa0",
  dark: "#1a121c",
  darkText: "#f4eef5",
  success: "#86efac",
  error: "#fca5a5",
  // strong chip / CTA: gold gradient with dark purple text
  strongBg: "linear-gradient(90deg, #dcac44 0%, #eeddba 100%)",
  strongText: "#271c29",
  // code blocks
  codePrompt: "#9b7fa0",
  codeHl: "rgba(220,172,68,.2)",
  codeIcon: "#e5be6b",
  codeLabel: "#bca6c0",
  // captions: text on the dark veil
  captionBg: "rgba(10,6,11,.75)",
  captionBorder: "rgba(255,255,255,.08)",
  presenterShadow: "0,0,0",
  radius: 20,
};

export const BG = "linear-gradient(135deg, #1a121c 0%, #2e1f33 100%)"; // --bf-shell (dark)
export const AURORA =
  "radial-gradient(45% 55% at 88% 18%, rgba(122,88,128,.45) 0%, rgba(122,88,128,0) 100%), radial-gradient(40% 50% at 96% 90%, rgba(196,146,42,.3) 0%, rgba(196,146,42,0) 100%)";

export const SHADOW = "0 1px 2px rgba(0,0,0,.45), 0 22px 48px -16px rgba(0,0,0,.65)";
export const GLOW = "0 0 44px -10px rgba(220,172,68,.28)"; // --bf-elev-glow
export const TITLE_GRADIENT = "linear-gradient(90deg, #dcac44 0%, #eeddba 100%)"; // gold, keyword in titles
export const BRAND_GRADIENT = "linear-gradient(90deg, #9b7fa0 0%, #dcac44 100%)"; // signature

export const display = loadOutfit("normal", { weights: ["600", "700"], subsets: ["latin", "latin-ext"] }).fontFamily;
export const body = loadInter("normal", { weights: ["500", "600"], subsets: ["latin", "latin-ext"] }).fontFamily;
// BF Academy lists no monospace font: labels and eyebrows use Inter
export const mono = body;

// Motion: 150 / 250 / 400 ms; enter cubic-bezier(0.16, 1, 0.3, 1), exit cubic-bezier(0.7, 0, 0.84, 0)
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const enter = (t: number, at: number, dur = 0.25) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing: ease });

// Entrance scale: settles 0.96 → 1 with ease-out (BF keeps the spring for highlights only)
export const pop = (t: number, at: number) => interpolate(t, [at, at + 0.25], [0.96, 1], { ...clamp, easing: ease });

// Spring for confirmations and highlights (an answer revealed), never for exits
export const spring = (t: number, at: number) =>
  interpolate(t, [at, at + 0.4], [0.9, 1], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) });

export const exitP = (t: number, end: number, dur = 0.15) =>
  interpolate(t, [end - dur, end], [1, 0], { ...clamp, easing: easeIn });
