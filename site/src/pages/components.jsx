import meta from "ds:meta";
import { Inline, slugOf } from "../lib/md.jsx";
import { href } from "../lib/state.js";
import { CodeBlock } from "../lib/code.jsx";
import { usePrint } from "../lib/ui.jsx";
import { examplesFor } from "../lib/examples.js";
import { readmeBullets, RuleList, exampleBlocks, notesFor, DoDont, PropsTable } from "./common.jsx";

const A = window.APM;

export const GROUPS = ["Actions", "Inputs", "Navigation", "Layout", "Vault", "Display", "Overlays", "Foundations", "Brand"];
const GROUP_ICONS = { Actions: "mouse-pointer-click", Inputs: "square-pen", Navigation: "panel-left", Layout: "list", Vault: "lock-keyhole", Display: "layout-grid", Overlays: "layers", Foundations: "palette", Brand: "award" };

export const grouped = GROUPS.map((g) => ({ group: g, items: meta.components.filter((c) => c.group === g) })).filter((g) => g.items.length);
export const ordered = grouped.flatMap((g) => g.items);

const THUMBS = { Dialog: "Dialog_Form", Menu: "Menu_PanelOnly", CommandMenu: "CommandMenu_Inline", Toast: "Toast_Tones", Tooltip: "Tooltip_Anatomy", SecretField: "SecretField_Login", ItemRow: "ItemRow_List" };

function Thumb({ name }) {
  const list = examplesFor(name);
  const ex = list.find((x) => x.id === THUMBS[name]) || list[0];
  if (!ex) return null;
  return (
    <div className="ds-thumb" ref={(el) => { if (el) el.setAttribute("inert", ""); }} aria-hidden="true">
      <div className="ds-thumb-in"><ex.Comp /></div>
    </div>
  );
}

function ComponentCard({ c }) {
  return (
    <a className="ds-ccard" href={href("components/" + slugOf(c.name))}>
      <Thumb name={c.name} />
      <div className="ds-ccard-text">
        <span className="ds-ccard-name">{c.name}</span>
        <span className="ds-ccard-sum">{c.summary}</span>
      </div>
    </a>
  );
}

function IndexGrid({ group }) {
  const print = usePrint();
  const g = grouped.find((x) => x.group === group);
  if (print) {
    return (
      <div className="ds-clist">
        {g.items.map((c) => (
          <div key={c.name} className="ds-clist-row">
            <span className="ds-clist-name">{c.name}</span>
            <span className="ds-clist-sum">{c.summary}</span>
          </div>
        ))}
      </div>
    );
  }
  return <div className="ds-cgrid">{g.items.map((c) => <ComponentCard key={c.name} c={c} />)}</div>;
}

export const componentsIndex = {
  id: "components",
  group: "Components",
  nav: "All components",
  icon: "layout-grid",
  title: "Components",
  lede: meta.components.length + " React components in one bundle, `window.APM`. Every specimen on these pages is the real component, not a picture of it.",
  keywords: "components library react bundle",
  blocks: () => [
    { kind: "h", title: "How to compose", id: "compose" },
    { key: "comp-rules", span: "full", node: <RuleList items={readmeBullets("components")} /> },
    ...grouped.flatMap((g) => [
      { kind: "h", title: g.group, id: "g-" + g.group.toLowerCase() },
      { key: "grid-" + g.group, span: "full", node: <IndexGrid group={g.group} /> }
    ])
  ]
};

function Usage({ c }) {
  const print = usePrint();
  const code = "const { " + c.name + " } = window.APM;";
  return (
    <div className="ds-usage">
      <CodeBlock code={code} className="ds-usage-code" copyLabel="Copied import" />
      <div className="ds-usage-meta">
        <A.Badge icon={GROUP_ICONS[c.group]}>{c.group}</A.Badge>
        <A.Badge outline>{c.props.length} props</A.Badge>
        <span className="ds-usage-src">components/{c.name}/README.md</span>
      </div>
    </div>
  );
}

function Guidelines({ c }) {
  return <RuleList items={c.bullets} numbered={false} />;
}

function PrevNext({ c }) {
  const i = ordered.findIndex((x) => x.name === c.name);
  const prev = ordered[i - 1];
  const next = ordered[i + 1];
  return (
    <div className="ds-pn">
      {prev ? <a className="ds-pn-link" href={href("components/" + slugOf(prev.name))}><span className="ds-pn-dir"><A.Icon name="arrow-left" size={14} />Previous</span><span className="ds-pn-name">{prev.name}</span></a> : <span />}
      {next ? <a className="ds-pn-link is-next" href={href("components/" + slugOf(next.name))}><span className="ds-pn-dir">Next<A.Icon name="arrow-right" size={14} /></span><span className="ds-pn-name">{next.name}</span></a> : <span />}
    </div>
  );
}

export function componentPage(c) {
  return {
    id: "components/" + slugOf(c.name),
    group: "Components",
    subgroup: c.group,
    nav: c.name,
    title: c.name,
    eyebrow: "Components · " + c.group,
    lede: c.summary,
    component: c,
    keywords: c.group + " " + c.bullets.join(" ").slice(0, 200),
    blocks: (ctx) => {
      const notes = notesFor(c.name);
      const out = [
        { key: "usage", span: "full", node: <Usage c={c} /> },
        { kind: "h", title: "Examples", id: "examples" },
        ...exampleBlocks(c.name, { printCode: false })
      ];
      if (c.bullets.length) out.push({ kind: "h", title: "Guidelines", id: "guidelines" }, { key: "guide", span: "full", node: <Guidelines c={c} /> });
      if (notes) out.push({ key: "dd", span: "full", node: <DoDont items={notes} /> });
      out.push({ kind: "h", title: "Props", id: "props" }, { key: "props", span: "full", node: <PropsTable props={c.props} ext={c.extends} defaults={c.defaults} /> });
      out.push({ key: "pn", span: "full", print: false, node: <PrevNext c={c} /> });
      return out;
    }
  };
}

export const componentPages = ordered.map(componentPage);
