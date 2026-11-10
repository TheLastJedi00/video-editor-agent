// The current Aula edit: "Review Double WH Questions" (BF Academy, Portuguese main captions). Rewrite
// this file and data/aula_subs.json for each new Aula edit; Aula.tsx, AulaKit.tsx and AulaCaptions.tsx stay.
//
// A camera lesson (the teacher centred in the frame). The source is cut at 17.5 s (the lesson starts
// there); every time below is in seconds on the cut timeline, which is the timeline of public/aula_base.mp4.
import React, { useContext } from "react";
import { Img, interpolate, staticFile } from "remotion";
import subs from "./data/aula_subs.json";
import type { AulaSub, Lang } from "./AulaCaptions";
import { body, display, L, spring } from "./identity";
import {
  Appear,
  Card,
  Chip,
  Eyebrow,
  Icon,
  IconName,
  InsertCtx,
  Panel,
  POPS,
  S,
  TypeS,
  Typed,
  bodyText,
  gradientText,
  titleStyle,
  useT,
} from "./AulaKit";

export const AULA_DURATION = 305.0;
export const AULA_SUBS = subs as AulaSub[];
export const AULA_MAIN: Lang = "pt";

// Camera lesson: the full frame, captions at the bottom
export const AULA_FULL = { scale: 1, x: 0, y: 0 };
export const AULA_CAPTION = { maxWidth: 1500, bottom: 40, size: 40 };
export const AULA_REDACT: { from: number; to: number; x: number; y: number; w: number; h: number }[] = [];

// ---------- pieces of this edit ----------

const CPS = 16; // typing speed of example sentences

const label: React.CSSProperties = {
  fontFamily: body,
  fontWeight: 600,
  fontSize: 19,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: L.accentText,
};

const Gold: React.FC<{ on?: boolean; children: React.ReactNode }> = ({ on = true, children }) => (
  <span style={{ color: on ? L.accent : L.text }}>{children}</span>
);

const IconChip: React.FC<{ at: number; icon: IconName; children: React.ReactNode; color?: string; strong?: boolean }> = ({
  at,
  icon,
  children,
  color,
  strong,
}) => (
  <Appear at={at}>
    <Chip strong={strong}>
      <Icon name={icon} size={26} color={strong ? L.strongText : (color ?? L.accentText)} />
      {children}
    </Chip>
  </Appear>
);

// A chip crossed out in red at `strike`
const StruckChip: React.FC<{ at: number; strike: number; children: React.ReactNode }> = ({ at, strike, children }) => {
  const t = useT();
  const w = interpolate(t, [strike, strike + 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Appear at={at}>
      <div style={{ position: "relative", display: "inline-flex" }}>
        <Chip>{children}</Chip>
        {w > 0 && (
          <div
            style={{ position: "absolute", left: 14, top: "50%", height: 4, width: `calc(${w * 100}% - 28px)`, borderRadius: 2, background: L.error }}
          />
        )}
      </div>
    </Appear>
  );
};

// An English example typed in, with the Portuguese line she says
const Example: React.FC<{ en: { text: string; at: number }; pt?: { text: string; at: number }; tag?: string; size?: number }> = ({
  en,
  pt,
  tag = "For example",
  size = 40,
}) => (
  <Appear at={en.at - 0.25}>
    <Card style={{ display: "flex", flexDirection: "column", gap: 10, padding: "22px 28px" }}>
      <div style={label}>{tag}</div>
      <div style={{ ...bodyText, fontSize: size, minHeight: size * 1.3 }}>
        <Typed text={en.text} at={en.at} cps={CPS} />
      </div>
      {pt && (
        <Appear at={pt.at} popIn={false}>
          <div style={{ ...bodyText, fontSize: 28, fontWeight: 500, color: L.text2 }}>{pt.text}</div>
        </Appear>
      )}
    </Card>
  </Appear>
);

type WordProps = {
  n: string;
  word: { text: string; at: number };
  pt?: { text: string; at: number };
  ex?: { text: string; at: number };
  exPt?: { text: string; at: number };
  children?: React.ReactNode; // extra rows
  sfx?: React.ReactNode; // their sound effects
};

// One WH word: number, word, translation, example
const WordInsert: React.FC<WordProps> = ({ n, word, pt, ex, exPt, children, sfx }) => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>WH question · {n}</Eyebrow>
        <Appear at={word.at}>
          <Card focus style={{ display: "flex", alignItems: "baseline", gap: 24, padding: "26px 32px" }}>
            <div style={{ ...titleStyle, fontSize: 84 }}>
              <span style={gradientText}>{word.text}</span>
            </div>
            {pt && (
              <Appear at={pt.at} popIn={false}>
                <div style={{ fontFamily: body, fontWeight: 500, fontSize: 38, color: L.text2 }}>{pt.text}</div>
              </Appear>
            )}
          </Card>
        </Appear>
        {ex && <Example en={ex} pt={exPt} />}
        {children}
      </Panel>
      <S name="whooshSoft" at={from} />
      {word.at > from + 0.3 && <S name="pop1" at={word.at} />}
      {pt && <S name="pop2" at={pt.at} />}
      {ex && <TypeS text={ex.text} at={ex.at} cps={CPS} />}
      {exPt && <S name="pop3" at={exPt.at} />}
      {sfx}
    </>
  );
};

// ---------- inserts ----------

// I01 · title
const I01 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <IconChip at={from + 0.1} icon="history">
          Aula de revisão
        </IconChip>
        <div style={{ ...titleStyle, fontSize: 96, minHeight: 112 }}>
          <Typed text="WH Questions" at={6.41} cps={14} style={gradientText} />
        </div>
      </Panel>
      <S name="whooshSoft" at={from} />
      <TypeS text="WH Questions" at={6.41} cps={14} />
    </>
  );
};

// I02 · the term
const I02 = () => {
  const { from } = useContext(InsertCtx);
  const t = useT();
  const WH = 15.47;
  return (
    <>
      <Panel>
        <Eyebrow>O que são?</Eyebrow>
        <Card focus style={{ padding: "34px 36px", display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ ...titleStyle, fontSize: 76 }}>
            <span style={gradientText}>WH Questions</span>
          </div>
          <Appear at={13.13} popIn={false}>
            <div style={{ ...bodyText, fontSize: 34, fontWeight: 500, color: L.text2 }}>
              Perguntas iniciadas por{" "}
              <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                <Gold on={t >= WH}>W H</Gold>
              </span>
            </div>
          </Appear>
        </Card>
      </Panel>
      <S name="whooshSoft" at={from} />
      <S name="pop1" at={WH} />
    </>
  );
};

// I03 · who
const I03 = () => (
  <WordInsert
    n="01"
    word={{ text: "Who", at: 26.09 }}
    pt={{ text: "quem", at: 26.79 }}
    ex={{ text: "Who are you?", at: 29.41 }}
    exPt={{ text: "Quem é você?", at: 30.51 }}
  />
);

// I04 · whom: about a third person
const PERSONS = [
  { at: 64.89, text: "Eu · 1ª pessoa" },
  { at: 66.17, text: "Você · 2ª pessoa" },
  { at: 69.69, text: "Uma 3ª pessoa", strong: true },
];
const I04 = () => (
  <WordInsert
    n="02"
    word={{ text: "Whom", at: 34.87 }}
    pt={{ text: "quem", at: 45.07 }}
    ex={{ text: "Whom did you call?", at: 37.77 }}
    exPt={{ text: "Quem te ligou?", at: 40.21 }}
    sfx={
      <>
        <S name="pop1" at={51.33} />
        <S name="pop2" at={55.67} />
        {PERSONS.map((p) => (
          <S key={p.at} name="tick" at={p.at} />
        ))}
      </>
    }
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <IconChip at={51.33} icon="message">
        who: pergunta direta
      </IconChip>
      <IconChip at={55.67} icon="user">
        whom: sobre uma <Gold>terceira pessoa</Gold>
      </IconChip>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {PERSONS.map((p) => (
        <Appear key={p.at} at={p.at}>
          <Chip strong={p.strong}>{p.text}</Chip>
        </Appear>
      ))}
    </div>
  </WordInsert>
);

// I05 · whose
const I05 = () => (
  <WordInsert
    n="03"
    word={{ text: "Whose", at: 76.73 }}
    pt={{ text: "de quem", at: 82.37 }}
    ex={{ text: "Whose pens and books are these?", at: 89.55 }}
    exPt={{ text: "De quem são essas canetas e livros?", at: 95.63 }}
    sfx={<S name="ding" at={98.87} volume={0.6} />}
  >
    <Appear at={98.87}>
      <Chip strong>whose sozinho = de quem</Chip>
    </Appear>
  </WordInsert>
);

// I06 · why
const I06 = () => (
  <WordInsert
    n="04"
    word={{ text: "Why", at: 103.31 }}
    pt={{ text: "por quê", at: 106.21 }}
    ex={{ text: "Why do you say that?", at: 109.51 }}
    exPt={{ text: "Por que você diz isso?", at: 113.19 }}
  />
);

// I07 · which
const I07 = () => (
  <WordInsert
    n="05"
    word={{ text: "Which", at: 122.35 }}
    pt={{ text: "qual", at: 130.89 }}
    ex={{ text: "Which do you want?", at: 129.55 }}
    exPt={{ text: "Qual você quer?", at: 130.89 }}
    sfx={<S name="pop1" at={126.45} />}
  >
    <IconChip at={126.45} icon="layers">
      Quando temos opções
    </IconChip>
  </WordInsert>
);

// I08 · what
const I08 = () => (
  <WordInsert
    n="06"
    word={{ text: "What", at: 136.54 }}
    pt={{ text: "o quê", at: 140.16 }}
    ex={{ text: "What do you do?", at: 141.48 }}
    exPt={{ text: "O que você faz?", at: 143.34 }}
  />
);

// I09 · where
const I09 = () => (
  <WordInsert
    n="07"
    word={{ text: "Where", at: 147.76 }}
    pt={{ text: "onde", at: 149.5 }}
    ex={{ text: "Where is Jonas?", at: 152.0 }}
    exPt={{ text: "Onde está Jonas?", at: 158.26 }}
  />
);

// I10 · when
const I10 = () => (
  <WordInsert
    n="08"
    word={{ text: "When", at: 160.92 }}
    pt={{ text: "quando", at: 164.12 }}
    ex={{ text: "When do you arrive?", at: 165.72 }}
    exPt={{ text: "Quando você chega?", at: 168.56 }}
  />
);

// I11 · how: not originally a WH question (an O between the H and the W), but it complements the others
const LETTERS = [
  { ch: "H", at: 185.57, gold: true },
  { ch: "O", at: 186.85, gold: false },
  { ch: "W", at: 184.77, gold: true },
];
const NOT_WH = 178.61;
const I11 = () => {
  const t = useT();
  return (
    <WordInsert
      n="extra"
      word={{ text: "How", at: 170.56 }}
      pt={{ text: "como", at: 174.78 }}
      ex={{ text: "How are you?", at: 173.18 }}
      sfx={
        <>
          <S name="tick" at={NOT_WH} />
          {LETTERS.map((l, i) => (
            <S key={l.ch} name={POPS[i % 3]} at={l.at} />
          ))}
          <S name="ding" at={196.29} volume={0.6} />
        </>
      }
    >
      <Appear at={NOT_WH}>
        <Card style={{ display: "flex", flexDirection: "column", gap: 14, padding: "20px 28px" }}>
          <div style={label}>Não é originalmente uma WH question</div>
          <div style={{ display: "flex", gap: 10 }}>
            {LETTERS.map((l) => {
              const on = t >= l.at;
              const color = !on ? L.text : l.gold ? L.accent : L.error;
              return (
                <div
                  key={l.ch}
                  style={{
                    width: 64,
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 14,
                    background: L.chip,
                    border: `2px solid ${on ? color : L.chipBorder}`,
                    fontFamily: display,
                    fontWeight: 700,
                    fontSize: 42,
                    color,
                    transform: on && t < l.at + 0.4 ? `scale(${spring(t, l.at)})` : "none",
                  }}
                >
                  {l.ch}
                </div>
              );
            })}
            <Appear at={186.85} popIn={false} style={{ alignSelf: "center" }}>
              <div style={{ ...bodyText, fontSize: 24, fontWeight: 500, color: L.text2, marginLeft: 8 }}>o O separa o H do W</div>
            </Appear>
          </div>
        </Card>
      </Appear>
      <Appear at={196.29}>
        <Chip strong>Complementa todas as outras</Chip>
      </Appear>
    </WordInsert>
  );
};

// I12 · WH questions have no yes/no short answer
const I12 = () => {
  const { from } = useContext(InsertCtx);
  const t = useT();
  const WRONG = 212.61;
  return (
    <>
      <Panel>
        <Eyebrow>Como responder?</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <StruckChip at={206.23} strike={207.95}>
            Yes, I do.
          </StruckChip>
          <StruckChip at={207.27} strike={208.13}>
            No, I don&apos;t.
          </StruckChip>
        </div>
        <Appear at={209.7}>
          <Card style={{ display: "flex", flexDirection: "column", gap: 12, padding: "22px 28px" }}>
            <div style={{ ...bodyText, fontSize: 40, minHeight: 52 }}>
              <Typed text="What do you do?" at={209.95} cps={CPS} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: t >= WRONG ? 1 : 0 }}>
              <Icon name="ban" size={30} color={L.error} />
              <div style={{ ...bodyText, fontSize: 32, color: L.text2 }}>Yes, I do.</div>
            </div>
          </Card>
        </Appear>
        <IconChip at={222.29} icon="ban" color={L.error}>
          Sem short answer pronta
        </IconChip>
      </Panel>
      <S name="whooshSoft" at={from} />
      <S name="pop1" at={206.23} />
      <S name="pop2" at={207.27} />
      <S name="error" at={207.95} volume={0.5} />
      <TypeS text="What do you do?" at={209.95} cps={CPS} />
      <S name="error" at={WRONG} volume={0.5} />
      <S name="pop3" at={222.29} />
    </>
  );
};

// I13 · answer according to the context
const I13 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>Como responder?</Eyebrow>
        <Appear at={229.17}>
          <Chip strong>De acordo com o contexto da pergunta</Chip>
        </Appear>
        <Example en={{ text: "How are you?", at: 232.53 }} pt={{ text: "Como você está?", at: 233.35 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <IconChip at={234.47} icon="check" color={L.success}>
            I&apos;m fine.
          </IconChip>
          <IconChip at={235.93} icon="check" color={L.success}>
            I&apos;m not so good today.
          </IconChip>
        </div>
      </Panel>
      <S name="whooshSoft" at={from} />
      <S name="pop1" at={229.17} />
      <TypeS text="How are you?" at={232.53} cps={CPS} />
      <S name="pop2" at={234.47} />
      <S name="pop3" at={235.93} />
    </>
  );
};

// I14 · the challenge: how to ask about frequency? How often (silent T)
const I14 = () => {
  const { from } = useContext(InsertCtx);
  const t = useT();
  const ANSWER = 284.57;
  const T_OFF = 292.39;
  const strike = interpolate(t, [T_OFF, T_OFF + 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <Panel>
        <div style={{ ...titleStyle, fontSize: 80, minHeight: 92 }}>
          <Typed text="Challenge" at={252.71} cps={12} style={gradientText} />
        </div>
        <Appear at={255.27}>
          <Card style={{ display: "flex", flexDirection: "column", gap: 10, padding: "22px 28px" }}>
            <div style={label}>Que pergunta eu faria?</div>
            <div style={{ ...bodyText, fontSize: 32 }}>Com que frequência você faz alguma coisa?</div>
          </Card>
        </Appear>
        {t < ANSWER && (
          <IconChip at={273.41} icon="history">
            Pense um pouco…
          </IconChip>
        )}
        <div
          style={{
            opacity: t >= ANSWER ? 1 : 0,
            transform: t >= ANSWER && t < ANSWER + 0.4 ? `scale(${spring(t, ANSWER)})` : "none",
          }}
        >
          <Card focus style={{ display: "flex", alignItems: "center", gap: 16, padding: "22px 28px" }}>
            <Icon name="check" size={36} color={L.success} />
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 52, letterSpacing: "-0.02em" }}>
              <span style={{ color: L.text }}>How </span>
              <span style={{ color: L.accent }}>
                of
                <span style={{ position: "relative", display: "inline-block", opacity: 1 - strike * 0.55 }}>
                  t
                  {strike > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        left: -4,
                        top: "55%",
                        height: 5,
                        width: `calc(${strike * 100}% + 8px)`,
                        borderRadius: 3,
                        background: L.error,
                      }}
                    />
                  )}
                </span>
                en?
              </span>
            </div>
          </Card>
        </div>
        <IconChip at={293.23} icon="eye">
          O T é uma <Gold>silent letter</Gold>
        </IconChip>
      </Panel>
      <S name="whooshSoft" at={from} />
      <TypeS text="Challenge" at={252.71} cps={12} />
      <S name="pop1" at={255.27} />
      <S name="pop2" at={273.41} />
      <S name="confirm" at={ANSWER} />
      <S name="ding" at={ANSWER + 0.15} volume={0.6} />
      <S name="error" at={T_OFF} volume={0.4} />
      <S name="pop3" at={293.23} />
    </>
  );
};

// End card · logo and goodbye
const End = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30, textAlign: "center" }}>
          <Appear at={from + 0.1} popIn={false}>
            <Img src={staticFile("bf-academy.svg")} style={{ width: 200, height: 200 }} />
          </Appear>
          <div style={{ ...titleStyle, fontSize: 76, minHeight: 90 }}>
            <Typed text="Bye, bye!" at={303.13} cps={14} style={gradientText} />
          </div>
        </div>
      </Panel>
      <S name="whooshSoft" at={from} />
      <TypeS text="Bye, bye!" at={303.13} cps={14} />
      <S name="ding" at={303.8} volume={0.6} />
    </>
  );
};

// The plan: one infographic at a time, [from, to] in seconds; the presenter shrinks while one is on
export const AULA_INSERTS: { from: number; to: number; el: React.ReactNode; callout?: boolean }[] = [
  { from: 1.9, to: 12.5, el: <I01 /> },
  { from: 12.6, to: 24.4, el: <I02 /> },
  { from: 24.6, to: 32.2, el: <I03 /> },
  { from: 32.3, to: 75.6, el: <I04 /> },
  { from: 76.4, to: 102.0, el: <I05 /> },
  { from: 103.0, to: 121.3, el: <I06 /> },
  { from: 121.4, to: 134.9, el: <I07 /> },
  { from: 135.0, to: 147.3, el: <I08 /> },
  { from: 147.4, to: 160.5, el: <I09 /> },
  { from: 160.6, to: 170.3, el: <I10 /> },
  { from: 170.4, to: 200.4, el: <I11 /> },
  { from: 200.5, to: 226.5, el: <I12 /> },
  { from: 226.9, to: 243.0, el: <I13 /> },
  { from: 245.5, to: 299.9, el: <I14 /> },
  { from: 300.0, to: AULA_DURATION, el: <End /> },
];
