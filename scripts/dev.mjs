import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { loadRolldown } from "./deps.mjs";
import { root, site, dist, inputOptions, outputOptions, copyStatic, buildOnce } from "./build.mjs";

const port = Number(process.env.PORT || 4418);
const clients = new Set();
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".pdf": "application/pdf", ".md": "text/markdown; charset=utf-8", ".ts": "text/plain; charset=utf-8" };

function reload() {
  for (const res of clients) { try { res.write("data: reload\n\n"); } catch (e) {} }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  if (url.pathname === "/__reload") {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
    res.write(": ok\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }
  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith("/")) rel += "index.html";
  const file = path.normalize(path.join(dist, rel));
  if (!file.startsWith(dist)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); res.end("not found"); return; }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  });
});

async function main() {
  await buildOnce(true);
  const { watch } = await loadRolldown();
  const watcher = watch({ ...inputOptions(), output: outputOptions(true) });
  let first = true;
  watcher.on("event", (e) => {
    if (e.code === "BUNDLE_END") { if (!first) console.log("rebuilt in " + e.duration + " ms"); first = false; reload(); }
    if (e.code === "ERROR") console.error(e.error && e.error.message ? e.error.message : e.error);
    if (e.code === "BUNDLE_END" && e.result && e.result.close) e.result.close();
  });
  let timer = null;
  const refresh = () => { clearTimeout(timer); timer = setTimeout(() => { try { copyStatic(true); reload(); } catch (err) { console.error(err.message); } }, 120); };
  for (const p of [path.join(site, "css"), path.join(site, "index.html"), path.join(root, "tokens.css"), path.join(root, "components"), path.join(root, "patterns"), path.join(root, "assets"), path.join(root, "fonts")]) {
    if (fs.existsSync(p)) fs.watch(p, { recursive: fs.statSync(p).isDirectory() }, refresh);
  }
  server.on("error", (err) => { console.error(err.code === "EADDRINUSE" ? "Port " + port + " is busy. Stop the other server or run with PORT=4419 npm run dev." : err.message); process.exit(1); });
  server.listen(port, "127.0.0.1", () => console.log("APM design system running at http://127.0.0.1:" + port + "/ (Ctrl+C to stop)"));
  const stop = () => { watcher.close(); server.close(); process.exit(0); };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

main().catch((err) => { console.error(err && err.message ? err.message : err); process.exit(1); });
