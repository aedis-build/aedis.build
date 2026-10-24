export type Background = "navy" | "cream" | "gold" | "transparent";

/** One mark of the brand kit and the backgrounds it ships on. The drawing is in scripts/brand.tsx. */
export type BrandMark = { name: string; label: string; backgrounds: Background[] };

export const brandMarks: BrandMark[] = [
  { name: "keystone", label: "Aedis keystone", backgrounds: ["navy", "cream", "transparent"] },
  ...(["keystone", "dotnet", "ui", "platform", "actions"] as const).map((variant) => ({
    name: `beaver-${variant}`,
    label: `Aedis beaver (${variant})`,
    backgrounds: ["cream", "gold", "transparent"] as Background[],
  })),
  { name: "bot", label: "Aedis Agent Coder bot", backgrounds: ["gold", "cream"] },
];

/** The PNG sizes rasterized from every SVG. */
export const brandSizes = [1024, 512, 256, 128, 64, 32];

/** Where the kit is served. Versioned: new art goes to v2, so these URLs can be cached for good. */
export const BRAND_CDN = "https://cdn.aedis.build/brand/v1";

/** A file of the kit, relative to BRAND_CDN: <mark>/<background>.svg, or .png at a size. */
export const brandFile = (mark: string, background: Background, size?: number) => `${mark}/${background}${size ? `-${size}.png` : ".svg"}`;
