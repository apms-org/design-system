# Button

The action button. Secondary is the default; primary is ink and appears at most once per view.

- `primary`: the one thing the view is for ("New", "Unlock"). `secondary`: everything else visible. `ghost`: toolbar actions next to content. `danger`: destructive confirmation only.
- Sizes: `sm` (28px) in pane headers, `md` (32px) default, `lg` (40px) on the lock screen and in dialogs.
- Lead with the verb, sentence case. Add `kbd` when a shortcut exists.
- `loading` swaps the label for a spinner and keeps the width, so the layout does not jump.
- Pass `href` to render a link that looks like a button.

Props: `variant`, `size`, `icon`, `iconRight`, `kbd`, `loading`, `block`, `href`, `disabled`, `children`.
