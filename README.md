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
| Lock idle line | Locked automatically after 15 minutes idle |
| Unlock progress | Deriving key · Argon2id · 256 MiB |
| Wrong password | Incorrect password. 4 attempts left before a 30 second wait. |
| Copy feedback | Copied password · Clears in 30s |
| Watchtower | Reused password. The same password is saved in Notion and Spotify. If one leaks, all three are exposed. |
| Empty search | No matches for "stripe". Search looks at names, usernames, types and tags. |

## Color

- Build every surface from the neutral ladder: `bg` for the detail pane and lock screen, `bg-subtle` for the sidebar, `surface` for anything raised (field groups, popovers, toasts, the search field). Set `fill` on tags, Kbd keys and monogram tiles, `fill-hover` on hover, and `fill-active` on the selected row.
- Separate panes with a 1px `border` hairline drawn as an inset box-shadow, never a thick rule. Controls take `border-strong`, and `border-hover` on hover.
- Text is `text` on every ground. Subtitles, field labels and inactive nav take `text-secondary`. Counts, timestamps and placeholders take `text-tertiary`, which holds 4.5:1 on `bg`, `bg-subtle`, `surface` and `fill` in both themes. `text-disabled` is for disabled labels only.
- The primary action is `primary` with `on-primary`: ink on paper in light, paper on ink in dark. Use it once per view at most (the "New" button, the unlock arrow once a password is typed).
- `accent` is a working color, not a brand wash. Use it for the focus ring (`focus` is its alias), links on hover, `accent-soft` info badges, and the digits in a revealed password. Never fill a large area with it.
- Status colors always travel with an icon and a word. `success` for 2FA on, strong passwords and sync. `warning` for reused, weak or aging secrets and the last 7 seconds of a one-time code. `danger` for wrong passwords, deletion and compromise. Their `-soft` pair is the ground behind them in badges and callouts.
- Revealed passwords are colorized character by character: letters in `text`, digits in `accent`, symbols in `warning`. This makes `0` against `O` and `l` against `1` readable at a glance.
- `mark-tile` and `mark-ink` render the app icon. The tile stays dark in both themes, like the icon in the Dock.
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
- Wrong password: a 420ms damped shake on the field, the error line fades down.
- One-time codes: each new code rises 5px out of a slight blur. The ring drains continuously and turns `warning` for the last 7 seconds.
- Reveal: the value sharpens out of a 3px blur.
- Lists: rows fade up 4px with an 18ms stagger, capped at 10 rows.
- Honor `prefers-reduced-motion`: every animation above is removed and state changes happen instantly.

## Iconography

- Icons are Lucide, the icon set shadcn/ui uses, drawn at 16px with a 1.75 stroke (14px in badges and captions, 20px on the lock field). Render them with the `Icon` component by name; the Icons asset group holds the SVG sources.
- Icons inherit `currentColor`. Resting icons are `text-tertiary`, active ones `text`, status icons take their status color.
- Every item type has one icon: Logins `globe`, Authenticator `timer`, API keys `key-round`, SSH keys `terminal`, Cloud credentials `cloud`, Cards `credit-card`, Banking `landmark`, Identities `id-card`, Wi-Fi `wifi`, Secure notes `sticky-note`.
- Logins show a monogram tile (the first letter, `ItemIcon`); other types show their type icon in the tile. APM never fetches favicons, because a request to a site would leak which accounts you have.
- The brand mark is the bird from the app icon. Use `Mark` with `tile` for the app icon (lock screen, space switcher) and bare `Mark` in running text. Never recolor the tile or rotate the bird.

## Components

Mount the real components from the bundle (`window.APM`). Each card in the index has props, states and a live preview.

- `PasswordInput` is the lock field: lock icon, reveal toggle, and an arrow that turns `primary` once a password is typed. It detects Caps Lock and shakes on error.
- `ItemRow` plus `ItemIcon` build the list. `SecretField` rows inside one `FieldGroup` build the detail. Put a `StrengthMeter` under every password and a `TotpCode` in every one-time code row.
- Every copy shows a `Toast`. Secrets get a 30 second clipboard countdown; plain values get a short confirmation.
- `NavItem` builds the sidebar; show counts in `text-tertiary`, and a `Badge` with tone `warning` for Watchtower issues.
- Keyboard first: ⌘K focuses search, ⌘L locks, arrow keys move the selection, Esc clears search. Show shortcuts with `Kbd`.

## Accessibility

- Focus is always visible: a 2px `focus` outline at 2px offset, or the `accent` border with halo on fields.
- Text pairs hold 4.5:1 in both themes (checked for `text`, `text-secondary`, `text-tertiary`, `accent`, and every status color on its grounds and soft fill).
- Icon-only buttons carry an `aria-label` and a tooltip title. Status never relies on color alone.
- Hit targets in the list and detail are at least 28px tall; the lock field and buttons are 40px.
