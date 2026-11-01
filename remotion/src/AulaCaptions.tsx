import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { archivo, L, SHADOW } from "./ligaDev";

// One phrase block: main (translated) line + secondary (spoken) line, IDIOMA_RULES.md
export type AulaSub = { startMs: number; endMs: number; en: string; pt: string };

const FADE = 150;
const BRIDGE = 600; // blocks closer than this keep the card on screen between them

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Discreet Aula caption in a Liga Dev white card: English main line, pt-BR secondary line inside it
export const AulaCaptions: React.FC<{ subs: AulaSub[]; centerX: number; maxWidth: number }> = ({
  subs,
  centerX,
  maxWidth,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const i = subs.findIndex((s) => ms >= s.startMs && ms < s.endMs);
  const cur = subs[i];
  if (!cur) {
    // between two close blocks: keep the empty card out, nothing to show
    return null;
  }
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
        bottom: 40,
        left: centerX - maxWidth / 2,
        width: maxWidth,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: cardOpacity,
          background: "rgba(255,255,255,0.96)",
          border: `1px solid ${L.cardBorder}`,
          borderRadius: 24,
          boxShadow: SHADOW,
          padding: "14px 30px 16px",
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ opacity: textOpacity }}>
          <div
            style={{
              fontFamily: archivo,
              fontWeight: 600,
              fontSize: 40,
              lineHeight: 1.25,
              color: L.text,
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {cur.en}
          </div>
          <div
            style={{
              marginTop: 12,
              fontFamily: archivo,
              fontWeight: 500,
              fontSize: 28,
              lineHeight: 1.3,
              color: L.text2,
              maxWidth: 900,
              margin: "12px auto 0",
            }}
          >
            {cur.pt}
          </div>
        </div>
      </div>
    </div>
  );
};
