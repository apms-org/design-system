# ChoiceTile

A large, labelled option you pick one of: where an import comes from, or which format to export.

- Put tiles in a `ChoiceGroup`, which makes them one radio group. Arrow keys move between tiles and pick them.
- Title the tile with the product or format name. Say in `description` what you get or how to get it ("Tools > Export vault > .json. Passkeys come along.").
- Put capabilities in `meta` as small badges (Passkeys, Encrypted, Files).
- Use `tile` for a monogram tile or `icon` for a type icon, never a third-party logo. `leading` takes any other lead, such as a space's color dot.
- `variant="list"` stacks full-width options in one column with the radio on the right: encryption profiles, sync providers, where to move an item. Add `compact` for one-line rows, and `badge` after the title for "Recommended" or "Custom".
- `arrow` turns a tile into a link to the next step (Welcome: "Create a new vault"). It shows a chevron instead of the radio and is not part of a radio group.
- Put the option's numbers in `meta` (`Argon2id · t=5 · 256 MiB · p=4 · unlock about 1s`) and anything after them in `trailing`.

Props: `value`, `icon`, `tile` (`ItemIcon` props), `leading`, `title`, `badge`, `description`, `meta`, `trailing`, `children`, `selected`, `disabled`, `arrow`, `variant`, `compact`, `onSelect`. ChoiceGroup props: `value`, `onChange`, `label`, `columns`, `compact`.
