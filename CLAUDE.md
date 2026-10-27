# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Prompt-driven video editing agent ("Agent editor de vídeo via prompt", per README.md). The project documentation is written in Portuguese.

## Workflow

- Raw videos arrive in `input/`. The edited video goes to `output/` as an `.mp4`. Never modify or overwrite the file in `input/`.
- Before starting any edit, always ask two questions in a single `AskUserQuestion` call, even if earlier videos in the conversation used a given answer:
  1. **Video style:** which `VIDEO_RULES.md` model to follow (Aula or Reels).
  2. **Visual identity:** which `VISUAL_RULES.md` identity to use (BF Academy, Leno Borges, or Liga Dev).
- Then follow the shared flow in `VIDEO_RULES.md`.

## Editing rules (always loaded)

Before editing any video, follow these files. They are imported here so they load at the start of every session:

- @VISUAL_RULES.md: the three visual identities (from `visual-id/`). Always ask which one to use whenever a video is sent.
- @VIDEO_RULES.md: the two editing models, Aula (lectures) and Reels (short-form).

## Current state

No application code exists yet. No language, framework, build system, or test setup has been chosen, and the directory is not a git repository. When code is added, update this file with the build, lint, and test commands (including how to run a single test) and a summary of the architecture.

What the repository holds today is the agent's toolset: third-party skills that cover the video/audio pipeline.

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
- The vendored skills bring their own `.claude/`, `.github/`, and CI files (for example, under `ffmpeg-skill/`). Those belong to the upstream projects and are not this project's configuration.
