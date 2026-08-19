import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { getFeaturedProjects } from "@/notion/data";
import { ProjectCard } from "@/features/projects/project-card";

/** Featured project grid on the home page. */
export async function FeaturedProjects() {
  const projects = await getFeaturedProjects(3);

  return (
    <section className="border-y border-border bg-secondary/40 py-24 md:py-32">
      <div className="container-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Selected projects"
            title="Engineering work, grounded in experience."
            description="A selection of professional work across civil construction, field engineering, GIS, and property assessment."
          />

          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View all projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <RevealItem key={project.id} className="h-full">
              <ProjectCard project={project} index={i} priority={i === 0} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
