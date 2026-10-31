# CLAUDE.md

All project instructions live in `AGENTS.md`, shared by every agent. It imports the four rules
files (`VIDEO_RULES.md`, `VISUAL_RULES.md`, `IDIOMA_RULES.md`, `SFX_RULES.md`).

@AGENTS.md

## Claude Code specifics

- Ask the three intake questions (style, visual identity, caption language) in a single
  `AskUserQuestion` call.
- Skills are available through the Skill tool (`.claude/skills/`, symlinked to
  `.agents/skills/`).
