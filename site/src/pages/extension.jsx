import { Table } from "../lib/md.jsx";
import { CodeBlock } from "../lib/code.jsx";
import { readme, readmeBullets, ruleBlocks, exampleBlocks, readmeParas } from "./common.jsx";

const A = window.APM;

function Surfaces() {
  const t = readme("browser-extension").blocks.find((b) => b.type === "table");
  if (!t) return null;
  return <Table head={t.head} rows={t.rows} />;
}

const KEYS = [
  [["⌥", "⇧", "A"], "Open APM"],
  [["⌥", "⇧", "F"], "Fill the best login for this page"],
  [["⌥", "⇧", "G"], "Generate and fill a strong password"],
  [["⌥", "⇧", "L"], "Lock the vault"],
  [["↑", "↓"], "Move between logins in the menu"],
  [["↵"], "Fill the highlighted login"],
  [["Esc"], "Close the menu, a note or a sheet"]
];

function Keys() {
  return (
    <div className="ds-ext-keys">
      {KEYS.map(([k, what]) => (
        <div key={what} className="ds-ext-key"><span>{what}</span><A.Kbd keys={k} /></div>
      ))}
    </div>
  );
}

const LOAD = `<html lang="en" class="page-popup">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="ds.css">
<link rel="stylesheet" href="extension.css">
<script src="react.production.min.js"></script>
<script src="react-dom.production.min.js"></script>
<script src="ds.js"></script>`;

const SYNC = `cd extension
npm run ds:sync     # copies patterns/extension.css with the tokens and the bundle
npm run build`;

function Using() {
  return (
    <div className="ds-use">
      <div className="ds-use-text">
        <h3 className="ds-h3">One file for every surface</h3>
        <p className="ds-p">The classes on this page live in <code className="ds-ic">patterns/extension.css</code>. <code className="ds-ic">npm run ds:sync</code> in <code className="ds-ic">extension/</code> copies it into <code className="ds-ic">vendor/design-system</code>, and the build links it on every extension page after the bundle styles.</p>
        <p className="ds-p">The same file sizes the pages through the class on each page's <code className="ds-ic">html</code>: <code className="ds-ic">page-popup</code> for the 380 by 580 popup, <code className="ds-ic">page-frame</code> for the field menu, notes and sheets, and <code className="ds-ic">page-options</code> for the full height options tab. The extension needs no stylesheet of its own. Change a surface here, never there.</p>
        <p className="ds-p">The one exception is the field icon, which sits in the page's own document inside a closed shadow root where these tokens do not exist. Its few inline styles copy <code className="ds-ic">mark-tile</code> and <code className="ds-ic">mark-ink</code> by value.</p>
      </div>
      <div className="ds-use-codes">
        <CodeBlock code={LOAD} lang="jsx" title="popup.html" />
        <CodeBlock code={SYNC.replace(/\s+#.*$/gm, "")} lang="sh" title="Ship a change" />
      </div>
    </div>
  );
}

export const extension = {
  id: "extension",
  group: "Recipes",
  nav: "Extension",
  icon: "puzzle",
  title: "Browser extension",
  lede: "The toolbar popup, the menu on the page, the save prompts, the passkey sheets and the options page. Every specimen below is live, built from the bundle, the tokens and `patterns/extension.css`, with the copy the extension ships.",
  keywords: "extension chrome browser popup toolbar field menu field icon inline autofill save update prompt note toast passkey sheet webauthn options pairing pair code bridge native messaging pm extension link token shadow frame websites logos paused",
  blocks: (ctx) => {
    const theme = ctx && ctx.theme ? { theme: ctx.theme } : undefined;
    const intro = readmeParas("browser-extension");
    return [
      { kind: "h", title: "Surfaces", lede: intro[0] || "", id: "surfaces" },
      { key: "surfaces", span: "full", node: <Surfaces /> },
      { kind: "h", title: "Rules", id: "rules" },
      ...ruleBlocks(readmeBullets("browser-extension"), { key: "ext-rules" }),
      ...(theme ? [] : [
        { kind: "h", title: "Light and dark", lede: "Every surface follows the system theme with the same tokens as the app.", id: "themes" },
        ...exampleBlocks("ExtTheme")
      ]),
      { kind: "h", title: "Toolbar popup", lede: "380 by 580, opened from the toolbar or with ⌥ ⇧ A. The root is `.px`: `px-head`, `px-tabs`, a scrolling `px-body`, then `px-bar` for actions and `px-foot` for the connection. Toasts rise in `toast-slot` above the foot.", id: "popup" },
      ...exampleBlocks("ExtPopup", theme),
      { kind: "h", title: "Field menu", lede: "An extension frame in a closed shadow root, 328px wide and as tall as its content up to 560px. It opens 6px under the focused field, or above it near the bottom of the window, when you focus a field or click the field icon. The root is `.im`.", id: "menu" },
      ...exampleBlocks("ExtMenu", theme),
      { kind: "h", title: "Prompts and sheets", lede: "Notes and toasts are 360px frames 12px from the top-right corner, a toast under any open note. Passkey sheets are 400px frames centered across the page over a scrim, 10% of the window height from the top. Every root sits inside `.pr`, with `pr-save`, `pr-update`, `pr-toast`, `pr-create` or `pr-get` naming the kind.", id: "prompts" },
      ...exampleBlocks("ExtPrompt", theme),
      { kind: "h", title: "Options page", lede: "A full tab from Extension settings in the popup. Seven sections, one column under 720px.", id: "options" },
      ...exampleBlocks("ExtOptions", theme),
      { kind: "h", title: "Keyboard", lede: "Chrome's commands, shown as they appear on a Mac. People can change them at `chrome://extensions/shortcuts`; Copy the one-time code for this page has no default key. Right-click any text field for the same fills.", id: "keyboard" },
      { key: "keys", span: "full", node: <Keys /> },
      { kind: "h", title: "In the desktop app", lede: "Pairing by code, the Browser extension settings page and the Website icons card. The app confirms every new browser before it can read anything.", id: "app" },
      ...exampleBlocks("ExtApp", theme),
      { kind: "h", title: "Using the pattern file", id: "using" },
      { key: "using", span: "full", node: <Using /> }
    ];
  }
};
