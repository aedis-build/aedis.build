import type { Metadata } from "next";

import { Beaver, type BeaverVariant } from "@/components/site/beaver";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Link } from "@/components/ui/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { controls, controlsSource } from "@/content/controls";
import { pageMetadata } from "@/content/share";

// The home page keeps the bare site name as its title; the card says the rest.
export const metadata: Metadata = { ...pageMetadata("/"), title: { absolute: "Aedis" } };

const evidence = [
  "OpenSSF Scorecard",
  "SLSA Build L3",
  "Sigstore-signed releases",
  "SBOM + provenance",
  "CodeQL + Semgrep on every PR",
  "95% line coverage gate",
];

const quickstart = `dotnet new install Aedis.Templates
dotnet new aedis-api -n Shop
cd Shop && dotnet test`;

const host = `public sealed class ApiHost : AedisApiHost
{
    protected override void ConfigureAuthentication(
        IServiceCollection services, IConfiguration config) =>
        services.AddAedisKeycloakAuth(config);
}`;

const matrixColumns = ["#", "Control", "OWASP 2021", "NIST CSF 2.0", "ISO 27001 A.8", "MITRE ATT&CK"];

const products: { variant: BeaverVariant; tag: string; title: string; description: string; repo: string }[] = [
  {
    variant: "dotnet",
    tag: "Aedis .NET",
    title: "An API or a worker",
    description: ".NET packages: secure host, ports and adapters, messaging, secrets, signing. Moving cloud, broker or database is a package swap.",
    repo: "aedis-dotnet",
  },
  {
    variant: "ui",
    tag: "Aedis UI",
    title: "A screen",
    description: "UI components from a shadcn-style registry. You copy the code into your app and own it.",
    repo: "aedis-ui",
  },
  {
    variant: "platform",
    tag: "Aedis Platform",
    title: "The delivery pipeline",
    description: "Platform: conformance levels L1 to L3 and a policy-based merge gate for your repositories.",
    repo: "aedis-platform",
  },
];

export default function Home() {
  return (
    <main id="top">
      <section className="mx-auto flex max-w-6xl flex-wrap items-center gap-14 px-4 pt-22 pb-18">
        <div className="enter flex min-w-0 flex-[999_1_32rem] flex-col gap-6">
          <Badge variant="secondary" className="rounded-full border-transparent bg-accent-soft px-3 py-1.5 font-semibold text-link">
            Open source · Apache-2.0 · .NET 10 LTS · Preview
          </Badge>
          <h1 className="text-[clamp(2.6rem,5.4vw,4.25rem)] leading-[1.03] font-bold tracking-[-0.035em]">The .NET framework whose security you can prove.</h1>
          <p className="max-w-[34em] text-title-3 font-normal text-muted-foreground">
            Secure-by-construction building blocks for domain-driven, event-driven services, shipped with the evidence your auditor will ask for.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="h-13 rounded-md px-6.5 text-headline font-semibold shadow-elevation-2" render={<a href="#start" />}>
              Your first API in 5 minutes
            </Button>
            <Button size="lg" variant="secondary" className="h-13 rounded-md bg-surface px-6 text-headline font-semibold" render={<a href="#proof" />}>
              See the control matrix
            </Button>
          </div>
        </div>
        <div className="enter flex flex-[1_1_18rem] justify-center">
          <Beaver variant="keystone" size={320} />
        </div>
      </section>

      <section aria-label="Supply chain evidence" className="mx-auto max-w-6xl px-4">
        <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2.5 rounded-xl border border-hairline bg-surface px-6 py-4.5 shadow-elevation-1">
          {evidence.map((item) => (
            <li key={item}>
              <Badge variant="secondary" className="gap-2 rounded-full border-transparent px-3.5 py-2 text-footnote font-semibold">
                <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 text-success" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5l3 3 6-7" />
                </svg>
                {item}
              </Badge>
            </li>
          ))}
        </ul>
      </section>

      <section id="start" className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-12 px-4 pt-26 pb-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="text-title-1">Your first API</h2>
          <p className="text-headline font-normal text-muted-foreground">
            The template generates a four-layer API with the secure host, tests, Dockerfile and CI already wired. Authentication fails closed;
            security headers, rate limiting, problem details and OpenTelemetry come from the base class.
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <CodeBlock code={quickstart} lang="bash" title="Terminal" animated className="terminal rounded-lg shadow-elevation-3" />
          <CodeBlock code={host} lang="csharp" title="ApiHost.cs" className="terminal rounded-lg shadow-elevation-2" />
        </div>
      </section>

      <section id="proof" className="mx-auto flex max-w-6xl scroll-mt-20 flex-col gap-7 px-4 py-22">
        <div className="flex max-w-[46em] flex-col gap-3">
          <h2 className="text-title-1">{controls.length} controls, each one mapped</h2>
          <p className="text-headline font-normal text-muted-foreground">
            Every control names where it lives in the code and what it answers in OWASP Top 10, NIST CSF 2.0, ISO/IEC 27001:2022 Annex A.8 and
            MITRE ATT&amp;CK. Source: <Link href={controlsSource.url}>docs/SECURITY-COMPLIANCE.md</Link>.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-hairline bg-surface shadow-elevation-1">
          <Table className="min-w-[760px]">
            <TableHeader className="[&_tr]:border-hairline">
              <TableRow className="hover:bg-transparent">
                {matrixColumns.map((column) => (
                  <TableHead key={column} scope="col" className="h-auto px-5 py-3.5 text-caption font-semibold">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {controls.map((c) => (
                <TableRow key={c.id} className="border-hairline">
                  <TableCell className="px-5 py-4 align-top font-semibold tabular-nums">{c.id}</TableCell>
                  <TableCell className="px-5 py-4 align-top whitespace-normal">
                    {c.control}
                    <code className="mt-1.5 block w-fit rounded-xs bg-muted px-1.5 py-0.5 font-mono text-footnote text-muted-foreground">{c.where}</code>
                  </TableCell>
                  <TableCell className="px-5 py-4 align-top">{c.owasp}</TableCell>
                  <TableCell className="px-5 py-4 align-top">{c.nist}</TableCell>
                  <TableCell className="px-5 py-4 align-top">{c.iso}</TableCell>
                  <TableCell className="px-5 py-4 align-top">{c.mitre}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="rounded-xl bg-foreground px-8 py-7 text-headline font-normal text-background shadow-elevation-2 dark:bg-surface-raised dark:text-foreground">
          No library covers the organizational side: ISMS, policies, risk management, incident response. Aedis says so in the matrix and
          stops there: TLS, secret rotation, cluster hardening and backups stay with the operator.
        </p>
      </section>

      <section id="build" className="mx-auto flex max-w-6xl scroll-mt-20 flex-col gap-7 px-4 pt-6 pb-26">
        <h2 className="text-title-1">What are you building?</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((p) => (
            <Card key={p.repo} className="lift gap-3 rounded-xl">
              <div className="flex h-44 items-end justify-center rounded-lg bg-muted">
                <Beaver variant={p.variant} size={140} />
              </div>
              <CardHeader className="gap-2">
                <span className="text-caption font-semibold tracking-wide text-muted-foreground uppercase">{p.tag}</span>
                <CardTitle className="text-title-3">{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`https://github.com/aedis-build/${p.repo}`}>{p.repo} on GitHub</Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
