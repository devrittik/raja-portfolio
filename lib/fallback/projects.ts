import type { Project } from "@/types";

const img = (src: string, alt: string) => ({ src, alt, width: 1600, height: 1067 });

export const fallbackProjects: Project[] = [
  {
    id: "p1",
    title: "Industrial Construction — Bokaro",
    slug: "industrial-construction-bokaro",
    category: "Industrial Construction",
    excerpt:
      "Civil engineering and site execution experience at the Bokaro Vedanta Steel Plant, supporting construction activities, coordination, quality, safety and project reporting.",
    client: "Sarralle Equipment India Pvt. Ltd.",
    budget: "",
    duration: "Apr 2022 – May 2023",
    role: "Junior Engineer (Civil)",
    status: "Completed",
    location: "Bokaro, Jharkhand, India",
    latitude: 23.6693,
    longitude: 86.1511,
    software: ["AutoCAD", "Microsoft Excel"],
    tags: [
      "Industrial Construction",
      "Civil Engineering",
      "Site Execution",
      "Quality Control",
      "Safety",
    ],
    problem:
      "Industrial construction requires close coordination between engineering drawings, site activities, contractors, quality requirements and safety practices.",
    solution:
      "Supported onsite civil execution, monitored daily work progress, interpreted engineering drawings, coordinated with contractors, implemented quality and safety practices, and prepared site reports for management evaluation.",
    challenges: [
      "Coordinating onsite civil construction activities",
      "Maintaining quality and safety during execution",
      "Coordinating engineering drawings with practical site requirements",
    ],
    deliverables: [
      "Site execution support",
      "Engineering drawing interpretation",
      "Quality and safety monitoring",
      "Progress tracking and site reporting",
    ],
    lessons: [
      "Practical site experience strengthens engineering judgement and drawing interpretation.",
      "Consistent coordination and progress monitoring are essential for effective construction execution.",
    ],
    process: [
      {
        step: "01",
        title: "Review",
        description:
          "Review engineering drawings, site requirements and planned construction activities.",
      },
      {
        step: "02",
        title: "Execute",
        description:
          "Support and monitor civil construction activities at site.",
      },
      {
        step: "03",
        title: "Coordinate",
        description:
          "Coordinate with contractors and other site personnel to maintain progress.",
      },
      {
        step: "04",
        title: "Report",
        description:
          "Document site observations, progress and technical information for management.",
      },
    ],
    heroImage: img(
      "/images/projects/bokaro/hero.jpeg",
      "Industrial construction project in Bokaro"
    ),
    gallery: [
      img(
        "/images/projects/bokaro/site.jpeg",
        "Industrial construction site in Bokaro"
      ),
      img(
        "/images/projects/bokaro/site-2.jpeg",
        "Site execution"
      ),
    ],
    videos: [],
    documents: [],
    featured: true,
    published: true,
    year: "2023",
    testimonialIndex: undefined,
    seo: {
      title: "Industrial Construction — Bokaro | Er. Raja Dey",
      description:
        "Civil engineering and site execution experience at the Bokaro Vedanta Steel Plant, including construction coordination, quality, safety and technical reporting.",
    },
  },

  {
    id: "p2",
    title: "Jal Jeevan Mission — Jashpur",
    slug: "jal-jeevan-mission-jashpur",
    category: "Water Infrastructure",
    excerpt:
      "Site engineering experience on the Jal Jeevan Mission, supporting field execution, survey coordination, progress monitoring, DPR preparation, data collection and analysis.",
    client: "Shreyash Engineers",
    budget: "",
    duration: "Oct 2021 – Feb 2022",
    role: "Site Engineer",
    status: "Completed",
    location: "Jashpur, Chhattisgarh, India",
    latitude: 22.8873,
    longitude: 84.1431,
    software: ["AutoCAD", "Microsoft Excel"],
    tags: [
      "Jal Jeevan Mission",
      "Site Engineering",
      "Surveying",
      "DPR",
      "Field Data",
    ],
    problem:
      "The project required regular field monitoring, coordination with surveyors and subcontractors, quality compliance and reliable project information for planning and reporting.",
    solution:
      "Monitored daily site activities, coordinated with surveyors and subcontractors, supervised work, tracked project progress, supported DPR preparation and contributed to data collection and analysis.",
    challenges: [
      "Coordinating field activities with surveyors and subcontractors",
      "Maintaining quality and compliance with project guidelines",
      "Collecting and organizing field information for project documentation",
    ],
    deliverables: [
      "Daily site monitoring",
      "Survey and subcontractor coordination",
      "Progress monitoring",
      "DPR support",
      "Field data collection and analysis",
    ],
    lessons: [
      "Reliable field data is essential for effective planning and project reporting.",
      "Coordination between survey, execution and documentation teams helps keep project activities aligned.",
    ],
    process: [
      {
        step: "01",
        title: "Field assessment",
        description:
          "Review site conditions and collect information required for project activities.",
      },
      {
        step: "02",
        title: "Coordinate",
        description:
          "Coordinate with surveyors, subcontractors and other site personnel.",
      },
      {
        step: "03",
        title: "Monitor",
        description:
          "Monitor daily activities, quality, progress and compliance with project requirements.",
      },
      {
        step: "04",
        title: "Document",
        description:
          "Support DPR preparation, data collection, analysis and project reporting.",
      },
    ],
    heroImage: img(
      "/images/projects/jal-jeevan/hero.jpeg",
      "Jal Jeevan Mission project site"
    ),
    gallery: [
      img(
        "/images/projects/jal-jeevan/site.jpeg",
        "Jal Jeevan Mission site activity"
      ),
      img(
        "/images/projects/jal-jeevan/field.jpeg",
        "Field survey and project work"
      ),
    ],
    videos: [],
    documents: [],
    featured: true,
    published: true,
    year: "2022",
    testimonialIndex: undefined,
    seo: {
      title: "Jal Jeevan Mission — Jashpur | Er. Raja Dey",
      description:
        "Site engineering experience on the Jal Jeevan Mission in Jashpur, covering field execution, survey coordination, progress monitoring, DPR support and data collection.",
    },
  },

  {
    id: "p3",
    title: "Property Valuation & GIS Assessment",
    slug: "property-valuation-gis-assessment",
    category: "Property & GIS",
    excerpt:
      "GIS-assisted property identification, physical inspection, valuation assessment, technical due diligence and reporting as part of property valuation assignments.",
    client: "Veritas Finance Limited",
    budget: "",
    duration: "Dec 2025 – Present",
    role: "Junior Technical Manager",
    status: "In Progress",
    location: "India",
    latitude: 23.6850,
    longitude: 87.7500,
    software: ["ArcGIS Pro", "Google Earth Pro", "Microsoft Excel"],
    tags: [
      "Property Valuation",
      "GIS",
      "Property Inspection",
      "Technical Due Diligence",
      "LAP",
      "NPA",
    ],
    problem:
      "Property valuation requires reliable property identification, physical verification, technical assessment, documentation review and consideration of market and collateral-related factors.",
    solution:
      "Work combines GIS-based property identification with physical inspection, boundary identification, market valuation assessment, technical and legal document verification, due diligence, collateral risk assessment and preparation of technical and valuation reports.",
    challenges: [
      "Verifying property information against physical site conditions",
      "Combining GIS information with field inspection findings",
      "Managing technical evaluations across multiple locations",
    ],
    deliverables: [
      "GIS-assisted property identification",
      "Physical property inspection",
      "Market valuation assessment",
      "Technical due diligence",
      "Technical and valuation reports",
    ],
    lessons: [
      "Spatial data becomes more useful when validated against real-world field conditions.",
      "Reliable property assessment requires combining spatial, physical, documentary and market information.",
    ],
    process: [
      {
        step: "01",
        title: "Identify",
        description:
          "Use GIS and available property information to identify and locate the subject property.",
      },
      {
        step: "02",
        title: "Inspect",
        description:
          "Conduct physical inspection and verify property boundaries and on-ground conditions.",
      },
      {
        step: "03",
        title: "Assess",
        description:
          "Evaluate technical, documentary, market and collateral-related factors.",
      },
      {
        step: "04",
        title: "Report",
        description:
          "Prepare technical and valuation reports to support informed decision-making.",
      },
    ],
    heroImage: img(
      "/images/projects/property-valuation/hero.jpeg",
      "Property inspection and technical assessment"
    ),
    gallery: [
      img(
        "/images/projects/property-valuation/inspection.jpeg",
        "Property field inspection"
      ),
      // img(
      //   "/images/projects/property-valuation/gis.jpeg",
      //   "GIS-assisted property identification"
      // ),
    ],
    videos: [],
    documents: [],
    featured: true,
    published: true,
    year: "2026",
    testimonialIndex: undefined,
    seo: {
      title: "Property Valuation & GIS Assessment | Er. Raja Dey",
      description:
        "GIS-assisted property identification, physical inspection, valuation assessment, technical due diligence and reporting by Er. Raja Dey.",
    },
  },
];