import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";

import { Beaver, type BeaverVariant } from "@/components/site/beaver";
import { type Background, BRAND_CDN, type BrandMark, brandFile, brandMarks, brandSizes } from "@/content/brand";

const SIZE = 1024;
const NAVY = "#1A2740";
const CREAM = "#F5F1E8";
const GOLD = "#C8A24C";
const DEEP = "#0E1626";

const FILL: Record<Exclude<Background, "transparent">, string> = { navy: NAVY, cream: CREAM, gold: GOLD };

/** One avatar of the brand kit: a mark on a square background, sized to survive a circle crop. */
export type Mark = BrandMark & { draw: () => string };

const keystone = (size: number) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><polygon points="8,8 56,8 47,58 17,58" fill="${GOLD}" stroke="${DEEP}" stroke-width="3" stroke-linejoin="round"/><polygon points="56,8 47,58 40,8" fill="#9C7C2C"/><circle cx="32" cy="27" r="6.5" fill="${DEEP}"/><rect x="29.5" y="29" width="5" height="15" rx="1.5" fill="${DEEP}"/></svg>`;

// The beaver is 240×280; 720 px tall keeps the ears, the tail and the props inside the circle a platform crops to.
const BEAVER_H = 720;
const BEAVER_W = Math.round((BEAVER_H * 240) / 280);
const beaver = (variant: BeaverVariant) => renderToStaticMarkup(<Beaver variant={variant} size={BEAVER_W} />);
const centered = (w: number, h: number, inner: string) => `<g transform="translate(${(SIZE - w) / 2} ${(SIZE - h) / 2})">${inner}</g>`;

// The bot badge sits inside the circle crop (its far edge is 472 px from the centre, under the 512 px radius).
const BOT_BADGE = `<g transform="translate(740 740)"><circle r="150" fill="${NAVY}" stroke="${CREAM}" stroke-width="16"/><g fill="none" stroke="${GOLD}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"><polyline points="-30,-50 -78,0 -30,50"/><polyline points="30,-50 78,0 30,50"/><line x1="16" y1="-66" x2="-16" y2="66"/></g></g>`;

const drawings: Record<string, () => string> = {
  keystone: () => centered(640, 640, keystone(640)),
  ...Object.fromEntries((["keystone", "dotnet", "ui", "platform", "actions"] as const).map((v) => [`beaver-${v}`, () => centered(BEAVER_W, BEAVER_H, beaver(v))])),
  bot: () => centered(BEAVER_W, BEAVER_H, beaver("keystone")) + BOT_BADGE,
};

export const marks: Mark[] = brandMarks.map((m) => ({ ...m, draw: drawings[m.name] }));

/** The square SVG of a mark on a background. */
export function avatar(mark: Mark, background: Background): string {
  const bg = background === "transparent" ? "" : `<rect width="${SIZE}" height="${SIZE}" fill="${FILL[background]}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" role="img" aria-label="${mark.label}">${bg}${mark.draw()}</svg>\n`;
}

/** Every SVG of the kit, by its path under BRAND_CDN. The PNGs are rasterized from these. */
export function kit(): Record<string, string> {
  return Object.fromEntries(marks.flatMap((m) => m.backgrounds.map((b) => [brandFile(m.name, b), avatar(m, b)])));
}

/** manifest.json: every mark with its SVG and PNG URLs, for tools and for people browsing the CDN. */
export function manifest() {
  return {
    base: BRAND_CDN,
    sizes: brandSizes,
    marks: marks.map(({ name, label, backgrounds }) => ({
      name,
      label,
      files: backgrounds.map((b) => ({ background: b, svg: brandFile(name, b), png: brandSizes.map((s) => brandFile(name, b, s)) })),
    })),
  };
}

// `tsx scripts/brand.tsx <dir>` writes the SVGs and manifest.json for the CDN; the PNGs are rasterized from them.
/* v8 ignore start */
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const out = process.argv[2];
  if (!out) throw new Error("usage: tsx scripts/brand.tsx <output dir>");
  for (const [file, svg] of Object.entries(kit())) {
    mkdirSync(dirname(join(out, file)), { recursive: true });
    writeFileSync(join(out, file), svg);
  }
  writeFileSync(join(out, "manifest.json"), `${JSON.stringify(manifest(), null, 2)}
`);
}
/* v8 ignore stop */
