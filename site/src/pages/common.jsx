import meta from "ds:meta";
import { Inline, splitLead } from "../lib/md.jsx";
import { Spec, DoDont, PropsTable } from "../lib/ui.jsx";
import { examplesFor, NOTES } from "../lib/examples.js";

const A = window.APM;

export function readme(id) {
  return meta.readme.sections.find((s) => s.id === id) || { title: id, blocks: [] };
}

export function readmeBullets(id) {
  return readme(id).blocks.filter((b) => b.type === "ul").flatMap((b) => b.items);
}

export function readmeParas(id) {
  return readme(id).blocks.filter((b) => b.type === "p").map((b) => b.text);
}

export function RuleList({ items, start = 0, numbered = true }) {
  return (
    <ol className={"ds-rules" + (numbered ? "" : " is-plain")}>
      {items.map((it, i) => {
        const { lead, rest } = splitLead(it);
        return (
          <li key={i}>
            {numbered && <span className="ds-rules-n">{String(start + i + 1).padStart(2, "0")}</span>}
            <div className="ds-rules-t">
              {lead && <div className="ds-rules-lead">{lead}</div>}
              <div className="ds-rules-body"><Inline text={rest} /></div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ruleBlocks(items, opts = {}) {
  const size = opts.chunk || 4;
  const out = [{ key: (opts.key || "rules") + "-all", span: "full", print: false, node: <RuleList items={items} numbered={opts.numbered !== false} /> }];
  for (let i = 0; i < items.length; i += size) {
    const slice = items.slice(i, i + size);
    out.push({ key: (opts.key || "rules") + i, span: "full", web: false, node: <RuleList items={slice} start={i} numbered={opts.numbered !== false} /> });
  }
  return out;
}

export function specBlock(ex, extra = {}) {
  const s = ex.spec;
  return {
    key: ex.id,
    span: s.span || "full",
    web: s.web,
    print: s.print,
    node: (
      <Spec title={ex.title} caption={s.caption} code={ex.code} height={s.height} align={s.align} justify={s.justify} pad={s.pad} stage={s.stage} theme={extra.theme || s.theme} printCode={extra.printCode} className={s.overflow ? "is-overflow" : ""}>
        <ex.Comp />
      </Spec>
    )
  };
}

export function exampleBlocks(prefix, extra) {
  return examplesFor(prefix).map((ex) => specBlock(ex, extra));
}

export function notesFor(name) {
  return NOTES[name];
}

export function Stat({ value, label }) {
  return (
    <div className="ds-stat">
      <div className="ds-stat-v">{value}</div>
      <div className="ds-stat-l">{label}</div>
    </div>
  );
}

export function IconTile({ icon, tone }) {
  return <span className={"ds-itile" + (tone ? " is-" + tone : "")}><A.Icon name={icon} size={16} /></span>;
}

export { DoDont, PropsTable };
