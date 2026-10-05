import { Row, Stack, Grid } from "../lib/ui.jsx";

const { NavItem, Tabs, SettingRow, FieldGroup, Switch, Select, SegmentedControl, Button, Stepper } = window.APM;
const { useState } = React;

export function NavItem_Sidebar() {
  return (
    <Stack gap={1} width={232}>
      <NavItem icon="layers" label="All items" count={21} active />
      <NavItem icon="star" label="Favorites" count={4} />
      <NavItem icon="timer" label="Authenticator" count={6} />
      <NavItem icon="shield-alert" label="Watchtower" badge={{ tone: "warning", text: "3" }} />
      <NavItem icon="trash-2" label="Trash" count={2} />
      <NavItem icon="lock" label="Lock vault" kbd="⌘ L" />
    </Stack>
  );
}

export function NavItem_Types() {
  return (
    <Stack gap={1} width={232}>
      <NavItem icon="globe" label="Logins" count={12} />
      <NavItem icon="key-round" label="API keys" count={3} />
      <NavItem icon="terminal" label="SSH keys" count={2} />
      <NavItem icon="credit-card" label="Cards" count={2} />
      <NavItem icon="wifi" label="Wi-Fi" count={1} />
      <NavItem icon="sticky-note" label="Secure notes" count={1} />
    </Stack>
  );
}

export function Tabs_Basic() {
  return <Tabs label="Item views" items={["Item", "History", "Sharing"]} defaultValue="Item" />;
}

export function Tabs_Counts() {
  return (
    <Tabs
      label="Watchtower"
      defaultValue="all"
      items={[
        { value: "all", label: "All issues", count: 7 },
        { value: "weak", label: "Weak", icon: "gauge", count: 3 },
        { value: "reused", label: "Reused", icon: "copy", count: 2 },
        { value: "old", label: "Old", icon: "clock", count: 2 }
      ]}
    />
  );
}

export function SettingRow_Group() {
  return (
    <Stack width={560}>
      <FieldGroup>
        <SettingRow icon="fingerprint" title="Unlock with Touch ID" description="Your master password is still required after a restart.">
          <Switch label="Unlock with Touch ID" defaultChecked />
        </SettingRow>
        <SettingRow icon="clock" title="Lock after" description="Locks when the vault is idle.">
          <Select size="sm" defaultValue="15 minutes" options={["5 minutes", "15 minutes", "1 hour", "Never"]} />
        </SettingRow>
        <SettingRow icon="timer" title="Clear clipboard" description="Copied secrets are wiped after this long.">
          <SegmentedControl label="Clear clipboard" options={["15s", "30s", "60s"]} defaultValue="30s" />
        </SettingRow>
      </FieldGroup>
    </Stack>
  );
}

export function SettingRow_Danger() {
  return (
    <Stack width={560}>
      <FieldGroup>
        <SettingRow icon="download" title="Export vault" description="An encrypted .apmx file you can import on another machine.">
          <Button size="sm">Export</Button>
        </SettingRow>
        <SettingRow icon="trash-2" title="Delete vault" description="Removes every item on this device. This cannot be undone." danger>
          <Button size="sm" variant="danger">Delete vault</Button>
        </SettingRow>
      </FieldGroup>
    </Stack>
  );
}

export function Stepper_Inline() {
  const [step, setStep] = useState("review");
  return <Stepper items={[{ value: "source", label: "Source" }, { value: "review", label: "Review" }, { value: "done", label: "Done" }]} value={step} onChange={setStep} />;
}

export function Stepper_Spread() {
  const steps = ["Email", "Code", "Recovery key", "Second factor", "New password"];
  return (
    <Stack width={520}>
      <Stepper layout="spread" items={steps} value="Recovery key" label="Recovery" />
    </Stack>
  );
}

export const specs = {
  NavItem_Sidebar: { caption: "Counts in `text-tertiary`, a `warning` badge for Watchtower, a shortcut for Lock vault.", span: "half", stage: "subtle" },
  NavItem_Types: { caption: "One icon per item type, the same icons as the tiles.", span: "half", stage: "subtle" },
  Tabs_Basic: { caption: "Underline tabs with a sliding `text` bar.", span: "half" },
  Tabs_Counts: { caption: "Add `count` when the number helps choose.", span: "half" },
  SettingRow_Group: { caption: "Rows stack in a `FieldGroup` with hairlines between them." },
  SettingRow_Danger: { caption: "`danger` for destructive rows. The button repeats the verb." },
  Stepper_Inline: { caption: "Import and export: Source, Review, Done. Finished steps are buttons back.", span: "half" },
  Stepper_Spread: { caption: "`layout=\"spread\"` for a flow that owns the screen, such as recovering a vault.", span: "half" }
};

export const notes = {
  NavItem: {
    do: ["Keep labels to one or two words.", "Replace the count with a `badge` only when it needs attention."],
    dont: ["Color the icon of the active row; weight and `fill-active` mark it.", "Show a count of 0; hide it instead."]
  },
  Tabs: {
    do: ["Use tabs for views of the same object.", "Keep 2 to 5 tabs with short nouns."],
    dont: ["Use tabs to move between unrelated pages.", "Nest tabs inside tabs."]
  },
  SettingRow: {
    do: ["Write the title as the thing being set and the description as its effect.", "Group related rows in one `FieldGroup`."],
    dont: ["Put two controls in one row.", "Hide destructive rows among ordinary ones; place them last."]
  }
};
