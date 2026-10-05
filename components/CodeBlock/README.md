# CodeBlock

A block of config or commands to copy whole: an MCP entry, a shell snippet, a retrieval key.

- `label` names what it is and where it goes ("Manual setup · any MCP client"). The Copy button turns into "Copied" for 1.4s.
- `copy` sets the exact text copied when it differs from what is shown; `copy={false}` hides the button.
- `wrap` wraps long single-line values such as keys. `maxHeight` scrolls long files.
- For a single `pm` command inline with text, use `Command`.

Props: `children`, `label`, `copy`, `wrap`, `maxHeight`.
