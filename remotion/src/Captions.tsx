import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Caption } from "@remotion/captions";
import { C, dmSans, outfit } from "./theme";

type Page = { startMs: number; endMs: number; words: Caption[] };

// Secondary-language line (IDIOMA_RULES.md): one translated phrase per time span
export type SubtitleSegment = { startMs: number; endMs: number; text: string };

const MAX_WORDS = 3;
const MAX_CHARS = 20;

// Group words into pages of 2–4 words, breaking at punctuation and pauses
export const toPages = (words: Caption[]): Page[] => {
  const pages: Page[] = [];
  let cur: Caption[] = [];
  const flush = () => {
    if (cur.length)
      pages.push({
        startMs: cur[0].startMs,
        endMs: cur[cur.length - 1].endMs,
        words: cur,
      });
    cur = [];
  };
  words.forEach((w, i) => {
    const prev = words[i - 1];
    const chars =
      cur.reduce((n, x) => n + x.text.length + 1, 0) + w.text.length;
    if (
      cur.length &&
      (cur.length >= MAX_WORDS ||
        chars > MAX_CHARS ||
        (prev && w.startMs - prev.endMs > 300))
    )
      flush();
    cur.push(w);
    if (/[,.?!]$/.test(w.text) && cur.length >= 2) flush();
  });
  flush();
  // Each page stays until the next one starts
  return pages.map((p, i) => ({
    ...p,
    endMs: pages[i + 1] ? pages[i + 1].startMs : p.endMs + 400,
  }));
};

const clean = (t: string) => t.replace(/[,.:?!]$/, "");

export const Captions: React.FC<{
  words: Caption[];
  emphasis: string[];
  secondary?: SubtitleSegment[];
  // phrase blocks (translated primary): one Caption per block, no active-word highlight
  blocks?: boolean;
}> = ({ words, emphasis, secondary, blocks }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const pages: Page[] = blocks
    ? words.map((w) => ({
        startMs: w.startMs,
        endMs: w.endMs,
        words: w.text.split(" ").map((t) => ({ ...w, text: t })),
      }))
    : toPages(words);
  const page = pages.find((p) => ms >= p.startMs && ms < p.endMs);
  const sub = secondary?.find((s) => ms >= s.startMs && ms < s.endMs);
  if (!page && !sub) return null;
  const subOpacity = sub
    ? interpolate(
        ms,
        [sub.startMs, sub.startMs + 150, sub.endMs - 150, sub.endMs],
        [0, 1, 1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      )
    : 0;

  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-start", alignItems: "center" }}
    >
      {/* the stack grows upward from the safe-area line, so the secondary line sits under the primary */}
      <div
        style={{
          position: "absolute",
          bottom: 340,
          left: 60,
          right: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        {page && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 16px",
              fontFamily: outfit,
              fontWeight: 800,
              fontSize: 76,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            {page.words.map((w, i) => {
              const active =
                !blocks &&
                ms >= w.startMs && ms < Math.max(w.endMs, w.startMs + 120);
              const spoken = ms >= w.startMs;
              const t = (ms - w.startMs) / 150;
              const scale = spoken
                ? interpolate(t, [0, 0.6, 1], [0.9, 1.05, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })
                : 1;
              const key = emphasis.includes(clean(w.text).toLowerCase());
              return (
                <span
                  key={`${w.startMs}-${i}`}
                  style={{
                    display: "inline-block",
                    transform: `scale(${scale})`,
                    color: active || (key && spoken) ? C.blue : C.text,
                    opacity: spoken ? 1 : 0.55,
                    WebkitTextStroke: `7px ${C.ink}`,
                    paintOrder: "stroke fill",
                    textShadow: "0 6px 24px rgba(0,0,0,0.55)",
                  }}
                >
                  {clean(w.text)}
                </span>
              );
            })}
          </div>
        )}
        {sub && (
          <div
            style={{
              opacity: subOpacity * 0.85,
              fontFamily: dmSans,
              fontWeight: 500,
              fontSize: 36,
              lineHeight: 1.2,
              textAlign: "center",
              color: C.text,
              textShadow: `0 2px 10px ${C.ink}, 0 0 4px ${C.ink}`,
              maxWidth: 820,
            }}
          >
            {sub.text}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
