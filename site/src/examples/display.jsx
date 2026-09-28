import { Row, Stack, Grid } from "../lib/ui.jsx";

const { Avatar, Badge, Callout, EmptyState, Progress, Toast, Button } = window.APM;
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
      Search looks at names, usernames, types and tags.
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
  Toast_Action: { caption: "An undo action for reversible changes.", span: "half" }
};

export const notes = {
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
