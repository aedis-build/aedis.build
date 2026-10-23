import { ImageResponse } from "next/og";

import { SHARE_CARD_SIZE, shareCardFonts } from "@/components/ui/share-card";
import { shareCard, shareImageFile, sharePages } from "@/content/share";

// One static PNG per page, drawn at build time: /og/<page>-<hash>.png.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return sharePages.map((page) => ({ file: shareImageFile(page) }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const page = sharePages.find((p) => shareImageFile(p) === file);
  if (!page) return new Response(null, { status: 404 });
  return new ImageResponse(shareCard(page), { ...SHARE_CARD_SIZE, fonts: await shareCardFonts() });
}
