import { unstable_cache } from "next/cache";
import { isCmsConfigured, notion } from "./client";

/**
 * Database registry.
 *
 * Two ways to point the site at a database:
 *  1. Explicit env var: NOTION_DB_PROJECTS=xxxx
 *  2. Auto-discovery: a database shared with the integration whose title
 *     matches the canonical name below (e.g. "Projects").
 */
export const DB_NAMES = {
  home: "Home",
  about: "About",
  projects: "Projects",
  services: "Services",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  certifications: "Certifications",
  awards: "Awards",
  research: "Research Papers",
  testimonials: "Testimonials",
  blog: "Blog",
  gallery: "Gallery",
  faqs: "FAQs",
  contact: "Contact Information",
  seo: "SEO",
  navigation: "Navigation",
  footer: "Footer",
  socials: "Social Links",
  settings: "Site Settings",
} as const;

export type DbKey = keyof typeof DB_NAMES;

const envId = (key: DbKey): string | undefined => {
  const envKey = `NOTION_DB_${key.replace(/[A-Z]/g, (c) => `_${c}`).toUpperCase()}`;
  return process.env[envKey] || undefined;
};

const findDatabase = unstable_cache(
  async (title: string): Promise<string | null> => {
    if (!notion) return null;
    try {
      const res = await notion.search({
        query: title,
        filter: { property: "object", value: "database" },
        page_size: 10,
      });
      const dbs = res.results.filter((r) => r.object === "database");
      const exact = dbs.find((d) => {
        const t = (d as { title?: { plain_text: string }[] }).title ?? [];
        return t.map((x) => x.plain_text).join("").toLowerCase() === title.toLowerCase();
      });
      const hit = exact ?? dbs[0];
      return hit?.id ?? null;
    } catch (err) {
      console.error(`[notion] database search failed for "${title}"`, err);
      return null;
    }
  },
  ["notion-db-registry"],
  { revalidate: 86400, tags: ["cms"] },
);

/** Resolve a database ID for a key, or null when not reachable. */
export async function resolveDbId(key: DbKey): Promise<string | null> {
  if (!isCmsConfigured) return null;
  return envId(key) ?? findDatabase(DB_NAMES[key]);
}
