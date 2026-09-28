import meta from "ds:meta";
import { copy, href } from "./state.js";

const colorNames = new Set(meta.tokens.color.tokens.map((t) => t.name));
const tokenNames = new Set([
  ...meta.tokens.spacing.tokens.map((t) => t.name),
  ...meta.tokens.radius.tokens.map((t) => t.name),
  ...meta.tokens.shadow.tokens.map((t) => t.name),
  ...meta.tokens.size.tokens.map((t) => t.name),
  ...Object.keys(meta.motion),
  "font-sans", "font-mono"
]);
const componentNames = new Set(meta.components.map((c) => c.name));
const typeNames = new Set(meta.tokens.type.groups.flatMap((g) => g.styles.map((s) => s.name)));

export function slugOf(name) {
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function TokenRef({ name, children }) {
  const n = name.replace(/^--/, "");
  const isColor = colorNames.has(n);
  return (
    <button type="button" className={"ds-tref" + (isColor ? " is-color" : "")} title={"Copy var(--" + n + ")"} onClick={() => copy("var(--" + n + ")", "Copied token", "var(--" + n + ")")}>
      {isColor && <span className="ds-tref-dot" style={{ background: "var(--" + n + ")" }} />}
      {children || n}
    </button>
  );
}

function CodeBit({ text }) {
  const bare = text.replace(/^--/, "");
  if (colorNames.has(bare) || tokenNames.has(bare)) return <TokenRef name={bare}>{text}</TokenRef>;
  if (componentNames.has(text)) return <a className="ds-cref" href={href("components/" + slugOf(text))}>{text}</a>;
  if (typeNames.has(text)) return <a className="ds-cref is-type" href={href("typography")}>{text}</a>;
  return <code className="ds-ic">{text}</code>;
}

export function Inline({ text }) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) parts.push(<strong key={i++}><Inline text={t.slice(2, -2)} /></strong>);
    else parts.push(<CodeBit key={i++} text={t.slice(1, -1)} />);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function splitLead(item) {
  const m = item.match(/^\*\*([^*]+)\*\*\s*(.*)$/);
  return m ? { lead: m[1], rest: m[2] } : { lead: null, rest: item };
}

export function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.type === "h") return <h3 key={i} className="ds-h3"><Inline text={b.text} /></h3>;
    if (b.type === "p") return <p key={i} className="ds-p"><Inline text={b.text} /></p>;
    if (b.type === "ul") return <ul key={i} className="ds-ul">{b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ul>;
    if (b.type === "table") return <Table key={i} head={b.head} rows={b.rows} />;
    return null;
  });
}

export function Table({ head, rows, mono }) {
  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={mono && mono.includes(j) ? "is-mono" : ""}><Inline text={c} /></td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
