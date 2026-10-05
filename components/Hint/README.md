# Hint

The line under a field or form: a tip, a warning, or what went wrong.

- Errors take `tone="danger"` and `icon="triangle-alert"`, and say what happened and what to do: "That file could not be read as an APM vault."
- A danger hint is announced (`role="alert"`) and fades down into place. Warnings take `tone="warning"`, such as "Caps Lock is on".
- Without children it renders an empty 16px line, so a form doesn't jump when an error comes and goes.
- `Input`, `Select` and `Textarea` draw their own hint from `hint`. Use `Hint` for errors that belong to a whole form or dialog.

Props: `tone`, `icon`, `children`.
