import React, { createContext, useContext } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Sfx, SfxName, TypeSfx } from "./Sfx";
import {
  archivo,
  enter,
  exitP,
  GLOW,
  L,
  mono,
  pop,
  SHADOW,
  sora,
  TITLE_GRADIENT,
} from "./ligaDev";

// Reusable building blocks for Aula infographics (Liga Dev). The inserts of each edit live in
// AulaEdit.tsx and are rewritten per video.
//
// Every time in this file is in seconds on the source timeline. An insert's <Sequence> provides
// its start and end through context, so components can use absolute times from the plan.
export const InsertCtx = createContext({ from: 0, to: 0 });

// Aula mixes effects at ~0.6× the default gains (SFX_RULES.md)
export const AULA_VOL = 0.6;

export const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { from } = useContext(InsertCtx);
  return from + frame / fps;
};

export const S: React.FC<{ name: SfxName; at: number; volume?: number }> = ({ name, at, volume = 1 }) => {
  const { from } = useContext(InsertCtx);
  return <Sfx name={name} at={Math.max(0, at - from)} volume={AULA_VOL * volume} />;
};

export const TypeS: React.FC<{ text: string; at: number; cps: number }> = ({ text, at, cps }) => {
  const { from } = useContext(InsertCtx);
  return <TypeSfx text={text} at={at - from} charsPerSecond={cps} volume={AULA_VOL * 0.8} />;
};

// ---------- icons (Lucide-style outline, stroke 2, round caps) ----------

export const ICONS: Record<string, React.ReactNode> = {
  save: (
    <>
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </>
  ),
  trend: (
    <>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </>
  ),
  undo: (
    <>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  branch: (
    <>
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </>
  ),
  history: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  folder: (
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  ),
  file: (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </>
  ),
  cart: (
    <>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </>
  ),
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  monitor: (
    <>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  terminal: (
    <>
      <polyline points="4 17 10 11 4 5" />
      <path d="M12 19h8" />
    </>
  ),
  calendar: (
    <>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m4.9 4.9 14.2 14.2" />
    </>
  ),
  message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <path d="M12 15V3" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 10 5-10 5L2 7z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </>
  ),
  laptop: (
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
  ),
  camera: (
    <>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  up: (
    <>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </>
  ),
  down: (
    <>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </>
  ),
};

export type IconName = keyof typeof ICONS;

export const Icon: React.FC<{ name: IconName; size?: number; color?: string }> = ({ name, size = 30, color = L.accent }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    {ICONS[name]}
  </svg>
);

// ---------- primitives ----------

// The right-hand column next to the shrunk presenter
export const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useT();
  const { from, to } = useContext(InsertCtx);
  const p = enter(t, from + 0.15, 0.32) * exitP(t, to);
  return (
    <div
      style={{
        position: "absolute",
        left: 1236,
        top: 72,
        width: 636,
        height: 936,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 22,
        opacity: p,
        transform: p < 1 ? `translateY(${(1 - p) * 16}px)` : "none",
      }}
    >
      {children}
    </div>
  );
};

// A compact card over an empty area of a screen recording (no presenter shrink). `box` is the free
// rectangle in frame pixels; the card hugs its top-left and never grows past it.
export const Callout: React.FC<{
  box: { x: number; y: number; w: number; h: number };
  children: React.ReactNode;
}> = ({ box, children }) => {
  const t = useT();
  const { from, to } = useContext(InsertCtx);
  const p = enter(t, from, 0.32) * exitP(t, to);
  return (
    <div
      style={{
        position: "absolute",
        left: box.x,
        top: box.y,
        width: box.w,
        maxHeight: box.h,
        overflow: "hidden",
        background: L.card,
        border: `1px solid ${L.cardBorder}`,
        borderRadius: 24,
        boxShadow: `${SHADOW}, ${GLOW}`,
        padding: "20px 24px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity: p,
        transform: p < 1 ? `translateY(${(1 - p) * 16}px) scale(${0.94 + 0.06 * p})` : "none",
        transformOrigin: "top left",
      }}
    >
      {children}
    </div>
  );
};

// A small dark terminal strip for callouts
export const MiniCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: L.dark, borderRadius: 16, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 2 }}>
    {children}
  </div>
);

export const Appear: React.FC<{ at: number; children: React.ReactNode; popIn?: boolean; style?: React.CSSProperties }> = ({
  at,
  children,
  popIn = true,
  style,
}) => {
  const t = useT();
  const p = enter(t, at, 0.2);
  const s = popIn ? pop(t, at) : 1;
  const done = t >= at + 0.32;
  return (
    <div
      style={{
        opacity: p,
        transform: done ? "none" : `translateY(${(1 - p) * 12}px) scale(${s})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: mono,
      fontWeight: 700,
      fontSize: 19,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: L.accentText,
    }}
  >
    {children}
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; focus?: boolean; style?: React.CSSProperties }> = ({
  children,
  focus,
  style,
}) => (
  <div
    style={{
      background: L.card,
      border: `1px solid ${L.cardBorder}`,
      borderRadius: 24,
      boxShadow: focus ? `${SHADOW}, ${GLOW}` : SHADOW,
      padding: "24px 28px",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{ children: React.ReactNode; strong?: boolean }> = ({ children, strong }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 22px",
      borderRadius: 999,
      background: strong ? "linear-gradient(90deg, #2f6fe0, #1f5fe0)" : L.chip,
      border: strong ? "none" : `1px solid ${L.chipBorder}`,
      color: strong ? "#ffffff" : L.text,
      fontFamily: archivo,
      fontWeight: 600,
      fontSize: 25,
    }}
  >
    {children}
  </div>
);

// Typewriter text with a blinking cursor while typing (and 1 s after)
export const Typed: React.FC<{ text: string; at: number; cps: number; style?: React.CSSProperties; cursorColor?: string }> = ({
  text,
  at,
  cps,
  style,
  cursorColor = L.accent,
}) => {
  const t = useT();
  const n = Math.max(0, Math.min(text.length, Math.floor((t - at) * cps)));
  const typingEnd = at + text.length / cps;
  const showCursor = t >= at - 0.4 && t < typingEnd + 1 && Math.floor(t * 2.5) % 2 === 0;
  return (
    <span style={style}>
      {text.slice(0, n)}
      <span style={{ display: "inline-block", width: 0, overflow: "visible" }}>
        <span
          style={{
            display: "inline-block",
            width: "0.08em",
            height: "0.95em",
            marginLeft: "0.04em",
            verticalAlign: "-0.1em",
            background: cursorColor,
            opacity: showCursor ? 1 : 0,
          }}
        />
      </span>
    </span>
  );
};

export const titleStyle: React.CSSProperties = {
  fontFamily: sora,
  fontWeight: 700,
  fontSize: 64,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
};

export const gradientText: React.CSSProperties = {
  backgroundImage: TITLE_GRADIENT,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export const GradientTitle: React.FC<{ text: string; at: number; cps?: number; size?: number }> = ({
  text,
  at,
  cps = 14,
  size = 64,
}) => (
  <div style={{ ...titleStyle, fontSize: size, minHeight: size * 1.15 }}>
    <Typed text={text} at={at} cps={cps} style={gradientText} />
  </div>
);

export const bodyText: React.CSSProperties = {
  fontFamily: archivo,
  fontWeight: 600,
  fontSize: 29,
  lineHeight: 1.3,
  color: L.text,
};

export const Item: React.FC<{ n: number; icon: IconName; text: string }> = ({ n, icon, text }) => (
  <Card style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 26px" }}>
    <div
      style={{
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 20,
        color: L.accentText,
        background: L.chipLight,
        border: `1px solid ${L.chipBorder}`,
        borderRadius: 999,
        width: 46,
        height: 46,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {String(n).padStart(2, "0")}
    </div>
    <div style={{ ...bodyText, flex: 1 }}>{text}</div>
    <Icon name={icon} />
  </Card>
);

export const POPS: SfxName[] = ["pop1", "pop2", "pop3"];

export const ListInsert: React.FC<{
  eyebrow: string;
  title?: { text: string; at: number };
  items: { at: number; text: string; icon: IconName }[];
}> = ({ eyebrow, title, items }) => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>{eyebrow}</Eyebrow>
        {title && <GradientTitle text={title.text} at={title.at} />}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {items.map((it, i) => (
            <Appear key={it.at} at={it.at}>
              <Item n={i + 1} icon={it.icon} text={it.text} />
            </Appear>
          ))}
        </div>
      </Panel>
      <S name="whooshSoft" at={from} />
      {items.map((it, i) => (
        <S key={it.at} name={POPS[i % 3]} at={it.at} />
      ))}
      {title && <TypeS text={title.text} at={title.at} cps={14} />}
    </>
  );
};

export const TermInsert: React.FC<{
  eyebrow: string;
  term: { text: string; at: number };
  def: { text: string; at: number };
  chips?: { text: string; at: number; icon?: IconName }[];
  pre?: React.ReactNode;
}> = ({ eyebrow, term, def, chips = [], pre }) => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>{eyebrow}</Eyebrow>
        {pre}
        <Card focus style={{ padding: "34px 36px", display: "flex", flexDirection: "column", gap: 18 }}>
          <GradientTitle text={term.text} at={term.at} size={76} />
          <Appear at={def.at} popIn={false}>
            <div style={{ ...bodyText, fontSize: 34, fontWeight: 500, color: L.text2 }}>{def.text}</div>
          </Appear>
        </Card>
        {chips.map((c) => (
          <Appear key={c.at} at={c.at}>
            <Chip>
              {c.icon && <Icon name={c.icon} size={26} color={L.accentText} />}
              {c.text}
            </Chip>
          </Appear>
        ))}
      </Panel>
      <S name="whooshSoft" at={from} />
      <TypeS text={term.text} at={term.at} cps={14} />
      {chips.map((c, i) => (
        <S key={c.at} name={POPS[(i + 1) % 3]} at={c.at} />
      ))}
    </>
  );
};

// Dark code block, text #eef4ff on #101828
export const CodeLine: React.FC<{
  parts: { text: string; at: number; cps?: number; color?: string }[];
  dim?: boolean;
  hl?: boolean;
  size?: number;
}> = ({ parts, dim, hl, size = 32 }) => (
  <div
    style={{
      fontFamily: mono,
      fontWeight: 500,
      fontSize: size,
      color: L.darkText,
      padding: "10px 16px",
      borderRadius: 12,
      background: hl ? "rgba(57,134,255,.22)" : "transparent",
      opacity: dim ? 0.45 : 1,
      whiteSpace: "pre",
    }}
  >
    <span style={{ color: "#6b7a99" }}>$ </span>
    {parts.map((p) => (
      <Typed key={p.at} text={p.text} at={p.at} cps={p.cps ?? 16} cursorColor={L.darkText} style={{ color: p.color }} />
    ))}
  </div>
);

export const CodeBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      background: L.dark,
      borderRadius: 24,
      boxShadow: SHADOW,
      padding: "22px 18px 26px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}
  >
    <div style={{ display: "flex", gap: 8, padding: "0 16px 12px" }}>
      {["#55617a", "#55617a", "#55617a"].map((c, i) => (
        <div key={i} style={{ width: 12, height: 12, borderRadius: 999, background: c }} />
      ))}
    </div>
    {children}
  </div>
);

export const Arrow: React.FC<{ at: number; label?: string }> = ({ at, label }) => {
  const t = useT();
  const p = enter(t, at, 0.32);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, paddingLeft: 40, height: 64 }}>
      <svg width="24" height="64" viewBox="0 0 24 64" style={{ opacity: p }}>
        <line x1="12" y1="2" x2="12" y2={2 + 52 * p} stroke={L.accent} strokeWidth={3} strokeLinecap="round" />
        {p > 0.9 && <polyline points="5 50 12 58 19 50" fill="none" stroke={L.accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
      {label && (
        <div style={{ opacity: enter(t, at + 0.1, 0.2), fontFamily: mono, fontWeight: 700, fontSize: 26, color: L.accentText }}>{label}</div>
      )}
    </div>
  );
};

export const StageBox: React.FC<{ icon: IconName; title: string; sub: string; focus?: boolean }> = ({ icon, title, sub, focus }) => (
  <Card focus={focus} style={{ display: "flex", alignItems: "center", gap: 22, padding: "20px 26px" }}>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 18,
        background: L.chipLight,
        border: `1px solid ${L.chipBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon name={icon} size={34} color={L.accentText} />
    </div>
    <div>
      <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 32, color: L.text, letterSpacing: "-0.02em" }}>{title}</div>
      <div style={{ ...bodyText, fontSize: 25, fontWeight: 500, color: L.text2 }}>{sub}</div>
    </div>
  </Card>
);

// ---------- diagram helpers ----------

export const Dots: React.FC<{ n: number; at: number; step: number; ghost?: number }> = ({ n, at, step, ghost = 0 }) => {
  const t = useT();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {Array.from({ length: n + ghost }).map((_, i) => {
        const isGhost = i >= n;
        const p = isGhost ? 1 : enter(t, at + i * step, 0.2);
        return (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 46, height: 3, background: isGhost ? L.chipBorder : L.accent, opacity: p }} />}
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                background: isGhost ? "transparent" : L.accent,
                border: isGhost ? `3px dashed ${L.chipBorder}` : "none",
                opacity: p,
                transform: `scale(${isGhost ? 1 : pop(t, at + i * step)})`,
              }}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const Node: React.FC<{ icon: IconName; title: string; sub: string }> = ({ icon, title, sub }) => (
  <Card style={{ display: "flex", alignItems: "center", gap: 22 }}>
    <Icon name={icon} size={52} />
    <div>
      <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 32, color: L.text }}>{title}</div>
      <div style={{ ...bodyText, fontSize: 25, fontWeight: 500, color: L.text2 }}>{sub}</div>
    </div>
  </Card>
);

export const Cmd: React.FC<{ icon: IconName; cmd: string; label: string }> = ({ icon, cmd, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, background: L.dark, borderRadius: 999, padding: "12px 26px 12px 18px" }}>
    <Icon name={icon} size={30} color="#9cc2ff" />
    <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 28, color: L.darkText }}>{cmd}</span>
    <span style={{ fontFamily: archivo, fontWeight: 500, fontSize: 23, color: "#b6c3da" }}>{label}</span>
  </div>
);

export const Column: React.FC<{ title: string; icon: IconName; lines: { at: number; text: string }[]; focus?: boolean }> = ({
  title,
  icon,
  lines,
  focus,
}) => (
  <Card focus={focus} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18, padding: "28px 26px" }}>
    <Icon name={icon} size={44} />
    <div style={{ fontFamily: sora, fontWeight: 700, fontSize: 40, color: L.text, letterSpacing: "-0.02em" }}>{title}</div>
    {lines.map((l) => (
      <Appear key={l.at} at={l.at} popIn={false}>
        <div style={{ ...bodyText, fontSize: 26, fontWeight: 500, color: L.text2 }}>{l.text}</div>
      </Appear>
    ))}
  </Card>
);
