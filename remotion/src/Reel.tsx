import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import type { Caption } from "@remotion/captions";
import words from "./data/words.json";
import subs from "./data/subs.json";
import { Captions, type SubtitleSegment } from "./Captions";
import {
  CertsVsProof,
  Decoration,
  Drivers,
  EndCard,
  GetNothing,
  Hook,
  InternshipFlow,
  JuniorMyth,
  MarketTimeline,
  NoContact,
  RealProjects,
  TenThousand,
  Verdict,
  Visibility,
} from "./Inserts";
import { Sfx } from "./Sfx";
import { C, FPS, rise } from "./theme";

// "Meu filme 2" — first job in IT. All times in seconds on the jump-cut timeline (base.mp4).
export const BASE_DURATION = 158.7;
// the last panel holds a moment after the voice ends, then the end card
const TAIL = 0.8;
export const END_CARD = 2.5;
export const TOTAL_SECONDS = BASE_DURATION + TAIL + END_CARD;

// Framing alternates at every jump cut and at phrase starts (at most every ~2.5 s)
const CUTS = [
  0.03, 2.5, 6.83, 11.38, 13.93, 19.24, 22.84, 27.14, 28.43, 32.96, 37.16, 40.83, 44.2, 47.42, 50.67, 55.76, 60.12, 63.77, 66.28, 71.17, 73.3, 78.13, 80.3, 83.55, 87.87, 92.54, 96.48, 100.4, 104.86, 109.58, 112.03, 116.0, 122.0, 123.73, 126.44, 130.48, 133.47, 135.5, 138.49, 141.43, 143.97, 146.7, 149.21, 153.89,
];
// Punch-ins on emphasis phrases
const PUNCH: [number, number][] = [
  [0.08, 2.42], // hook
  [10.73, 11.43], // "crachá"
  [27.18, 28.2], // "e não conseguia a primeira vaga"
  [31.99, 32.79], // "que eu tive também"
  [42.42, 43.92], // "prática comum, né?"
  [53.65, 55.25], // "disputando espaço"
  [109.62, 111.92], // callback: "se você não é visto, você não tem vaga"
  [122.45, 123.3], // "Cara, é o ideal"
  [145.72, 146.43], // "É o ideal"
  [151.06, 153.56], // "teorias da conspiração"
];

const INSERTS: { from: number; to: number; el: React.ReactNode }[] = [
  { from: 13.98, to: 22.63, el: <Drivers /> },
  { from: 32.99, to: 40.59, el: <CertsVsProof /> },
  { from: 44.25, to: 51.65, el: <NoContact /> },
  { from: 55.78, to: 63.31, el: <TenThousand /> },
  { from: 63.83, to: 73.17, el: <JuniorMyth /> },
  { from: 73.36, to: 79.87, el: <Verdict /> },
  { from: 80.46, to: 95.17, el: <MarketTimeline /> },
  { from: 96.53, to: 106.61, el: <InternshipFlow /> },
  { from: 112.71, to: 121.84, el: <Visibility /> },
  { from: 123.82, to: 135.22, el: <Decoration /> },
  { from: 135.56, to: 143.7, el: <RealProjects /> },
  { from: 153.92, to: BASE_DURATION + TAIL, el: <GetNothing /> },
];

const EMPHASIS = [
  "seen",
  "certificates",
  "proof",
  "nothing",
  "junior",
  "ai",
  "internship",
  "bootcamp",
  "hackathon",
  "visibility",
  "projects",
  "network",
];

const f = (s: number) => Math.round(s * FPS);

const Presenter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const seg = CUTS.filter((c) => t >= c).length;
  const base = seg % 2 === 1 ? 1.06 : 1;
  const punch = PUNCH.reduce((acc, [a, b]) => {
    const p = interpolate(t, [a, a + 0.2, b - 0.1, b], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: rise });
    return Math.max(acc, p);
  }, 0);
  const scale = base + (1.14 - base) * punch;
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 56%" }}>
      <Video src={staticFile("base.mp4")} />
    </AbsoluteFill>
  );
};

export const Reel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Sequence durationInFrames={f(BASE_DURATION + TAIL)}>
        <Sequence durationInFrames={f(BASE_DURATION)} layout="none">
          <Presenter />
        </Sequence>
        {/* veil behind the captions, bottom to top */}
        <AbsoluteFill style={{ background: `linear-gradient(to top, ${C.ink}CC 0%, ${C.ink}99 25%, ${C.ink}00 50%)` }} />
        <Sequence durationInFrames={f(2.4)}>
          <Hook />
        </Sequence>
        {INSERTS.map((i) => (
          <Sequence key={i.from} from={f(i.from)} durationInFrames={f(i.to) - f(i.from)}>
            {i.el}
          </Sequence>
        ))}
        {/* riser ends on the 10,000 impact; thud on the hook callback */}
        <Sfx name="riser" at={56.88 - 1.4} />
        <Sfx name="thud" at={109.62} volume={0.8} />
        <Captions words={words as Caption[]} emphasis={EMPHASIS} secondary={subs as SubtitleSegment[]} blocks />
      </Sequence>
      <Sequence from={f(BASE_DURATION + TAIL)} durationInFrames={f(END_CARD)}>
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
