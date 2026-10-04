# Command

A `pm` command you can copy with one click: the prompt in `accent`, the command in mono, and a copy icon that turns into a check.

- Put it next to the setting or step it does in the terminal, so people who live in `pm` can find the same action there. The app shows one under most settings pages and cards.
- In a narrow surface where the command is the next step (the extension's connect screen), use `block` so it fills the width and the copy icon stays visible.
- Show the real command. Never shorten it or swap in placeholders that will not run.

Props: `cmd` (required), `prompt` (default `$`), `block`, `label` (the button title, default "Copy the command"), `onCopy(cmd)`, `className`.
