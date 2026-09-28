import meta from "ds:meta";
import { NAV, PAGES, findPage } from "./pages/index.js";
import { useStore, routeStore, themeStore, setTheme, applyMode, toastStore, go, href, copy } from "./lib/state.js";
import { Blocks, PageHeader } from "./lib/ui.jsx";
import { slugOf } from "./lib/md.jsx";
import { COLOR_GROUPS } from "./lib/color.js";
import { PrintApp } from "./print.jsx";

const A = window.APM;
const { useState, useEffect, useMemo, useRef } = React;

function ThemeSwitch() {
  const mode = useStore(themeStore);
  return (
    <A.SegmentedControl
      label="Theme"
      value={mode}
      onChange={setTheme}
      options={[
        { value: "light", label: "Light", icon: "sun" },
        { value: "dark", label: "Dark", icon: "moon" },
        { value: "system", label: "Auto", icon: "monitor" }
      ]}
    />
  );
}

function Sidebar({ current, onSearch }) {
  return (
    <aside className="ds-side" aria-label="Site navigation">
      <div className="ds-side-top">
        <a className="ds-brand" href={href("overview")}>
          <A.Mark tile size={24} />
          <span className="ds-brand-name">APM Design</span>
          <A.Badge size="sm" outline>v{meta.version}</A.Badge>
        </a>
      </div>
      <div className="ds-side-scroll">
        <button type="button" className="ds-search" onClick={onSearch}>
          <A.Icon name="search" size={14} />
          <span>Search</span>
          <A.Kbd keys={["⌘", "K"]} />
        </button>
        {NAV.map((sec) => (
          <nav key={sec.label} className="ds-nav-group" aria-label={sec.label}>
            <div className="ds-nav-label">{sec.label}</div>
            {sec.pages.map((p) => <A.NavItem key={p.id} icon={p.icon} label={p.nav} href={href(p.id)} active={current && current.id === p.id} />)}
            {sec.groups && sec.groups.map((g) => (
              <div key={g.group} className="ds-nav-sub">
                <div className="ds-nav-sublabel">{g.group}</div>
                {g.items.map((c) => {
                  const id = "components/" + slugOf(c.name);
                  return <A.NavItem key={c.name} label={c.name} href={href(id)} active={current && current.id === id} className="ds-nav-comp" />;
                })}
              </div>
            ))}
          </nav>
        ))}
      </div>
      <div className="ds-side-foot"><ThemeSwitch /></div>
    </aside>
  );
}

function Search({ open, onClose }) {
  const groups = useMemo(() => {
    const pages = PAGES.filter((p) => p.group !== "Components" || p.id === "components");
    const comps = PAGES.filter((p) => p.component);
    const colorGroup = Object.fromEntries(COLOR_GROUPS.flatMap((g) => g.names.map((n) => [n, g.title])));
    const tokens = [
      ...meta.tokens.color.tokens.map((t) => ({ label: "--" + t.name, hint: "Color · " + (colorGroup[t.name] || ""), icon: "palette", keywords: t.usage, to: "color" })),
      ...meta.tokens.spacing.tokens.map((t) => ({ label: "--" + t.name, hint: "Spacing · " + t.value, icon: "layout-grid", keywords: t.usage, to: "layout" })),
      ...meta.tokens.size.tokens.map((t) => ({ label: "--" + t.name, hint: "Size · " + t.value, icon: "maximize-2", keywords: t.usage, to: "layout" })),
      ...meta.tokens.radius.tokens.map((t) => ({ label: "--" + t.name, hint: "Radius · " + t.value, icon: "layers", keywords: t.usage, to: "shape" })),
      ...meta.tokens.shadow.tokens.map((t) => ({ label: "--" + t.name, hint: "Shadow", icon: "layers", keywords: t.usage, to: "shape" })),
      ...Object.entries(meta.motion).map(([k, v]) => ({ label: "--" + k, hint: "Motion · " + v, icon: "activity", keywords: "", to: "motion" })),
      ...meta.tokens.type.groups.flatMap((g) => g.styles.map((s) => ({ label: "." + s.name, hint: "Type · " + s.fontSize, icon: "file-text", keywords: s.usage, to: "typography", copyText: s.name })))
    ];
    return [
      { label: "Components", limit: 8, idleLimit: 4, items: comps.map((p) => ({ id: p.id, label: p.title, hint: p.subgroup, icon: "layout-grid", keywords: p.subgroup, onSelect: () => go(p.id) })) },
      { label: "Pages", limit: 6, idleLimit: 6, items: pages.map((p) => ({ id: p.id, label: p.nav === "All components" ? "Components" : p.nav, hint: p.group, icon: p.icon, keywords: p.keywords, onSelect: () => go(p.id) })) },
      { label: "Tokens", limit: 8, idleLimit: 3, items: tokens.map((t) => ({ id: "t" + t.label, label: t.label, hint: t.hint, icon: t.icon, keywords: t.keywords, onSelect: () => { const text = t.copyText || "var(" + t.label + ")"; copy(text, "Copied token", text); go(t.to); } })) },
      { label: "Icons", limit: 10, idleLimit: 3, items: meta.icons.map((n) => ({ id: "i" + n, label: n, hint: "Icon", icon: n, keywords: "icon", onSelect: () => { copy("<Icon name=\"" + n + "\" />", "Copied icon", n); go("icons?q=" + encodeURIComponent(n)); } })) }
    ];
  }, []);
  return <A.CommandMenu open={open} onClose={onClose} groups={groups} placeholder="Search pages, components, tokens and icons" />;
}

function ToastHost() {
  const t = useStore(toastStore);
  if (!t) return null;
  return <div className="ds-toast-slot"><A.Toast key={t.key} title={t.title} description={t.description} tone={t.tone} icon={t.icon} /></div>;
}

function useActiveHeading(ids) {
  const [active, setActive] = useState(ids[0] || null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let cur = ids[0] || null;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < 140) cur = id;
        }
        setActive(cur);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, [ids.join("|")]);
  return active;
}

function OnThisPage({ heads }) {
  const ids = heads.map((h) => h.id);
  const active = useActiveHeading(ids);
  if (heads.length < 3) return <div className="ds-toc" aria-hidden="true" />;
  return (
    <nav className="ds-toc" aria-label="On this page">
      <div className="ds-toc-label">On this page</div>
      {heads.map((h) => (
        <button type="button" key={h.id} className={"ds-toc-item" + (active === h.id ? " is-active" : "")} onClick={() => { const el = document.getElementById(h.id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 24, behavior: "smooth" }); }}>{h.title}</button>
      ))}
    </nav>
  );
}

function NotFound({ route }) {
  return (
    <div className="ds-404">
      <A.EmptyState icon="search" title={"Nothing at #/" + route.key} action={<A.Button size="sm" href={href("overview")}>Go to the overview</A.Button>}>
        The page may have moved. Search with ⌘K to find it.
      </A.EmptyState>
    </div>
  );
}

function PageView({ page }) {
  const blocks = useMemo(() => page.blocks({ print: false }), [page]);
  const heads = blocks.filter((b) => b.kind === "h" && b.id);
  return (
    <div className="ds-page-wrap">
      <article className="ds-page">
        {!page.hideHeader && <PageHeader eyebrow={page.eyebrow || page.group} title={page.title} lede={page.lede} />}
        <Blocks blocks={blocks} />
        <footer className="ds-foot">
          <span><A.Mark size={14} />APM Design System v{meta.version}</span>
          <span>Source in design-system · built {meta.built}</span>
        </footer>
      </article>
      <OnThisPage heads={heads} />
    </div>
  );
}

function App() {
  const route = useStore(routeStore);
  const [search, setSearch] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const page = findPage(route);
  useEffect(() => {
    const k = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); setSearch((v) => !v); }
      else if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || "") && !search) { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [search]);
  useEffect(() => {
    setDrawer(false);
    window.scrollTo(0, 0);
    document.title = (page && page.id !== "overview" ? page.title + " · " : "") + "APM Design System";
    const t = setTimeout(() => {
      const a = document.activeElement;
      if (a && a.closest && a.closest(".ds-stage, .ds-thumb")) { a.blur(); window.scrollTo(0, 0); }
    }, 120);
    return () => clearTimeout(t);
  }, [route.page, route.sub]);
  return (
    <div className={"ds-app" + (drawer ? " is-drawer" : "")}>
      <header className="ds-topbar">
        <A.IconButton icon={drawer ? "x" : "list"} label={drawer ? "Close menu" : "Open menu"} onClick={() => setDrawer(!drawer)} />
        <a className="ds-brand" href={href("overview")}><A.Mark tile size={22} /><span className="ds-brand-name">APM Design</span></a>
        <A.IconButton icon="search" label="Search" kbd="⌘ K" onClick={() => setSearch(true)} />
      </header>
      <Sidebar current={page} onSearch={() => setSearch(true)} />
      <div className="ds-scrim" onClick={() => setDrawer(false)} />
      <main className="ds-main" key={route.page + "/" + (route.sub || "")}>
        {page ? <PageView page={page} /> : <NotFound route={route} />}
      </main>
      <Search open={search} onClose={() => setSearch(false)} />
      <ToastHost />
    </div>
  );
}

const mode = document.documentElement.getAttribute("data-mode");
if (mode === "print") document.documentElement.setAttribute("data-theme", "light");
else applyMode(themeStore.get());
ReactDOM.createRoot(document.getElementById("root")).render(mode === "print" ? <PrintApp /> : <App />);
