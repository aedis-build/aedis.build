import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Keystone } from "@/components/site/keystone";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import "./globals.css";

const nav = [
  { label: ".NET", href: "https://github.com/aedis-build/aedis-dotnet" },
  { label: "UI", href: "https://github.com/aedis-build/aedis-ui" },
  { label: "Platform", href: "https://github.com/aedis-build/aedis-platform" },
  { label: "Security", href: "/#proof" },
];

const footer = [
  { label: "github.com/aedis-build", href: "https://github.com/aedis-build" },
  { label: "Security policy", href: "https://github.com/aedis-build/aedis.build/security/policy" },
  { label: "Site source", href: "https://github.com/aedis-build/aedis.build" },
];

export const metadata: Metadata = {
  title: { default: "Aedis", template: "%s · Aedis" },
  description: "The .NET framework whose security you can prove.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="brand">
      <body className="min-h-screen antialiased">
        <SiteHeader
          brand={
            <span className="flex items-center gap-2 text-title-3 font-bold">
              <Keystone size={28} />
              aedis
            </span>
          }
          items={nav}
          actions={<Button render={<a href="/#start" />}>Get started</Button>}
        />
        {children}
        <SiteFooter links={footer}>Apache-2.0. Open source, no paid tier.</SiteFooter>
      </body>
    </html>
  );
}
