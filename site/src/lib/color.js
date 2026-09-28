import meta from "ds:meta";
import { contrast } from "../../../themes.js";

export { contrast };

const TOKENS = meta.tokens.color.tokens;
const byName = Object.fromEntries(TOKENS.map((t) => [t.name, t]));

export function valueOf(name, theme) {
  const t = byName[name];
  if (!t) return null;
  const v = t.value[theme];
  const ref = typeof v === "string" && v.match(/^\{(.+)\}$/);
  return ref ? valueOf(ref[1], theme) : v;
}

export const isHex = (v) => typeof v === "string" && /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(v);

const GROUNDS = ["bg", "bg-subtle", "surface", "fill", "fill-hover", "fill-active"];
const PAIRS = {
  "on-primary": ["primary", "text"],
  "on-accent": ["accent", "text"],
  "on-danger": ["danger", "text"],
  "accent-soft": ["accent", "ground"],
  "success-soft": ["success", "ground"],
  "warning-soft": ["warning", "ground"],
  "danger-soft": ["danger", "ground"],
  "mark-ink": ["mark-tile", "text"],
  "mark-tile": ["bg", "deco"]
};

export function pairFor(name) {
  if (name === "overlay") return null;
  if (PAIRS[name]) {
    const [other, kind] = PAIRS[name];
    if (kind === "ground") return { fg: other, bg: name, kind: "text", label: other + " on it" };
    if (kind === "deco") return { fg: name, bg: other, kind: "deco", label: "on " + other };
    return { fg: name, bg: other, kind: "text", label: "on " + other };
  }
  if (name === "fill-hover" || name === "fill-active") return { fg: "text-secondary", bg: name, kind: "text", label: "text-secondary on it" };
  if (GROUNDS.includes(name)) return { fg: "text-tertiary", bg: name, kind: "text", label: "text-tertiary on it" };
  if (name.startsWith("border")) return { fg: name, bg: "bg", kind: "deco", label: "on bg" };
  if (name === "focus") return { fg: name, bg: "bg", kind: "ui", label: "on bg" };
  if (name === "text-disabled") return { fg: name, bg: "bg", kind: "deco", label: "on bg" };
  return { fg: name, bg: "bg", kind: "text", label: "on bg" };
}

export function ratioFor(name, theme) {
  const p = pairFor(name);
  if (!p) return null;
  const fg = valueOf(p.fg, theme);
  const bg = valueOf(p.bg, theme);
  if (!isHex(fg) || !isHex(bg)) return null;
  const r = contrast(fg, bg);
  let grade;
  if (p.kind === "deco") grade = { tone: "neutral", text: "Decorative" };
  else if (p.kind === "ui") grade = r >= 3 ? { tone: "success", text: "UI 3:1" } : { tone: "danger", text: "Fails" };
  else if (r >= 7) grade = { tone: "success", text: "AAA" };
  else if (r >= 4.5) grade = { tone: "success", text: "AA" };
  else if (r >= 3) grade = { tone: "warning", text: "AA large" };
  else grade = { tone: "danger", text: "Fails" };
  return { ratio: r, label: p.label, grade };
}

export const fmtRatio = (r) => (Math.floor(r * 100) / 100).toFixed(2) + ":1";

export const COLOR_GROUPS = [
  { id: "grounds", title: "Grounds", lede: "The neutral ladder every surface is built from. Each step is one notch off the last.", names: ["bg", "bg-subtle", "surface", "fill", "fill-hover", "fill-active"] },
  { id: "borders", title: "Borders", lede: "Hairlines between panes, and the edges of controls.", names: ["border", "border-strong", "border-hover"] },
  { id: "text", title: "Text", lede: "Ink carries hierarchy. Every level but disabled holds 4.5:1 on every ground.", names: ["text", "text-secondary", "text-tertiary", "text-disabled"] },
  { id: "primary", title: "Primary", lede: "The loudest control is ink, not color.", names: ["primary", "primary-hover", "on-primary"] },
  { id: "accent", title: "Accent", lede: "A working color for focus, links and information. Never a large fill.", names: ["accent", "accent-hover", "accent-soft", "on-accent", "focus"] },
  { id: "status", title: "Status", lede: "Always with an icon and a word. The soft pair is the ground behind them.", names: ["success", "success-soft", "warning", "warning-soft", "danger", "danger-soft", "on-danger"] },
  { id: "brand", title: "Brand and utility", lede: "The app icon stays dark in both themes. The overlay dims the app behind dialogs.", names: ["mark-tile", "mark-ink", "overlay"] }
];

export const tokenOf = (name) => byName[name];
