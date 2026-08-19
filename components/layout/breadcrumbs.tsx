import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "@/lib/json-ld";

export interface Crumb {
  label: string;
  href: string;
}

/** Visual + JSON-LD breadcrumbs. Render above page content, not on the home page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(trail.map((c) => ({ name: c.label, href: c.href })))}
      />
      <nav aria-label="Breadcrumb" className="no-print">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.href + i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3.5 text-border" aria-hidden />}
                {last ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {crumb.label}
                  </span>
                ) : (
                  <Link href={crumb.href} className="inline-flex items-center gap-1 transition-colors hover:text-primary">
                    {i === 0 && <Home className="size-3.5" aria-hidden />}
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
