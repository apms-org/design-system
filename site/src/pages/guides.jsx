import meta from "ds:meta";
import { Inline, splitLead, Table } from "../lib/md.jsx";
import { valueOf, fmtRatio, contrast } from "../lib/color.js";
import { readme, readmeBullets, RuleList, ruleBlocks } from "./common.jsx";

const A = window.APM;

function Principle({ n, item, children }) {
  const { lead, rest } = splitLead(item);
  return (
    <div className="ds-pr">
      <div className="ds-pr-text">
        <span className="ds-pr-n">{String(n).padStart(2, "0")}</span>
        <h3 className="ds-pr-title">{lead}</h3>
        <p className="ds-pr-body"><Inline text={rest} /></p>
      </div>
      <div className="ds-pr-art">{children}</div>
    </div>
  );
}

const ART = [
  () => (
    <div className="ds-pr-card">
      <A.FieldGroup>
        <A.SecretField label="Password" icon="key" value="t7#Vq9!mZ2pL@x4R" secret>
          <A.StrengthMeter score={4} bits={118} />
        </A.SecretField>
      </A.FieldGroup>
    </div>
  ),
  () => (
    <div className="ds-pr-ink">
      <span style={{ color: "var(--text)" }}>GitHub</span>
      <span style={{ color: "var(--text-secondary)" }}>maya@example.com</span>
      <span style={{ color: "var(--text-tertiary)" }}>Edited 2m ago</span>
      <div className="ds-pr-inkrow"><A.Button variant="primary" size="sm" icon="plus">New</A.Button><A.Badge tone="success" icon="shield-check">2FA on</A.Badge></div>
    </div>
  ),
  () => (
    <div className="ds-pr-density">
      <div><span className="ds-pr-dim">28</span><A.NavItem icon="layers" label="All items" count={21} active /></div>
      <div><span className="ds-pr-dim">56</span><A.ItemRow title="GitHub" subtitle="maya@example.com" time="2m" /></div>
    </div>
  ),
  () => (
    <div className="ds-pr-machine">
      <A.Mark tile size={40} />
      <div className="mono-small">XChaCha20-Poly1305 · Argon2id · 256 MiB</div>
    </div>
  ),
  () => (
    <div className="ds-pr-answer">
      <A.Toast title="Copied password" description="Clears in 30s" />
    </div>
  )
];

export const principles = {
  id: "principles",
  group: "Guidelines",
  nav: "Principles",
  icon: "sparkles",
  title: "Principles",
  lede: meta.readme.intro.filter((b) => b.type === "p").map((b) => b.text).join(" "),
  keywords: "principles values ink density machinery",
  blocks: () => readmeBullets("principles").map((item, i) => ({
    key: "pr" + i,
    span: "full",
    node: <Principle n={i + 1} item={item}>{ART[i] ? ART[i]() : null}</Principle>
  }))
};

const COPY_PAIRS = [
  { good: "Unlock your vault", bad: "Unlock Your Vault", why: "Sentence case everywhere." },
  { good: "Copied password · Clears in 30s", bad: "Password copied to clipboard!", why: "Past tense, the result, the number. No exclamation marks." },
  { good: "Incorrect password. 4 attempts left before a 30 second wait.", bad: "Oops, something went wrong. Please try again.", why: "What happened, what to do, the number that matters." },
  { good: "No matches for \"stripe\". Search looks at names, usernames, types and tags.", bad: "We couldn't find anything.", why: "APM never says \"we\". Say what would be here." },
  { good: "21 items · 30s · 118 bits", bad: "twenty-one items · thirty seconds", why: "Digits, not words." }
];

function CopyPair({ p }) {
  return (
    <div className="ds-cp">
      <div className="ds-cp-good"><span className="ds-cp-ic is-do"><A.Icon name="check" size={12} strokeWidth={2.5} /></span><span>{p.good}</span></div>
      <div className="ds-cp-bad"><span className="ds-cp-ic is-dont"><A.Icon name="x" size={12} strokeWidth={2.5} /></span><span>{p.bad}</span></div>
      <div className="ds-cp-why">{p.why}</div>
    </div>
  );
}

function RealCopy() {
  const t = readme("voice-and-copy").blocks.find((b) => b.type === "table");
  if (!t) return null;
  return (
    <div className="ds-realcopy">
      {t.rows.map((r, i) => (
        <div key={i} className="ds-realcopy-row">
          <span className="ds-realcopy-where">{r[0]}</span>
          <span className="ds-realcopy-copy">{r[1]}</span>
        </div>
      ))}
    </div>
  );
}

export const voice = {
  id: "voice",
  group: "Guidelines",
  nav: "Voice and copy",
  icon: "pencil",
  title: "Voice and copy",
  lede: "APM speaks like a careful colleague: direct, exact, and calm. It addresses you, leads with the verb, and gives the number that matters.",
  keywords: "copy writing tone words sentence case errors",
  blocks: () => [
    { kind: "h", title: "Rules", id: "rules" },
    ...ruleBlocks(readmeBullets("voice-and-copy"), { key: "voice-rules" }),
    { kind: "h", title: "Write this, not that", id: "pairs" },
    { key: "pairs", span: "full", node: <div className="ds-cps">{COPY_PAIRS.map((p, i) => <CopyPair key={i} p={p} />)}</div> },
    { kind: "h", title: "Real copy from the product", id: "real" },
    { key: "real", span: "full", node: <RealCopy /> }
  ]
};

const A11Y_ICONS = ["mouse-pointer-click", "eye", "circle-help", "maximize-2"];
const FG = ["text", "text-secondary", "text-tertiary", "accent", "success", "warning", "danger"];
const BG = ["bg", "bg-subtle", "surface", "fill"];

function Matrix({ theme }) {
  return (
    <div className="ds-matrix" data-theme={theme}>
      <div className="ds-matrix-title"><A.Icon name={theme === "light" ? "sun" : "moon"} size={13} />{theme === "light" ? "Light" : "Dark"}</div>
      <table>
        <thead><tr><th />{BG.map((b) => <th key={b}>{b}</th>)}</tr></thead>
        <tbody>
          {FG.map((f) => (
            <tr key={f}>
              <th><span className="ds-matrix-dot" style={{ background: valueOf(f, theme) }} />{f}</th>
              {BG.map((b) => {
                const r = contrast(valueOf(f, theme), valueOf(b, theme));
                return <td key={b} style={{ background: valueOf(b, theme), color: valueOf(f, theme) }} className={r >= 4.5 ? "is-pass" : "is-fail"}>{fmtRatio(r)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function A11yCards() {
  return (
    <div className="ds-a11y">
      {readmeBullets("accessibility").map((it, i) => (
        <div key={i} className="ds-a11y-card">
          <span className="ds-itile"><A.Icon name={A11Y_ICONS[i] || "info"} size={16} /></span>
          <p><Inline text={it} /></p>
        </div>
      ))}
    </div>
  );
}

function FocusDemo() {
  return (
    <div className="ds-focus">
      <div className="ds-focus-item"><span className="ds-focus-ring"><A.Button>Export</A.Button></span><span className="ds-label">2px focus ring, 2px offset</span></div>
      <div className="ds-focus-item"><span className="ds-focus-field"><A.Input placeholder="Search 21 items" /></span><span className="ds-label">Accent border, 3px halo</span></div>
      <div className="ds-focus-item"><span className="ds-focus-target"><A.IconButton icon="copy" label="Copy password" variant="secondary" /></span><span className="ds-label">28px minimum target</span></div>
    </div>
  );
}

export const accessibility = {
  id: "accessibility",
  group: "Guidelines",
  nav: "Accessibility",
  icon: "eye",
  title: "Accessibility",
  lede: "A security tool has to work for everyone who holds a secret. Contrast, focus, labels and targets are checked in both themes.",
  keywords: "a11y contrast focus keyboard aria target wcag",
  blocks: () => [
    { key: "a11y", span: "full", node: <A11yCards /> },
    { kind: "h", title: "Focus and targets", id: "focus" },
    { key: "focus", span: "full", node: <FocusDemo /> },
    { kind: "h", title: "Contrast matrix", lede: "Every text color on every ground, computed from the tokens. Green cells hold 4.5:1.", id: "contrast" },
    { key: "m-light", span: "half", node: <Matrix theme="light" /> },
    { key: "m-dark", span: "half", node: <Matrix theme="dark" /> }
  ]
};
