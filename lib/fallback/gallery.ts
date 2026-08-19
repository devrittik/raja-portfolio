import type { GalleryItem } from "@/types";

const img = (src: string, alt: string, w = 1600, h = 1067) => ({ src, alt, width: w, height: h });

export const fallbackGallery: GalleryItem[] = [
  {
    id: "g1",
    image: img(
      "/images/projects/bokaro/hero.jpeg",
      "Industrial construction site in Bokaro"
    ),
    category: "Bokaro",
    caption: "Industrial construction — Bokaro, Jharkhand",
  },

  {
    id: "g2",
    image: img(
      "/images/projects/bokaro/site.jpeg",
      "Civil construction activity at the Bokaro project site"
    ),
    category: "Bokaro",
    caption: "On-site civil construction and execution",
  },

  {
    id: "g3",
    image: img(
      "/images/projects/bokaro/site-2.jpeg",
      "Construction work at an industrial project site"
    ),
    category: "Construction",
    caption: "Industrial construction — site execution",
  },

  {
    id: "g4",
    image: img(
      "/images/projects/jal-jeevan/hero.jpeg",
      "Jal Jeevan Mission project site in Jashpur"
    ),
    category: "Jal Jeevan Mission",
    caption: "Jal Jeevan Mission — Jashpur, Chhattisgarh",
  },

  {
    id: "g5",
    image: img(
      "/images/projects/jal-jeevan/site.jpeg",
      "Field activity at the Jal Jeevan Mission project"
    ),
    category: "Jal Jeevan Mission",
    caption: "Field monitoring and project execution",
  },

  {
    id: "g6",
    image: img(
      "/images/projects/jal-jeevan/field.jpeg",
      "Field work at the Jashpur project"
    ),
    category: "Field Work",
    caption: "Site work and field coordination — Jashpur",
  },

  {
    id: "g7",
    image: img(
      "/images/projects/property-valuation/hero.jpeg",
      "Property inspection and technical assessment"
    ),
    category: "Property Assessment",
    caption: "Property inspection and technical assessment",
  },

  {
    id: "g8",
    image: img(
      "/images/projects/property-valuation/inspection.jpeg",
      "Property inspection in the field"
    ),
    category: "Property Assessment",
    caption: "On-site property inspection",
  },

  // {
  //   id: "g9",
  //   image: img(
  //     "/images/projects/property-valuation/inspection.jpeg",
  //     "Property assessment field work"
  //   ),
  //   category: "Field Work",
  //   caption: "Field verification for property assessment",
  // },

  {
    id: "g10",
    image: img(
      "/images/projects/bokaro/site-3.jpeg",
      "Industrial construction field work"
    ),
    category: "Construction",
    caption: "Construction progress and field coordination",
  },

  // {
  //   id: "g11",
  //   image: img(
  //     "/images/projects/jal-jeevan/site-2.jpeg",
  //     "Water infrastructure project site"
  //   ),
  //   category: "Jal Jeevan Mission",
  //   caption: "Water infrastructure field work — Jashpur",
  // },

  // {
  //   id: "g12",
  //   image: img(
  //     "/images/projects/property-valuation/field.jpeg",
  //     "Property field assessment"
  //   ),
  //   category: "Field Work",
  //   caption: "Field-based technical assessment",
  // },
];

export const galleryCategories = [
  "All",
  "Construction",
  "Bokaro",
  "Jal Jeevan Mission",
  "Property Assessment",
  "Field Work",
];