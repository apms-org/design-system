import meta from "ds:meta";
import { PRESETS, KEYS, tokensFor, contrast } from "../../../themes.js";
import { fmtRatio } from "../lib/color.js";
import { copy } from "../lib/state.js";
import { usePrint } from "../lib/ui.jsx";
import { exampleBlocks } from "./common.jsx";

const A = window.APM;
const { useState } = React;

export const patterns = {
  id: "patterns",
  group: "Recipes",
  nav: "Patterns",
  icon: "workflow",
  title: "Patterns",
  lede: "How the components come together in the app. Each pattern is live and built only from the bundle, the tokens and a few layout classes.",
  keywords: "pattern lock sidebar list detail toast receipt cli pm identifier crumb settings card page header",
  blocks: (ctx) => exampleBlocks("Pattern", ctx && ctx.theme ? { theme: ctx.theme } : undefined)
};

export function presetStyle(p) {
  if (p.native) return { theme: p.base, style: {} };
  const { vars, base } = tokensFor(p);
  return { theme: base, style: vars };
}

export function MiniApp({ preset, height = 340 }) {
  const { theme, style } = presetStyle(preset);
  return (
    <div className="ds-mini" data-theme={theme} style={{ ...style, height }}>
      <div className="ds-mini-side">
        <div className="ds-mini-brand"><A.Mark tile size={20} /><span>Personal</span></div>
        <A.NavItem icon="layers" label="All items" count={21} active />
        <A.NavItem icon="star" label="Favorites" count={4} />
        <A.NavItem icon="shield-alert" label="Watchtower" badge={{ tone: "warning", text: "3" }} />
        <A.NavItem icon="timer" label="Authenticator" count={6} />
      </div>
      <div className="ds-mini-list">
        <A.ItemRow title="GitHub" subtitle="maya@example.com" time="2m" active />
        <A.ItemRow title="Stripe" subtitle="maya@example.com" time="1h" alert="warning" />
        <A.ItemRow title="AWS production" subtitle="AKIA4XYZ7QX2" icon="cloud" time="Tue" mono />
      </div>
      <div className="ds-mini-detail">
        <div className="ds-mini-hero">
          <A.ItemIcon name="GitHub" />
          <div>
            <div className="title-3">GitHub</div>
            <div className="ds-mini-badges"><A.Badge size="sm" tone="success" icon="shield-check">2FA on</A.Badge><A.Badge size="sm" tone="accent" icon="fingerprint">Passkey</A.Badge></div>
          </div>
        </div>
        <A.FieldGroup>
          <A.SecretField label="Username" icon="user" value="maya@example.com" />
          <A.SecretField label="Password" icon="key" value="t7#Vq9!mZ2pL@x4R" secret />
        </A.FieldGroup>
        <div className="ds-mini-actions"><A.Button size="sm" variant="primary" icon="plus">New</A.Button><A.Button size="sm" icon="pencil">Edit</A.Button></div>
      </div>
    </div>
  );
}

function Dots({ preset }) {
  return (
    <span className="ds-dots">
      {KEYS.map((k) => <i key={k.key} style={{ background: preset.c[k.key] }} title={k.label + " " + preset.c[k.key]} />)}
    </span>
  );
}

function PresetCard({ p, active, onClick }) {
  return (
    <button type="button" className={"ds-preset" + (active ? " is-active" : "")} onClick={onClick} aria-pressed={active ? "true" : "false"}>
      <span className="ds-preset-swatch" style={{ background: p.c.bg }}>
        <span style={{ background: p.c.s2 }} />
        <span style={{ background: p.c.s3, boxShadow: "inset 0 0 0 1px " + p.c.b1 }}><b style={{ background: p.c.t1 }} /><b style={{ background: p.c.t2 }} /><b style={{ background: p.c.accent }} /></span>
      </span>
      <span className="ds-preset-text">
        <span className="ds-preset-name">{p.name}{p.native && <A.Badge size="sm">Built in</A.Badge>}</span>
        <span className="ds-preset-desc">{p.desc}</span>
      </span>
    </button>
  );
}

function Derived({ preset }) {
  const { style } = presetStyle(preset);
  const keys = ["--text", "--text-secondary", "--text-tertiary", "--accent", "--success", "--warning", "--danger"];
  if (preset.native) return <p className="ds-p ds-muted">Built-in themes use the values in tokens.css directly. The Color page lists every one.</p>;
  return (
    <div className="ds-derived">
      {keys.map((k) => {
        const v = style[k];
        const r = contrast(v, style["--bg"]);
        return (
          <button type="button" key={k} className="ds-derived-row" onClick={() => copy(v, "Copied " + k, v)}>
            <span className="ds-derived-sw" style={{ background: v }} />
            <span className="ds-derived-k">{k}</span>
            <span className="ds-derived-v">{v}</span>
            <span className="ds-derived-r">{fmtRatio(r)}</span>
          </button>
        );
      })}
    </div>
  );
}

function ThemeLab() {
  const [id, setId] = useState("graphite");
  const p = PRESETS.find((x) => x.id === id) || PRESETS[0];
  return (
    <div className="ds-lab">
      <div className="ds-presets">{PRESETS.map((x) => <PresetCard key={x.id} p={x} active={x.id === id} onClick={() => setId(x.id)} />)}</div>
      <div className="ds-lab-preview">
        <MiniApp preset={p} height={360} />
      </div>
      <div className="ds-lab-side">
        <div className="ds-lab-col">
          <div className="ds-label">The 9 inputs</div>
          <div className="ds-keys">
            {KEYS.map((k) => (
              <div key={k.key} className="ds-key">
                <span className="ds-derived-sw" style={{ background: p.c[k.key] }} />
                <span className="ds-key-l">{k.label}</span>
                <span className="ds-key-h">{k.hint}</span>
                <span className="ds-derived-v">{p.c[k.key]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-lab-col">
          <div className="ds-label">Derived, contrast on bg</div>
          <Derived preset={p} />
        </div>
      </div>
    </div>
  );
}

function PrintPreset({ p }) {
  return (
    <div className="ds-pp-preset">
      <div className="ds-pp-preset-head">
        <span className="ds-preset-name">{p.name}{p.native && <A.Badge size="sm">Built in</A.Badge>}</span>
        <Dots preset={p} />
      </div>
      <span className="ds-preset-desc">{p.desc}</span>
      <div className="ds-pp-preset-mini"><MiniApp preset={p} height={330} /></div>
    </div>
  );
}

export const themes = {
  id: "themes",
  group: "Recipes",
  nav: "Themes",
  icon: "palette",
  title: "Themes",
  lede: "The app ships Light and Dark plus " + (PRESETS.length - 2) + " presets. A preset is 9 colors; `tokensFor` in `themes.js` derives the full token set from them and lifts text, accent and status colors until they hold 4.5:1.",
  keywords: "theme preset nord dracula catppuccin gruvbox tokyo rose pine midnight graphite paper cream",
  blocks: () => [
    { key: "lab", span: "full", print: false, node: <ThemeLab /> },
    ...PRESETS.map((p) => ({ key: "pp-" + p.id, span: "half", web: false, node: <PrintPreset p={p} /> }))
  ]
};

function fmtSize(n) {
  if (n == null) return null;
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return Math.round(n / 1024) + " KB";
  return (n / 1024 / 1024).toFixed(1) + " MB";
}

function Downloads() {
  return (
    <div className="ds-dl">
      {meta.downloads.map((d) => {
        const missing = d.size == null;
        return (
          <div key={d.name} className={"ds-dl-card" + (missing ? " is-missing" : "")}>
            <span className="ds-itile"><A.Icon name={d.icon} size={16} /></span>
            <div className="ds-dl-text">
              <span className="ds-dl-name">{d.name}</span>
              <span className="ds-dl-desc">{missing ? "Not generated yet. Run npm run pdf in design-system." : d.desc}</span>
            </div>
            <span className="ds-dl-size">{fmtSize(d.size)}</span>
            {!missing && <A.Button size="sm" icon="download" href={"downloads/" + d.name} download={d.name.split("/").pop()}>Download</A.Button>}
          </div>
        );
      })}
    </div>
  );
}

export const downloads = {
  id: "downloads",
  group: "Start",
  nav: "Downloads",
  icon: "download",
  title: "Downloads",
  lede: "The same files the app builds from. Everything here is copied from `design-system` when the site builds.",
  keywords: "download pdf tokens css json bundle fonts types",
  blocks: () => [{ key: "dl", span: "full", node: <Downloads /> }]
};
