import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  checkbox,
  date,
  email,
  images,
  linkLines,
  lines,
  multiSelect,
  number,
  phone,
  processSteps,
  prop,
  select,
  statLines,
  text,
  url,
} from "./properties";
import type {
  AboutContent,
  Award,
  BlogPost,
  Certification,
  EducationItem,
  ExperienceItem,
  FAQItem,
  GalleryItem,
  HomeContent,
  NavItem,
  Project,
  ProjectStatus,
  ResearchPaper,
  Service,
  SiteSettings,
  SkillGroup,
  SocialLink,
  Testimonial,
} from "@/types";
import { readingMinutes } from "@/lib/format";
import {
  fallbackAbout,
  fallbackHome,
  fallbackSettings,
} from "@/lib/fallback";

type Page = PageObjectResponse;

/* ---------------------------------- projects --------------------------------- */

const STATUSES: ProjectStatus[] = ["Completed", "In Progress", "Design", "On Hold"];

export function mapProject(p: Page): Project {
  const props = p.properties;
  const title = text(prop(props, "Title", "Name"));
  const hero = images(prop(props, "Hero Image", "Cover"), title, p);
  const status = select(prop(props, "Status")) as ProjectStatus;
  return {
    id: p.id,
    title,
    slug: text(prop(props, "Slug")) || p.id.slice(0, 8),
    category: select(prop(props, "Category")) || "General",
    excerpt: text(prop(props, "Excerpt", "Summary", "Description")),
    client: text(prop(props, "Client")),
    budget: text(prop(props, "Budget")),
    duration: text(prop(props, "Duration")),
    role: text(prop(props, "Role")),
    status: STATUSES.includes(status) ? status : "Completed",
    location: text(prop(props, "Location")),
    latitude: number(prop(props, "Latitude", "Lat")),
    longitude: number(prop(props, "Longitude", "Lng", "Long")),
    software: multiSelect(prop(props, "Software", "Tools")),
    tags: multiSelect(prop(props, "Tags")),
    problem: text(prop(props, "Problem")),
    solution: text(prop(props, "Solution")),
    challenges: lines(prop(props, "Challenges")),
    deliverables: lines(prop(props, "Deliverables")),
    lessons: lines(prop(props, "Lessons Learned", "Lessons")),
    process: processSteps(prop(props, "Process", "Construction Process")),
    heroImage: hero[0] ?? { src: "/images/hero.jpg", alt: title },
    gallery: images(prop(props, "Gallery"), title),
    beforeAfter: (() => {
      const before = images(prop(props, "Before Image"), `${title} — before`);
      const after = images(prop(props, "After Image"), `${title} — after`);
      return before[0] && after[0] ? { before: before[0], after: after[0] } : undefined;
    })(),
    videos: linkLines(prop(props, "Videos")),
    documents: linkLines(prop(props, "Documents", "Downloads")),
    featured: checkbox(prop(props, "Featured")),
    published: prop(props, "Published") ? checkbox(prop(props, "Published")) : true,
    year: (date(prop(props, "Date", "Year")) || "").slice(0, 4) || text(prop(props, "Year")),
    seo: {
      title: text(prop(props, "SEO Title")) || undefined,
      description: text(prop(props, "SEO Description")) || undefined,
    },
  };
}

/* ---------------------------------- services --------------------------------- */

export function mapService(p: Page): Service {
  const props = p.properties;
  const title = text(prop(props, "Title", "Name"));
  const imgs = images(prop(props, "Image"), title, p);
  const faqLines = lines(prop(props, "FAQ", "FAQs"));
  return {
    id: p.id,
    title,
    slug: text(prop(props, "Slug")) || p.id.slice(0, 8),
    icon: text(prop(props, "Icon")) || "Landmark",
    description: text(prop(props, "Description")),
    longDescription: text(prop(props, "Long Description")) || undefined,
    benefits: lines(prop(props, "Benefits")),
    process: processSteps(prop(props, "Process")),
    deliverables: lines(prop(props, "Deliverables")),
    image: imgs[0] ?? { src: "/images/hero.jpg", alt: title },
    pricing: text(prop(props, "Pricing")) || undefined,
    faqs: faqLines.map((l) => {
      const [question, ...rest] = l.split(/\s*::\s*/);
      return { question, answer: rest.join(" :: ") };
    }).filter((f) => f.question && f.answer),
    featured: checkbox(prop(props, "Featured")),
    seo: {
      title: text(prop(props, "SEO Title")) || undefined,
      description: text(prop(props, "SEO Description")) || undefined,
    },
  };
}

/* ------------------------------------ blog ----------------------------------- */

export function mapPost(p: Page): BlogPost {
  const props = p.properties;
  const title = text(prop(props, "Title", "Name"));
  const imgs = images(prop(props, "Featured Image", "Cover"), title, p);
  return {
    id: p.id,
    title,
    slug: text(prop(props, "Slug")) || p.id.slice(0, 8),
    excerpt: text(prop(props, "Excerpt", "Summary", "Description")),
    category: select(prop(props, "Category")) || "Engineering",
    author: text(prop(props, "Author")) || "The Studio",
    date: date(prop(props, "Date", "Published Date")) || p.created_time.slice(0, 10),
    readMinutes: number(prop(props, "Reading Time")) || 5,
    tags: multiSelect(prop(props, "Tags")),
    featuredImage: imgs[0] ?? { src: "/images/hero.jpg", alt: title },
    featured: checkbox(prop(props, "Featured")),
    published: prop(props, "Published") ? checkbox(prop(props, "Published")) : true,
    seo: {
      title: text(prop(props, "SEO Title")) || undefined,
      description: text(prop(props, "SEO Description")) || undefined,
    },
  };
}

/* --------------------------------- rest of CMS -------------------------------- */

export function mapTestimonial(p: Page): Testimonial {
  const props = p.properties;
  const name = text(prop(props, "Client Name", "Name", "Title"));
  return {
    id: p.id,
    name,
    role: text(prop(props, "Role", "Position")),
    company: text(prop(props, "Company", "Organization")),
    rating: Math.min(5, Math.max(1, number(prop(props, "Rating")) ?? 5)),
    quote: text(prop(props, "Review", "Quote", "Testimonial")),
    initials: name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
  };
}

export function mapExperience(p: Page): ExperienceItem {
  const props = p.properties;
  return {
    role: text(prop(props, "Role", "Title", "Position")),
    company: text(prop(props, "Company", "Organization")),
    location: text(prop(props, "Location")),
    start: text(prop(props, "Start", "From")),
    end: text(prop(props, "End", "To")),
    current: checkbox(prop(props, "Current")),
    points: lines(prop(props, "Description", "Highlights", "Points")),
  };
}

export function mapEducation(p: Page): EducationItem {
  const props = p.properties;
  return {
    degree: text(prop(props, "Degree", "Title", "Program")),
    institution: text(prop(props, "Institution", "School", "University")),
    location: text(prop(props, "Location")),
    start: text(prop(props, "Start", "From")),
    end: text(prop(props, "End", "To")),
    grade: text(prop(props, "Grade", "Score")) || undefined,
    notes: text(prop(props, "Notes", "Description")) || undefined,
  };
}

/** Skills DB rows: { Group, Name, Level } grouped client-side. */
export function mapSkills(pages: Page[]): SkillGroup[] {
  const groups: Record<string, SkillGroup["items"]> = {};
  for (const p of pages) {
    const props = p.properties;
    const group = text(prop(props, "Group", "Category")) || "General";
    const name = text(prop(props, "Name", "Title", "Skill"));
    const level = number(prop(props, "Level")) ?? 80;
    if (!name) continue;
    (groups[group] ??= []).push({ name, level: Math.min(100, Math.max(0, level)) });
  }
  return Object.entries(groups).map(([name, items]) => ({ name, items }));
}

export function mapCertification(p: Page): Certification {
  const props = p.properties;
  return {
    name: text(prop(props, "Name", "Title", "Certification")),
    issuer: text(prop(props, "Issuer", "Issued By")),
    year: (date(prop(props, "Date", "Year")) || "").slice(0, 4) || text(prop(props, "Year")),
    credentialId: text(prop(props, "Credential ID", "ID")) || undefined,
  };
}

export function mapAward(p: Page): Award {
  const props = p.properties;
  return {
    title: text(prop(props, "Title", "Name", "Award")),
    issuer: text(prop(props, "Issuer", "By")),
    year: (date(prop(props, "Date", "Year")) || "").slice(0, 4) || text(prop(props, "Year")),
    description: text(prop(props, "Description")) || undefined,
  };
}

export function mapResearch(p: Page): ResearchPaper {
  const props = p.properties;
  return {
    title: text(prop(props, "Title", "Name")),
    venue: text(prop(props, "Venue", "Journal", "Conference")),
    year: (date(prop(props, "Date", "Year")) || "").slice(0, 4) || text(prop(props, "Year")),
    authors: lines(prop(props, "Authors")).length
      ? lines(prop(props, "Authors"))
      : multiSelect(prop(props, "Authors")),
    abstract: text(prop(props, "Abstract", "Summary")),
    url: url(prop(props, "URL", "Link", "DOI")) || undefined,
  };
}

export function mapFaq(p: Page): FAQItem {
  const props = p.properties;
  return {
    question: text(prop(props, "Question", "Title", "Name")),
    answer: text(prop(props, "Answer")),
  };
}

export function mapGalleryItem(p: Page): GalleryItem {
  const props = p.properties;
  const caption = text(prop(props, "Caption", "Title", "Name"));
  const imgs = images(prop(props, "Image", "Photo"), caption, p);
  return {
    id: p.id,
    image: imgs[0] ?? { src: "/images/hero.jpg", alt: caption },
    category: select(prop(props, "Category")) || "Site",
    caption,
  };
}

export function mapNavItem(p: Page): NavItem {
  const props = p.properties;
  return {
    label: text(prop(props, "Label", "Title", "Name")),
    href: url(prop(props, "URL", "Href", "Link")) || text(prop(props, "URL", "Href", "Link")) || "/",
    description: text(prop(props, "Description")) || undefined,
  };
}

export function mapSocial(p: Page): SocialLink {
  const props = p.properties;
  return {
    label: text(prop(props, "Label", "Platform", "Title", "Name")),
    href: url(prop(props, "URL", "Link")) || "#",
    icon: text(prop(props, "Icon")) || "Globe",
  };
}

/* ------------------------------ singleton databases ---------------------------- */

/** Site Settings DB — first row wins, merged over bundled defaults. */
export function mapSettings(p: Page | null): SiteSettings {
  if (!p) return fallbackSettings;
  const props = p.properties;
  const d = fallbackSettings;
  const coords = (text(prop(props, "Map Center", "Coordinates")) || "")
    .split(",")
    .map((s) => Number(s.trim()));
  return {
    name: text(prop(props, "Company Name", "Name", "Title")) || d.name,
    person: text(prop(props, "Person", "Lead Engineer")) || d.person,
    role: text(prop(props, "Role", "Title Role")) || d.role,
    tagline: text(prop(props, "Tagline", "Slogan")) || d.tagline,
    description: text(prop(props, "Description", "About")) || d.description,
    email: email(prop(props, "Email")) || d.email,
    phone: phone(prop(props, "Phone")) || d.phone,
    whatsapp: (text(prop(props, "WhatsApp")) || d.whatsapp).replace(/\D/g, ""),
    address: text(prop(props, "Address")) || d.address,
    officeHours: lines(prop(props, "Office Hours")).length ? lines(prop(props, "Office Hours")) : d.officeHours,
    location: text(prop(props, "Location")) || d.location,
    mapCenter: coords.length === 2 && coords.every(Number.isFinite) ? (coords as [number, number]) : d.mapCenter,
    resumeUrl: url(prop(props, "Resume URL", "Resume")) || d.resumeUrl,
    clients: lines(prop(props, "Clients", "Trusted By")).length
      ? lines(prop(props, "Clients", "Trusted By"))
      : multiSelect(prop(props, "Clients", "Trusted By")).length
        ? multiSelect(prop(props, "Clients", "Trusted By"))
        : d.clients,
    seo: {
      title: text(prop(props, "Default SEO Title", "SEO Title")) || d.seo.title,
      description: text(prop(props, "Default SEO Description", "SEO Description")) || d.seo.description,
      keywords: multiSelect(prop(props, "SEO Keywords", "Keywords")).length
        ? multiSelect(prop(props, "SEO Keywords", "Keywords"))
        : d.seo.keywords,
    },
  };
}

/** Home DB — first row, merged over bundled defaults. */
export function mapHome(p: Page | null): HomeContent {
  if (!p) return fallbackHome;
  const props = p.properties;
  const d = fallbackHome;
  const headline = lines(prop(props, "Headline"));
  return {
    eyebrow: text(prop(props, "Eyebrow")) || d.eyebrow,
    headline: headline.length ? headline : d.headline,
    subline: text(prop(props, "Subline", "Subheadline", "Intro")) || d.subline,
    primaryCta: {
      label: text(prop(props, "Primary CTA Label", "Primary CTA")) || d.primaryCta.label,
      href: url(prop(props, "Primary CTA URL")) || d.primaryCta.href,
    },
    secondaryCta: {
      label: text(prop(props, "Secondary CTA Label", "Secondary CTA")) || d.secondaryCta.label,
      href: url(prop(props, "Secondary CTA URL")) || d.secondaryCta.href,
    },
    stats: statLines(prop(props, "Stats")).length ? statLines(prop(props, "Stats")) : d.stats,
  };
}

/** About DB — first row, merged over bundled defaults. */
export function mapAbout(p: Page | null): AboutContent {
  if (!p) return fallbackAbout;
  const props = p.properties;
  const d = fallbackAbout;
  const bio = text(prop(props, "Biography", "Bio"));
  const valuesRaw = lines(prop(props, "Values"));
  return {
    bio: bio ? bio.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean) : d.bio,
    mission: text(prop(props, "Mission")) || d.mission,
    vision: text(prop(props, "Vision")) || d.vision,
    values: valuesRaw.length
      ? valuesRaw.map((v) => {
          const [title, ...rest] = v.split(/\s*::\s*/);
          return { title, description: rest.join(" :: ") };
        })
      : d.values,
    memberships: lines(prop(props, "Memberships", "Professional Memberships")).length
      ? lines(prop(props, "Memberships", "Professional Memberships"))
      : d.memberships,
  };
}

/** Recompute reading time on Notion pages without an explicit value. */
export function withReadingTime(post: BlogPost, wordSource: string): BlogPost {
  return { ...post, readMinutes: readingMinutes(wordSource || post.excerpt) };
}
