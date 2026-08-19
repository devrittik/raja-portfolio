import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/features/contact/contact-form";
import { ContactInfo } from "@/features/contact/contact-info";
import { ProjectMapLoader } from "@/features/map/map-loader";
import { getFaqs, getSiteSettings } from "@/notion/data";
import { pageMeta } from "@/lib/seo";
import { faqSchema, JsonLd } from "@/lib/json-ld";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
    title: "Contact Er. Raja Dey — Civil & Geoinformatics Engineer",
    description:
      "Contact Er. Raja Dey regarding civil engineering, GIS, geoinformatics, surveying, property assessment, professional opportunities, and collaborations in India.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [settings, faqs] = await Promise.all([getSiteSettings(), getFaqs()]);

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHeader
        eyebrow="Contact"
        title="Let's start a conversation."
        description="Whether it's a project, collaboration, or professional opportunity, I'd be happy to hear from you and understand what you're working on."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="container-shell grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9">
            <h2 className="font-display text-xl font-bold tracking-tight">Project enquiry</h2>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground">
              Fields marked * are required. The more context you share, the better I can understand your enquiry.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactInfo settings={settings} />
        </Reveal>
      </section>

      {/* Studio map */}
      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Based in India"
            title="Engineering without a fixed boundary."
            description="Based in India and available for professional opportunities and collaborations across the country. Connect by phone, video meeting, or in person."
          />
          <div className="mt-10">
            <ProjectMapLoader
              projects={[
                {
                  id: "base",
                  title: settings.name,
                  slug: "",
                  category: "Based in India",
                  location: settings.location,
                  latitude: settings.mapCenter[0],
                  longitude: settings.mapCenter[1],
                  heroImage: {
                    src: "/images/portrait-dp.jpg",
                    alt: settings.name,
                  },
                  excerpt: settings.address,
                },
              ]}
              zoom={13}
              center={settings.mapCenter}
              scrollWheelZoom
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container-shell max-w-3xl py-20">
        <SectionHeader eyebrow="Before you ask" title="Frequently asked questions." align="center" />
        <Reveal className="mt-10 rounded-2xl border border-border bg-card px-6 shadow-soft">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>
    </>
  );
}
