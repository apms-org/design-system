const { Mark, PasswordInput, Button, Icon, NavItem, SearchField, ItemRow, ItemIcon, Badge, FieldGroup, SecretField, StrengthMeter, Toast, Kbd, copyText } = window.APM;
const { useState } = React;

export function Pattern_LockCard() {
  return (
    <div className="pat-lock">
      <Mark tile size={64} />
      <h1 className="display pat-lock-title">Unlock your vault</h1>
      <button type="button" className="pat-lock-vault"><span className="pat-dot" />Personal<Icon name="chevrons-up-down" size={14} /></button>
      <div className="pat-lock-form">
        <PasswordInput />
        <div className="pat-lock-or">or</div>
        <Button size="lg" block icon="fingerprint">Unlock with Touch ID</Button>
      </div>
      <div className="pat-lock-idle"><Icon name="clock" size={13} />Locked automatically after 15 minutes idle</div>
      <div className="mono-small pat-lock-cipher">XChaCha20-Poly1305 · Argon2id</div>
    </div>
  );
}

export function Pattern_SidebarList() {
  return (
    <div className="pat-app">
      <aside className="pat-side">
        <button type="button" className="pat-side-search"><Icon name="search" size={14} /><span>Search</span><Kbd keys={["⌘", "K"]} /></button>
        <div className="overline pat-side-label">Vault</div>
        <NavItem icon="layers" label="All items" count={21} active />
        <NavItem icon="star" label="Favorites" count={4} />
        <NavItem icon="timer" label="Authenticator" count={6} />
        <NavItem icon="shield-alert" label="Watchtower" badge={{ tone: "warning", text: "3" }} />
        <div className="overline pat-side-label">Types</div>
        <NavItem icon="globe" label="Logins" count={12} />
        <NavItem icon="key-round" label="API keys" count={3} />
        <NavItem icon="terminal" label="SSH keys" count={2} />
      </aside>
      <section className="pat-list">
        <div className="pat-list-head"><span className="title-3">All items</span><span className="caption pat-muted">21</span></div>
        <div className="pat-list-search"><SearchField placeholder="Search 21 items" size="sm" /></div>
        <div className="pat-list-group"><span>Today</span><span>2</span></div>
        <ItemRow title="GitHub" subtitle="maya@example.com" time="2m" favorite active />
        <ItemRow title="Stripe" subtitle="maya@example.com" time="1h" alert="warning" />
        <div className="pat-list-group"><span>This week</span><span>2</span></div>
        <ItemRow title="AWS production" subtitle="AKIA4XYZ7QX2" icon="cloud" time="Tue" mono />
        <ItemRow title="Home Wi-Fi" subtitle="Maple-5G" icon="wifi" time="Mon" />
      </section>
    </div>
  );
}

export function Pattern_DetailPane() {
  return (
    <div className="pat-detail">
      <div className="pat-hero">
        <ItemIcon name="GitHub" size="lg" />
        <div className="pat-hero-text">
          <h2 className="title-1 pat-hero-title">GitHub</h2>
          <div className="pat-hero-badges">
            <Badge icon="globe">Login</Badge>
            <Badge tone="success" icon="shield-check">2FA on</Badge>
          </div>
        </div>
      </div>
      <FieldGroup>
        <SecretField label="Username" icon="user" value="maya@example.com" />
        <SecretField label="Password" icon="key" value="t7#Vq9!mZ2pL@x4R" secret>
          <StrengthMeter score={4} bits={118} />
        </SecretField>
        <SecretField label="One-time code" icon="timer" totp="JBSWY3DPEHPK3PXP" />
        <SecretField label="Website" icon="globe" value="github.com" href="https://github.com" />
      </FieldGroup>
      <div className="mono-small pat-detail-foot">Created Mar 4, 2025 · Modified 2m ago</div>
    </div>
  );
}

export function Pattern_ToastReceipt() {
  return (
    <Toast
      title="Item saved"
      description="GitHub"
      action={
        <button type="button" className="receipt" title="Open this commit in History">
          <Icon name="git-commit-horizontal" size={13} />a1f09c3
        </button>
      }
    />
  );
}

export function Pattern_CliChip() {
  const [done, setDone] = useState(false);
  const cmd = "pm get \"GitHub\"";
  const run = () => { copyText(cmd); setDone(true); setTimeout(() => setDone(false), 1200); };
  return (
    <button type="button" className={"cli" + (done ? " is-done" : "")} title="Copy the pm command" onClick={run}>
      <span className="cli-prompt">$</span>
      <span className="cli-cmd">{cmd}</span>
      <Icon name={done ? "check" : "copy"} size={11} />
    </button>
  );
}

export function Pattern_Identifier() {
  const id = "Personal:login:GitHub";
  return (
    <button type="button" className="ident" title="Identifier used by pm and .apmignore. Click to copy." onClick={() => copyText(id)}>
      <span className="ident-sp">Personal</span><i>:</i>login<i>:</i><b>GitHub</b>
    </button>
  );
}

export const specs = {
  Pattern_LockCard: { title: "Lock card", caption: "The one `display` headline, the app icon tile, the lock field, Touch ID, and the cipher line at the edge.", height: 560, stage: "plain" },
  Pattern_SidebarList: { title: "Sidebar and list", caption: "`bg-subtle` sidebar with 28px `NavItem` rows, a 340px list with sticky recency groups and 56px `ItemRow` rows.", pad: "32px 24px" },
  Pattern_DetailPane: { title: "Detail pane", caption: "A `lg` tile and `title-1`, badges, then every value in one `FieldGroup`. Dates in `mono-small` at the foot.", stage: "plain", align: "stretch", justify: "flex-start", pad: "40px 48px" },
  Pattern_ToastReceipt: { title: "Toast with a commit receipt", caption: "Every change writes a commit to History. The toast carries the short hash; clicking it opens the commit.", span: "half", height: 180 },
  Pattern_CliChip: { title: "The pm command chip", caption: "Each view shows the `pm` command that does the same thing. Click to copy it.", span: "half", height: 180 },
  Pattern_Identifier: { title: "The space:type:name identifier", caption: "The address `pm` and `.apmignore` use. The space is `accent`, the separators `text-disabled`, the name `text`.", span: "half", height: 140 }
};
