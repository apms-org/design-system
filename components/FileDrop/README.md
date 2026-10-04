# FileDrop

The place you hand APM a file: drop it, or click to choose one.

- Say which files it takes in `hint` ("Bitwarden .json, 1Password .1pux, KeePass .xml"). Once a file is in, show its name and size, and keep the tile clickable to choose another.
- `busy` swaps the icon for a spinner while APM reads the file. Name the step next to it: "Reading bitwarden_export.json…".
- The whole tile is one button. Enter and Space choose a file, and it takes one file at a time.

Props: `file` (`{name, size, detail}`), `title`, `hint`, `icon`, `busy`, `disabled`, `accept`, `onChoose`, `onDrop`.
