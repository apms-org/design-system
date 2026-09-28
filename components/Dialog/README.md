# Dialog

A focused task over the app: create, edit, confirm.

- Title names the task; description says the consequence. Footer holds the actions, primary on the right.
- Esc and the backdrop close it; focus moves in on open, is trapped while open, and returns on close.
- Confirmations for destructive actions use `icon` with `tone="danger"` and a `danger` button that repeats the verb: "Delete item".
- `layer`: `portal` (default, over the app), `contained` (inside the nearest positioned box), `none` (the panel alone).

Props: `open`, `onClose`, `title`, `description`, `icon`, `tone`, `size` (`sm`, `md`, `lg`, `xl`), `footer`, `footerStart`, `layer`, `children`.
