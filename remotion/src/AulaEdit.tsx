// The current Aula edit: "Git e Github 1" (Liga Dev, English main captions). Rewrite this file and
// data/aula_subs.json for each new Aula edit; Aula.tsx, AulaKit.tsx and AulaCaptions.tsx stay.
// Times are seconds on the source timeline (public/aula_base.mp4).
import React, { useContext } from "react";
import { Img, staticFile } from "remotion";
import subs from "./data/aula_subs.json";
import type { AulaSub } from "./AulaCaptions";
import { L, mono } from "./ligaDev";
import {
  Appear,
  Arrow,
  Card,
  Chip,
  Cmd,
  CodeBox,
  CodeLine,
  Column,
  Dots,
  Eyebrow,
  GradientTitle,
  Icon,
  InsertCtx,
  ListInsert,
  Node,
  Panel,
  S,
  StageBox,
  TermInsert,
  TypeS,
  Typed,
  bodyText,
  gradientText,
  titleStyle,
  useT,
} from "./AulaKit";

export const AULA_DURATION = 408.63;
export const AULA_SUBS = subs as AulaSub[];

// 1 · 9.7–26.0 · why version code + the topic
export const I01 = () => (
  <ListInsert
    eyebrow="Today's topic"
    title={{ text: "Code versioning", at: 22.67 }}
    items={[
      { at: 10.37, text: "Save your progress", icon: "save" },
      { at: 13.67, text: "Evolve it over time", icon: "trend" },
      { at: 16.59, text: "Go back if something goes wrong", icon: "undo" },
    ]}
  />
);

// 2 · 30.4–46.9 · Git
export const I02 = () => (
  <TermInsert
    eyebrow="The must-have tool"
    term={{ text: "Git", at: 32.99 }}
    def={{ text: "Saves my change history.", at: 39.33 }}
    chips={[{ text: "The standard", at: 33.91, icon: "check" }]}
  />
);

// 3 · 47.0–71.3 · what Git does
export const I03 = () => (
  <ListInsert
    eyebrow="What Git does"
    items={[
      { at: 47.53, text: "Follows how your files evolve", icon: "eye" },
      { at: 53.73, text: "Alerts if they're all versioned", icon: "check" },
      { at: 57.63, text: "Checks the whole history matches", icon: "history" },
      { at: 66.65, text: "Parallel versions of the project", icon: "branch" },
    ]}
  />
);

// 4 · 77.9–104.0 · code versioning
export const I04 = () => (
  <ListInsert
    eyebrow="Code versioning"
    title={{ text: "Working code + new function", at: 80.71 }}
    items={[
      { at: 88.67, text: "Go back if something goes wrong", icon: "undo" },
      { at: 93.95, text: "Every step is saved", icon: "save" },
      { at: 97.75, text: "See each step, work between them", icon: "eye" },
    ]}
  />
);

// 5 · 118.4–140.8 · repository
export const I05 = () => (
  <>
    <I05Term />
    <S name="pop1" at={119.71} />
    <S name="pop2" at={121.93} />
    <S name="pop3" at={124.71} />
  </>
);
const I05Term = () => (
  <TermInsert
    eyebrow="Starting Git"
    pre={
      <div style={{ display: "flex", gap: 14 }}>
        <Appear at={119.71}>
          <Chip>
            <Icon name="folder" size={26} color={L.accentText} />
            Project
          </Chip>
        </Appear>
        <Appear at={121.93}>
          <Chip>
            <Icon name="file" size={26} color={L.accentText} />
            File
          </Chip>
        </Appear>
        <Appear at={124.71}>
          <Chip strong>+ Git</Chip>
        </Appear>
      </div>
    }
    term={{ text: "Repository", at: 126.69 }}
    def={{ text: "The whole project scope Git is watching.", at: 132.61 }}
    chips={[{ text: "Start Git → it becomes a repository", at: 137.25 }]}
  />
);

// 6 · 146.2–205.3 · untracked
export const I06 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>File life cycle</Eyebrow>
        <GradientTitle text="Untracked" at={154.21} />
        <Appear at={155.15}>
          <StageBox icon="file" title="Files from before Git" sub="Git never saw them being created" focus />
        </Appear>
        <Appear at={178.37}>
          <StageBox icon="cart" title="Shopping analogy" sub="Not in the shopping cart yet" />
        </Appear>
        <Appear at={191.81}>
          <Chip>
            <Icon name="file" size={26} color={L.accentText} />
            Each new file = an item on the list
          </Chip>
        </Appear>
      </Panel>
      <S name="whooshSoft" at={from} />
      <TypeS text="Untracked" at={154.21} cps={14} />
      <S name="tick" at={155.15} />
      <S name="tick" at={178.37} />
      <S name="pop2" at={191.81} />
    </>
  );
};

// 7 · 205.3–237.9 · git add
export const I07 = () => {
  const { from } = useContext(InsertCtx);
  const t = useT();
  const second = t >= 234.81;
  return (
    <>
      <Panel>
        <Eyebrow>Track a file</Eyebrow>
        <GradientTitle text="git add" at={205.39} />
        <CodeBox>
          <CodeLine
            dim={second}
            parts={[
              { text: "git add", at: 205.6 },
              { text: " main.java", at: 214.29, color: "#9cc2ff" },
            ]}
          />
          {t >= 234.6 && <CodeLine hl parts={[{ text: "git add .", at: 234.81, cps: 14 }]} />}
        </CodeBox>
        <Appear at={210.59}>
          <Chip>
            <Icon name="file" size={26} color={L.accentText} />
            add + the file name (with extension)
          </Chip>
        </Appear>
        <Appear at={232.27}>
          <Chip>Many files? A dot instead of the name</Chip>
        </Appear>
      </Panel>
      <S name="whooshSoft" at={from} />
      <TypeS text="git add" at={205.6} cps={16} />
      <TypeS text=" main.java" at={214.29} cps={16} />
      <S name="pop1" at={210.59} />
      <S name="pop2" at={232.27} />
      <TypeS text="git add ." at={234.81} cps={14} />
      <S name="select" at={235.5} />
    </>
  );
};

// 8 · 238.0–262.2 · the full life cycle
export const I08 = () => (
  <>
    <Panel>
      <Eyebrow>File life cycle</Eyebrow>
      <StageBox icon="file" title="Untracked" sub="Not in the cart yet" />
      <Arrow at={243.59} label="git add" />
      <Appear at={243.59}>
        <StageBox icon="cart" title="In the cart" sub="First stage · I can still change my mind" />
      </Appear>
      <Arrow at={257.15} label="git commit" />
      <Appear at={257.57}>
        <StageBox icon="check" title="Checkout" sub="Purchase closed" focus />
      </Appear>
    </Panel>
    <S name="tick" at={243.59} />
    <S name="tick" at={257.57} />
  </>
);

// 9 · 262.2–286.2 · git commit -m
export const I09 = () => {
  const { from } = useContext(InsertCtx);
  return (
    <>
      <Panel>
        <Eyebrow>Save a version</Eyebrow>
        <GradientTitle text="git commit" at={262.41} />
        <Appear at={266.83} popIn={false}>
          <div style={{ ...bodyText, fontWeight: 500, color: L.text2 }}>A message describing what I changed.</div>
        </Appear>
        <CodeBox>
          <CodeLine
            hl
            size={26}
            parts={[
              { text: "git commit", at: 269.57 },
              { text: " -m", at: 271.17, color: "#9cc2ff" },
              { text: ' "', at: 276.29, color: "#b9a6ff" },
              { text: "initial commit", at: 279.29, color: "#b9a6ff" },
              { text: '"', at: 282.81, color: "#b9a6ff" },
            ]}
          />
        </CodeBox>
        <Appear at={284.51}>
          <Chip>
            <Icon name="check" size={26} color={L.success} />
            The command runs
          </Chip>
        </Appear>
      </Panel>
      <S name="whooshSoft" at={from} />
      <TypeS text="git commit" at={262.41} cps={14} />
      <TypeS text="git commit" at={269.57} cps={16} />
      <TypeS text=" -m" at={271.17} cps={16} />
      <TypeS text=' "' at={276.29} cps={16} />
      <TypeS text="initial commit" at={279.29} cps={16} />
      <TypeS text='"' at={282.81} cps={16} />
      <S name="typeReturn" at={283.41} />
      <S name="pop1" at={284.51} />
    </>
  );
};

// 10 · 286.2–298.0 · commit = snapshot
export const I10 = () => (
  <TermInsert
    eyebrow="What a commit is"
    term={{ text: "Commit", at: 288.69 }}
    def={{ text: "A snapshot of my project.", at: 289.29 }}
    chips={[
      { text: "Saves all the progress", at: 291.91, icon: "camera" },
      { text: "Tracked → versioned", at: 295.53, icon: "check" },
    ]}
  />
);

// 11 · 298.0–340.4 · history
export const I11 = () => (
  <>
    <Panel>
      <Eyebrow>History</Eyebrow>
      <Appear at={299.53}>
        <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Dots n={4} at={299.93} step={0.3} />
          <div style={bodyText}>Several commits = a history</div>
        </Card>
      </Appear>
      <Appear at={309.21}>
        <Card style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ ...bodyText, fontSize: 25, color: L.text2 }}>Two people, same project</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Icon name="user" />
            <div style={{ ...bodyText, width: 130 }}>Me</div>
            <Dots n={4} at={309.5} step={0.15} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Icon name="user" color={L.text2} />
            <div style={{ ...bodyText, width: 130 }}>Teammate</div>
            <Dots n={3} at={312.17} step={0.15} ghost={1} />
          </div>
          <Appear at={313.97}>
            <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 20, color: "#8a5a00", background: "#fff4e0", borderRadius: 999, padding: "6px 16px", display: "inline-block" }}>
              ONE STEP BEHIND
            </div>
          </Appear>
        </Card>
      </Appear>
      <Appear at={322.61}>
        <Card focus style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Icon name="history" size={36} />
          <div style={bodyText}>Git compares the history, not only code</div>
        </Card>
      </Appear>
      <Appear at={337.29}>
        <Chip strong>Versioning = code + history</Chip>
      </Appear>
    </Panel>
    <S name="whooshSoft" at={298.0} />
    {[0, 1, 2, 3].map((i) => (
      <S key={i} name="tick" at={299.93 + i * 0.3} volume={0.8} />
    ))}
    <S name="pageTurn" at={309.21} />
    <S name="pop3" at={313.97} />
    <S name="confirm" at={322.61} />
    <S name="pop1" at={337.29} />
  </>
);

// 12 · 343.7–359.0 · GitHub
export const I12 = () => (
  <TermInsert
    eyebrow="Another tool"
    term={{ text: "GitHub", at: 347.29 }}
    def={{ text: "A social network where we put our code.", at: 353.47 }}
    chips={[{ text: "Git + GitHub, together", at: 356.65, icon: "branch" }]}
  />
);

// 13 · 359.0–382.2 · local ⇄ cloud
export const I13 = () => (
  <>
    <Panel>
      <Eyebrow>Local ⇄ cloud</Eyebrow>
      <Appear at={368.65}>
        <Node icon="cloud" title="Cloud" sub="GitHub" />
      </Appear>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "0 10px" }}>
        <Appear at={375.31}>
          <Cmd icon="up" cmd="git push" label="send to the cloud" />
        </Appear>
        <Appear at={379.55}>
          <Cmd icon="down" cmd="git pull" label="bring it to me" />
        </Appear>
      </div>
      <Appear at={359.25}>
        <Node icon="laptop" title="Local repository" sub="Git" />
      </Appear>
      <Appear at={364.11}>
        <Chip>
          <Icon name="check" size={26} color={L.accentText} />
          Version it: git commit
        </Chip>
      </Appear>
    </Panel>
    <S name="tick" at={359.25} />
    <S name="pop1" at={364.11} />
    <S name="tick" at={368.65} />
    <S name="tick" at={375.31} />
    <S name="tick" at={379.55} />
  </>
);

// 14 · 388.5–401.9 · Git × GitHub
export const I14 = () => (
  <>
    <Panel>
      <Eyebrow>Git × GitHub</Eyebrow>
      <div style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
        <Appear at={388.67} style={{ flex: 1, display: "flex" }}>
          <Column title="Git" icon="laptop" lines={[{ at: 389.51, text: "My local repository" }]} />
        </Appear>
        <Appear at={391.11} style={{ flex: 1, display: "flex" }}>
          <Column
            focus
            title="GitHub"
            icon="globe"
            lines={[
              { at: 391.89, text: "My social network where I publish my repositories" },
              { at: 396.09, text: "Saved publicly: anyone can access and even contribute" },
            ]}
          />
        </Appear>
      </div>
    </Panel>
    <S name="whooshSoft" at={388.5} />
    <S name="pageTurn" at={391.11} />
    <S name="pop2" at={396.09} />
  </>
);

// 15 · 402.4–end · end card
export const I15 = () => (
  <>
    <Panel>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30, textAlign: "center" }}>
        <Appear at={402.5}>
          <Img src={staticFile("liga-dev.svg")} style={{ width: 150, height: 150 }} />
        </Appear>
        <Appear at={403.91}>
          <Eyebrow>This was the intro</Eyebrow>
        </Appear>
        <div style={{ ...titleStyle, fontSize: 60 }}>
          <Typed text="Next video:" at={405.29} cps={18} style={{ color: L.text }} />
          <br />
          <Typed text="in practice" at={405.69} cps={16} style={gradientText} />
        </div>
      </div>
    </Panel>
    <S name="whooshSoft" at={402.4} />
    <TypeS text="in practice" at={405.69} cps={16} />
    <S name="ding" at={406.4} volume={0.7} />
  </>
);

// The plan: one infographic at a time, [from, to] in seconds
export const AULA_INSERTS: { from: number; to: number; el: React.ReactNode }[] = [
  { from: 9.7, to: 26.0, el: <I01 /> },
  { from: 30.4, to: 46.9, el: <I02 /> },
  { from: 47.0, to: 71.3, el: <I03 /> },
  { from: 77.9, to: 104.0, el: <I04 /> },
  { from: 118.4, to: 140.8, el: <I05 /> },
  { from: 146.2, to: 205.2, el: <I06 /> },
  { from: 205.3, to: 237.9, el: <I07 /> },
  { from: 238.0, to: 262.2, el: <I08 /> },
  { from: 262.3, to: 286.2, el: <I09 /> },
  { from: 286.3, to: 298.0, el: <I10 /> },
  { from: 298.1, to: 340.4, el: <I11 /> },
  { from: 343.7, to: 359.0, el: <I12 /> },
  { from: 359.1, to: 382.2, el: <I13 /> },
  { from: 388.5, to: 401.9, el: <I14 /> },
  { from: 402.4, to: AULA_DURATION, el: <I15 /> },
];
