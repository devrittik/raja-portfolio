import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CMS_TAG } from "@/lib/config";

/**
 * POST /api/revalidate?secret=<REVALIDATE_SECRET>
 * On-demand ISR: point a Notion webhook or automation here after content edits.
 */
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(CMS_TAG);
  return NextResponse.json({ ok: true, revalidated: true, tag: CMS_TAG, at: new Date().toISOString() });
}
