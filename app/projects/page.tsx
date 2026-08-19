import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getProjects } from "@/notion/data";
import { pageMeta } from "@/lib/seo";
import { ProjectFilters } from "@/features/projects/project-filters";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
    title: "Projects — Civil Engineering, Construction & Geospatial Work",
    description:
      "Explore Er. Raja Dey's project experience across industrial construction, Jal Jeevan Mission field work, property valuation, GIS, surveying, and civil engineering.",
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
        title="A record of work and experience."
        description="Explore selected projects across civil engineering, construction, GIS, surveying, property assessment, and related field work."
        breadcrumbs={[{ label: "Projects", href: "/projects" }]}
      />

      <section className="container-shell py-16">
        <ProjectFilters projects={projects} initialCategory={decoded} />
      </section>

      <CtaBanner title="Have a project or opportunity to discuss?" />
    </>
  );
}