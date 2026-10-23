import { robotsTxt } from "@/content/discovery";

export const dynamic = "force-static";

export function GET() {
  return new Response(robotsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
