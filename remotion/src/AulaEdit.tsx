// The current Aula edit: "Git e GitHub 4" (Liga Dev, English main captions). Rewrite this file and
// data/aula_subs.json for each new Aula edit; Aula.tsx, AulaKit.tsx and AulaCaptions.tsx stay.
//
// A screen recording (GitHub in the browser, IntelliJ with the terminal at the bottom and a webcam
// box on the right, back to the browser, back to IntelliJ). The idle pauses were cut, so
// public/aula_base.mp4 is the jump-cut timeline. Every time below is written on the SOURCE timeline
// and converted with t().
import React, { useContext } from "react";
import { Img, staticFile } from "remotion";
import subs from "./data/aula_subs.json";
import type { AulaSub } from "./AulaCaptions";
import { L } from "./ligaDev";
import {
  Appear,
  Callout,
  Card,
  Chip,
  CodeLine,
  Column,
  Eyebrow,
  Icon,
  IconName,
  InsertCtx,
  ListInsert,
  MiniCode,
  Panel,
  S,
  StageBox,
  TypeS,
  Typed,
  bodyText,
  gradientText,
  titleStyle,
} from "./AulaKit";

// Kept source segments (cut.py --segments); each starts on its first whole frame at 30 fps
const KEEP: [number, number][] = [
  [0, 23.02], [23.7, 27.05], [29.15, 86.29], [86.9, 94.68], [95.24, 135.84], [136.47, 137.14],
  [137.75, 181.85], [182.64, 187.76], [188.46, 190.96], [191.86, 195.57], [196.15, 196.75],
  [197.65, 198.75], [201.09, 203.88], [204.62, 210.86], [211.85, 262.31], [263.12, 278.05],
  [278.6, 301.56], [303.14, 303.467],
];
const fr = (s: number) => Math.ceil(s * 30 - 1e-6) / 30;
// source time → jump-cut time (a time inside a removed pause maps to the join)
export const t = (s: number) => {
  let cum = 0;
  for (const [a, b] of KEEP) {
    if (s < fr(a)) return cum;
    if (s <= fr(b)) return cum + (s - fr(a));
    cum += fr(b) - fr(a);
  }
  return cum;
};

export const AULA_DURATION = t(303.467);
export const AULA_SUBS = subs as AulaSub[];

// Screen recording: shrunk to 82% at the top so the captions get their own band under it
export const AULA_FULL = { scale: 0.82, x: (1920 - 1920 * 0.82) / 2, y: 24 };
export const AULA_CAPTION = { maxWidth: 1574, bottom: 22, size: 36 };

// E-mails on the git log "Author" lines, in base-video pixels. Tracked frame by frame
// (work/detect_author.py): the terminal scrolls with every command and the text gets selected.
export const AULA_REDACT = [
  { from: t(34.9), to: t(56.9), x: 316, y: 835, w: 326, h: 30 },
  { from: t(56.3), to: t(57.3), x: 316, y: 810, w: 326, h: 30 },
  { from: t(56.5), to: t(107.3), x: 316, y: 792, w: 326, h: 30 },
  { from: t(106.7), to: t(114.3), x: 316, y: 747, w: 326, h: 30 },
  { from: t(113.7), to: t(114.7), x: 316, y: 722, w: 326, h: 30 },
  { from: t(113.9), to: t(137.1), x: 316, y: 677, w: 326, h: 30 },
  { from: t(230.5), to: t(255.9), x: 316, y: 879, w: 326, h: 30 },
  { from: t(255.3), to: t(256.7), x: 316, y: 854, w: 326, h: 30 },
  // the final git log scrolls down and back up, so each position holds only between scrolls
  { from: t(263.9), to: t(266.05), x: 290, y: 727, w: 326, h: 30 },
  { from: t(263.9), to: t(266.05), x: 316, y: 879, w: 326, h: 30 },
  { from: t(265.95), to: t(266.25), x: 290, y: 769, w: 326, h: 30 },
  { from: t(265.95), to: t(266.25), x: 316, y: 920, w: 326, h: 30 },
  { from: t(266.15), to: t(268.85), x: 290, y: 803, w: 326, h: 30 },
  { from: t(266.15), to: t(268.85), x: 316, y: 955, w: 326, h: 30 },
  { from: t(268.75), to: t(299.05), x: 290, y: 727, w: 326, h: 30 },
  { from: t(268.75), to: t(299.05), x: 316, y: 879, w: 326, h: 30 },
  { from: t(298.95), to: t(299.25), x: 290, y: 781, w: 326, h: 30 },
  { from: t(298.95), to: t(299.25), x: 316, y: 934, w: 326, h: 30 },
  { from: t(299.15), to: AULA_DURATION + 1, x: 290, y: 803, w: 326, h: 30 },
  { from: t(299.15), to: AULA_DURATION + 1, x: 316, y: 955, w: 326, h: 30 },
];

// Free area of the IntelliJ editor (top right, above the terminal, right of the code, above the
// webcam), in frame pixels once the recording is at 82%
const BOX = { x: 1110, y: 140, w: 570, h: 340 };

const small: React.CSSProperties = { ...bodyText, fontSize: 25 };

const Row: React.FC<{ at: number; icon: IconName; color?: string; children: React.ReactNode }> = ({
  at,
  icon,
  color = L.accentText,
  children,
}) => (
  <Appear at={at}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, ...small }}>
      <Icon name={icon} size={26} color={color} />
      <span>{children}</span>
    </div>
  </Appear>
);

const SmallChip: React.FC<{ at: number; tone?: "ok" | "info"; icon?: IconName; children: React.ReactNode }> = ({
  at,
  tone = "info",
  icon,
  children,
}) => (
  <Appear at={at}>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 16px",
        borderRadius: 999,
        background: tone === "ok" ? "#e6f6ea" : L.chip,
        border: `1px solid ${tone === "ok" ? "#9fd8ad" : L.chipBorder}`,
        color: tone === "ok" ? "#1f6b30" : L.text,
        fontFamily: small.fontFamily,
        fontWeight: 600,
        fontSize: 22,
      }}
    >
      {icon && <Icon name={icon} size={22} color={tone === "ok" ? L.success : L.accentText} />}
      {children}
    </div>
  </Appear>
);

const Chips: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{children}</div>
);

const BigTitle: React.FC<{ text: string; at: number }> = ({ text, at }) => (
  <div style={{ ...titleStyle, minHeight: 74 }}>
    <Typed text={text} at={at} cps={14} style={gradientText} />
  </div>
);

// ---------- browser: create the remote repository ----------

// P1 · final step: first push
export const P1 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>Final step</Eyebrow>
        <BigTitle text="First push" at={t(8.3)} />
        <Appear at={t(10.6)}>
          <Chip>
            <Icon name="globe" size={26} color={L.accentText} />
            Understand GitHub a little
          </Chip>
        </Appear>
        <Appear at={t(12.9)}>
          <Chip strong>First: a remote repository</Chip>
        </Appear>
      </Panel>
      <S name="whooshSoft" at={from} />
      <TypeS text="First push" at={t(8.3)} cps={14} />
      <S name="pop1" at={t(10.6)} />
      <S name="pop2" at={t(12.9)} />
    </>
  );
};

// P2 · create the remote repository
export const P2 = () => (
  <ListInsert
    eyebrow="Create a remote repository"
    items={[
      { at: t(17.3), text: "+ → New repository", icon: "folder" },
      { at: t(20.0), text: "Name it: aula-poo", icon: "file" },
      { at: t(24.4), text: "Check nothing: Create", icon: "check" },
      { at: t(32.5), text: "Copy the repository URL", icon: "globe" },
    ]}
  />
);

// ---------- IntelliJ: remote, branch, push ----------

// C1 · git remote add origin
export const C1 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Callout box={BOX}>
        <Eyebrow>Link local → remote</Eyebrow>
        <MiniCode>
          <CodeLine
            size={23}
            parts={[
              { text: "git remote add", at: t(39.8), cps: 10 },
              { text: " origin", at: t(45.5), cps: 14, color: "#9cc2ff" },
              { text: " <URL>", at: t(47.8), cps: 14, color: "#b9a6ff" },
            ]}
          />
        </MiniCode>
        <Chips>
          <SmallChip at={t(46.5)} icon="globe">
            origin = the remote&apos;s link
          </SmallChip>
          <SmallChip at={t(53.4)} icon="branch">
            A link: nothing sent yet
          </SmallChip>
        </Chips>
      </Callout>
      <S name="whooshSoft" at={from} />
      <TypeS text="git remote add" at={t(39.8)} cps={10} />
      <TypeS text=" origin" at={t(45.5)} cps={14} />
      <TypeS text=" <URL>" at={t(47.8)} cps={14} />
      <S name="pop1" at={t(46.5)} />
      <S name="pop2" at={t(53.4)} />
    </>
  );
};

// P3 · branches
export const P3 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>A bit about branches</Eyebrow>
        <BigTitle text="Branch" at={t(63.1)} />
        <Appear at={t(71.7)}>
          <StageBox icon="branch" title="Main path" sub="Your project's main line" focus />
        </Appear>
        <Appear at={t(74.0)}>
          <StageBox icon="layers" title="Parallel paths" sub="Tests and new functions" />
        </Appear>
        <Appear at={t(77.6)}>
          <Chip>
            <Icon name="check" size={26} color={L.success} />
            Without breaking what works
          </Chip>
        </Appear>
      </Panel>
      <S name="whooshSoft" at={from} />
      <TypeS text="Branch" at={t(63.1)} cps={14} />
      <S name="tick" at={t(71.7)} />
      <S name="tick" at={t(74.0)} />
      <S name="pop3" at={t(77.6)} />
    </>
  );
};

// C2 · master → main
export const C2 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Callout box={BOX}>
        <Eyebrow>Rename the main branch</Eyebrow>
        <Row at={t(89.8)} icon="branch" color={L.text2}>
          Default: master
        </Row>
        <Row at={t(92.3)} icon="globe">
          GitHub recommends: main
        </Row>
        <MiniCode>
          <CodeLine
            size={22}
            parts={[
              { text: "git branch", at: t(101.4), cps: 14 },
              { text: " -m", at: t(102.4), cps: 14, color: "#9cc2ff" },
              { text: " main", at: t(106.1), cps: 14, color: "#b9a6ff" },
            ]}
          />
          <Appear at={t(112.6)} popIn={false}>
            <CodeLine size={22} hl parts={[{ text: "git branch", at: t(112.6), cps: 14 }]} />
          </Appear>
        </MiniCode>
        <Chips>
          <SmallChip at={t(104.4)}>-m = rename</SmallChip>
          <SmallChip at={t(116.1)} tone="ok" icon="check">
            On main
          </SmallChip>
        </Chips>
      </Callout>
      <S name="whooshSoft" at={from} />
      <S name="pop1" at={t(89.8)} />
      <S name="pop2" at={t(92.3)} />
      <TypeS text="git branch -m" at={t(101.4)} cps={14} />
      <TypeS text=" main" at={t(106.1)} cps={14} />
      <S name="pop3" at={t(104.4)} />
      <TypeS text="git branch" at={t(112.6)} cps={14} />
      <S name="confirm" at={t(116.1)} />
    </>
  );
};

// C3 · git push origin main
export const C3 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Callout box={BOX}>
        <Eyebrow>Send it to the cloud</Eyebrow>
        <MiniCode>
          <CodeLine
            size={24}
            parts={[
              { text: "git push", at: t(120.3), cps: 14 },
              { text: " origin", at: t(127.8), cps: 14, color: "#9cc2ff" },
              { text: " main", at: t(135.1), cps: 14, color: "#b9a6ff" },
            ]}
          />
        </MiniCode>
        <Chips>
          <SmallChip at={t(121.6)} icon="up">
            push = local → cloud
          </SmallChip>
          <SmallChip at={t(139.7)} tone="ok" icon="check">
            Sent
          </SmallChip>
          <SmallChip at={t(142.7)} icon="user">
            May ask you to log in
          </SmallChip>
        </Chips>
      </Callout>
      <S name="whooshSoft" at={from} />
      <TypeS text="git push" at={t(120.3)} cps={14} />
      <TypeS text=" origin" at={t(127.8)} cps={14} />
      <TypeS text=" main" at={t(135.1)} cps={14} />
      <S name="pop1" at={t(121.6)} />
      <S name="confirm" at={t(139.7)} />
      <S name="pop2" at={t(142.7)} />
    </>
  );
};

// ---------- browser: the project on GitHub, another computer ----------

// P4 · the project on GitHub
export const P4 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>On GitHub</Eyebrow>
        <Appear at={t(149.9)}>
          <Chip>
            <Icon name="undo" size={26} color={L.accentText} />
            F5 on the repository page
          </Chip>
        </Appear>
        <Appear at={t(152.0)}>
          <Card focus style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Icon name="cloud" size={48} />
            <div>
              <div style={{ ...titleStyle, fontSize: 34 }}>Your whole project</div>
              <div style={{ ...bodyText, fontSize: 25, fontWeight: 500, color: L.text2 }}>
                Almost instantly, no dragging files
              </div>
            </div>
          </Card>
        </Appear>
        <Appear at={t(158.5)}>
          <Chip>
            <Icon name="branch" size={26} color={L.accentText} />
            Branch: main
          </Chip>
        </Appear>
      </Panel>
      <S name="whooshSoft" at={from} />
      <S name="pop1" at={t(149.9)} />
      <S name="ding" at={t(152.0)} volume={0.6} />
      <S name="pop2" at={t(158.5)} />
    </>
  );
};

// P5 · simulating another computer
export const P5 = () => (
  <ListInsert
    eyebrow="Simulating another computer"
    items={[
      { at: t(174.6), text: "Edit the file on GitHub", icon: "file" },
      { at: t(179.6), text: "Add a System.out", icon: "terminal" },
      { at: t(192.8), text: "Commit", icon: "check" },
      { at: t(194.5), text: "Push", icon: "up" },
    ]}
  />
);

// P6 · remote × local
export const P6 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>Remote × Local</Eyebrow>
        <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
          <Appear at={t(214.0)} style={{ flex: 1, display: "flex" }}>
            <Column
              focus
              title="Remote"
              icon="cloud"
              lines={[
                { at: t(216.6), text: "2 commits" },
                { at: t(218.4), text: "initial" },
                { at: t(221.1), text: "+ the little print" },
              ]}
            />
          </Appear>
          <Appear at={t(227.2)} style={{ flex: 1, display: "flex" }}>
            <Column title="Local" icon="laptop" lines={[{ at: t(231.6), text: "Only 1 commit" }]} />
          </Appear>
        </div>
      </Panel>
      <S name="whooshSoft" at={from} />
      <S name="pop1" at={t(214.0)} />
      <S name="pageTurn" at={t(227.2)} />
      <S name="error" at={t(231.6)} volume={0.7} />
    </>
  );
};

// ---------- IntelliJ: pull ----------

// C4 · git pull origin main
export const C4 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Callout box={BOX}>
        <Eyebrow>Remote ≠ local</Eyebrow>
        <Row at={t(235.5)} icon="ban" color={L.error}>
          Can&apos;t push now
        </Row>
        <Row at={t(243.3)} icon="down">
          Pull what&apos;s new first
        </Row>
        <MiniCode>
          <CodeLine
            size={24}
            parts={[
              { text: "git pull", at: t(248.1), cps: 14 },
              { text: " origin", at: t(251.1), cps: 14, color: "#9cc2ff" },
              { text: " main", at: t(253.2), cps: 14, color: "#b9a6ff" },
            ]}
          />
        </MiniCode>
        <SmallChip at={t(258.6)} tone="ok" icon="check">
          Changes added
        </SmallChip>
      </Callout>
      <S name="whooshSoft" at={from} />
      <S name="pop1" at={t(235.5)} />
      <S name="pop2" at={t(243.3)} />
      <TypeS text="git pull" at={t(248.1)} cps={14} />
      <TypeS text=" origin" at={t(251.1)} cps={14} />
      <TypeS text=" main" at={t(253.2)} cps={14} />
      <S name="confirm" at={t(258.6)} />
    </>
  );
};

// C5 · git log: two commits
export const C5 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Callout box={BOX}>
        <Eyebrow>Check the history</Eyebrow>
        <MiniCode>
          <CodeLine size={24} parts={[{ text: "git log", at: t(261.0), cps: 14 }]} />
        </MiniCode>
        <Row at={t(261.9)} icon="history">
          2 commits
        </Row>
        <SmallChip at={t(268.3)} tone="ok" icon="cloud">
          Synced with the cloud
        </SmallChip>
      </Callout>
      <S name="whooshSoft" at={from} />
      <TypeS text="git log" at={t(261.0)} cps={14} />
      <S name="pop1" at={t(261.9)} />
      <S name="confirm" at={t(268.3)} />
    </>
  );
};

// P7 · push × pull
export const P7 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>Push × Pull</Eyebrow>
        <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
          <Appear at={t(270.2)} style={{ flex: 1, display: "flex" }}>
            <Column title="git push" icon="up" lines={[{ at: t(271.1), text: "Local → cloud" }]} />
          </Appear>
          <Appear at={t(274.5)} style={{ flex: 1, display: "flex" }}>
            <Column focus title="git pull" icon="down" lines={[{ at: t(275.0), text: "Cloud → local" }]} />
          </Appear>
        </div>
      </Panel>
      <S name="whooshSoft" at={from} />
      <S name="pop1" at={t(270.2)} />
      <S name="pageTurn" at={t(274.5)} />
    </>
  );
};

// P8 · end card
export const P8 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, textAlign: "center" }}>
          <Appear at={from + 0.1}>
            <Img src={staticFile("liga-dev.svg")} style={{ width: 120, height: 120 }} />
          </Appear>
          <Eyebrow>Done for today</Eyebrow>
          <div style={{ display: "flex", gap: 12 }}>
            <Appear at={t(286.4)}>
              <Chip>
                <Icon name="check" size={26} color={L.success} />
                First push
              </Chip>
            </Appear>
            <Appear at={t(287.2)}>
              <Chip>
                <Icon name="check" size={26} color={L.success} />
                First pull
              </Chip>
            </Appear>
          </div>
          <div style={{ ...titleStyle, fontSize: 52, minHeight: 120 }}>
            <Typed text="Next:" at={t(296.4)} cps={16} style={{ color: L.text }} />
            <br />
            <Typed text="a video on branches" at={t(296.7)} cps={18} style={gradientText} />
          </div>
          <Appear at={t(297.7)}>
            <Chip strong>The last Git &amp; GitHub video</Chip>
          </Appear>
        </div>
      </Panel>
      <S name="whooshSoft" at={from} />
      <S name="pop1" at={t(286.4)} />
      <S name="pop2" at={t(287.2)} />
      <TypeS text="a video on branches" at={t(296.7)} cps={18} />
      <S name="pop3" at={t(297.7)} />
      <S name="ding" at={t(300.9)} volume={0.7} />
    </>
  );
};

// The plan: one infographic at a time, [from, to] in seconds on the cut timeline.
// `callout` inserts sit over the full frame; the others shrink the recording.
export const AULA_INSERTS: { from: number; to: number; el: React.ReactNode; callout?: boolean }[] = [
  { from: t(2.4), to: t(14.7), el: <P1 /> },
  { from: t(14.9), to: t(34.6), el: <P2 /> },
  { from: t(36.5), to: t(58.6), el: <C1 />, callout: true },
  { from: t(59.5), to: t(79.2), el: <P3 /> },
  { from: t(79.6), to: t(118.8), el: <C2 />, callout: true },
  { from: t(119.5), to: t(147.5), el: <C3 />, callout: true },
  { from: t(148.3), to: t(163.6), el: <P4 /> },
  { from: t(164.6), to: t(195.2), el: <P5 /> },
  { from: t(201.2), to: t(233.0), el: <P6 /> },
  { from: t(234.9), to: t(260.0), el: <C4 />, callout: true },
  { from: t(260.1), to: t(269.6), el: <C5 />, callout: true },
  { from: t(269.8), to: t(277.9), el: <P7 /> },
  { from: t(278.6), to: AULA_DURATION, el: <P8 /> },
];
