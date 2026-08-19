import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, IndianRupee } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/shared/reveal";
import { CtaBanner } from "@/components/shared/cta-banner";
import { Button } from "@/components/ui/button";
import { CmsIcon } from "@/components/shared/icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getServiceBySlug, getServices, getSiteSettings } from "@/notion/data";
import { pageMeta } from "@/lib/seo";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/json-ld";

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return pageMeta({
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.description,
    path: `/services/${service.slug}`,
    image: service.image.src,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, settings, services] = await Promise.all([getServiceBySlug(slug), getSiteSettings(), getServices()]);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[serviceSchema(service, settings), ...(service.faqs.length ? [faqSchema(service.faqs)] : [])]} />
      <PageHeader
        eyebrow="Service"
        title={service.title}
        description={service.longDescription ?? service.description}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <Reveal className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="/contact">
              Request a proposal <ArrowRight />
            </Link>
          </Button>
          {service.pricing && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[13px] text-muted-foreground">
              <IndianRupee className="size-3.5 text-primary" /> {service.pricing}
            </span>
          )}
        </Reveal>
      </PageHeader>

      {/* Hero image */}
      <section className="container-shell -mt-2 py-10">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-border shadow-lift">
            <Image
              src={service.image.src}
              alt={service.image.alt || service.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1280px) 1152px, 100vw"
            />
          </div>
        </Reveal>
      </section>

      {/* Benefits + process + deliverables */}
      <section className="container-shell grid gap-12 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeader eyebrow="What's in it for you" title="Benefits, plainly stated." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <Reveal key={benefit}>
                <li className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-4 text-[13.5px] leading-relaxed text-muted-foreground shadow-soft">
                  <Check className="mt-0.5 size-4 shrink-0 text-forest-500" />
                  {benefit}
                </li>
              </Reveal>
            ))}
          </ul>

          {service.process.length > 0 && (
            <>
              <SectionHeader eyebrow="The process" title="How an engagement runs." className="mt-14" />
              <ol className="mt-8 space-y-0">
                {service.process.map((step) => (
                  <Reveal key={step.step}>
                    <li className="relative border-l-2 border-border pb-8 pl-8 last:pb-0">
                      <span className="absolute -left-[13px] top-0 grid size-6 place-items-center rounded-full bg-primary font-display text-[11px] font-bold text-primary-foreground">
                        {step.step}
                      </span>
                      <h3 className="font-display text-[15.5px] font-bold">{step.title}</h3>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{step.description}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          {service.deliverables.length > 0 && (
            <Reveal className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display font-bold">What lands in your inbox</h3>
              <ul className="mt-4 space-y-2.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[13.5px] text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {service.faqs.length > 0 && (
            <Reveal className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display font-bold">Common questions</h3>
              <Accordion type="single" collapsible className="mt-2">
                {service.faqs.map((f, i) => (
                  <AccordionItem key={f.question} value={`faq-${i}`}>
                    <AccordionTrigger className="text-[13.5px]">{f.question}</AccordionTrigger>
                    <AccordionContent className="text-[13px]">{f.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          )}
        </aside>
      </section>

      {/* Other services */}
      <section className="border-t border-border bg-secondary/40 py-16">
        <div className="container-shell">
          <SectionHeader eyebrow="Keep exploring" title="Other capabilities." />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {others.map((other) => (
              <Reveal key={other.id}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <CmsIcon name={other.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-bold group-hover:text-primary">{other.title}</span>
                    <span className="mt-1 line-clamp-2 block text-[12.5px] text-muted-foreground">{other.description}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title={`Need ${service.title.toLowerCase()} for a live project?`} />
    </>
  );
}
