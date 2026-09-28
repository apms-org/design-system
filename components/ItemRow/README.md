# ItemRow

One item in the list: tile, title, subtitle, time and flags.

- 56px tall, `radius-md`, inset 8px from the pane edge. The selected row takes `fill-active`.
- Subtitle is the thing you would look for: the username, the masked card number, the key fingerprint. Set `mono` for machine values.
- Flags on the right: a `warning` triangle for Watchtower issues, a filled star for favorites.
- Arrow keys move the selection; the list scrolls to keep it in view.

Props: `title`, `subtitle`, `letter`, `icon`, `time`, `favorite`, `alert` (`warning`, `danger`), `mono`, `active`, `onClick`, `href`.
