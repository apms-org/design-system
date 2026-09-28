# Toast

Confirmation that an action happened, bottom-center of the detail pane.

- Every copy shows one. Secrets pass `countdown` (30): the ring drains and the text reads "Clears in 30s", matching when APM wipes the clipboard.
- Keep the title to the action in past tense: "Copied password", "Item saved", "Vault locked".
- One toast at a time; a new one replaces the old.

Props: `title`, `description`, `tone` (`success`, `neutral`, `danger`), `icon`, `countdown`, `onDone`, `action`.
