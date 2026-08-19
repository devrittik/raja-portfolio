import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CmsIcon } from "@/components/shared/icon";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { getServices } from "@/notion/data";

/** Six-tile services teaser on the home page. */
export async function ServicesPreview() {
  const services = (await getServices()).slice(0, 6);

  return (
    <section className="container-shell py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow="What I work with"
          title="Civil engineering meets geospatial intelligence."
          description="From field execution and property assessment to GIS, surveying, and spatial analysis — I combine practical engineering experience with geospatial technology to solve real-world problems."
        />
        <Link
          href="/services"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          All services
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <RevealItem key={service.id}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
            >
              <div className="absolute -right-8 -top-8 size-28 rounded-full bg-primary/8 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" aria-hidden />
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <CmsIcon name={service.icon} className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{service.title}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                Explore capability
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
