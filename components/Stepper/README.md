# Stepper

Shows where you are in a short flow: Source, Review, Done.

- Five steps at most, three where you can. Name each step with a noun.
- Finished steps show a check, and you can go back to them when `onChange` is set. Steps you haven't reached can't be clicked.
- `layout="spread"` spreads the steps across the width with the label under each dot, for a flow that owns the whole screen (recovering or restoring a vault). Under 560px only the current step keeps its label.

Props: `items` (strings or `{value, label}`), `value`, `onChange`, `label`, `layout`.
