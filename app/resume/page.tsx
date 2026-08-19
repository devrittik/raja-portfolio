import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PrintButton } from "@/components/shared/print-button";
import { Separator } from "@/components/ui/separator";
import {
  getAbout,
  getAwards,
  getCertifications,
  getEducation,
  getExperience,
  getSiteSettings,
  getSkills,
} from "@/notion/data";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return pageMeta({
    title: `Resume — ${settings.person}, ${settings.role}`,
    description: `Curriculum vitae of ${settings.person}: experience, education, certifications and selected projects.`,
    path: "/resume",
    noIndex: true,
  });
}

/** Print-friendly CV. "Download PDF" uses the browser's print-to-PDF. */
export default async function ResumePage() {
  const [settings, about, experience, education, skills, certifications, awards] = await Promise.all([
    getSiteSettings(),
    getAbout(),
    getExperience(),
    getEducation(),
    getSkills(),
    getCertifications(),
    getAwards(),
  ]);
  if (!settings) notFound();

  return (
    <div className="container-shell max-w-4xl py-14">
      <div className="no-print mb-8 flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/[0.05] px-6 py-4">
        <p className="flex items-center gap-2 text-[13.5px] font-medium text-muted-foreground">
          <FileText className="size-4 text-primary" />
          A PDF version of my CV is available for viewing and download.
        </p>
        <PrintButton label="View CV" />
      </div>

      <div className="print-sheet rounded-2xl border border-border bg-card p-8 shadow-soft md:p-12">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight">{settings.person}</h1>
            <p className="mt-1 text-[15px] font-medium text-primary">{settings.role}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="size-3.5" /> {settings.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="size-3.5" /> {settings.phone}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {settings.location}
              </span>
            </div>
          </div>
          {/* <div className="text-right text-[12px] leading-relaxed text-muted-foreground">
            <p className="font-display font-bold text-foreground">{settings.name}</p>
            <p className="max-w-xs">{settings.address}</p>
          </div> */}
        </header>

        <Separator className="my-7" />

        {/* Summary */}
        <section>
          <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-primary">Professional summary</h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{about.bio[0]}</p>
        </section>

        {/* Experience */}
        <section className="mt-8">
          <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-primary">Experience</h2>
          <div className="mt-4 space-y-6">
            {experience.map((job) => (
              <div key={job.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[14.5px] font-bold">
                    {job.role} — <span className="font-semibold text-muted-foreground">{job.company}</span>
                  </h3>
                  <p className="text-[12px] text-muted-foreground">
                    {job.start} — {job.current ? "Present" : job.end}
                  </p>
                </div>
                <p className="text-[12px] text-muted-foreground">{job.location}</p>
                <ul className="mt-1.5 space-y-1 text-[12.5px] leading-relaxed text-muted-foreground">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-primary" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-8">
          <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-primary">Education</h2>
          <div className="mt-4 space-y-3">
            {education.map((edu) => (
              <div key={edu.degree} className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-[14px] font-bold">{edu.degree}</h3>
                  <p className="text-[12.5px] text-muted-foreground">
                    {edu.institution} · {edu.location}
                    {edu.grade ? ` · ${edu.grade}` : ""}
                  </p>
                </div>
                <p className="text-[12px] text-muted-foreground">{edu.start}–{edu.end}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mt-8">
          <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-primary">Skills</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.name}>
                <h3 className="text-[12.5px] font-bold text-foreground">{group.name}</h3>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <Badge key={skill.name} variant="secondary" className="normal-case tracking-normal">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials */}
        <section className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-primary">Certifications</h2>
            <ul className="mt-3 space-y-1.5 text-[12.5px] text-muted-foreground">
              {certifications.map((c) => (
                <li key={c.name}>
                  <span className="font-semibold text-foreground">{c.name}</span> — {c.issuer}, {c.year}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-primary">Honours</h2>
            <ul className="mt-3 space-y-1.5 text-[12.5px] text-muted-foreground">
              {awards.map((a) => (
                <li key={a.title}>
                  <span className="font-semibold text-foreground">{a.title}</span> — {a.issuer}, {a.year}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Separator className="my-7" />
        <p className="text-center text-[11.5px] text-muted-foreground">
          References and detailed project dossiers available on request · {settings.email}
        </p>
      </div>

      <div className="no-print mt-8 flex justify-center">
        <Button asChild size="lg">
          <a href="/contact">Discuss a role or project</a>
        </Button>
      </div>
    </div>
  );
}
