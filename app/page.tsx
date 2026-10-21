import { Beaver, type BeaverVariant } from "@/components/site/beaver";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Link } from "@/components/ui/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { controls, controlsSource } from "@/content/controls";

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

const products: { variant: BeaverVariant; title: string; description: string; repo: string }[] = [
  {
    variant: "dotnet",
    title: "An API or a worker",
    description: ".NET packages: secure host, ports and adapters, messaging, secrets, signing. Moving cloud, broker or database is a package swap.",
    repo: "aedis-dotnet",
  },
  {
    variant: "ui",
    title: "A screen",
    description: "UI components from a shadcn-style registry. You copy the code into your app and own it.",
    repo: "aedis-ui",
  },
  {
    variant: "platform",
    title: "The delivery pipeline",
    description: "Platform: conformance levels L1 to L3 and a policy-based merge gate for your repositories.",
    repo: "aedis-platform",
  },
];

export default function Home() {
  return (
    <main id="top">
      <section className="mx-auto flex max-w-6xl flex-wrap items-center gap-12 px-4 pt-18 pb-14">
        <div className="flex min-w-0 flex-[999_1_32rem] flex-col gap-6">
          <p className="font-mono text-footnote text-muted-foreground">Open source · Apache-2.0 · .NET 10 LTS · Preview</p>
          <h1 className="text-display md:text-[4rem]">The .NET framework whose security you can prove.</h1>
          <p className="max-w-[34em] text-title-3 font-normal text-muted-foreground">
            Secure-by-construction building blocks for domain-driven, event-driven services, shipped with the evidence your auditor will ask for.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" render={<a href="#start" />}>Your first API in 5 minutes</Button>
            <Button size="lg" variant="outline" render={<a href="#proof" />}>See the control matrix</Button>
          </div>
        </div>
        <div className="flex flex-[1_1_18rem] justify-center">
          <Beaver variant="keystone" size={340} />
        </div>
      </section>

      <section aria-label="Supply chain evidence" className="bg-primary text-primary-foreground">
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-9 gap-y-3 px-4 py-5 font-mono text-footnote">
          {evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="start" className="mx-auto grid max-w-6xl scroll-mt-20 items-start gap-10 px-4 pt-22 pb-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="text-title-1">Your first API</h2>
          <p className="text-muted-foreground">
            The template generates a four-layer API with the secure host, tests, Dockerfile and CI already wired. Authentication fails closed;
            security headers, rate limiting, problem details and OpenTelemetry come from the base class.
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <CodeBlock code={quickstart} lang="bash" title="Terminal" />
          <CodeBlock code={host} lang="csharp" title="ApiHost.cs" />
        </div>
      </section>

      <section id="proof" className="mx-auto flex max-w-6xl scroll-mt-20 flex-col gap-7 px-4 py-18">
        <div className="flex max-w-[46em] flex-col gap-3">
          <h2 className="text-title-1">{controls.length} controls, each one mapped</h2>
          <p className="text-muted-foreground">
            Every control names where it lives in the code and what it answers in OWASP Top 10, NIST CSF 2.0, ISO/IEC 27001:2022 Annex A.8 and
            MITRE ATT&amp;CK. Source: <Link href={controlsSource.url}>docs/SECURITY-COMPLIANCE.md</Link>.
          </p>
        </div>
        <div className="overflow-x-auto rounded-md border border-border bg-surface">
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">#</TableHead>
                <TableHead scope="col">Control</TableHead>
                <TableHead scope="col">OWASP 2021</TableHead>
                <TableHead scope="col">NIST CSF 2.0</TableHead>
                <TableHead scope="col">ISO 27001 A.8</TableHead>
                <TableHead scope="col">MITRE ATT&amp;CK</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controls.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="align-top tabular-nums">{c.id}</TableCell>
                  <TableCell className="align-top whitespace-normal">
                    {c.control}
                    <span className="mt-1 block font-mono text-footnote text-muted-foreground">{c.where}</span>
                  </TableCell>
                  <TableCell className="align-top">{c.owasp}</TableCell>
                  <TableCell className="align-top">{c.nist}</TableCell>
                  <TableCell className="align-top">{c.iso}</TableCell>
                  <TableCell className="align-top">{c.mitre}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="rounded-md bg-primary px-8 py-7 text-primary-foreground">
          No library covers the organizational side: ISMS, policies, risk management, incident response. Aedis says so in the matrix and
          stops there: TLS, secret rotation, cluster hardening and backups stay with the operator.
        </p>
      </section>

      <section id="build" className="mx-auto flex max-w-6xl scroll-mt-20 flex-col gap-7 px-4 pt-10 pb-24">
        <h2 className="text-title-1">What are you building?</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((p) => (
            <Card key={p.repo}>
              <CardHeader>
                <Beaver variant={p.variant} size={140} />
                <CardTitle className="text-title-2">{p.title}</CardTitle>
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
