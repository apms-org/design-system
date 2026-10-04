import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadRolldown } from "./deps.mjs";
import { buildMeta, watchedFiles } from "./meta.mjs";

export const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
export const site = path.join(root, "site");
export const dist = path.join(root, "dist");

function metaPlugin() {
  return {
    name: "ds-meta",
    resolveId(id) { return id === "ds:meta" ? "\0ds:meta" : null; },
    load(id) {
      if (id !== "\0ds:meta") return null;
      for (const f of watchedFiles(root)) this.addWatchFile(f);
      return "export default " + JSON.stringify(buildMeta(root)) + ";";
    }
  };
}

export function inputOptions() {
  return {
    input: path.join(site, "src", "main.jsx"),
    cwd: root,
    plugins: [metaPlugin()],
    transform: { jsx: { runtime: "classic", pragma: "React.createElement", pragmaFrag: "React.Fragment" } },
    logLevel: "warn"
  };
}

export function outputOptions(dev) {
  return { file: path.join(dist, "app.js"), format: "iife", minify: !dev, comments: false, sourcemap: dev ? "inline" : false };
}

function copy(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

function copyDir(from, to, filter) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const name of fs.readdirSync(from)) {
    if (name === ".DS_Store") continue;
    const s = path.join(from, name);
    const d = path.join(to, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d, filter);
    else if (!filter || filter(name)) copy(s, d);
  }
}

function inlineFontFaces(css) {
  const faces = css.match(/@font-face\{[^}]*\}/g) || [];
  return faces.map((f) => f.replace(/url\((["']?)fonts\/([^"')]+)\1\)/g, (m, q, file) => {
    const p = path.join(root, "fonts", file);
    if (!fs.existsSync(p)) return m;
    return 'url("data:font/woff2;base64,' + fs.readFileSync(p).toString("base64") + '")';
  })).join("\n") + "\n";
}

const RELOAD = '<script>(function(){try{var s=new EventSource("/__reload");s.onmessage=function(){location.reload()};}catch(e){}})();</script>';

function html(mode, dev) {
  const t = fs.readFileSync(path.join(site, "index.html"), "utf8");
  const title = mode === "print" ? "APM Design System · Print" : "APM Design System";
  const responsive = mode === "site" ? '<link rel="stylesheet" href="responsive.css">' : "";
  return t.replace(/__MODE__/g, mode).replace(/__TITLE__/g, title).replace("__RESPONSIVE__", responsive).replace("</body>", (dev ? RELOAD : "") + "</body>");
}

export function copyStatic(dev) {
  fs.mkdirSync(dist, { recursive: true });
  const tokens = fs.readFileSync(path.join(root, "tokens.css"), "utf8");
  fs.writeFileSync(path.join(dist, "tokens.css"), tokens);
  fs.writeFileSync(path.join(dist, "fonts-inline.css"), inlineFontFaces(tokens));
  copyDir(path.join(root, "fonts"), path.join(dist, "fonts"), (n) => /\.woff2$/.test(n));
  copy(path.join(root, "components", "bundle.css"), path.join(dist, "ds.css"));
  copy(path.join(root, "components", "bundle.js"), path.join(dist, "ds.js"));
  copy(path.join(root, "patterns", "extension.css"), path.join(dist, "extension.css"));
  copy(path.join(root, "vendor", "react.production.min.js"), path.join(dist, "react.js"));
  copy(path.join(root, "vendor", "react-dom.production.min.js"), path.join(dist, "react-dom.js"));
  const css = ["site.css", "code.css", "patterns.css", "print.css"].map((n) => path.join(site, "css", n)).filter((p) => fs.existsSync(p)).map((p) => fs.readFileSync(p, "utf8")).join("\n");
  fs.writeFileSync(path.join(dist, "site.css"), css);
  copy(path.join(site, "css", "responsive.css"), path.join(dist, "responsive.css"));
  copyDir(path.join(root, "assets"), path.join(dist, "assets"), (n) => /\.(svg|png)$/.test(n));
  const dl = path.join(dist, "downloads");
  fs.mkdirSync(dl, { recursive: true });
  copy(path.join(root, "tokens.json"), path.join(dl, "tokens.json"));
  copy(path.join(root, "tokens.css"), path.join(dl, "tokens.css"));
  copy(path.join(root, "components", "bundle.css"), path.join(dl, "bundle.css"));
  copy(path.join(root, "components", "bundle.js"), path.join(dl, "bundle.js"));
  copy(path.join(root, "components", "index.d.ts"), path.join(dl, "index.d.ts"));
  copy(path.join(root, "patterns", "extension.css"), path.join(dl, "extension.css"));
  copy(path.join(root, "README.md"), path.join(dl, "README.md"));
  copyDir(path.join(root, "fonts"), path.join(dl, "fonts"), (n) => /\.woff2$/.test(n));
  fs.writeFileSync(path.join(dist, "index.html"), html("site", dev));
  fs.writeFileSync(path.join(dist, "print.html"), html("print", dev));
}

export async function buildOnce(dev, quiet) {
  const pdf = path.join(dist, "APM-Design-System.pdf");
  const keep = fs.existsSync(pdf) ? fs.readFileSync(pdf) : null;
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(dist, { recursive: true });
  if (keep) fs.writeFileSync(pdf, keep);
  const started = Date.now();
  const { build } = await loadRolldown();
  await build({ ...inputOptions(), output: outputOptions(dev) });
  copyStatic(dev);
  if (keep) fs.writeFileSync(path.join(dist, "downloads", "APM-Design-System.pdf"), keep);
  const size = fs.statSync(path.join(dist, "app.js")).size;
  if (quiet) return;
  console.log("design system site built in " + (Date.now() - started) + " ms, app.js " + Math.round(size / 1024) + " KB");
  if (!dev) console.log("open " + pathToFileURL(path.join(dist, "index.html")).href);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  buildOnce(false).catch((err) => { console.error(err && err.message ? err.message : err); process.exit(1); });
}
