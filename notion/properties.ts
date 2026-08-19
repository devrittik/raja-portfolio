import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { ImageAsset, ProcessStep } from "@/types";

type Property = PageObjectResponse["properties"][string];
type Props = PageObjectResponse["properties"];

const norm = (s: string) => s.toLowerCase().replace(/[\s_]+/g, " ").trim();

/** Case/whitespace-insensitive property lookup. */
export function prop(props: Props, ...names: string[]): Property | undefined {
  const wanted = names.map(norm);
  for (const key of Object.keys(props)) {
    if (wanted.includes(norm(key))) return props[key];
  }
  return undefined;
}

/** Plain text from title or rich_text properties. */
export function text(p: Property | undefined): string {
  if (!p) return "";
  if (p.type === "title") return p.title.map((t) => t.plain_text).join("");
  if (p.type === "rich_text") return p.rich_text.map((t) => t.plain_text).join("");
  if (p.type === "formula") {
    if (p.formula.type === "string") return p.formula.string ?? "";
    if (p.formula.type === "number") return String(p.formula.number ?? "");
    if (p.formula.type === "boolean") return String(p.formula.boolean);
    if (p.formula.type === "date") return p.formula.date?.start ?? "";
  }
  return "";
}

export function select(p: Property | undefined): string {
  if (!p) return "";
  if (p.type === "select") return p.select?.name ?? "";
  if (p.type === "status") return p.status?.name ?? "";
  return text(p);
}

export function multiSelect(p: Property | undefined): string[] {
  if (!p) return [];
  if (p.type === "multi_select") return p.multi_select.map((o) => o.name);
  const t = text(p);
  return t ? t.split(",").map((s) => s.trim()).filter(Boolean) : [];
}

export function number(p: Property | undefined): number | undefined {
  if (p?.type === "number" && p.number !== null) return p.number;
  const t = text(p).replace(/[^\d.-]/g, "");
  const n = Number(t);
  return Number.isFinite(n) && t !== "" ? n : undefined;
}

export function checkbox(p: Property | undefined): boolean {
  if (!p) return false;
  if (p.type === "checkbox") return p.checkbox;
  return text(p).toLowerCase() === "true";
}

export function url(p: Property | undefined): string {
  if (!p) return "";
  if (p.type === "url") return p.url ?? "";
  return text(p);
}

export function email(p: Property | undefined): string {
  if (!p) return "";
  if (p.type === "email") return p.email ?? "";
  return text(p);
}

export function phone(p: Property | undefined): string {
  if (!p) return "";
  if (p.type === "phone_number") return p.phone_number ?? "";
  return text(p);
}

export function date(p: Property | undefined): string {
  if (p?.type === "date") return p.date?.start ?? "";
  return text(p);
}

/** Split a multi-line rich text property into trimmed lines. */
export function lines(p: Property | undefined): string[] {
  return text(p)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

/**
 * Parse "Title :: Description" lines into ProcessStep objects.
 * Lines starting with "01." / "1)" keep their number as the step label.
 */
export function processSteps(p: Property | undefined): ProcessStep[] {
  return lines(p).map((line, i) => {
    const numbered = line.match(/^(\d{1,2})[.)]\s*(.*)$/);
    const body = numbered ? numbered[2] : line;
    const [title, ...rest] = body.split(/\s*::\s*|\s+—\s+|\s+–\s+/);
    return {
      step: numbered ? numbered[1].padStart(2, "0") : String(i + 1).padStart(2, "0"),
      title: title.trim(),
      description: rest.join(" — ").trim() || "",
    };
  });
}

/** Parse "value | suffix | label" lines into stat objects. */
export function statLines(p: Property | undefined) {
  return lines(p).map((line) => {
    const [value, suffix = "", label = ""] = line.split("|").map((s) => s.trim());
    return { value: Number(value) || 0, suffix, label };
  });
}

/** Parse "Title | URL" lines into link objects. */
export function linkLines(p: Property | undefined): { title: string; url: string }[] {
  return lines(p).map((line) => {
    const [title, ...rest] = line.split("|").map((s) => s.trim());
    return { title, url: rest.join("|") || "#" };
  }).filter((l) => l.title);
}

/** Extract images from files & media properties (or fall back to page cover). */
export function images(p: Property | undefined, alt: string, page?: PageObjectResponse): ImageAsset[] {
  const out: ImageAsset[] = [];
  if (p?.type === "files") {
    for (const f of p.files) {
      const src = f.type === "file" ? f.file.url : f.type === "external" ? f.external.url : "";
      if (src) out.push({ src, alt: f.name.replace(/\.[a-z0-9]+$/i, "") || alt });
    }
  }
  if (out.length === 0 && page?.cover?.type === "external") {
    out.push({ src: page.cover.external.url, alt });
  } else if (out.length === 0 && page?.cover?.type === "file") {
    out.push({ src: page.cover.file.url, alt });
  }
  return out;
}
