import { Row, Stack, Grid } from "../lib/ui.jsx";

const { Avatar, Badge, Callout, EmptyState, Progress, Toast, Button, Status, Meter, CodeBlock, StepList, Command, PageHeader, Card, SettingRow, KeyValueList, KeyValue, Select } = window.APM;
const { useState } = React;

export function Avatar_Sizes() {
  return (
    <Row gap={12} align="center">
      <Avatar name="Maya Chen" size={20} />
      <Avatar name="Maya Chen" />
      <Avatar name="Maya Chen" size={32} />
      <Avatar name="Maya Chen" size={40} />
    </Row>
  );
}

export function Avatar_Tones() {
  return (
    <Row gap={12} align="center">
      <Avatar name="Claude Desktop" size={32} />
      <Avatar name="Cursor" size={32} tone="accent" />
      <Avatar name="Work laptop" size={32} tone="success" />
      <Avatar name="Build server" size={32} tone="warning" />
      <Avatar name="Unknown client" size={32} tone="danger" />
    </Row>
  );
}

export function Badge_Tones() {
  return (
    <Row gap={8}>
      <Badge icon="globe">Login</Badge>
      <Badge tone="accent" icon="fingerprint">Passkey</Badge>
      <Badge tone="success" icon="shield-check">2FA on</Badge>
      <Badge tone="warning" icon="triangle-alert">Reused</Badge>
      <Badge tone="danger" icon="shield-alert">Compromised</Badge>
    </Row>
  );
}

export function Badge_Styles() {
  return (
    <Row gap={8}>
      <Badge size="sm">Default</Badge>
      <Badge size="sm" tone="warning">3</Badge>
      <Badge dot tone="success">Synced</Badge>
      <Badge dot tone="warning">Syncing</Badge>
      <Badge outline>work</Badge>
      <Badge outline>finance</Badge>
    </Row>
  );
}

export function Callout_Tones() {
  return (
    <Stack width={620}>
      <Callout tone="warning" title="Reused password" action={<Button size="sm">Change password</Button>}>
        The same password is saved in Notion and Spotify. If one leaks, all three are exposed.
      </Callout>
      <Callout tone="danger" title="Found in a breach">This password appeared in a public breach on Aug 2. Change it now.</Callout>
      <Callout tone="accent" title="Recovery is on">Two of your three recovery contacts can restore this vault.</Callout>
      <Callout tone="success" title="All clear">No weak, reused or exposed passwords.</Callout>
      <Callout title="Stored locally">This vault never leaves this device unless sync is on.</Callout>
    </Stack>
  );
}

export function EmptyState_Search() {
  return (
    <EmptyState icon="search" title={'No matches for "stripe"'} action={<Button size="sm">Clear search</Button>}>
      Search looks at names, usernames, websites, types and spaces.
    </EmptyState>
  );
}

export function EmptyState_Trash() {
  return (
    <EmptyState icon="trash-2" title="Trash is empty">
      Deleted items stay here for 30 days.
    </EmptyState>
  );
}

export function Progress_Tones() {
  return (
    <Stack gap={18} width={360}>
      <Progress value={42} label="Importing" />
      <Progress value={100} tone="success" label="Synced" />
      <Progress value={64} tone="warning" label="Storage" />
      <Progress value={92} tone="danger" label="Attempts used" />
      <Progress indeterminate label="Deriving key" />
    </Stack>
  );
}

export function Toast_Tones() {
  return (
    <Stack align="center">
      <Toast title="Item saved" />
      <Toast title="Identifier copied" tone="neutral" icon="copy" />
      <Toast title="Sync failed" description="The server did not answer. Retrying in 30s." tone="danger" />
    </Stack>
  );
}

export function Toast_Countdown() {
  const [round, setRound] = useState(0);
  return <Toast key={round} title="Copied password" countdown={30} onDone={() => setRound(round + 1)} />;
}

export function Toast_Action() {
  return <Toast title="Item moved to Trash" tone="neutral" icon="trash-2" action={<Button size="sm" variant="ghost">Undo</Button>} />;
}

export function Status_Tones() {
  return (
    <Row gap={20}>
      <Status tone="success">Up to date</Status>
      <Status tone="warning">Newer than APM</Status>
      <Status tone="danger">Last sync failed</Status>
      <Status tone="accent" pulse>2 waiting for you</Status>
      <Status>Locked</Status>
    </Row>
  );
}

export function Meter_Scores() {
  return (
    <Row gap={32} align="center">
      <Meter value={86} tone="success" size={132} sub="of 100" />
      <Meter value={58} tone="warning" size={96} stroke={8} />
      <Meter value={24} tone="danger" size={72} stroke={6} />
    </Row>
  );
}

export function CodeBlock_Config() {
  return (
    <Stack width={520}>
      <CodeBlock label="Manual setup · any MCP client" maxHeight={180}>{JSON.stringify({ mcpServers: { apm: { command: "pm", args: ["mcp", "serve", "--token", "<your token>"] } } }, null, 2)}</CodeBlock>
    </Stack>
  );
}

export function CodeBlock_Key() {
  return (
    <Stack width={420}>
      <CodeBlock label="Retrieval key" copy="RK-7F2Q-9XMA-44TB-L0PE" wrap>RK-7F2Q-9XMA-44TB-L0PE</CodeBlock>
    </Stack>
  );
}

export function StepList_Extension() {
  return (
    <Stack width={520}>
      <StepList items={[
        "Install APM for Chrome in Chrome, Arc or Brave.",
        <span>Open it from the toolbar and choose <b>Connect</b>.</span>,
        <span>If the app is closed, link the browser once:<CodeBlock copy="pm extension link">pm extension link</CodeBlock></span>
      ]} />
    </Stack>
  );
}

export function PageHeader_Settings() {
  return (
    <Stack width={640}>
      <PageHeader title="Sessions" description="When the vault locks itself, how long this unlock lasts, and short-lived sessions you hand to scripts, CI and agents.">
        <Command cmd="pm session list" />
      </PageHeader>
    </Stack>
  );
}

export function PageHeader_View() {
  return (
    <Stack width={720}>
      <PageHeader size="lg" title="Watchtower" description="Checks run locally against your decrypted vault. Nothing is sent anywhere." actions={<Button size="sm" icon="eraser">Clean up</Button>}>
        <Command cmd="pm health" /><Command cmd="pm trust" />
      </PageHeader>
    </Stack>
  );
}

export function Card_Settings() {
  return (
    <Stack width={600}>
      <Card title="Clipboard" flush>
        <SettingRow title="Clear clipboard" description="After you copy a secret. Only clears it if it still holds what APM copied."><Select size="sm" defaultValue="30" options={[{ value: "10", label: "After 10 seconds" }, { value: "30", label: "After 30 seconds" }, { value: "90", label: "After 90 seconds" }]} /></SettingRow>
      </Card>
    </Stack>
  );
}

export function Card_Footer() {
  return (
    <Stack width={600}>
      <Card title="This session" footNote={<Command cmd="pm lock" />} footer={<Button size="sm" variant="primary" icon="lock" kbd={["⌘", "L"]}>Lock now</Button>}>
        <span className="small">Unlocked 12 minutes ago · locks in 2h 48m</span>
      </Card>
    </Stack>
  );
}

export function Card_Danger() {
  return (
    <Stack width={600}>
      <Card danger title="Danger zone" flush>
        <SettingRow danger icon="triangle-alert" title="Destroy this vault" description="Deletes vault.dat, its history snapshots and sessions from this Mac. There is no undo, and synced copies are not touched."><Button size="sm" variant="danger">Destroy vault</Button></SettingRow>
      </Card>
    </Stack>
  );
}

export function KeyValue_Commit() {
  return (
    <Stack width={560}>
      <KeyValueList>
        <KeyValue label="Commit" mono copy="c_9f2a71d04e">c_9f2a71d04e</KeyValue>
        <KeyValue label="Time">Oct 5, 2026, 8:26 PM</KeyValue>
        <KeyValue label="Data hash" mono>4be1c0f37a9d22e8b6f0a1c95d3e7b40…</KeyValue>
        <KeyValue label="Signature"><Badge size="sm" tone="success" icon="check-check">Verified</Badge></KeyValue>
      </KeyValueList>
    </Stack>
  );
}

export const specs = {
  Avatar_Sizes: { caption: "Initials, sized in pixels.", span: "half" },
  Avatar_Tones: { caption: "Tones mark trust for clients and devices.", span: "half" },
  Badge_Tones: { caption: "Each tone travels with an icon or a word." },
  Badge_Styles: { caption: "`sm` for counts, `dot` for live state, `outline` for tags." },
  Callout_Tones: { caption: "Title states the fact, body says why it matters, `action` offers the fix." },
  EmptyState_Search: { caption: "Say what would be here and how to get it.", span: "half", height: 240 },
  EmptyState_Trash: { caption: "One sentence, no action when there is nothing to do.", span: "half", height: 240 },
  Progress_Tones: { caption: "A thin 4px bar. Determinate for known work, `indeterminate` when the end is unknown." },
  Toast_Tones: { caption: "Past tense titles. Success, neutral and danger.", span: "half", height: 220 },
  Toast_Countdown: { caption: "Secrets pass `countdown`: the ring drains as the clipboard timer runs.", span: "half", height: 220 },
  Toast_Action: { caption: "An undo action for reversible changes.", span: "half" },
  Status_Tones: { caption: "A dot and a word. `pulse` only while something waits for you." },
  Meter_Scores: { caption: "Watchtower's vault health. The tone follows the score; the arc fills when it mounts." },
  CodeBlock_Config: { caption: "Config to paste whole, with a label that says where it goes.", span: "half", height: 300 },
  CodeBlock_Key: { caption: "`wrap` for long one-line values; `copy` sets the exact text copied.", span: "half", height: 300 },
  StepList_Extension: { caption: "Numbered steps you follow once. A step can carry the command to run.", height: 300 },
  PageHeader_Settings: { caption: "Each Settings page: a 24px title, one line on what it controls, and the `pm` command." },
  PageHeader_View: { caption: "`size=\"lg\"` on top-level views, with the view's actions on the right." },
  Card_Settings: { caption: "`flush` runs `SettingRow`s edge to edge, with a hairline between each.", span: "half", height: 240 },
  Card_Footer: { caption: "`footNote` for the fine print or the `pm` command, `footer` for the card's buttons.", span: "half", height: 240 },
  Card_Danger: { caption: "`danger` for destructive work, once per page: Settings, Maintenance.", height: 220 },
  KeyValue_Commit: { caption: "Read-only facts. `mono` for hashes and IDs, `copy` for values you paste elsewhere.", height: 260 }
};

export const notes = {
  Status: {
    do: ["Always pass the word.", "Use `accent` with `pulse` while something waits for the person."],
    dont: ["Show the dot alone.", "Use it inside item lists; use `Badge` there."]
  },
  Meter: {
    do: ["Use it once per screen, for the score the screen is about.", "Name the scale with `sub`."],
    dont: ["Use it for progress through work; use `Progress`.", "Color the number; the ring carries the tone."]
  },
  CodeBlock: {
    do: ["Label what it is and where it goes.", "Keep placeholders obvious: `<your token>`."],
    dont: ["Put a live secret in a block that stays on screen.", "Use it for one short command; use `Command`."]
  },
  Card: {
    do: ["Title it with a noun.", "Put the cost of a change in `footNote` and the buttons in `footer`."],
    dont: ["Nest cards.", "Use `danger` for anything that can be undone."]
  },
  PageHeader: {
    do: ["Use one per page, above everything.", "Say in one sentence what the page controls."],
    dont: ["Put more than one `primary` in `actions`.", "Write the title as a sentence."]
  },
  KeyValue: {
    do: ["Use it for facts you check, not settings you change.", "Set `mono` on hashes, paths and IDs."],
    dont: ["Show secrets in it.", "Use it for editable values; use `SettingRow`."]
  },
  Avatar: {
    do: ["Use it for people, MCP clients and devices.", "Keep the name meaningful so initials read well."],
    dont: ["Use it for vault items; items use `ItemIcon`.", "Load remote profile images."]
  },
  Badge: {
    do: ["Keep it to one or two words.", "Pair status tones with an icon or a word."],
    dont: ["Use a colored badge without text.", "Line up more than three badges on one item."]
  },
  Callout: {
    do: ["State the fact in the title and why it matters in the body.", "Offer the fix as the `action`."],
    dont: ["Stack several callouts of the same tone; merge them.", "Use a callout for confirmations; use a `Toast`."]
  },
  EmptyState: {
    do: ["Say what would be here and how to get it.", "Offer at most one action."],
    dont: ["Write \"Nothing here\" or apologize.", "Add illustrations; the tile and one line are enough."]
  },
  Progress: {
    do: ["Use determinate bars when the total is known.", "Label it for assistive tech with `label`."],
    dont: ["Show a bar for work under half a second.", "Use it as a decorative divider."]
  },
  Toast: {
    do: ["Show one after every copy, save and delete.", "Match the clipboard countdown to the real wipe time."],
    dont: ["Stack toasts; a new one replaces the old.", "Put long explanations in a toast."]
  }
};
