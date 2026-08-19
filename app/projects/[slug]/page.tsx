import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Lightbulb,
  MapPin,
  MonitorPlay,
  Play,
  Target,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PrintButton } from "@/components/shared/print-button";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { PhotoGallery } from "@/features/media/photo-gallery";
import { BeforeAfter } from "@/features/media/before-after";
import { ProjectMapLoader } from "@/features/map/map-loader";
import { ProjectCard } from "@/features/projects/project-card";
import { TestimonialCard } from "@/features/testimonials/testimonial-card";
import { NotionContent } from "@/features/notion/notion-content";
import { getProjectBySlug, getProjects, getSiteSettings, getTestimonials } from "@/notion/data";
import { getRecordMap } from "@/notion/record-map";
import { isCmsConfigured } from "@/notion/client";
import { pageMeta } from "@/lib/seo";
import { JsonLd, projectSchema } from "@/lib/json-ld";
import { TableOfContents } from "@/features/blog/table-of-contents";

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return pageMeta({
    title: project.seo?.title ?? `${project.title} — ${project.category} Case Study`,
    description: project.seo?.description ?? project.excerpt,
    path: `/projects/${project.slug}`,
    image: project.heroImage.src,
    keywords: project.tags,
  });
}

const meta = (icon: React.ElementType, label: string, value: string) =>
  value
    ? {
        icon,
        label,
        value,
      }
    : null;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, settings, testimonials, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
    getTestimonials(),
    getProjects(),
  ]);
  if (!project) notFound();

  // Long-form body from the Notion page (only when CMS is connected)
  const recordMap = isCmsConfigured ? await getRecordMap(project.id) : null;

  const related = allProjects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 3);
  const quote = project.testimonialIndex != null ? testimonials[project.testimonialIndex] : undefined;

  const metaItems = [
    meta(Briefcase, "Client", project.client),
    meta(Banknote, "Budget", project.budget),
    meta(Clock, "Duration", project.duration),
    meta(Wrench, "Role", project.role),
    meta(MapPin, "Location", project.location),
    meta(CalendarClock, "Year", project.year),
  ].filter(Boolean) as { icon: React.ElementType; label: string; value: string }[];

  const toc = [
    ...(project.problem ? [{ id: "challenge", text: "Problem & Solution", level: 2 }] : []),
    ...(project.process.length ? [{ id: "process", text: "Construction process", level: 2 }] : []),
    ...(project.gallery.length ? [{ id: "gallery", text: "Gallery", level: 2 }] : []),
    ...(project.beforeAfter ? [{ id: "before-after", text: "Before / After", level: 2 }] : []),
    ...(project.latitude ? [{ id: "location", text: "Location", level: 2 }] : []),
    ...(project.lessons.length ? [{ id: "lessons", text: "Lessons learned", level: 2 }] : []),
  ];

  return (
    <>
      <JsonLd data={projectSchema(project, settings)} />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[46vh] min-h-[380px] w-full overflow-hidden md:h-[58vh]">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt || project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/45 to-steel-950/10" aria-hidden />
          <div className="container-shell absolute inset-x-0 bottom-0 pb-10 text-white md:pb-14">
            <Breadcrumbs
              items={[
                { label: "Projects", href: "/projects" },
                { label: project.category, href: `/projects?category=${encodeURIComponent(project.category)}` },
                { label: project.title, href: `/projects/${project.slug}` },
              ]}
            />
            <Reveal className="mt-5 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-white/30 bg-white/10 text-white backdrop-blur">{project.category}</Badge>
                <Badge className="border-white/30 bg-white/10 text-white backdrop-blur">{project.status}</Badge>
                {project.featured && <Badge className="border-transparent bg-primary text-primary-foreground">Featured</Badge>}
              </div>
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-[3.4rem]">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80">{project.excerpt}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="no-print border-b border-border bg-card">
        <div className="container-shell grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-3 lg:grid-cols-6">
          {metaItems.map((item) => (
            <div key={item.label}>
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                <item.icon className="size-3.5 text-primary" /> {item.label}
              </p>
              <p className="mt-1.5 text-[14px] font-semibold leading-snug">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container-shell grid gap-14 py-14 lg:grid-cols-[1fr_300px]">
        {/* Main column */}
        <article className="min-w-0">
          {/* Problem & solution */}
          {(project.problem || project.solution) && (
            <section id="challenge" className="scroll-mt-28">
              <SectionHeader eyebrow="The challenge" title="Problem & engineered solution." />
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {project.problem && (
                  <Reveal>
                    <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-soft">
                      <p className="flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.16em] text-destructive">
                        <Target className="size-4" /> The problem
                      </p>
                      <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{project.problem}</p>
                    </div>
                  </Reveal>
                )}
                {project.solution && (
                  <Reveal delay={0.08}>
                    <div className="h-full rounded-2xl border border-primary/30 bg-primary/[0.04] p-7 shadow-soft">
                      <p className="flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.16em] text-primary">
                        <Lightbulb className="size-4" /> Our solution
                      </p>
                      <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{project.solution}</p>
                    </div>
                  </Reveal>
                )}
              </div>

              {(project.challenges.length > 0 || project.deliverables.length > 0) && (
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {project.challenges.length > 0 && (
                    <Reveal>
                      <div className="h-full rounded-2xl border border-border bg-secondary/50 p-7">
                        <p className="flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.16em] text-foreground">
                          <AlertTriangle className="size-4 text-brand-500" /> What made it hard
                        </p>
                        <ul className="mt-3 space-y-2.5">
                          {project.challenges.map((c) => (
                            <li key={c} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                              <span className="mt-2 size-1.5 shrink-0 rounded-sm bg-primary" aria-hidden />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  )}
                  {project.deliverables.length > 0 && (
                    <Reveal delay={0.08}>
                      <div className="h-full rounded-2xl border border-border bg-secondary/50 p-7">
                        <p className="flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.16em] text-foreground">
                          <ClipboardList className="size-4 text-forest-500" /> Deliverables
                        </p>
                        <ul className="mt-3 space-y-2.5">
                          {project.deliverables.map((d) => (
                            <li key={d} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-forest-500" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Notion long-form body */}
          {recordMap && (
            <section className="mt-14">
              <NotionContent recordMap={recordMap} />
            </section>
          )}

          {/* Process */}
          {project.process.length > 0 && (
            <section id="process" className="mt-16 scroll-mt-28">
              <SectionHeader eyebrow="The build" title="Construction process." />
              <ol className="mt-8 grid gap-5 sm:grid-cols-2">
                {project.process.map((step, i) => (
                  <Reveal key={step.step} delay={i * 0.06}>
                    <li className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift">
                      <span className="font-display text-5xl font-extrabold text-primary/15 transition-colors group-hover:text-primary/30">
                        {step.step}
                      </span>
                      <h3 className="mt-1 font-display text-[16px] font-bold">{step.title}</h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{step.description}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </section>
          )}

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <section id="gallery" className="mt-16 scroll-mt-28">
              <SectionHeader eyebrow="Documentation" title="Site gallery." />
              <div className="mt-8">
                <PhotoGallery images={project.gallery} />
              </div>
            </section>
          )}

          {/* Videos */}
          {project.videos.length > 0 && (
            <section className="mt-16">
              <SectionHeader eyebrow="Footage" title="Project videos." />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.videos.map((video) => (
                  <a
                    key={video.title}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Play className="size-5" fill="currentColor" />
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-semibold group-hover:text-primary">{video.title}</span>
                      <span className="text-[12.5px] text-muted-foreground">Watch externally</span>
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Before / After */}
          {project.beforeAfter && (
            <section id="before-after" className="mt-16 scroll-mt-28">
              <SectionHeader
                eyebrow="Transformation"
                title="Before / after."
                description="Drag the handle to compare the corridor at survey stage against the delivered geometry."
              />
              <Reveal className="mt-8">
                <BeforeAfter
                  before={project.beforeAfter.before}
                  after={project.beforeAfter.after}
                  beforeLabel="Survey stage"
                  afterLabel="Delivered"
                />
              </Reveal>
            </section>
          )}

          {/* Location */}
          {project.latitude != null && project.longitude != null && (
            <section id="location" className="mt-16 scroll-mt-28">
              <SectionHeader eyebrow="Site" title="Project location." />
              <div className="mt-8">
                <ProjectMapLoader
                  projects={[project]}
                  zoom={11}
                  center={[project.latitude, project.longitude]}
                  className="h-[380px]"
                  scrollWheelZoom
                />
              </div>
            </section>
          )}

          {/* Lessons */}
          {project.lessons.length > 0 && (
            <section id="lessons" className="mt-16 scroll-mt-28">
              <Reveal>
                <div className="rounded-3xl bg-steel-950 p-8 text-white md:p-12">
                  <p className="flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.16em] text-brand-400">
                    <GraduationCap className="size-4" /> Lessons we'd repeat — and ones we wouldn't
                  </p>
                  <ul className="mt-6 grid gap-4 md:grid-cols-3">
                    {project.lessons.map((lesson) => (
                      <li key={lesson} className="rounded-2xl bg-white/5 p-5 text-[13.5px] leading-relaxed text-steel-100/90 ring-1 ring-white/10">
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>
          )}

          {/* Testimonial */}
          {quote && (
            <section className="mt-16">
              <Reveal>
                <TestimonialCard t={quote} className="mx-auto max-w-2xl" />
              </Reveal>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="no-print space-y-6 lg:sticky lg:top-28 lg:self-start">
          <TableOfContents headings={toc} />

          {project.software.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <MonitorPlay className="size-4 text-primary" /> Software
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.software.map((tool) => (
                  <Badge key={tool} variant="secondary" className="normal-case tracking-normal">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {project.tags.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Tags</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="normal-case tracking-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              <FileText className="size-4 text-primary" /> Downloads
            </p>
            <div className="mt-4 space-y-2">
              <PrintButton label="Project sheet (PDF)" />
              {project.documents.map((doc) => (
                <Button key={doc.title} asChild variant="ghost" size="sm" className="w-full justify-start gap-2">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <Download /> {doc.title}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary to-brand-600 p-6 text-primary-foreground shadow-lift">
            <p className="font-display text-lg font-bold">Project like this?</p>
            <p className="mt-2 text-[13px] leading-relaxed opacity-90">
              Tell us about your site and we'll scope it within one working day.
            </p>
            <Button asChild size="sm" variant="secondary" className="mt-4 bg-white text-brand-700 hover:bg-white/90">
              <Link href="/contact">
                Talk to an engineer <ArrowRight />
              </Link>
            </Button>
          </div>

          <Separator />
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            Delivered by {settings.name}, {settings.location}. Project data verified with client consent.
          </p>
        </aside>
      </div>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-16">
          <div className="container-shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeader eyebrow="Keep reading" title="Related case studies." />
              <Link href="/projects" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                All projects <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06} className="h-full">
                  <ProjectCard project={p} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
