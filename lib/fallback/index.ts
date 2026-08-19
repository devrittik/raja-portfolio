/**
 * Bundled showcase content.
 *
 * The site runs 100% on this data until NOTION_TOKEN is configured.
 * Once Notion databases are connected, every getter in /notion/data.ts
 * transparently prefers live CMS content and falls back here per-collection.
 */
export { fallbackAbout } from "./about";
export { fallbackPosts } from "./blog";
export { fallbackGallery, galleryCategories } from "./gallery";
export { fallbackTestimonials } from "./misc";
export * from "./misc";
export { fallbackProjects } from "./projects";
export { fallbackServices } from "./services";
export * from "./site";
