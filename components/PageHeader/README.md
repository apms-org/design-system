# PageHeader

The title block at the top of a page: what the page is, one line on what it does, and the page's actions.

- One per page, above everything else. The title is a noun in sentence case ("Sessions", "AI access"), never a sentence.
- Keep `description` to one or two sentences that say what the page controls. Name real products and real limits.
- `actions` sit on the right: at most one `primary`. `badge` follows the title for a state such as "Beta" or "Read-only".
- Children render under the description; use them for the matching `pm` command as a `Command`.
- `size="lg"` is for top-level views (History, Watchtower, Authenticator): a 26px title with the actions aligned to its baseline. The default `md` (24px) heads each Settings page.
- The header has no outer margin. The page sets it: 8px above and 24px below in Settings, 28px below on top-level views.

Props: `title`, `description`, `actions`, `badge`, `size`, `children`.
