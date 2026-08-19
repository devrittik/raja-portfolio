import type {
  Award,
  Certification,
  EducationItem,
  ExperienceItem,
  FAQItem,
  ResearchPaper,
  SkillGroup,
  Testimonial,
} from "@/types";

export const fallbackExperience: ExperienceItem[] = [
  {
    role: "Junior Technical Manager",
    company: "Veritas Finance Limited",
    location: "Burdwan, West Bengal, India",
    start: "2025",
    end: "Present",
    current: true,
    points: [
      "Manage Loan Against Property (LAP), LAP-C, and NPA property valuation assignments across multiple regions.",
      "Conduct property identification using GIS techniques, physical inspections, market valuation assessments, and technical due diligence.",
      "Verify legal and technical documentation, assess collateral risks, and prepare detailed technical and valuation reports.",
      "Coordinate multi-location technical operations while ensuring timely and accurate evaluations in line with internal policies and regulatory standards.",
    ],
  },
  {
    role: "GIS Engineer",
    company: "Geoinfra Global Solution",
    location: "Jaipur, Rajasthan, India",
    start: "2025",
    end: "2025",
    current: false,
    points: [
      "Worked on the DILRMP project supporting digitization of land records through spatial and statistical analysis.",
      "Prepared and worked with ground reference maps to support spatial accuracy and reliable land-data analysis.",
      "Maintained geospatial databases and collaborated on land-file monitoring using ArcGIS Pro.",
    ],
  },
  {
    role: "Junior Engineer (Civil)",
    company: "Sarralle Equipment India Pvt. Ltd.",
    location: "Bokaro, Jharkhand, India",
    start: "2022",
    end: "2023",
    current: false,
    points: [
      "Supervised onsite execution and coordination of civil engineering activities in an industrial construction environment.",
      "Monitored daily work progress while implementing quality control and safety measures.",
      "Interpreted engineering drawings, coordinated with contractors, and prepared site reports for management evaluation.",
    ],
  },
  {
    role: "Site Engineer",
    company: "Shreyash Engineers",
    location: "Jashpur, Chhattisgarh, India",
    start: "2021",
    end: "2022",
    current: false,
    points: [
      "Worked on the Jal Jeevan Mission project, monitoring daily site activities and ensuring compliance with project guidelines and quality standards.",
      "Coordinated with surveyors and subcontractors while supervising site activities and monitoring project progress.",
      "Supported preparation of Detailed Project Reports (DPRs), data collection, and project-related analysis.",
    ],
  },
];

export const fallbackEducation: EducationItem[] = [
  {
    degree: "M.Tech — Geoinformatics",
    institution: "School of Information Science & Technology, MAKAUT",
    location: "West Bengal, India",
    start: "2023",
    end: "2025",
    grade: "7.55 / 10 CGPA",
    notes:
      "Thesis: Analyzing decadal changes (2000, 2010, 2020) in the built-up area of Kolkata Municipal Corporation using geospatial techniques.",
  },
  {
    degree: "B.Tech — Civil Engineering",
    institution: "Modern Institute of Engineering & Technology",
    location: "West Bengal, India",
    start: "2020",
    end: "2023",
    grade: "8.35 / 10 CGPA",
    notes:
      "Academic project: Design and planning of a G+II multistoried residential building.",
  },
  {
    degree: "Diploma in Engineering — Civil Engineering",
    institution: "Nazrul Centenary Polytechnic",
    location: "West Bengal, India",
    start: "2016",
    end: "2020",
    grade: "1st Class",
    notes: "Diploma in Civil Engineering under WBSCT&VE&SD.",
  },
];

export const fallbackSkills: SkillGroup[] = [
  {
    name: "Civil Engineering",
    items: [
      { name: "Drawing Reading", level: 85 },
      { name: "Field Execution", level: 85 },
      { name: "Site Supervision", level: 85 },
      { name: "Quality & Safety Monitoring", level: 80 },
      { name: "Daily Progress Reporting", level: 85 },
    ],
  },
  {
    name: "Geoinformatics",
    items: [
      { name: "ArcGIS Pro", level: 85 },
      { name: "GIS & Spatial Analysis", level: 85 },
      { name: "Google Earth Pro", level: 80 },
      { name: "Geospatial Database Management", level: 75 },
      { name: "Land Data Digitization", level: 80 },
    ],
  },
  {
    name: "Property & Valuation",
    items: [
      { name: "Property Valuation", level: 90 },
      { name: "Property Inspection", level: 90 },
      { name: "Technical Due Diligence", level: 85 },
      { name: "Market Valuation Assessment", level: 85 },
      { name: "Collateral Risk Assessment", level: 80 },
    ],
  },
  {
    name: "Technical & Professional",
    items: [
      { name: "AutoCAD 2D", level: 80 },
      { name: "Microsoft Excel", level: 80 },
      { name: "Client Coordination", level: 85 },
      { name: "Contractor Coordination", level: 80 },
      { name: "Technical Reporting", level: 85 },
    ],
  },
];

export const fallbackCertifications: Certification[] = [
  {
    name: "Computer Fundamental & M.S Office Internet",
    issuer: "National Council For Vocational Training",
    year: "2013",
    credentialId: "0362-ICT101-B00033637",
  },
  {
    name: "Industrial Training",
    issuer: "Solitude Education",
    year: "2021",
    credentialId: "IOFHT/ST-20417",
  },
  {
    name: "AutoCAD 2D & 3D",
    issuer: "Solitude Education",
    year: "2021",
    credentialId: "EN/2020/1521",
  },
  {
    name: "Microsoft Excel",
    issuer: "Solitude Education",
    year: "2021",
    credentialId: "EN/2020/1521",
  },
];

export const fallbackAwards: Award[] = [
  { title: "To do...", issuer: "To do...", year: "To do...", description: "To do..." },
  // { title: "Young Engineer of the Year", issuer: "Institution of Engineers, Maharashtra Centre", year: "2018" },
  // { title: "Best Paper Award — Geospatial Applications", issuer: "India GEO Summit", year: "2022", description: "For city-scale flood susceptibility mapping with open data" },
  // { title: "Quality Excellence Award", issuer: "MetroLink Rail JV", year: "2011", description: "Zero-rejection precast segment delivery, 1,900 units" },
];

export const fallbackResearch: ResearchPaper[] = [
  {
    title:
      "Analyzing Decadal Changes (2000, 2010, 2020) in the Built-Up Area of Kolkata Municipal Corporation Using Geospatial Techniques",
    venue: "M.Tech Academic Dissertation — MAKAUT",
    year: "2025",
    authors: ["Raja Dey"],
    abstract:
      "An academic study analyzing decadal changes in the built-up area of the Kolkata Municipal Corporation using geospatial techniques.",
  },
  {
    title: "Designing and Planning of a G+II Multistoried Residential Building",
    venue: "B.Tech Academic Project — MAKAUT",
    year: "2023",
    authors: ["Raja Dey"],
    abstract:
      "An academic project focused on the design and planning of a G+II multistoried residential building.",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "To do...",
    name: "To do...",
    role: "To do...",
    company: "To do...",
    rating: 5,
    quote:
      "To do...",
    initials: "To do...",
  },
  // {
  //   id: "t2",
  //   name: "Sarika Pillai",
  //   role: "Director — Urban Planning",
  //   company: "Smart City Mission, Pune",
  //   rating: 5,
  //   quote:
  //     "The flood-risk atlas they built now sits in every ward officer's browser. When the 2022 monsoon hit, pre-positioned pumps at their mapped hotspots prevented two major inundations. This is GIS as a public service, not a report.",
  //   initials: "SP",
  // },
  // {
  //   id: "t3",
  //   name: "Rohan Khatri",
  //   role: "Managing Director",
  //   company: "VantageBuild Constructions",
  //   rating: 5,
  //   quote:
  //     "We've built from three other structural consultants' drawings. TerraForge's are the first where RFI count dropped below twenty per tower. Buildable details, honest bar bending schedules, and a team that actually answers the phone.",
  //   initials: "RK",
  // },
  // {
  //   id: "t4",
  //   name: "Col. Anil Bhandari (Retd.)",
  //   role: "General Manager",
  //   company: "Narmada Jal Board",
  //   rating: 5,
  //   quote:
  //     "The diversion structure audit was thorough, conservative where it needed to be, and pragmatic everywhere else. Their instrumentation plan lets us monitor the spillway through every monsoon with confidence.",
  //   initials: "AB",
  // },
  // {
  //   id: "t5",
  //   name: "Meera Krishnan",
  //   role: "VP — Engineering",
  //   company: "TransAxis Infra",
  //   rating: 4,
  //   quote:
  //     "480 lane-kilometres of geometric and pavement design across two states, audited twice by independent reviewers — zero non-conformities. TerraForge treats a highway DPR like a structural calculation: every assumption traceable.",
  //   initials: "MK",
  // },
];

export const fallbackFaqs: FAQItem[] = [
  {
    question: "What kind of engineering work do you specialize in?",
    answer:
      "I work across civil engineering and geoinformatics, with experience in property valuation and inspection, field execution, drawing interpretation, construction, GIS-based analysis, surveying, and technical reporting. My academic and professional background also covers urban and regional planning, environmental analysis, and geospatial applications.",
  },
  {
    question: "What GIS and geospatial work can you help with?",
    answer:
      "My geospatial experience includes ArcGIS Pro, mapping, spatial data processing, correction, assessment, analysis and classification, Google Earth Pro, land-data digitization, and field data collection. I have worked on urban planning and DILRMP-related projects, including analysis of built-up and land-use changes.",
  },
  {
    question: "Do you take on property valuation and inspection work?",
    answer:
      "Yes. My current professional work includes property identification using GIS techniques, physical property inspections, valuation assessments, boundary identification, technical due diligence, documentation verification, and preparation of technical and valuation reports.",
  },
  {
    question: "Are you available for freelance projects or professional collaborations?",
    answer:
      "Yes. I am open to suitable freelance projects, technical assignments, collaborations, and professional opportunities that align with my education and experience in civil engineering, geoinformatics, GIS, construction, surveying, and technical property assessment.",
  },
  {
    question: "Where are you available to work?",
    answer:
      "I am available for opportunities and collaborations across India. Depending on the nature of the work, discussions and technical collaboration can also be handled remotely.",
  },
  {
    question: "What areas are you looking to explore in the future?",
    answer:
      "I am interested in opportunities that build on my civil engineering and geoinformatics background, including GIS, surveying, construction, property assessment, urban and regional planning, environmental applications, and other technology-driven engineering work. I am also interested in exploring GeoAI and its applications in engineering and geospatial problem-solving.",
  },
  {
    question: "What tools and technologies do you work with?",
    answer:
      "My documented technical toolkit includes ArcGIS Pro, AutoCAD 2D, Microsoft Excel, and Google Earth Pro. My broader areas of focus include GIS and spatial analysis, BIM, LiDAR, surveying, field execution, technical drawing, and geospatial data processing.",
  },
  {
    question: "How can I discuss a project or opportunity with Raja?",
    answer:
      "You can get in touch to discuss a project or professional opportunity over a phone call, video meeting, or in-person meeting. The preferred format can be decided based on the nature and location of the work.",
  },
];
