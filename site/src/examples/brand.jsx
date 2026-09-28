import { Row, Stack, Grid } from "../lib/ui.jsx";

const { Icon, Mark } = window.APM;

export function Icon_Sizes() {
  return (
    <Row gap={24} align="center">
      <Icon name="shield-check" size={14} />
      <Icon name="shield-check" />
      <Icon name="shield-check" size={20} />
      <Icon name="shield-check" size={24} />
    </Row>
  );
}

export function Icon_Color() {
  return (
    <Row gap={24} align="center">
      <span style={{ color: "var(--text-tertiary)" }}><Icon name="star" /></span>
      <span style={{ color: "var(--text)" }}><Icon name="star" filled /></span>
      <span style={{ color: "var(--success)" }}><Icon name="circle-check" /></span>
      <span style={{ color: "var(--warning)" }}><Icon name="triangle-alert" /></span>
      <span style={{ color: "var(--danger)" }}><Icon name="shield-alert" /></span>
    </Row>
  );
}

export function Icon_Strokes() {
  return (
    <Row gap={24} align="center">
      <Icon name="fingerprint" size={24} strokeWidth={1.25} />
      <Icon name="fingerprint" size={24} />
      <Icon name="fingerprint" size={24} strokeWidth={2.25} />
    </Row>
  );
}

export function Mark_Bare() {
  return (
    <Row gap={20} align="center">
      <Mark size={16} />
      <Mark size={24} />
      <Mark size={32} />
      <Mark size={48} />
    </Row>
  );
}

export function Mark_Tile() {
  return (
    <Row gap={20} align="center">
      <Mark tile size={20} />
      <Mark tile size={28} />
      <Mark tile size={40} />
      <Mark tile size={64} />
    </Row>
  );
}

export const specs = {
  Icon_Sizes: { caption: "14 in badges and captions, 16 by default, 20 in empty states and the lock field.", span: "half" },
  Icon_Color: { caption: "Icons inherit `currentColor`: resting, active and status.", span: "half" },
  Icon_Strokes: { caption: "1.75 is the house stroke. Change it only to match a neighboring weight.", span: "half" },
  Mark_Bare: { caption: "The bare bird inherits `currentColor`. Minimum 16px.", span: "half" },
  Mark_Tile: { caption: "The app icon: `mark-tile` with `mark-ink`, dark in both themes. Minimum 20px.", span: "half" }
};

export const notes = {
  Icon: {
    do: ["Use the item type icon everywhere that type appears.", "Keep icons at 16px with the 1.75 stroke unless the context sets another size."],
    dont: ["Mix in icons from another set.", "Use an icon alone for status; add a word."]
  },
  Mark: {
    do: ["Use `tile` for the app icon on the lock screen and the space switcher.", "Leave clear space of a quarter of the mark's height."],
    dont: ["Recolor the tile or rotate the bird.", "Place the mark on a busy image."]
  }
};
