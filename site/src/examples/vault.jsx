import { Row, Stack, Grid } from "../lib/ui.jsx";

const { ItemRow, ItemIcon, SecretField, FieldGroup, TotpCode, StrengthMeter } = window.APM;

const icons = {
  "vercel.com": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 76 65'%3E%3Cpath d='M38 0 76 65H0z' fill='%23000'/%3E%3C/svg%3E",
  "news.ycombinator.com": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Crect width='18' height='18' fill='%23f60'/%3E%3Cpath d='M5 4l4 5.5V14M13 4 9 9.5' stroke='%23fff' stroke-width='1.8' fill='none'/%3E%3C/svg%3E",
  "github.com": null,
  "figma.com": "data:image/png;base64,AAAA"
};

export function ItemRow_List() {
  return (
    <Stack gap={1} width={324}>
      <ItemRow title="GitHub" subtitle="maya@example.com" time="2m" favorite active />
      <ItemRow title="Vercel" subtitle="maya@example.com" src={icons["vercel.com"]} time="Tue" />
      <ItemRow title="AWS production" subtitle="AKIA4XYZ7QX2" icon="cloud" time="Sep 12" mono />
      <ItemRow title="Chase Sapphire" subtitle="•••• 4821" icon="credit-card" time="Aug 3" />
      <ItemRow title="Home Wi-Fi" subtitle="Maple-5G" icon="wifi" time="Jul 19" />
    </Stack>
  );
}

export function ItemRow_Flags() {
  return (
    <Stack gap={1} width={324}>
      <ItemRow title="Notion" subtitle="maya@example.com" time="1h" alert="warning" />
      <ItemRow title="Old forum" subtitle="maya_c" time="2021" alert="danger" />
      <ItemRow title="deploy@build" subtitle="SHA256:q3Xk9rT2" icon="terminal" time="Mon" mono favorite />
    </Stack>
  );
}

export function ItemIcon_Sizes() {
  return (
    <Row gap={16} align="flex-end">
      <ItemIcon name="GitHub" size="sm" />
      <ItemIcon name="GitHub" />
      <ItemIcon name="GitHub" size="lg" />
      <ItemIcon name="GitHub" size="lg" solid />
    </Row>
  );
}

export function ItemIcon_Types() {
  return (
    <Row gap={10}>
      <ItemIcon name="Linear" />
      <ItemIcon icon="timer" />
      <ItemIcon icon="key-round" />
      <ItemIcon icon="terminal" />
      <ItemIcon icon="cloud" />
      <ItemIcon icon="credit-card" />
      <ItemIcon icon="landmark" />
      <ItemIcon icon="id-card" />
      <ItemIcon icon="wifi" />
      <ItemIcon icon="sticky-note" />
    </Row>
  );
}

export function ItemIcon_Logos() {
  return (
    <Row gap={16} align="flex-end">
      <ItemIcon name="Vercel" src={icons["vercel.com"]} size="sm" />
      <ItemIcon name="Vercel" src={icons["vercel.com"]} />
      <ItemIcon name="Vercel" src={icons["vercel.com"]} size="lg" />
      <ItemIcon name="Hacker News" src={icons["news.ycombinator.com"]} size="lg" />
      <ItemIcon name="GitHub" src={icons["github.com"]} size="lg" />
      <ItemIcon name="Figma" src={icons["figma.com"]} size="lg" />
    </Row>
  );
}

export function ItemIcon_LogosInDark() {
  return (
    <Row gap={16} align="flex-end">
      <ItemIcon name="Vercel" src={icons["vercel.com"]} />
      <ItemIcon name="Vercel" src={icons["vercel.com"]} size="lg" />
      <ItemIcon name="Hacker News" src={icons["news.ycombinator.com"]} size="lg" />
      <ItemIcon name="GitHub" src={icons["github.com"]} size="lg" />
    </Row>
  );
}

export function SecretField_Login() {
  return (
    <Stack width={600}>
      <FieldGroup>
        <SecretField label="Username" icon="user" value="maya@example.com" />
        <SecretField label="Password" icon="key" value="t7#Vq9!mZ2pL@x4R" secret>
          <StrengthMeter score={4} bits={118} />
        </SecretField>
        <SecretField label="One-time code" icon="timer" totp="JBSWY3DPEHPK3PXP" />
        <SecretField label="Website" icon="globe" value="github.com" href="https://github.com" />
      </FieldGroup>
    </Stack>
  );
}

export function SecretField_Revealed() {
  return (
    <Stack width={600}>
      <FieldGroup>
        <SecretField label="Password" icon="key" value="0lO1Il|8B$qW3e" secret reveal>
          <StrengthMeter score={2} bits={52} detail="reused in 3 items" />
        </SecretField>
        <SecretField label="Access key" icon="key-round" value="AKIA4XYZ7QX2PLMN" mono />
        <SecretField label="Created" icon="calendar" value="Mar 4, 2025" copyable={false} />
      </FieldGroup>
    </Stack>
  );
}

export function TotpCode_Sizes() {
  return (
    <Row gap={40} align="center">
      <TotpCode secret="JBSWY3DPEHPK3PXP" />
      <TotpCode secret="JBSWY3DPEHPK3PXP" size="lg" />
      <TotpCode code="481062" />
    </Row>
  );
}

export function StrengthMeter_Scores() {
  return (
    <Stack gap={14} width={420}>
      <StrengthMeter score={1} bits={28} detail="reused in 3 items" />
      <StrengthMeter score={2} bits={52} detail="changed 412 days ago" />
      <StrengthMeter score={3} bits={78} />
      <StrengthMeter score={4} bits={118} />
    </Stack>
  );
}

export const specs = {
  ItemRow_List: { caption: "56px rows inset 8px from the pane edge. The selected row takes `fill-active`. Logins pass `src` for the site's logo.", span: "half", stage: "subtle" },
  ItemRow_Flags: { caption: "A `warning` or `danger` triangle for Watchtower, a star for favorites, `mono` subtitles for machine values.", span: "half", stage: "subtle" },
  ItemIcon_Sizes: { caption: "`sm` 24px in menus, `md` 32px in rows, `lg` 56px in the detail header, and `solid`.", span: "half" },
  ItemIcon_Types: { caption: "Logins without a logo show a monogram. Every other type shows its icon.", span: "half" },
  ItemIcon_Logos: { caption: "`src` shows the site's own logo on a `logo-plate` tile. An opaque square icon such as Hacker News fills the tile (`is-opaque`). With no icon yet (`null`) or an image that fails to load, the tile keeps the monogram.", span: "half" },
  ItemIcon_LogosInDark: { title: "Logos in dark", caption: "The plate turns tile grey. Transparent logos with dark ink take `is-ink` and invert through `logo-ink-filter`; colored and opaque square logos stay as they are.", span: "half", theme: "dark" },
  SecretField_Login: { caption: "Hover a row for its actions. Click a value to copy it. The code is live, computed with WebCrypto.", stage: "plain" },
  SecretField_Revealed: { caption: "Revealed passwords color digits `accent` and symbols `warning`. Read-only facts pass `copyable={false}`.", stage: "plain" },
  TotpCode_Sizes: { caption: "`md` inside field rows, `lg` in the Authenticator view, and a static `code` fallback. The ring turns `warning` for the last 7 seconds." },
  StrengthMeter_Scores: { caption: "Bars, word and entropy carry the meaning together. `detail` gives the reason." }
};

export const notes = {
  ItemRow: {
    do: ["Use the subtitle for what people scan for: the username, the last four digits, the fingerprint.", "Set `mono` for machine values."],
    dont: ["Load a logo from a third-party favicon service; it would learn every site in the vault.", "Show more than two flags in a row."]
  },
  ItemIcon: {
    do: ["Pass the site's logo as `src` for logins, from APM's icon cache. Keep `name` set so the monogram shows until it arrives.", "Use the type icon for everything that is not a login.", "Match the size to the context: `sm` menus, `md` rows, `lg` detail."],
    dont: ["Recolor tiles per item or per brand.", "Point `src` at a remote favicon service or any URL APM did not fetch itself.", "Put a logo on a `solid` tile; the plate replaces it."]
  },
  SecretField: {
    do: ["Keep every value of an item in one `FieldGroup`.", "Put a `StrengthMeter` under every password.", "Pair every copy with a `Toast`; secrets get the 30 second countdown."],
    dont: ["Reveal secrets by default.", "Truncate a secret without a way to see all of it.", "Make read-only facts look copyable."]
  },
  TotpCode: {
    do: ["Split digits 3 and 3 with a thin gap.", "Copy the current code, never the secret, when the row is clicked."],
    dont: ["Show the base32 secret next to the code.", "Stop the ring between periods."]
  },
  StrengthMeter: {
    do: ["Place it directly under the password value.", "Give the reason in `detail`: reused, old or short."],
    dont: ["Use color alone; the word and bars say the same thing.", "Show a score for values that are not passwords."]
  }
};
