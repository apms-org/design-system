import { Row, Stack, Grid } from "../lib/ui.jsx";

const { Input, PasswordInput, SearchField, Select, Textarea, Checkbox, Switch, SegmentedControl, Slider, IconButton, Kbd, Chip, Hint, ChoiceGroup, ChoiceTile, Badge, Icon } = window.APM;
const { useState } = React;

export function Input_Basic() {
  return (
    <Grid cols={2}>
      <Input label="Username" placeholder="you@example.com" defaultValue="maya@example.com" />
      <Input label="Website" icon="globe" placeholder="github.com" hint="Used to match this login to the site." />
    </Grid>
  );
}

export function Input_Sizes() {
  return (
    <Stack width={360}>
      <Input size="sm" placeholder="Small, 28px" />
      <Input placeholder="Medium, 32px" />
      <Input size="lg" placeholder="Large, 40px" />
    </Stack>
  );
}

export function Input_States() {
  return (
    <Grid cols={2}>
      <Input label="Vault name" defaultValue="Personal/" invalid hint="Names cannot contain a slash." />
      <Input label="Recovery email" defaultValue="maya@example.com" hint="Change it in Recovery settings." hintTone="warning" />
      <Input label="Cipher" defaultValue="XChaCha20-Poly1305" disabled />
      <Input label="API key" icon="key-round" defaultValue="sk_live_51H8" trailing={<IconButton icon="copy" label="Copy" size="xs" />} />
    </Grid>
  );
}

export function PasswordInput_States() {
  return (
    <Grid cols={2}>
      <PasswordInput />
      <PasswordInput defaultValue="correct horse battery" hint="Caps Lock is detected as you type." />
      <PasswordInput defaultValue="hunter2" error="Incorrect password. 4 attempts left before a wait." invalid />
      <PasswordInput defaultValue="correct horse battery" busy />
    </Grid>
  );
}

export function SearchField_States() {
  return (
    <Grid cols={2}>
      <SearchField placeholder="Search 21 items" />
      <SearchField placeholder="Search 21 items" defaultValue="stripe" />
      <SearchField placeholder="Search settings" size="sm" shortcut={null} />
    </Grid>
  );
}

export function Select_Basic() {
  return (
    <Grid cols={2}>
      <Select label="Lock after" icon="clock" defaultValue="15 minutes" options={["1 minute", "5 minutes", "15 minutes", "1 hour", "Never"]} hint="Locks when the vault is idle." />
      <Select label="Cipher" options={[{ value: "xchacha", label: "XChaCha20-Poly1305" }, { value: "aes", label: "AES-256-GCM" }]} />
      <Select size="sm" options={["Recently used", "Name", "Created"]} />
      <Select label="Key derivation" options={["Argon2id"]} disabled />
    </Grid>
  );
}

export function Textarea_Variants() {
  return (
    <Grid cols={2}>
      <Textarea label="Notes" rows={4} defaultValue="Recovery codes live in their own item. Rotate the deploy key after the audit." />
      <Textarea label="Private key" mono rows={4} defaultValue={"-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAE\n-----END OPENSSH PRIVATE KEY-----"} />
      <Textarea label="Recovery codes" mono rows={3} invalid hint="Paste all 10 codes, one per line." defaultValue="4f2a-91c0" />
    </Grid>
  );
}

export function Checkbox_States() {
  return (
    <Stack gap={14}>
      <Checkbox label="Uppercase letters" defaultChecked />
      <Checkbox label="Digits" description="0 to 9, spread through the password." defaultChecked />
      <Checkbox label="Symbols" description="Some sites reject symbols; turn them off if saving fails." />
      <Checkbox label="Avoid look-alike characters" disabled />
    </Stack>
  );
}

export function Switch_States() {
  return (
    <Row gap={20}>
      <Switch label="On" defaultChecked />
      <Switch label="Off" />
      <Switch label="On, disabled" defaultChecked disabled />
      <Switch label="Off, disabled" disabled />
    </Row>
  );
}

export function SegmentedControl_Text() {
  return (
    <Stack align="flex-start">
      <SegmentedControl label="Clipboard timeout" options={["15s", "30s", "60s", "Never"]} defaultValue="30s" />
      <SegmentedControl label="Type" options={["All", "Logins", "Keys"]} defaultValue="All" />
    </Stack>
  );
}

export function SegmentedControl_Icons() {
  return (
    <SegmentedControl
      label="Theme"
      defaultValue="system"
      options={[
        { value: "light", label: "Light", icon: "sun" },
        { value: "dark", label: "Dark", icon: "moon" },
        { value: "system", label: "System", icon: "monitor" }
      ]}
    />
  );
}

export function Slider_Length() {
  const [length, setLength] = useState(24);
  return (
    <Row gap={16} wrap={false} style={{ width: 360 }}>
      <Slider label="Length" value={length} min={8} max={64} onChange={setLength} />
      <span className="mono">{length}</span>
    </Row>
  );
}

export function Chip_Filters() {
  const [kind, setKind] = useState("all");
  return (
    <Row gap={6}>
      {["all", "ADD", "EDIT", "GET", "DEL", "MERGE"].map((x) => <Chip key={x} selected={kind === x} onClick={() => setKind(x)}>{x === "all" ? "All" : x}</Chip>)}
    </Row>
  );
}

export function Chip_Presets() {
  return (
    <Row gap={6} align="center">
      <span className="small-medium">Start from</span>
      <Chip>Browse only</Chip>
      <Chip>Read secrets</Chip>
      <Chip>Assistant</Chip>
      <Chip>Everything</Chip>
    </Row>
  );
}

export function Hint_Tones() {
  return (
    <Stack gap={10} width={460}>
      <Hint>A private repository you own.</Hint>
      <Hint tone="warning" icon="info">Caps Lock is on</Hint>
      <Hint tone="danger" icon="triangle-alert">That file could not be read as an APM vault.</Hint>
    </Stack>
  );
}

export function ChoiceTile_Tiles() {
  const [src, setSrc] = useState("bitwarden");
  return (
    <Stack width={560}>
      <ChoiceGroup label="Import from" value={src} onChange={setSrc}>
        <ChoiceTile value="bitwarden" tile={{ name: "Bitwarden" }} title="Bitwarden" description="Tools > Export vault > .json. Passkeys come along." meta={<><Badge size="sm">Passkeys</Badge><Badge size="sm">Files</Badge></>} />
        <ChoiceTile value="csv" icon="file-text" title="CSV" description="Any app's CSV export. You map the columns." />
      </ChoiceGroup>
    </Stack>
  );
}

export function ChoiceTile_List() {
  const [profile, setProfile] = useState("hardened");
  return (
    <Stack width={560}>
      <ChoiceGroup columns={1} label="Encryption profile" value={profile} onChange={setProfile}>
        <ChoiceTile variant="list" value="standard" icon="shield" title="Standard" description="Fast unlocks on any machine. Strong against offline guessing." meta="Argon2id · t=3 · 64 MiB · p=2 · unlock about 0.3s" />
        <ChoiceTile variant="list" value="hardened" icon="shield-check" title="Hardened" badge={<Badge tone="accent" size="sm">Recommended</Badge>} description="Four times the memory cost. Recommended for most Macs." meta="Argon2id · t=5 · 256 MiB · p=4 · unlock about 1s" />
        <ChoiceTile variant="list" value="paranoid" icon="lock-keyhole" title="Paranoid" description="The highest cost APM offers. Each guess needs 512 MiB." meta="Argon2id · t=6 · 512 MiB · p=4 · unlock about 2s" />
      </ChoiceGroup>
    </Stack>
  );
}

export function ChoiceTile_Compact() {
  const [dest, setDest] = useState("");
  const dot = (c) => <span style={{ width: 10, height: 10, borderRadius: 999, background: c, flex: "none" }} />;
  return (
    <Stack width={360}>
      <ChoiceGroup columns={1} compact label="Space" value={dest} onChange={setDest}>
        <ChoiceTile variant="list" compact value="" leading={dot("var(--text-tertiary)")} title="Default" trailing={<span className="caption">14</span>} />
        <ChoiceTile variant="list" compact value="Work" leading={dot("var(--accent)")} title="Work" trailing={<span className="caption">6</span>} />
        <ChoiceTile variant="list" compact value="Family" leading={dot("var(--success)")} title="Family" trailing={<span className="caption">3</span>} />
      </ChoiceGroup>
    </Stack>
  );
}

export function ChoiceTile_Arrows() {
  return (
    <Stack gap={8} width={420}>
      <ChoiceTile variant="list" arrow icon="plus" title="Create a new vault" description="Set a master password and pick how hard the key is to crack." />
      <ChoiceTile variant="list" arrow icon="folder-open" title="Open an existing vault" description="Choose a vault.dat made by pm or another Mac." />
      <ChoiceTile variant="list" arrow icon="cloud-upload" title="Restore from cloud" description="Download your vault from Google Drive, GitHub or Dropbox." />
    </Stack>
  );
}

export const specs = {
  Input_Basic: { caption: "Every field has a `label` or a clear placeholder. Helper text goes in `hint`." },
  Input_Sizes: { caption: "`sm` 28px, `md` 32px, `lg` 40px.", span: "half" },
  Input_States: { caption: "Invalid, warning hint, disabled, and a `trailing` action. Click a field to see the focus halo." },
  PasswordInput_States: { caption: "Empty (the arrow is inert), typed (the arrow turns `primary`), error, and deriving the key." },
  SearchField_States: { caption: "Shows ⌘K while empty and a clear button once there is text." },
  Select_Basic: { caption: "A native select: the platform picker, keyboard and screen reader behavior come for free." },
  Textarea_Variants: { caption: "`mono` for keys and codes. Resizes vertically." },
  Checkbox_States: { caption: "For choices confirmed by a button, such as generator character sets.", span: "half", align: "flex-start", justify: "flex-start" },
  Switch_States: { caption: "Applies immediately. On is ink.", span: "half" },
  SegmentedControl_Text: { caption: "Two to five options, short labels.", span: "half" },
  SegmentedControl_Icons: { caption: "Add icons only when every option has one.", span: "half" },
  Slider_Length: { caption: "Always show the current value next to it in `mono`.", span: "half" },
  Chip_Filters: { caption: "Filter a log by kind. The selected chip turns ink.", span: "half" },
  Chip_Presets: { caption: "Preset chips act once and have no selected state.", span: "half" },
  Hint_Tones: { caption: "Help, a warning, and an error with the fix. Danger hints are announced." },
  ChoiceTile_Tiles: { caption: "Two columns of tiles in a `ChoiceGroup`: where an import comes from." },
  ChoiceTile_List: { caption: "`variant=\"list\"` in one column: the encryption profile, with the numbers in `meta`.", height: 340 },
  ChoiceTile_Compact: { caption: "`compact` one-line rows with a `leading` dot and a `trailing` count: moving items to a space.", span: "half", height: 240 },
  ChoiceTile_Arrows: { caption: "`arrow` tiles lead to the next screen. They are buttons, not a radio group.", span: "half", height: 300 }
};

export const notes = {
  Chip: {
    do: ["Keep labels to one or two words.", "Set `selected` on filters only."],
    dont: ["Use chips for two to four exclusive views; use `SegmentedControl`.", "Mix filter and preset chips in one row."]
  },
  ChoiceTile: {
    do: ["Put the numbers that decide the choice in `meta`.", "Use `arrow` tiles for the next step, outside any `ChoiceGroup`."],
    dont: ["Use a tile for an on and off setting; use `Switch`.", "Show third-party logos in the tile."]
  },
  Input: {
    do: ["Give every field a `label`, or a placeholder that names the value.", "Put the fix in the hint when `invalid`: what is wrong and what to type."],
    dont: ["Use the placeholder as the only label on forms with several fields.", "Show an error before the person has finished typing."]
  },
  PasswordInput: {
    do: ["Use it for the master password only.", "State attempts left and the wait in the error line."],
    dont: ["Clear the field on a wrong password; shake it and keep the value selected.", "Use it for item passwords; those live in `SecretField`."]
  },
  SearchField: {
    do: ["State the scope and count in the placeholder: \"Search 21 items\".", "Wire ⌘K to focus it through the forwarded ref."],
    dont: ["Hide the shortcut hint on the main list search.", "Search on Enter only; results update as you type."]
  },
  Select: {
    do: ["Use it for 4 or more fixed options.", "Keep option labels short and parallel."],
    dont: ["Use a select for 2 or 3 options; use `SegmentedControl`.", "Replace the native picker with a custom popover."]
  },
  Textarea: {
    do: ["Set `mono` for keys, certificates and recovery codes.", "Size it to the expected content with `rows`."],
    dont: ["Use it for single-line values.", "Let private keys wrap in a proportional font."]
  },
  Checkbox: {
    do: ["Use it for options confirmed by a button.", "Add a `description` when the consequence is not obvious."],
    dont: ["Use a checkbox for a setting that applies immediately; use `Switch`.", "Phrase labels as negatives, such as \"Don't use symbols\"."]
  },
  Switch: {
    do: ["Use it for settings that apply the moment they change.", "Pair it with a visible title in a `SettingRow`."],
    dont: ["Ask for confirmation after a switch flips.", "Use a switch inside a form that has a Save button."]
  },
  SegmentedControl: {
    do: ["Use it for 2 to 5 mutually exclusive views or values.", "Keep labels to one short word where possible."],
    dont: ["Mix options with and without icons.", "Use it for navigation between pages."]
  },
  Slider: {
    do: ["Show the live value in `mono` right next to the track.", "Pick bounds that are always safe, such as 8 to 64."],
    dont: ["Use a slider when an exact number must be typed.", "Hide the value until the person lets go."]
  }
};
