const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const http = require("http");
const path = require("path");

const dist = process.env.DS_DIST;
const out = process.env.DS_OUT;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json" };

app.commandLine.appendSwitch("disable-gpu");
app.dock && app.dock.hide();

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const rel = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
      const file = path.normalize(path.join(dist, rel === "/" ? "index.html" : rel));
      if (!file.startsWith(dist)) { res.writeHead(403); res.end(); return; }
      fs.readFile(file, (err, data) => {
        if (err) { res.writeHead(404); res.end(); return; }
        res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
        res.end(data);
      });
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function run() {
  const server = await serve();
  const win = new BrowserWindow({ show: false, width: 1280, height: 800, webPreferences: { offscreen: false, sandbox: true, contextIsolation: true } });
  const errors = [];
  win.webContents.on("console-message", (e) => { if (e.level === "error" || e.level === 3) errors.push(e.message); });
  await win.loadURL("http://127.0.0.1:" + server.address().port + "/print.html");
  const started = Date.now();
  let ready = false;
  while (Date.now() - started < 60000) {
    ready = await win.webContents.executeJavaScript("window.__DS_PRINT_READY === true");
    if (ready) break;
    await new Promise((r) => setTimeout(r, 200));
  }
  if (!ready) throw new Error("print page never became ready" + (errors.length ? ": " + errors.join(" | ") : ""));
  const pages = await win.webContents.executeJavaScript("document.querySelectorAll('.pp-page').length");
  const over = await win.webContents.executeJavaScript("(window.__DS_PRINT_OVERFLOW || []).join(', ')");
  if (over) console.log("pages whose content overflows (page:px): " + over);
  const data = await win.webContents.printToPDF({ printBackground: true, preferCSSPageSize: true, margins: { marginType: "none" } });
  fs.writeFileSync(out, data);
  console.log("rendered " + pages + " pages" + (errors.length ? ", console errors: " + errors.join(" | ") : ""));
  server.close();
}

app.whenReady().then(() => run().then(() => app.exit(0), (err) => { console.error(err && err.message ? err.message : err); app.exit(1); }));
