# TotpCode

A live time-based one-time code (RFC 6238) with its countdown ring.

- Pass the base32 `secret`: the code is computed in the browser with WebCrypto HMAC-SHA1 and refreshes on every period. `code` is a static fallback.
- Digits split 3 and 3. Each new code rises into place; the ring drains continuously and turns `warning` for the last 7 seconds.
- `md` (15px) inside field rows, `lg` (22px) for the Authenticator view.

Props: `secret`, `code`, `period` (30), `digits` (6), `size`, `onCode`.
