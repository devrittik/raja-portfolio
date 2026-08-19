import type { FooterGroup, HomeContent, NavItem, SiteSettings, SocialLink } from "@/types";

export const fallbackSettings: SiteSettings = {
  name: "Er. Raja Dey",
  person: "Raja Dey",
  role: "Civil & Geoinformatics Engineer",
  tagline: "Coordinates to concrete",
  description:
    "Civil & Geoinformatics Engineer specializing in site execution, GIS mapping, and technical property evaluation. Delivering practical engineering solutions through field inspections, spatial analysis, and data-driven decision making.",
  email: "engineerrajadey@gmail.com",
  phone: "+91 70016 21202",
  whatsapp: "917001621202",
  address: "T.C. Road, Saradpally, Tarakeswar - 712410, India",
  officeHours: ["Mon – Fri: 9:00 AM – 9:00 PM IST", "Feel free to discuss projects"],
  location: "Tarakeswar, India",
  mapCenter: [22.8812880, 88.0119160],
  resumeUrl: "/resume",
  clients: ["Shreyash Engineers", "Sarralle Equipment India Pvt. Ltd.", "Geoinfra Global Solution", "Veritas Finance Limited" ],
  experiences: ["Shreyash Engineers", "Sarralle Equipment India Pvt. Ltd.", "Geoinfra Global Solution", "Veritas Finance Limited" ],
  seo: {
    title: "Er. Raja Dey | Civil & Geoinformatics Engineer",
    description:
      "Portfolio of Er. Raja Dey, a Civil & Geoinformatics Engineer specializing in GIS, site execution, property valuation, spatial analysis, and technical assessment.",
    keywords: [
      "Raja Dey",
      "Er. Raja Dey",
      "civil engineer",
      "geoinformatics engineer",
      "civil engineering portfolio",
      "GIS engineer",
      "GIS mapping",
      "ArcGIS Pro",
      "spatial analysis",
      "property valuation",
      "property inspection",
      "technical property assessment",
      "site engineer",
      "civil site execution",
      "technical due diligence",
      "land analysis",
      "geospatial engineering",
      "civil engineer West Bengal",
      "geoinformatics engineer India",
    ],
  },
};

export const fallbackSocials: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/engineerrajadey/", icon: "Linkedin" },
  // { label: "GitHub", href: "https://github.com", icon: "Github" },
  // { label: "X (Twitter)", href: "", icon: "X" },
  // { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
  // { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
];

export const fallbackNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Civil Engineering & Construction",
        href: "/services/civil-engineering",
        description: "Site execution, construction & technical reporting",
      },
      {
        label: "GIS & Geoinformatics",
        href: "/services/gis-geospatial",
        description: "Mapping, spatial analysis & geospatial data",
      },
      {
        label: "Property Valuation & Inspection",
        href: "/services/property-valuation",
        description: "Property assessment, inspection & due diligence",
      },
      {
        label: "Surveying & Field Work",
        href: "/services/surveying-field-data",
        description: "Field data, site verification & mapping support",
      },
      {
        label: "Urban & Regional Planning",
        href: "/services/urban-regional-planning",
        description: "Urban growth, built-up change & spatial analysis",
      },
      {
        label: "GeoAI — Future Focus",
        href: "/services/geoai",
        description: "Exploring AI-driven geospatial applications",
      },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    children: [
      {
        label: "Industrial Construction — Bokaro",
        href: "/projects/industrial-construction-bokaro",
        description: "Civil construction & site execution in Bokaro",
      },
      {
        label: "Jal Jeevan Mission — Jashpur",
        href: "/projects/jal-jeevan-mission-jashpur",
        description: "Site engineering & field work in Jashpur",
      },
      {
        label: "Property & GIS Assessment",
        href: "/projects/property-valuation-gis-assessment",
        description: "Inspection, valuation & technical assessment",
      },
      {
        label: "All Projects",
        href: "/projects",
        description: "Browse the complete project archive",
      },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const fallbackFooter: FooterGroup[] = [
  {
    title: "Practice",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Gallery", href: "/gallery" },
      { label: "Resume", href: "/resume" },
    ],
  },
  {
    title: "Areas of Work",
    links: [
      { label: "Civil Engineering & Construction", href: "/services/civil-engineering" },
      { label: "GIS & Geoinformatics", href: "/services/gis-geospatial" },
      { label: "Property Valuation & Inspection", href: "/services/property-valuation" },
      { label: "Surveying & Field Work", href: "/services/surveying-field-data" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Journal", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "RSS Feed", href: "/feed.xml" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export const fallbackHome: HomeContent = {
  eyebrow: "Civil · Structural · Geoinformatics",
  headline: ["Coordinates", "to", "concrete."],
  subline:
  "Civil & Geoinformatics Engineer specializing in site execution, GIS mapping, and technical property evaluation. Delivering practical engineering solutions through field inspections, spatial analysis, and data-driven decision making.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "Explore my works", href: "/projects" },
  stats: [
    { value: 2.5, suffix: "+ yrs", label: "Professional experience" },
    { value: 4, suffix: "", label: "Professional roles" },
    { value: 2, suffix: "", label: "Engineering disciplines" },
    { value: 4, suffix: "+", label: "Core technical tools" },
  ],
};
