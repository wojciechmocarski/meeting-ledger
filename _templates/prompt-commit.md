# Prompt: Generate commits for notes and docs

> Repeatable task - after generating notes and running the follow-up checklist.

## How to use

1. Finish the notes and follow-up work.
2. Say: "Give me the commits using the template".

## Commit rules

- Concise message in your working language.
- HEREDOC format (copy-paste, do not execute automatically).
- No `Co-Authored-By` trailers.
- Never `git add -A` or `git add .` - name specific files.
- Do not merge notes from different meetings into one commit (unless asked).

## Commit structure

### Grouping files

One commit per meeting. Files to include:
- `{meeting-folder}/YYYYMMDD-note-{topic}.md` - the note
- `{meeting-folder}/_meta.md` - meeting metadata (if new/changed)

### Separate commit for follow-up

If companion files were updated (several meetings at once), group them in a
separate commit:
- `_index.md` - index update
- `people.md` - new people
- `glossary.md` - new entries
- corrections in earlier notes (e.g. time fixes, typos)

### Message format

```
[note] Meeting {type} {DD.MM} - {topic}, {key-point-1}, {key-point-2}

{2-4 lines summarizing the key agreements.
One agreement per line - short, concrete.}
```

Type: "internal" (delivery side only), "with client".

### Command format

```bash
git add \
  "{file-1}" \
  "{file-2}"

git commit -m "$(cat <<'EOF'
[note] Meeting internal 27.05 - travel claims, field mapping

Key agreements: advance request = travel section,
reuse of existing views from invoices, expense type -> account.
EOF
)"
```

## Verify before presenting commits

1. `git status -u` - what is modified and untracked.
2. `git diff --stat` - the scope of changes.
3. `git log --oneline -5` - the style of recent commits.
4. Filter out files unrelated to the notes (do not add them to the note commit).
