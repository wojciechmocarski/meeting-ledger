# Templates (`_templates/`)

Prompt templates that drive the 4-phase pipeline. Each one is a standalone,
copy-adapt artifact: point your AI assistant at the relevant template, give it
the input, and get a consistent deliverable.

These are generic versions of templates I developed and use across real
engagements in different domains. Replace the `{PLACEHOLDERS}` with your own
context before use.

The templates are written for **any capable AI assistant** (Claude, GPT,
Gemini, local models). They describe "the assistant" and a workflow, not a
specific product.

## Placeholder convention

| Placeholder | Meaning |
|-------------|---------|
| `{CLIENT}` | The end client (the organization the work is for) |
| `{VENDOR}` | Your firm / the delivery side |
| `{SUBCONTRACTOR}` | Any third party on the delivery side |
| `{WORKING_LANGUAGE}` | The language your notes are written in |

Domain-specific placeholders (use whatever fits your work): a system of record,
a campaign, a contract, a report - the templates name these by example, not by a
fixed schema.

## The templates

| Phase | Template | What it produces |
|-------|----------|------------------|
| 1 | [`prompt-meeting-note.md`](./prompt-meeting-note.md) | A themed meeting note from a raw transcript |
| 1 (support) | [`glossary-template.md`](./glossary-template.md) | A living glossary: terms, acronyms, transcription error corrections |
| 2 | [`prompt-impact-analysis.md`](./prompt-impact-analysis.md) | An impact report (what changes, where, priority) across affected documents |
| 3 | [`prompt-update-source-docs.md`](./prompt-update-source-docs.md) | Propagated updates to the source documents that hold the truth |
| 1-3 (support) | [`prompt-followup.md`](./prompt-followup.md) | Index / people registry / glossary housekeeping checklist |
| 1-3 (support) | [`prompt-commit.md`](./prompt-commit.md) | Clean, scoped git commits for your notes and docs |
| 4 (domain) | [`prompt-export-diagrams-docx.md`](./prompt-export-diagrams-docx.md) | Word documents with rendered Mermaid diagrams (for diagram-heavy domains) |

Phase 4 export is domain-specific: the diagram-to-Word template suits IT and any
diagram-heavy work. Other domains export however they deliver (a brief, a
contract, a report) - the first three phases are universal.

## How they chain

```
transcript
   |  prompt-meeting-note (+ glossary)
   v
meeting note  --> prompt-followup --> prompt-commit
   |  prompt-impact-analysis
   v
impact report --> prompt-update-source-docs --> prompt-commit
   |  (domain export, e.g. prompt-export-diagrams-docx)
   v
client deliverables (+ side artifacts)
```

Phases 1-3 (note, follow-up, commit) run right after each meeting. Analysis and
export can be batched (several meetings from one day -> one analysis pass).
