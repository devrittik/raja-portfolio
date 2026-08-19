import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Briefcase,
  Compass,
  Download,
  GraduationCap,
  Medal,
  Target,
  Telescope,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { CtaBanner } from "@/components/shared/cta-banner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAbout, getAwards, getCertifications, getEducation, getExperience, getGallery, getResearch, getSiteSettings, getSkills } from "@/notion/data";
import { pageMeta } from "@/lib/seo";
import { SkillBars } from "@/features/about/skill-bars";
import { PhotoGallery } from "@/features/media/photo-gallery";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return pageMeta({
    title: `About ${settings.person} — Biography, Experience & Credentials`,
    description: `Meet the team behind ${settings.name}: biography, mission, professional timeline, education, certifications and research.`,
    path: "/about",
  });
}

export default async function AboutPage() {
  const [settings, about, experience, education, skills, certifications, awards, research, gallery] =
    await Promise.all([
      getSiteSettings(),
      getAbout(),
      getExperience(),
      getEducation(),
      getSkills(),
      getCertifications(),
      getAwards(),
      getResearch(),
      getGallery(),
    ]);

  return (
    <>
      <PageHeader
        eyebrow="ABOUT RAJA DEY"
        title="Civil engineering, powered by geospatial intelligence."
        description="From construction sites to GIS mapping and technical property evaluation,
                    I combine field experience with spatial analysis to deliver accurate,
                    practical engineering solutions."
        breadcrumbs={[{ label: "About", href: "/about" }]}
      >
        <Reveal className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={settings.resumeUrl}>
              <Download /> Download resume
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Let's Connect</Link>
          </Button>
        </Reveal>
      </PageHeader>

      {/* Bio + portrait */}
      <section className="container-shell grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-3xl border border-border shadow-lift">
            <Image
              src="/images/portrait-dp.jpg"
              alt={`${settings.person} on site`}
              width={900}
              height={1100}
              className="aspect-[4/5] w-full object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-soft">
            <div>
              <p className="font-display font-bold">{settings.person}</p>
              <p className="text-[12.5px] text-muted-foreground">{settings.role}</p>
            </div>
            <Compass className="size-6 text-primary" aria-hidden />
          </div>
        </Reveal>
        <div>
          <SectionHeader eyebrow="Biography" title="The engineer behind the name." />
          <div className="prose-content mt-6">
            {about.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Mission & Vision */}
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2">
            <RevealItem>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Target className="size-5" />
                </span>
                <h3 className="mt-4 font-display font-bold">Mission</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{about.mission}</p>
              </div>
            </RevealItem>
            <RevealItem>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="grid size-11 place-items-center rounded-xl bg-steel-600/10 text-steel-600 dark:text-steel-300">
                  <Telescope className="size-5" />
                </span>
                <h3 className="mt-4 font-display font-bold">Vision</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{about.vision}</p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Working principles"
            title="What I don't compromise on."
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value) => (
              <RevealItem key={value.title}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h3 className="font-display text-[15.5px] font-bold leading-snug text-primary">{value.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Timeline — experience */}
      <section className="container-shell py-20">
        <SectionHeader
          eyebrow="Timeline"
          title="From construction sites to geospatial intelligence."
        />
        <div className="relative mt-12 border-l-2 border-border pl-8 md:pl-12">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.start}`} delay={i * 0.05} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border-2 border-primary bg-background md:-left-[57px]">
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-display text-lg font-bold tracking-tight">{job.role}</h3>
                {job.current && <Badge>Current</Badge>}
              </div>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-primary">
                <Briefcase className="size-3.5" /> {job.company} · {job.location}
              </p>
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                {job.start} — {job.current ? "Present" : job.end}
              </p>
              <ul className="mt-3 space-y-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education + Certifications */}
      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Education" title="Foundations." />
            <div className="mt-8 space-y-4">
              {education.map((edu) => (
                <Reveal key={edu.degree}>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <GraduationCap className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-[15.5px] font-bold leading-snug">{edu.degree}</h3>
                        <p className="mt-0.5 text-[13px] text-muted-foreground">
                          {edu.institution} · {edu.start}–{edu.end}
                          {edu.grade ? ` · ${edu.grade}` : ""}
                        </p>
                        {edu.notes && <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{edu.notes}</p>}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Credentials" title="Certified to sign." />
            <div className="mt-8 space-y-4">
              {certifications.map((cert) => (
                <Reveal key={cert.name}>
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-steel-600/10 text-steel-600 dark:text-steel-300">
                      <Medal className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[15.5px] font-bold leading-snug">{cert.name}</h3>
                      <p className="mt-0.5 text-[13px] text-muted-foreground">
                        {cert.issuer} · {cert.year}
                        {cert.credentialId ? ` · ID ${cert.credentialId}` : ""}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="flex items-center gap-2 font-display font-bold">
                  <Users className="size-5 text-primary" /> Professional memberships
                </h3>
                <ul className="mt-4 space-y-2 text-[13.5px] text-muted-foreground">
                  {about.memberships.map((m) => (
                    <li key={m} className="border-l-2 border-primary/30 pl-3">{m}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="container-shell py-20">
        <SectionHeader eyebrow="Capability" title="Tools of the trade." />
        <div className="mt-10">
          <SkillBars groups={skills} />
        </div>
      </section>

      {/* Awards + Research */}
      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="container-shell grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Recognition" title="Awards." />
            <div className="mt-8 space-y-4">
              {awards.map((award) => (
                <Reveal key={award.title}>
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                      <Award className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-bold leading-snug">{award.title}</h3>
                      <p className="mt-0.5 text-[13px] text-muted-foreground">{award.issuer} · {award.year}</p>
                      {award.description && <p className="mt-1 text-[13px] text-muted-foreground">{award.description}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Research" title="Published work." />
            <div className="mt-8 space-y-4">
              {research.map((paper) => (
                <Reveal key={paper.title}>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-200">
                        <BookOpen className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-[15px] font-bold leading-snug">{paper.title}</h3>
                        <p className="mt-0.5 text-[13px] text-muted-foreground">
                          {paper.venue} · {paper.year}
                        </p>
                        <p className="mt-1 text-[12.5px] text-muted-foreground">{paper.authors.join(", ")}</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{paper.abstract}</p>
                        {paper.url && (
                          <a href={paper.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[13px] font-semibold text-primary hover:underline">
                            Read the paper →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="container-shell py-20">
        <SectionHeader
          eyebrow="In the field"
          title="Where engineering meets reality."
          description="A look at the environments that have shaped my experience — from construction sites and field inspections to surveying, GIS work, and property assessment."
        />
        <div className="mt-10">
          <PhotoGallery images={gallery.slice(0, 6).map((g) => g.image)} />
        </div>
      </section>

      <CtaBanner title="Want this experience on your project?" />
    </>
  );
}
