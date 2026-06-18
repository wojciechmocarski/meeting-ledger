# meeting-ledger

> From scattered meeting material to a coherent, auditable project record - with any AI assistant.
> Not another notetaker: structure first, AI second. MIT licensed - adapt to your own work.

**Status:** initial structure (June 2026). Content under active development.

---

## What it does

Every longer project drowns in meetings, and each meeting leaves a scattered
trail: a recording, an auto-transcript, notes from several people, screenshots,
shared files, follow-up emails - across Teams, Zoom, and in-person. Weeks later
it is spread across tools and inboxes, decisions are forgotten, and the
documentation never catches up.

This is a repeatable process that turns that trail into a single, consistent
record - and produces **multiple deliverables from one pass of work**: a clean
meeting note, updated source documents, and client-ready exports, without
redoing the work each time.

It is **not an IT tool**. The mechanism is the same wherever meetings produce
decisions that must land in later documents:

- software & integration delivery - technical agreements -> process & data-flow docs
- marketing & creative - briefs & approvals -> campaign documents
- legal - client reviews -> points of agreement, draft clauses
- consulting, accounting & audit, boards & project teams - the same shape

See [`examples/`](./examples/) for three worked domains (IT, marketing, legal).

## The four phases

```
Meeting (any material: transcript, notes, files, screenshots)
        |
        v
[Phase 1] Themed note          (prompt + glossary + people registry)
        v
[Phase 2] Impact analysis      (what changes, where, priority)
        v
[Phase 3] Source-document update (propagate into the docs that hold the truth)
        v
[Phase 4] Export (domain-specific) (e.g. Word with diagrams, a brief, a contract)
```

Phases 1-3 are universal. Only the export step is domain-specific.

## Works with any AI assistant

The templates describe "the assistant" and a workflow - not a product. Use
Claude, GPT, Gemini, or a local model. Conventions live in
[`AGENTS.md`](./AGENTS.md); tool-specific instruction files (Claude Code,
Cursor, Copilot) just point there.

## Repository structure

```
meeting-ledger/
├── README.md          # this file
├── AGENTS.md          # vendor-neutral working conventions
├── LICENSE            # MIT
├── .gitignore         # ignores client-specific content + media
├── .claude/CLAUDE.md  # thin pointer to AGENTS.md (Claude Code)
├── _templates/        # prompt templates + glossary template
├── examples/          # fictional workspaces across domains
├── docs/              # architecture, philosophy, workflow
└── scripts/           # export scripts (.md + Mermaid -> Word)
```

## Philosophy

**Gall's Law (John Gall, Systemantics, 1975):** "A complex system that works is
invariably found to have evolved from a simple system that worked. A complex
system designed from scratch never works." This grew from one working step and
expanded only where it hurt - adopt it the same way.

**Context engineering = curation.** The most important skill in working with AI
is not prompt engineering - it is selecting what enters context. This pipeline is
a curation mechanism built into file architecture. AI multiplies what already
exists: it multiplies order and it multiplies chaos. So structure first, AI
second.

More in [`docs/`](./docs/).

## What this repo is NOT

- Not a turnkey product or SaaS - it is templates and patterns you adapt.
- Not bound to a specific industry, system, or AI vendor.
- Not generative-AI content production - it is about consistency and an audit
  trail of decisions, not producing text.
- Not a replacement for human work - it multiplies the work of someone who knows
  what they are doing.

## Origin

Built on 20+ years of designing and documenting enterprise and public-sector
systems across many client engagements. The patterns here are my own, developed
and refined over years of real project work, then generalized into a reusable
framework. No client names, no client data, nothing tied to any single
engagement.

## License

MIT - use, modify, distribute. See [LICENSE](./LICENSE).

## Author

Wojciech Mocarski - Fractional CTO + AI. IT architect, 20+ years in enterprise
implementations (ERP, B2B, integrations). Exploring how AI changes the
professional workflow from below - one engagement at a time.

[wojciechmocarski.pl](https://wojciechmocarski.pl)
