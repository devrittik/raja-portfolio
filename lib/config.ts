/** Global runtime configuration. */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  revalidate: Number(process.env.REVALIDATE_SECONDS ?? 3600),
  locale: "en-IN",
};

export const CMS_TAG = "cms";

/** Builds an absolute URL for metadata / feeds. */
export function absoluteUrl(path = ""): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
