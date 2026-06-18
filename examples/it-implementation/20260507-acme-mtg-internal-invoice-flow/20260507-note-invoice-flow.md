# Meeting note - 7 May 2026, 10:00

**Project:** proj-data-flows
**Topic:** Invoice flow - field mapping between {CORE_SYSTEM} and {CUSTOM_SYSTEM}
**Duration:** ~0 h 45 min
**Type:** internal ({VENDOR})

> Fictional example produced from a fictional transcript, to show the shape of
> a note. Not a real meeting.

---

## Summary / key takeaways

- **Decision.** The invoice header maps 1:1 to the {CORE_SYSTEM} document
  header; line items map to the expense-type dictionary.
- **Direction.** Reuse the existing reporting views rather than building new
  ones for the first iteration.
- **Idea.** A later phase could push a budget-check callback before posting -
  parked.
- **Open.** The exact name of the expense-type dictionary is unconfirmed.

---

## Participants

| Person | Side | Role / area |
|--------|------|-------------|
| Anna Example | {VENDOR} | Solution architect |
| Bartek Sample | {VENDOR} | Developer - integrations |

---

## Meeting context

Internal working session to fix the field mapping for the invoice flow before
the next client review. Continues the data-flows project.

---

## Key decisions and agreements

### 1. Header mapping

**Decision.** The invoice header maps 1:1 to the {CORE_SYSTEM} document header.
The document number is the join key.

### 2. Line items

**Direction.** Line items map to the expense-type dictionary; the exact
dictionary name is to be confirmed with the client.

### 3. Reporting

**Direction.** Reuse existing reporting views for iteration one. Revisit if
performance is insufficient.

---

## Open items

| # | Item | Context |
|---|------|---------|
| 1 | Expense-type dictionary name `[?]` | Needed to finalize line-item mapping |

---

## Action items

| # | Task | Owner | Due |
|---|------|-------|-----|
| 1 | Confirm expense-type dictionary name | Bartek Sample | 2026-05-12 |
| 2 | Draft data-flow.md for the invoice process | Anna Example | 2026-05-14 |
