import {
  Search,
  Megaphone,
  Palette,
  Code2,
} from "lucide-react";

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const projects = [
  {
    category: "Home Services",
    title: "Summit Plumbing & Drain",
    metric: "214%",
    metricLabel: "Booked service calls",
    description:
      "A ground-up local SEO and PPC rebuild for a regional plumbing company, creating a stronger local presence and a consistent stream of qualified service calls.",
    tags: ["Local SEO", "PPC", "Lead Generation"],
    accent: "lime",
    overview:
      "Summit Plumbing & Drain needed a stronger local presence and a more reliable flow of qualified service calls. The project focused on improving local visibility, paid campaigns, and conversion opportunities.",
    results: [
      "Improved local search visibility",
      "Generated more qualified plumbing leads",
      "Created a stronger conversion-focused customer journey",
    ],
  },

  {
    category: "HVAC",
    title: "Apex Air HVAC",
    metric: "3x",
    metricLabel: "Qualified HVAC leads",
    description:
      "From virtually invisible in local search to a dominant maps presence through a conversion-focused website, local SEO strategy, and performance campaigns.",
    tags: ["Local Maps", "SEO", "PPC"],
    accent: "dark",
    overview:
      "Apex Air HVAC required a complete digital visibility strategy focused on local search, maps optimization, and performance marketing.",
    results: [
      "Increased qualified HVAC leads",
      "Strengthened local maps visibility",
      "Improved website conversion opportunities",
    ],
  },

  {
    category: "Bathroom Remodeling",
    title: "Luxe Bath Co.",
    metric: "165%",
    metricLabel: "Remodel leads",
    description:
      "A visual portfolio and lead capture system designed for a premium bathroom remodeler, helping transform high-intent visitors into valuable remodeling opportunities.",
    tags: ["Web Design", "Lead Funnels", "SEO"],
    accent: "lime",
    overview:
      "Luxe Bath Co. needed a premium online experience capable of presenting remodeling work while capturing high-intent customers.",
    results: [
      "More remodeling inquiries",
      "Stronger visual presentation",
      "Improved lead capture flow",
    ],
  },

  {
    category: "Walk-In Tubs",
    title: "SereneStep Walk-In Tubs",
    metric: "6 wks",
    metricLabel: "Booked calendar",
    description:
      "Senior-focused content, accessibility marketing, and targeted campaigns helped fill a six-week installation calendar in just 30 days.",
    tags: ["Content", "Accessibility", "Lead Generation"],
    accent: "dark",
    overview:
      "SereneStep focused on reaching homeowners looking for accessible bathing solutions through targeted content and lead generation campaigns.",
    results: [
      "Filled a six-week installation calendar",
      "Improved accessibility-focused messaging",
      "Generated targeted service inquiries",
    ],
  },

  {
    category: "Flooring",
    title: "Heritage Hardwood Floors",
    metric: "2x",
    metricLabel: "Install requests",
    description:
      "Material-specific landing pages and quote tools created a more focused customer journey and doubled inbound installation requests in one quarter.",
    tags: ["Landing Pages", "SEO", "Conversion"],
    accent: "lime",
    overview:
      "Heritage Hardwood Floors needed focused landing pages and quote experiences for customers researching different flooring materials.",
    results: [
      "Doubled installation requests",
      "Created focused landing pages",
      "Improved customer journey",
    ],
  },

  {
    category: "Gutters",
    title: "FlowGuard Gutters",
    metric: "$340K",
    metricLabel: "Recurring revenue",
    description:
      "Seasonal storm campaigns and route-density targeting helped create a recurring maintenance pipeline valued at more than $340K annually.",
    tags: ["PPC", "Seasonal Campaigns", "Local SEO"],
    accent: "dark",
    overview:
      "FlowGuard Gutters used seasonal campaigns and local targeting to create a stronger recurring maintenance pipeline.",
    results: [
      "Built recurring service opportunities",
      "Improved seasonal campaign performance",
      "Strengthened local targeting",
    ],
  },

  {
    category: "Kitchen Remodeling",
    title: "Copper & Oak Kitchens",
    metric: "38",
    metricLabel: "Design consultations",
    description:
      "A trend-led visual content engine and countertop quote tool transformed online interest into booked kitchen design consultations.",
    tags: ["Web Design", "Content", "Conversion"],
    accent: "lime",
    overview:
      "Copper & Oak Kitchens needed a visually engaging website experience that could turn online browsing into qualified design consultations.",
    results: [
      "Generated 38 design consultations",
      "Improved visual content strategy",
      "Created a stronger quote experience",
    ],
  },

  {
    category: "Pest Control",
    title: "ShieldGuard Pest Control",
    metric: "+200%",
    metricLabel: "Subscriptions",
    description:
      "Emergency removal PPC combined with seasonal prevention funnels increased recurring subscription revenue year over year.",
    tags: ["PPC", "Lead Generation", "Funnels"],
    accent: "dark",
    overview:
      "ShieldGuard combined emergency PPC campaigns with seasonal prevention funnels to improve recurring customer acquisition.",
    results: [
      "Increased recurring subscriptions",
      "Improved emergency lead generation",
      "Built seasonal conversion funnels",
    ],
  },

  {
    category: "Roofing",
    title: "Summit Roofing Group",
    metric: "96",
    metricLabel: "Roof replacements",
    description:
      "Storm-response campaigns and insurance-claim content created a rapid pipeline of homeowners needing roof replacement services.",
    tags: ["Storm Campaigns", "SEO", "PPC"],
    accent: "lime",
    overview:
      "Summit Roofing Group focused on capturing homeowners searching for immediate roofing assistance after storm damage.",
    results: [
      "Generated roof replacement opportunities",
      "Improved storm campaign visibility",
      "Created insurance-focused content",
    ],
  },

  {
    category: "Siding",
    title: "TrueView Siding",
    metric: "+140%",
    metricLabel: "Exterior jobs",
    description:
      "Curb-appeal creative and storm-damage lead capture campaigns increased whole-house exterior project opportunities over six months.",
    tags: ["Creative", "PPC", "Lead Capture"],
    accent: "dark",
    overview:
      "TrueView Siding used visual creative and targeted lead capture campaigns to increase exterior remodeling opportunities.",
    results: [
      "Increased exterior project opportunities",
      "Improved lead capture",
      "Strengthened creative campaigns",
    ],
  },

  {
    category: "Water Damage",
    title: "RapidRestore Water Damage",
    metric: "<90s",
    metricLabel: "Response time",
    description:
      "24/7 emergency landing pages and an insurance-agent referral engine helped create a faster path from emergency search to service response.",
    tags: ["Emergency PPC", "Landing Pages", "Lead Routing"],
    accent: "dark",
    overview:
      "RapidRestore needed a fast digital path between emergency searches and service response.",
    results: [
      "Created 24/7 emergency landing pages",
      "Improved lead routing",
      "Reduced response time",
    ],
  },

  {
    category: "Windows",
    title: "ClearLine Windows",
    metric: "+150%",
    metricLabel: "Package leads",
    description:
      "Energy-savings content and rebate-aware funnels increased whole-house window package leads during a highly competitive seasonal campaign.",
    tags: ["SEO", "Content", "Lead Funnels"],
    accent: "lime",
    overview:
      "ClearLine Windows used energy-saving content and targeted funnels to capture customers interested in whole-house window packages.",
    results: [
      "Increased package leads",
      "Improved seasonal campaigns",
      "Built rebate-aware conversion funnels",
    ],
  },

  {
    category: "Website Development",
    title: "FinEdge Advisory",
    metric: "+64%",
    metricLabel: "Lead conversions",
    description:
      "A professional financial services website rebuilt with React and Tailwind CSS to simplify complex services and create a clearer conversion path.",
    tags: ["React", "Tailwind", "Conversion Design"],
    accent: "dark",
    overview:
      "FinEdge Advisory required a modern financial services website that could communicate complex services clearly while improving conversions.",
    results: [
      "Improved lead conversions",
      "Simplified service presentation",
      "Built a clearer conversion path",
    ],
  },

  {
    category: "Website Development",
    title: "Vanta Commerce",
    metric: "3.1x",
    metricLabel: "Product interactions",
    description:
      "A modern e-commerce frontend engineered for responsive shopping experiences, intuitive product discovery, and streamlined customer journeys.",
    tags: ["React", "E-Commerce", "Responsive Design"],
    accent: "lime",
    overview:
      "Vanta Commerce was built around a responsive shopping experience with intuitive product discovery and streamlined customer journeys.",
    results: [
      "Improved product interactions",
      "Created responsive shopping experiences",
      "Simplified product discovery",
    ],
  },

  {
    category: "React Native",
    title: "Flora Haven",
    metric: "10+",
    metricLabel: "Core app screens",
    description:
      "A complete React Native plant e-commerce application featuring product browsing, categories, cart, checkout, address management, payment options, authentication, and order management.",
    tags: ["React Native", "Firebase", "E-Commerce"],
    accent: "dark",
    overview:
      "Flora Haven is a complete React Native plant e-commerce application with product browsing, categories, cart, checkout, authentication, address management, payment options, and order management.",
    results: [
      "10+ core application screens",
      "Firebase authentication integration",
      "Complete e-commerce shopping flow",
    ],
  },

  {
    category: "React Native",
    title: "MedConnect",
    metric: "42%",
    metricLabel: "Faster booking",
    description:
      "A mobile appointment experience designed to simplify service discovery, provider selection, appointment scheduling, and customer communication.",
    tags: ["React Native", "Firebase", "Booking"],
    accent: "dark",
    overview:
      "MedConnect provides a streamlined mobile appointment experience for discovering services, selecting providers, and scheduling appointments.",
    results: [
      "Faster appointment booking",
      "Simplified provider selection",
      "Improved customer communication",
    ],
  },
];

export const getProjectBySlug = (slug) => {
  return projects.find((project) => slugify(project.title) === slug);
};