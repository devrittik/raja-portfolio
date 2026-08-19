import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getPosts } from "@/notion/data";
import { pageMeta } from "@/lib/seo";
import { BlogFilters } from "@/features/blog/blog-filters";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
    title: "Journal — Civil Engineering Notes, Case Studies & Practice Guides",
    description:
      "Field notes on seismic audits, drone surveying, precast economics, GIS platforms and BIM coordination — written by engineers, for asset owners and engineers.",
    path: "/blog",
  });
}

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const [posts, { q, category }] = await Promise.all([getPosts(), searchParams]);

  return (
    <>
      <PageHeader
        eyebrow="Engineering notes"
        title="Learning from the field. Exploring what's next."
        description="A collection of notes on civil engineering, geoinformatics, GIS, field work, and emerging technologies such as GeoAI."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />
      <section className="container-shell py-16">
        <BlogFilters posts={posts} initialCategory={category} />
      </section>
      <CtaBanner title="Reading about your exact problem? Let's talk." />
    </>
  );
}
