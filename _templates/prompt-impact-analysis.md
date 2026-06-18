# Prompt: Impact analysis from meeting notes

> Repeatable task - run after a meeting whose note changes something downstream:
> a document, a deliverable, a plan. This is the step that stops decisions from
> one meeting quietly contradicting another.

## How to use

1. Point the assistant at the meeting note(s) to analyze (one or several).
2. Say: "Run an impact analysis using `_templates/prompt-impact-analysis.md`".
3. Optionally name specific documents/areas to analyze (otherwise all affected
   ones are covered).

## What "downstream" means in your domain

The mechanism is the same everywhere; only the affected documents differ:

- **IT / delivery** - process docs, data-flow diagrams, a data matrix.
- **Marketing** - the campaign brief, the asset list, the timeline.
- **Legal** - the points-of-agreement document, draft clauses, the matter file.
- **Consulting** - the report outline, recommendations, the findings log.

Read "source document" below as whatever holds the truth in your work.

## Before analysis - load context

1. **Meeting notes** - read the notes. Identify:
   - concrete agreements (figures, names, dates, references, clauses),
   - changes of approach or direction,
   - new requirements,
   - resolutions of earlier open items.
2. **Index / overview** - read your `_index.md` (and any per-area overview).
   Identify which source documents may be affected.
3. **Source documents** - for each affected area, read its current document.

## Procedure

### Step 1: Identify affected documents

From the notes, list every document/area where something changes. For each,
state:
- what exactly changes (a new term, a changed figure, a new section, a reversal),
- the source (which note point, whose statement),
- priority: substantive change (alters meaning/scope) vs cosmetic (typo,
  clarification).

### Step 2: Impact report

For each affected document, produce:

```markdown
## Document: {name / area}

**Source:** note {date} - {topic}, point {number}

| Section | Current state | Change | Rationale |
|---------|---------------|--------|-----------|
| {section} | {what it is now} | {what it should be} | {source in note} |

### New open items

| # | Question | Context |
|---|----------|---------|
```

### Step 3: Prioritize

Group the changes:
- **Apply now** - confirmed decisions and directions.
- **To confirm** - unclear or dependent on open items.
- **Defer** - open topics needing further meetings.

### Step 4: Execute (after approval)

Once the report is approved, apply the changes (see
[`prompt-update-source-docs.md`](./prompt-update-source-docs.md)):
1. Update each source document - content, version bump, changelog entry.
2. Update any overview/index that summarizes it.
3. Consistency check - make sure changes in one document do not collide with
   another.

## Rules

- **Do not add knowledge beyond the notes** - if a note does not confirm a
  change, do not make it.
- **Keep detail exact** - figures, names, references exactly as in the note.
- **Changelog** - every change to a source document gets an entry with date,
  version and source (the meeting note).
- **Open items** - ambiguities go to the open-items section of the document, do
  not interpret.
- **One commit per document/area** - keep commits scoped.
