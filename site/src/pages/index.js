import { overview } from "./overview.jsx";
import { principles, voice, accessibility } from "./guides.jsx";
import { color, typography, layout, shape, motion } from "./foundations.jsx";
import { icons, brand } from "./icons.jsx";
import { componentsIndex, componentPages, grouped } from "./components.jsx";
import { patterns, themes, downloads } from "./recipes.jsx";

export const NAV = [
  { label: "Start", pages: [overview, downloads] },
  { label: "Guidelines", pages: [principles, voice, accessibility] },
  { label: "Foundations", pages: [color, typography, layout, shape, motion, icons, brand] },
  { label: "Recipes", pages: [patterns, themes] },
  { label: "Components", pages: [componentsIndex], groups: grouped }
];

export const PAGES = [overview, downloads, principles, voice, accessibility, color, typography, layout, shape, motion, icons, brand, patterns, themes, componentsIndex, ...componentPages];

const byId = Object.fromEntries(PAGES.map((p) => [p.id, p]));

export function findPage(route) {
  if (route.page === "components" && route.sub) return byId["components/" + route.sub] || null;
  return byId[route.page] || null;
}

export const PRINT_ORDER = [
  { page: overview, toc: "Overview" },
  { page: principles, toc: "Principles" },
  { page: voice, toc: "Voice and copy" },
  { page: color, toc: "Color" },
  { page: typography, toc: "Typography" },
  { page: layout, toc: "Layout and spacing" },
  { page: shape, toc: "Shape and elevation" },
  { page: motion, toc: "Motion" },
  { page: icons, toc: "Iconography" },
  { page: brand, toc: "Brand" },
  { page: componentsIndex, toc: "Components" },
  ...componentPages.map((p) => ({ page: p, toc: p.title, sub: true, group: p.subgroup })),
  { page: patterns, toc: "Patterns" },
  { page: patterns, toc: "Patterns in dark", theme: "dark", id: "patterns-dark", title: "Patterns in dark", lede: "The same patterns on the dark palette. Shadows become a 1px light edge; the app icon tile stays dark." },
  { page: themes, toc: "Themes" },
  { page: accessibility, toc: "Accessibility" }
];
