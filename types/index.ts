/**
 * Domain types for the CMS layer.
 * Every shape here maps 1:1 to a Notion database — see /notion/mappers.ts
 * and README.md for the exact property names each field reads from.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string; // lucide icon name
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export interface FooterGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export type ProjectStatus = "Completed" | "In Progress" | "Design" | "On Hold";

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  client: string;
  budget: string;
  duration: string;
  role: string;
  status: ProjectStatus;
  location: string;
  latitude?: number;
  longitude?: number;
  software: string[];
  tags: string[];
  problem: string;
  solution: string;
  challenges: string[];
  deliverables: string[];
  lessons: string[];
  process: ProcessStep[];
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  /** Optional drone-era comparison imagery. */
  beforeAfter?: { before: ImageAsset; after: ImageAsset };
  videos: { title: string; url: string }[];
  documents: { title: string; url: string }[];
  featured: boolean;
  published: boolean;
  year: string;
  testimonialIndex?: number;
  seo?: SEOData;
}

/** Lightweight map/listing projection. */
export type MapProject = Pick<
  Project,
  "id" | "title" | "slug" | "category" | "location" | "latitude" | "longitude" | "heroImage" | "excerpt"
>;

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string; // lucide icon name
  description: string;
  longDescription?: string;
  benefits: string[];
  process: ProcessStep[];
  deliverables: string[];
  image: ImageAsset;
  pricing?: string;
  faqs: FAQItem[];
  featured: boolean;
  seo?: SEOData;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  role?: string;
  date: string; // ISO
  readMinutes: number;
  tags: string[];
  featuredImage: ImageAsset;
  /** Fallback HTML body used when not connected to Notion. */
  html?: string;
  featured: boolean;
  published: boolean;
  seo?: SEOData;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number; // 1–5
  quote: string;
  initials: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current: boolean;
  points: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  grade?: string;
  notes?: string;
}

export interface SkillGroup {
  name: string;
  items: { name: string; level: number }[]; // level 0–100
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface ResearchPaper {
  title: string;
  venue: string;
  year: string;
  authors: string[];
  abstract: string;
  url?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  image: ImageAsset;
  category: string;
  caption: string;
}

export interface SiteSettings {
  name: string; // company / practice name
  person: string; // lead engineer
  role: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string; // digits only, intl format
  address: string;
  officeHours: string[];
  location: string;
  mapCenter: [number, number];
  resumeUrl: string;
  clients: string[];
  experiences?: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface HomeContent {
  eyebrow: string;
  headline: string[];
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: StatItem[];
}

export interface AboutContent {
  bio: string[];
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
  memberships: string[];
}

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "Project" | "Service" | "Article" | "Page";
}
