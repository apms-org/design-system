import { copy } from "./state.js";

const A = window.APM;
const { useState } = React;

const JSX_RE = /("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?)([A-Za-z][\w.]*)|(\/?>)|\b(const|let|var|return|function|true|false|null|undefined|new|if|else|export|import|from|default)\b|([A-Za-z_$][\w$-]*)(?==)|\b(\d+(?:\.\d+)?)\b|([{}()[\]])/g;
const CSS_RE = /(--[\w.\\-]+)|("(?:[^"\\\n]|\\.)*")|(#[0-9a-fA-F]{3,8})\b|\b(\d+(?:\.\d+)?(?:px|ms|em|%)?)|([a-z-]+)(?=\s*:)|([{}();])/g;
const SH_RE = /^(\$|>)(?= )|("(?:[^"\\\n]|\\.)*")|(--?[\w-]+)|\b(npm|node|pm|cd|open|git)\b/gm;

function tokenize(code, lang) {
  const out = [];
  let last = 0;
  const re = lang === "css" ? CSS_RE : lang === "sh" ? SH_RE : JSX_RE;
  re.lastIndex = 0;
  let m;
  const push = (text, cls) => { if (text) out.push(cls ? [text, cls] : [text]); };
  while ((m = re.exec(code))) {
    if (m.index > last) push(code.slice(last, m.index));
    if (lang === "css") {
      if (m[1]) push(m[1], "var");
      else if (m[2]) push(m[2], "str");
      else if (m[3]) push(m[3], "num");
      else if (m[4]) push(m[4], "num");
      else if (m[5]) push(m[5], "attr");
      else push(m[6], "punct");
    } else if (lang === "sh") {
      if (m[1]) push(m[1], "prompt");
      else if (m[2]) push(m[2], "str");
      else if (m[3]) push(m[3], "attr");
      else push(m[4], "kw");
    } else {
      if (m[1]) push(m[1], "str");
      else if (m[2]) { push(m[2], "punct"); push(m[3], /^[A-Z]/.test(m[3]) ? "comp" : "tag"); }
      else if (m[4]) push(m[4], "punct");
      else if (m[5]) push(m[5], "kw");
      else if (m[6]) push(m[6], "attr");
      else if (m[7]) push(m[7], "num");
      else push(m[8], "punct");
    }
    last = re.lastIndex;
  }
  if (last < code.length) push(code.slice(last));
  return out;
}

export function Highlight({ code, lang = "jsx" }) {
  return tokenize(code, lang).map((t, i) => (t[1] ? <span key={i} className={"ds-tk-" + t[1]}>{t[0]}</span> : t[0]));
}

export function CodeBlock({ code, lang = "jsx", title, copyLabel = "Copied snippet", className, wrap }) {
  const [done, setDone] = useState(false);
  const onCopy = () => { copy(code, copyLabel, null); setDone(true); setTimeout(() => setDone(false), 1400); };
  return (
    <div className={"ds-code" + (className ? " " + className : "") + (wrap ? " is-wrap" : "")}>
      {title && <div className="ds-code-head"><span>{title}</span></div>}
      <pre><code><Highlight code={code} lang={lang} /></code></pre>
      <A.IconButton className="ds-code-copy" icon={done ? "check" : "copy"} tone={done ? "success" : undefined} label="Copy code" size="xs" onClick={onCopy} />
    </div>
  );
}
