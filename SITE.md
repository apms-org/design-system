# APM design system site

This folder is the one source of the APM design system: tokens, fonts, icons, the component bundle and the written guidelines (`README.md`). The desktop app builds from it, and so does the documentation site described here. The site is written with the system itself: every page is laid out with `tokens.css`, and every specimen is the real component from `components/bundle.js`.

## Open it

```sh
npm install
npm run dev         # dev server with live reload on http://127.0.0.1:4418
npm run build       # static site in dist/
npm run pdf         # dist/APM-Design-System.pdf
```

- `dev` builds once, watches `site/`, the tokens, the components, the icons and the README, and reloads the open page after every change. Set `PORT=4419` to use another port. Stop it with Ctrl+C.
- `build` writes a static site to `dist/`. Open `dist/index.html` straight from disk or serve the folder with any static server. On `file://` the fonts load from `fonts-inline.css`, because browsers block font files there.
- `pdf` builds, then opens `dist/print.html` in a hidden Electron window served from a local port, waits for fonts and live codes, and prints 1280 by 800 pages to `dist/APM-Design-System.pdf`. The site's Downloads page links the newest PDF.

## Dependencies

The design system stands alone. Its only dependencies are `rolldown` (the bundler) and `electron` (the PDF printer), pinned in `package-lock.json`. Run `npm install` once after cloning; if they are missing, every script stops and says so. Nothing is fetched from the network at build or print time. Node 20.19 or 22.12 or newer.

## How the app uses it

The desktop app keeps its own copy of `tokens.css`, `themes.js`, `components/bundle.css`, `components/bundle.js`, `components/index.d.ts` and `fonts/` in `GUI/vendor/design-system`, so it builds without this folder. Change a token or a component here, then run `npm run ds:sync` in the app and commit its vendor folder. Screens read components from `window.APM`.

The browser extension keeps the same tokens, bundle, types, fonts and React builds in `extension/vendor/design-system`, plus `patterns/extension.css`, which styles every extension surface: the toolbar popup, the field menu, the save and update notes, the toasts, the passkey sheets and the options page. The same file sizes the pages through the `page-popup`, `page-frame` and `page-options` class on each page's `html`, so the extension needs no stylesheet of its own; only the field icon keeps a few inline styles, because it lives in the page's document. Change a surface in `patterns/extension.css`, then run `npm run ds:sync` and `npm run build` in `extension/`. The Browser extension page (`#/extension`) renders every surface from the same file.

## Layout

```
design-system/
  README.md               guidelines; the guideline pages render from it
  SITE.md                 this file
  tokens.json             every token with light and dark values and usage
  tokens.css              CSS custom properties, type classes, @font-face
  components/             bundle.js, bundle.css, index.d.ts, a README per component
  patterns/extension.css  the browser extension's surfaces, shipped to the extension by ds:sync
  fonts/                  Geist and Geist Mono, variable woff2
  assets/Icons/           Lucide SVG sources
  assets/Logos/           app icon and marks
  vendor/                 React 18 and ReactDOM UMD builds
  package.json            dev, build, pdf
  scripts/
    build.mjs             one build: bundles site/src, copies static files
    dev.mjs               build, watch, serve, live reload
    pdf.mjs, pdf-main.cjs build, then print with Electron
    meta.mjs              reads README, tokens, types and examples at build time
    deps.mjs              loads rolldown and electron, with a clear error when missing
  site/
    index.html            page template (site and print)
    css/                  site.css, code.css, patterns.css, print.css, responsive.css
    src/main.jsx          shell: sidebar, search, theme switch, hash routes
    src/print.jsx         cover, contents and pagination for the PDF
    src/pages/            one module per page
    src/examples/         live specimens, one exported function each
    src/lib/              state, code highlighting, markdown, color math, UI parts
  dist/                   build output, ignored by git
```

## How pages are made

- Guideline text comes from `README.md` sections; the Brand page reads `assets/Logos/README.md`.
- Color, type, spacing, radius, shadow and size come from `tokens.json`, the motion values from `components/bundle.css`. Contrast ratios are computed with the same math the app uses.
- Each component page lists every example named `ComponentName_Title` in `site/src/examples/`. The code shown under a specimen is read from that function's source at build time, so it always matches what renders. Captions live in each file's `specs` object and the do and don't lists in `notes`.
- Props tables are generated from `components/index.d.ts`, defaults from the parameter defaults in `components/bundle.js`.
- The Browser extension page takes its surfaces table and rules from the `Browser extension` section of `README.md`, and its specimens from the `ExtPopup_`, `ExtMenu_`, `ExtPrompt_`, `ExtOptions_`, `ExtApp_` and `ExtTheme_` examples in `site/src/examples/extension.jsx`. The specimens use the real class names from `patterns/extension.css`, which the site loads after the bundle styles.
- Theme presets and `tokensFor` live in `themes.js` at the root of this folder. The app vendors the same file, so the Themes page shows exactly what the app applies.

To document a new component: add its folder and README, export it from the bundle and `index.d.ts`, then add `NewThing_Variants` (and more) to a file in `site/src/examples/`. The page, the sidebar entry, the search entry and the PDF section appear on the next build.

## Routes

Hash routes deep link to any page: `#/overview`, `#/color`, `#/typography`, `#/icons?q=lock`, `#/components/secret-field`, `#/patterns`, `#/extension`, `#/themes`. Press ⌘K or / to search pages, components, tokens and icons. Choosing a token or an icon also copies it.

## The PDF

`print.html` renders the same page blocks as the site. Each block is measured off screen, then packed onto 1280 by 800 pages: every section and every component starts on a new page, a heading always stays with the block after it, blocks are never split, and a block taller than a page is scaled to fit. The cover and the contents come first; page numbers in the contents are computed after packing. The Color pages show both palettes side by side, "Patterns in dark" repeats the patterns on the dark palette, and "Extension in dark" does the same for the browser extension.

Print swaps blurred shadows for stacked hairline shadows, because PDF viewers such as Preview draw blurred shadows as grey boxes.
