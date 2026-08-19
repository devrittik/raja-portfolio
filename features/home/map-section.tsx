import { SectionHeader } from "@/components/shared/section-header";
import { getProjects } from "@/notion/data";
import { ProjectMapLoader } from "@/features/map/map-loader";

/** Interactive map of all geo-tagged projects. */
export async function MapSection() {
  const projects = (await getProjects()).filter((p) => p.latitude != null);

  return (
    <section className="border-y border-border bg-secondary/40 py-24 md:py-32">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Project locations"
          title="Engineering experience across the field."
          description="Explore the locations behind my professional experience, from civil construction and water infrastructure to GIS and property assessment."
        />
        <div className="mt-12">
          <ProjectMapLoader projects={projects} className="h-[480px]" />
        </div>
      </div>
    </section>
  );
}
