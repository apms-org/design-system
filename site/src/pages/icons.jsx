import meta from "ds:meta";
import { copy, useStore, routeStore } from "../lib/state.js";
import { Inline } from "../lib/md.jsx";
import { Spec } from "../lib/ui.jsx";
import { readmeBullets, ruleBlocks, RuleList, exampleBlocks } from "./common.jsx";

const A = window.APM;
const { useState, useMemo } = React;

const TYPES = [
  ["Logins", "globe"], ["Authenticator", "timer"], ["API keys", "key-round"], ["SSH keys", "terminal"], ["Cloud credentials", "cloud"],
  ["Cards", "credit-card"], ["Banking", "landmark"], ["Identities", "id-card"], ["Wi-Fi", "wifi"], ["Secure notes", "sticky-note"]
];

function TypeIcons() {
  return (
    <div className="ds-itypes">
      {TYPES.map(([label, icon]) => (
        <button type="button" key={icon} className="ds-itype" onClick={() => copy("<Icon name=\"" + icon + "\" />", "Copied icon", icon)}>
          <A.ItemIcon icon={icon} />
          <span className="ds-itype-l">{label}</span>
          <span className="ds-itype-n">{icon}</span>
        </button>
      ))}
    </div>
  );
}

function IconCell({ name, size }) {
  return (
    <button type="button" className="ds-ic-cell" title={"Copy <Icon name=\"" + name + "\" />"} onClick={() => copy("<Icon name=\"" + name + "\" />", "Copied icon", name)}>
      <span className="ds-ic-glyph"><A.Icon name={name} size={size} /></span>
      <span className="ds-ic-name">{name}</span>
    </button>
  );
}

function IconBrowser() {
  const route = useStore(routeStore);
  const [q, setQ] = useState(route.query.q || "");
  const [size, setSize] = useState("16");
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return n ? meta.icons.filter((x) => x.includes(n)) : meta.icons;
  }, [q]);
  return (
    <div className="ds-icons">
      <div className="ds-icons-bar">
        <A.SearchField placeholder={"Search " + meta.icons.length + " icons"} value={q} onChange={setQ} shortcut={null} />
        <A.SegmentedControl label="Icon size" options={["14", "16", "20", "24"]} value={size} onChange={setSize} />
        <span className="ds-icons-count">{list.length === meta.icons.length ? list.length + " icons" : list.length + " of " + meta.icons.length}</span>
      </div>
      {list.length ? (
        <div className="ds-ic-grid">{list.map((n) => <IconCell key={n} name={n} size={Number(size)} />)}</div>
      ) : (
        <A.EmptyState icon="search" title={"No icons match \"" + q + "\""} action={<A.Button size="sm" onClick={() => setQ("")}>Clear search</A.Button>}>Search matches icon names, such as lock, key or cloud.</A.EmptyState>
      )}
    </div>
  );
}

function iconChunks() {
  const out = [];
  const per = 78;
  for (let i = 0; i < meta.icons.length; i += per) {
    const slice = meta.icons.slice(i, i + per);
    out.push({ key: "icons" + i, span: "full", web: false, node: <div className="ds-ic-grid is-print">{slice.map((n) => <IconCell key={n} name={n} size={16} />)}</div> });
  }
  return out;
}

export const icons = {
  id: "icons",
  group: "Foundations",
  nav: "Iconography",
  icon: "image",
  title: "Iconography",
  lede: "Lucide icons at 16px with a 1.75 stroke, drawn in `currentColor` by the `Icon` component. Click any icon to copy its JSX.",
  keywords: "icon lucide glyph svg search",
  blocks: (ctx) => [
    { kind: "h", title: "Rules", id: "rules" },
    ...ruleBlocks(readmeBullets("iconography"), { key: "icon-rules", chunk: 5 }),
    { kind: "h", title: "Item types", lede: "One icon per type, everywhere that type appears.", id: "types" },
    { key: "types", span: "full", node: <TypeIcons /> },
    { kind: "h", title: "All icons", lede: meta.icons.length + " icons ship in the bundle and as SVG sources in `assets/Icons`.", id: "all" },
    { key: "browser", span: "full", print: false, node: <IconBrowser /> },
    ...iconChunks()
  ]
};

function LogoCard({ file }) {
  const dark = /white|app-icon/.test(file);
  const ground = /white/.test(file) ? "dark" : "light";
  return (
    <div className="ds-logo">
      <div className="ds-logo-stage" data-theme={ground}>
        <img src={"assets/Logos/" + file} alt={file} />
      </div>
      <div className="ds-logo-meta">
        <span className="ds-logo-name">{file}</span>
        <a className="ds-logo-dl" href={"assets/Logos/" + file} download><A.Icon name="download" size={14} />Download</a>
      </div>
    </div>
  );
}

function ClearSpace() {
  return (
    <div className="ds-clear">
      <div className="ds-clear-box">
        <span className="ds-clear-zone" />
        <A.Mark tile size={96} />
      </div>
      <div className="ds-clear-text">
        <div className="ds-clear-row"><b>Clear space</b><span>A quarter of the mark's height on every side.</span></div>
        <div className="ds-clear-row"><b>Minimum size</b><span>16px bare, 20px on a tile.</span></div>
        <div className="ds-clear-row"><b>Colors</b><span className="mono-small">#0b0b0d tile · #f2f2f2 bird · #111113 ink</span></div>
      </div>
    </div>
  );
}

const logoRules = meta.logosReadme.filter((b) => b.type === "ul").flatMap((b) => b.items);

export const brand = {
  id: "brand",
  group: "Foundations",
  nav: "Brand",
  icon: "award",
  title: "Brand",
  lede: "The mark is the bird from the app icon. Draw it with `Mark`; use the files below outside the interface.",
  keywords: "logo mark bird app icon brand",
  blocks: () => [
    ...(logoRules.length ? [{ kind: "h", title: "Rules", id: "rules" }, { key: "logo-rules", span: "full", node: <RuleList items={logoRules} /> }] : []),
    { kind: "h", title: "The mark", id: "mark" },
    ...exampleBlocks("Mark"),
    { key: "clear", span: "full", node: <ClearSpace /> },
    { kind: "h", title: "Files", lede: "In `assets/Logos`.", id: "files" },
    ...meta.logos.map((f) => ({ key: "logo-" + f, span: "half", node: <LogoCard file={f} /> }))
  ]
};
