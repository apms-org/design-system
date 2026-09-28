# CommandMenu

The ⌘K palette: jump to any item or run any action by typing.

- Groups: items first, then actions, then settings. Items show their tile; actions show an icon and shortcut.
- Matches by prefix, then substring, then fuzzy. Arrow keys move, Enter runs, Esc closes.
- Every screen and action in APM is reachable from here.

Props: `open`, `onClose`, `groups` (`{label, limit, items: [{id, label, hint, icon, tile, kbd, keywords, onSelect}]}`), `placeholder`, `layer`, `defaultQuery`.
