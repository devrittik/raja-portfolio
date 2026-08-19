import { ClipboardCheck, FileSearch, HardHat, Map, Ruler } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";

const phases = [
  {
    icon: Map,
    title: "Understand the Problem",
    body:
      "Start with the project requirements, available documents, site conditions, location data, and the questions that need to be answered.",
  },
  {
    icon: FileSearch,
    title: "Collect & Verify",
    body:
      "Combine available records, GIS data, drawings, field observations, inspections, and other relevant information to establish a reliable baseline.",
  },
  {
    icon: Ruler,
    title: "Analyse",
    body:
      "Apply civil engineering knowledge, spatial analysis, technical assessment, and practical field judgement to understand the problem and its constraints.",
  },
  {
    icon: HardHat,
    title: "Coordinate & Execute",
    body:
      "Work with site teams, surveyors, contractors, and other stakeholders to support practical execution and keep technical requirements aligned with field conditions.",
  },
  {
    icon: ClipboardCheck,
    title: "Document & Communicate",
    body:
      "Turn findings and analysis into clear maps, technical reports, valuation assessments, project records, and actionable information for decision-making.",
  },
];

/** Horizontal-phase timeline showing the studio's delivery methodology. */
export function ConstructionTimeline() {
  return (
    <section className="container-shell py-24 md:py-32">
      <SectionHeader
        eyebrow="Engineering approach"
        title="Understand the site. Analyse the data. Solve the problem."
        description="From construction sites and property inspections to GIS analysis and technical assessment, I combine field knowledge with digital tools to make better engineering decisions."
        align="center"
      />
      <RevealGroup className="relative mt-16">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-border lg:left-0 lg:top-6 lg:block lg:h-px lg:w-full" aria-hidden />
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-6">
          {phases.map((phase, i) => (
            <RevealItem key={phase.title} className="relative lg:pt-14">
              <div className="absolute left-6 top-2 hidden -translate-x-1/2 lg:left-6 lg:top-6 lg:block lg:-translate-y-1/2">
                <span className="grid size-12 place-items-center rounded-full border-2 border-primary/40 bg-card shadow-soft">
                  <phase.icon className="size-5 text-primary" />
                </span>
              </div>
              <div className="flex items-start gap-4 lg:block lg:pl-0">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-primary/40 bg-card shadow-soft lg:hidden">
                  <phase.icon className="size-5 text-primary" />
                </span>
                <div>
                  <p className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-primary">
                    Phase {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1.5 font-display text-[16px] font-bold tracking-tight">{phase.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{phase.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
