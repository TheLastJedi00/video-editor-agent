# AGENTS.md

Instructions for any AI coding agent (Claude Code, Codex, Gemini CLI, Antigravity, GitHub
Copilot, Cursor, and others) working in this repository. This file is the single source of
truth: `CLAUDE.md`, `GEMINI.md` and `.github/copilot-instructions.md` only point here.

## What this project is

A prompt-driven video editor ("Agent editor de vídeo via prompt"). **You are the editor.** The
user drops a raw video into `input/` and asks for it to be edited; you turn it into a finished,
captioned, animated `.mp4` in `output/`, following the editing rules in this repository. There
is no app to run and no server: the "product" is the edit you produce with the tools listed
below. Project documentation and the rules files are in Portuguese (pt-BR); talk to the user in
Portuguese.

## When a video is in `input/`

Treat any of these as the start of an edit job: the user says they put a video in `input/`,
names a file in `input/`, or asks to edit/cut/caption a video ("edita o vídeo", "tem um vídeo
no input", "faz um reels disso"). If `input/` holds several videos and the user did not name
one, ask which.

### Step 0 — ask three questions, together, before anything else

Ask all three in **one** message (use your agent's structured question tool if it has one, such
as `AskUserQuestion` in Claude Code; otherwise a single numbered message). Ask every time, even
if an earlier video in the same conversation used an answer. Do not probe, transcribe or plan
before the answers arrive.

1. **Estilo do vídeo** (`VIDEO_RULES.md`): **Aula** (lecture, 16:9, full length, discreet
   captions, infographics beside the presenter) or **Reels** (9:16 short-form, jump cuts, big
   word-by-word captions, animations).
2. **Identidade visual** (`VISUAL_RULES.md`): **BF Academy**, **Leno Borges** or **Liga Dev**.
3. **Idioma prioritário da legenda** (`IDIOMA_RULES.md`): **Português** or **Inglês**. Captions
   are always bilingual: the chosen language is the main caption, the other is a subtler line
   under each main line.

### Steps 1–7 — the edit

Follow the shared flow in `VIDEO_RULES.md` ("Fluxo comum"). In short:

1. **Inspect** the video with `ffmpeg-skill` (`probe.py`) and a contact sheet.
2. **Transcribe** with `faster-whisper`, word-level timestamps. Fix names and technical terms.
3. **Map** the editable moments (concepts, lists, numbers, comparisons, steps) with times.
4. **Translate** the captions into the secondary language (`IDIOMA_RULES.md`).
5. **Present the plan and wait for approval:** inserts (type, text, start–end, position), the
   sound effect of each insert (`SFX_RULES.md`), the caption translations, and the output
   format. Do not render before the user approves.
6. **Render:** Remotion (`remotion/`) for captions, infographics, animations and sound effects;
   `ffmpeg-skill` for cuts, audio, loudness, composition and export.
7. **Verify:** contact sheet of the result, nothing over the face, captions readable,
   identity colors, loudness at the target. Report duration, resolution, fps and LUFS.

**Done** = an `.mp4` in `output/` named `<input name>_<aula|reels>.mp4` (for example,
`output/20261026_121820_reels.mp4`), verified, with a short report to the user.

## Rules files (read all four before planning an edit)

@VIDEO_RULES.md
@VISUAL_RULES.md
@IDIOMA_RULES.md
@SFX_RULES.md

If your agent does not expand the `@` imports above, open the files yourself:

| File | Defines |
|---|---|
| `VIDEO_RULES.md` | The shared flow and the two editing models, **Aula** and **Reels**: format, captions, infographics, b-roll, pacing, loudness. |
| `VISUAL_RULES.md` | The three visual identities: colors, fonts, shapes, motion. Summarizes `visual-id/*.md` (the full guides and logos, which win if they disagree). |
| `IDIOMA_RULES.md` | Bilingual captions: main vs. secondary language, translation, sync, the secondary line's look. |
| `SFX_RULES.md` | The sound effect library and which effect plays when each graphic enters the screen, per model, plus mixing. |

## Hard rules

- **Never modify, move or overwrite anything in `input/`.** Work on copies or intermediate
  files elsewhere; the final video goes to `output/`.
- **Never render the final edit without an approved plan** (step 5).
- **Do not invent content.** Infographics, examples and translations show only what the
  presenter said.
- One identity per video; no colors or fonts outside it.
- Every graphic that enters the screen gets a sound effect; the voice always stays on top.
- Do not download stock footage, music or sounds without the user asking.
- Reels renders must be BT.709 `yuv420p` (see commands below), or `check.py` fails.

## Toolset

Agent skills live in `.agents/skills/<name>/`. **Read a skill's `SKILL.md` before using it**; it
defines the workflow and the script flags.

| Skill | Use it for |
|---|---|
| `ffmpeg-skill` | Probe, cut, join, reframe, silence removal, captions, overlays, loudness, platform export, checks (`check.py`). Python 3.10+ stdlib scripts in `scripts/`. Follow its `SKILL.md` workflow order and never call raw `ffmpeg` when a script covers the job. |
| `faster-whisper` (preferred), `openai-whisper` | Local speech-to-text with word timestamps, SRT/VTT. |
| `caption-animation` | Word-timed animated captions. |
| `remotion-best-practices`, `remotion-create` | Remotion (React) rules: animation, audio, captions, rendering. |
| `edge-tts` | Text-to-speech (only if the user asks for narration). |

The machine is Windows with FFmpeg on `PATH` and Python 3.

## The Remotion project (`remotion/`)

The only application code. It renders the graphics layer of an edit: captions, infographics,
hook and end cards, and sound effects. No test setup.

- `src/Reel.tsx`: the Reels composition (base video, punch-ins, insert timeline, captions, end
  card). Times are seconds on the jump-cut timeline. It holds the last edit; rewrite its
  timeline for each new Reels edit.
- `src/Aula.tsx`: the Aula composition (1920×1080): the presenter shrinks to 60% at top-left while
  an infographic is on, with captions under it. Generic; do not rewrite per edit.
- `src/AulaEdit.tsx`: **the current Aula edit**: `AULA_DURATION`, the insert timeline
  (`AULA_INSERTS`) and the inserts `I01`…, plus `src/data/aula_subs.json` (phrase blocks
  `{ startMs, endMs, en, pt }`). Rewrite both for each new Aula edit.
- `src/AulaKit.tsx`: reusable Aula building blocks (panel, list, term card, code box, diagram
  boxes, columns, icons, SFX at 0.6×). `src/AulaCaptions.tsx`: the discreet bilingual phrase
  captions. `src/ligaDev.ts`: Liga Dev tokens, fonts and motion helpers.
- `public/aula_base.mp4`: the 1080p Aula base video, generated per edit, git-ignored.
- `src/Inserts.tsx`: the animated scenes. `src/Captions.tsx`: word-timed captions with an
  optional secondary-language line (`secondary` prop). `src/theme.ts`: identity tokens and fonts
  (via `@remotion/google-fonts`; nothing to install). Swap the tokens to the chosen identity.
- `src/Sfx.tsx`: the `SFX` map (file + default gain), `<Sfx name at volume />` and
  `<TypeSfx />` for typewriter text.
- `src/data/words.json`: word timings (Whisper, corrected, remapped to the cut timeline) in the
  `@remotion/captions` `Caption` format. `src/data/subs.json`: secondary-language phrases (`{ startMs, endMs, text }[]`), created per edit.
- `public/base.mp4`: the jump-cut base video, generated per edit, git-ignored (`*.mp4`).
- `public/sfx/`: the sound effect library (committed). `scripts/build_sfx.py` rebuilds it.

Commands, run from `remotion/`:

```sh
npm i
npm run dev                                   # Remotion Studio
npm run lint                                  # eslint + tsc, run after every code change
npx remotion still Reel out.png --frame=N     # check one frame
npx remotion render Reel out.mp4 --codec=h264 --color-space=bt709 --pixel-format=yuv420p
```

For long Aula videos, do not re-render the whole lecture in Remotion: render each infographic
as a clip with alpha (ProRes 4444 or WebM VP9) and composite with FFmpeg (see `VIDEO_RULES.md`).

## Repository maintenance

- Skills are installed with the `skills` CLI and pinned in `skills-lock.json`. Do not hand-edit
  files under `.agents/skills/`; reinstall or update with
  `npx skills add <repo> --skill <name> -a antigravity antigravity-cli claude-code gemini-cli github-copilot -y`.
- `.claude/skills/` entries are symlinks into `.agents/skills/`, except `ffmpeg-skill`, which is
  a separate real copy.
- Local patch to reapply after updating `faster-whisper`: its `requirements.txt` pins `av<19`
  (PyAV 19 removed the `metadata_errors` argument faster-whisper 1.2.1 passes to `av.open`).
- The vendored skills bring their own `.claude/`, `.github/` and CI files; those belong to the
  upstream projects, not to this one.
- When a rule changes, edit the rules file (`*_RULES.md`) and keep this file's summary in sync.
