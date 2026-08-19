import { unstable_cache } from "next/cache";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isCmsConfigured, notion } from "./client";
import { resolveDbId, type DbKey } from "./registry";
import {
  mapAbout,
  mapAward,
  mapCertification,
  mapEducation,
  mapExperience,
  mapFaq,
  mapGalleryItem,
  mapHome,
  mapNavItem,
  mapPost,
  mapProject,
  mapResearch,
  mapService,
  mapSettings,
  mapSkills,
  mapSocial,
  mapTestimonial,
} from "./mappers";
import {
  fallbackAbout,
  fallbackAwards,
  fallbackCertifications,
  fallbackEducation,
  fallbackExperience,
  fallbackFaqs,
  fallbackFooter,
  fallbackGallery,
  fallbackHome,
  fallbackNav,
  fallbackPosts,
  fallbackProjects,
  fallbackResearch,
  fallbackServices,
  fallbackSettings,
  fallbackSkills,
  fallbackSocials,
  fallbackTestimonials,
} from "@/lib/fallback";
import type {
  AboutContent,
  Award,
  BlogPost,
  Certification,
  EducationItem,
  ExperienceItem,
  FAQItem,
  FooterGroup,
  GalleryItem,
  HomeContent,
  NavItem,
  Project,
  ResearchPaper,
  SearchItem,
  Service,
  SiteSettings,
  SkillGroup,
  SocialLink,
  Testimonial,
} from "@/types";
import { site, CMS_TAG } from "@/lib/config";

type Page = PageObjectResponse;

/**
 * Data access layer.
 *
 * Every getter is:
 *  - Notion-first (when configured): queries the matching database by name.
 *  - Fallback-backed: if Notion is not configured, a database is missing,
 *    or a query returns no published rows, bundled showcase content is used.
 *  - Cached with ISR + the "cms" tag for on-demand revalidation.
 */

async function queryAll(key: DbKey, sorts?: { property: string; direction?: "ascending" | "descending" }[]): Promise<Page[] | null> {
  if (!notion) return null;
  const dbId = await resolveDbId(key);
  if (!dbId) return null;
  try {
    const pages: Page[] = [];
    let cursor: string | undefined;
    do {
      const res = await notion.databases.query({
        database_id: dbId,
        start_cursor: cursor,
        page_size: 100,
        ...(sorts?.length
          ? { sorts: sorts.map((s) => ({ property: s.property, direction: s.direction ?? "ascending" })) }
          : {}),
      });
      pages.push(...(res.results.filter((r) => r.object === "page") as Page[]));
      cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
    } while (cursor);
    return pages;
  } catch (err) {
    console.error(`[notion] query failed for "${key}"`, err);
    return null;
  }
}

const cacheOpts = { revalidate: site.revalidate, tags: [CMS_TAG] };

function cached<A extends unknown[], R>(key: string, fn: (...args: A) => Promise<R>) {
  return unstable_cache(fn, [key], cacheOpts);
}

/* ------------------------------- singletons ------------------------------- */

async function singleton(key: DbKey): Promise<Page | null> {
  const pages = await queryAll(key);
  return pages?.[0] ?? null;
}

export const getSiteSettings = cached("cms:settings", async (): Promise<SiteSettings> => {
  if (!isCmsConfigured) return fallbackSettings;
  return mapSettings(await singleton("settings"));
});

export const getHome = cached("cms:home", async (): Promise<HomeContent> => {
  if (!isCmsConfigured) return fallbackHome;
  return mapHome(await singleton("home"));
});

export const getAbout = cached("cms:about", async (): Promise<AboutContent> => {
  if (!isCmsConfigured) return fallbackAbout;
  return mapAbout(await singleton("about"));
});

export const getSocials = cached("cms:socials", async (): Promise<SocialLink[]> => {
  if (!isCmsConfigured) return fallbackSocials;
  const pages = await queryAll("socials");
  const mapped = pages?.map(mapSocial).filter((s) => s.label && s.href !== "#") ?? [];
  return mapped.length ? mapped : fallbackSocials;
});

export const getNavigation = cached("cms:nav", async (): Promise<NavItem[]> => {
  if (!isCmsConfigured) return fallbackNav;
  const pages = await queryAll("navigation");
  const items = pages?.map(mapNavItem).filter((n) => n.label) ?? [];
  return items.length ? items : fallbackNav;
});

export const getFooter = cached("cms:footer", async (): Promise<FooterGroup[]> => {
  if (!isCmsConfigured) return fallbackFooter;
  const pages = await queryAll("footer");
  const groups: Record<string, { label: string; href: string }[]> = {};
  for (const p of pages ?? []) {
    const nav = mapNavItem(p);
    const group =
      (p.properties["Group"] as { select?: { name: string } } | undefined)?.select?.name ?? "Links";
    (groups[group] ??= []).push({ label: nav.label, href: nav.href });
  }
  const mapped = Object.entries(groups).map(([title, links]) => ({ title, links }));
  return mapped.length ? mapped : fallbackFooter;
});

/* ------------------------------- collections ------------------------------ */

export const getProjects = cached("cms:projects", async (): Promise<Project[]> => {
  if (!isCmsConfigured) return fallbackProjects;
  const pages = await queryAll("projects");
  const mapped = (pages ?? []).map(mapProject).filter((p) => p.published && p.title);
  return mapped.length ? mapped : fallbackProjects;
});

export const getFeaturedProjects = async (limit = 3): Promise<Project[]> => {
  const all = await getProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
};

export const getProjectBySlug = cached("cms:project-by-slug", async (slug: string): Promise<Project | null> => {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
});

export const getServices = cached("cms:services", async (): Promise<Service[]> => {
  if (!isCmsConfigured) return fallbackServices;
  const pages = await queryAll("services");
  const mapped = (pages ?? []).map(mapService).filter((s) => s.title);
  return mapped.length ? mapped : fallbackServices;
});

export const getServiceBySlug = cached("cms:service-by-slug", async (slug: string): Promise<Service | null> => {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
});

export const getPosts = cached("cms:posts", async (): Promise<BlogPost[]> => {
  if (!isCmsConfigured) return fallbackPosts;
  const pages = await queryAll("blog", [{ property: "Date", direction: "descending" }]);
  const mapped = (pages ?? []).map(mapPost).filter((p) => p.published && p.title);
  return mapped.length
    ? mapped.sort((a, b) => b.date.localeCompare(a.date))
    : [...fallbackPosts].sort((a, b) => b.date.localeCompare(a.date));
});

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) ?? null;
};

export const getTestimonials = cached("cms:testimonials", async (): Promise<Testimonial[]> => {
  if (!isCmsConfigured) return fallbackTestimonials;
  const pages = await queryAll("testimonials");
  const mapped = (pages ?? []).map(mapTestimonial).filter((t) => t.name && t.quote);
  return mapped.length ? mapped : fallbackTestimonials;
});

export const getExperience = cached("cms:experience", async (): Promise<ExperienceItem[]> => {
  if (!isCmsConfigured) return fallbackExperience;
  const pages = await queryAll("experience", [{ property: "Start", direction: "descending" }]);
  const mapped = (pages ?? []).map(mapExperience).filter((e) => e.role);
  return mapped.length ? mapped : fallbackExperience;
});

export const getEducation = cached("cms:education", async (): Promise<EducationItem[]> => {
  if (!isCmsConfigured) return fallbackEducation;
  const pages = await queryAll("education");
  const mapped = (pages ?? []).map(mapEducation).filter((e) => e.degree);
  return mapped.length ? mapped : fallbackEducation;
});

export const getSkills = cached("cms:skills", async (): Promise<SkillGroup[]> => {
  if (!isCmsConfigured) return fallbackSkills;
  const pages = await queryAll("skills");
  const mapped = mapSkills(pages ?? []);
  return mapped.length ? mapped : fallbackSkills;
});

export const getCertifications = cached("cms:certifications", async (): Promise<Certification[]> => {
  if (!isCmsConfigured) return fallbackCertifications;
  const pages = await queryAll("certifications");
  const mapped = (pages ?? []).map(mapCertification).filter((c) => c.name);
  return mapped.length ? mapped : fallbackCertifications;
});

export const getAwards = cached("cms:awards", async (): Promise<Award[]> => {
  if (!isCmsConfigured) return fallbackAwards;
  const pages = await queryAll("awards");
  const mapped = (pages ?? []).map(mapAward).filter((a) => a.title);
  return mapped.length ? mapped : fallbackAwards;
});

export const getResearch = cached("cms:research", async (): Promise<ResearchPaper[]> => {
  if (!isCmsConfigured) return fallbackResearch;
  const pages = await queryAll("research");
  const mapped = (pages ?? []).map(mapResearch).filter((r) => r.title);
  return mapped.length ? mapped : fallbackResearch;
});

export const getFaqs = cached("cms:faqs", async (): Promise<FAQItem[]> => {
  if (!isCmsConfigured) return fallbackFaqs;
  const pages = await queryAll("faqs");
  const mapped = (pages ?? []).map(mapFaq).filter((f) => f.question && f.answer);
  return mapped.length ? mapped : fallbackFaqs;
});

export const getGallery = cached("cms:gallery", async (): Promise<GalleryItem[]> => {
  if (!isCmsConfigured) return fallbackGallery;
  const pages = await queryAll("gallery");
  const mapped = (pages ?? []).map(mapGalleryItem).filter((g) => g.image.src);
  return mapped.length ? mapped : fallbackGallery;
});

/** Aggregate items for the ⌘K search palette. */
export async function getSearchIndex(): Promise<SearchItem[]> {
  const [projects, services, posts] = await Promise.all([getProjects(), getServices(), getPosts()]);
  return [
    { title: "About", description: "Biography, experience and credentials", href: "/about", type: "Page" },
    { title: "Gallery", description: "Drone, construction and drawing archive", href: "/gallery", type: "Page" },
    { title: "Contact", description: "Start a conversation", href: "/contact", type: "Page" },
    { title: "Resume", description: "Print-friendly CV", href: "/resume", type: "Page" },
    ...projects.map((p): SearchItem => ({ title: p.title, description: `${p.category} · ${p.location}`, href: `/projects/${p.slug}`, type: "Project" })),
    ...services.map((s): SearchItem => ({ title: s.title, description: s.description, href: `/services/${s.slug}`, type: "Service" })),
    ...posts.map((b): SearchItem => ({ title: b.title, description: `${b.category} · ${b.readMinutes} min read`, href: `/blog/${b.slug}`, type: "Article" })),
  ];
}

export { isCmsConfigured };
