import meta from "ds:meta";
import { TokenRef } from "../lib/md.jsx";
import { Spec, Row, Grid } from "../lib/ui.jsx";
import { copy } from "../lib/state.js";
import { COLOR_GROUPS, valueOf, ratioFor, fmtRatio, tokenOf, isHex } from "../lib/color.js";
import { readme, readmeBullets, readmeParas, ruleBlocks } from "./common.jsx";

const A = window.APM;
const { useState } = React;
const T = meta.tokens;

function Swatch({ name, theme }) {
  const v = valueOf(name, theme);
  const r = ratioFor(name, theme);
  const raw = tokenOf(name).value[theme];
  return (
    <div className="ds-sw-cell" data-theme={theme}>
      <button type="button" className="ds-sw" style={{ background: v }} title={"Copy " + v} onClick={() => copy(v, "Copied " + theme + " value", name + " " + v)}>
        {name.startsWith("on-") || name === "mark-ink" ? <span className="ds-sw-aa" style={{ color: v, background: valueOf(name === "mark-ink" ? "mark-tile" : name.replace("on-", ""), theme) }}>Aa</span> : null}
      </button>
      <div className="ds-sw-meta">
        <span className="ds-sw-hex">{typeof raw === "string" && raw.startsWith("{") ? "= " + raw.slice(1, -1) : isHex(v) ? v : v.replace(/\s+/g, "")}</span>
        {r ? (
          <span className="ds-sw-ratio" title={r.label}>
            <span className="ds-sw-num">{fmtRatio(r.ratio)}</span>
            <A.Badge size="sm" tone={r.grade.tone === "neutral" ? undefined : r.grade.tone}>{r.grade.text}</A.Badge>
          </span>
        ) : <span className="ds-sw-ratio ds-muted">No contrast pair</span>}
        {r && <span className="ds-sw-pair">{r.label}</span>}
      </div>
    </div>
  );
}

function ColorGroup({ group }) {
  return (
    <div className="ds-cg">
      <div className="ds-cg-head">
        <span />
        <span className="ds-cg-theme" data-theme="light"><A.Icon name="sun" size={13} />Light</span>
        <span className="ds-cg-theme" data-theme="dark"><A.Icon name="moon" size={13} />Dark</span>
      </div>
      {group.names.map((n) => (
        <div className="ds-cg-row" key={n}>
          <div className="ds-cg-name">
            <TokenRef name={n}>{"--" + n}</TokenRef>
            <p className="ds-cg-use">{tokenOf(n).usage}</p>
          </div>
          <Swatch name={n} theme="light" />
          <Swatch name={n} theme="dark" />
        </div>
      ))}
    </div>
  );
}

function Colorized({ value }) {
  return (
    <span className="ds-colorized">
      {[...value].map((c, i) => <span key={i} className={/[0-9]/.test(c) ? "is-digit" : /[A-Za-z]/.test(c) ? "" : "is-sym"}>{c}</span>)}
    </span>
  );
}

function RevealDemo() {
  return (
    <div className="ds-reveal">
      {["light", "dark"].map((th) => (
        <div key={th} className="ds-reveal-pane" data-theme={th}>
          <Colorized value="0lO1Il|8B$qW3e#7" />
          <div className="ds-reveal-key">
            <span><i style={{ background: "var(--text)" }} />Letters in text</span>
            <span><i style={{ background: "var(--accent)" }} />Digits in accent</span>
            <span><i style={{ background: "var(--warning)" }} />Symbols in warning</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export const color = {
  id: "color",
  group: "Foundations",
  nav: "Color",
  icon: "palette",
  title: "Color",
  lede: T.color.note + " Every value below is read from `tokens.json` at build time; contrast is computed, not typed.",
  keywords: "palette swatch hex contrast token light dark",
  blocks: () => [
    { kind: "h", title: "Rules", id: "rules" },
    ...ruleBlocks(readmeBullets("color"), { key: "color-rules" }),
    ...COLOR_GROUPS.flatMap((g) => [
      { kind: "h", title: g.title, lede: g.lede, id: g.id },
      { key: "cg-" + g.id, span: "full", node: <ColorGroup group={g} /> }
    ]),
    { kind: "h", title: "Revealed passwords", lede: "Letters, digits and symbols take different colors so `0` and `O`, `l` and `1` read at a glance.", id: "reveal" },
    { key: "reveal", span: "full", node: <RevealDemo /> }
  ]
};

function TypeRow({ s, family }) {
  const meta2 = s.fontSize + " / " + s.lineHeight + " · " + s.fontWeight + (s.letterSpacing && s.letterSpacing !== "0" ? " · " + s.letterSpacing : "");
  return (
    <div className="ds-type-row">
      <div className="ds-type-meta">
        <button type="button" className="ds-tref" onClick={() => copy(s.name, "Copied class", "." + s.name)}>.{s.name}</button>
        <span className="ds-type-spec">{meta2}</span>
        <span className="ds-type-use">{s.usage}</span>
      </div>
      <div className={"ds-type-sample " + s.name}>{s.sample}</div>
    </div>
  );
}

function FontCard({ family, name, sample, glyphs, varName }) {
  return (
    <div className="ds-font">
      <div className="ds-font-aa" style={{ fontFamily: "var(--" + varName + ")" }}>{sample}</div>
      <div className="ds-font-meta">
        <div className="ds-font-name">{name}</div>
        <TokenRef name={varName}>{"--" + varName}</TokenRef>
      </div>
      <div className="ds-font-glyphs" style={{ fontFamily: "var(--" + varName + ")" }}>{glyphs}</div>
      <div className="ds-font-file">{family.file} · variable, weights {String(family.weight).replace(" ", " to ")}</div>
    </div>
  );
}

export const typography = {
  id: "typography",
  group: "Foundations",
  nav: "Typography",
  icon: "file-text",
  title: "Typography",
  lede: "Geist for everything you read, Geist Mono for anything you compare character by character. Thirteen classes, defined once in `tokens.css`.",
  keywords: "font type geist mono display title body caption overline code",
  blocks: () => [
    { kind: "h", title: "Rules", id: "rules" },
    ...ruleBlocks(readmeBullets("typography"), { key: "type-rules" }),
    { kind: "h", title: "Families", id: "families" },
    { key: "fam-sans", span: "half", node: <FontCard family={T.type.fonts[0]} name="Geist" varName="font-sans" sample="Aa" glyphs={"ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789 ?!&@#%"} /> },
    { key: "fam-mono", span: "half", node: <FontCard family={T.type.fonts[1]} name="Geist Mono" varName="font-mono" sample="0O" glyphs={"0O 1lI 5S 8B rn m\nXChaCha20-Poly1305\nSHA256:q3Xk9rT2 481 062"} /> },
    ...T.type.groups.map((g) => ({ kind: "group", g })).flatMap(({ g }) => [
      { kind: "h", title: g.name, id: "type-" + g.name.toLowerCase() },
      { key: "tg-" + g.name, span: "full", node: <div className="ds-type">{g.styles.map((s) => <TypeRow key={s.name} s={s} family={g.family} />)}</div> }
    ]),
    { kind: "h", title: "Numbers", lede: "`tabular-nums` wherever digits line up. One-time codes split 3 and 3.", id: "numbers" },
    { key: "nums", span: "full", node: (
      <div className="ds-nums">
        <div><span className="ds-label">Counts</span><div className="ds-nums-col">{["21", "4", "118", "1,204"].map((n) => <span key={n}>{n}</span>)}</div></div>
        <div><span className="ds-label">Timers</span><div className="ds-nums-col">{["30s", "07s", "15:00", "2m"].map((n) => <span key={n}>{n}</span>)}</div></div>
        <div><span className="ds-label">One-time code</span><div className="code">481<span style={{ display: "inline-block", width: "0.4em" }} />062</div></div>
      </div>
    ) }
  ]
};

function SpaceScale() {
  return (
    <div className="ds-scale">
      {T.spacing.tokens.map((t) => (
        <div key={t.name} className="ds-scale-row">
          <TokenRef name={t.name}>{"--" + t.name}</TokenRef>
          <span className="ds-scale-v">{t.value}</span>
          <span className="ds-scale-bar"><i style={{ width: t.value }} /></span>
          <span className="ds-scale-use">{t.usage}</span>
        </div>
      ))}
    </div>
  );
}

function Window() {
  return (
    <div className="ds-win">
      <div className="ds-win-side">
        <div className="ds-win-tb"><span className="ds-win-lights"><i /><i /><i /></span></div>
        <div className="ds-win-lbl"><b>sidebar</b>248px · bg-subtle</div>
        <div className="ds-win-rows">{[0, 1, 2, 3, 4].map((i) => <i key={i} className={i === 0 ? "is-on" : ""} />)}</div>
      </div>
      <div className="ds-win-list">
        <div className="ds-win-tb" />
        <div className="ds-win-lbl"><b>list-pane</b>340px · bg</div>
        <div className="ds-win-items">{[0, 1, 2, 3].map((i) => <i key={i} className={i === 0 ? "is-on" : ""}><em /><span /></i>)}</div>
      </div>
      <div className="ds-win-detail">
        <div className="ds-win-tb"><span className="ds-win-dim">titlebar 48px</span></div>
        <div className="ds-win-lbl"><b>detail</b>fluid · bg · caps at 720px · space-12 sides</div>
        <div className="ds-win-fields">{[0, 1, 2].map((i) => <i key={i} />)}</div>
      </div>
    </div>
  );
}

function Sizes() {
  const ctl = T.size.tokens.filter((t) => /^(control|titlebar|row)/.test(t.name));
  const icons = T.size.tokens.filter((t) => t.name.startsWith("icon"));
  return (
    <div className="ds-sizes">
      <div className="ds-sizes-bars">
        {ctl.map((t) => (
          <div key={t.name} className="ds-size">
            <span className="ds-size-box" style={{ height: t.value }}><span>{t.value}</span></span>
            <TokenRef name={t.name} />
            <span className="ds-size-use">{t.usage}</span>
          </div>
        ))}
      </div>
      <div className="ds-sizes-icons">
        {icons.map((t) => (
          <div key={t.name} className="ds-size-ic">
            <span className="ds-size-icbox"><A.Icon name="shield-check" size={parseInt(t.value, 10)} /></span>
            <TokenRef name={t.name} />
            <span className="ds-scale-v">{t.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const layout = {
  id: "layout",
  group: "Foundations",
  nav: "Layout and spacing",
  icon: "layout-grid",
  title: "Layout and spacing",
  lede: T.spacing.note,
  keywords: "grid spacing space size pane sidebar list control row",
  blocks: () => [
    { kind: "h", title: "Rules", id: "rules" },
    ...ruleBlocks(readmeBullets("layout-and-spacing"), { key: "layout-rules" }),
    { kind: "h", title: "The window", lede: "Three panes. Each pane's top 48px is a drag region.", id: "window" },
    { key: "window", span: "full", node: <Window /> },
    { kind: "h", title: "Spacing scale", lede: "Bars are drawn at actual size.", id: "spacing" },
    { key: "space", span: "full", node: <SpaceScale /> },
    { kind: "h", title: "Fixed sizes", lede: T.size.note, id: "sizes" },
    { key: "sizes", span: "full", node: <Sizes /> }
  ]
};

function Radii() {
  return (
    <div className="ds-radii">
      {T.radius.tokens.map((t) => (
        <div key={t.name} className="ds-radius">
          <span className="ds-radius-box" style={{ borderRadius: "var(--" + t.name + ")" }} />
          <TokenRef name={t.name} />
          <span className="ds-scale-v">{t.value}</span>
          <span className="ds-radius-use">{t.usage}</span>
        </div>
      ))}
      <div className="ds-radius-note">
        <b>Nesting</b>
        <span>Inner radius is the outer radius minus the gap. A 12px field group with 4px inset holds 8px rows.</span>
      </div>
    </div>
  );
}

function Shadows() {
  return (
    <div className="ds-shadows">
      {["light", "dark"].map((th) => (
        <div key={th} className="ds-shadow-pane" data-theme={th}>
          <div className="ds-shadow-lbl"><A.Icon name={th === "light" ? "sun" : "moon"} size={13} />{th === "light" ? "Light" : "Dark"}</div>
          <div className="ds-shadow-grid">
            {T.shadow.tokens.map((t) => (
              <div key={t.name} className="ds-shadow">
                <span className={"ds-shadow-box" + (t.name === "shadow-highlight" ? " is-hl" : "")} style={{ boxShadow: "var(--" + t.name + ")" }} />
                <TokenRef name={t.name} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ShadowUse() {
  return (
    <div className="ds-cg ds-shadow-use">
      {T.shadow.tokens.map((t) => (
        <div key={t.name} className="ds-kv">
          <TokenRef name={t.name} />
          <span>{t.usage}</span>
        </div>
      ))}
    </div>
  );
}

export const shape = {
  id: "shape",
  group: "Foundations",
  nav: "Shape and elevation",
  icon: "layers",
  title: "Shape and elevation",
  lede: T.radius.note + " " + T.shadow.note,
  keywords: "radius corner shadow elevation highlight",
  blocks: () => [
    { kind: "h", title: "Rules", id: "rules" },
    ...ruleBlocks(readmeBullets("shape-and-elevation"), { key: "shape-rules" }),
    { kind: "h", title: "Radius", id: "radius" },
    { key: "radii", span: "full", node: <Radii /> },
    { kind: "h", title: "Elevation", lede: "The same token, both themes. Dark swaps shadow for a 1px light edge.", id: "elevation" },
    { key: "shadows", span: "full", node: <Shadows /> },
    { key: "shadow-use", span: "full", node: <ShadowUse /> }
  ]
};

function bezier(v) {
  const m = v.match(/cubic-bezier\(([^)]+)\)/);
  return m ? m[1].split(",").map((x) => parseFloat(x)) : [0.25, 0.1, 0.25, 1];
}

function Curve({ name, value, use, tick }) {
  const [x1, y1, x2, y2] = bezier(value);
  const W = 180, H = 120, P = 14;
  const lo = Math.min(0, y1, y2), hi = Math.max(1, y1, y2);
  const X = (x) => P + x * (W - 2 * P);
  const Y = (y) => H - P - ((y - lo) / (hi - lo)) * (H - 2 * P);
  return (
    <div className="ds-curve">
      <svg viewBox={"0 0 " + W + " " + H} width="100%" height={H} aria-hidden="true">
        <line x1={X(0)} y1={Y(0)} x2={X(1)} y2={Y(0)} className="ds-curve-axis" />
        <line x1={X(0)} y1={Y(1)} x2={X(1)} y2={Y(1)} className="ds-curve-axis is-dash" />
        <line x1={X(0)} y1={Y(0)} x2={X(x1)} y2={Y(y1)} className="ds-curve-handle" />
        <line x1={X(1)} y1={Y(1)} x2={X(x2)} y2={Y(y2)} className="ds-curve-handle" />
        <circle cx={X(x1)} cy={Y(y1)} r="3" className="ds-curve-dot" />
        <circle cx={X(x2)} cy={Y(y2)} r="3" className="ds-curve-dot" />
        <path d={"M" + X(0) + " " + Y(0) + " C" + X(x1) + " " + Y(y1) + " " + X(x2) + " " + Y(y2) + " " + X(1) + " " + Y(1)} className="ds-curve-path" />
      </svg>
      <div className="ds-curve-track"><i key={tick} style={{ animationTimingFunction: value }} /></div>
      <TokenRef name={name}>{"--" + name}</TokenRef>
      <span className="ds-curve-v">{value}</span>
      <span className="ds-curve-use">{use}</span>
    </div>
  );
}

function motionUse(name) {
  const t = readme("motion").blocks.find((b) => b.type === "table");
  if (!t) return "";
  const row = t.rows.find((r) => r[0].includes(name));
  return row ? row[2] : "";
}

function Easings() {
  const [tick, setTick] = useState(0);
  const eases = Object.entries(meta.motion).filter(([k]) => k.startsWith("ease"));
  return (
    <div className="ds-motion">
      <div className="ds-motion-grid">
        {eases.map(([k, v]) => <Curve key={k} name={k} value={v} use={motionUse(k)} tick={tick} />)}
      </div>
      <div className="ds-motion-foot"><A.Button size="sm" icon="rotate-ccw" onClick={() => setTick(tick + 1)}>Replay</A.Button></div>
    </div>
  );
}

function Durations() {
  const [tick, setTick] = useState(0);
  const durs = Object.entries(meta.motion).filter(([k]) => k.startsWith("dur"));
  return (
    <div className="ds-motion">
      <div className="ds-durs">
        {durs.map(([k, v]) => (
          <div key={k} className="ds-dur">
            <TokenRef name={k}>{"--" + k}</TokenRef>
            <span className="ds-scale-v">{v}</span>
            <span className="ds-dur-bar"><i style={{ width: (parseInt(v, 10) / 400) * 100 + "%" }} /><b key={tick} style={{ "--w": (parseInt(v, 10) / 400) * 100 + "%", animationDuration: v }} /></span>
            <span className="ds-dur-use">{motionUse(k)}</span>
          </div>
        ))}
      </div>
      <div className="ds-motion-foot"><A.Button size="sm" icon="rotate-ccw" onClick={() => setTick(tick + 1)}>Replay</A.Button></div>
    </div>
  );
}

function ShakeDemo() {
  const [n, setN] = useState(0);
  return (
    <div className="ds-try">
      <A.PasswordInput defaultValue="hunter2" shakeKey={n} error={n ? "Incorrect password. 4 attempts left before a 30 second wait." : null} invalid={n > 0} />
      <A.Button size="sm" icon="rotate-ccw" onClick={() => setN(n + 1)}>Try a wrong password</A.Button>
    </div>
  );
}

export const motion = {
  id: "motion",
  group: "Foundations",
  nav: "Motion",
  icon: "activity",
  title: "Motion",
  lede: readmeParas("motion")[0] || "Motion confirms that something happened.",
  keywords: "animation ease duration easing spring shake reduced motion",
  blocks: (ctx) => [
    { kind: "h", title: "Easing", id: "easing" },
    { key: "ease", span: "full", node: <Easings /> },
    { kind: "h", title: "Duration", id: "duration" },
    { key: "dur", span: "full", node: <Durations /> },
    { kind: "h", title: "Moments", lede: "Where motion happens, and what it confirms.", id: "moments" },
    ...ruleBlocks(readmeBullets("motion"), { key: "motion-rules", chunk: 4 }),
    { kind: "h", title: "Try it", id: "try", print: false },
    { key: "try-shake", span: "half", print: false, node: <Spec title="Wrong password" caption="A 420ms damped shake on `--ease-in-out`." stage="plain" height={200}><ShakeDemo /></Spec> },
    { key: "try-reveal", span: "half", print: false, node: <Spec title="Reveal and one-time code" caption="The value sharpens out of a blur; each new code rises into place." stage="plain" height={200}><div style={{ width: "100%" }}><A.FieldGroup><A.SecretField label="Password" icon="key" value="t7#Vq9!mZ2pL@x4R" secret /><A.SecretField label="Code" icon="timer" totp="JBSWY3DPEHPK3PXP" /></A.FieldGroup></div></Spec> }
  ]
};
