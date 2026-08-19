import { NextResponse } from "next/server";
import { getPosts, getSiteSettings } from "@/notion/data";
import { absoluteUrl } from "@/lib/config";

export const revalidate = 3600;

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of the journal. */
export async function GET() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const image = post.featuredImage.src.startsWith("http")
        ? post.featuredImage.src
        : absoluteUrl(post.featuredImage.src);
      return `
    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escape(settings.email)} (${escape(post.author)})</author>
      <category>${escape(post.category)}</category>
      <description><![CDATA[${post.excerpt}]]></description>
      <media:content url="${escape(image)}" medium="image" />
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(settings.name)} — Engineering Journal</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escape(settings.description)}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
