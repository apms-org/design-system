import { Row, Stack, Grid } from "../lib/ui.jsx";

const { Dialog, Menu, MenuList, CommandMenu, Button, IconButton, Input, Select } = window.APM;
const { useState } = React;

export function Dialog_Confirm() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button variant="danger" icon="trash-2" onClick={() => setOpen(true)}>Delete item</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        layer="contained"
        autoFocus={false}
        size="sm"
        icon="trash-2"
        tone="danger"
        title="Delete GitHub?"
        description="It moves to Trash for 30 days, then it is gone for good."
        footer={<>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setOpen(false)}>Delete item</Button>
        </>}
      />
    </>
  );
}

export function Dialog_Form() {
  return (
    <Dialog
      layer="none"
      title="New login"
      description="Saved to Personal. You can move it later."
      footerStart="XChaCha20-Poly1305"
      footer={<>
        <Button>Cancel</Button>
        <Button variant="primary">Save</Button>
      </>}
    >
      <Input label="Name" defaultValue="Linear" />
      <Input label="Username" defaultValue="maya@example.com" />
      <Select label="Space" options={["Personal", "Work"]} />
    </Dialog>
  );
}

export function Menu_Trigger() {
  return (
    <Menu
      label="Item actions"
      trigger={<IconButton icon="ellipsis" label="More" variant="secondary" />}
      items={[
        { label: "Copy password", icon: "copy", kbd: "⇧ ⌘ C" },
        { label: "Edit", icon: "pencil", kbd: "⌘ E" },
        { label: "Duplicate", icon: "copy-plus" },
        { separator: true },
        { label: "Delete", icon: "trash-2", danger: true }
      ]}
    />
  );
}

export function Menu_PanelOnly() {
  return (
    <MenuList
      label="Item actions"
      style={{ width: 240 }}
      items={[
        { section: "GitHub" },
        { label: "Copy username", icon: "user" },
        { label: "Copy password", icon: "copy", kbd: "⇧ ⌘ C" },
        { label: "Open website", icon: "external-link", hint: "github.com" },
        { separator: true },
        { label: "Move to space", icon: "folder", submenu: true },
        { label: "Archive", icon: "archive", disabled: true },
        { separator: true },
        { label: "Delete", icon: "trash-2", danger: true }
      ]}
    />
  );
}

export function Menu_Checked() {
  return (
    <MenuList
      label="Sort by"
      style={{ width: 200 }}
      items={[
        { section: "Sort by" },
        { label: "Recently used", checked: true },
        { label: "Name", checked: false },
        { label: "Created", checked: false }
      ]}
    />
  );
}

export function CommandMenu_Palette() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button icon="search" kbd="⌘ K" onClick={() => setOpen(true)}>Search</Button>
      <CommandMenu
        open={open}
        onClose={() => setOpen(false)}
        layer="contained"
        placeholder="Search items and actions"
        groups={[
          { label: "Items", items: [
            { label: "GitHub", hint: "maya@example.com", tile: { name: "GitHub" } },
            { label: "AWS production", hint: "AKIA4XYZ7QX2", tile: { icon: "cloud" } },
            { label: "Home Wi-Fi", hint: "Maple-5G", tile: { icon: "wifi" } }
          ] },
          { label: "Actions", items: [
            { label: "New item", icon: "plus", kbd: ["⌘", "N"] },
            { label: "Generate password", icon: "dices", kbd: ["⌘", "G"] },
            { label: "Lock vault", icon: "lock", kbd: ["⌘", "L"] }
          ] }
        ]}
      />
    </>
  );
}

export function CommandMenu_Inline() {
  return (
    <CommandMenu
      layer="none"
      defaultQuery="lo"
      groups={[
        { label: "Items", items: [{ label: "Linear", hint: "maya@example.com", tile: { name: "Linear" } }] },
        { label: "Actions", items: [
          { label: "Lock vault", icon: "lock", kbd: ["⌘", "L"] },
          { label: "Export logins", icon: "download" }
        ] }
      ]}
    />
  );
}

export const specs = {
  Dialog_Confirm: { caption: "`layer=\"contained\"` keeps it inside this frame. Esc and the backdrop close it.", height: 400 },
  Dialog_Form: { caption: "`layer=\"none\"` renders the panel alone. Title names the task, footer holds the actions.", stage: "subtle" },
  Menu_Trigger: { caption: "Click the trigger. Arrow keys move, Enter selects, Esc closes.", height: 280, align: "flex-start", pad: "32px", print: false, overflow: true },
  Menu_PanelOnly: { caption: "`MenuList` renders the panel alone: sections, hints, shortcuts, submenus and a destructive action last.", span: "half", height: 380 },
  Menu_Checked: { caption: "`checked` for a single choice, such as sort order.", span: "half", height: 380 },
  CommandMenu_Palette: { caption: "Items first, then actions. Type to filter; arrow keys and Enter run.", height: 600 },
  CommandMenu_Inline: { caption: "`layer=\"none\"` renders the panel in place, here with `defaultQuery=\"lo\"` already typed.", stage: "subtle" }
};

export const notes = {
  Dialog: {
    do: ["Name the task in the title and the consequence in the description.", "Repeat the verb on the confirming button: \"Delete item\"."],
    dont: ["Open a dialog from a dialog.", "Use a dialog for information that fits in a `Callout`."]
  },
  Menu: {
    do: ["Group related actions with `separator` and label groups with `section`.", "Put destructive actions last with `danger`."],
    dont: ["Hide the only way to do something inside a menu.", "Put more than about 10 actions in one menu."]
  },
  CommandMenu: {
    do: ["Make every screen and action reachable from it.", "Show items with their tile and actions with their shortcut."],
    dont: ["Require an exact match; prefix, substring and fuzzy all work.", "Keep it open after an action runs."]
  }
};
