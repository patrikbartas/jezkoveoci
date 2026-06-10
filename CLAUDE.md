# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for OZ Ježkove oči, a Slovak nonprofit (občianske združenie) running the BANM community bike workshop in Bratislava. All page content is in Slovak (`lang="sk"`) — keep new user-facing text in Slovak.

The ASCII hedgehog (variants in `ascii-logo-navrh.md`, primary: `/\/\/\(•.•)>`) is the emerging visual identity — used in the landing-page caption and the 2% page footer, styled via the `.ascii-logo` class (monospace, `white-space: pre`). A full website rebuilt around this theme is planned; the current site is a quick fix. In HTML, escape `<` and `>` in the logos (`&lt;`, `&gt;`).

Never use the `(o.o)` eye variant as a primary/default logo — a friend's company logo uses exactly those eyes, and it must not look like an imitation. It may appear deep in variant lists, but always lead with other eyes (`•.•`, `^.^`, `◕.◕`, `ᵔ.ᵔ`).

## Development

There is no build system, package manager, linter, or test suite. The site is plain HTML/CSS/JS with zero dependencies — keep it that way. To preview locally, open `index.html` directly or serve the directory:

```sh
python3 -m http.server
```

## Architecture

Two pages, each with its own stylesheet:

- `index.html` + `styles.css` + `main.js` — landing page: an interactive hedgehog whose eyes follow the cursor; clicking it toggles light/dark theme.
- `2percenta.html` + `2percenta.css` — info page for donating 2% of income tax, linked from the landing page caption.

### Theme sync across pages

Both pages share the theme via the `jezko-theme` localStorage key and the `theme-dark` class on `<body>`. `main.js` owns toggling/persistence on the landing page; `2percenta.html` has a small inline script that only reads the key on load. Theming is done entirely through CSS custom properties in `:root` overridden by `body.theme-dark` — both stylesheets define their own parallel sets of variables, so theme changes must be applied in both files.

### Eye-tracking geometry

The eye positions are defined twice and must stay in sync:

- `main.js` — the `EYES` array holds each eye's center (`cx`, `cy`) in the hedgehog SVG's viewBox coordinates (100×125, see `VIEWBOX`), plus a `neutralDeg` baseline rotation. The script converts these to screen pixels from the hedgehog's bounding rect and sets a `--rotation` CSS variable per eye.
- `styles.css` — `.eye-left` / `.eye-right` position the eye `<img>` overlays with percentage offsets derived from the same SVG coordinates.

If the hedgehog SVG (`jezko_bez_oci.svg`) or eye SVGs (`lave-oko.svg`, `prave-oko.svg`) change, both the `EYES` constants and the `.eye-*` CSS percentages need updating together.
