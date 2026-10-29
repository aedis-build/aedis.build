import { render, screen, within } from "@testing-library/react";
import axe from "axe-core";

import Home from "@/app/page";
import { Beaver } from "@/components/site/beaver";
import { controls } from "@/content/controls";

describe("home", () => {
  it("shows every control of the source matrix, numbered in order", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 2, name: `${controls.length} controls, each one mapped` })).toBeInTheDocument();
    const rows = within(screen.getByRole("table")).getAllByRole("row").slice(1);
    expect(rows).toHaveLength(controls.length);
    expect(rows.map((r) => Number(within(r).getAllByRole("cell")[0].textContent))).toEqual(controls.map((_, i) => i + 1));
  });

  it("shows the real quickstart", () => {
    render(<Home />);
    expect(screen.getByText(/dotnet new aedis-api -n Shop/)).toBeInTheDocument();
  });

  it("opens outside links without giving them this page", () => {
    render(<Home />);
    const external = screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.startsWith("https://"));
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) expect(a).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Home />);
    const { violations } = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(violations).toEqual([]);
  });

  it.each(["keystone", "dotnet", "ui", "platform", "actions"] as const)("draws the %s beaver with a name", (variant) => {
    render(<Beaver variant={variant} />);
    expect(screen.getByRole("img")).toHaveAccessibleName(/Aedis beaver/);
  });
});
