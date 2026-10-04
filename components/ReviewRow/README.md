# ReviewRow

One row in a list you check before you commit it: an import, a merge, a cleanup.

- The checkbox says whether the row is included. The trailing control says how, for example Add, Skip, Merge or Replace.
- Badges carry status in a word: "Conflict", "2 passkeys". `tone` adds a `warning` or `danger` marker on the left edge for rows that need a decision.
- Rows are at least 48px tall. Clicking the title expands the row to show why it needs a decision, usually a `CompareTable`.

Props: `title`, `subtitle`, `name`, `icon`, `src`, `checked`, `onCheck`, `disabled`, `badges`, `trailing`, `tone`, `expanded`, `onToggle`, `children`.
