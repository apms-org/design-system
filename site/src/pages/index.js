import { overview } from "./overview.jsx";
import { principles, voice, accessibility } from "./guides.jsx";
import { color, typography, layout, shape, motion } from "./foundations.jsx";
import { icons, brand } from "./icons.jsx";
import { componentsIndex, componentPages, grouped } from "./components.jsx";
import { patterns, themes, downloads } from "./recipes.jsx";
import { extension } from "./extension.jsx";

export const NAV = [
  { label: "Start", pages: [overview, downloads] },
  { label: "Guidelines", pages: [principles, voice, accessibility] },
  { label: "Foundations", pages: [color, typography, layout, shape, motion, icons, brand] },
  { label: "Recipes", pages: [patterns, extension, themes] },
  { label: "Components", pages: [componentsIndex], groups: grouped }
];

export const PAGES = [overview, downloads, principles, voice, accessibility, color, typography, layout, shape, motion, icons, brand, patterns, extension, themes, componentsIndex, ...componentPages];

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
  { page: extension, toc: "Browser extension" },
  { page: extension, toc: "Extension in dark", theme: "dark", id: "extension-dark", title: "Browser extension in dark", lede: "The popup, the field menu, the prompts, the options page and the app's pairing screens on the dark palette." },
  { page: themes, toc: "Themes" },
  { page: accessibility, toc: "Accessibility" }
];
