# AGENTS.md - working conventions for any AI assistant

This file is the vendor-neutral home for the conventions this repo expects. It
works with any capable assistant - Claude, GPT, Gemini, a local model - and with
any tool that reads an instructions file:

- **Claude Code** reads `.claude/CLAUDE.md` (which points here).
- **Cursor** reads `.cursorrules` or `.cursor/rules`.
- **GitHub Copilot** reads `.github/copilot-instructions.md`.
- Others: point your tool's instruction file at this one.

The pipeline itself is model-agnostic. The prompt templates in `_templates/`
describe "the assistant" and a workflow, never a specific product. Nothing here
depends on a particular vendor, API, or paid tier.

## Project goal

Turn scattered meeting material (transcripts, notes, screenshots, shared files,
post-meeting correspondence) into coherent project documentation, through four
phases:

1. **Meeting** -> everything the meeting leaves behind goes into one structure.
2. **Themed note** -> structured via prompt, with a glossary + people registry.
3. **Impact analysis** -> per-document report: what changes, where, priority.
4. **Source-document update** -> propagate into the documents that hold the truth,
   then export to deliverables on demand.

Works across domains (IT delivery, marketing, legal, consulting, finance) - the
mechanism is the same; only the source documents differ. See `examples/`.

## Anti-hallucination rules (mandatory)

Before any answer:

1. If the data is not in the files - say "I don't have this in the files".
2. If you propose something - mark it "This is a proposal (not from files)".
3. When citing - give the source ("according to {filename}...").

Never invent: client names, figures, dates, deliverables. When unsure - ask.
Documentation that quietly fabricates is worse than none: it gets trusted.

## Editorial rules

- Markdown only; no emoji in project files.
- Plain hyphen (-), never em dash or en dash.
- Straight quotes (" "), not typographic.
- Keep content in your working language with correct orthography/diacritics.
- Keep established technical terms in their original form.

## What NEVER goes into this repo

- Real client names or any identifying information.
- Specific project data (real transcripts, notes, deliverables).
- Internal conventions specific to one organization.
- Confidential information from any engagement.

This is a generic framework - users adapt it to their own context with
placeholders (`{CLIENT}`, `{VENDOR}`, etc.).

## Repository structure

```
.
├── README.md          # what this is + quick start
├── AGENTS.md          # this file (vendor-neutral conventions)
├── LICENSE            # MIT
├── .gitignore
├── .claude/CLAUDE.md  # thin pointer to this file (Claude Code)
├── _templates/        # prompt templates + glossary template
├── examples/          # fictional workspaces across domains
├── docs/              # architecture, philosophy, workflow
└── scripts/           # export scripts (.md + Mermaid -> Word)
```

## Origin

Built on 20+ years of designing and documenting enterprise and public-sector
systems across many client engagements. The patterns here are my own, developed
and refined over years of real project work, then generalized into a reusable
framework. No client names, no client data, nothing tied to any single
engagement.
