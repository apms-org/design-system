# NavItem

A sidebar row: icon, label, and a count or badge.

- 28px tall, `radius-sm`. Active rows take `fill-active`, `text` and weight 500.
- Counts are `text-tertiary` with tabular numerals. Replace the count with a `badge` (`{tone, text}`) when the number needs attention, as Watchtower does.
- Pass `kbd` for action rows such as Lock vault: it shows the shortcut where the count would be.

Props: `icon`, `label`, `count`, `badge`, `kbd`, `active`, `href`, `onClick`.
