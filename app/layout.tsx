import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Aedis", template: "%s · Aedis" },
  description: "The .NET framework whose security you can prove.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="brand">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
