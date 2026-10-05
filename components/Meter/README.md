# Meter

One score out of a maximum, drawn as a ring with the number in the middle. Watchtower uses it for vault health.

- Use it once per screen for the number the screen is about. For progress through work use `Progress`; for a password use `StrengthMeter`.
- `tone` follows the score: `success` from 80, `warning` from 50, `danger` below. The number stays `text`.
- `sub` names the scale ("of 100"). The arc fills from zero when it mounts.

Props: `value`, `max`, `tone`, `size`, `stroke`, `label`, `sub`.
