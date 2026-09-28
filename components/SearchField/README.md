# SearchField

The list search field.

- Put it at the top of the list pane. The placeholder states the scope and count: "Search 21 items".
- Shows the shortcut (⌘K) while empty and a clear button once there is text. Esc clears.
- Forwards its ref so a global ⌘K handler can focus it.

Props: `value`, `defaultValue`, `onChange`, `placeholder`, `shortcut`, `size`.
