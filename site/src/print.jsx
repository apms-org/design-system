import meta from "ds:meta";
import { PRINT_ORDER } from "./pages/index.js";
import { PrintCtx, SectionHead } from "./lib/ui.jsx";
import { Inline } from "./lib/md.jsx";
import { CoverArt } from "./pages/overview.jsx";
import { GROUPS } from "./pages/components.jsx";

const A = window.APM;
const { useState, useEffect, useLayoutEffect, useRef, useMemo } = React;

const GAP = 24;
const HEAD_GAP = 14;
const SCALE = 0.86;
const BODY_W = 1152;
const FULL_W = Math.floor(BODY_W / SCALE);
const HALF_W = Math.floor((FULL_W - 32) / 2);

function sectionsOf() {
  let n = 0;
  return PRINT_ORDER.map((e, i) => {
    const p = e.page;
    const blocks = p.blocks({ print: true, theme: e.theme }).filter((b) => b.print !== false);
    if (!e.sub) n++;
    return {
      key: (e.id || p.id) + "~" + i,
      num: e.sub ? null : n,
      toc: e.toc,
      sub: !!e.sub,
      group: e.group,
      theme: e.theme,
      title: e.title || p.title,
      eyebrow: e.eyebrow || p.eyebrow || p.group,
      lede: e.lede || p.lede,
      hideHeader: !!p.hideHeader,
      blocks
    };
  });
}

function Opener({ s }) {
  return (
    <div className="pp-open">
      <div className="pp-open-eyebrow">{s.num ? <span className="pp-open-num">{String(s.num).padStart(2, "0")}</span> : null}{s.eyebrow}</div>
      <h1 className="pp-open-title">{s.title}</h1>
      {s.lede && <p className="pp-open-lede"><Inline text={s.lede} /></p>}
    </div>
  );
}

function blockContent(s, k) {
  if (k === "head") return <Opener s={s} />;
  const b = s.blocks[k];
  if (b.kind === "h") return <SectionHead title={b.title} lede={b.lede} />;
  return b.node;
}

function rowsOf(s, heights) {
  const H = (k) => heights[s.key + ":" + k] || 0;
  const rows = [];
  if (!s.hideHeader) rows.push({ items: ["head"], h: H("head"), keep: true, head: true });
  let pend = null;
  const flush = () => { if (pend) { rows.push(pend); pend = null; } };
  s.blocks.forEach((b, i) => {
    if (b.kind === "h") { flush(); rows.push({ items: [i], h: H(i), keep: true }); return; }
    if (b.span === "half") {
      if (pend) { pend.items.push(i); pend.h = Math.max(pend.h, H(i)); flush(); }
      else pend = { items: [i], h: H(i), half: true };
      return;
    }
    flush();
    rows.push({ items: [i], h: H(i) });
  });
  flush();
  return rows;
}

function paginate(sections, heights, bodyH) {
  const pages = [];
  for (const s of sections) {
    const rows = rowsOf(s, heights);
    let page = { s, rows: [], used: 0 };
    pages.push(page);
    rows.forEach((row, r) => {
      const prev = page.rows[page.rows.length - 1];
      let gap = prev ? (prev.keep && !prev.head ? HEAD_GAP : GAP + (row.keep && !row.head ? 12 : 0)) : 0;
      let need = gap + row.h;
      const next = rows[r + 1];
      if (row.keep && next) need += HEAD_GAP + (page.used + gap + row.h + HEAD_GAP + next.h <= bodyH ? next.h : next.h * 0.8);
      else if (!row.keep && page.rows.length && page.used + need > bodyH && page.used + gap + row.h * 0.9 <= bodyH) need = gap + row.h * 0.9;
      if (page.rows.length && page.used + need > bodyH && !(prev && prev.keep)) {
        page = { s, rows: [], used: 0 };
        pages.push(page);
        gap = 0;
      }
      const room = bodyH - page.used - gap;
      const placed = { ...row, gap, scale: row.h > room ? Math.max(0.3, room / row.h) : 1 };
      page.rows.push(placed);
      page.used += gap + row.h * placed.scale;
    });
  }
  return pages;
}

function Frame({ children, theme, section, num, cls }) {
  return (
    <div className={"pp-page" + (cls ? " " + cls : "")} data-theme={theme || undefined}>
      <div className="pp-top">
        <span className="pp-top-brand"><A.Mark size={14} />APM Design System</span>
        <span>{section}</span>
      </div>
      <div className="pp-body"><div className="pp-scale" style={{ width: FULL_W, zoom: SCALE }}>{children}</div></div>
      <div className="pp-foot">
        <span>v{meta.version} · {meta.built}</span>
        <span className="pp-num">{num}</span>
      </div>
    </div>
  );
}

function Cover() {
  return (
    <div className="pp-page pp-cover" data-theme="dark">
      <div className="pp-cover-top"><A.Mark tile size={48} /><span className="pp-cover-word">APM</span></div>
      <CoverArt className="pp-cover-art" />
      <div className="pp-cover-text">
        <div className="pp-cover-eyebrow">Design System · v{meta.version}</div>
        <h1 className="pp-cover-title">Precision,<br />held calmly.</h1>
        <p className="pp-cover-lede">Tokens, components, guidelines and patterns for APM, the local, zero-knowledge password manager. Every specimen in this document is the real component, rendered from the same bundle the app ships.</p>
      </div>
      <div className="pp-cover-foot">
        <span>{meta.components.length} components · {meta.tokens.color.tokens.length} color tokens · {meta.icons.length} icons · light and dark</span>
        <span className="mono-small">{meta.built}</span>
      </div>
    </div>
  );
}

function Toc({ entries, num }) {
  const main = entries.filter((e) => !e.sub);
  const subs = entries.filter((e) => e.sub);
  const byGroup = GROUPS.map((g) => ({ g, items: subs.filter((e) => e.group === g) })).filter((x) => x.items.length);
  const half = Math.ceil(byGroup.length / 2);
  const colA = [];
  const colB = [];
  let count = 0;
  const total = byGroup.reduce((a, x) => a + x.items.length + 1, 0);
  byGroup.forEach((x) => { (count < total / 2 ? colA : colB).push(x); count += x.items.length + 1; });
  const Group = ({ x }) => (
    <div className="pp-toc-group">
      <div className="pp-toc-glabel">{x.g}</div>
      {x.items.map((e) => <div key={e.key} className="pp-toc-sub"><span>{e.toc}</span><i /><b>{e.page}</b></div>)}
    </div>
  );
  return (
    <Frame section="Contents" num={num}>
      <div className="pp-toc">
        <div className="pp-toc-main">
          <h1 className="pp-toc-title">Contents</h1>
          {main.map((e) => (
            <div key={e.key} className="pp-toc-row">
              <span className="pp-toc-n">{String(e.num).padStart(2, "0")}</span>
              <span className="pp-toc-name">{e.toc}</span>
              <i />
              <b>{e.page}</b>
            </div>
          ))}
        </div>
        <div className="pp-toc-comps">
          <div className="pp-toc-ctitle">Components</div>
          <div className="pp-toc-cols">
            <div>{colA.map((x) => <Group key={x.g} x={x} />)}</div>
            <div>{colB.map((x) => <Group key={x.g} x={x} />)}</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Measure({ sections, onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    let alive = true;
    const run = async () => {
      try { await document.fonts.ready; } catch (e) {}
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise((r) => setTimeout(r, 200));
      if (!alive || !ref.current) return;
      const heights = {};
      ref.current.querySelectorAll("[data-mk]").forEach((el) => { heights[el.getAttribute("data-mk")] = Math.ceil(el.getBoundingClientRect().height); });
      const probe = ref.current.querySelector(".pp-probe .pp-body");
      onDone(heights, Math.floor((probe ? probe.clientHeight : 660) / SCALE));
    };
    run();
    return () => { alive = false; };
  }, []);
  return (
    <div className="pp-measure" ref={ref} aria-hidden="true">
      <Frame cls="pp-probe" section="" num="" />
      {sections.map((s) => (
        <div key={s.key} className="pp-msec" data-theme={s.theme || undefined} style={{ width: FULL_W }}>
          {!s.hideHeader && <div className="pp-mblock" style={{ width: FULL_W }} data-mk={s.key + ":head"}><Opener s={s} /></div>}
          {s.blocks.map((b, i) => (
            <div key={i} className="pp-mblock" style={{ width: b.span === "half" && b.kind !== "h" ? HALF_W : FULL_W }} data-mk={s.key + ":" + i}>{blockContent(s, i)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Pages({ pages, entries }) {
  useEffect(() => {
    let alive = true;
    (async () => {
      try { await document.fonts.ready; } catch (e) {}
      await new Promise((r) => setTimeout(r, 1200));
      if (!alive) return;
      const over = [];
      const bodies = [...document.querySelectorAll(".pp-page:not(.pp-probe) .pp-body")];
      bodies.forEach((b, i) => { const inner = b.firstElementChild; const h = inner ? inner.getBoundingClientRect().height : 0; const room = b.getBoundingClientRect().height; if (h > room + 2) over.push(i + 2 + ":" + Math.round(h - room)); });
      window.__DS_PLAN = pages.map((p, i) => {
        const body = bodies[i + 1];
        const rows = body ? [...body.querySelectorAll(":scope > .pp-scale > .pp-row")] : [];
        return { page: i + 3, s: p.s.toc, used: Math.round(p.used), rows: p.rows.map((r, j) => [r.items.join("+"), r.h, r.gap, rows[j] ? Math.round(rows[j].getBoundingClientRect().height) : null]) };
      });
      window.__DS_PRINT_OVERFLOW = over;
      window.__DS_PRINT_READY = true;
    })();
    return () => { alive = false; };
  }, []);
  return (
    <>
      <Cover />
      <Toc entries={entries} num={2} />
      {pages.map((p, i) => (
        <Frame key={i} theme={p.s.theme} section={p.s.sub ? "Components · " + p.s.toc : p.s.toc} num={i + 3}>
          {p.rows.map((row, r) => (
            <div key={r} className={"pp-row" + (row.half ? " is-half" : "")} style={{ marginTop: row.gap }}>
              {row.items.map((k) => (
                <div key={k} className={"pp-item" + (row.half ? " is-half" : "")}>
                  {row.scale < 1 ? (
                    <div className="pp-scaled" style={{ width: (row.half ? HALF_W : FULL_W) / row.scale, zoom: row.scale }}>{blockContent(p.s, k)}</div>
                  ) : blockContent(p.s, k)}
                </div>
              ))}
            </div>
          ))}
        </Frame>
      ))}
    </>
  );
}

export function PrintApp() {
  const sections = useMemo(sectionsOf, []);
  const [plan, setPlan] = useState(null);
  const done = (heights, bodyH) => {
    const pages = paginate(sections, heights, bodyH - 8);
    const first = {};
    pages.forEach((p, i) => { if (!(p.s.key in first)) first[p.s.key] = i + 3; });
    const entries = sections.map((s) => ({ key: s.key, toc: s.toc, num: s.num, sub: s.sub, group: s.group, page: first[s.key] }));
    setPlan({ pages, entries });
  };
  return (
    <PrintCtx.Provider value={true}>
      {plan ? <Pages pages={plan.pages} entries={plan.entries} /> : <Measure sections={sections} onDone={done} />}
    </PrintCtx.Provider>
  );
}
