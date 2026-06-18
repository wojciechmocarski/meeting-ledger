# Prompt: Follow-up after a meeting note

> Checklist run after each note is generated. Can be run in batch after several
> notes.

## How to use

1. Generate the meeting note(s) (via `prompt-meeting-note.md`).
2. Say: "Run the follow-up checklist" or "Update the index, people and
   glossary".

## Checklist

### 1. Update `_index.md`

- Add each new meeting under the right project folder (or "Meetings without a
  project").
- Entry format: `- [YYYYMMDD-...](./YYYYMMDD-.../) - short topic (type)`.
- Update the "Last updated" date in the header.
- Keep chronological order in the meeting list.

### 2. Verify `people.md`

- Check that every participant in the note's table is in `people.md`.
- People mentioned in the body (non-participants) - add if new, with a context
  note.
- Verify role consistency - if a person appears in a new context, update their
  role.
- New people: flag to the user (they may have extra role information).

### 3. Update the glossary

- New transcription errors - add to the errors section with the meeting date.
- New technical terms - add to the terms section.
- New acronyms - add to the acronyms section.
- Update the "Last updated" date.

### 4. Update the meeting's `_meta.md`

- If `_meta.md` had status "to process" - replace with a link to the note.
- If `_meta.md` did not exist - create it.

### 5. Report to the user

Summarize:
- Files created (notes, `_meta.md`).
- Files updated (`_index.md`, `people.md`, glossary).
- New people added.
- New transcription errors added.
- Notes: new `[?]`, people with incomplete data, topics needing impact
  analysis.

## Order

Recommended order after generating notes:
1. Follow-up (this prompt)
2. Commits for the notes (`prompt-commit.md`)
3. Impact analysis (`prompt-impact-analysis.md`) - if the meeting touched a
   process.
