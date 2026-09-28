const { useSyncExternalStore } = React;

function createStore(initial) {
  let value = initial;
  const subs = new Set();
  return {
    get: () => value,
    set(next) { value = typeof next === "function" ? next(value) : next; subs.forEach((f) => f()); },
    subscribe(f) { subs.add(f); return () => subs.delete(f); }
  };
}

export function useStore(store) {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

export const toastStore = createStore(null);
let toastTimer = null;

export function notify(t) {
  clearTimeout(toastTimer);
  toastStore.set({ key: Date.now() + Math.random(), tone: "success", ...t });
  toastTimer = setTimeout(() => toastStore.set(null), t.duration || 1800);
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
}

export function copy(text, title, description) {
  const value = String(text);
  let done = false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(() => { done = true; }, () => fallbackCopy(value));
      done = true;
    }
  } catch (e) {}
  if (!done) fallbackCopy(value);
  notify({ title: title || "Copied", description: description === undefined ? (value.length > 48 ? value.slice(0, 46) + "..." : value) : description, icon: "copy", tone: "neutral" });
}

const THEME_KEY = "apm-ds-theme";

function readTheme() {
  try { const v = localStorage.getItem(THEME_KEY); if (v === "light" || v === "dark" || v === "system") return v; } catch (e) {}
  return "system";
}

export const themeStore = createStore(readTheme());

const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
export const systemDarkStore = createStore(!!(media && media.matches));
if (media) {
  const on = (e) => systemDarkStore.set(e.matches);
  if (media.addEventListener) media.addEventListener("change", on); else if (media.addListener) media.addListener(on);
}

export function applyMode(mode) {
  const root = document.documentElement;
  if (mode === "light" || mode === "dark") root.setAttribute("data-theme", mode);
  else root.removeAttribute("data-theme");
}

export function setTheme(mode) {
  try { localStorage.setItem(THEME_KEY, mode); } catch (e) {}
  applyMode(mode);
  themeStore.set(mode);
}

export function useResolvedTheme() {
  const mode = useStore(themeStore);
  const sys = useStore(systemDarkStore);
  return mode === "system" ? (sys ? "dark" : "light") : mode;
}

function parseHash() {
  const raw = (location.hash || "").replace(/^#\/?/, "");
  const [path, q] = raw.split("?");
  const parts = path.split("/").filter(Boolean).map((s) => decodeURIComponent(s));
  const query = {};
  if (q) for (const pair of q.split("&")) { const [k, v] = pair.split("="); if (k) query[decodeURIComponent(k)] = decodeURIComponent(v || ""); }
  return { page: parts[0] || "overview", sub: parts[1] || null, query, key: raw };
}

export const routeStore = createStore(parseHash());
window.addEventListener("hashchange", () => routeStore.set(parseHash()));

export function go(path) {
  const next = "#/" + path.replace(/^#?\/?/, "");
  if (location.hash === next) routeStore.set(parseHash());
  else location.hash = next;
}

export function href(path) {
  return "#/" + path.replace(/^#?\/?/, "");
}
