import React from "react";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";

// Sound effect library in public/sfx/ (built by scripts/build_sfx.py). See SFX_RULES.md.
// `gain` is the default volume relative to the voice; every file is peak-normalized to -3 dBFS.
export const SFX = {
  // transitions / whoosh
  whoosh: { file: "whoosh/whoosh.wav", gain: 0.35 },
  whip: { file: "whoosh/whip.wav", gain: 0.35 },
  whooshSoft: { file: "whoosh/soft.wav", gain: 0.18 },
  whooshOut: { file: "whoosh/out.wav", gain: 0.18 },
  pageTurn: { file: "whoosh/page-turn.wav", gain: 0.3 },
  // type writing
  key1: { file: "type/key-1.wav", gain: 0.22 },
  key2: { file: "type/key-2.wav", gain: 0.22 },
  key3: { file: "type/key-3.wav", gain: 0.22 },
  key4: { file: "type/key-4.wav", gain: 0.22 },
  key5: { file: "type/key-5.wav", gain: 0.22 },
  typeReturn: { file: "type/return.wav", gain: 0.25 },
  // pop (list items, chips, cards)
  pop1: { file: "pop/pop-1.wav", gain: 0.3 },
  pop2: { file: "pop/pop-2.wav", gain: 0.3 },
  pop3: { file: "pop/pop-3.wav", gain: 0.3 },
  pluck: { file: "pop/pluck.wav", gain: 0.3 },
  // interface
  click: { file: "ui/click.wav", gain: 0.3 },
  switch: { file: "ui/switch.wav", gain: 0.3 },
  select: { file: "ui/select.wav", gain: 0.3 },
  open: { file: "ui/open.wav", gain: 0.28 },
  close: { file: "ui/close.wav", gain: 0.28 },
  confirm: { file: "ui/confirm.wav", gain: 0.3 },
  error: { file: "ui/error.wav", gain: 0.3 },
  tick: { file: "ui/tick.wav", gain: 0.25 },
  counterTick: { file: "ui/counter-tick.wav", gain: 0.12 },
  scroll: { file: "ui/scroll.wav", gain: 0.25 },
  zap: { file: "ui/zap.wav", gain: 0.2 },
  // accents
  ding: { file: "accent/ding.wav", gain: 0.3 },
  shutter: { file: "accent/shutter.wav", gain: 0.3 },
  glass: { file: "accent/glass.wav", gain: 0.3 },
  powerUp: { file: "accent/power-up.wav", gain: 0.25 },
  twoTone: { file: "accent/two-tone.wav", gain: 0.25 },
  riser: { file: "accent/riser.wav", gain: 0.2 },
  // impacts
  boom: { file: "impact/boom.wav", gain: 0.45 },
  punch: { file: "impact/punch.wav", gain: 0.35 },
  soft: { file: "impact/soft.wav", gain: 0.35 },
  thud: { file: "impact/thud.wav", gain: 0.35 },
} as const;

export type SfxName = keyof typeof SFX;

const KEYS: SfxName[] = ["key1", "key2", "key3", "key4", "key5"];

// Plays one effect `at` seconds into the parent Sequence. `volume` multiplies the default gain.
export const Sfx: React.FC<{ name: SfxName; at?: number; volume?: number }> = ({
  name,
  at = 0,
  volume = 1,
}) => {
  const { fps } = useVideoConfig();
  const { file, gain } = SFX[name];
  return (
    <Sequence from={Math.round(at * fps)} layout="none">
      <Audio src={staticFile(`sfx/${file}`)} volume={gain * volume} />
    </Sequence>
  );
};

// Key presses for a typewriter animation: one per visible character (spaces skipped),
// cycling through the key variants so it does not sound like a loop.
export const TypeSfx: React.FC<{
  text: string;
  at?: number;
  charsPerSecond: number;
  volume?: number;
}> = ({ text, at = 0, charsPerSecond, volume = 1 }) => (
  <>
    {[...text].map((ch, i) =>
      ch.trim() ? (
        <Sfx
          key={i}
          name={KEYS[(i * 7) % KEYS.length]}
          at={at + i / charsPerSecond}
          volume={volume}
        />
      ) : null,
    )}
  </>
);
