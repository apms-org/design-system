# Menu

A list of actions attached to a trigger: the item "More" menu, sort options, context menus.

- Group with `separator`, label groups with `section`, put destructive actions last with `danger`.
- Show shortcuts with `kbd`. Arrow keys move, Enter selects, Esc closes.
- `MenuList` renders the panel alone (context menus, previews).

Props: `trigger`, `items` (`{label, icon, kbd, hint, checked, danger, disabled, onSelect}`, `{separator}`, `{section}`), `align`, `side`, `width`.
