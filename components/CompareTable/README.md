# CompareTable

Two versions of one item, field by field: what is in your vault against what a file or a sync brings.

- Label the columns with where each side lives: "Your vault" and "bitwarden_export.json".
- `changed` rows sit on `warning-soft`, `added` on `success-soft` and `removed` on `danger-soft`, and each says so in words.
- Secrets stay masked until you reveal that row. Keys, hashes and passwords are set in mono.
- A missing value shows an em dash, never an empty cell.

Props: `columns` (`{left, right}`), `rows` (`{key, label, left, right, secret, mono, kind}`), `revealAll`.
