import { unstable_cache } from "next/cache";
import type { ExtendedRecordMap } from "notion-types";
import { isCmsConfigured, notionCompat } from "./client";
import { site, CMS_TAG } from "@/lib/config";

/**
 * Fetch a full react-notion-x record map for a Notion page.
 * Used on blog articles and project pages when the CMS is connected,
 * so long-form content lives directly in the Notion page body.
 */
const cachedRecordMap = unstable_cache(
  async (id: string): Promise<ExtendedRecordMap | null> => {
    if (!isCmsConfigured || !notionCompat) return null;
    try {
      return (await notionCompat.getPage(id)) as ExtendedRecordMap;
    } catch (err) {
      console.error(`[notion] record map failed for page ${id}`, err);
      return null;
    }
  },
  ["notion-record-map"],
  { revalidate: site.revalidate, tags: [CMS_TAG] },
);

export async function getRecordMap(pageId: string): Promise<ExtendedRecordMap | null> {
  return cachedRecordMap(pageId);
}
