import meta from "ds:meta";
import { PRESETS } from "../../../themes.js";
import { href } from "../lib/state.js";
import { CodeBlock } from "../lib/code.jsx";
import { usePrint } from "../lib/ui.jsx";
import { Stat } from "./common.jsx";

const A = window.APM;

export function CoverArt({ className }) {
  return <div className={"ds-art" + (className ? " " + className : "")} aria-hidden="true" dangerouslySetInnerHTML={{ __html: meta.cover }} />;
}

function Hero() {
  const print = usePrint();
  const pdf = meta.downloads.find((d) => d.name.endsWith(".pdf"));
  return (
    <div className="ds-hero">
      <div className="ds-hero-text">
        <div className="ds-hero-mark"><A.Mark tile size={44} /><A.Badge size="sm" outline>v{meta.version}</A.Badge></div>
        <h1 className="ds-hero-title">APM Design System</h1>
        <p className="ds-hero-lede">{meta.readme.intro.filter((b) => b.type === "p").map((b) => b.text).join(" ")}</p>
        {!print && (
          <div className="ds-hero-actions">
            <A.Button variant="primary" icon="layout-grid" href={href("components")}>Browse components</A.Button>
            <A.Button icon="palette" href={href("color")}>Foundations</A.Button>
            {pdf && pdf.size != null && <A.Button variant="ghost" icon="file-down" href={"downloads/" + pdf.name} download={pdf.name}>PDF</A.Button>}
          </div>
        )}
      </div>
      <CoverArt className="ds-hero-art" />
    </div>
  );
}

function Stats() {
  return (
    <div className="ds-stats">
      <Stat value={meta.components.length} label="Components" />
      <Stat value={meta.tokens.color.tokens.length} label="Color tokens" />
      <Stat value={meta.icons.length} label="Icons" />
      <Stat value={PRESETS.length} label="Themes" />
    </div>
  );
}

const START = [
  { icon: "sparkles", title: "Principles", body: "Five ideas every screen follows. Read these first.", to: "principles" },
  { icon: "palette", title: "Foundations", body: "Color, type, spacing, shape, motion and icons, straight from the tokens.", to: "color" },
  { icon: "layout-grid", title: "Components", body: meta.components.length + " live components with every variant, props and guidance.", to: "components" },
  { icon: "workflow", title: "Patterns", body: "The lock card, the three panes, the detail view and the small chips.", to: "patterns" },
  { icon: "puzzle", title: "Browser extension", body: "The popup, the menu on the page, save prompts, passkey sheets and the options page.", to: "extension" },
  { icon: "palette", title: "Themes", body: "Light, Dark and the presets, each derived from 9 colors and checked for contrast.", to: "themes" }
];

function StartCards() {
  return (
    <div className="ds-start">
      {START.map((s) => (
        <a key={s.to} className="ds-start-card" href={href(s.to)}>
          <span className="ds-itile"><A.Icon name={s.icon} size={16} /></span>
          <span className="ds-start-title">{s.title}<A.Icon name="arrow-right" size={14} /></span>
          <span className="ds-start-body">{s.body}</span>
        </a>
      ))}
    </div>
  );
}

const APP_CODE = `const A = window.APM;

function SaveBar({ onSave }) {
  return (
    <div className="bar">
      <A.Button variant="primary" icon="check" onClick={onSave}>Save</A.Button>
      <A.Button>Cancel</A.Button>
    </div>
  );
}`;

const NEW_CODE = `<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="vendor/react.production.min.js"></script>
<script src="vendor/react-dom.production.min.js"></script>
<script src="components/bundle.js"></script>`;

const CSS_CODE = `.panel {
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  color: var(--text-secondary);
}`;

function UseInApp() {
  return (
    <div className="ds-use">
      <div className="ds-use-text">
        <h3 className="ds-h3">In the app and the extension</h3>
        <p className="ds-p">The desktop app keeps a copy of <code className="ds-ic">tokens.css</code>, <code className="ds-ic">themes.js</code>, <code className="ds-ic">components/bundle.css</code>, <code className="ds-ic">components/bundle.js</code> and <code className="ds-ic">fonts/</code> in <code className="ds-ic">GUI/vendor/design-system</code>. The browser extension keeps the same files plus <code className="ds-ic">patterns/extension.css</code> in <code className="ds-ic">extension/vendor/design-system</code>. Change a token, a component or a surface here, then run <code className="ds-ic">npm run ds:sync</code> in the app or the extension to ship it.</p>
        <p className="ds-p">Screens read components from <code className="ds-ic">window.APM</code> and style layout with the tokens. App CSS holds only window chrome and screen layout: the sidebar, the list and detail panes, the Settings grid. A card, a header, a status or a row that a second screen could use belongs in the bundle. Never type a hex value in app CSS.</p>
      </div>
      <CodeBlock code={APP_CODE} />
    </div>
  );
}

function UseInNew() {
  return (
    <div className="ds-use">
      <div className="ds-use-text">
        <h3 className="ds-h3">In new code</h3>
        <p className="ds-p">Load the tokens, the bundle styles, React 18 and the bundle, in that order. Components are then on <code className="ds-ic">window.APM</code>; types are in <code className="ds-ic">components/index.d.ts</code>.</p>
        <p className="ds-p">When something is missing, extend the system in the same spirit before inventing a one-off, and document it here.</p>
      </div>
      <div className="ds-use-codes">
        <CodeBlock code={NEW_CODE} lang="jsx" title="index.html" />
        <CodeBlock code={CSS_CODE} lang="css" title="Layout from tokens" />
      </div>
    </div>
  );
}

const FILES = [
  ["README.md", "The guidelines. Every guideline page on this site is rendered from it."],
  ["SITE.md", "How to run, build and print this site."],
  ["tokens.json", "Every token with light and dark values and usage notes."],
  ["tokens.css", "CSS custom properties, type classes and @font-face rules."],
  ["components/", "bundle.js, bundle.css, index.d.ts, and a README per component."],
  ["patterns/", "extension.css, the browser extension's popup, field menu, prompts, sheets and options page."],
  ["fonts/", "Geist and Geist Mono, variable woff2."],
  ["assets/Icons/", meta.icons.length + " Lucide SVG sources."],
  ["assets/Logos/", "The app icon and the mark in ink and white."],
  ["vendor/", "React 18 and ReactDOM, production UMD builds."],
  ["site/", "This site: src/ pages and examples, css/, index.html."],
  ["scripts/", "build.mjs, dev.mjs, pdf.mjs and the metadata reader."],
  ["dist/", "Build output. Open dist/index.html; the PDF lands here too."]
];

function FileMap() {
  return (
    <div className="ds-files">
      <div className="ds-files-root"><A.Icon name="folder-open" size={14} />design-system</div>
      {FILES.map(([f, d]) => (
        <div key={f} className="ds-files-row">
          <span className="ds-files-name"><A.Icon name={f.endsWith("/") ? "folder" : "file"} size={14} />{f}</span>
          <span className="ds-files-desc">{d}</span>
        </div>
      ))}
    </div>
  );
}

const CMDS = `cd design-system
npm run dev         # dev server on http://127.0.0.1:4418
npm run build       # static site in dist/
npm run pdf         # dist/APM-Design-System.pdf`;

function Commands() {
  return <CodeBlock code={CMDS.replace(/\s+#.*$/gm, "")} lang="sh" title="From design-system/" />;
}

function CommandTable() {
  const rows = [["npm run ds", "Build, watch, and serve on 127.0.0.1:4418 with live reload."], ["npm run ds:build", "Static site in design-system/dist. Opens from file:// too."], ["npm run ds:pdf", "Build, then print dist/APM-Design-System.pdf with Electron."]];
  return (
    <div className="ds-cmds">
      <Commands />
      <div className="ds-cmds-list">{rows.map(([c, d]) => <div key={c} className="ds-cmds-row"><code>{c}</code><span>{d}</span></div>)}</div>
    </div>
  );
}

export const overview = {
  id: "overview",
  group: "Start",
  nav: "Overview",
  icon: "house",
  title: "APM Design System",
  hideHeader: true,
  keywords: "home start overview introduction usage",
  blocks: () => [
    { key: "hero", span: "full", node: <Hero /> },
    { key: "stats", span: "full", node: <Stats /> },
    { kind: "h", title: "Start here", id: "start", print: false },
    { key: "start", span: "full", print: false, node: <StartCards /> },
    { kind: "h", title: "Using the system", id: "use" },
    { key: "use-app", span: "full", node: <UseInApp /> },
    { key: "use-new", span: "full", node: <UseInNew /> },
    { kind: "h", title: "Files", lede: "Everything lives in `design-system`. It is the one source; the app, the extension and this site all build from it.", id: "files" },
    { key: "files", span: "full", node: <FileMap /> },
    { kind: "h", title: "Work on this site", id: "site" },
    { key: "cmds", span: "full", node: <CommandTable /> }
  ]
};
