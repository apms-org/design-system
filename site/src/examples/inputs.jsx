import { Row, Stack, Grid } from "../lib/ui.jsx";

const { Input, PasswordInput, SearchField, Select, Textarea, Checkbox, Switch, SegmentedControl, Slider, IconButton, Kbd } = window.APM;
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
      <PasswordInput defaultValue="hunter2" error="Incorrect password. 4 attempts left before a 30 second wait." invalid />
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
  Slider_Length: { caption: "Always show the current value next to it in `mono`.", span: "half" }
};

export const notes = {
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
