import type { BeaverVariant } from "@/components/site/beaver";

export type Product = {
  variant: BeaverVariant;
  tag: string;
  title: string;
  description: string;
  repo: string;
  /** Its machine-readable docs for agents, where it publishes some (llmstxt.org). */
  llms?: string;
  language: string[];
};

/** The Aedis products, for the home page, the umbrella llms.txt and the structured data. */
export const products: Product[] = [
  {
    variant: "dotnet",
    tag: "Aedis .NET",
    title: "An API or a worker",
    description: ".NET packages: secure host, ports and adapters, messaging, secrets, signing. Moving cloud, broker or database is a package swap.",
    repo: "aedis-dotnet",
    language: ["C#"],
  },
  {
    variant: "ui",
    tag: "Aedis UI",
    title: "A screen",
    description: "UI components from a signed registry. You copy the code into your app and own it.",
    repo: "aedis-ui",
    llms: "https://ui.aedis.build/llms.txt",
    language: ["TypeScript", "React"],
  },
  {
    variant: "platform",
    tag: "Aedis Platform",
    title: "The delivery pipeline",
    description: "Platform: conformance levels L1 to L3 and a policy-based merge gate for your repositories.",
    repo: "aedis-platform",
    language: ["YAML", "Python"],
  },
];
