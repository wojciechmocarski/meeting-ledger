# Prompt: Export Mermaid diagrams to a Word (.docx) document

## Goal

Export Mermaid diagrams (DFD, BPMN or others) from data-flow files into a Word
document with high-resolution illustrations.

## When to use

- When you need a Word document with diagrams for a presentation, print, or to
  send to a client.
- After updating data-flow documents - to refresh the illustrations.
- Mermaid does not render natively in Word - diagrams must be converted to PNG.

## Required tools

- **Playwright** (chromium) - render Mermaid in a headless browser
- **mermaid** (npm) - diagram library, loaded as UMD (not ESM!)
- **docx** (npm) - generate the Word document
- **image-size** (npm) - read PNG dimensions

Install once:
```bash
npm install playwright mermaid docx image-size
npx playwright install chromium
```

A starter script is in [`../scripts/`](../scripts/).

## Pipeline (3 steps)

### Step 1: Extract Mermaid blocks from .md files

Find the diagram section (e.g. "## 2. Data flow diagram (DFD)") and extract the
first ` ```mermaid ` block. Save to JSON with metadata (title, source folder).

Parameters to adjust:
- **Section pattern**: e.g. `## 2.` for DFD, `## 3.` for BPMN
- **Source folders**: `process-*/data-flow.md`

### Step 2: Render with Playwright -> PNG

Key rules:
- Use **startOnLoad: true** with the Mermaid code in `<pre class="mermaid">` -
  the `mermaid.render()` API in the UMD build returns `undefined`.
- Load `mermaid.min.js` as a plain `<script>` (not an ESM import!) - headless
  Chromium does not handle ESM from a CDN.
- The HTML must escape `&`, `<`, `>` inside the Mermaid code.
- Scale the SVG after rendering (1.5-1.8x, minimum 2400px wide) for legibility.
- Set the viewport to 4000x3000 before rendering.
- Use a MutationObserver to detect render completion + a setTimeout fallback.

Mermaid parameters:
```javascript
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    fontSize: '15px',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    primaryColor: '#DBEAFE',
    primaryBorderColor: '#2563EB',
    lineColor: '#475569',
    textColor: '#1e293b'
  },
  flowchart: {
    htmlLabels: true,
    useMaxWidth: false,
    nodeSpacing: 35,
    rankSpacing: 65,
    padding: 18,
    curve: 'basis'
  }
});
```

The PNG should contain ONLY the diagram (no title - the title becomes a Word
heading).

### Step 3: Assemble the Word document (docx-js)

Structure:
1. **Title page** - document title, subtitle, date.
2. **One page per diagram**:
   - Heading 1 with the process title (visible in Word navigation).
   - Caption (e.g. "Data flow diagram (DFD) - {PROCESS}").
   - PNG scaled to the maximum page width.

Page settings:
- **A4 landscape** (orientation: LANDSCAPE).
- 0.75" margins (1080 DXA) - narrower for larger diagrams.
- Header: a short document label (top-right).
- Footer: page number.

Image scaling:
- Compute: `maxWidth = pageWidth - 2 * margin`,
  `maxHeight = pageHeight - 2 * margin - 1200 DXA` (heading reserve).
- Preserve aspect ratio.
- docx-js: `transformation: { width: px, height: px }` where `px = EMU / 9525`.

## Quality check

After generating the .docx:
1. Convert to PDF (e.g. LibreOffice headless).
2. Render pages to JPEG (e.g. `pdftoppm -jpeg -r 150`).
3. Inspect visually: titles, legibility of node text, arrows, subgraph colors.

## Known pitfalls

| Problem | Fix |
|---------|-----|
| mermaid.render() returns undefined | Use startOnLoad: true with `<pre class="mermaid">`, not the render() API |
| ESM import from CDN fails in headless | Load `mermaid.min.js` from node_modules as a plain `<script>` |
| WARN "error" in page text | False alarm - Mermaid CSS contains an `.error-icon` class in its style defs |
| Diagram too small in Word | Increase SVG scale (1.8x), viewport (4000px), fontSize (15px+) |
| Diagram clipped | Measure scrollWidth/scrollHeight after rendering, adjust viewport |
| Images spill across 2 pages | For very tall diagrams (>3000px) reduce scale or split |
