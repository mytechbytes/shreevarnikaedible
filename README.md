# Shree Varnika Edible — static site

Production static site built with **Astro 6** + **Tailwind 4** (`@tailwindcss/vite`) + **Vite 8**.
All content is baked into HTML at build time from `src/data/*.json`; JavaScript is used only
for animation and genuine interaction (theme persistence, scroll-reveal, quick-view, enquiry list).

## Local development

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/  (static)
npm run preview    # serve the built dist/
```

## Project shape

```
src/
  data/        items.json · site.json · themes.json   ← single source of truth
  layouts/     Base.astro      (head, theme injection, pre-paint script)
  components/  Header · Footer · ProductCard · Icon
  pages/       index, home-2/3/4, products, products/[slug], about, contact, cart
  scripts/     theme · nav · reveal · cart · quickview · shop   (bundled per page)
  styles/      global.css      (Tailwind @theme tokens → runtime CSS vars + components)
public/        favicons + /assets/images (downloaded + generated)
design-source/ original static HTML/CSS/JS (reference only, not built)
```

- **Products** are generated one page each from `items.json` via `products/[slug].astro`
  + `getStaticPaths()`. The listing, home grids, related items and quick-view all read the
  same JSON.
- **Theming**: 6 palettes + white/tint background in `themes.json`. `Base.astro` injects
  `html[data-theme="…"]` blocks; an inline pre-paint script restores the choice from
  `localStorage`; `theme.js` wires the footer controls.
- **CSS-only controls** (no JS needed): mobile drawer (checkbox), category filter (radios),
  product gallery thumbnails (radios), size selector (radios). Scroll-reveal is gated behind
  `html.js` so no-JS visitors see everything instantly.

## Deploy — Cloudflare Pages (static, Git-connected)

1. Push this repo to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - **Framework preset:** Astro (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** set env var `NODE_VERSION = 22` (matches `.nvmrc`)
4. Deploy. No SSR adapter is needed — output is fully static.

Direct upload alternative: `npm run build` then drag `dist/` into Pages → Upload assets.
