/** Formatting helpers shared across pages and feeds. */

export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(date);
}

export function formatDateShort(iso: string): string {
  return formatDate(iso, { day: "2-digit", month: "short", year: "numeric" });
}

/** Rough reading-time from HTML or plain text (200 wpm). */
export function readingMinutes(text: string): number {
  const words = text.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export function truncate(input: string, max = 160): string {
  if (input.length <= max) return input;
  return `${input.slice(0, max - 1).trimEnd()}…`;
}

/** Extract h2/h3 headings from fallback HTML for table-of-contents. */
export function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const out: { id: string; text: string; level: number }[] = [];
  const re = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    out.push({ id: slugify(text), text, level: Number(match[1]) });
  }
  return out;
}

/** Injects id attributes on h2/h3 so TOC links can scroll to them. */
export function withHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (_m, level, attrs, inner) => {
    const text = String(inner).replace(/<[^>]*>/g, "").trim();
    return `<h${level}${attrs} id="${slugify(text)}">${inner}</h${level}>`;
  });
}
