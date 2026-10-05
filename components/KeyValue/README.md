# KeyValue

A read-only fact: a label on the left, its value on the right. `KeyValueList` frames a set of them.

- Use it for facts you check, not settings you change: a commit's hashes, an item's details, a summary before you confirm.
- Labels are short nouns in `text-secondary`. Values are `text`; set `mono` for paths, hashes, IDs and ciphers.
- `copy` adds a copy button for values someone may paste elsewhere. Never put a secret in a `KeyValue`; mask it or use `SecretField`.
- Under 520px the label moves above the value.

Props: `label`, `mono`, `copy`, `children`. KeyValueList props: `children`, `className`.
