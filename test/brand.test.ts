import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { render, screen } from "@testing-library/react";
import { createElement } from "react";

import Brand from "@/app/brand/page";
import { brandSizes } from "@/content/brand";
import { kit, marks } from "@/scripts/brand";

const dir = join(process.cwd(), "public/brand");
const SIZES = brandSizes;

describe("brand kit", () => {
  it("has a keystone, a beaver per product and the bot", () => {
    expect(marks.map((m) => m.name)).toEqual(["keystone", "beaver-keystone", "beaver-dotnet", "beaver-ui", "beaver-platform", "beaver-actions", "bot"]);
  });

  it("ships every SVG exactly as the script writes it, and every PNG size", () => {
    for (const [file, svg] of Object.entries(kit())) {
      expect(readFileSync(join(dir, file), "utf8")).toBe(svg);
      for (const size of SIZES) expect(existsSync(join(dir, file.replace(/\.svg$/, `-${size}.png`)))).toBe(true);
    }
  });

  it("draws square, labelled images with nothing that runs or loads", () => {
    for (const svg of Object.values(kit())) {
      expect(svg).toMatch(/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="1024" height="1024" viewBox="0 0 1024 1024" role="img" aria-label="[^"]+">/);
      expect(svg).not.toMatch(/<script|<foreignObject|href=|on[a-z]+=/i);
    }
  });

  it("lists every file on the page with its SVG and PNG downloads", () => {
    render(createElement(Brand));
    for (const m of marks) {
      expect(screen.getByText(m.label)).toBeInTheDocument();
      for (const bg of m.backgrounds) expect(screen.getByRole("img", { name: `${m.label} on ${bg}` })).toHaveAttribute("src", `/brand/${m.name}-${bg}.svg`);
    }
    expect(document.querySelectorAll("a[download]")).toHaveLength(Object.keys(kit()).length * (SIZES.length + 1));
  });
});
