# StatGroup

A row of counts that summarize a set, such as an import before you confirm it.

- Numbers use digits and tabular figures: "120 new", "6 conflicts".
- Put an icon beside a count only when it carries state (`warning` for conflicts, `danger` for items that can't be imported).
- With `onClick`, a stat becomes a filter. `active` marks the one in use, and clicking it again clears it.

Props: `items` (`{label, value, tone, icon, active, onClick}`), `label`.
