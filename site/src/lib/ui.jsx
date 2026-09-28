import { CodeBlock } from "./code.jsx";
import { Inline } from "./md.jsx";
import { useResolvedTheme } from "./state.js";

const A = window.APM;
const { useState, useContext, createContext } = React;

export const PrintCtx = createContext(false);
export const usePrint = () => useContext(PrintCtx);

const cx = (...a) => a.filter(Boolean).join(" ");

export function Row({ children, gap, align, wrap = true, style }) {
  return <div className="ds-row" style={{ gap, alignItems: align, flexWrap: wrap ? "wrap" : "nowrap", ...style }}>{children}</div>;
}

export function Stack({ children, gap, width, align, style }) {
  return <div className="ds-stack" style={{ gap, width, alignItems: align, ...style }}>{children}</div>;
}

export function Col({ children, gap, width, style }) {
  return <div className="ds-col" style={{ gap, width, ...style }}>{children}</div>;
}

export function Grid({ children, cols = 2, gap, min, style }) {
  const tpl = min ? "repeat(auto-fill,minmax(" + min + "px,1fr))" : "repeat(" + cols + ",minmax(0,1fr))";
  return <div className="ds-grid" style={{ gridTemplateColumns: tpl, gap, ...style }}>{children}</div>;
}

export function Label({ children }) {
  return <span className="ds-label">{children}</span>;
}

export function Spec({ title, caption, code, lang, children, theme, height, align = "center", justify = "center", pad, stage = "dots", flip = true, printCode = false, className }) {
  const print = usePrint();
  const resolved = useResolvedTheme();
  const [local, setLocal] = useState(null);
  const [open, setOpen] = useState(false);
  const forced = theme || local;
  const shown = forced || resolved;
  const other = shown === "dark" ? "light" : "dark";
  const showCode = code && (print ? printCode : open);
  return (
    <div className={cx("ds-spec", className)}>
      {(title || caption || !print) && (
        <div className="ds-spec-head">
          <div className="ds-spec-titles">
            {title && <span className="ds-spec-title">{title}</span>}
            {caption && <span className="ds-spec-cap"><Inline text={caption} /></span>}
          </div>
          {!print && (
            <div className="ds-spec-tools">
              {flip && !theme && <A.IconButton icon={other === "dark" ? "moon" : "sun"} label={"Preview in " + other} size="xs" onClick={() => setLocal(local ? null : other)} active={!!local} />}
              {code && <A.Button size="sm" variant="ghost" iconRight={open ? "chevron-up" : "chevron-down"} onClick={() => setOpen(!open)}>Code</A.Button>}
            </div>
          )}
        </div>
      )}
      <div className={cx("ds-stage", "is-" + stage)} data-theme={forced || undefined} style={{ minHeight: height, alignItems: align, justifyContent: justify, padding: pad }}>
        {children}
      </div>
      {showCode && <CodeBlock code={code} lang={lang} className="ds-spec-code" />}
    </div>
  );
}

export function PageHeader({ eyebrow, title, lede, children }) {
  return (
    <header className="ds-head">
      {eyebrow && <div className="ds-eyebrow">{eyebrow}</div>}
      <h1 className="ds-title">{title}</h1>
      {lede && <p className="ds-lede"><Inline text={lede} /></p>}
      {children}
    </header>
  );
}

export function SectionHead({ title, lede, id }) {
  return (
    <div className="ds-sh" id={id}>
      <h2 className="ds-h2">{title}</h2>
      {lede && <p className="ds-sh-lede"><Inline text={lede} /></p>}
    </div>
  );
}

function breakType(t) {
  const parts = t.split(/(\s\|\s)/);
  return parts.map((p, i) => (p === " | " ? <span key={i}> |<wbr /> </span> : p));
}

function Extends({ ext }) {
  const m = ext.match(/^Omit<(.+?),\s*((?:'[^']+'\s*\|?\s*)+)>$/);
  const base = m ? m[1] : ext;
  const except = m ? m[2].match(/'([^']+)'/g).map((x) => x.slice(1, -1)) : [];
  return (
    <div className="ds-props-ext">
      Also accepts every prop of <code>{base}</code>
      {except.length ? <> except {except.map((x, i) => <React.Fragment key={x}>{i ? ", " : ""}<code>{x}</code></React.Fragment>)}</> : null}.
    </div>
  );
}

export function PropsTable({ props, ext, defaults = {}, compact }) {
  if (!props || !props.length) return <p className="ds-p ds-muted">This component takes no props.</p>;
  return (
    <div className={cx("ds-props", compact && "is-compact")}>
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name}>
              <td className="ds-props-name"><code>{p.name}</code>{!p.optional && <span className="ds-req">required</span>}</td>
              <td className="ds-props-type"><code>{breakType(p.type)}</code></td>
              <td className="ds-props-def">{defaults[p.name] != null ? <code>{defaults[p.name]}</code> : <span className="ds-dash">none</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {ext && <Extends ext={ext} />}
    </div>
  );
}

export function DoDont({ items }) {
  if (!items) return null;
  return (
    <div className="ds-dd">
      <div className="ds-dd-col is-do">
        <div className="ds-dd-head"><span className="ds-dd-ic"><A.Icon name="check" size={13} strokeWidth={2.25} /></span>Do</div>
        <ul>{items.do.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ul>
      </div>
      <div className="ds-dd-col is-dont">
        <div className="ds-dd-head"><span className="ds-dd-ic"><A.Icon name="x" size={13} strokeWidth={2.25} /></span>Don't</div>
        <ul>{items.dont.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ul>
      </div>
    </div>
  );
}

export function Note({ icon = "info", children }) {
  return <div className="ds-note"><A.Icon name={icon} size={14} /><span>{children}</span></div>;
}

export function Card({ children, className, pad }) {
  return <div className={cx("ds-card", className)} style={{ padding: pad }}>{children}</div>;
}

export function Blocks({ blocks }) {
  const out = [];
  let halves = [];
  const flush = () => {
    if (!halves.length) return;
    out.push(<div key={"g" + out.length} className="ds-halves">{halves}</div>);
    halves = [];
  };
  blocks.forEach((b, i) => {
    if (b.kind === "h") { flush(); out.push(<SectionHead key={"h" + i} title={b.title} lede={b.lede} id={b.id} />); return; }
    if (b.web === false) return;
    const node = <div key={b.key || i} className="ds-block">{b.node}</div>;
    if (b.span === "half") { halves.push(node); return; }
    flush();
    out.push(node);
  });
  flush();
  return out;
}
