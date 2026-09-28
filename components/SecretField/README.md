# SecretField

One labelled value in an item, inside a `FieldGroup`.

- Label column (136px, icon plus `small` text in `text-secondary`), value, and actions that appear on hover or focus.
- `secret` masks the value; Reveal sharpens it out of a blur and colorizes digits (`accent`) and symbols (`warning`).
- Clicking the value copies it. The copy button turns into a check and a "Copied" pill springs in. Pair every copy with a `Toast`.
- Children render under the value: a `StrengthMeter` under passwords. Pass `totp` (a base32 secret) to render a live `TotpCode` as the value; copying takes the current code.
- `href` renders the value as an outbound link; `copyable={false}` for read-only facts.
- `FieldGroup` wraps the rows: `surface`, `radius-lg`, hairline dividers.

Props: `label`, `icon`, `value`, `copyValue`, `secret`, `mono`, `href`, `totp`, `reveal`, `pinned`, `copyable`, `onCopy`, `children`, `extra`.
