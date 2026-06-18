# Examples

The same pipeline, shown across three domains. The point: this is **not an IT
tool**. The mechanism - scattered meeting material brought into one place, a
themed note, an impact pass, propagation into source documents - is the same
whether the output is a data-flow document, a campaign brief, or a contract.

Every value here is fictional (`{CLIENT}` = "Acme", a made-up company).

## Use cases

| Folder | Domain | Meeting -> | Source document |
|--------|--------|-----------|-----------------|
| [`it-implementation/`](./it-implementation/) | Software / integration delivery | technical agreements | process & data-flow docs (DFD/BPMN), exported to Word |
| [`marketing-agency/`](./marketing-agency/) | Marketing / creative | kickoffs, approvals | campaign brief, asset list |
| [`law-firm/`](./law-firm/) | Legal | client reviews | points of agreement, draft clauses |

Other domains the same shape fits (no example folder, but identical mechanics):
architecture & design studios, consulting, accounting & audit, boards and
project teams - anywhere meetings produce decisions that must land in later
documents.

## What's the same in every domain

```
workspace/
├── _index.md                  # workspace map
├── people.md                  # people registry
├── glossary.md                # from _templates/glossary-template.md
├── _templates/                # your copies of the prompt templates
│
├── YYYYMMDD-{client}-mtg-{type}-{topic}/   # one folder per meeting
│   ├── _meta.md
│   ├── YYYYMMDD-note-{topic}.md            # the generated note
│   └── materials/             # all meeting inputs (recording, transcript, notes,
│                              # screenshots, files); text versioned, media gitignored
│
└── proj-{name}/ or matter-{name}/          # the work, with its source documents
```

The only thing that changes between domains is **what the source documents
are** - a data-flow, a campaign brief, a points-of-agreement file. The note,
the index, the people registry, the glossary and the four phases do not change.

## Naming conventions

- **Meeting folder:** `YYYYMMDD-{client}-mtg-{type}-{topic}`
  - `{type}`: `internal` (your side only) or `client` (with the client)
  - `{topic}`: lowercase, hyphen-separated, ASCII
- **Work folder:** `proj-{name}` (or a domain-fitting prefix like `matter-`)
- **Quick job folder:** `task-YYYYMMDD-{name}`
- **Note file:** `YYYYMMDD-note-{short-topic}.md`

## Special files

- `_index.md` - the map: active work, meetings, how they relate.
- `people.md` - registry: name, side, role. Checked before adding anyone new.
- `glossary.md` - terms, acronyms, transcription-error corrections.
- `_meta.md` - per-meeting metadata (date, type, topic, materials link).
- `materials/` - one folder per meeting for every raw input: recording,
  transcript, participant notes, screenshots, shared files, presentations,
  post-meeting correspondence. Text is versioned; media (mp4/mp3/vtt) is
  gitignored. No mandatory subfolders - add your own if a meeting has a lot.
