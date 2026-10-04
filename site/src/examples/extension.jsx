const { Mark, Icon, IconButton, Button, Tabs, ItemIcon, ItemRow, SearchField, Select, Input, EmptyState, Callout, Badge, Kbd, Spinner, TotpCode, StrengthMeter, SegmentedControl, Slider, Checkbox, PasswordInput, FieldGroup, SecretField, SettingRow, Switch, NavItem, Toast, Dialog, MenuList } = window.APM;

const LOGO = {
  vercel: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 76 65'%3E%3Cpath d='M38 0 76 65H0z' fill='%23000'/%3E%3C/svg%3E",
  hn: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Crect width='18' height='18' fill='%23f60'/%3E%3Cpath d='M5 4l4 5.5V14M13 4 9 9.5' stroke='%23fff' stroke-width='1.8' fill='none'/%3E%3C/svg%3E",
  harbor: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230e7490'/%3E%3Cpath d='M9 18.5c2 3 4.6 4.5 7 4.5s5-1.5 7-4.5M16 9v14M12.5 12.5h7' stroke='%23fff' stroke-width='2.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"
};

const TOTP = "JBSWY3DPEHPK3PXP";

function Colorized({ value }) {
  return <span className="clr">{Array.from(value).map((c, i) => <span key={i} className={/[0-9]/.test(c) ? "d" : /[^A-Za-z0-9]/.test(c) ? "s" : undefined}>{c}</span>)}</span>;
}

function Shot({ label, size, children }) {
  return (
    <figure className="ds-ext-shot">
      {children}
      <figcaption className="ds-ext-label"><b>{label}</b>{size && <span>{size}</span>}</figcaption>
    </figure>
  );
}

function Popup({ children }) {
  return <div className="ds-ext-popup"><div className="px">{children}</div></div>;
}

function MainHead({ space = "All spaces" }) {
  return (
    <header className="px-head">
      <button type="button" className="space-btn"><Mark tile size={22} /><span className="space-name">{space}</span><Icon name="chevrons-up-down" size={14} /></button>
      <div className="px-head-actions">
        <IconButton icon="plus" label="New login" size="sm" />
        <IconButton icon="lock" label="Lock vault" size="sm" />
        <IconButton icon="ellipsis" label="More" size="sm" />
      </div>
    </header>
  );
}

function PopupTabs({ value, count }) {
  return (
    <div className="px-tabs">
      <Tabs label="Sections" value={value} items={[{ value: "site", label: "This site", count }, { value: "vault", label: "Vault" }, { value: "codes", label: "Codes" }, { value: "gen", label: "Generator" }]} />
    </div>
  );
}

function PopupFoot() {
  return (
    <footer className="px-foot">
      <span className="live-dot" aria-hidden="true" />
      <span className="px-foot-main">Connected to APM 9.2</span>
      <span className="px-foot-end">Personal</span>
    </footer>
  );
}

function SubHead({ title, end }) {
  return (
    <header className="px-head sub">
      <IconButton icon="arrow-left" label="Back" size="sm" />
      <span className="sub-title">{title}</span>
      {end}
      {!end && <IconButton icon="ellipsis" label="Item actions" size="sm" />}
    </header>
  );
}

function Overline({ children, count, action }) {
  return <div className="ovl"><span>{children}</span>{count != null && <span className="ovl-count">{count}</span>}{action}</div>;
}

function Steps() {
  return (
    <ol className="steps">
      <li><span className="step-n">1</span><span>Open the APM app, or run <span className="mono">pm bridge serve</span>.</span></li>
      <li><span className="step-n">2</span><span>The extension connects by itself. There is nothing to paste.</span></li>
      <li><span className="step-n">3</span><span>If APM asks you to confirm, check the code and choose <b>Connect</b>.</span></li>
    </ol>
  );
}

function MenuHead({ host, right }) {
  return (
    <div className="im-head">
      <Mark size={14} />
      <span className="im-brand">APM</span>
      <span className="im-host mono-small">{host}</span>
      {right}
    </div>
  );
}

function Frame({ kind, children }) {
  return <div className={"ds-ext-frame" + (kind ? " is-" + kind : "")}>{children}</div>;
}

function Page({ host, tall, children }) {
  return (
    <div className={"ds-ext-page" + (tall ? " is-tall" : "")}>
      <div className="ds-ext-bar">
        <span className="ds-ext-lights"><i /><i /><i /></span>
        <span className="ds-ext-url mono-small"><Icon name="lock" size={12} />{host}</span>
      </div>
      <div className="ds-ext-site">
        <div className="ds-ext-form">
          <div className="title-3">Sign in to Harbor</div>
          <Input id={"pg-email-" + host} label="Email" defaultValue="maya@example.com" />
          <Input id={"pg-pw-" + host} label="Password" type="password" defaultValue="t7#Vq9!mZ2pL@x4R" />
          <Button variant="primary" block>Sign in</Button>
        </div>
      </div>
      {children}
    </div>
  );
}

const SPACES = [{ value: "", label: "Default" }, { value: "Work", label: "Work" }];

export function ExtPopup_Pairing() {
  return (
    <div className="ds-ext-duo">
      <Shot label="Not paired, APM found" size="380 × 580">
        <Popup>
          <div className="px-pair">
            <Mark tile size={44} />
            <div className="pair-head">
              <h1 className="title-1">Connect to APM</h1>
              <p className="small muted">Connecting to the APM app on this computer.</p>
            </div>
            <div className="pair-body">
              <div className="pair-found"><Icon name="circle-check" size={16} /><span>APM is running on this computer</span></div>
              <Steps />
              <Button variant="primary" block>Connect</Button>
              <button type="button" className="linkbtn">Use a pairing token instead</button>
            </div>
          </div>
        </Popup>
      </Shot>
      <Shot label="Waiting for the code" size="380 × 580">
        <Popup>
          <div className="px-pair">
            <Mark tile size={44} />
            <div className="pair-head">
              <h1 className="title-1">Connect to APM</h1>
              <p className="small muted">Connecting to the APM app on this computer.</p>
            </div>
            <div className="pair-body">
              <div className="pair-code" aria-label="Code KJU-USY">{"KJU-USY".split("").map((c, i) => <span key={i} className={c === "-" ? "sep" : undefined}>{c}</span>)}</div>
              <p className="small center">APM is asking you to confirm this browser. Check the code matches, then choose Connect in the app.</p>
              <div className="pair-wait"><Spinner size={14} /><span>Waiting for APM</span><span className="mono-small muted">1:48</span></div>
              <Button variant="ghost" block>Cancel</Button>
            </div>
          </div>
        </Popup>
      </Shot>
    </div>
  );
}

export function ExtPopup_NotRunning() {
  return (
    <div className="ds-ext-duo">
      <Shot label="Not paired, APM not running" size="380 × 580">
        <Popup>
          <div className="px-pair">
            <Mark tile size={44} />
            <div className="pair-head">
              <h1 className="title-1">Connect to APM</h1>
              <p className="small muted">The extension fills from your vault through the APM app on this computer. It cannot open vault.dat on its own.</p>
            </div>
            <div className="pair-body">
              <div className="pair-found is-off"><Icon name="circle-alert" size={16} /><span>APM isn't running. Open the app, or run <span className="mono">pm bridge serve</span>.</span></div>
              <Steps />
              <Callout tone="danger" icon="circle-alert">APM isn't running. Open the APM app, or run pm bridge serve, then try again.</Callout>
              <Button variant="primary" block>Connect</Button>
              <button type="button" className="linkbtn">Use a pairing token instead</button>
            </div>
          </div>
        </Popup>
      </Shot>
      <Shot label="Paired, offline" size="380 × 580">
        <Popup>
          <div className="px-center">
            <EmptyState icon="plug" title="APM isn't running" action={<Button variant="primary" icon="refresh-cw">Try again</Button>}>
              Open the APM app on this computer, or run <span className="mono">pm bridge serve</span> in a terminal. The extension looks for it on 127.0.0.1:41417 and cannot read your vault without it.
            </EmptyState>
          </div>
        </Popup>
      </Shot>
    </div>
  );
}

export function ExtPopup_NoVault() {
  return (
    <div className="ds-ext-duo">
      <Shot label="No vault yet" size="380 × 580">
        <Popup>
          <div className="px-center">
            <EmptyState icon="file-lock-2" title="No vault yet" action={<Button variant="primary" icon="refresh-cw">Check again</Button>}>
              Create a vault in the APM app first, then come back here.
            </EmptyState>
          </div>
        </Popup>
      </Shot>
      <Shot label="Starting" size="380 × 580">
        <Popup>
          <div className="px-center" aria-busy="true"><Mark tile size={40} className="boot-mark" /></div>
        </Popup>
      </Shot>
    </div>
  );
}

export function ExtPopup_Locked() {
  return (
    <div className="ds-ext-duo">
      <Shot label="Locked, with Touch ID" size="380 × 580">
        <Popup>
          <div className="px-lock">
            <div className="lock-top">
              <Mark tile size={56} />
              <h1 className="display lock-h">Unlock your vault</h1>
              <p className="small muted">Personal is locked</p>
            </div>
            <div className="lock-form">
              <PasswordInput id="ext-lock-a" />
              <div className="or"><span>or</span></div>
              <Button variant="secondary" block icon="fingerprint">Unlock with Touch ID</Button>
            </div>
            <p className="lock-note caption">Your password goes to the APM app over the paired loopback bridge. The extension never keeps it.</p>
            <div className="lock-foot mono-small">XChaCha20-Poly1305 · Argon2id</div>
          </div>
        </Popup>
      </Shot>
      <Shot label="Wrong password" size="380 × 580">
        <Popup>
          <div className="px-lock">
            <div className="lock-top">
              <Mark tile size={56} />
              <h1 className="display lock-h">Unlock your vault</h1>
              <p className="small muted">Personal is locked</p>
            </div>
            <div className="lock-form">
              <PasswordInput id="ext-lock-b" defaultValue="correct horse" error="Incorrect password. 4 attempts left before recovery is required." />
            </div>
            <p className="lock-note caption">Your password goes to the APM app over the paired loopback bridge. The extension never keeps it.</p>
            <div className="lock-foot mono-small">XChaCha20-Poly1305 · Argon2id</div>
          </div>
        </Popup>
      </Shot>
    </div>
  );
}

function Match({ title, user, sub, src, primary, code }) {
  return (
    <div className="match">
      <div className="match-top">
        <button type="button" className="match-main">
          <ItemIcon name={title} src={src} />
          <span className="row-text"><span className="row-title">{user}</span><span className="row-sub">{title} · {sub}</span></span>
        </button>
        <div className="match-actions">
          <IconButton icon="user" label="Copy username" size="sm" />
          <IconButton icon="key-round" label="Copy password" size="sm" />
          <Button size="sm" variant={primary ? "primary" : "secondary"}>Fill</Button>
        </div>
      </div>
      {code && (
        <div className="match-code">
          <span className="match-code-label"><Icon name="timer" size={14} />One-time code</span>
          <TotpCode secret={TOTP} />
          <IconButton icon="copy" label="Copy one-time code" size="xs" />
        </div>
      )}
    </div>
  );
}

export function ExtPopup_ThisSite() {
  return (
    <div className="ds-ext-duo">
      <Shot label="This site" size="380 × 580">
        <Popup>
          <MainHead />
          <PopupTabs value="site" count={2} />
          <div className="px-body">
            <div className="stack">
              <div className="site-head">
                <span className="site-tile"><Icon name="globe-lock" size={16} /></span>
                <span className="site-text"><span className="site-host">harbor.dev</span><span className="site-sub">2 logins for this site</span></span>
                <Button size="sm" variant="ghost" icon="plus">New</Button>
              </div>
              <section className="sect">
                <Overline count={2}>Logins</Overline>
                <div className="matches">
                  <Match title="Harbor" user="maya@example.com" sub="Default · Passkey · Favorite" src={LOGO.harbor} primary code />
                  <Match title="Harbor work" user="maya@work.dev" sub="Work" src={LOGO.harbor} />
                </div>
              </section>
              <Button variant="secondary" block icon="plus">Save a login for harbor.dev</Button>
              <button type="button" className="linkbtn">Use a saved login on harbor.dev</button>
            </div>
          </div>
          <PopupFoot />
        </Popup>
      </Shot>
      <Shot label="Saved for another site" size="380 × 580">
        <Popup>
          <MainHead />
          <PopupTabs value="site" count={0} />
          <div className="px-body">
            <div className="stack">
              <div className="site-head">
                <span className="site-tile"><Icon name="globe-lock" size={16} /></span>
                <span className="site-text"><span className="site-host">app.harbor.io</span><span className="site-sub">Nothing saved for this site yet</span></span>
                <Button size="sm" variant="ghost" icon="plus">New</Button>
              </div>
              <Callout tone="warning" title="Fill Harbor on app.harbor.io?" action={<><Button size="sm" variant="ghost">Cancel</Button><Button size="sm" variant="ghost">Fill once</Button><Button size="sm" variant="secondary">Fill and remember</Button></>}>
                This login is saved for a different website. Only continue if you trust this page. Fill and remember adds app.harbor.io to the login.
              </Callout>
              <section className="sect">
                <Overline count={1}>Also for this site</Overline>
                <ItemRow title="Harbor" subtitle="maya@example.com" src={LOGO.harbor} time="2m" />
              </section>
              <Button variant="secondary" block icon="plus">Save a login for app.harbor.io</Button>
            </div>
          </div>
          <PopupFoot />
        </Popup>
      </Shot>
    </div>
  );
}

export function ExtPopup_VaultAndCodes() {
  return (
    <div className="ds-ext-duo">
      <Shot label="Vault" size="380 × 580">
        <Popup>
          <MainHead />
          <PopupTabs value="vault" />
          <div className="px-body">
            <div className="vault">
              <div className="vault-tools">
                <SearchField size="sm" placeholder="Search 21 items" shortcut={null} />
                <Select id="ext-vault-type" size="sm" icon="list-filter" defaultValue="all" options={[{ value: "all", label: "All types" }, { value: "fav", label: "Favorites  4" }, { value: "password", label: "Logins  12" }]} />
              </div>
              <section className="vgroup">
                <div className="vgroup-head"><span>Today</span><span className="ovl-count">2</span></div>
                <ItemRow title="Harbor" subtitle="maya@example.com" src={LOGO.harbor} time="2m" favorite />
                <ItemRow title="Vercel" subtitle="maya@example.com" src={LOGO.vercel} time="1h" />
              </section>
              <section className="vgroup">
                <div className="vgroup-head"><span>This week</span><span className="ovl-count">3</span></div>
                <ItemRow title="Hacker News" subtitle="maya_c" src={LOGO.hn} time="Tue" alert="warning" />
                <ItemRow title="AWS production" subtitle="AKIA4XYZ7QX2" icon="cloud" time="Mon" mono />
                <ItemRow title="Home Wi-Fi" subtitle="Maple-5G" icon="wifi" time="Mon" />
              </section>
            </div>
          </div>
          <PopupFoot />
        </Popup>
      </Shot>
      <Shot label="Codes" size="380 × 580">
        <Popup>
          <MainHead />
          <PopupTabs value="codes" />
          <div className="px-body">
            <div className="stack tight">
              <SearchField size="sm" placeholder="Search 4 codes" shortcut={null} />
              <section className="sect">
                <Overline count={1}>For harbor.dev</Overline>
                <div className="code-row" role="button" tabIndex={0} title="Click to copy">
                  <ItemIcon name="Harbor" src={LOGO.harbor} />
                  <span className="row-text"><span className="row-title">Harbor</span><span className="row-sub">harbor.dev</span></span>
                  <TotpCode secret={TOTP} />
                </div>
              </section>
              <section className="sect">
                <Overline count={3}>All codes</Overline>
                <div className="code-row" role="button" tabIndex={0} title="Click to copy">
                  <ItemIcon name="Vercel" src={LOGO.vercel} />
                  <span className="row-text"><span className="row-title">Vercel</span><span className="row-sub">vercel.com</span></span>
                  <TotpCode secret="KRSXG5DSNFXGOIDB" />
                </div>
                <div className="code-row" role="button" tabIndex={0} title="Click to copy">
                  <ItemIcon name="GitHub" />
                  <span className="row-text"><span className="row-title">GitHub</span><span className="row-sub">github.com</span></span>
                  <TotpCode secret="GEZDGNBVGY3TQOJQ" />
                </div>
                <div className="code-row" role="button" tabIndex={0} title="Click to copy">
                  <ItemIcon name="Linear" />
                  <span className="row-text"><span className="row-title">Linear</span><span className="row-sub">Work</span></span>
                  <span className="code-wait mono">··· ···</span>
                </div>
              </section>
            </div>
          </div>
          <PopupFoot />
        </Popup>
      </Shot>
    </div>
  );
}

export function ExtPopup_Generator() {
  return (
    <div className="ds-ext-duo">
      <Shot label="Generator" size="380 × 580">
        <Popup>
          <MainHead />
          <PopupTabs value="gen" />
          <div className="px-body">
            <div className="stack">
              <div className="gen">
                <div className="gen-out">
                  <div className="gen-value mono"><Colorized value="vT7#qL2!mZ9pXr4@Kw8e" /></div>
                  <div className="gen-out-actions">
                    <IconButton icon="refresh-cw" label="Generate another" size="sm" />
                    <IconButton icon="copy" label="Copy" size="sm" />
                  </div>
                </div>
                <StrengthMeter score={4} bits={131} />
                <SegmentedControl label="Kind" defaultValue="random" options={[{ value: "random", label: "Random" }, { value: "passphrase", label: "Passphrase" }, { value: "pin", label: "PIN" }]} />
                <div className="slider-row"><label htmlFor="ext-gen-len">Length</label><Slider id="ext-gen-len" label="Length" min={8} max={64} defaultValue={20} /><span className="mono">20</span></div>
                <div className="gen-checks">
                  <Checkbox defaultChecked label="A-Z" />
                  <Checkbox defaultChecked label="a-z" />
                  <Checkbox defaultChecked label="0-9" />
                  <Checkbox defaultChecked label="!@#$" />
                </div>
                <Checkbox label="Avoid look-alikes" description="Leaves out I, l, 1, O, 0 and quote marks" />
                <Button variant="primary" block icon="check">Fill on harbor.dev</Button>
              </div>
              <p className="hint mono-small">Made in this browser with crypto.getRandomValues. Nothing leaves it until you save a login.</p>
            </div>
          </div>
          <PopupFoot />
        </Popup>
      </Shot>
      <Shot label="More menu" size="380 × 580">
        <Popup>
          <MainHead />
          <PopupTabs value="vault" />
          <div className="ds-ext-menu-at">
            <MenuList label="More" items={[
              { label: "Passkeys", icon: "fingerprint" },
              { label: "Extension settings", icon: "settings" },
              { separator: true },
              { label: "Pause APM on harbor.dev", icon: "shield-off" },
              { separator: true },
              { label: "Lock vault", icon: "lock", kbd: ["⌥", "⇧", "L"] }
            ]} />
          </div>
          <div className="px-body">
            <div className="vault">
              <section className="vgroup">
                <div className="vgroup-head"><span>Today</span><span className="ovl-count">2</span></div>
                <ItemRow title="Harbor" subtitle="maya@example.com" src={LOGO.harbor} time="2m" favorite />
                <ItemRow title="Vercel" subtitle="maya@example.com" src={LOGO.vercel} time="1h" />
              </section>
            </div>
          </div>
          <PopupFoot />
        </Popup>
      </Shot>
    </div>
  );
}

export function ExtPopup_Detail() {
  return (
    <div className="ds-ext-duo">
      <Shot label="Item detail" size="380 × 580">
        <Popup>
          <div className="px-sub">
            <SubHead title="Harbor" />
            <div className="px-body">
              <div className="stack">
                <div className="det-hero">
                  <ItemIcon name="Harbor" src={LOGO.harbor} size="lg" />
                  <div className="det-hero-text">
                    <div className="title-2 det-title">Harbor</div>
                    <div className="det-meta"><span>Default · Login</span><Badge size="sm" icon="star">Favorite</Badge></div>
                  </div>
                </div>
                <FieldGroup className="fg-compact">
                  <SecretField label="Username" value="maya@example.com" />
                  <SecretField label="Password" value="t7#Vq9!mZ2pL@x4R" secret><StrengthMeter score={4} bits={118} /></SecretField>
                  <SecretField label="One-time code" totp={TOTP} />
                </FieldGroup>
                <section className="sect">
                  <Overline count={2} action={<button type="button" className="ovl-action"><Icon name="plus" size={12} />Add</button>}>Websites</Overline>
                  <div className="sites">
                    <div className="site-row"><Icon name="globe" size={14} /><a className="site-link" href="https://harbor.dev" target="_blank" rel="noreferrer">harbor.dev</a><IconButton icon="x" label="Remove harbor.dev" size="xs" /></div>
                    <div className="site-row"><Icon name="globe" size={14} /><a className="site-link" href="https://app.harbor.io" target="_blank" rel="noreferrer">app.harbor.io</a><IconButton icon="x" label="Remove app.harbor.io" size="xs" /></div>
                    <button type="button" className="site-row site-add-here"><Icon name="plus" size={14} /><span className="site-link">Add status.harbor.dev</span></button>
                  </div>
                </section>
                <div className="det-foot mono-small">Changed 3 days ago · Created Mar 4, 2025</div>
              </div>
            </div>
            <div className="px-bar">
              <Button variant="secondary" icon="copy">Copy password</Button>
              <Button variant="primary" block>Fill on harbor.dev</Button>
            </div>
          </div>
          <div className="toast-slot"><Toast title="Added app.harbor.io" /></div>
        </Popup>
      </Shot>
      <Shot label="New login, several websites" size="380 × 580">
        <Popup>
          <div className="px-sub">
            <SubHead title="New login" end={<span />} />
            <div className="px-body">
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <Input id="ext-nl-name" label="Name" defaultValue="Harbor" />
                <div className="url-list">
                  <div className="url-row"><Input id="ext-nl-url-0" label="Websites" defaultValue="harbor.dev" icon="globe" placeholder="example.com" /><IconButton icon="x" label="Remove website" size="sm" /></div>
                  <div className="url-row"><Input id="ext-nl-url-1" aria-label="Website 2" defaultValue="app.harbor.io" icon="globe" placeholder="example.com" /><IconButton icon="x" label="Remove website" size="sm" /></div>
                  <button type="button" className="linkbtn url-more">Add another website</button>
                </div>
                <Input id="ext-nl-user" label="Username" defaultValue="maya@example.com" icon="user" placeholder="you@example.com" />
                <div className="pw-field">
                  <Input id="ext-nl-pw" label="Password" type="password" defaultValue="vT7#qL2!mZ9pXr4@Kw8e" className="mono-input" trailing={<><IconButton icon="eye" label="Reveal" size="xs" /><IconButton icon="dices" label="Generate password" size="xs" /></>} />
                  <StrengthMeter score={4} bits={131} />
                </div>
                <Select id="ext-nl-space" label="Space" defaultValue="" options={SPACES} />
              </form>
            </div>
            <div className="px-bar">
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary" block>Save login</Button>
            </div>
          </div>
        </Popup>
      </Shot>
    </div>
  );
}

export function ExtPopup_Passkeys() {
  return (
    <div className="ds-ext-duo">
      <Shot label="Passkeys" size="380 × 580">
        <Popup>
          <div className="px-sub">
            <SubHead title="Passkeys" end={<span className="sub-count">3</span>} />
            <div className="px-body">
              <div className="stack tight">
                <SearchField size="sm" placeholder="Search passkeys" shortcut={null} />
                <div className="pk-item">
                  <div className="pk-row">
                    <ItemIcon icon="fingerprint" />
                    <span className="row-text"><span className="row-title">github.com · MacBook Pro</span><span className="row-sub">maya@example.com · in GitHub, Default</span></span>
                    <span className="row-time">2m</span>
                    <IconButton icon="ellipsis" label="Passkey actions" size="xs" />
                  </div>
                </div>
                <div className="pk-item">
                  <div className="pk-row">
                    <ItemIcon icon="fingerprint" />
                    <span className="row-text"><span className="row-title">harbor.dev</span><span className="row-sub">maya@example.com · in Harbor, Default</span></span>
                    <span className="row-time">Tue</span>
                    <IconButton icon="ellipsis" label="Passkey actions" size="xs" />
                  </div>
                  <Callout tone="danger" icon="trash-2" title="Remove the passkey for harbor.dev?" action={<><Button size="sm" variant="ghost">Cancel</Button><Button size="sm" variant="danger">Remove</Button></>}>
                    harbor.dev still trusts it. Remove it in the site's security settings too.
                  </Callout>
                </div>
                <div className="pk-item">
                  <form className="pk-rename" onSubmit={(e) => e.preventDefault()}>
                    <Input id="ext-pk-rename" size="sm" defaultValue="Work laptop" placeholder="MacBook Pro" />
                    <Button size="sm" variant="ghost">Cancel</Button>
                    <Button size="sm" variant="primary">Save</Button>
                  </form>
                </div>
                <p className="hint mono-small">ES256 · P-256 keys that never leave the APM app</p>
              </div>
            </div>
          </div>
        </Popup>
      </Shot>
      <Shot label="Use a saved login here" size="380 × 580">
        <Popup>
          <MainHead />
          <PopupTabs value="site" count={0} />
          <div className="px-body">
            <div className="stack">
              <div className="site-head">
                <span className="site-tile"><Icon name="link-2" size={16} /></span>
                <span className="site-text"><span className="site-host">Use a login on app.harbor.io</span><span className="site-sub">APM adds app.harbor.io to the login you pick</span></span>
                <Button size="sm" variant="ghost">Cancel</Button>
              </div>
              <SearchField size="sm" placeholder="Search logins" shortcut={null} />
              <div className="sect">
                <ItemRow title="Harbor" subtitle="maya@example.com · harbor.dev" src={LOGO.harbor} />
                <ItemRow title="Harbor work" subtitle="maya@work.dev · harbor.dev" src={LOGO.harbor} time="Adding" />
                <ItemRow title="Vercel" subtitle="maya@example.com · vercel.com" src={LOGO.vercel} />
              </div>
            </div>
          </div>
          <PopupFoot />
        </Popup>
      </Shot>
    </div>
  );
}

export function ExtMenu_Login() {
  return (
    <div className="ds-ext-anchor">
      <Input id="ext-field-email" label="Email" defaultValue="" placeholder="you@example.com" trailing={<Mark tile size={20} />} />
      <Frame>
        <div className="im">
          <MenuHead host="vercel.com" right={<Kbd keys={["↑", "↓"]} />} />
          <button type="button" className="im-row is-active">
            <ItemIcon name="Vercel" src={LOGO.vercel} size="sm" />
            <span className="row-text"><span className="row-title">maya@example.com</span><span className="row-sub">Vercel · Default · code ready</span></span>
            <Kbd keys={["↵"]} />
          </button>
          <button type="button" className="im-row">
            <ItemIcon name="Vercel" src={LOGO.vercel} size="sm" />
            <span className="row-text"><span className="row-title">maya@work.dev</span><span className="row-sub">Vercel work · Work</span></span>
          </button>
          <div className="im-label overline">Passkeys</div>
          <button type="button" className="im-row">
            <ItemIcon icon="fingerprint" size="sm" />
            <span className="row-text"><span className="row-title">maya@example.com</span><span className="row-sub">Passkey · Vercel · MacBook Pro</span></span>
          </button>
          <div className="im-sep" />
          <button type="button" className="im-row im-action"><Icon name="search" size={16} /><span>Search the vault</span><Kbd keys={["⌥", "⇧", "A"]} /></button>
        </div>
      </Frame>
    </div>
  );
}

export function ExtMenu_Code() {
  return (
    <Frame>
      <div className="im">
        <MenuHead host="github.com" />
        <button type="button" className="im-row im-otp is-active">
          <ItemIcon name="GitHub" size="sm" />
          <span className="row-text"><span className="row-title">maya@example.com</span><span className="row-sub">GitHub · Default</span></span>
          <TotpCode secret={TOTP} />
        </button>
        <div className="im-note caption">Matched because you filled this login on github.com a moment ago.</div>
      </div>
    </Frame>
  );
}

export function ExtMenu_NewPassword() {
  return (
    <Frame>
      <div className="im">
        <MenuHead host="harbor.dev" right={<IconButton icon="x" label="Close" size="xs" />} />
        <div className="im-gen-body">
          <div className="im-gen-title small-medium">Use a strong password</div>
          <div className="im-gen-out">
            <span className="mono im-gen-v"><Colorized value="vT7#qL2!mZ9pXr4@Kw8e" /></span>
            <IconButton icon="refresh-cw" label="Generate another" size="xs" />
          </div>
          <StrengthMeter score={4} bits={131} />
          <div className="im-gen-actions">
            <Button size="sm" variant="ghost" icon="sliders-horizontal">Options</Button>
            <Button size="sm" variant="primary">Fill password</Button>
          </div>
        </div>
        <div className="im-note caption">APM offers to save it to your vault when you submit the form.</div>
      </div>
    </Frame>
  );
}

export function ExtMenu_Locked() {
  return (
    <Frame>
      <div className="im">
        <MenuHead host="harbor.dev" />
        <div className="im-locked">
          <span className="im-lock-ic"><Icon name="lock" size={16} /></span>
          <span className="row-text"><span className="row-title">APM is locked</span><span className="im-lock-body">Unlock from the toolbar to fill. APM never asks for your master password inside a web page.</span></span>
        </div>
        <div className="im-sep" />
        <button type="button" className="im-row im-action"><Icon name="lock-open" size={16} /><span>Unlock in the toolbar</span><Kbd keys={["⌥", "⇧", "A"]} /></button>
      </div>
    </Frame>
  );
}

export function ExtMenu_Blocked() {
  return (
    <Frame>
      <div className="im">
        <MenuHead host="harbor.dev" />
        <div className="im-locked">
          <span className="im-lock-ic"><Icon name="shield-off" size={16} /></span>
          <span className="row-text"><span className="row-title">Not filling here</span><span className="im-lock-body">harbor.dev is not encrypted, so APM does not fill here. You can change this in the extension settings.</span></span>
        </div>
      </div>
    </Frame>
  );
}

export function ExtMenu_Connect() {
  return (
    <Frame>
      <div className="im">
        <MenuHead host="" />
        <div className="im-locked">
          <span className="im-lock-ic"><Icon name="plug" size={16} /></span>
          <span className="row-text"><span className="row-title">APM isn't connected</span><span className="im-lock-body">Open the APM app, or run pm bridge serve. The extension connects by itself.</span></span>
        </div>
        <div className="im-sep" />
        <button type="button" className="im-row im-action"><Icon name="external-link" size={16} /><span>Open APM in the toolbar</span></button>
      </div>
    </Frame>
  );
}

function SaveNote() {
  return (
    <div className="pr pr-save">
      <div className="np" role="dialog" aria-label="Save login for harbor.dev?">
        <div className="np-head">
          <Mark tile size={28} />
          <span className="row-text"><span className="np-title">Save login for harbor.dev?</span><span className="row-sub">You just signed in. APM can fill it next time.</span></span>
          <IconButton icon="x" label="Close" size="sm" />
        </div>
        <div className="np-body">
          <div className="np-grid">
            <Input id="ext-sp-name" size="sm" label="Name" defaultValue="Harbor" />
            <Select id="ext-sp-space" size="sm" label="Space" defaultValue="" options={SPACES} />
          </div>
          <Input id="ext-sp-user" size="sm" label="Username" defaultValue="maya@example.com" />
          <div className="np-pw">
            <span className="np-pw-label small">Password</span>
            <span className="np-pw-v mono">••••••••••••••••</span>
            <IconButton icon="eye" label="Reveal" size="xs" />
          </div>
        </div>
        <div className="np-foot">
          <Button size="sm" variant="ghost" iconRight="chevron-down">Not now</Button>
          <span className="np-spacer" />
          <Button size="sm" variant="primary">Save</Button>
        </div>
      </div>
    </div>
  );
}

export function ExtPrompt_Save() {
  return (
    <Page host="harbor.dev">
      <div className="ds-ext-corner">
        <Frame kind="note"><SaveNote /></Frame>
      </div>
    </Page>
  );
}

export function ExtPrompt_Update() {
  return (
    <Frame kind="note">
      <div className="pr pr-update">
        <div className="np" role="dialog" aria-label="Update the password for maya@example.com?">
          <div className="np-head">
            <Mark tile size={28} />
            <span className="row-text"><span className="np-title">Update the password for maya@example.com?</span><span className="row-sub">Harbor · Default</span></span>
            <IconButton icon="x" label="Close" size="sm" />
          </div>
          <div className="np-body">
            <div className="np-diff">
              <div className="np-diff-row">
                <span className="small muted">Saved</span>
                <span className="mono np-old">••••••••••••••••</span>
                <Badge tone="warning" size="sm" icon="triangle-alert">Reused on Notion</Badge>
              </div>
              <div className="np-diff-row">
                <span className="small muted">New</span>
                <span className="mono">••••••••••••••••••</span>
                <Badge tone="success" size="sm" icon="shield-check">Very strong</Badge>
              </div>
            </div>
            <p className="caption muted">The saved password was set 3 months ago. APM keeps the old one in the item's history.</p>
          </div>
          <div className="np-foot">
            <Button size="sm" variant="ghost" iconRight="chevron-down">Not now</Button>
            <span className="np-spacer" />
            <Button size="sm" variant="primary">Update</Button>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ExtPrompt_Toast() {
  return (
    <div className="ds-ext-duo">
      <Frame kind="note">
        <div className="pr pr-toast-wrap"><Toast title="Saved Harbor to Default" description="APM fills it next time you sign in." className="pr-toast" /></div>
      </Frame>
      <Frame kind="note">
        <div className="pr"><Toast title="APM won't offer to save on harbor.dev" description="Undo this in the extension settings, under Excluded sites." tone="neutral" className="pr-toast" /></div>
      </Frame>
    </div>
  );
}

function CreateSheet() {
  return (
    <div className="pr pr-create">
      <div className="sheet" role="dialog" aria-label="Save a passkey">
        <div className="sheet-head">
          <Mark tile size={32} />
          <IconButton icon="x" label="Cancel" size="sm" />
        </div>
        <div className="title-2">Save a passkey for harbor.dev</div>
        <p className="small muted">Harbor wants to create a passkey for maya@example.com. APM keeps it in your vault, so it works in every browser you pair.</p>
        <div className="sheet-label small">Save to</div>
        <div className="pick is-on">
          <ItemIcon name="Harbor" src={LOGO.harbor} />
          <span className="row-text"><span className="row-title">Harbor</span><span className="row-sub">maya@example.com · Default</span></span>
          <Button size="sm" variant="ghost">Change</Button>
        </div>
        <div className="sheet-foot">
          <Button variant="ghost" size="sm">Use this browser instead</Button>
          <span className="np-spacer" />
          <Button variant="primary" icon="fingerprint">Save passkey</Button>
        </div>
        <div className="sheet-mono mono-small">ES256 · P-256 · kept in APM, not in Chrome</div>
      </div>
    </div>
  );
}

export function ExtPrompt_PasskeyCreate() {
  return (
    <Page host="harbor.dev" tall>
      <div className="ds-ext-scrim">
        <Frame kind="sheet"><CreateSheet /></Frame>
      </div>
    </Page>
  );
}

export function ExtPrompt_PasskeyStates() {
  return (
    <div className="ds-ext-duo">
      <Shot label="Locked, with Touch ID">
        <Frame kind="sheet">
          <div className="pr pr-create">
            <div className="sheet" role="dialog" aria-label="Save a passkey">
              <div className="sheet-head">
                <Mark tile size={32} />
                <IconButton icon="x" label="Cancel" size="sm" />
              </div>
              <div className="title-2">Save a passkey for harbor.dev</div>
              <p className="small muted">Harbor wants to create a passkey for maya@example.com.</p>
              <div className="sheet-locked">
                <span className="im-lock-ic"><Icon name="lock" size={16} /></span>
                <span className="row-text"><span className="row-title">APM is locked</span><span className="im-lock-body">Unlock APM to save it to your vault. This sheet picks up as soon as it is unlocked.</span></span>
              </div>
              <div className="sheet-foot">
                <Button variant="ghost" size="sm">Use this browser instead</Button>
                <span className="np-spacer" />
                <Button variant="primary" icon="fingerprint">Unlock with Touch ID</Button>
              </div>
            </div>
          </div>
        </Frame>
      </Shot>
      <Shot label="Sign in">
        <Frame kind="sheet">
          <div className="pr pr-get">
            <div className="sheet" role="dialog" aria-label="Sign in with a passkey">
              <div className="sheet-head">
                <Mark tile size={32} />
                <IconButton icon="x" label="Cancel" size="sm" />
              </div>
              <div className="title-2">Sign in to harbor.dev</div>
              <p className="small muted">Choose a passkey from your vault.</p>
              <div className="sheet-list">
                <button type="button" className="pick is-on">
                  <ItemIcon icon="fingerprint" />
                  <span className="row-text"><span className="row-title">maya@example.com</span><span className="row-sub">Harbor · Default · used 2 days ago</span></span>
                  <span className="pick-mark"><Icon name="check" size={14} strokeWidth={2.25} /></span>
                </button>
                <button type="button" className="pick">
                  <ItemIcon icon="fingerprint" />
                  <span className="row-text"><span className="row-title">maya-work</span><span className="row-sub">Harbor work · Work</span></span>
                  <span className="pick-mark" />
                </button>
              </div>
              <div className="sheet-foot">
                <Button variant="ghost" size="sm">Use another device</Button>
                <span className="np-spacer" />
                <Button variant="primary">Sign in</Button>
              </div>
              <div className="sheet-mono mono-small">Signed by APM with ECDSA P-256 · the key never leaves your vault</div>
            </div>
          </div>
        </Frame>
      </Shot>
    </div>
  );
}

const SECTIONS = [
  { id: "connection", label: "Connection", icon: "plug" },
  { id: "autofill", label: "Autofill", icon: "mouse-pointer-click" },
  { id: "passkeys", label: "Passkeys", icon: "fingerprint" },
  { id: "security", label: "Security", icon: "shield" },
  { id: "shortcuts", label: "Shortcuts", icon: "keyboard" },
  { id: "sites", label: "Excluded sites", icon: "shield-off" },
  { id: "about", label: "About", icon: "info" }
];

function Options({ sec, badge = { tone: "success", text: "Live" }, children }) {
  return (
    <div className="ds-ext-opt">
      <div className="opt">
        <aside className="opt-side">
          <div className="opt-brand"><Mark tile size={28} /><span><b>APM for Chrome</b><span className="mono-small muted">v1.0.0</span></span></div>
          <nav className="opt-nav" aria-label="Settings">
            {SECTIONS.map((x) => <NavItem key={x.id} icon={x.icon} label={x.label} active={sec === x.id} badge={x.id === "connection" ? badge : null} />)}
          </nav>
        </aside>
        <main className="opt-main">{children}</main>
      </div>
    </div>
  );
}

function OptHead({ title, children }) {
  return <div className="opt-head"><h1 className="title-1">{title}</h1>{children && <p className="small muted">{children}</p>}</div>;
}

function Group({ title, foot, children }) {
  return (
    <section className="opt-group">
      {title && <div className="opt-group-title">{title}</div>}
      <FieldGroup>{children}</FieldGroup>
      {foot && <p className="opt-group-foot caption">{foot}</p>}
    </section>
  );
}

function Bridge({ live }) {
  return (
    <div className="bridge">
      <div className="bridge-node"><span className="bridge-ic"><Icon name="globe" size={16} /></span><b>Chrome</b><span className="caption muted">This extension</span></div>
      <div className={"bridge-wire" + (live ? " is-live" : "")}><i /><span className="mono-small">{live ? "paired" : "not paired"}</span></div>
      <div className="bridge-node"><span className="bridge-ic is-app"><Mark size={18} /></span><b>APM</b>{live ? <span className="caption status-ok"><span className="live-dot" />Unlocked</span> : <span className="caption muted">Locked</span>}</div>
      <div className={"bridge-wire" + (live ? " is-live" : "")}><i /><span className="mono-small">decrypts</span></div>
      <div className="bridge-node"><span className="bridge-ic"><Icon name="file-lock-2" size={16} /></span><b>vault.dat</b><span className="caption muted">{live ? "21 items" : "Encrypted"}</span></div>
    </div>
  );
}

export function ExtOptions_Connection() {
  return (
    <Options sec="connection">
      <OptHead title="Connection">The extension cannot decrypt anything on its own. It asks the APM app on this computer, which holds the key while the vault is unlocked.</OptHead>
      <Bridge live />
      <Group>
        <SettingRow title="APM app" description="APM 9.2 on this computer"><Badge tone="success" icon="circle-check">Connected</Badge></SettingRow>
        <SettingRow title="Pairing" description="Paired 2 days ago as Chrome on macOS. Rotating the token in APM disconnects this browser, and it pairs again by itself."><Button size="sm" variant="secondary" icon="key-round">Use a token</Button></SettingRow>
      </Group>
      <Group title="Bridge" foot="Loopback only. Nothing outside this computer can reach it. Change the port only if you started APM with APM_BRIDGE_PORT.">
        <SettingRow title="Address" description="Where the extension looks for APM."><span className="port-row"><span className="mono">127.0.0.1:41417</span><IconButton icon="pencil" label="Change port" size="xs" /></span></SettingRow>
        <SettingRow title="Extension ID" description="Pinned by the build, so it is the same on every computer."><span className="mono-small muted">ioooalainhfihaebgpbmngoaojmfdlac</span></SettingRow>
      </Group>
      <Group title="Danger zone">
        <SettingRow danger title="Forget this browser" description="Removes the pairing token from Chrome. Your vault is not touched."><Button size="sm" variant="danger">Forget</Button></SettingRow>
      </Group>
    </Options>
  );
}

export function ExtOptions_Welcome() {
  return (
    <Options sec="connection" badge={{ tone: "warning", text: "Not paired" }}>
      <div className="welcome">
        <div className="welcome-top">
          <Mark tile size={44} />
          <div className="welcome-text">
            <h1 className="title-1">Welcome to APM for Chrome</h1>
            <p className="small muted">The extension fills from your vault through the APM app on this computer. Open the app and it connects by itself.</p>
          </div>
        </div>
        <ol className="steps welcome-steps">
          <li className="is-done"><span className="step-n"><Icon name="check" size={12} strokeWidth={2.5} /></span><span>Open the APM app, or run <span className="mono">pm bridge serve</span> in a terminal.</span></li>
          <li><span className="step-n">2</span><span>The extension pairs itself. If APM asks, check the code and choose <b>Connect</b>.</span></li>
          <li><span className="step-n">3</span><span>Pin APM to the toolbar from the puzzle icon, and unlock your vault.</span></li>
        </ol>
        <div className="welcome-foot"><Button size="sm" variant="ghost">Hide</Button></div>
      </div>
      <OptHead title="Connection">The extension cannot decrypt anything on its own. It asks the APM app on this computer, which holds the key while the vault is unlocked.</OptHead>
      <Bridge />
      <Group title="Pair this browser">
        <div className="opt-pair">
          <div className="pair-body">
            <div className="pair-found"><Icon name="circle-check" size={16} /><span>APM is running on this computer</span></div>
            <Button variant="primary" block>Connect</Button>
            <button type="button" className="linkbtn">Use a pairing token instead</button>
          </div>
        </div>
      </Group>
    </Options>
  );
}

export function ExtOptions_Autofill() {
  return (
    <Options sec="autofill">
      <OptHead title="Autofill">How APM helps on sign-in and sign-up forms.</OptHead>
      <Group title="On the page">
        <SettingRow title="Show the APM menu on login fields" description="Opens when you focus a username, password or one-time code field."><Switch defaultChecked label="Show the APM menu on login fields" /></SettingRow>
        <SettingRow title="Show the APM icon inside fields" description="A small bird at the right edge of fields APM can fill."><Switch defaultChecked label="Show the APM icon inside fields" /></SettingRow>
        <SettingRow title="Suggest strong passwords on sign-up forms" description="Uses the generator settings from the toolbar popup."><Switch defaultChecked label="Suggest strong passwords on sign-up forms" /></SettingRow>
        <SettingRow title="Copy the one-time code after a login" description="When the login has a code, APM copies it so the next page can take it."><Switch defaultChecked label="Copy the one-time code after a login" /></SettingRow>
      </Group>
      <Group title="Saving">
        <SettingRow title="Offer to save new logins"><Switch defaultChecked label="Offer to save new logins" /></SettingRow>
        <SettingRow title="Offer to update changed passwords" description="The old password stays in the item's history."><Switch defaultChecked label="Offer to update changed passwords" /></SettingRow>
        <SettingRow title="Save new logins to" description="You can change the space in each prompt."><Select id="ext-save-space" size="sm" defaultValue="" options={SPACES} /></SettingRow>
      </Group>
      <Group title="Matching" foot="Base domain treats app.harbor.dev and harbor.dev as the same site. Exact host keeps them apart.">
        <SettingRow title="Match websites by"><Select id="ext-match" size="sm" defaultValue="domain" options={[{ value: "domain", label: "Base domain" }, { value: "host", label: "Exact host" }, { value: "prefix", label: "Starts with URL" }]} /></SettingRow>
      </Group>
    </Options>
  );
}

export function ExtOptions_Passkeys() {
  return (
    <Options sec="passkeys">
      <OptHead title="Passkeys">APM answers passkey requests inside the page, so Chrome's own passkey sheet never opens for sites APM handles.</OptHead>
      <Group>
        <SettingRow title="Use APM for passkeys" description="Create and sign with passkeys stored in your vault. 3 passkeys saved."><Switch defaultChecked label="Use APM for passkeys" /></SettingRow>
        <SettingRow title="Offer passkeys in the login menu" description="When a site supports passkey autofill, they show under your logins."><Switch defaultChecked label="Offer passkeys in the login menu" /></SettingRow>
      </Group>
      <Callout tone="neutral" icon="info" title="When Chrome takes over">Sites that accept only RS256 keys go to Chrome's own flow, and you can always choose Use this browser instead in the APM sheet. Nothing breaks, APM just steps aside.</Callout>
      <Callout tone="neutral" icon="shield-check" title="Private keys stay in APM">The extension never sees a private key. APM creates and signs with them, and the extension checks that each request comes from the site it names.</Callout>
    </Options>
  );
}

export function ExtOptions_Security() {
  return (
    <Options sec="security">
      <OptHead title="Security">These follow your APM settings where they overlap.</OptHead>
      <Group>
        <SettingRow title="Clear the clipboard after" description="Set in APM. Applies to passwords, keys and codes copied from the extension."><span className="mono">30s</span></SettingRow>
        <SettingRow title="Lock with APM" description="The extension locks the moment APM locks. This cannot be turned off."><Badge tone="neutral" icon="lock">Always</Badge></SettingRow>
        <SettingRow title="Lock APM when Chrome closes" description="Locks the vault when the last Chrome window closes."><Switch label="Lock APM when Chrome closes" /></SettingRow>
        <SettingRow title="Never fill on http:// pages" description="Unencrypted pages can be read on the network. Localhost is always allowed."><Switch defaultChecked label="Never fill on http:// pages" /></SettingRow>
        <SettingRow title="Fill inside frames from other sites" description="Off by default. A frame from another site could be hidden over the real form."><Switch label="Fill inside frames from other sites" /></SettingRow>
      </Group>
    </Options>
  );
}

export function ExtOptions_Shortcuts() {
  return (
    <Options sec="shortcuts">
      <OptHead title="Shortcuts">Chrome owns extension shortcuts. Change or add them on Chrome's shortcuts page.</OptHead>
      <Group foot={<button type="button" className="linkbtn">Change shortcuts in Chrome</button>}>
        <SettingRow title="Open APM"><Kbd keys={["⌥", "⇧", "A"]} /></SettingRow>
        <SettingRow title="Fill the best login for this page"><Kbd keys={["⌥", "⇧", "F"]} /></SettingRow>
        <SettingRow title="Generate and fill a password"><Kbd keys={["⌥", "⇧", "G"]} /></SettingRow>
        <SettingRow title="Copy the one-time code for this page"><span className="caption muted">Not set</span></SettingRow>
        <SettingRow title="Lock vault"><Kbd keys={["⌥", "⇧", "L"]} /></SettingRow>
      </Group>
      <Group title="In the APM menu on a page">
        <SettingRow title="Move between logins"><Kbd keys={["↑", "↓"]} /></SettingRow>
        <SettingRow title="Fill the highlighted login"><Kbd keys={["↵"]} /></SettingRow>
        <SettingRow title="Close the menu"><Kbd keys={["Esc"]} /></SettingRow>
      </Group>
    </Options>
  );
}

export function ExtOptions_ExcludedSites() {
  const rules = [{ value: "fill", label: "Never fill" }, { value: "save", label: "Never save" }, { value: "both", label: "Never fill or save" }];
  return (
    <Options sec="sites">
      <OptHead title="Excluded sites">APM stays quiet on these sites and every subdomain under them.</OptHead>
      <form className="site-add" onSubmit={(e) => e.preventDefault()}>
        <Input id="ext-ex-host" size="sm" placeholder="example.com" icon="globe" aria-label="Site" />
        <Select id="ext-ex-rule" size="sm" defaultValue="both" options={rules} />
        <Button size="sm" variant="secondary" icon="plus">Add</Button>
      </form>
      <Group>
        <SettingRow title={<span className="mono">bank.example.com</span>} description="Never fill or save">
          <span className="site-actions"><Select id="ext-rule-a" size="sm" defaultValue="both" options={rules} /><IconButton icon="trash-2" label="Remove bank.example.com" size="sm" /></span>
        </SettingRow>
        <SettingRow title={<span className="mono">news.ycombinator.com</span>} description="Never save">
          <span className="site-actions"><Select id="ext-rule-b" size="sm" defaultValue="save" options={rules} /><IconButton icon="trash-2" label="Remove news.ycombinator.com" size="sm" /></span>
        </SettingRow>
      </Group>
    </Options>
  );
}

export function ExtOptions_About() {
  return (
    <Options sec="about">
      <OptHead title="About" />
      <Group>
        <SettingRow title="Extension"><span className="mono">1.0.0</span></SettingRow>
        <SettingRow title="APM app"><span className="mono">9.2</span></SettingRow>
        <SettingRow title="This browser"><span className="mono-small">Chrome on macOS</span></SettingRow>
        <SettingRow title="Vault encryption"><span className="mono">XChaCha20-Poly1305 · Argon2id</span></SettingRow>
      </Group>
      <Group title="Permissions" foot="Website logos are fetched by the APM app from each site itself and cached on this computer. The extension never sends analytics or calls a server of its own.">
        <SettingRow title={<span className="mono">storage</span>} description="Keeps the pairing token, your extension settings and excluded sites." />
        <SettingRow title={<span className="mono">All sites</span>} description="Finds login forms so APM can fill them. Nothing on the page is sent anywhere but the APM app." />
        <SettingRow title={<span className="mono">127.0.0.1</span>} description="Talks to the APM app on this computer. No other host is contacted." />
      </Group>
    </Options>
  );
}

export function ExtOptions_Narrow() {
  return (
    <div className="ds-ext-opt is-narrow">
      <div className="opt is-narrow">
        <aside className="opt-side">
          <div className="opt-brand"><Mark tile size={28} /><span><b>APM for Chrome</b><span className="mono-small muted">v1.0.0</span></span></div>
          <Select id="ext-opt-sec" size="sm" label="Section" defaultValue="connection" options={SECTIONS.map((x) => ({ value: x.id, label: x.label }))} />
        </aside>
        <main className="opt-main">
          <OptHead title="Connection">The extension cannot decrypt anything on its own. It asks the APM app on this computer, which holds the key while the vault is unlocked.</OptHead>
          <Bridge live />
          <Group>
            <SettingRow title="APM app" description="APM 9.2 on this computer"><Badge tone="success" icon="circle-check">Connected</Badge></SettingRow>
          </Group>
        </main>
      </div>
    </div>
  );
}

function PairCode({ code, size }) {
  return <div className={"pat-pair-code" + (size ? " is-" + size : "")} aria-label={"Code " + code.split("").join(" ")}><span>{code.slice(0, 3)}</span><i aria-hidden="true">-</i><span>{code.slice(3, 6)}</span></div>;
}

export function ExtApp_PairDialog() {
  return (
    <Dialog open layer="contained" autoFocus={false} size="sm" className="pat-pair-dialog" bodyClassName="pat-pair-body" title="Connect Chrome on macOS to APM?"
      footerStart={<span className="pat-pair-ttl"><Icon name="clock" size={13} />Expires in 1:48</span>}
      footer={<><Button>Deny</Button><Button variant="primary">Connect</Button></>}>
      <Mark tile size={48} />
      <div className="pat-pair-head">
        <h2 className="pat-pair-title">Connect Chrome on macOS to APM?</h2>
        <p className="pat-pair-sub">The APM extension wants to fill logins, codes and passkeys from this vault.</p>
      </div>
      <PairCode code="KJUUSY" />
      <p className="pat-pair-note"><Icon name="shield-check" size={14} />Check that the extension shows the same code. Only connect browsers you use.</p>
    </Dialog>
  );
}

export function ExtApp_BrowserExtension() {
  return (
    <div className="ds-stack" style={{ width: "100%", maxWidth: 640, gap: 16 }}>
      <section className="pat-card">
        <div className="pat-card-head">
          <div><h3 className="pat-card-title">Browser bridge</h3></div>
          <span className="pat-status"><i />Chrome on macOS · active now</span>
        </div>
        <div className="pat-card-body">
          <div className="pat-gbridge">
            <div className="pat-gbridge-node"><span className="pat-gbridge-ic"><Icon name="globe" size={16} /></span><b>APM for Chrome</b><span>Active</span></div>
            <div className="pat-gbridge-wire"><i /><span className="mono-small">bearer token</span></div>
            <div className="pat-gbridge-node"><span className="pat-gbridge-ic is-app"><Mark size={18} /></span><b>APM</b><span className="pat-status"><i />Running</span></div>
            <div className="pat-gbridge-wire"><i /><span className="mono-small">decrypts</span></div>
            <div className="pat-gbridge-node"><span className="pat-gbridge-ic"><Icon name="file-lock-2" size={16} /></span><b>vault.dat</b><span>3 passkeys</span></div>
          </div>
        </div>
        <div className="pat-card-foot"><span>Listening on <span className="pat-mono">127.0.0.1:41417</span>. Loopback only. A browser needs your approval here before it can read anything.</span></div>
      </section>
      <section className="pat-card">
        <div className="pat-card-head">
          <div><h3 className="pat-card-title">Connect a browser</h3><p className="pat-card-desc">No token to copy. The extension asks, and you confirm the code here.</p></div>
        </div>
        <div className="pat-card-body">
          <div className="pat-approval">
            <div className="pat-approval-top">
              <span className="pat-tile"><Icon name="globe" size={16} /></span>
              <div className="pat-approval-who"><b>Chrome on macOS</b><span>wants to connect to this vault</span></div>
              <PairCode code="KJUUSY" size="sm" />
            </div>
            <div className="pat-approval-foot">
              <span className="pat-pair-ttl"><Icon name="clock" size={13} />Expires in 1:48</span>
              <Button size="sm">Deny</Button>
              <Button size="sm" variant="primary">Connect</Button>
            </div>
          </div>
          <ol className="pat-howto">
            <li><span className="pat-howto-n">1</span><span>Install <b>APM for Chrome</b> with the steps below.</span></li>
            <li><span className="pat-howto-n">2</span><span>Open it from the toolbar and choose <b>Connect</b>. It shows a 6 character code.</span></li>
            <li><span className="pat-howto-n">3</span><span>APM asks you to confirm. Check that the codes match, then choose <b>Connect</b>.</span></li>
          </ol>
        </div>
      </section>
    </div>
  );
}

export function ExtApp_SavedPasskeys() {
  return (
    <section className="pat-card">
      <div className="pat-card-head">
        <div><h3 className="pat-card-title">Saved passkeys</h3><p className="pat-card-desc">The private key is stored encrypted inside the item it belongs to.</p></div>
      </div>
      <div className="pat-card-body is-flush">
        <div className="pat-pk">
          <span className="pat-tile is-accent"><Icon name="fingerprint" size={16} /></span>
          <div className="pat-pk-text">
            <div className="pat-pk-top"><b>github.com</b><Badge size="sm" outline>MacBook Pro</Badge></div>
            <span>maya@example.com · in GitHub · used 2m · 14 sign-ins</span>
          </div>
          <IconButton icon="ellipsis" label="Passkey actions" />
        </div>
        <div className="pat-pk">
          <span className="pat-tile is-accent"><Icon name="fingerprint" size={16} /></span>
          <div className="pat-pk-text">
            <div className="pat-pk-top"><b>harbor.dev</b></div>
            <span>maya@example.com · in Harbor · used Tue · 3 sign-ins</span>
          </div>
          <IconButton icon="ellipsis" label="Passkey actions" />
        </div>
      </div>
    </section>
  );
}

export function ExtApp_WebsiteIcons() {
  return (
    <section className="pat-card">
      <div className="pat-card-head"><div><h3 className="pat-card-title">Website icons</h3></div></div>
      <div className="pat-card-body is-flush">
        <SettingRow title="Show website icons" description="Fetched from each site itself, refreshed monthly and kept on this computer. Nothing goes to a third party."><Switch defaultChecked label="Show website icons" /></SettingRow>
        <SettingRow title="Icon cache" description="Removes every saved icon from this computer. Items show their first letter until an icon is fetched again."><Button size="sm" icon="eraser">Clear icon cache</Button></SettingRow>
      </div>
    </section>
  );
}

export function ExtTheme_Popup() {
  return (
    <div className="ds-ext-duo">
      <div data-theme="light" className="ds-ext-themed"><Shot label="Light" size="380 × 580"><ThemedPopup /></Shot></div>
      <div data-theme="dark" className="ds-ext-themed"><Shot label="Dark" size="380 × 580"><ThemedPopup /></Shot></div>
    </div>
  );
}

function ThemedPopup() {
  return (
    <Popup>
      <MainHead />
      <PopupTabs value="site" count={1} />
      <div className="px-body">
        <div className="stack">
          <div className="site-head">
            <span className="site-tile"><Icon name="globe-lock" size={16} /></span>
            <span className="site-text"><span className="site-host">vercel.com</span><span className="site-sub">1 login for this site</span></span>
            <Button size="sm" variant="ghost" icon="plus">New</Button>
          </div>
          <Callout tone="warning" title="Reused password">maya@example.com shares its password with Notion and Spotify. If one leaks, all of them are exposed.</Callout>
          <section className="sect">
            <Overline count={1}>Logins</Overline>
            <div className="matches"><Match title="Vercel" user="maya@example.com" sub="Default" src={LOGO.vercel} primary code /></div>
          </section>
          <section className="sect">
            <Overline count={1}>Also for this site</Overline>
            <ItemRow title="Hacker News" subtitle="maya_c" src={LOGO.hn} time="Tue" />
          </section>
        </div>
      </div>
      <PopupFoot />
    </Popup>
  );
}

export function ExtTheme_InPage() {
  return (
    <div className="ds-ext-duo">
      <div data-theme="light" className="ds-ext-themed"><Shot label="Light"><ThemedMenu /></Shot></div>
      <div data-theme="dark" className="ds-ext-themed"><Shot label="Dark"><ThemedMenu /></Shot></div>
    </div>
  );
}

function ThemedMenu() {
  return (
    <Frame>
      <div className="im">
        <MenuHead host="vercel.com" right={<Kbd keys={["↑", "↓"]} />} />
        <button type="button" className="im-row is-active">
          <ItemIcon name="Vercel" src={LOGO.vercel} size="sm" />
          <span className="row-text"><span className="row-title">maya@example.com</span><span className="row-sub">Vercel · Default · code ready</span></span>
          <Kbd keys={["↵"]} />
        </button>
        <button type="button" className="im-row">
          <ItemIcon name="Hacker News" src={LOGO.hn} size="sm" />
          <span className="row-text"><span className="row-title">maya_c</span><span className="row-sub">Hacker News · Default</span></span>
        </button>
        <div className="im-sep" />
        <button type="button" className="im-row im-action"><Icon name="search" size={16} /><span>Search the vault</span><Kbd keys={["⌥", "⇧", "A"]} /></button>
      </div>
    </Frame>
  );
}

export const specs = {
  ExtTheme_Popup: { title: "The popup in both themes", caption: "The popup follows the system theme. Logos sit on `logo-plate`; dark ink logos such as Vercel invert with `logo-ink-filter`.", stage: "plain", flip: false, pad: "24px 12px" },
  ExtTheme_InPage: { title: "In-page frames in both themes", caption: "Frames follow the browser's color scheme, not the page's, so the menu looks the same on every site.", stage: "plain", flip: false, pad: "24px 12px" },
  ExtPopup_Pairing: { title: "Pairing", caption: "`.px-pair`. With APM found, `pair-found` says so and Connect starts pairing. APM shows the same code; `pair-code` tiles split it 3 and 3 while `pair-wait` counts down.", stage: "subtle", pad: "28px 16px" },
  ExtPopup_NotRunning: { title: "APM not running", caption: "`pair-found is-off` in `warning-soft` before pairing. Once paired, the offline state is a centered `EmptyState` that names the port.", stage: "subtle", pad: "28px 16px" },
  ExtPopup_NoVault: { title: "No vault and starting", caption: "`.px-center` for single messages. While the popup loads, the app icon breathes with `.boot-mark`.", stage: "subtle", pad: "28px 16px" },
  ExtPopup_Locked: { title: "Locked", caption: "`.px-lock`: the one `display` headline, `PasswordInput`, Touch ID when it is set up, a note that the password goes to APM, and the cipher line at the foot.", stage: "subtle", pad: "28px 16px" },
  ExtPopup_ThisSite: { title: "This site", caption: "`.match` cards: the login, copy buttons and Fill (`primary` on the first match when the page has a form), and a live code in `match-code`. A login saved for another site asks before it fills.", stage: "subtle", pad: "28px 16px" },
  ExtPopup_VaultAndCodes: { title: "Vault and Codes", caption: "Vault groups `ItemRow` by recency under sticky `vgroup-head`s with the search and type filter pinned in `vault-tools`. Codes puts this site's codes first; a `code-row` copies on click.", stage: "subtle", pad: "28px 16px" },
  ExtPopup_Generator: { title: "Generator and the More menu", caption: "`.gen` reveals each new value out of a blur, digits in `accent` and symbols in `warning`. The More menu is a `Menu` aligned to the end of `px-head-actions`.", stage: "subtle", pad: "28px 16px" },
  ExtPopup_Detail: { title: "Item detail and new login", caption: "`fg-compact` narrows the label column to 92px. Websites lists every site of the login in `site-row`s with Add in the overline and a one-click row for the open tab. A new login takes several websites; `px-bar` holds the actions.", stage: "subtle", pad: "28px 16px" },
  ExtPopup_Passkeys: { title: "Passkeys and linking a login", caption: "`pk-row` lists every passkey with its site, user and item; rename and remove happen in place. Linking adds the open site to an existing login.", stage: "subtle", pad: "28px 16px" },
  ExtMenu_Login: { title: "Logins and passkeys", caption: "328px wide, 6px under the focused field. The head names the host. ↑ ↓ move `is-active`, ↵ fills it, passkeys follow under an `overline`, and Search the vault opens the popup.", span: "half", height: 420, stage: "dots" },
  ExtMenu_Code: { title: "One-time code", caption: "On a code field the matching login is already `is-active` with its live code. Enter fills it.", span: "half", height: 420 },
  ExtMenu_NewPassword: { title: "New password", caption: "On a sign-up form the menu offers one strong password. Options opens the compact generator in place.", span: "half", height: 330 },
  ExtMenu_Locked: { title: "Locked", caption: "Never a password field in the page. The menu sends you to the toolbar.", span: "half", height: 330 },
  ExtMenu_Blocked: { title: "Blocked", caption: "http pages, frames from other sites and paused sites say why APM stays quiet.", span: "half", height: 220 },
  ExtMenu_Connect: { title: "Not connected", caption: "Before pairing, or when APM is not running.", span: "half", height: 220 },
  ExtPrompt_Save: { title: "Save note", caption: "`.np` in a 360px frame, 12px from the top-right corner, after you sign in. The Not now menu also offers Never for the host. The password stays masked until you reveal it.", stage: "plain", pad: "24px" },
  ExtPrompt_Update: { title: "Update note", caption: "`np-diff` compares the saved and the new password by strength, never by value.", span: "half", height: 360 },
  ExtPrompt_Toast: { title: "Toasts", caption: "`pr-toast` confirms a save or a choice in the same corner, under any note, and leaves after 3.6s.", span: "half", height: 360 },
  ExtPrompt_PasskeyCreate: { title: "Passkey sheet", caption: "`.sheet` in a 400px frame, centered over an `overlay` scrim because the page asked for it. `pick is-on` shows where the passkey goes; Change opens the list.", stage: "plain", pad: "24px" },
  ExtPrompt_PasskeyStates: { title: "Passkey sheet, locked and sign-in", caption: "Locked, `sheet-locked` explains and waits: the sheet picks up as soon as APM unlocks, and without Touch ID the action is Unlock in the toolbar. Signing in lists passkeys as `pick` rows with a `pick-mark`; double-click signs in at once.", stage: "dots", pad: "28px 16px" },
  ExtOptions_Connection: { title: "Connection", caption: "`.opt`: a 232px `bg-subtle` side with `NavItem`s and a live badge, and a main column capped at 640px. The bridge diagram animates while paired and unlocked.", stage: "subtle", pad: "24px" },
  ExtOptions_Welcome: { title: "Welcome and pairing", caption: "Opened once after install. Steps turn `is-done` as APM is found, paired and unlocked.", stage: "subtle", pad: "24px" },
  ExtOptions_Autofill: { title: "Autofill", caption: "Groups of `SettingRow`s with an `opt-group-title` and an optional `opt-group-foot`.", stage: "subtle", pad: "24px" },
  ExtOptions_Passkeys: { title: "Passkeys", stage: "subtle", pad: "24px" },
  ExtOptions_Security: { title: "Security", stage: "subtle", pad: "24px" },
  ExtOptions_Shortcuts: { title: "Shortcuts", caption: "Chrome owns the keys; the page shows them with `Kbd` and links to Chrome's shortcuts page.", stage: "subtle", pad: "24px" },
  ExtOptions_ExcludedSites: { title: "Excluded sites", caption: "`site-add` puts the host, the rule and Add on one row.", stage: "subtle", pad: "24px" },
  ExtOptions_About: { title: "About", stage: "subtle", pad: "24px" },
  ExtOptions_Narrow: { title: "Narrow", caption: "Under 720px `.opt.is-narrow` stacks the side on top, swaps the nav for a `Select` and turns the bridge vertical.", stage: "subtle", pad: "24px" },
  ExtApp_PairDialog: { title: "Pairing dialog", caption: "A `Dialog` in the desktop app, raised when a browser asks to pair. The code matches the popup's; it expires after 2 minutes.", height: 520 },
  ExtApp_BrowserExtension: { title: "Settings, Browser extension", caption: "The bridge status, a pending request with Deny and Connect, and how to connect. The saved passkeys follow on the same page.", stage: "subtle", pad: "28px 24px" },
  ExtApp_SavedPasskeys: { title: "Saved passkeys", caption: "Every passkey with its site, label, item and use count.", span: "half", stage: "subtle", pad: "24px 16px" },
  ExtApp_WebsiteIcons: { title: "Website icons", caption: "Settings, Appearance. Turning icons off applies to the app and the extension.", span: "half", stage: "subtle", pad: "24px 16px" }
};
