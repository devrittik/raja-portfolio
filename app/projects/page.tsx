import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getProjects } from "@/notion/data";
import { pageMeta } from "@/lib/seo";
import { ProjectFilters } from "@/features/projects/project-filters";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
    title: "Projects — Bridges, Highways, GIS & Structural Engineering Case Studies",
    description:
      "Browse the archive: bridge retrofits, highway DPRs, metro viaducts, drone surveys and GIS platforms — every project with its problem, engineering and outcome documented.",
    path: "/projects",
  });
}

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProjectsPage({ searchParams }: Props) {
  const [projects, { category }] = await Promise.all([getProjects(), searchParams]);
  const decoded = category ? decodeURIComponent(category) : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Project archive"
        title="The work, on the record."
        description="Filter by discipline, status or software. Every case study opens with the client's problem and closes with what we learned."
        breadcrumbs={[{ label: "Projects", href: "/projects" }]}
      />
      <section className="container-shell py-16">
        <ProjectFilters projects={projects} initialCategory={decoded} />
      </section>
      <CtaBanner title="Don't see your project type? Ask anyway." />
    </>
  );
}
