import { Easing, interpolate } from "remotion";
import { loadFont as loadSora } from "@remotion/google-fonts/Sora";
import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Liga Dev identity (VISUAL_RULES.md, option 3; visual-id/liga-dev.md)
export const L = {
  card: "#ffffff",
  cardBorder: "rgba(16,24,40,.08)",
  chip: "#dce8fb",
  chipLight: "#eef4ff",
  chipBorder: "#b6c3da",
  text: "#101828",
  text2: "#55617a",
  accentText: "#1f5fe0",
  accent: "#3986ff",
  violet: "#7c5cff",
  dark: "#101828",
  darkText: "#eef4ff",
  success: "#2f9e44",
  error: "#c0392b",
};

export const BG =
  "radial-gradient(120% 120% at 70% 0%, #e9f1ff 0%, #f4f7fc 45%, #ffffff 100%)";
export const AURORA =
  "radial-gradient(40% 50% at 85% 20%, rgba(72,143,255,.42) 0%, rgba(72,143,255,0) 100%), radial-gradient(40% 50% at 95% 85%, rgba(124,92,255,.3) 0%, rgba(124,92,255,0) 100%)";

export const SHADOW = "0 20px 45px -18px rgba(16,24,40,.32)";
export const GLOW = "0 18px 40px -16px rgba(57,134,255,.55)";
export const TITLE_GRADIENT = "linear-gradient(90deg, #3986ff 0%, #7c5cff 100%)";

export const sora = loadSora("normal", { weights: ["700"], subsets: ["latin", "latin-ext"] }).fontFamily;
export const archivo = loadArchivo("normal", { weights: ["500", "600"], subsets: ["latin", "latin-ext"] }).fontFamily;
export const mono = loadMono("normal", { weights: ["500", "700"], subsets: ["latin", "latin-ext"] }).fontFamily;

// Motion: 120 / 200 / 320 ms, cubic-bezier(0.16, 1, 0.3, 1); exits accelerate
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// 0 → 1 entrance progress starting at `at` (seconds)
export const enter = (t: number, at: number, dur = 0.32) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing: ease });

// "Pop" entrance scale 0.94 → 1.02 → 1
export const pop = (t: number, at: number) =>
  interpolate(t, [at, at + 0.2, at + 0.32], [0.94, 1.02, 1], clamp);

export const exitP = (t: number, end: number, dur = 0.25) =>
  interpolate(t, [end - dur, end], [1, 0], { ...clamp, easing: easeIn });
