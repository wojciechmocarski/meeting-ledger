# Prompt: Meeting note from a transcript

> Companion file: [`glossary-template.md`](./glossary-template.md) (terminology,
> transcription errors, conventions).

## How to use

1. Point the assistant at the meeting folder (suggested structure
   `YYYYMMDD-{client}-mtg-{type}-{topic}/`) with the transcript in a
   `materials/` subfolder.
2. Say: "Write a meeting note using the template in
   `_templates/prompt-meeting-note.md`".
3. Save the result in the meeting folder as `YYYYMMDD-note-{short-topic}.md`
   (naming rules - see "Note file naming" at the end).

## Before generating - load context

A note is not written in a vacuum. Before you start:

1. **Glossary** - read your project glossary. The transcription-error table is
   the key to correcting automatic speech-to-text mistakes.
2. **People registry** - read `people.md`. Use name forms consistent with the
   registry.
3. **Workspace map** - read `_index.md`. Identify:
   - whether the meeting belongs to an existing project folder (then name the
     project in the header),
   - whether it continues a series (then link earlier notes under "Related
     meetings").
4. **Related notes** - if `_index.md` shows meetings from the same series or
   project, open their notes and check:
   - what was decided there (continuation or change?),
   - whether the same proper nouns appear (naming consistency),
   - whether there are open `[?]` items the current meeting closes.

Reading related documents retrospectively is not optional - without it the note
is an orphan.

## General formatting

- Write in `{WORKING_LANGUAGE}`, with correct orthography and diacritics.
- Plain hyphen (-), never em dash or en dash.
- Straight quotes (" "), not typographic.
- Markdown, no emoji.
- 24h time format. If the transcript uses AM/PM, convert.
- Keep established technical terms (system names, APIs, protocols) in their
  original form.

## Data source

The transcript comes from an automatic meeting recorder. Typical format:
`First Last HH:MM:SS` + spoken text.

- **Duration** - compute from the first and last timestamp.
- **Start time** - from the first line or transcript metadata header.
- **Active speakers** - people whose utterances appear in the transcript.
  People who only listened will not appear - do not invent participants.
- **Speech-recognition corrections** - correct against the glossary table. Add
  each new characteristic error to the glossary (see "After generating" below).
- **Uncertain names** - if not in the glossary and you are unsure, keep the
  original form with `[?]` and add a row to "Open items".
- **Truncated transcript** - mark `[transcript truncated at HH:MM]` in place.
  Do not invent missing threads.

## Engagement context (fill in per engagement)

State the scope once, here, so the note is self-describing:

- `{CLIENT}` - the organization the work is for.
- The subject matter your meetings are about - systems and integrations (IT), a
  campaign (marketing), a contract or matter (legal), a report (consulting).
- Delivery side: `{VENDOR}` and any `{SUBCONTRACTOR}`s. In the participants
  table, mark each person's side.

## Note structure

```markdown
# Meeting note - DD Month YYYY, HH:MM

**Project:** [project name / context]
**Topic:** [main topic - one sentence]
**Duration:** ~X h YY min
**Type:** internal ({VENDOR}) / with client ({CLIENT}) / mixed

---

## Related meetings

- [YYYYMMDD-...](../YYYYMMDD-.../YYYYMMDD-note-topic.md) - previous meeting in
  the series (short description)
- [YYYYMMDD-...](../...) - next planned / continuation

[Optional section - omit if this is the first meeting on the topic.]

---

## Summary / key takeaways

- [Bullet 1: one-line summary of what was decided or discussed]
- [Bullet 2: ...]

[The "executive summary" - a 30-second scan of what came out of the meeting.
5-10 bullets. Outcome mode ("what was decided / discussed"), not "how the
discussion went". Each bullet must stand alone. If a label fits
(**Decision.** / **Direction.** / **Idea.**, or optionally **Knowledge.** /
**Current state.** / **Discussion.**) prefix the bullet with it. Labels are
optional.]

---

## Participants

| Person | Side | Role / area |
|--------|------|-------------|
| First Last | {VENDOR} / {CLIENT} | Role or area of responsibility |

[Name forms consistent with `people.md`.]

---

## Meeting context

[2-3 sentences: why the meeting happened, what it covers, whether it continues
a series.]

---

## Key decisions and agreements

### 1. [Topic]

**Decision.** [Or: **Direction.** / **Idea.**] [The agreement - facts and
decisions, not the flow of discussion. Keep technical detail exact.]

### 2. [Next topic]

**Direction.** [...]

[Numbered H3 sections, grouped by theme (NOT chronologically). Each may start
with a bold type label - see "Subsection labels" below. Labels are optional.]

---

## Open items

| # | Item | Context |
|---|------|---------|
| 1 | [unanswered question / deferred topic / name with [?]] | [who raised it, why open] |

---

## Action items

| # | Task | Owner | Due |
|---|------|-------|-----|
| 1 | [concrete commitment] | [name / "TBD (owner)" / "joint"] | [date / "TBD (date)"] |

---

## Materials mentioned

- [file / document mentioned in the conversation] - [context]

---

## Attachments

- [Transcript: `materials/{filename}`](./materials/{filename})
- [`_meta.md` - meeting metadata](./_meta.md)
```

---

## Content rules

### 1. Subsection labels (optional)

A label is a bold word at the start of a subsection signalling the type of
content. Use it when the subsection clearly represents a specific type - it
helps a reader months later tell what is firmly decided from what was merely
sketched or discussed.

**Core (for agreements):**

- **Decision.** Closed, ready to execute. "We decide that X will be Y."
- **Direction.** Agreement on approach, exact shape to be refined. "We are
  heading toward X; the details TBD."
- **Idea.** Raised, no consensus or deferred. "It came up that we could X - to
  be discussed."

**Optional (for descriptive content):**

- **Knowledge.** Knowledge transfer between participants (senior explains to
  junior, expert shares know-how).
- **Current state.** How something works today, or a diagnosed problem (no
  decision yet on what to do about it).
- **Discussion.** Variants weighed, arguments for and against, but no
  conclusion.

**All labels are optional.** If none fits, leave the subsection unlabelled. A
forced label hurts readability more than it helps.

### 2. Compression threshold

- **Keep:** decisions, agreements, technical detail (names of tables/fields/
  views/interfaces/account segments), variants considered, counter-arguments.
- **Compress:** repeated thoughts, refinements irrelevant to the conclusion.
- **Remove:** small talk, off-context jokes, hesitations, acknowledgements
  ("ok"), technical pauses.

Test: if removing it does not change understanding - remove it.

### 3. Style - internal vs external

- **Internal meetings** - you may keep evaluative statements in quotes.
- **Client / mixed meetings** - paraphrase neutrally, avoid verbatim
  evaluative quotes. The note could reach the client.

### 4. Internal linking

- When the note refers to "an earlier note" / "the previous meeting" -
  hyperlink it in place.
- When file names from `materials/` appear - link them.
- When a topic has its own project folder or work plan - link it.

### 5. Closing the `[?]` loop

Every `[?]` in the note body has a matching row in "Open items".

### 6. Domain detail, exactly

Keep precise references faithfully from the transcript (after glossary
correction): names, figures, dates, identifiers. Depending on the domain that
means system/table/field names (IT), clause and section references (legal),
budgets and channel names (marketing), or account codes (finance) - anything a
paraphrase would blur.

### 7. Do not add knowledge beyond the transcript

Ambiguities go to "Open items", not interpretation.

### 8. Multi-project meetings

If a meeting covers several areas, flag it in the "Project" field and in the
body.

### 9. Optional sections

If a section would be empty - omit it.

---

## After generating - follow-up

Run the follow-up checklist ([`prompt-followup.md`](./prompt-followup.md)):
update `_index.md`, verify `people.md`, update the glossary, update the
meeting's `_meta.md`, close `[?]` items, consider creating a project folder if
the topic will continue, and report what changed.

---

## Note file naming

Format: `YYYYMMDD-note-{short-topic}.md`

- `YYYYMMDD` - meeting date (sorting).
- `note` - fixed type identifier.
- `{short-topic}` - 3-6 words, hyphen-separated, lowercase, ASCII only (system
  compatibility) - a deliberate exception to the diacritics rule, for file
  names only.

Examples: `20260507-note-invoice-flow.md`, `20260511-note-budget-planning.md`.

Why - a bare `note.md` collides when emailed. Date + topic = uniqueness and
self-description. The meeting folder keeps its full prefixed name.
