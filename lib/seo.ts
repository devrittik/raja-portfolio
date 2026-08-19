import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/config";
import { truncate } from "@/lib/format";

interface PageMetaInput {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** Set true for noindex routes. */
  noIndex?: boolean;
}

/**
 * Single source of truth for per-route metadata.
 * Generates OpenGraph, Twitter cards and canonical URLs.
 */
export function pageMeta({
  title,
  description,
  path = "",
  keywords = [],
  image = "/images/hero.jpg",
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);
  return {
    title,
    description: truncate(description, 160),
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description: truncate(description, 200),
      url,
      siteName: "Er. Raja Dey",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: truncate(description, 200),
      images: [ogImage],
    },
  };
}
