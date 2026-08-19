import type { Service } from "@/types";

const img = (src: string, alt: string) => ({ src, alt, width: 1600, height: 1067 });

export const fallbackServices: Service[] = [
  {
    id: "s1",
    title: "Civil Engineering & Construction",
    slug: "civil-engineering",
    icon: "HardHat",
    description:
      "Practical civil engineering experience across construction, site execution, drawing interpretation, coordination, and technical reporting.",
    longDescription:
      "My civil engineering background combines academic design knowledge with hands-on field experience. I have worked on construction projects involving site supervision, execution monitoring, drawing reading, quality and safety practices, contractor coordination, progress reporting, and project documentation.",
    benefits: [
      "Site execution and supervision",
      "Engineering drawing interpretation",
      "Construction coordination and progress monitoring",
      "Technical documentation and reporting",
    ],
    process: [
      {
        step: "01",
        title: "Understand",
        description:
          "Review project requirements, drawings, site conditions, and available technical information.",
      },
      {
        step: "02",
        title: "Assess",
        description:
          "Combine engineering knowledge with field observations to identify practical requirements and constraints.",
      },
      {
        step: "03",
        title: "Coordinate",
        description:
          "Work with contractors, surveyors, and project teams to support effective site execution.",
      },
      {
        step: "04",
        title: "Document",
        description:
          "Maintain progress information, technical observations, and project documentation.",
      },
    ],
    deliverables: [
      "Site inspection and execution support",
      "Drawing review and interpretation",
      "Progress and technical reports",
      "Construction coordination",
    ],
    image: img("/images/civil-engg.jpg", "Civil construction project"),
    featured: true,
    seo: {
      title: "Civil Engineering & Construction | Er. Raja Dey",
      description:
        "Civil engineering experience covering site execution, construction coordination, drawing interpretation, inspection, and technical reporting.",
    },
    faqs: [
      {
        question: "What civil engineering work do you have experience with?",
        answer:
          "My civil engineering experience includes site execution, construction supervision, drawing interpretation, quality and safety monitoring, contractor coordination, progress tracking, and technical reporting.",
      },
      {
        question: "Are you available for civil engineering projects?",
        answer:
          "Yes. I am open to suitable freelance projects, technical assignments, and collaborations that align with my civil engineering education and professional experience.",
      },
    ],
  },

  {
    id: "s2",
    title: "GIS & Geospatial Analysis",
    slug: "gis-geospatial",
    icon: "Globe2",
    description:
      "Geospatial analysis using ArcGIS Pro, Google Earth Pro, mapping, spatial data processing, classification, and field data.",
    longDescription:
      "My Geoinformatics experience focuses on using spatial data to understand places, properties, land, and urban change. I have worked with ArcGIS Pro and Google Earth Pro across mapping, spatial analysis, land-data work, field data collection, and geospatial project workflows.",
    benefits: [
      "ArcGIS Pro-based spatial analysis",
      "Mapping and spatial data processing",
      "Land and property identification",
      "Field data collection and geospatial interpretation",
    ],
    process: [
      {
        step: "01",
        title: "Collect",
        description:
          "Gather available spatial, field, satellite, and reference data relevant to the problem.",
      },
      {
        step: "02",
        title: "Prepare",
        description:
          "Organize, process, correct, and assess spatial data before analysis.",
      },
      {
        step: "03",
        title: "Analyze",
        description:
          "Apply spatial analysis and classification techniques to identify patterns and relationships.",
      },
      {
        step: "04",
        title: "Communicate",
        description:
          "Turn the analysis into maps, visualizations, and understandable technical findings.",
      },
    ],
    deliverables: [
      "GIS maps and spatial datasets",
      "Spatial analysis and classification",
      "Land and property mapping",
      "Geospatial visualizations and reports",
    ],
    image: img("/images/gis.jpg", "Geospatial map analysis"),
    featured: true,
    seo: {
      title: "GIS & Geospatial Analysis | Er. Raja Dey",
      description:
        "GIS and geospatial analysis using ArcGIS Pro, Google Earth Pro, spatial data processing, mapping, and field data.",
    },
    faqs: [
      {
        question: "What GIS tools do you work with?",
        answer:
          "My documented GIS toolkit includes ArcGIS Pro and Google Earth Pro. My experience includes mapping, spatial data processing, correction, assessment, analysis, classification, and geospatial visualization.",
      },
      {
        question: "What kind of GIS projects have you worked on?",
        answer:
          "My experience includes digital land-record related work, urban and regional planning, field data collection, land and property identification, and analysis of built-up changes using geospatial techniques.",
      },
    ],
  },

  {
    id: "s3",
    title: "Property Valuation & Inspection",
    slug: "property-valuation",
    icon: "Building2",
    description:
      "Technical property assessment combining GIS-based identification, physical inspection, market assessment, documentation review, and reporting.",
    longDescription:
      "In my current role as a Junior Technical Manager, I work on Loan Against Property, LAP-C, and NPA property valuation assignments. The work combines GIS-based property identification with physical inspection, market valuation assessment, technical and legal document verification, due diligence, and collateral risk assessment.",
    benefits: [
      "GIS-assisted property identification",
      "Physical property inspection",
      "Market valuation assessment",
      "Technical due diligence and documentation review",
    ],
    process: [
      {
        step: "01",
        title: "Identify",
        description:
          "Use available location and spatial information to identify and verify the property.",
      },
      {
        step: "02",
        title: "Inspect",
        description:
          "Conduct physical inspection and compare on-ground conditions with available records.",
      },
      {
        step: "03",
        title: "Assess",
        description:
          "Evaluate property characteristics, market conditions, technical factors, and potential risks.",
      },
      {
        step: "04",
        title: "Report",
        description:
          "Compile findings into clear technical and valuation documentation for decision-making.",
      },
    ],
    deliverables: [
      "Property inspection reports",
      "Technical valuation reports",
      "GIS-assisted property identification",
      "Technical due diligence findings",
    ],
    image: img("/images/property-valuation.jpg", "Property inspection and assessment"),
    featured: true,
    seo: {
      title: "Property Valuation & Technical Inspection | Er. Raja Dey",
      description:
        "Technical property valuation, GIS-assisted identification, physical inspection, due diligence, and assessment.",
    },
    faqs: [
      {
        question: "What does your property valuation work involve?",
        answer:
          "My current work includes GIS-assisted property identification, physical inspections, market valuation assessments, technical due diligence, documentation verification, collateral risk assessment, and preparation of technical and valuation reports.",
      },
      {
        question: "Which types of property assignments do you handle?",
        answer:
          "My current responsibilities include Loan Against Property (LAP), LAP-C, and NPA property valuation assignments.",
      },
    ],
  },

  {
    id: "s4",
    title: "Surveying & Field Data",
    slug: "surveying-field-data",
    icon: "Radar",
    description:
      "Field-oriented work combining surveying, site observation, mapping, data collection, and engineering interpretation.",
    longDescription:
      "Field experience is an important part of my engineering approach. My background includes surveying and field data collection, site inspections, drawing interpretation, execution monitoring, and GIS-supported ground verification. I use field observations together with digital tools to build a more reliable understanding of a site or property.",
    benefits: [
      "Field data collection",
      "Site inspection and verification",
      "Surveying and mapping support",
      "GIS-assisted ground verification",
    ],
    process: [
      {
        step: "01",
        title: "Plan",
        description:
          "Define the information required and prepare the field data-collection approach.",
      },
      {
        step: "02",
        title: "Observe",
        description:
          "Collect relevant site, property, and location information through field inspection.",
      },
      {
        step: "03",
        title: "Verify",
        description:
          "Compare field observations with drawings, maps, records, and spatial information.",
      },
      {
        step: "04",
        title: "Record",
        description:
          "Organize observations and measurements into useful technical documentation.",
      },
    ],
    deliverables: [
      "Field inspection records",
      "Survey and mapping support",
      "Site documentation",
      "Field-verified spatial information",
    ],
    image: img("/images/surveying.jpg", "Field surveying and data collection"),
    featured: false,
    seo: {
      title: "Surveying & Field Data Services | Er. Raja Dey",
      description:
        "Field inspection, surveying, mapping, data collection, and GIS-assisted ground verification.",
    },
    faqs: [
      {
        question: "What kind of field and surveying work do you handle?",
        answer:
          "My experience includes field data collection, property and site inspections, surveying support, drawing interpretation, execution monitoring, and GIS-assisted ground verification.",
      },
      {
        question: "Do you combine field work with GIS?",
        answer:
          "Yes. Combining field observations with spatial data is an important part of my approach, particularly for property identification, inspection, mapping, and technical assessment.",
      },
    ],
  },

  {
    id: "s5",
    title: "Urban & Regional Planning",
    slug: "urban-regional-planning",
    icon: "Map",
    description:
      "Geospatial approaches to urban analysis, land-use change, built-up growth, and planning-related studies.",
    longDescription:
      "My academic and internship experience includes urban and regional planning and geospatial analysis of urban growth. My M.Tech project examined decadal changes in the built-up area of Kolkata Municipal Corporation using satellite imagery, spatial analysis, and visualization techniques.",
    benefits: [
      "Built-up area analysis",
      "Land-use and land-cover analysis",
      "Urban growth assessment",
      "Geospatial support for planning studies",
    ],
    process: [
      {
        step: "01",
        title: "Define",
        description:
          "Identify the planning question, study area, time period, and available datasets.",
      },
      {
        step: "02",
        title: "Map",
        description:
          "Prepare spatial datasets and time-series maps using appropriate geospatial tools.",
      },
      {
        step: "03",
        title: "Compare",
        description:
          "Analyze spatial and temporal changes to understand patterns of development.",
      },
      {
        step: "04",
        title: "Interpret",
        description:
          "Translate spatial findings into clear observations that can support planning decisions.",
      },
    ],
    deliverables: [
      "Urban growth maps",
      "Built-up area analysis",
      "Land-use change analysis",
      "Spatial analysis reports",
    ],
    image: img("/images/urban-planning.jpg", "Urban spatial analysis"),
    featured: false,
    seo: {
      title: "Urban & Regional Planning | Er. Raja Dey",
      description:
        "Geospatial analysis for urban growth, built-up area change, land-use analysis, and planning studies.",
    },
    faqs: [
      {
        question: "What urban planning work have you undertaken?",
        answer:
          "My academic and internship experience includes urban and regional planning and geospatial analysis. My M.Tech project analyzed decadal changes in the built-up area of Kolkata Municipal Corporation using geospatial techniques.",
      },
      {
        question: "What was your M.Tech project about?",
        answer:
          "The project analyzed built-up and land-use changes across Kolkata Municipal Corporation for 2000, 2010, and 2020 using satellite imagery, ArcGIS Pro, Google Earth Pro, spatial analysis, and visualization techniques.",
      },
    ],
  },

  {
    id: "s6",
    title: "GeoAI — Future Focus",
    slug: "geoai",
    icon: "BrainCircuit",
    description:
      "An emerging direction combining geospatial data, artificial intelligence, and civil engineering to solve complex spatial problems.",
    longDescription:
      "GeoAI is a future area I want to explore further by combining my background in civil engineering and geoinformatics with modern AI techniques. The goal is to investigate how intelligent spatial analysis can support engineering, surveying, planning, property assessment, and environmental applications.",
    benefits: [
      "Geospatial data and AI integration",
      "Intelligent spatial analysis",
      "Automation of repetitive geospatial workflows",
      "Technology-driven engineering problem solving",
    ],
    process: [
      {
        step: "01",
        title: "Explore",
        description:
          "Identify engineering and geospatial problems where AI could provide practical value.",
      },
      {
        step: "02",
        title: "Prepare",
        description:
          "Organize and understand the spatial datasets required for analysis.",
      },
      {
        step: "03",
        title: "Experiment",
        description:
          "Explore suitable machine-learning and AI approaches for spatial problems.",
      },
      {
        step: "04",
        title: "Apply",
        description:
          "Work toward practical GeoAI applications that improve engineering and geospatial workflows.",
      },
    ],
    deliverables: [
      "GeoAI prototypes and experiments",
      "AI-assisted spatial analysis",
      "Geospatial automation concepts",
      "Research and applied project work",
    ],
    image: img("/images/geoai.jpg", "Geospatial data visualization"),
    featured: false,
    seo: {
      title: "GeoAI & Geospatial Technology | Er. Raja Dey",
      description:
        "Exploring GeoAI and intelligent geospatial applications at the intersection of civil engineering and geoinformatics.",
    },
    faqs: [
      {
        question: "Are you currently offering GeoAI services?",
        answer:
          "GeoAI is currently an area I am looking to explore and develop further rather than an established standalone service. My goal is to combine my civil engineering and geoinformatics background with AI-driven spatial analysis.",
      },
      {
        question: "Why are you interested in GeoAI?",
        answer:
          "I see potential for AI and geospatial technology to improve engineering, surveying, planning, property assessment, and other spatial problem-solving workflows.",
      },
    ],
  },
];