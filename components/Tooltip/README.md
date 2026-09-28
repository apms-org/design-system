# Tooltip

A short label, and its shortcut, for a control that has no visible text.

- `IconButton` shows one automatically from its `label` and `kbd`; wrap anything else in `Tooltip`.
- Appears after 420ms, in `text` on `bg` (inverted), with a Kbd when a shortcut exists.
- One line, sentence case, no full stop: "Copy password", "Lock vault".

Props: `label`, `kbd`, `side` (`bottom`, `top`, `right`), `delay`, `children`.
