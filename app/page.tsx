import type { Metadata } from "next";
import { Hero } from "@/features/home/hero";
import { TrustedBy } from "@/features/home/trusted-by";
import { ServicesPreview } from "@/features/home/services-preview";
import { FeaturedProjects } from "@/features/home/featured-projects";
import { ConstructionTimeline } from "@/features/home/construction-timeline";
import { MapSection } from "@/features/home/map-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { BlogPreview } from "@/features/home/blog-preview";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getHome, getSiteSettings } from "@/notion/data";
import { pageMeta } from "@/lib/seo";

/** Home page — ISR rendered from Notion (or bundled showcase content). */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return pageMeta({
    title: settings.seo.title,
    description: settings.seo.description,
    keywords: settings.seo.keywords,
    path: "/",
  });
}

export default async function HomePage() {
  const [home, settings] = await Promise.all([getHome(), getSiteSettings()]);

  return (
    <>
      <Hero home={home} settings={settings} />
      <TrustedBy clients={settings.clients} />
      <ServicesPreview />
      <FeaturedProjects />
      <ConstructionTimeline />
      <MapSection />
      <TestimonialsSection />
      <BlogPreview />
      <CtaBanner />
    </>
  );
}
