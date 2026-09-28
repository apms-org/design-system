import fs from "node:fs";
import path from "node:path";

const read = (p) => fs.readFileSync(p, "utf8");

export function watchedFiles(root) {
  const out = [path.join(root, "README.md"), path.join(root, "tokens.json"), path.join(root, "tokens.css"), path.join(root, "components", "index.d.ts"), path.join(root, "components", "bundle.css"), path.join(root, "package.json")];
  const comp = path.join(root, "components");
  for (const name of fs.readdirSync(comp)) {
    const dir = path.join(comp, name);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of ["README.md", "preview.html"]) if (fs.existsSync(path.join(dir, f))) out.push(path.join(dir, f));
  }
  const ex = path.join(root, "site", "src", "examples");
  if (fs.existsSync(ex)) for (const f of fs.readdirSync(ex)) if (f.endsWith(".jsx")) out.push(path.join(ex, f));
  return out;
}

function parseMarkdown(text) {
  const lines = text.replace(/\r/g, "").split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (/^#{1,6} /.test(line)) { const level = line.match(/^#+/)[0].length; blocks.push({ type: "h", level, text: line.replace(/^#+ /, "").trim() }); i++; continue; }
    if (/^\s*[-*] /.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) {
        let item = lines[i].replace(/^\s*[-*] /, "");
        i++;
        while (i < lines.length && lines[i].trim() && !/^\s*[-*] /.test(lines[i]) && !/^#/.test(lines[i]) && !/^\|/.test(lines[i])) { item += " " + lines[i].trim(); i++; }
        items.push(item.trim());
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = (r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      blocks.push({ type: "table", head, rows: body });
      continue;
    }
    let para = line.trim();
    i++;
    while (i < lines.length && lines[i].trim() && !/^#/.test(lines[i]) && !/^\s*[-*] /.test(lines[i]) && !/^\|/.test(lines[i])) { para += " " + lines[i].trim(); i++; }
    blocks.push({ type: "p", text: para });
  }
  return blocks;
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function readmeSections(text) {
  const blocks = parseMarkdown(text);
  const intro = [];
  const sections = [];
  let cur = null;
  for (const b of blocks) {
    if (b.type === "h" && b.level === 2) { cur = { title: b.text, id: slug(b.text), blocks: [] }; sections.push(cur); continue; }
    (cur ? cur.blocks : intro).push(b);
  }
  return { intro, sections };
}

function splitTop(body, sep) {
  const out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if ("({[<".includes(c)) depth++;
    else if (")}]>".includes(c)) { if (!(c === ">" && body[i - 1] === "=")) depth--; }
    else if (c === sep && depth === 0) { out.push(body.slice(start, i)); start = i + 1; }
  }
  out.push(body.slice(start));
  return out.map((s) => s.trim()).filter(Boolean);
}

function matchBrace(text, open) {
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") { depth--; if (depth === 0) return i; }
  }
  return -1;
}

function parseTypes(text) {
  const interfaces = {};
  const re = /export interface (\w+)(?:\s+extends\s+([^{]+?))?\s*\{/g;
  let m;
  while ((m = re.exec(text))) {
    const open = m.index + m[0].length - 1;
    const close = matchBrace(text, open);
    const body = text.slice(open + 1, close);
    const props = splitTop(body, ";").map((member) => {
      const mm = member.match(/^(\w+)(\??):\s*([\s\S]+)$/);
      if (!mm) return null;
      return { name: mm[1], optional: mm[2] === "?", type: mm[3].replace(/\s+/g, " ").trim() };
    }).filter(Boolean);
    interfaces[m[1]] = { name: m[1], extends: m[2] ? m[2].trim() : "", props };
  }
  const aliases = {};
  const ta = /export type (\w+) = ([\s\S]*?);\n/g;
  while ((m = ta.exec(text))) aliases[m[1]] = m[2].replace(/\s+/g, " ").trim();
  return { interfaces, aliases };
}

function parseCss(text) {
  const blockVars = (sel) => {
    const i = text.indexOf(sel);
    if (i < 0) return {};
    const open = text.indexOf("{", i + sel.length - 1);
    const close = matchBrace(text, open);
    const out = {};
    const body = text.slice(open + 1, close);
    for (const m of body.matchAll(/--([a-z0-9\\.-]+)\s*:\s*([^;]+);/gi)) out[m[1].replace(/\\/g, "")] = m[2].trim();
    return out;
  };
  const rootStart = text.indexOf("\n:root{");
  const root = {};
  if (rootStart >= 0) {
    const open = text.indexOf("{", rootStart);
    const close = matchBrace(text, open);
    for (const m of text.slice(open + 1, close).matchAll(/--([a-z0-9\\.-]+)\s*:\s*([^;]+);/gi)) root[m[1].replace(/\\/g, "")] = m[2].trim();
  }
  const classes = {};
  for (const m of text.matchAll(/^\.([a-z0-9-]+)\{([^}]+)\}/gim)) classes[m[1]] = m[2];
  return { light: blockVars(':root,[data-theme="light"]{'), dark: blockVars('[data-theme="dark"]{'), root, classes };
}

function motionTokens(bundleCss) {
  const out = {};
  const head = bundleCss.slice(0, bundleCss.indexOf("}"));
  for (const m of head.matchAll(/--((?:ease|dur)-[a-z-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

function parseDefaults(bundle) {
  const out = {};
  const re = /function (\w+)\(\{/g;
  let m;
  while ((m = re.exec(bundle))) {
    const open = m.index + m[0].length - 1;
    const close = matchBrace(bundle, open);
    const defs = {};
    for (const part of splitTop(bundle.slice(open + 1, close), ",")) {
      const eq = part.indexOf("=");
      if (eq < 0 || part.startsWith("...")) continue;
      const key = part.slice(0, eq).split(":")[0].trim();
      defs[key] = part.slice(eq + 1).trim().replace(/\\u2318/g, "\u2318");
    }
    out[m[1]] = defs;
  }
  return out;
}

function componentDocs(root, types) {
  const comp = path.join(root, "components");
  const defaults = parseDefaults(read(path.join(comp, "bundle.js")));
  const out = [];
  for (const name of fs.readdirSync(comp).sort()) {
    const dir = path.join(comp, name);
    if (!fs.statSync(dir).isDirectory() || name === "Cover") continue;
    const readme = fs.existsSync(path.join(dir, "README.md")) ? read(path.join(dir, "README.md")) : "";
    const preview = fs.existsSync(path.join(dir, "preview.html")) ? read(path.join(dir, "preview.html")) : "";
    const gm = preview.match(/group="([^"]+)"/);
    const blocks = parseMarkdown(readme).filter((b) => !(b.type === "h" && b.level === 1));
    const summary = (blocks.find((b) => b.type === "p") || { text: "" }).text;
    const bullets = (blocks.find((b) => b.type === "ul") || { items: [] }).items;
    const iface = types.interfaces[name + "Props"] || null;
    out.push({ name, group: gm ? gm[1] : "Display", summary, bullets, props: iface ? iface.props : [], extends: iface ? iface.extends : "", defaults: defaults[name] || {} });
  }
  return out;
}

function coverSvg(root) {
  const p = path.join(root, "components", "Cover", "preview.html");
  if (!fs.existsSync(p)) return "";
  const t = read(p);
  const m = t.match(/<svg[\s\S]*?<\/svg>/);
  return m ? m[0] : "";
}

function exampleSources(root) {
  const dir = path.join(root, "site", "src", "examples");
  const out = {};
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".jsx")).sort()) {
    const text = read(path.join(dir, f));
    const re = /export function (\w+)\(\)\s*\{/g;
    let m;
    while ((m = re.exec(text))) {
      const open = m.index + m[0].length - 1;
      const close = matchBrace(text, open);
      const body = text.slice(open + 1, close);
      const trimmed = body.trim();
      let code;
      const ret = trimmed.match(/^return \(([\s\S]*)\);$/);
      if (ret) code = ret[1];
      else code = "function " + m[1] + "() {" + body + "}";
      out[m[1]] = tidy(code);
    }
  }
  return out;
}

function tidy(code) {
  let lines = code.replace(/\r/g, "").split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const first = (lines[0] || "").trim();
  const last = (lines[lines.length - 1] || "").trim();
  const wrap = first.match(/^<(Row|Stack|Grid|Col)\b[^>]*>$/);
  if (wrap && last === "</" + wrap[1] + ">") lines = lines.slice(1, -1);
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length));
  return lines.map((l) => l.slice(indent)).join("\n");
}

const DOWNLOADS = [
  ["APM-Design-System.pdf", "dist/APM-Design-System.pdf", "file-down", "The whole system in one PDF: guidelines, foundations, every component, patterns and themes."],
  ["tokens.json", "tokens.json", "file-text", "Every token with its light and dark value and where to use it."],
  ["tokens.css", "tokens.css", "file-text", "The CSS custom properties, the type classes and the font faces."],
  ["bundle.js", "components/bundle.js", "package", "All components as window.APM. Needs React 18 on the page."],
  ["bundle.css", "components/bundle.css", "file-text", "Component styles and the motion tokens."],
  ["index.d.ts", "components/index.d.ts", "file-text", "TypeScript types for every component and its props."],
  ["README.md", "README.md", "book-open", "The written guidelines this site is built from."],
  ["fonts/Geist-Variable.woff2", "fonts/Geist-Variable.woff2", "file-archive", "Geist, variable weight 100 to 900."],
  ["fonts/GeistMono-Variable.woff2", "fonts/GeistMono-Variable.woff2", "file-archive", "Geist Mono, variable weight 100 to 900."]
];

function downloads(root) {
  return DOWNLOADS.map(([name, rel, icon, desc]) => {
    const p = path.join(root, rel);
    return { name, icon, desc, size: fs.existsSync(p) ? fs.statSync(p).size : null };
  });
}

function localDate() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

export function buildMeta(root) {
  const pkg = JSON.parse(read(path.join(root, "package.json")));
  const tokens = JSON.parse(read(path.join(root, "tokens.json")));
  const types = parseTypes(read(path.join(root, "components", "index.d.ts")));
  const icons = fs.readdirSync(path.join(root, "assets", "Icons")).filter((f) => f.endsWith(".svg")).map((f) => f.replace(/\.svg$/, "")).sort();
  const logos = fs.readdirSync(path.join(root, "assets", "Logos")).filter((f) => /\.(svg|png)$/.test(f)).sort();
  return {
    version: pkg.version,
    readme: readmeSections(read(path.join(root, "README.md"))),
    logosReadme: fs.existsSync(path.join(root, "assets", "Logos", "README.md")) ? parseMarkdown(read(path.join(root, "assets", "Logos", "README.md"))) : [],
    tokens,
    css: parseCss(read(path.join(root, "tokens.css"))),
    motion: motionTokens(read(path.join(root, "components", "bundle.css"))),
    types,
    components: componentDocs(root, types),
    cover: coverSvg(root),
    icons,
    logos,
    examples: exampleSources(root),
    downloads: downloads(root),
    built: localDate()
  };
}
