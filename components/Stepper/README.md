# Stepper

Shows where you are in a short flow: Source, Review, Done.

- Three or four steps at most. Name each step with a noun.
- Finished steps show a check, and you can go back to them when `onChange` is set. Steps you haven't reached can't be clicked.

Props: `items` (strings or `{value, label}`), `value`, `onChange`, `label`.
