# StrengthMeter

Password strength as four bars, a word and the entropy.

- Scores: 0 to 1 Weak (`danger`, one bar), 2 Fair (`warning`), 3 Good (`accent`), 4 Strong (`success`). Bars and the word carry the meaning together.
- Put it directly under every password value. Add `detail` for the reason: "reused in 3 items", "changed 42 days ago".
- Bars fill left to right on mount.

Props: `score` (0 to 4), `bits`, `label`, `detail`.
