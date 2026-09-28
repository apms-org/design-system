import meta from "ds:meta";
import * as actions from "../examples/actions.jsx";
import * as inputs from "../examples/inputs.jsx";
import * as navigation from "../examples/navigation.jsx";
import * as vault from "../examples/vault.jsx";
import * as display from "../examples/display.jsx";
import * as overlays from "../examples/overlays.jsx";
import * as brand from "../examples/brand.jsx";
import * as patterns from "../examples/patterns.jsx";

const MODULES = [actions, inputs, navigation, vault, display, overlays, brand, patterns];
const FNS = {};
const SPECS = {};
export const NOTES = {};

for (const m of MODULES) {
  for (const [k, v] of Object.entries(m)) if (typeof v === "function" && k.includes("_")) FNS[k] = v;
  Object.assign(SPECS, m.specs || {});
  Object.assign(NOTES, m.notes || {});
}

export function humanize(s) {
  const words = s.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function examplesFor(prefix) {
  return Object.keys(meta.examples)
    .filter((k) => k.startsWith(prefix + "_") && FNS[k])
    .map((k) => {
      const spec = SPECS[k] || {};
      return { id: k, Comp: FNS[k], code: spec.code === false ? null : meta.examples[k], spec, title: spec.title || humanize(k.slice(prefix.length + 1)) };
    });
}
