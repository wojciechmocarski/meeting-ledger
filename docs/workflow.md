# Workflow

The repeatable cycle after each meeting. Each step has a template in
[`../_templates/`](../_templates/).

```
meeting -> note -> follow-up -> commit -> impact analysis -> doc update -> commit
```

| Step | Template | What happens |
|------|----------|--------------|
| 1. Note | `prompt-meeting-note.md` | Transcript -> note. Read glossary, people, related meetings first. |
| 2. Follow-up | `prompt-followup.md` | Update `_index.md`, `people.md`, glossary, `_meta.md`. |
| 3. Commit | `prompt-commit.md` | One commit per meeting; a separate one for follow-up. |
| 4. Impact analysis | `prompt-impact-analysis.md` | Identify affected documents, produce an impact report. |
| 5. Update source docs | `prompt-update-source-docs.md` | Apply the report to the documents that hold the truth. |
| 6. Commit | `prompt-commit.md` | A separate commit for the document changes. |
| 7. Export (domain) | e.g. `prompt-export-diagrams-docx.md` | Produce client deliverables on demand. |

Steps 1-3 run immediately after a meeting. Steps 4-7 can be batched (several
meetings from one day -> one analysis pass).

"Source documents" means whatever your domain works in: process & data-flow docs
(IT), a campaign brief (marketing), a points-of-agreement file (legal), a report
(consulting). See [`../examples/`](../examples/) for three concrete domains.

## Consistency check

After updating any source document, check it still agrees with the others - that
a decision recorded in one place is not contradicted in another. In
diagram-heavy work (IT), this means the diagram views must agree:

- **DFD** - all nodes connected, no orphan data sources, two-way arrows where
  the flow is bidirectional.
- **BPMN** - steps match the DFD nodes; external calls marked; concerns kept
  separate.
- **Sequence** - phases consistent with the DFD; a response shown for every
  request.

In other domains the same principle applies to whatever your source documents
are (terms across a contract, dates across a campaign timeline).

## Working with transcripts

1. Point the assistant at the meeting folder with the transcript.
2. Provide participants if they are not clear from the transcript.
3. The assistant reads the transcript and generates the note per template.
4. The note is saved in the meeting folder.
5. Optionally update `_index.md`, `people.md`, related source documents.

## Consistency audit

The assistant can audit consistency across notes, source documents and overviews
- flagging where one contradicts another.

## People registry

New people appearing in notes are added to `people.md`. Check before adding
whether the person is already there.
