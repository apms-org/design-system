# PasswordInput

The master password field on the lock screen.

- The arrow is inert (`fill`) while empty and turns `primary` once a password is typed. Enter submits.
- Caps Lock is detected on every key press and shown as a `warning` hint.
- Pass `error` to show a `danger` line; change `shakeKey` to shake the field once.
- `busy` locks the field and spins the arrow while the key derives.
- Masked text is set in Geist Mono with wide tracking so its length reads at a glance.
- In a static prototype, `submitHref` makes the arrow a link to the next screen.

Props: `value`, `defaultValue`, `onChange`, `onSubmit`, `placeholder`, `error`, `hint`, `busy`, `shakeKey`, `autoFocus`, `submitHref`, `label`.
