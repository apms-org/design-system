# Card

A raised group of related settings or facts with a head, a body and an optional foot. Settings pages are a stack of cards.

- Title the card with a noun ("Encryption profile", "Access tokens"). `description` says what changes when you use it.
- `flush` removes the body padding so `SettingRow`s and list rows run edge to edge, with a hairline between each.
- `footNote` holds the fine print on the left of the foot: the cost of a change, or the `pm` command. `footer` holds the card's buttons on the right.
- `actions` sit in the head for actions on the whole card ("New token").
- `danger` tints the border, title and foot for destructive work such as destroying the vault. Use it once per page at most.
- Helper classes for the body: `apm-card-empty` for the one line shown when a list is empty, `apm-card-label` for an uppercase sub-heading inside a flush body, `apm-card-pad` to pad a block inside a flush body.
- Cards have no outer margin. Stack them 16px apart.

Props: `title`, `description`, `actions`, `footer`, `footNote`, `danger`, `flush`, `id`, `children`.
