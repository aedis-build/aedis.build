# Aedis brand kit

Avatars for the keystone and the beaver, square, with room for a circle crop. Served at https://aedis.build/brand.

- `<mark>-<background>.svg` is written by `pnpm exec tsx scripts/brand.tsx public/brand` from `components/site/beaver.tsx`
  and the keystone; a test fails when a file here differs from what the script writes.
- `<mark>-<background>-<size>.png` (1024, 512, 256, 128, 64, 32) are rasterized from those SVGs with Chromium
  (Playwright). Regenerate them whenever an SVG changes.
