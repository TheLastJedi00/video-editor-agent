import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { C, outfit } from "./theme";

type Page = { startMs: number; endMs: number; words: Caption[] };

const MAX_WORDS = 3;
const MAX_CHARS = 20;

// Group words into pages of 2–4 words, breaking at punctuation and pauses
export const toPages = (words: Caption[]): Page[] => {
  const pages: Page[] = [];
  let cur: Caption[] = [];
  const flush = () => {
    if (cur.length) pages.push({ startMs: cur[0].startMs, endMs: cur[cur.length - 1].endMs, words: cur });
    cur = [];
  };
  words.forEach((w, i) => {
    const prev = words[i - 1];
    const chars = cur.reduce((n, x) => n + x.text.length + 1, 0) + w.text.length;
    if (cur.length && (cur.length >= MAX_WORDS || chars > MAX_CHARS || (prev && w.startMs - prev.endMs > 300))) flush();
    cur.push(w);
    if (/[,.?!]$/.test(w.text) && cur.length >= 2) flush();
  });
  flush();
  // Each page stays until the next one starts
  return pages.map((p, i) => ({ ...p, endMs: pages[i + 1] ? pages[i + 1].startMs : p.endMs + 400 }));
};

const clean = (t: string) => t.replace(/[,.]$/, "");

export const Captions: React.FC<{ words: Caption[]; emphasis: string[] }> = ({ words, emphasis }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const page = toPages(words).find((p) => ms >= p.startMs && ms < p.endMs);
  if (!page) return null;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          bottom: 420,
          left: 80,
          right: 160,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 22px",
          fontFamily: outfit,
          fontWeight: 800,
          fontSize: 116,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        {page.words.map((w) => {
          const active = ms >= w.startMs && ms < Math.max(w.endMs, w.startMs + 120);
          const spoken = ms >= w.startMs;
          const t = (ms - w.startMs) / 150;
          const scale = spoken ? interpolate(t, [0, 0.6, 1], [0.9, 1.05, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
          const key = emphasis.includes(clean(w.text).toLowerCase());
          return (
            <span
              key={w.startMs}
              style={{
                display: "inline-block",
                transform: `scale(${scale})`,
                color: active || (key && spoken) ? C.blue : C.text,
                opacity: spoken ? 1 : 0.55,
                WebkitTextStroke: `10px ${C.ink}`,
                paintOrder: "stroke fill",
                textShadow: "0 6px 24px rgba(0,0,0,0.55)",
              }}
            >
              {clean(w.text)}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
