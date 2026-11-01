import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { AulaCaptions } from "./AulaCaptions";
import { AULA_DURATION, AULA_INSERTS, AULA_SUBS } from "./AulaEdit";
import { InsertCtx } from "./AulaKit";
import { AURORA, BG, ease } from "./ligaDev";

// Aula composition (VIDEO_RULES.md, model 1): the presenter plus one infographic at a time.
// Generic layout; the per-video timeline, inserts and captions come from AulaEdit.tsx.
export const AULA_FPS = 30;
export { AULA_DURATION };

const INSERTS = AULA_INSERTS;

// The presenter shrinks while any insert is on; inserts less than 1.5 s apart share one layout span
const SPANS = INSERTS.reduce<[number, number][]>((acc, { from, to }) => {
  const last = acc[acc.length - 1];
  if (last && from - last[1] < 1.5) last[1] = Math.max(last[1], to);
  else acc.push([from, to]);
  return acc;
}, []);

const TRANSITION = 0.4;
const SCALE = 0.6; // presenter at 60% width while an infographic is on
const BOX = { x: 48, y: 96 }; // top-left of the shrunk presenter

export const layoutProgress = (t: number) =>
  SPANS.reduce((acc, [a, b]) => {
    const end = b >= AULA_DURATION - 0.01 ? b + 1 : b;
    const p = interpolate(t, [a, a + TRANSITION, end - TRANSITION, end], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    });
    return Math.max(acc, p);
  }, 0);

const f = (s: number) => Math.round(s * AULA_FPS);

const Presenter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = layoutProgress(frame / fps);
  const scale = 1 + (SCALE - 1) * p;
  return (
    <AbsoluteFill
      style={{
        transform: p > 0 ? `translate(${BOX.x * p}px, ${BOX.y * p}px) scale(${scale})` : "none",
        transformOrigin: "0 0",
        borderRadius: (24 / SCALE) * p,
        overflow: "hidden",
        boxShadow: p > 0 ? `0 ${30 * p}px ${70 * p}px -20px rgba(16,24,40,${0.35 * p})` : "none",
      }}
    >
      <Video src={staticFile("aula_base.mp4")} style={{ width: "100%", height: "100%" }} />
    </AbsoluteFill>
  );
};

export const Aula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = layoutProgress(frame / fps);
  return (
    <AbsoluteFill style={{ background: BG }}>
      <AbsoluteFill style={{ background: AURORA }} />
      <Presenter />
      {INSERTS.map((i) => (
        <Sequence key={i.from} from={f(i.from)} durationInFrames={f(i.to) - f(i.from)} layout="none">
          <InsertCtx.Provider value={{ from: i.from, to: i.to }}>{i.el}</InsertCtx.Provider>
        </Sequence>
      ))}
      {/* full frame: centred at the bottom; with a panel: centred under the shrunk presenter */}
      <AulaCaptions subs={AULA_SUBS} centerX={960 + (BOX.x + 960 * SCALE - 960) * p} maxWidth={1240 - 140 * p} />
    </AbsoluteFill>
  );
};
