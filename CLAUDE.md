# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Prompt-driven video editing agent ("Agent editor de vídeo via prompt", per README.md). The project documentation is written in Portuguese.

## Workflow

- Raw videos arrive in `input/`. The edited video goes to `output/` as an `.mp4`. Never modify or overwrite the file in `input/`.
- Before starting any edit, always ask three questions in a single `AskUserQuestion` call, even if earlier videos in the conversation used a given answer:
  1. **Video style:** which `VIDEO_RULES.md` model to follow (Aula or Reels).
  2. **Visual identity:** which `VISUAL_RULES.md` identity to use (BF Academy, Leno Borges, or Liga Dev).
  3. **Caption language priority:** which `IDIOMA_RULES.md` language is the main caption (Português or Inglês). The other language appears as a subtler line under each main caption line.
- Then follow the shared flow in `VIDEO_RULES.md`.

## Editing rules (always loaded)

Before editing any video, follow these files. They are imported here so they load at the start of every session:

- @VISUAL_RULES.md: the three visual identities (from `visual-id/`). Always ask which one to use whenever a video is sent.
- @VIDEO_RULES.md: the two editing models, Aula (lectures) and Reels (short-form).
- @IDIOMA_RULES.md: bilingual captions (pt-BR and English). Always ask which language is the main caption.
- @SFX_RULES.md: the sound effect library and when to play each effect as graphics enter the screen, in both models.

## Current state

The only application code is `remotion/`, a Remotion (React + TypeScript) project that renders the graphics layer of an edit: captions, infographics/animations, hook and end cards. There is no test setup.

- `remotion/src/Reel.tsx`: the Reels composition (base video, punch-ins, insert timeline, captions, end card). Times are seconds on the jump-cut timeline.
- `remotion/src/Inserts.tsx`, `Captions.tsx`, `theme.ts`: scenes, word-timed captions (with an optional secondary-language line via the `secondary` prop), and identity tokens and fonts (via `@remotion/google-fonts`, so they need not be installed on the system).
- `remotion/src/Sfx.tsx`: the sound effect map (`SFX`, with default gains) and the `<Sfx>` and `<TypeSfx>` components.
- `remotion/public/sfx/`: the sound effect library (WAV, committed). `remotion/scripts/build_sfx.py` rebuilds it: it downloads Kenney (CC0) and remotion.media sounds and synthesizes the rest with FFmpeg.
- `remotion/src/data/words.json`: word timings (Whisper, corrected and remapped to the cut timeline) in the `@remotion/captions` `Caption` format.
- `remotion/public/base.mp4`: the jump-cut base video, generated per edit and ignored by git (`*.mp4`).

Commands, run from `remotion/`: `npm i`, `npm run dev` (Studio), `npm run lint` (eslint + tsc), `npx remotion still Reel out.png --frame=N`, `npx remotion render Reel out.mp4 --codec=h264 --color-space=bt709 --pixel-format=yuv420p`. Render in BT.709 with `yuv420p`; the default output fails the `check.py` pixel-format check for Reels.

The rest of the repository is the agent's toolset: third-party skills that cover the video/audio pipeline.

| Skill | Role |
|---|---|
| `ffmpeg-skill` | Local FFmpeg editing (cut, join, reframe, captions, overlays, loudness, platform exports). Python 3.10+ stdlib scripts plus an MCP server. Its `SKILL.md` defines the workflow order to follow. |
| `faster-whisper`, `openai-whisper` | Local speech-to-text and SRT/VTT generation |
| `caption-animation` | Word-timed, animated captions |
| `edge-tts` | Text-to-speech via `uvx edge-tts` |
| `remotion-create`, `remotion-best-practices` | Programmatic video with Remotion (React) |

## Skill layout

- Skills are installed with the `skills` CLI and pinned in `skills-lock.json` (source repo plus content hash). Re-install or update them through that tool. Do not hand-edit vendored skill files, because the edits break the hash and are lost on update.
- `.agents/skills/` holds the installed copies, shared by Claude Code, Gemini CLI, GitHub Copilot, and Antigravity. Entries in `.claude/skills/` are symlinks into it, except `ffmpeg-skill`, which is a separate real copy. To install a skill the same way, pass all five agents: `npx skills add <repo> --skill <name> -a antigravity antigravity-cli claude-code gemini-cli github-copilot -y`.
- Local patch, which breaks the `faster-whisper` hash and must be reapplied after an update until upstream fixes it: `.agents/skills/faster-whisper/requirements.txt` pins `av<19`, because PyAV 19 removed the `metadata_errors` argument that faster-whisper 1.2.1 passes to `av.open`.
- The vendored skills bring their own `.claude/`, `.github/`, and CI files (for example, under `ffmpeg-skill/`). Those belong to the upstream projects and are not this project's configuration.
