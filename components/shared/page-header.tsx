import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Reveal } from "./reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

/** Hero block used at the top of inner pages. */
export function PageHeader({ eyebrow, title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
      <div className="container-shell relative pb-14 pt-16 md:pb-20 md:pt-24">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <Reveal className="mt-6 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-6 bg-primary/60" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-balance sm:text-5xl md:text-[3.4rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground text-pretty">
              {description}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
