# scripts/

Scripts for the export pipeline: Markdown (with Mermaid diagrams) -> Word.

Mermaid does not render natively in Word, so diagrams are rendered to PNG in a
headless browser and assembled into a `.docx`. The full rationale and the known
pitfalls are in
[`../_templates/prompt-export-diagrams-docx.md`](../_templates/prompt-export-diagrams-docx.md).

## Contents

- `export-diagrams.mjs` - a starter implementing the 3 steps (extract -> render
  -> assemble). Generic: configure the source glob and the section pattern at
  the top.

## Setup

```bash
npm install playwright mermaid docx image-size
npx playwright install chromium
```

## Run

```bash
node export-diagrams.mjs
```

Edit the `CONFIG` block at the top of the script first:
- `sourceGlob` - where your `data-flow.md` files live.
- `sectionPattern` - the heading that precedes the diagram (e.g. `## 2.` for
  DFD).
- `out` - the output `.docx` path.

## Verify

After generating, convert to PDF and eyeball the pages - check titles, node
legibility, arrows and colors. Diagrams that are too small or clipped usually
mean the SVG scale or viewport needs raising (see the pitfalls table in the
template).

> This is a starting point, not a turnkey tool. Mermaid + headless rendering is
> fiddly; expect to tune scale and viewport for your diagrams.

## Linux note

On Linux the browser also needs system libraries. If `node export-diagrams.mjs`
fails with "Host system is missing dependencies to run browsers", run:

```bash
npx playwright install-deps chromium   # needs sudo/root
```

On macOS and Windows the `npx playwright install chromium` step is enough.
