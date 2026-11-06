import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Sfx } from "./Sfx";
import { C, cardShadow, dmSans, easeIn, mono, outfit, rise } from "./theme";

// Scenes for the "Meu filme 2" Reels edit (first job in IT). Times inside a scene are local seconds.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const useP = (at: number, dur = 0.8) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return interpolate(frame - at * fps, [0, dur * fps], [0, 1], { ...clamp, easing: rise });
};

// Rise entrance: fade + 16px up over 0.8 s
const useRise = (at = 0) => {
  const p = useP(at);
  return { opacity: p, transform: p >= 1 ? "none" : `translateY(${(1 - p) * 16}px)` };
};

// Full-screen graphite panel: 200 ms fade in, 150 ms fade out. Content stays above the caption band.
export const Panel: React.FC<{ children: React.ReactNode; eyebrow?: string; index?: string }> = ({ children, eyebrow, index }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity =
    interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp", easing: rise }) *
    interpolate(frame, [durationInFrames - 5, durationInFrames], [1, 0], { extrapolateLeft: "clamp", easing: easeIn });
  const head = useRise(0.05);
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity }}>
      <AbsoluteFill style={{ padding: "270px 140px 0 100px", flexDirection: "column", gap: 34 }}>
        {eyebrow ? (
          <div style={{ ...head, fontFamily: mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.18em", color: C.meta, textTransform: "uppercase" }}>
            {index ? <span style={{ color: C.blueSmall, marginRight: 24 }}>{index}</span> : null}
            {eyebrow}
          </div>
        ) : null}
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Title: React.FC<{ children: React.ReactNode; at?: number; size?: number }> = ({ children, at = 0.1, size = 84 }) => (
  <div style={{ ...useRise(at), fontFamily: outfit, fontWeight: 600, fontSize: size, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text }}>
    {children}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; at: number; style?: React.CSSProperties }> = ({ children, at, style }) => (
  <div style={{ ...useRise(at), padding: "28px 40px", borderRadius: 16, backgroundColor: C.surface, boxShadow: cardShadow, ...style }}>{children}</div>
);

// Lucide-style outline icons
const Icon: React.FC<{ d: React.ReactNode; size?: number; color?: string; sw?: number }> = ({ d, size = 56, color = C.body, sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {d}
  </svg>
);
const X = (p: { size?: number; color?: string }) => <Icon {...p} d={<><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" /></>} />;
const Check = (p: { size?: number; color?: string }) => <Icon {...p} d={<><circle cx="12" cy="12" r="10" /><path d="m8 12.5 2.8 2.8L16.5 9.5" /></>} />;
const Eye = (p: { size?: number; color?: string }) => <Icon {...p} d={<><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>} />;
const User = (p: { size?: number; color?: string }) => <Icon {...p} d={<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>} />;
const Award = (p: { size?: number; color?: string }) => <Icon {...p} d={<><circle cx="12" cy="9" r="6" /><path d="m8.5 13.9-1.5 7.6 5-3 5 3-1.5-7.6" /></>} />;

// Numbered row: 01 Text
const Item: React.FC<{ at: number; n: number; text: string; size?: number }> = ({ at, n, text, size = 58 }) => (
  <Card at={at} style={{ display: "flex", alignItems: "center", gap: 36 }}>
    <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 38, color: C.blueSmall, width: 58 }}>{String(n).padStart(2, "0")}</div>
    <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: size, letterSpacing: "-0.02em", color: C.text }}>{text}</div>
  </Card>
);

// Row with an icon on the left
const IconRow: React.FC<{ at: number; icon: React.ReactNode; text: string; muted?: boolean; size?: number }> = ({ at, icon, text, muted, size = 58 }) => (
  <Card at={at} style={{ display: "flex", alignItems: "center", gap: 32 }}>
    {icon}
    <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: size, letterSpacing: "-0.02em", color: muted ? C.body : C.text }}>{text}</div>
  </Card>
);

const Chip: React.FC<{ at: number; text: string; strong?: boolean }> = ({ at, text, strong }) => (
  <div style={{ ...useRise(at), padding: "14px 32px", borderRadius: 999, backgroundColor: C.raised, fontFamily: dmSans, fontWeight: 500, fontSize: 42, color: strong ? C.text : C.body, whiteSpace: "nowrap" }}>
    {text}
  </div>
);

// Big closing word that lands on the beat
const Stamp: React.FC<{ at: number; text: string; color?: string }> = ({ at, text, color = C.text }) => {
  const p = useP(at, 0.25);
  return (
    <div style={{ opacity: p, transform: p >= 1 ? "none" : `scale(${1.12 - 0.12 * p})`, fontFamily: outfit, fontWeight: 700, fontSize: 92, letterSpacing: "-0.03em", color }}>
      {text}
    </div>
  );
};

// 01 — the two drivers and what they were studying
export const Drivers: React.FC = () => (
  <Panel eyebrow="The drivers" index="01">
    <Title>
      <span style={{ color: C.blue }}>2</span> drivers, studying:
    </Title>
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <Item at={3.66} n={1} text="Software engineering" />
      <Item at={5.29} n={2} text="Systems analysis" />
      <Item at={6.79} n={3} text="Other IT courses" />
    </div>
    <Sfx name="whoosh" />
    <Sfx name="pop1" at={3.66} />
    <Sfx name="pop2" at={5.29} />
    <Sfx name="pop3" at={6.79} />
  </Panel>
);

// a certificate sheet that drops onto the stack
const CertSheet: React.FC<{ at: number; i: number }> = ({ at, i }) => {
  const p = useP(at, 0.35);
  return (
    <div
      style={{
        position: "absolute",
        left: 20 + i * 14,
        top: 150 - i * 46,
        width: 280,
        height: 180,
        borderRadius: 14,
        backgroundColor: C.raised,
        border: `2px solid ${C.border}`,
        opacity: p,
        transform: `translateY(${(1 - p) * -40}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "0 28px",
        boxShadow: cardShadow,
      }}
    >
      <Award size={64} color={C.body} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        <div style={{ height: 14, width: "90%", borderRadius: 7, backgroundColor: C.border }} />
        <div style={{ height: 14, width: "60%", borderRadius: 7, backgroundColor: C.border }} />
      </div>
    </div>
  );
};

// 02 — certificates pile up, practical proof stays empty
export const CertsVsProof: React.FC = () => {
  const xp = useP(3.38, 0.3);
  return (
    <Panel eyebrow="The confusion" index="02">
      <div style={{ display: "flex", gap: 32 }}>
        <Card at={0.1} style={{ flex: 1, height: 560, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.14em", color: C.meta }}>A</div>
          <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: 52, color: C.text, letterSpacing: "-0.02em" }}>Certificates</div>
          <div style={{ position: "relative", flex: 1 }}>
            <CertSheet at={0.2} i={0} />
            <CertSheet at={0.8} i={1} />
            <CertSheet at={1.7} i={2} />
          </div>
        </Card>
        <Card at={0.3} style={{ flex: 1, height: 560, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 28, letterSpacing: "0.14em", color: C.meta }}>B</div>
          <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: 52, color: C.text, letterSpacing: "-0.02em", lineHeight: 1.05 }}>Practical proof</div>
          <div style={{ flex: 1, borderRadius: 14, border: `3px dashed ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ opacity: xp, transform: xp >= 1 ? "none" : `scale(${0.9 + 0.1 * xp})` }}>
              <X size={130} color={C.blue} />
            </div>
          </div>
        </Card>
      </div>
      <Sfx name="whip" />
      <Sfx name="pop1" at={0.2} />
      <Sfx name="pop2" at={0.8} />
      <Sfx name="pop3" at={1.7} />
      <Sfx name="error" at={3.38} />
    </Panel>
  );
};

// 03 — what we don't do
export const NoContact: React.FC = () => (
  <Panel eyebrow="Common practice" index="03">
    <Title>We don&apos;t use:</Title>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <IconRow at={1.48} icon={<X />} text="Social media" />
      <IconRow at={2.7} icon={<X />} text="LinkedIn" />
      <IconRow at={5.13} icon={<X />} text="Recruiters" />
    </div>
    <Stamp at={5.85} text="Nothing." color={C.blue} />
    <Sfx name="whoosh" />
    <Sfx name="pop1" at={1.48} />
    <Sfx name="pop2" at={2.7} />
    <Sfx name="pop3" at={5.13} />
    <Sfx name="thud" at={5.85} />
  </Panel>
);

// 04 — 10,000 other people after the same first job
export const TenThousand: React.FC = () => {
  const n = useP(0.14, 0.96);
  const value = Math.round(10000 * n);
  return (
    <Panel eyebrow="Competition" index="04">
      <div style={{ ...useRise(0), fontFamily: outfit, fontWeight: 600, fontSize: 230, lineHeight: 1, letterSpacing: "-0.04em", color: C.text, fontVariantNumeric: "tabular-nums" }}>
        {value.toLocaleString("en-US")}
      </div>
      <div style={{ ...useRise(0.3), fontFamily: dmSans, fontWeight: 500, fontSize: 54, color: C.body, lineHeight: 1.2 }}>
        other people after the <span style={{ color: C.text }}>same first job</span>
      </div>
      <IconRow at={5.94} icon={<X color={C.blue} />} text="No real proof of experience" size={50} />
      <Sfx name="boom" at={1.1} />
      <Sfx name="pop2" at={5.94} />
    </Panel>
  );
};

// 05 — junior roles shrinking + the AI myth
export const JuniorMyth: React.FC = () => {
  const bars = [1, 0.78, 0.58, 0.4];
  const g = useP(3.18, 1.2);
  return (
    <Panel eyebrow="Add it up" index="05">
      <Card at={0.1} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: 56, color: C.text, letterSpacing: "-0.02em" }}>Junior roles</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 28, height: 220 }}>
          {bars.map((b, i) => (
            <div key={i} style={{ flex: 1, height: `${100 * (1 - (1 - b) * g)}%`, borderRadius: 12, backgroundColor: i === bars.length - 1 ? C.text : C.raised }} />
          ))}
        </div>
        <div style={{ opacity: g, fontFamily: mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.blueSmall }}>SHRINKING</div>
      </Card>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Chip at={5.96} text="Myth: AI is stealing jobs" strong />
        <Chip at={8.73} text="Panic" />
      </div>
      <Sfx name="whoosh" />
      <Sfx name="pop1" at={3.18} />
      <Sfx name="pop2" at={5.96} />
      <Sfx name="pop3" at={8.73} />
    </Panel>
  );
};

// 06 — not AI, post-pandemic
export const Verdict: React.FC = () => {
  const strike = useP(3.58, 0.3);
  return (
    <Panel eyebrow="Real quick" index="06">
      <Title>Shrinking because of:</Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <Card at={1.2} style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ opacity: strike }}>
            <X size={64} />
          </div>
          <div style={{ position: "relative", fontFamily: outfit, fontWeight: 600, fontSize: 60, color: strike > 0 ? C.body : C.text }}>
            Artificial intelligence
            <div style={{ position: "absolute", left: 0, top: "52%", height: 5, width: `${strike * 100}%`, backgroundColor: C.body, borderRadius: 3 }} />
          </div>
        </Card>
        <IconRow at={5.42} icon={<Check size={64} color={C.blue} />} text="Post-pandemic" size={60} />
      </div>
      <Sfx name="whip" />
      <Sfx name="error" at={3.58} />
      <Sfx name="confirm" at={5.42} />
    </Panel>
  );
};

// vertical timeline milestone
const Milestone: React.FC<{ at: number; title: string; sub?: string; subAt?: number; last?: boolean; children?: React.ReactNode }> = ({ at, title, sub, subAt, last, children }) => {
  const p = useP(at, 0.4);
  const s = useP(subAt ?? at, 0.8);
  return (
    <div style={{ display: "flex", gap: 36 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 36 }}>
        <div style={{ width: 30, height: 30, borderRadius: 15, marginTop: 14, backgroundColor: p > 0 ? (last ? C.blue : C.text) : C.raised, transform: `scale(${0.6 + 0.4 * p})` }} />
        {!last ? <div style={{ flex: 1, width: 4, backgroundColor: C.border, marginTop: 10 }} /> : null}
      </div>
      <div style={{ opacity: p, transform: p >= 1 ? "none" : `translateY(${(1 - p) * 16}px)`, paddingBottom: last ? 0 : 36, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: 58, letterSpacing: "-0.02em", color: C.text }}>{title}</div>
        {sub ? <div style={{ opacity: s, fontFamily: dmSans, fontWeight: 500, fontSize: 42, color: C.body }}>{sub}</div> : null}
        {children}
      </div>
    </div>
  );
};

// small stepped line for "the junior bar went up a few steps"
const Steps: React.FC<{ at: number }> = ({ at }) => {
  const p = useP(at, 1.4);
  const w = 420;
  const h = 150;
  const n = 3;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const x = (w / n) * i;
    const y = h - (h / n) * i;
    pts.push(`${x},${y + h / n}`, `${x},${y}`);
  }
  const path = "M" + pts.slice(1).join(" L");
  const len = 2 * w + 2 * h;
  return (
    <svg width={w + 30} height={h + h / n + 30} viewBox={`-15 -15 ${w + 30} ${h + h / n + 30}`}>
      <path d={path} fill="none" stroke={C.body} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
      <circle cx={w} cy={0} r={16 * (p >= 0.95 ? 1 : 0)} fill={C.blue} />
    </svg>
  );
};

// 07 — pandemic salaries → market levels out → junior bar goes up
export const MarketTimeline: React.FC = () => (
  <Panel eyebrow="The market" index="07">
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Milestone at={0.1} title="Pandemic" sub="Huge salaries" subAt={1.0} />
      <Milestone at={5.56} title="Market levels out" sub="High salary = real knowledge" subAt={9.16} />
      <Milestone at={13.07} title="Junior bar goes up" last>
        <Steps at={13.25} />
      </Milestone>
    </div>
    <Sfx name="whoosh" />
    <Sfx name="tick" at={0.1} />
    <Sfx name="tick" at={5.56} />
    <Sfx name="pop2" at={9.16} />
    <Sfx name="tick" at={13.07} />
  </Panel>
);

const Box: React.FC<{ at: number; text: string; strong?: boolean }> = ({ at, text, strong }) => {
  const p = useP(at, 0.32);
  const s = p >= 1 ? 1 : interpolate(p, [0, 0.6, 1], [0.94, 1.02, 1]);
  return (
    <div
      style={{
        opacity: p,
        transform: p >= 1 ? "none" : `scale(${s})`,
        flex: 1,
        padding: "36px 28px",
        borderRadius: 16,
        backgroundColor: strong ? C.raised : C.surface,
        boxShadow: cardShadow,
        textAlign: "center",
        fontFamily: outfit,
        fontWeight: 600,
        fontSize: strong ? 62 : 54,
        letterSpacing: "-0.02em",
        color: strong ? C.blue : C.text,
      }}
    >
      {text}
    </div>
  );
};

// 08 — bootcamp or hackathon → selection → internship program
export const InternshipFlow: React.FC = () => {
  const a = useP(9.43, 0.6);
  return (
    <Panel eyebrow="The ideal way in" index="08">
      <div style={{ display: "flex", gap: 28 }}>
        <Box at={6.55} text="Bootcamp" />
        <Box at={7.95} text="Hackathon" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 30, paddingLeft: 40, height: 170 }}>
        <svg width={60} height={170} viewBox="0 0 60 170">
          <path d={`M30 0 L30 ${150 * a}`} stroke={C.body} strokeWidth={6} strokeLinecap="round" />
          {a > 0.9 ? <path d="M12 132 L30 154 L48 132" fill="none" stroke={C.body} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" /> : null}
        </svg>
        <div style={{ opacity: a, fontFamily: mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.16em", color: C.blueSmall }}>SELECTION PROCESS</div>
      </div>
      <div style={{ display: "flex" }}>
        <Box at={3.4} text="Internship program" strong />
      </div>
      <Sfx name="whoosh" />
      <Sfx name="pop1" at={3.4} />
      <Sfx name="pop2" at={6.55} />
      <Sfx name="pop3" at={7.95} />
      <Sfx name="whoosh" at={9.43} volume={0.8} />
    </Panel>
  );
};

// 09 — use hackathons and bootcamps to gain visibility
export const Visibility: React.FC = () => (
  <Panel eyebrow="The point" index="09">
    <div style={{ display: "flex", gap: 20 }}>
      <Chip at={1.2} text="Hackathon" strong />
      <Chip at={2.12} text="Bootcamp" strong />
    </div>
    <div style={{ ...useRise(4.2), display: "flex", alignItems: "center", gap: 30 }}>
      <Eye size={92} color={C.blue} />
      <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: 84, letterSpacing: "-0.03em", color: C.text }}>Visibility</div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Item at={5.2} n={1} text="Local companies" size={48} />
      <Item at={6.86} n={2} text="Companies elsewhere" size={48} />
      <Item at={7.98} n={3} text="Recruiters" size={48} />
    </div>
    <Sfx name="whoosh" />
    <Sfx name="pop1" at={1.2} />
    <Sfx name="pop2" at={2.12} />
    <Sfx name="pluck" at={4.2} />
    <Sfx name="pop3" at={5.2} />
    <Sfx name="pop1" at={6.86} />
    <Sfx name="pop2" at={7.98} />
  </Panel>
);

// 10 — certificates as decoration
export const Decoration: React.FC = () => (
  <Panel eyebrow="Certificates" index="10">
    <Title size={76}>Binge-watching courses</Title>
    <div style={{ ...useRise(2.9), display: "flex", gap: 18 }}>
      {[2.9, 3.2, 3.5, 3.8].map((t) => (
        <CertMini key={t} at={t} />
      ))}
    </div>
    <div style={{ ...useRise(4.64), fontFamily: mono, fontWeight: 700, fontSize: 30, letterSpacing: "0.16em", color: C.meta }}>THEY END UP AS DECORATION</div>
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
      <Chip at={6.18} text="LinkedIn" strong />
      <Chip at={7.34} text="A drawer" strong />
      <Chip at={8.22} text="Phone storage" strong />
    </div>
    <IconRow at={10.74} icon={<X color={C.blue} />} text="No results at all" size={54} />
    <Sfx name="whip" />
    <Sfx name="pop1" at={2.9} />
    <Sfx name="pop2" at={3.5} />
    <Sfx name="pop3" at={6.18} />
    <Sfx name="pop1" at={7.34} />
    <Sfx name="pop2" at={8.22} />
    <Sfx name="error" at={10.74} />
  </Panel>
);

const CertMini: React.FC<{ at: number }> = ({ at }) => (
  <div style={{ ...useRise(at), width: 150, height: 110, borderRadius: 12, backgroundColor: C.raised, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Award size={56} />
  </div>
);

// 11 — real projects, in production, at least one user
export const RealProjects: React.FC = () => {
  const dot = useP(4.74, 0.3);
  const u = useP(7.24, 0.4);
  return (
    <Panel eyebrow="Prove competence" index="11">
      <Title at={1.9} size={104}>
        Real <span style={{ color: C.blue }}>projects</span>
      </Title>
      <Card at={2.6} style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <div style={{ fontFamily: mono, fontWeight: 500, fontSize: 40, color: C.text }}>my-project</div>
        <div style={{ height: 2, backgroundColor: C.border }} />
        <div style={{ opacity: dot, display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: C.blue }} />
          <div style={{ fontFamily: dmSans, fontWeight: 500, fontSize: 48, color: C.text }}>In production</div>
        </div>
        <div style={{ opacity: u, transform: u >= 1 ? "none" : `translateY(${(1 - u) * 12}px)`, display: "flex", alignItems: "center", gap: 22 }}>
          <User size={52} color={C.text} />
          <div style={{ fontFamily: dmSans, fontWeight: 500, fontSize: 48, color: C.text }}>
            <span style={{ fontFamily: outfit, fontWeight: 600 }}>1</span> person using it
          </div>
        </div>
      </Card>
      <Sfx name="whoosh" />
      <Sfx name="pop1" at={1.9} />
      <Sfx name="confirm" at={4.74} />
      <Sfx name="ding" at={7.24} />
    </Panel>
  );
};

// 12 — no contacts, no network, no visibility → you get nothing
export const GetNothing: React.FC = () => (
  <Panel eyebrow="In the end" index="12">
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <IconRow at={1.64} icon={<X />} text="Contacts" />
      <IconRow at={2.32} icon={<X />} text="Network" />
      <IconRow at={3.04} icon={<X />} text="Visibility" />
    </div>
    <Stamp at={4.32} text="You get nothing." />
    <Sfx name="whoosh" />
    <Sfx name="pop1" at={1.64} />
    <Sfx name="pop2" at={2.32} />
    <Sfx name="pop3" at={3.04} />
    <Sfx name="punch" at={4.32} />
  </Panel>
);

// Hook: small eyebrow chip above the presenter's head
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const out = interpolate(frame, [durationInFrames - 5, durationInFrames], [1, 0], { extrapolateLeft: "clamp", easing: easeIn });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, ${C.ink}B3 0%, ${C.ink}00 22%)` }} />
      <div style={{ position: "absolute", top: 200, left: 0, right: 120, display: "flex", justifyContent: "center" }}>
        <div style={{ ...useRise(0.15), padding: "16px 36px", borderRadius: 999, backgroundColor: C.surface, boxShadow: cardShadow, fontFamily: mono, fontWeight: 700, fontSize: 34, letterSpacing: "0.16em", color: C.text }}>
          YOUR FIRST JOB <span style={{ color: C.blueSmall }}>IN IT</span>
        </div>
      </div>
      <Sfx name="boom" />
      <Sfx name="pop1" at={0.15} />
    </AbsoluteFill>
  );
};

// Closing card with logo and CTA
export const EndCard: React.FC = () => {
  const logo = useRise(0);
  const q = useRise(0.25);
  const cta = useRise(0.5);
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 64, padding: "0 120px 200px" }}>
      <Img src={staticFile("leno-borges.svg")} style={{ ...logo, width: 260 }} />
      <div style={{ ...q, fontFamily: outfit, fontWeight: 600, fontSize: 80, letterSpacing: "-0.03em", color: C.text, textAlign: "center", lineHeight: 1.08 }}>
        Do you have a real project in production?
      </div>
      <div style={{ ...cta, padding: "22px 52px", borderRadius: 999, backgroundColor: C.blueBox, fontFamily: mono, fontWeight: 700, fontSize: 38, letterSpacing: "0.16em", color: "#FFFFFF" }}>
        COMMENT BELOW
      </div>
      <Sfx name="whoosh" />
      <Sfx name="ding" at={0.5} />
    </AbsoluteFill>
  );
};
