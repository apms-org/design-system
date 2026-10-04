# ItemIcon

The tile that identifies an item in the list and the detail header.

- Logins show the site's own logo when `src` is set, and a monogram (the first letter of the title) otherwise. Other types show their type icon.
- `src` takes an image URL, in the app a `data:` URI from the icon cache. The logo sits on a `logo-plate` tile. On load the tile looks at the image once: an opaque square icon fills the tile (`is-opaque`), and a transparent logo with dark ink gets `logo-ink-filter` (`is-ink`), which inverts it in the dark theme. `solid` is ignored while a logo shows.
- If the image fails to load, the tile falls back to `letter`, `icon` or the monogram, with no broken image.
- Sizes: `sm` (24px) in menus, `md` (32px) in list rows, `lg` (56px) in the detail header.
- Logos come only from each site itself: APM fetches them and caches them on this computer. Never point `src` at a third-party favicon service: it would learn every site you have an account on.
- The same tile shows logos in the app's list and detail, in the extension popup, in the menu on a page and in the passkey sheets. When "Show website icons" is off in Settings, Appearance, pass no `src`: every login keeps its monogram, in the app and the extension alike.

Props: `name`, `letter`, `icon`, `src`, `size`, `solid`.
