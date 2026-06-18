// export-diagrams.mjs
// Markdown (Mermaid) -> PNG (Playwright) -> Word (.docx).
// Starter script. See ../_templates/prompt-export-diagrams-docx.md for rationale
// and pitfalls. Configure CONFIG below, then: node export-diagrams.mjs
//
// Requires: npm install playwright mermaid docx image-size
//           npx playwright install chromium

import { readFileSync, writeFileSync, mkdtempSync, globSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, basename, dirname } from "node:path";
import { chromium } from "playwright";
import { Document, Packer, Paragraph, HeadingLevel, ImageRun, PageOrientation } from "docx";
import sizeOf from "image-size";

const require = createRequire(import.meta.url);

const CONFIG = {
  // Glob of source markdown files (one diagram each, see sectionPattern).
  sourceGlob: "../examples/it-implementation/proj-data-flows/process-*/data-flow.md",
  // Heading that precedes the diagram. "## 2." = the DFD section.
  sectionPattern: /^##\s*2\./m,
  // Output document.
  out: "./diagrams.docx",
  // Document title page.
  title: "Data flow diagrams",
  subtitle: "Generated from data-flow.md sources",
  // Render tuning.
  svgScale: 1.8,
  viewport: { width: 4000, height: 3000 },
};

// --- Step 1: extract the first mermaid block after the section heading ---
function extractDiagrams() {
  const files = globSync(CONFIG.sourceGlob);
  const diagrams = [];
  for (const file of files) {
    const md = readFileSync(file, "utf8");
    const secMatch = md.match(CONFIG.sectionPattern);
    if (!secMatch) continue;
    const after = md.slice(secMatch.index);
    const fence = after.match(/```mermaid\s*([\s\S]*?)```/);
    if (!fence) continue;
    // Title = the process name from the section heading line.
    const headingLine = after.split("\n")[0].replace(/^#+\s*/, "").trim();
    diagrams.push({
      title: headingLine || basename(dirname(file)),
      code: fence[1].trim(),
      source: file,
    });
  }
  return diagrams;
}

const MERMAID_PATH = require.resolve("mermaid/dist/mermaid.min.js");

function htmlFor(code) {
  const mermaidJs = readFileSync(MERMAID_PATH, "utf8");
  const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<!doctype html><html><head><meta charset="utf-8">
<style>body{margin:0;background:#fff}</style></head>
<body><pre class="mermaid">${escaped}</pre>
<script>${mermaidJs}</script>
<script>
mermaid.initialize({startOnLoad:true,theme:'base',themeVariables:{
  fontSize:'15px',fontFamily:'Segoe UI, Arial, sans-serif',
  primaryColor:'#DBEAFE',primaryBorderColor:'#2563EB',
  lineColor:'#475569',textColor:'#1e293b'},
  flowchart:{htmlLabels:true,useMaxWidth:false,nodeSpacing:35,rankSpacing:65,padding:18,curve:'basis'}});
</script></body></html>`;
}

// --- Step 2: render each diagram to PNG ---
async function renderAll(diagrams) {
  const browser = await chromium.launch();
  const dir = mkdtempSync(join(tmpdir(), "mmd-"));
  const page = await browser.newPage({ viewport: CONFIG.viewport });
  let i = 0;
  for (const d of diagrams) {
    await page.setContent(htmlFor(d.code), { waitUntil: "networkidle" });
    await page.waitForSelector("pre.mermaid svg", { timeout: 15000 });
    await page.evaluate((scale) => {
      const svg = document.querySelector("pre.mermaid svg");
      const w = svg.viewBox.baseVal.width || svg.getBoundingClientRect().width;
      const h = svg.viewBox.baseVal.height || svg.getBoundingClientRect().height;
      svg.setAttribute("width", Math.max(2400, w * scale));
      svg.setAttribute("height", h * scale);
    }, CONFIG.svgScale);
    const el = await page.$("pre.mermaid svg");
    const png = join(dir, `d${i}.png`);
    await el.screenshot({ path: png });
    d.png = png;
    i++;
  }
  await browser.close();
  return diagrams;
}

// --- Step 3: assemble the Word document ---
function buildDoc(diagrams) {
  const pageWidthPx = 1100; // landscape A4 content width, approx
  const children = [
    new Paragraph({ text: CONFIG.title, heading: HeadingLevel.TITLE }),
    new Paragraph({ text: CONFIG.subtitle }),
    new Paragraph({ text: new Date().toISOString().slice(0, 10) }),
  ];
  for (const d of diagrams) {
    const buf = readFileSync(d.png);
    const dim = sizeOf(buf);
    const scale = Math.min(1, pageWidthPx / dim.width);
    children.push(new Paragraph({ text: d.title, heading: HeadingLevel.HEADING_1, pageBreakBefore: true }));
    children.push(new Paragraph({
      children: [new ImageRun({ data: buf, transformation: { width: dim.width * scale, height: dim.height * scale } })],
    }));
  }
  return new Document({
    sections: [{
      properties: { page: { size: { orientation: PageOrientation.LANDSCAPE } } },
      children,
    }],
  });
}

const diagrams = extractDiagrams();
if (!diagrams.length) {
  console.error("No diagrams found. Check CONFIG.sourceGlob / sectionPattern.");
  process.exit(1);
}
await renderAll(diagrams);
const doc = buildDoc(diagrams);
const buffer = await Packer.toBuffer(doc);
writeFileSync(CONFIG.out, buffer);
console.log(`Wrote ${CONFIG.out} (${diagrams.length} diagram(s)).`);
