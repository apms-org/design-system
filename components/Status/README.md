# Status

A colored dot and a word for live state: connected, up to date, waiting.

- Always pass the word. The dot alone fails the "never color alone" rule.
- Tones: `success` for working, `warning` for needs attention, `danger` for broken or missing, `accent` for waiting on you, neutral for off.
- `pulse` only while something is waiting for the person, such as AI requests to approve.
- Put it on the right of a `SettingRow` or in a card head. Use `Badge` instead inside lists of items.

Props: `tone`, `pulse`, `children`.
