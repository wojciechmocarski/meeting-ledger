# Architecture

The pipeline is a **file architecture**, not an application. The structure on
disk is the system: where a file lives, what it links to, and what enters the
AI assistant's context are the design.

## The four phases

```
Meeting (transcript)
        |
        v
[Phase 1] Themed note
        | prompt-meeting-note (+ glossary, people registry)
        v
[Phase 2] Impact analysis
        | prompt-impact-analysis -> report across affected documents
        v
[Phase 3] Source-document update
        | prompt-update-source-docs -> the documents that hold the truth
        v
[Phase 4] Export to deliverables (domain-specific)
        | e.g. prompt-export-diagrams-docx -> Word + side artifacts
```

### Phase 1 - Themed note

A raw transcript becomes a structured note: summary, participants, decisions
grouped **by theme not chronology**, open items, action items. The glossary
corrects speech-recognition errors; the people registry keeps names consistent.

### Phase 2 - Impact analysis

The note is read against the existing documentation. Output: a report - what
changes, in which document, with what priority. Nothing is changed yet; the
report is reviewed first. The affected documents depend on your domain: process
docs (IT), a campaign brief (marketing), a points-of-agreement file (legal).

### Phase 3 - Source-document update

Approved changes propagate into the source documents, each with a changelog
entry and a source reference back to the note.

### Phase 4 - Export to deliverables (domain-specific)

The same content produces client-facing artifacts. For diagram-heavy work that
means Word documents with rendered diagrams (DFD / BPMN / sequence) plus side
artifacts; for other domains it is whatever you deliver (a brief, a contract, a
report). Phases 1-3 are universal; only this export step is domain-specific.

## Multiple deliverables from one work session

The point of the architecture: **one pass of work feeds 3-4 distinct
products**. A single meeting note becomes a record, an input to process docs, a
source for the client Word document, and material for higher-level architecture
documents - without re-doing the work.

## Layout

See [`../examples/`](../examples/) for a concrete, fictional workspace. The
conventions:

- One folder per meeting, named for date + type + topic.
- One folder per project (or matter, case, campaign), holding its source documents.
- Special files at the root: `_index.md` (map), `people.md` (registry),
  `glossary.md` (terms + transcription errors).
- Templates in `_templates/`.

## What stays out of version control

- Media recordings (mp4, mp3, vtt) - large, synced elsewhere.
- Export artifacts.
- Anything client-identifying, if the repo is ever shared.

Text transcripts and received documents are versioned - they are the source of
truth.
