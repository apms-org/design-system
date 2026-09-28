import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const pkgDir = path.resolve(here, "..");
const require = createRequire(path.join(pkgDir, "package.json"));

function fail(name, err) {
  const first = String((err && err.message) || err).split("\n")[0];
  console.error("Missing " + name + ". Install the design system's dependencies once with: npm install");
  console.error("(" + first + ")");
  process.exit(1);
}

export async function loadRolldown() {
  let entry;
  try { entry = require.resolve("rolldown"); } catch (err) { fail("rolldown", err); }
  try { return await import(pathToFileURL(entry).href); } catch (err) { fail("rolldown", err); }
  return entry;
}

export function electronBinary() {
  let bin;
  try { bin = require("electron"); } catch (err) { fail("electron", err); }
  if (typeof bin !== "string" || !fs.existsSync(bin)) fail("the Electron binary", new Error("run npm install again, or npm rebuild electron"));
  return bin;
}
