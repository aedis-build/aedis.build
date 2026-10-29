import { render, screen } from "@testing-library/react";
import { createElement } from "react";

import Brand from "@/app/brand/page";
import { brandSizes } from "@/content/brand";
import { kit, manifest, marks } from "@/scripts/brand";

const SIZES = brandSizes;

describe("brand kit", () => {
  it("has a keystone, a beaver per product and the two bots", () => {
    expect(marks.map((m) => m.name)).toEqual(["keystone", "beaver-keystone", "beaver-dotnet", "beaver-ui", "beaver-platform", "beaver-actions", "bot", "bot-compliance"]);
  });

  it("lists every SVG and PNG of the kit in the manifest, under the versioned CDN path", () => {
    const m = manifest();
    expect(m.base).toBe("https://cdn.aedis.build/brand/v1");
    const svgs = m.marks.flatMap((x) => x.files.map((f) => f.svg));
    expect(svgs.sort()).toEqual(Object.keys(kit()).sort());
    for (const f of m.marks.flatMap((x) => x.files)) expect(f.png).toEqual(SIZES.map((s) => f.svg.replace(/\.svg$/, `-${s}.png`)));
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
      for (const bg of m.backgrounds) expect(screen.getByRole("img", { name: `${m.label} on ${bg}` })).toHaveAttribute("src", `https://cdn.aedis.build/brand/v1/${m.name}/${bg}.svg`);
    }
    expect(document.querySelectorAll('a[href^="https://cdn.aedis.build/brand/v1/"]')).toHaveLength(Object.keys(kit()).length * (SIZES.length + 1));
  });
});
