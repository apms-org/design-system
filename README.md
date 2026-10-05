APM is a local, zero-knowledge password manager. The interface should feel like a precision instrument that happens to be calm: monochrome, exact, quick to the secret you came for, and quiet everywhere else. Build every screen from the tokens and components below. When something is missing, extend the system in the same spirit before inventing a one-off.

## Principles

- **The secret is the hero.** Every screen exists to get one value into the clipboard or in front of the eyes, fast. Put the value, its copy action and its state in the first glance. Everything else steps back.
- **Ink, not color.** Hierarchy comes from `text`, `text-secondary` and `text-tertiary`, from weight, and from whitespace. The loudest control is `primary`, which is ink. Color is information: `accent` for focus and links, `success`, `warning` and `danger` for state.
- **Calm density.** 28px sidebar rows, 56px list rows, 48px field rows. Dense lists, generous panes: `space-12` side padding in the detail pane, `space-10` stacks on the lock screen.
- **Show the machinery, once.** APM is honest about cryptography. Name the real cipher and KDF (`XChaCha20-Poly1305`, `Argon2id`) in `mono-small` at the edges of the screen. Never in the way, never vague.
- **Every action answers.** A copy turns into a check and a toast with a clipboard countdown. A wrong password shakes the field and says how many attempts remain. A new one-time code rises into place. Silence reads as failure in a security tool.

## Voice and copy

- Address the person as "you". APM never says "we".
- Sentence case everywhere: "Unlock your vault", "Copy password", "Lock vault". Title Case only for proper nouns and product names.
- Lead with the verb on every control: "Unlock", "Copy", "Change password", "New". Pair each action with its result: the "Copy password" button produces the "Copied password" toast.
- Errors state what happened and what to do next, with the number that matters: "Incorrect password. 4 attempts left before a 30 second wait." No apologies, no "Oops".
- Use exact technical names in their real casing: `AES-256-GCM`, `XChaCha20-Poly1305`, `Argon2id`, `HMAC-SHA256`, `TOTP`, `SSH`, `Wi-Fi`.
- Use digits, not words, for numbers: "21 items", "30s", "118 bits". Relative time in lists ("2m", "Tue", "Sep 12"), full dates in the detail footer ("Created Mar 4, 2025").
- No emoji and no exclamation marks. Status carries an icon and a word, never a color alone.

Real copy from the product:

| Where | Copy |
| --- | --- |
| Lock headline | Unlock your vault |
| Lock idle line | Locked after a period of inactivity |
| Unlock progress | Deriving key · Argon2id · t=5 · 256 MiB · p=4 |
| Wrong password | Incorrect password. 4 attempts left before a wait. |
| Touch ID button | Unlock with Touch ID, then Touch the sensor while it waits |
| Touch ID, fingerprint rejected | Touch ID did not recognise that fingerprint. Enter your master password. |
| Copy feedback | Copied password · Clears in 30s |
| Watchtower | Reused password. Also used by Notion, Spotify. |
| Empty search | No matches for "stripe". Search looks at names, usernames, websites, types and spaces. |
| Read-only, newer vault | Read-only. This vault was updated by a newer pm. Update APM to edit it. |
| Read-only session | Read-only until 3:45 PM |
| AI requests, sidebar | 2 AI requests waiting for approval |
| AI request | Claude Desktop wants to edit an item · 2m ago. Reject, Approve. |
| AI request, rejected | Rejected · Claude Desktop was told no. |
| AI tool group | Utility: Password generation and pending requests. |
| pm command, missing | Not installed. Adds pm to your terminal, linked to this app, so updating APM updates it too. Install pm |
| pm command, older | pm 11.2.0 is installed at /usr/local/bin/pm. This app has 12.0.0. Update pm |
| pm command, current | pm 12.0.0 at /usr/local/bin/pm. Up to date |
| pm command, installed | Installed the pm command · Open a new terminal window and run pm. |
| Extension pairing | Connect Chrome to APM? The APM extension wants to fill logins, codes and passkeys from this vault. Deny, Connect. |
| Pairing code check | Check that the extension shows the same code. Only connect browsers you use. |
| Extension, not connected | APM isn't connected. Open the APM app, or run pm extension link once. |
| Field menu, locked | Unlock from the toolbar to fill. APM never asks for your master password inside a web page. |
| Save prompt | Save login for github.com? You just signed in. APM can fill it next time. |
| Fill on another site | This login is saved for a different website. Only continue if you trust this page. |

## Color

- Build every surface from the neutral ladder: `bg` for the detail pane and lock screen, `bg-subtle` for the sidebar, `surface` for anything raised (field groups, popovers, toasts, the search field). Set `fill` on tags, Kbd keys and monogram tiles, `fill-hover` on hover, and `fill-active` on the selected row.
- Separate panes with a 1px `border` hairline drawn as an inset box-shadow, never a thick rule. Controls take `border-strong`, and `border-hover` on hover.
- Text is `text` on every ground. Subtitles, field labels and inactive nav take `text-secondary`. Counts, timestamps and placeholders take `text-tertiary`, which holds 4.5:1 on `bg`, `bg-subtle`, `surface` and `fill` in both themes. `text-disabled` is for disabled labels only.
- The primary action is `primary` with `on-primary`: ink on paper in light, paper on ink in dark. Use it once per view at most (the "New" button, the unlock arrow once a password is typed).
- `accent` is a working color, not a brand wash. Use it for the focus ring (`focus` is its alias), links on hover, `accent-soft` info badges, and the digits in a revealed password. Never fill a large area with it.
- Status colors always travel with an icon and a word. `success` for 2FA on, strong passwords and sync. `warning` for reused, weak or aging secrets and the last 7 seconds of a one-time code. `danger` for wrong passwords, deletion and compromise. Their `-soft` pair is the ground behind them in badges and callouts.
- Revealed passwords are colorized character by character: letters in `text`, digits in `accent`, symbols in `warning`. This makes `0` against `O` and `l` against `1` readable at a glance.
- `mark-tile` and `mark-ink` render the app icon. The tile stays dark in both themes, like the icon in the Dock.
- `logo-plate` is the ground behind a website logo in an item tile: white in light, a tile grey in dark. `logo-ink-filter` inverts transparent logos whose ink is mostly dark (Vercel, GitHub) in the dark theme so they stay visible. Colored logos are left as they are, and opaque square icons fill the tile edge to edge.
- Input and button borders (`border-strong`) sit near 1.5:1 against `bg` by design. Every input carries a label or placeholder, and the focus state switches the border to `accent` with a 3px halo, which clears 3:1 on every ground.

## Typography

- Set everything in Geist (`--font-sans`) and Geist Mono (`--font-mono`), both shipped as variable woff2 files in `fonts/`.
- Use `display` exactly once per screen (the lock headline). `title-1` names the open item. `title-3` heads panes ("All items"). `body` is the default, `body-medium` is for row titles and values that must stand out, `small` for labels and subtitles, `caption` for metadata.
- Section labels in the sidebar use `overline`: 11px, uppercase, 0.06em tracking, `text-tertiary`.
- Anything a person may compare character by character goes in mono: keys, hashes, fingerprints, account IDs, hosts, the cipher line. Use `mono` for values and `mono-small` for footers.
- One-time codes use `code` (or 15px mono inside a field row), split into two groups of three with a thin gap: `481 062`.
- Tighten display sizes (`-0.028em` at 32px down to `-0.011em` at 15px). Leave 13px and smaller at 0. Use `tabular-nums` wherever digits align: counts, timers, times.

## Layout and spacing

- The window is three panes: sidebar `sidebar` (248px, `bg-subtle`), list `list-pane` (340px, `bg`), detail (fluid, `bg`). The top `titlebar` (48px) of each pane is a drag region; macOS traffic lights sit at 16px, 17px.
- Spacing is a 4px grid. `space-2` between related controls, `space-3` between a tile and its text, `space-6` inside cards, `space-8` between detail sections, `space-12` detail side padding.
- Sidebar rows are `control-sm` tall with `radius-sm`. List rows are `row` tall with `radius-md`, inset `space-2` from the pane edge. Field rows are at least 48px with a 136px label column.
- Group list items by recency under sticky headers ("Today", "This week", "Earlier") with the count on the right.
- The detail column caps at 720px so long values stay readable on wide windows.
- Settings is two panes: a 232px `bg-subtle` nav with a search field and uppercase group labels, and a 720px column with 52px above it. Each page is a `PageHeader` followed by `Card`s 16px apart.
- Top-level views that are not the vault (Watchtower, History, Authenticator) scroll as one page: a `PageHeader` with `size="lg"`, 28px below it, in a 900px column (1040px for Authenticator).

## Shape and elevation

- Radii: `radius-sm` for small controls and nav items, `radius-md` for buttons, inputs, rows and tiles, `radius-lg` for field groups, toasts and the large tile, `radius-xl` for dialogs, `radius-full` for badges, switches and rings, `radius-icon` (22%) for the app icon.
- Elevation is rare. `shadow-xs` on controls, `shadow-sm` on field groups, `shadow-md` on toasts and popovers, `shadow-lg` on dialogs. In dark, shadows become a 1px white edge because shadow disappears on near-black.
- Primary buttons and the app icon carry `shadow-highlight`, a 1px inner top light that makes them read as pressable objects.
- Do not stack borders and shadows on the same flat element. Panes use hairlines; objects use elevation.

## Motion

Motion confirms that something happened. It never decorates.

| Variable | Value | Use |
| --- | --- | --- |
| `--ease-out` | cubic-bezier(.16, 1, .3, 1) | Entrances, reveals, the segmented thumb |
| `--ease-in-out` | cubic-bezier(.65, 0, .35, 1) | The shake, the key-derivation bar |
| `--ease-spring` | cubic-bezier(.34, 1.4, .64, 1) | Switch thumb, the "Copied" pill |
| `--dur-fast` | 120ms | Hover and press color changes |
| `--dur-base` | 200ms | Focus halos, small state changes |
| `--dur-slow` | 360ms | Entrances, reveals, toasts |

- Press: buttons scale to 0.97, icon buttons to 0.92.
- Unlock: the field locks, a 2px bar fills while the key derives, then the bird flies up and out of its tile as the vault fades in.
- Touch ID on the lock screen runs inside the "Unlock with Touch ID" button, like the macOS lock screen: while the window has focus macOS draws its own fingerprint glyph over the button's icon and the label reads "Touch the sensor". There is no system dialog. After a rejected fingerprint it stays off until you press the button again. Where inline Touch ID is not available, the system dialog is offered once per launch.
- Wrong password: a 420ms damped shake on the field, the error line fades down.
- One-time codes: each new code rises 5px out of a slight blur. The ring drains continuously and turns `warning` for the last 7 seconds.
- Reveal: the value sharpens out of a 3px blur.
- Lists: rows fade up 4px with an 18ms stagger, capped at 10 rows.
- Honor `prefers-reduced-motion`: every animation above is removed and state changes happen instantly.

## Iconography

- Icons are Lucide, the icon set shadcn/ui uses, drawn at 16px with a 1.75 stroke (14px in badges and captions, 20px on the lock field). Render them with the `Icon` component by name; the Icons asset group holds the SVG sources.
- Icons inherit `currentColor`. Resting icons are `text-tertiary`, active ones `text`, status icons take their status color.
- Every item type has one icon: Logins `globe`, Authenticator `timer`, API keys `key-round`, SSH keys `terminal`, Cloud credentials `cloud`, Cards `credit-card`, Banking `landmark`, Identities `id-card`, Wi-Fi `wifi`, Secure notes `sticky-note`.
- Logins show the site's own logo on a `logo-plate` tile (`ItemIcon` with `src`), and a monogram tile (the first letter) until the logo arrives, when the site has none, or when website icons are off. Other types show their type icon in the tile. The app, the extension popup, the menu on the page and the passkey sheets all use the same tile.
- APM fetches a logo only from the site itself and caches it on this computer. Never load one from a third-party favicon service: a stranger would learn which accounts you have. The logo belongs to the first website of a login that APM can fetch, so `localhost`, IP addresses and `.local` names keep the monogram.
- "Show website icons" in Settings, Appearance turns logos off for the app and the extension alike, and "Clear icon cache" deletes the cache. Every surface must still read well with monograms only.
- The brand mark is the bird from the app icon. Use `Mark` with `tile` for the app icon (lock screen, space switcher) and bare `Mark` in running text. Never recolor the tile or rotate the bird.
- The macOS app icon has one source: `GUI/build/AppIcon.icon`, an Icon Composer document. It is the bird (`Assets/bird.svg`, the same paths as `brand/square`) as a white glass layer over the `mark-tile` fill. Edit it in Icon Composer and check all four styles, Default, Dark, Clear and Tinted, before you ship. Packaging compiles it into `Assets.car`, so macOS 26 and later draw the glass, the Dock shadow and the styles themselves. `GUI/build/icon.icns` is the fallback for older macOS; rebuild it whenever the bird changes. Never set a Dock image in a packaged build, because a bitmap replaces the system treatment. `npm run icon:dev` in `GUI/` renders the Default style for development runs.

## Components

Mount the real components from the bundle (`window.APM`). Each card in the index has props, states and a live preview.

- `PasswordInput` is the lock field: lock icon, reveal toggle, and an arrow that turns `primary` once a password is typed. It detects Caps Lock and shakes on error.
- `ItemRow` plus `ItemIcon` build the list. `SecretField` rows inside one `FieldGroup` build the detail. Put a `StrengthMeter` under every password and a `TotpCode` in every one-time code row.
- Every copy shows a `Toast`. Secrets get a 30 second clipboard countdown; plain values get a short confirmation.
- `NavItem` builds the sidebar; show counts in `text-tertiary`, and a `Badge` with tone `warning` for Watchtower issues.
- Keyboard first: ⌘K focuses search, ⌘L locks, arrow keys move the selection, Esc clears search. Show shortcuts with `Kbd`.
- A login can hold several websites: the main one in `website`, the others in `urls`. List them together under "Websites", one per row in `mono`, with Add at the end. APM fills the login on any of them.
- Moving data in and out is one flow in three steps, shown with `Stepper`: Source, Review, Done. `ChoiceTile` in a `ChoiceGroup` picks the source app or export format, and `FileDrop` takes the file.
- Review before you write. A `StatGroup` counts what a file brings (New, Already in vault, Conflicts, Possible duplicates, Can't import, Passkeys), and each count filters the list. Every item is a `ReviewRow` whose trailing control says what happens to it (Add, Skip, Merge, Replace, Keep both). Expanding a row shows a `CompareTable` of your vault against the file, secrets masked until you reveal them.
- An import never overwrites silently. Items whose values clash stay on Skip until you choose, a merge only fills gaps, and the result offers "Undo import".
- Settings pages are a `PageHeader` and a stack of `Card`s. Settings that change something go in `SettingRow`s inside a `flush` card; live state on the right is a `Status` ("Up to date", "Newer than APM"). Read-only facts go in a `KeyValueList` of `KeyValue` rows.
- Every view and card can show the `pm` command that does the same thing, as a `Command`. "Show pm commands" in Settings, Appearance hides them all.
- `ChoiceTile` with `variant="list"` picks from a short stack (encryption profile, sync provider, space). With `arrow` it leads to the next screen (Welcome).
- `Stepper` with `layout="spread"` runs flows that own the window: recovering a vault, restoring from cloud. `StepList` numbers instructions you follow once, and a `CodeBlock` holds config to paste.
- Errors for a whole form or dialog are a `Hint` with `tone="danger"`. Filters over a log are `Chip`s. Watchtower's health score is a `Meter`. Inline text actions ("Add some", "Choose another file") are `Button` with `variant="link"`.
- Anything an AI assistant wants to change waits for you. Pending requests sit at the top of Settings, AI access as raised cards with a draining expiry bar, the client, the operation in `mono-small` and the fields it would write (secrets cut to 8 characters). The buttons are Reject and Approve, `danger` for a delete. The sidebar shows how many are waiting.
- When the vault is read-only, say why and until when in the sidebar foot: a `warning-soft` note ("Read-only until 3:45 PM"), or, for a vault written by a newer pm, "Read-only. This vault was updated by a newer pm. Update APM to edit it." Edit controls stay visible but disabled.
- The pm command row in Settings, Developer checks the `pm` your terminal runs each time it opens: "Install pm" when there is none, "Update pm" when it is older than the app, a copyable `brew upgrade pm` when Homebrew owns it, and a `Status` ("Up to date", "Newer than APM") otherwise.
- Connecting the browser extension asks in the app first: a small dialog with the app icon, "Connect Chrome to APM?", the 6-digit pairing code split 3 and 3 in large mono, a note to check the extension shows the same code, the expiry in the foot, and Deny and Connect.

## Browser extension

APM for Chrome fills logins, one-time codes and passkeys from the vault through the APM app on the same computer, or through `pm` when the app is closed. It never opens `vault.dat` and never holds the master password or a private key. Its surfaces are built from the same tokens and components, plus the classes in `patterns/extension.css`, which the extension copies with `npm run ds:sync`.

| Surface | Root class | Size | Where it lives |
| --- | --- | --- | --- |
| Toolbar popup | `.px` | 380 × 580 | The toolbar button, `Alt+Shift+A` |
| Field menu | `.im` | 328 wide, up to 560 tall | In-page extension frame, 6px under the field or above it when there is no room |
| Save and update note | `.np` | 360 wide | In-page extension frame, 12px from the top-right corner |
| Toast | `.pr-toast` | 360 wide | In-page extension frame, under the note |
| Passkey sheet | `.sheet` | 400 wide | In-page extension frame, centered over a scrim |
| Options page | `.opt` | A full tab, one column under 720px | The extension's options tab |

- **Never ask for the master password inside a web page.** A page can draw a fake prompt, but it cannot draw inside the toolbar. When APM is locked, the field menu and the passkey sheets say so and send you to the toolbar popup or Touch ID.
- **In-page UI runs only in extension frames.** The field menu, the notes, the sheets and the toasts are extension pages in an iframe inside a closed shadow root. The page cannot read, restyle or click into them, and the extension never adds its own markup or styles to the page, except the field icon, a button in its own closed shadow root.
- **Prompts sit top-right, sheets are centered.** Save and update notes and toasts wait in the top-right corner and never cover the form. A passkey sheet answers a request the page just made, so it centers over an `overlay` scrim. Esc, the close button or "Not now" dismiss every one of them.
- **Keyboard first.** In the field menu, ↑ and ↓ move the highlight, Enter fills it and Esc closes the menu, while focus stays in the page's field. The commands are `Alt+Shift+A` to open APM, `Alt+Shift+F` to fill the best login, `Alt+Shift+G` to fill a strong password and `Alt+Shift+L` to lock. Show them with `Kbd` as ⌥ ⇧ A on a Mac. "Copy the one-time code" has no default key.
- **Works without the app, after one link.** With the app closed, the extension talks to `pm` through the browser's native messaging. Wherever the extension asks you to connect, show the next step as a `Command` (`pm extension link`), with `block` in the popup. Say which side holds the key: "the APM app" or "pm on this computer".
- **Name the site, always.** The menu head shows the host in `mono-small`, and every prompt puts it in the title ("Save login for github.com?", "Sign in to github.com"), so a frame on the wrong page is obvious.
- **One job per surface.** The popup finds, copies and edits. The menu fills. A note saves. A sheet creates or signs with a passkey. Anything else links to the popup instead of growing the in-page UI.
- **Ask before filling on another site.** A login fills only on its own websites. On any other page the popup asks first ("Fill once", "Fill and remember"), and "Fill and remember" adds the site to the login.
- **Copy is short and exact.** Titles ask a question when you decide ("Update the password for maya@example.com?") and state a fact when you cannot act ("APM is locked", "Not filling here"). Buttons name the result: Fill, Save, Update, Save passkey, Sign in, "Use this browser instead". Errors say how to fix it: "APM isn't connected. Open the APM app, or run pm extension link once."

## Accessibility

- Focus is always visible: a 2px `focus` outline at 2px offset, or the `accent` border with halo on fields.
- Text pairs hold 4.5:1 in both themes (checked for `text`, `text-secondary`, `text-tertiary`, `accent`, and every status color on its grounds and soft fill).
- Icon-only buttons carry an `aria-label` and a tooltip title. Status never relies on color alone.
- Hit targets in the list and detail are at least 28px tall; the lock field and buttons are 40px.
