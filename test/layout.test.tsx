import { render, screen } from "@testing-library/react";

import RootLayout from "@/app/layout";
import Home from "@/app/page";

describe("layout", () => {
  it("renders the page in the brand theme", () => {
    const tree = RootLayout({ children: <Home /> });
    expect(tree.props["data-theme"]).toBe("brand");
    render(<>{tree.props.children.props.children}</>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("security you can prove");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeInTheDocument();
  });
});
