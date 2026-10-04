# ChoiceTile

A large, labelled option you pick one of: where an import comes from, or which format to export.

- Put tiles in a `ChoiceGroup`, which makes them one radio group. Arrow keys move between tiles and pick them.
- Title the tile with the product or format name. Say in `description` what you get or how to get it ("Tools > Export vault > .json. Passkeys come along.").
- Put capabilities in `meta` as small badges (Passkeys, Encrypted, Files).
- Use `tile` for a monogram tile or `icon` for a type icon, never a third-party logo.

Props: `value`, `icon`, `tile` (`ItemIcon` props), `title`, `description`, `meta`, `selected`, `disabled`, `onSelect`. ChoiceGroup props: `value`, `onChange`, `label`, `columns`.
