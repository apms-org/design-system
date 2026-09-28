import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { root, dist, buildOnce } from "./build.mjs";
import { electronBinary } from "./deps.mjs";

const electron = electronBinary();

await buildOnce(false);
const out = path.join(dist, "APM-Design-System.pdf");
const env = { ...process.env, DS_DIST: dist, DS_OUT: out };
delete env.ELECTRON_RUN_AS_NODE;
const code = await new Promise((resolve) => {
  const child = spawn(electron, [path.join(root, "scripts", "pdf-main.cjs")], { env, stdio: ["ignore", "inherit", "inherit"] });
  child.on("exit", (c) => resolve(c));
});
if (code !== 0 || !fs.existsSync(out)) { console.error("PDF render failed"); process.exit(1); }
await buildOnce(false, true);
console.log("wrote " + out + " (" + Math.round(fs.statSync(out).size / 1024) + " KB)");
