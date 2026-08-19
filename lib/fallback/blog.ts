import type { BlogPost } from "@/types";

const img = (src: string, alt: string) => ({ src, alt, width: 1600, height: 1067 });

export const fallbackPosts: BlogPost[] = [
  {
    id: "b1",
    title: "What GIS Adds to Civil Engineering",
    slug: "what-gis-adds-to-civil-engineering",
    excerpt:
      "Civil engineering and geospatial technology solve different parts of the same problem. Here is why combining field knowledge with spatial data can lead to better engineering decisions.",
    category: "Civil Engineering & GIS",
    author: "Raja Dey",
    role: "Civil & Geoinformatics Engineer",
    date: "2026-06-18",
    readMinutes: 6,
    tags: ["Civil Engineering", "GIS", "Geoinformatics", "Spatial Analysis"],
    featuredImage: img(
      "/images/gis.jpg",
      "Geospatial map and spatial analysis"
    ),
    featured: true,
    published: true,
    seo: {
      title: "What GIS Adds to Civil Engineering | Raja Dey",
      description:
        "Exploring how GIS and geospatial analysis can complement civil engineering, surveying, planning, and field-based decision making.",
    },
    html: `
<p>Civil engineering has always been connected to location. A road has an alignment, a building has a site, a property has boundaries, and every construction decision ultimately interacts with the ground around it.</p>

<p>Geoinformatics adds another layer to that understanding. Instead of looking at a site only as a physical location, GIS allows us to organize, visualize and analyse the spatial information surrounding it.</p>

<h2>Engineering questions are often spatial questions</h2>

<p>Where is the property? How has the surrounding area changed? What is nearby? How does land use vary across an area? Which locations need field verification? These questions can often be approached more effectively when engineering information is connected to a map.</p>

<h2>Field knowledge still matters</h2>

<p>GIS does not replace field observation. A map can show a boundary, road or building footprint, but field inspection helps establish what actually exists on the ground.</p>

<p>The strongest workflow is often a combination of the two: use spatial information to understand and prepare for the field, then use field observations to verify and improve the spatial picture.</p>

<h2>Where this becomes useful</h2>

<ul>
<li>Property identification and inspection</li>
<li>Land and built-up area analysis</li>
<li>Surveying and field data collection</li>
<li>Urban and regional planning</li>
<li>Infrastructure and site-related analysis</li>
</ul>

<blockquote>Good engineering decisions need both an understanding of the ground and a clear understanding of the data describing it.</blockquote>

<p>For me, this intersection between civil engineering and geoinformatics is one of the most interesting directions in modern engineering practice.</p>`,
  },

  {
    id: "b2",
    title: "From Drawing to Site: What Field Experience Teaches You",
    slug: "from-drawing-to-site-field-experience",
    excerpt:
      "Engineering drawings describe what should be built. Site experience teaches you how those decisions meet real conditions, people, materials, and constraints.",
    category: "Site Engineering",
    author: "Raja Dey",
    role: "Civil & Geoinformatics Engineer",
    date: "2026-05-27",
    readMinutes: 5,
    tags: ["Site Engineering", "Construction", "Drawings", "Field Work"],
    featuredImage: img(
      "/images/highrise.jpg",
      "Civil construction site"
    ),
    featured: false,
    published: true,
    seo: {
      title: "From Drawing to Site: Lessons from Field Engineering",
      description:
        "Practical lessons from civil construction and site engineering about drawings, coordination, quality, safety and field conditions.",
    },
    html: `
<p>An engineering drawing can be precise, detailed and technically correct. But the moment construction begins, the drawing becomes part of a much larger system involving people, materials, existing conditions, sequencing, safety and time.</p>

<h2>The drawing is the starting point</h2>

<p>Reading drawings is not only about understanding dimensions and symbols. It is about understanding how the information translates into an activity that can actually be executed on site.</p>

<h2>Site conditions change the conversation</h2>

<p>Actual site conditions do not always look exactly like the information available during planning. Existing structures, access, material availability, weather, sequencing and coordination with other activities can all affect execution.</p>

<h2>Coordination is an engineering skill</h2>

<p>Site engineering is rarely an individual activity. Surveyors, contractors, supervisors, engineers and project managers need to work from a common understanding of what is being executed and what the current priorities are.</p>

<h2>Documentation matters</h2>

<p>Progress reports and site records may not feel as exciting as design work, but they create a traceable record of what happened, what was observed and what required attention.</p>

<p>My experience in civil construction has made one thing clear: engineering judgement develops differently when you spend time close to the work being executed.</p>`,
  },

  {
    id: "b3",
    title: "What I Learned from Working with Digital Land Records",
    slug: "lessons-from-digital-land-records",
    excerpt:
      "Digitising land information is not simply a matter of putting paper records on a screen. Spatial accuracy, data consistency and field verification all matter.",
    category: "GIS & Land Records",
    author: "Raja Dey",
    role: "Civil & Geoinformatics Engineer",
    date: "2026-04-16",
    readMinutes: 6,
    tags: ["GIS", "DILRMP", "Land Records", "ArcGIS Pro"],
    featuredImage: img(
      "/images/hero.jpg",
      "GIS mapping and land information"
    ),
    featured: false,
    published: true,
    seo: {
      title: "Lessons from Digital Land Records & GIS | Raja Dey",
      description:
        "Notes on spatial data, land records, GIS workflows and the importance of accuracy and verification in digital land information.",
    },
    html: `
<p>Land records contain information that is fundamentally spatial. Parcels have boundaries, locations, neighbouring properties and relationships with roads and other features. Digitising that information therefore requires more than simply converting documents into digital files.</p>

<h2>Spatial accuracy matters</h2>

<p>A digital record is only useful when its location and attributes can be trusted. Spatial data needs to be assessed, corrected and organised before it can reliably support further analysis.</p>

<h2>Different data sources tell different stories</h2>

<p>Maps, records, reference layers and field observations may not always align perfectly. Understanding the source and limitations of each dataset is an important part of geospatial work.</p>

<h2>GIS makes relationships visible</h2>

<p>Once land information is organised spatially, it becomes possible to analyse relationships that are difficult to see in isolated records. Location, neighbouring features, accessibility and surrounding development can all become part of the analysis.</p>

<h2>Technology does not remove the need for verification</h2>

<p>Digital workflows can make land information easier to manage and analyse, but field verification and careful data assessment remain important. The quality of the final output depends on the quality of the information entering the workflow.</p>

<p>Working with land-record related GIS projects strengthened my interest in the practical side of geospatial technology: making spatial information useful, understandable and reliable.</p>`,
  },

  {
    id: "b4",
    title: "How I Approach a Property Inspection",
    slug: "how-i-approach-property-inspection",
    excerpt:
      "A property inspection is more than looking at a building. It means connecting the location, physical condition, documents, surroundings and valuation context.",
    category: "Property & Technical Assessment",
    author: "Raja Dey",
    role: "Junior Technical Manager",
    date: "2026-03-11",
    readMinutes: 5,
    tags: [
      "Property Valuation",
      "Property Inspection",
      "GIS",
      "Technical Assessment",
    ],
    featuredImage: img(
      "/images/surveying.jpg",
      "Property inspection and technical assessment"
    ),
    featured: false,
    published: true,
    seo: {
      title: "How I Approach a Property Inspection | Raja Dey",
      description:
        "A practical overview of property inspection, GIS-assisted identification, technical assessment and documentation review.",
    },
    html: `
<p>Property valuation brings together several types of information. There is the physical property itself, its location, surrounding development, available documentation and the market context in which the property is being assessed.</p>

<h2>Start with identification</h2>

<p>Before assessing a property, it is important to establish that the property being inspected corresponds with the available information. GIS and digital mapping tools can help with location-based identification and preparation.</p>

<h2>Look beyond the building</h2>

<p>A physical inspection is not limited to the visible condition of a structure. Surrounding access, neighbouring development, boundaries, land characteristics and other site conditions can all contribute to the technical assessment.</p>

<h2>Documents and field conditions should agree</h2>

<p>One of the important parts of technical due diligence is comparing available documentation with what can actually be observed. Differences need to be identified and considered rather than ignored.</p>

<h2>Technology supports judgement</h2>

<p>GIS can make location and spatial information easier to understand, while spreadsheets and structured reporting help organise the assessment. But the final technical judgement still depends on careful inspection and interpretation.</p>

<p>This combination of spatial information, field observation and technical reporting is an important part of my current professional work.</p>`,
  },

  {
    id: "b5",
    title: "Analysing Built-Up Change with Geospatial Techniques",
    slug: "analysing-built-up-change-geospatial-techniques",
    excerpt:
      "A look at the ideas behind my M.Tech project: using geospatial techniques to understand how the built-up area of Kolkata Municipal Corporation changed over time.",
    category: "Academic Work",
    author: "Raja Dey",
    role: "Civil & Geoinformatics Engineer",
    date: "2026-02-05",
    readMinutes: 7,
    tags: [
      "Geoinformatics",
      "Urban Planning",
      "Kolkata",
      "Remote Sensing",
      "GIS",
    ],
    featuredImage: img(
      "/images/urban-planning.jpg",
      "Urban area viewed through geospatial analysis"
    ),
    featured: false,
    published: true,
    seo: {
      title: "Analysing Built-Up Change with Geospatial Techniques",
      description:
        "An overview of the geospatial approach used in Raja Dey's M.Tech project to analyse decadal built-up changes in Kolkata Municipal Corporation.",
    },
    html: `
<p>Urban areas rarely change uniformly. Development expands into some areas, becomes denser in others and interacts with existing roads, land uses and neighbourhoods in different ways.</p>

<p>My M.Tech project focused on analysing decadal changes in the built-up area of Kolkata Municipal Corporation for 2000, 2010 and 2020 using geospatial techniques.</p>

<h2>Why compare multiple years?</h2>

<p>A single map provides a snapshot. Comparing multiple time periods makes it possible to examine how the spatial pattern changes and where development has accelerated, remained stable or shifted.</p>

<h2>The role of GIS</h2>

<p>GIS provides a framework for bringing spatial datasets together, processing them consistently and visualising the resulting patterns. It also makes comparison between different periods much easier.</p>

<h2>Urban analysis is more than mapping</h2>

<p>The purpose of mapping built-up areas is not simply to produce attractive maps. The spatial patterns can provide useful context for understanding urban growth, planning challenges and changes in the built environment.</p>

<h2>A useful foundation for future work</h2>

<p>This project strengthened my interest in applying geospatial techniques to practical planning and engineering questions. It also reinforced the importance of combining technical analysis with an understanding of the place being studied.</p>`,
  },

  {
    id: "b6",
    title: "Why GeoAI Interests Me as a Civil Engineer",
    slug: "why-geoai-interests-me",
    excerpt:
      "GeoAI sits at an interesting intersection of my two disciplines. Here is why combining geospatial data with AI could change how engineers analyse spatial problems.",
    category: "GeoAI & Future Technology",
    author: "Raja Dey",
    role: "Civil & Geoinformatics Engineer",
    date: "2026-01-14",
    readMinutes: 6,
    tags: ["GeoAI", "Artificial Intelligence", "GIS", "Future of Engineering"],
    featuredImage: img(
      "/images/geoai.jpg",
      "Geospatial data visualization"
    ),
    featured: false,
    published: true,
    seo: {
      title: "Why GeoAI Interests Me as a Civil Engineer | Raja Dey",
      description:
        "Exploring the potential of GeoAI at the intersection of civil engineering, geoinformatics, spatial data and intelligent analysis.",
    },
    html: `
<p>My education has taken me through two closely connected disciplines: Civil Engineering and Geoinformatics. The first taught me to think about structures, construction and the physical environment. The second introduced me to spatial data, mapping and analysis.</p>

<p>GeoAI interests me because it sits between these worlds.</p>

<h2>What makes spatial problems different?</h2>

<p>Many engineering questions are connected to location. Properties, roads, buildings, land, environmental conditions and infrastructure all exist within a spatial context.</p>

<p>That means there is an opportunity to use AI not just on tables of numbers, but on maps, imagery, spatial datasets and other geographic information.</p>

<h2>Where could it help?</h2>

<ul>
<li>Automating repetitive geospatial data processing</li>
<li>Supporting image and spatial classification</li>
<li>Identifying patterns across large geographic datasets</li>
<li>Supporting property and land analysis</li>
<li>Helping engineers interpret complex spatial information</li>
</ul>

<h2>Still a direction I'm exploring</h2>

<p>I see GeoAI as a future area of development rather than something I would describe as an established service today. There is a lot to learn about the AI methods themselves, data quality, validation and responsible application.</p>

<blockquote>The interesting question is not whether AI can replace engineering judgement, but how it can give engineers better information with which to make decisions.</blockquote>

<p>That intersection of engineering knowledge, spatial data and intelligent technology is where I want to continue learning.</p>`,
  },
];
