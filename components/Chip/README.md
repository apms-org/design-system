# Chip

A small rounded button that filters a list or applies a preset.

- Use a row of chips to filter a log by kind ("All", "ADD", "EDIT") or to start a form from a preset ("Browse only", "Read secrets").
- Set `selected` on a filter chip; the chosen one turns ink. Leave `selected` unset on preset chips, which act once.
- One or two words each. For two to four exclusive options with no wrapping, use `SegmentedControl`.

Props: `selected`, `icon`, `disabled`, `onClick`, `children`.
