import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import type { Caption } from "@remotion/captions";
import words from "./data/words.json";
import { Captions } from "./Captions";
import { EndCard, Hook, Majority, NoMaterial, Producers, Seniority } from "./Inserts";
import { C, FPS, rise } from "./theme";

// All times in seconds on the jump-cut timeline (base.mp4)
export const BASE_DURATION = 45.3;
export const END_CARD = 2;
export const TOTAL_SECONDS = BASE_DURATION + END_CARD;

// Ends of the kept segments: framing alternates at every jump cut
const CUTS = [6.8, 10.35, 12.19, 14.75, 16.97, 23.68, 26.44, 29.98, 34.94, 38.5];
// Punch-ins on emphasis phrases
const PUNCH: [number, number][] = [
  [9.85, 10.35], // "evoluir"
  [21.55, 23.6], // "eles até existem, tá?"
  [41.95, 42.95], // "não tem pra onde fugir"
  [44.15, 45.3], // "aprender inglês"
];

const INSERTS: { from: number; to: number; el: React.ReactNode }[] = [
  { from: 12.24, to: 16.97, el: <Seniority /> },
  { from: 16.97, to: 21.55, el: <NoMaterial /> },
  { from: 23.66, to: 30.6, el: <Majority /> },
  { from: 30.6, to: 38.45, el: <Producers /> },
];

const f = (s: number) => Math.round(s * FPS);

const Presenter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const seg = CUTS.filter((c) => t >= c).length;
  const base = seg % 2 === 1 ? 1.07 : 1;
  const punch = PUNCH.reduce((acc, [a, b]) => {
    const p = interpolate(t, [a, a + 0.2, b - 0.1, b], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: rise });
    return Math.max(acc, p);
  }, 0);
  const scale = base + (1.18 - base) * punch;
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 58%" }}>
      <Video src={staticFile("base.mp4")} />
    </AbsoluteFill>
  );
};

export const Reel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Sequence durationInFrames={f(BASE_DURATION)}>
        <Presenter />
        {/* veil behind the captions, bottom to top */}
        <AbsoluteFill style={{ background: `linear-gradient(to top, ${C.ink}CC 0%, ${C.ink}99 25%, ${C.ink}00 50%)` }} />
        <Sequence durationInFrames={f(6.85)}>
          <Hook />
        </Sequence>
        {INSERTS.map((i) => (
          <Sequence key={i.from} from={f(i.from)} durationInFrames={f(i.to) - f(i.from)}>
            {i.el}
          </Sequence>
        ))}
        <Captions words={words as Caption[]} emphasis={["inglês", "obrigatório", "senioridade", "português", "evoluir"]} />
      </Sequence>
      <Sequence from={f(BASE_DURATION)} durationInFrames={f(END_CARD)}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
