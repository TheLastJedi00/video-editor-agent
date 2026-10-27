import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, cardShadow, dmSans, easeIn, mono, outfit, rise } from "./theme";

// Rise entrance: fade + 16px up over 0.8 s, starting at `at` seconds (local)
const useRise = (at = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame - at * fps, [0, 0.8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: rise });
  return { opacity: p, transform: `translateY(${(1 - p) * 16}px)` };
};

// Full-screen graphite panel: 200 ms fade in, 150 ms fade out
export const Panel: React.FC<{ children: React.ReactNode; eyebrow?: string; index?: string }> = ({ children, eyebrow, index }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity =
    interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp", easing: rise }) *
    interpolate(frame, [durationInFrames - 5, durationInFrames], [1, 0], { extrapolateLeft: "clamp", easing: easeIn });
  const head = useRise(0.05);
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity }}>
      <AbsoluteFill style={{ padding: "300px 140px 0 100px", flexDirection: "column", gap: 56 }}>
        {eyebrow ? (
          <div style={{ ...head, fontFamily: mono, fontWeight: 700, fontSize: 34, letterSpacing: "0.18em", color: C.meta, textTransform: "uppercase" }}>
            {index ? <span style={{ color: C.blueSmall, marginRight: 24 }}>{index}</span> : null}
            {eyebrow}
          </div>
        ) : null}
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Title: React.FC<{ children: React.ReactNode; at?: number }> = ({ children, at = 0.1 }) => (
  <div style={{ ...useRise(at), fontFamily: outfit, fontWeight: 600, fontSize: 92, lineHeight: 1.05, letterSpacing: "-0.03em", color: C.text }}>
    {children}
  </div>
);

// 03 — "assuntos de maior senioridade": a stepped line drawing itself upward
export const Seniority: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const steps = 4;
  const w = 820;
  const h = 360;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = h - (h / steps) * i;
    pts.push(`${x},${y + h / steps}`, `${x},${y}`);
  }
  const path = "M" + pts.slice(1).join(" L");
  const len = 2 * w + 2 * h;
  const draw = interpolate(frame, [0.4 * fps, 2.6 * fps], [len, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: rise });
  const dot = interpolate(frame, [2.4 * fps, 2.8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Panel eyebrow="Carreira" index="01">
      <Title>
        Assuntos de maior <span style={{ color: C.blue }}>senioridade</span>
      </Title>
      <div style={{ ...useRise(0.3), marginTop: 30, padding: 50, borderRadius: 16, backgroundColor: C.surface, boxShadow: cardShadow, alignSelf: "flex-start" }}>
        <svg width={w + 40} height={h + h / steps + 40} viewBox={`-20 -20 ${w + 40} ${h + h / steps + 40}`}>
          <path d={path} fill="none" stroke={C.body} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={draw} />
          <circle cx={w} cy={0} r={22 * dot} fill={C.blue} />
        </svg>
      </div>
    </Panel>
  );
};

// 04 — "não existe material de estudos em português"
export const NoMaterial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fade = interpolate(frame, [1.4 * fps, 2.2 * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeIn });
  const x = useRise(2.1);
  return (
    <Panel eyebrow="Material de estudos" index="02">
      <div style={{ ...useRise(0.15), padding: 56, borderRadius: 16, backgroundColor: C.surface, boxShadow: cardShadow, display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width={64} height={64} viewBox="0 0 24 24" fill="none" stroke={C.body} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <div style={{ fontFamily: dmSans, fontWeight: 500, fontSize: 52, color: C.text }}>Assuntos específicos</div>
          <div style={{ marginLeft: "auto", flexShrink: 0, whiteSpace: "nowrap", padding: "10px 28px", borderRadius: 999, backgroundColor: C.raised, fontFamily: mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.12em", color: C.text }}>
            PT-BR
          </div>
        </div>
        <div style={{ height: 2, backgroundColor: C.border }} />
        <div style={{ position: "relative", height: 330 }}>
          <div style={{ opacity: fade, display: "flex", flexDirection: "column", gap: 34 }}>
            {[0.92, 0.7, 0.82, 0.55].map((f, i) => (
              <div key={i} style={{ height: 44, width: `${f * 100}%`, borderRadius: 12, backgroundColor: C.raised }} />
            ))}
          </div>
          <div style={{ ...x, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <svg width={120} height={120} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m15 9-6 6M9 9l6 6" />
            </svg>
            <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: 64, color: C.text, letterSpacing: "-0.02em" }}>Não existe</div>
          </div>
        </div>
      </div>
    </Panel>
  );
};

// 06 — "a maioria ... em nível mais aprofundado é inglês" (qualitative, no numbers)
export const Majority: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = (at: number, to: number) =>
    interpolate(frame, [at * fps, (at + 0.9) * fps], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: rise });
  const label = useRise(1.6);
  const Row: React.FC<{ name: string; width: number; strong?: boolean; at: number }> = ({ name, width, strong, at }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ fontFamily: dmSans, fontWeight: 500, fontSize: 50, color: strong ? C.text : C.body }}>{name}</div>
      <div style={{ height: 64, borderRadius: 999, backgroundColor: C.raised, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${grow(at, width)}%`, borderRadius: 999, backgroundColor: strong ? C.text : C.border }} />
      </div>
    </div>
  );
  return (
    <Panel eyebrow="Conteúdo aprofundado" index="03">
      <Title>
        A maioria é em <span style={{ color: C.blue }}>inglês</span>
      </Title>
      <div style={{ ...useRise(0.25), padding: 60, borderRadius: 16, backgroundColor: C.surface, boxShadow: cardShadow, display: "flex", flexDirection: "column", gap: 56 }}>
        <Row name="Português" width={18} at={0.4} />
        <Row name="Inglês" width={88} strong at={0.9} />
        <div style={{ ...label, fontFamily: mono, fontWeight: 700, fontSize: 34, letterSpacing: "0.16em", color: C.blueSmall, alignSelf: "flex-end" }}>A MAIORIA</div>
      </div>
    </Panel>
  );
};

// 07 — who produces it; items appear as they are spoken (local seconds)
export const Producers: React.FC = () => {
  const items = [
    { at: 0.78, text: "Um indiano" },
    { at: 2.1, text: "Alguns asiáticos aleatórios" },
    { at: 4.64, text: "América do Norte" },
  ];
  const chips = [
    { at: 6.52, text: "Canadá" },
    { at: 6.96, text: "Estados Unidos" },
  ];
  return (
    <Panel eyebrow="Quem produz" index="04">
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        {items.map((it, i) => (
          <Item key={it.text} at={it.at} n={i + 1} text={it.text} />
        ))}
        <div style={{ display: "flex", gap: 24, paddingLeft: 150 }}>
          {chips.map((c) => (
            <Chip key={c.text} at={c.at} text={c.text} />
          ))}
        </div>
      </div>
    </Panel>
  );
};

const Item: React.FC<{ at: number; n: number; text: string }> = ({ at, n, text }) => (
  <div style={{ ...useRise(at), display: "flex", alignItems: "center", gap: 40, padding: "40px 48px", borderRadius: 16, backgroundColor: C.surface, boxShadow: cardShadow }}>
    <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 40, color: C.blueSmall, width: 62 }}>{String(n).padStart(2, "0")}</div>
    <div style={{ fontFamily: outfit, fontWeight: 600, fontSize: 64, letterSpacing: "-0.02em", color: C.text }}>{text}</div>
  </div>
);

const Chip: React.FC<{ at: number; text: string }> = ({ at, text }) => (
  <div style={{ ...useRise(at), padding: "14px 34px", borderRadius: 999, backgroundColor: C.raised, fontFamily: dmSans, fontWeight: 500, fontSize: 44, color: C.text }}>
    {text}
  </div>
);

// Hook text over the presenter (first seconds)
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const out = interpolate(frame, [durationInFrames - 5, durationInFrames], [1, 0], { extrapolateLeft: "clamp", easing: easeIn });
  const head = useRise(0);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <AbsoluteFill style={{ background: `linear-gradient(to bottom, ${C.ink}CC 0%, ${C.ink}00 34%)` }} />
      <div style={{ ...head, position: "absolute", top: 260, left: 90, right: 150 }}>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 32, letterSpacing: "0.18em", color: C.meta, marginBottom: 18 }}>PROGRAMAÇÃO</div>
        <div style={{ fontFamily: outfit, fontWeight: 700, fontSize: 88, lineHeight: 1.04, letterSpacing: "-0.03em", color: C.text, textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
          Não é <span style={{ color: C.blue }}>obrigatório</span> saber inglês?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Closing card with logo and CTA
export const EndCard: React.FC = () => {
  const logo = useRise(0);
  const q = useRise(0.25);
  const cta = useRise(0.5);
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 64, paddingBottom: 200 }}>
      <Img src={staticFile("leno-borges.svg")} style={{ ...logo, width: 260 }} />
      <div style={{ ...q, fontFamily: outfit, fontWeight: 600, fontSize: 84, letterSpacing: "-0.03em", color: C.text, textAlign: "center", lineHeight: 1.08 }}>
        Você estuda em inglês?
      </div>
      <div style={{ ...cta, padding: "22px 52px", borderRadius: 999, backgroundColor: C.blueBox, fontFamily: mono, fontWeight: 700, fontSize: 38, letterSpacing: "0.16em", color: "#FFFFFF" }}>
        COMENTA AÍ
      </div>
    </AbsoluteFill>
  );
};
