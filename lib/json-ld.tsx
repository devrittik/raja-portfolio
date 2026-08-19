import { absoluteUrl } from "@/lib/config";
import type {
  AboutContent,
  BlogPost,
  FAQItem,
  Project,
  Service,
  SiteSettings,
  Testimonial,
} from "@/types";

/** Renders an application/ld+json script block. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.name,
    url: absoluteUrl("/"),
    description: settings.description,
    email: settings.email,
    telephone: settings.phone,
    address: { "@type": "PostalAddress", streetAddress: settings.address },
  };
}

export function personSchema(settings: SiteSettings, about: AboutContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.person,
    jobTitle: settings.role,
    url: absoluteUrl("/about"),
    description: about.bio[0],
    worksFor: { "@type": "Organization", name: settings.name },
    email: settings.email,
  };
}

export function websiteSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.name,
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${absoluteUrl("/blog")}?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function projectSchema(project: Project, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    additionalType: "https://schema.org/Project",
    name: project.title,
    description: project.excerpt,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: project.heroImage.src.startsWith("http")
      ? project.heroImage.src
      : absoluteUrl(project.heroImage.src),
    about: project.category,
    creator: { "@type": "Organization", name: settings.name },
    locationCreated: { "@type": "Place", name: project.location },
    keywords: project.tags.join(", "),
    datePublished: `${project.year}-01-01`,
  };
}

export function serviceSchema(service: Service, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: settings.name, url: absoluteUrl("/") },
    url: absoluteUrl(`/services/${service.slug}`),
    areaServed: settings.location,
  };
}

export function articleSchema(post: BlogPost, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: settings.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: post.featuredImage.src.startsWith("http")
      ? post.featuredImage.src
      : absoluteUrl(post.featuredImage.src),
    keywords: post.tags.join(", "),
  };
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function reviewSchema(testimonials: Testimonial[], settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.name,
    url: absoluteUrl("/"),
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: t.rating, bestRating: 5 },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
    })),
  };
}
