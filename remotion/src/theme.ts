import { Easing } from "remotion";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadDmSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Leno Borges identity (VISUAL_RULES.md, option 2)
export const C = {
  ink: "#1C1C1E",
  surface: "#232326",
  raised: "#2A2A2D",
  border: "#383838",
  text: "#F2F3F5",
  body: "#A3A7AD",
  meta: "#8E8E93",
  blue: "#3986FF",
  blueSmall: "#488FFF",
  blueBox: "#2563D9",
};

export const outfit = loadOutfit("normal", { weights: ["600", "700", "800"], subsets: ["latin", "latin-ext"] }).fontFamily;
export const dmSans = loadDmSans("normal", { weights: ["500"], subsets: ["latin", "latin-ext"] }).fontFamily;
export const mono = loadMono("normal", { weights: ["500", "700"], subsets: ["latin", "latin-ext"] }).fontFamily;

export const FPS = 30;
export const rise = Easing.bezier(0.2, 0.7, 0.2, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

// Neomorphic card shadow, light from the top-left
export const cardShadow = "-10px -10px 24px rgba(255,255,255,0.03), 14px 14px 32px rgba(0,0,0,0.45)";
