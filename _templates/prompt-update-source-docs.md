# Prompt: Update source documents

> Repeatable task - after an impact analysis, to apply the approved changes to
> the documents that hold the truth (a process doc, a campaign brief, a
> points-of-agreement file, a report - whatever your domain uses).

## How to use

1. After an impact report is approved.
2. Say: "Update {document} using `_templates/prompt-update-source-docs.md`".

## Before updating - load

1. **The source document** - read it, find the section to change.
2. **The impact report** - the approved list of changes.
3. **Source notes** - the meeting notes that drove the changes.

## What to update

Each source document should carry a small, fixed set of housekeeping fields.
Update:

### 1. Version and date

- Bump the version number (e.g. v0.5 -> v0.6).
- Update the "Last updated" date in the header.

### 2. Content

- Apply the substantive changes from the impact report.
- Add or remove sections as the report specifies.

### 3. Open items

- Close items answered in the meeting.
- Add new open items from the notes.
- Keep continuous numbering (do not renumber old items).

### 4. Changelog / sources

- Add a changelog entry: date, version, change, source note.

## Rules

- Do not change sections not touched by the impact report.
- Keep terminology consistent across documents (the glossary is the authority).
- Exact detail - figures, names, references - from the note or the report, not
  from memory.
- Every change must trace back to a meeting note or the impact report.
