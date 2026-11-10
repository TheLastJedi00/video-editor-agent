import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { body, L, SHADOW } from "./identity";

// One phrase block in both languages (IDIOMA_RULES.md). `main` overrides the edit's main language
// for this block, e.g. an example sentence the presenter speaks in the other language.
export type Lang = "en" | "pt";
export type AulaSub = { startMs: number; endMs: number; en: string; pt: string; main?: Lang };

const FADE = 150;
const BRIDGE = 600; // blocks closer than this keep the card on screen between them

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Discreet Aula caption: main line plus the subtler secondary line, in one card of the identity
export const AulaCaptions: React.FC<{
  subs: AulaSub[];
  main: Lang;
  centerX: number;
  maxWidth: number;
  bottom?: number;
  size?: number; // main line px; the secondary line is ~70% of it
}> = ({ subs, main, centerX, maxWidth, bottom = 40, size = 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const i = subs.findIndex((s) => ms >= s.startMs && ms < s.endMs);
  const cur = subs[i];
  if (!cur) {
    return null;
  }
  const lang = cur.main ?? main;
  const first = cur[lang];
  const second = cur[lang === "en" ? "pt" : "en"];
  const prev = subs[i - 1];
  const next = subs[i + 1];
  const joinedIn = prev && cur.startMs - prev.endMs < BRIDGE;
  const joinedOut = next && next.startMs - cur.endMs < BRIDGE;
  const textOpacity = interpolate(ms, [cur.startMs, cur.startMs + FADE, cur.endMs - FADE, cur.endMs], [0, 1, 1, 0], clamp);
  const cardOpacity = interpolate(
    ms,
    [cur.startMs, cur.startMs + FADE, cur.endMs - FADE, cur.endMs],
    [joinedIn ? 1 : 0, 1, 1, joinedOut ? 1 : 0],
    clamp,
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: centerX - maxWidth / 2,
        width: maxWidth,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: cardOpacity,
          background: L.captionBg,
          border: `1px solid ${L.captionBorder}`,
          borderRadius: L.radius,
          boxShadow: SHADOW,
          padding: `${Math.round(size * 0.3)}px 30px ${Math.round(size * 0.35)}px`,
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ opacity: textOpacity }}>
          <div
            style={{
              fontFamily: body,
              fontWeight: 600,
              fontSize: size,
              lineHeight: 1.25,
              color: L.text,
              maxWidth: Math.max(900, maxWidth - 60),
              margin: "0 auto",
            }}
          >
            {first}
          </div>
          {second && <div
            style={{
              fontFamily: body,
              fontWeight: 500,
              fontSize: Math.round(size * 0.7),
              lineHeight: 1.3,
              color: L.text,
              opacity: 0.8,
              maxWidth: Math.max(900, maxWidth - 60),
              margin: `${Math.round(size * 0.25)}px auto 0`,
            }}
          >
            {second}
          </div>}
        </div>
      </div>
    </div>
  );
};
