import { Row, Stack, Grid } from "../lib/ui.jsx";

const { Button, IconButton, Kbd, Tooltip, Icon } = window.APM;

export function Button_Variants() {
  return (
    <Row>
      <Button variant="primary" icon="plus">New item</Button>
      <Button icon="pencil">Edit</Button>
      <Button variant="ghost" icon="history">History</Button>
      <Button variant="danger" icon="trash-2">Delete item</Button>
    </Row>
  );
}

export function Button_Sizes() {
  return (
    <Stack>
      <Row>
        <Button variant="primary" size="sm" icon="plus">New</Button>
        <Button variant="primary" icon="plus">New</Button>
        <Button variant="primary" size="lg" icon="plus">New</Button>
      </Row>
      <Row>
        <Button size="sm">Share</Button>
        <Button>Share</Button>
        <Button size="lg">Share</Button>
      </Row>
    </Stack>
  );
}

export function Button_States() {
  return (
    <Row>
      <Button kbd="⌘ E">Edit</Button>
      <Button iconRight="arrow-up-right" href="#/downloads">View downloads</Button>
      <Button variant="primary" loading>Saving</Button>
      <Button disabled>Export</Button>
      <Button variant="primary" disabled>Unlock</Button>
    </Row>
  );
}

export function Button_Block() {
  return (
    <Stack width={320}>
      <Button variant="primary" size="lg" block icon="lock-open">Unlock</Button>
      <Button size="lg" block icon="fingerprint">Unlock with Touch ID</Button>
    </Stack>
  );
}

export function IconButton_Variants() {
  return (
    <Row>
      <IconButton icon="copy" label="Copy password" />
      <IconButton icon="eye" label="Reveal" />
      <IconButton icon="ellipsis" label="More" />
      <IconButton icon="copy" label="Copy password" variant="secondary" />
      <IconButton icon="lock" label="Lock vault" variant="secondary" kbd="⌘ L" />
    </Row>
  );
}

export function IconButton_Sizes() {
  return (
    <Row>
      <IconButton icon="star" label="Favorite" size="xs" />
      <IconButton icon="star" label="Favorite" />
      <IconButton icon="star" label="Favorite" size="md" />
      <IconButton icon="star" label="Favorite" size="md" variant="secondary" />
    </Row>
  );
}

export function IconButton_States() {
  return (
    <Row>
      <IconButton icon="star" label="Remove from favorites" active filled />
      <IconButton icon="check" label="Copied" tone="success" />
      <IconButton icon="trash-2" label="Delete" disabled />
    </Row>
  );
}

export function Kbd_Keys() {
  return (
    <Row>
      <Kbd keys={["⌘", "K"]} />
      <Kbd>⌘ L</Kbd>
      <Kbd keys={["⇧", "⌘", "C"]} />
      <Kbd keys={["⌥", "⌘", "N"]} />
      <Kbd keys={["Esc"]} />
      <Kbd keys={["↑", "↓"]} />
      <Kbd keys={["↵"]} />
    </Row>
  );
}

export function Kbd_InContext() {
  return (
    <Row>
      <Button kbd="⌘ N" variant="primary" icon="plus">New</Button>
      <Button kbd="⌘ L" icon="lock">Lock vault</Button>
      <Button kbd="⇧ ⌘ C" variant="ghost" icon="copy">Copy password</Button>
    </Row>
  );
}

export function Tooltip_Wrapping() {
  return (
    <Row>
      <Tooltip label="Generate password" kbd="⌘ G">
        <Button icon="dices">Generate</Button>
      </Tooltip>
      <Tooltip label="Synced 2m ago" side="top">
        <Button variant="ghost" icon="cloud-check">Synced</Button>
      </Tooltip>
      <IconButton icon="lock" label="Lock vault" kbd="⌘ L" variant="secondary" />
    </Row>
  );
}

export function Tooltip_Anatomy() {
  return (
    <Row gap={160}>
      <span className="apm-tip-wrap">
        <IconButton icon="copy" label="Copy password" tip={false} variant="secondary" />
        <span className="apm-tip is-bottom" role="tooltip"><span>Copy password</span><Kbd keys={["⇧", "⌘", "C"]} /></span>
      </span>
      <span className="apm-tip-wrap">
        <IconButton icon="eye" label="Reveal" tip={false} variant="secondary" />
        <span className="apm-tip is-bottom" role="tooltip"><span>Reveal</span></span>
      </span>
    </Row>
  );
}

export function Button_Link() {
  return (
    <Stack gap={12}>
      <span className="small">No details yet. <Button variant="link">Add some</Button></span>
      <span className="caption"><Button variant="link"><Icon name="history" size={12} />3 earlier versions</Button></span>
    </Stack>
  );
}

export const specs = {
  Button_Variants: { caption: "Primary is ink and appears once per view. Secondary is the default." },
  Button_Sizes: { caption: "`sm` 28px in pane headers, `md` 32px by default, `lg` 40px on the lock screen and in dialogs." },
  Button_States: { caption: "A shortcut, a link, loading (keeps its width), and disabled." },
  Button_Block: { caption: "`block` fills the container, as on the lock screen.", span: "half" },
  Button_Link: { caption: "`link` sits inside a sentence and takes its size.", span: "half" },
  IconButton_Variants: { caption: "Ghost by default; secondary when it stands alone on a surface. Hover for the tooltip." },
  IconButton_Sizes: { caption: "`xs` 24px inside dense rows, `sm` 28px by default, `md` 32px.", span: "half" },
  IconButton_States: { caption: "Active, the copied state, and disabled.", span: "half" },
  Kbd_Keys: { caption: "One cap per key. Symbols for modifiers, capitals for letters." },
  Kbd_InContext: { caption: "Inside a button through the `kbd` prop." },
  Tooltip_Wrapping: { caption: "Hover or focus a control. `IconButton` shows its tooltip from `label` and `kbd`.", height: 150, overflow: true },
  Tooltip_Anatomy: { title: "Anatomy", caption: "Inverted: `text` on `bg`, one line, with its shortcut.", code: false, height: 120, align: "flex-start", pad: "32px 24px 56px" }
};

export const notes = {
  Button: {
    do: ["Use one `primary` per view for the thing the view is for.", "Lead with the verb in sentence case: \"Copy password\", \"Lock vault\".", "Keep `loading` on the same button so the width does not jump."],
    dont: ["Put two primary buttons side by side.", "Use `danger` for anything that is not a destructive confirmation.", "Write \"OK\", \"Submit\" or Title Case labels."]
  },
  IconButton: {
    do: ["Always pass `label`; it becomes the accessible name and the tooltip.", "Use `xs` inside field rows and list rows.", "Show the copied state with `tone=\"success\"` and a check."],
    dont: ["Use an icon button for an action whose icon is ambiguous; use a `Button` with a label.", "Stack several `secondary` icon buttons on a busy toolbar."]
  },
  Kbd: {
    do: ["Show the shortcut next to the action it triggers.", "Use ⌘ ⇧ ⌥ ⌃ for modifiers and capitals for letters."],
    dont: ["Write \"Cmd+K\" or \"ctrl-k\" as plain text.", "Show shortcuts that do not exist on the current platform."]
  },
  Tooltip: {
    do: ["Label controls that have no visible text.", "Keep it to one line in sentence case, with its shortcut."],
    dont: ["Put essential information only in a tooltip.", "End the label with a full stop, or put links inside it."]
  }
};
