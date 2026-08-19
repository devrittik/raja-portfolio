import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CtaBanner } from "@/components/shared/cta-banner";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { CmsIcon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { getServices } from "@/notion/data";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
    title: "Civil Engineering & Geoinformatics — Areas of Expertise",
    description:
      "Professional experience across civil engineering and construction, GIS and geoinformatics, property valuation and inspection, surveying, urban and regional planning, and GeoAI.",
    path: "/services",
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything between the survey peg and the occupancy certificate."
        description="Each discipline below is a full vertical — its own team lead, its own quality protocol, and one studio accountable for all of it."
        breadcrumbs={[{ label: "Services", href: "/services" }]}
      />

      <section className="container-shell py-20">
        <RevealGroup className="grid gap-8 md:grid-cols-2">
          {services.map((service, i) => (
            <RevealItem key={service.id}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="relative min-h-52 overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt || service.title}
                    fill
                    priority={i < 2}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {service.featured && (
                    <Badge className="absolute left-4 top-4 border-transparent bg-black/45 text-white backdrop-blur">
                      Core capability
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <CmsIcon name={service.icon} className="size-5" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{service.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {service.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                        <Check className="size-3.5 shrink-0 text-forest-500" /> {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                    Full details <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <CtaBanner />
    </>
  );
}
