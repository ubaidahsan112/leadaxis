import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Search,
  Megaphone,
  Palette,
  Code2,
  MapPin,
  Star,
  Quote,
  Home as HomeIcon,
  HeartPulse,
  Scale,
  Building2,
  Landmark,
  Cpu,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import logo from "../assets/logo.png";
import Booking from "../Components/Booking";
import ScrollReveal from "../Components/ScrollReveal";
import ubaidImage from "../assets/profile.jpeg";

<style>{`
  @keyframes heroCharEnter {
    0% {
      opacity: 0;
      transform: translateY(8px) scale(0.96);
    }

    45% {
      opacity: 1;
      transform: translateY(-2px) scale(1.015);
    }

    65% {
      transform: translateX(-1px) rotate(-0.4deg);
    }

    80% {
      transform: translateX(1px) rotate(0.4deg);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0);
    }
  }

  .hero-char-visible {
    animation: heroCharEnter 180ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-char-visible {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
`}</style>

// ============================================================
// SERVICES
// ============================================================

const services = [
  {
    title: "Search",
    description:
      "Get found by customers who are already looking for you.",
    icon: Search,
    items: [
      "Search Engine Optimization",
      "Local Search Engine Marketing",
      "Local Maps SEO",
      "Social Media Networking",
      "Link Building Management",
      "Content Creation",
      "Custom Blogs",
    ],
  },

  {
    title: "Paid Media",
    description:
      "Instant visibility with a measurable return on every dollar.",
    icon: Megaphone,
    items: [
      "Pay Per Click (PPC) Advertising",
      "Facebook Advertising",
    ],
  },

  {
    title: "Creative",
    description:
      "A brand and website your customers trust at first glance.",
    icon: Palette,
    items: [
      "Online Branding",
      "Website Design",
    ],
  },

  {
    title: "Development",
    description:
      "Fast, reliable builds engineered to convert visitors.",
    icon: Code2,
    items: [
      "Software Development",
      "Applications Design",
      "Website Development",
    ],
  },
];


// ============================================================
// HOME IMPROVEMENT VERTICALS
// ============================================================

const verticals = [
  "Bathroom",
  "Walk-in Tubs & Showers",
  "Flooring",
  "Gutters",
  "Home Renovation",
  "Home Security",
  "HVAC",
  "Kitchen",
  "Pest Control",
  "Plumbing",
  "Roofing",
  "Siding",
  "Solar",
  "Water Damage",
  "Windows",
];


// ============================================================
// PROJECTS
// ============================================================

const projects = [

  // ----------------------------------------------------------
  // HOME SERVICES
  // ----------------------------------------------------------

  {
    category: "Home Services",
    title: "Summit Plumbing & Drain",
    metric: "214%",
    metricLabel: "Booked service calls",
    description:
      "A ground-up local SEO and PPC rebuild for a regional plumbing company, creating a stronger local presence and a consistent stream of qualified service calls.",
    tags: ["Local SEO", "PPC", "Lead Generation"],
    accent: "lime",
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
  },

  {
    category: "Bathroom Remodeling",
    title: "Luxe Bath Co.",
    metric: "+165%",
    metricLabel: "Remodel leads",
    description:
      "A visual portfolio and lead capture system designed for a premium bathroom remodeler, helping transform high-intent visitors into valuable remodeling opportunities.",
    tags: ["Web Design", "Lead Funnels", "SEO"],
    accent: "lime",
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
  },


  // ----------------------------------------------------------
  // WEBSITE DEVELOPMENT
  // ----------------------------------------------------------

  {
    category: "Website Development",
    title: "FinEdge Advisory",
    metric: "+64%",
    metricLabel: "Lead conversions",
    description:
      "A professional financial services website rebuilt with React and Tailwind CSS to simplify complex services and create a clearer conversion path.",
    tags: ["React", "Tailwind", "Conversion Design"],
    accent: "dark",
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
  },


  // ----------------------------------------------------------
  // REACT NATIVE
  // ----------------------------------------------------------

  {
    category: "React Native",
    title: "Flora Haven",
    metric: "10+",
    metricLabel: "Core app screens",
    description:
      "A complete React Native plant e-commerce application featuring product browsing, categories, cart, checkout, address management, payment options, authentication, and order management.",
    tags: ["React Native", "Firebase", "E-Commerce"],
    accent: "dark",
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
  },

];


// ============================================================
// INDUSTRIES
// ============================================================

const industries = [
  {
    title: "Home Services",
    description:
      "Lead generation systems designed around high-intent local searches.",
    icon: HomeIcon,
  },
  {
    title: "Healthcare",
    description:
      "Digital experiences designed to make finding and contacting providers easier.",
    icon: HeartPulse,
  },
  {
    title: "Legal Services",
    description:
      "Conversion-focused websites and campaigns for competitive legal markets.",
    icon: Scale,
  },
  {
    title: "Real Estate",
    description:
      "Property-focused digital experiences built to generate qualified inquiries.",
    icon: Building2,
  },
  {
    title: "Financial Services",
    description:
      "Clear digital experiences that turn complex services into actionable journeys.",
    icon: Landmark,
  },
  {
    title: "Technology",
    description:
      "Modern websites and applications built for growing technology businesses.",
    icon: Cpu,
  },
];


// ============================================================
// INITIAL REVIEWS
// ============================================================

const initialReviews = [
  {
    name: "Michael Anderson",
    company: "Home Services",
    rating: 5,
    review:
      "LeadAxis helped us build a much more consistent lead pipeline. The quality of leads and overall communication has been excellent.",
  },
  {
    name: "Sarah Williams",
    company: "Local Business",
    rating: 5,
    review:
      "The team understands performance marketing and focuses on actual business results rather than vanity metrics.",
  },
  {
    name: "James Carter",
    company: "Home Improvement",
    rating: 5,
    review:
      "We saw a noticeable improvement in lead flow after working with LeadAxis. Everything feels structured and data-driven.",
  },
];


const Home = () => {

  // ==========================================================
  // REVIEWS STATE
  // ==========================================================

  const [reviews, setReviews] = useState(initialReviews);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    company: "",
    rating: 5,
    review: "",
  });


  const handleReviewChange = (e) => {
    const { name, value } = e.target;

    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewForm.name.trim() || !reviewForm.review.trim()) {
      alert("Please enter your name and review.");
      return;
    }

    setReviews((prev) => [
      ...prev,
      {
        ...reviewForm,
        rating: Number(reviewForm.rating),
      },
    ]);

    setReviewForm({
      name: "",
      company: "",
      rating: 5,
      review: "",
    });
  };
const [heroCharIndex, setHeroCharIndex] = useState(-1);

useEffect(() => {
  const firstLine = "Turn Every Lead";
  const secondLine = "Into an Opportunity.";

  const totalCharacters =
    firstLine.length + secondLine.length;

  let index = 0;

  const timer = setInterval(() => {
    setHeroCharIndex(index);

    // Subtle haptic feedback where the browser/device supports it.
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.vibrate === "function"
    ) {
      navigator.vibrate(8);
    }

    index += 1;

    if (index >= totalCharacters) {
      clearInterval(timer);
    }
  }, 65);

  return () => clearInterval(timer);
}, []);
  return (
    <main className="overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden bg-gray-950"
      >

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/home-wallpaper.jpg')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gray-950/75" />

        {/* LIME GLOW */}
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-lime-300/20 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-lime-300/10 blur-[120px]" />


        {/* CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 sm:px-8 lg:px-12">

          <div className="max-w-4xl">

            <ScrollReveal direction="up">

              <div className="mb-6 flex items-center gap-3">

                <span className="h-px w-10 bg-lime-300" />

                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-300">
                  Performance Driven Growth
                </span>

              </div>

            </ScrollReveal>


            <ScrollReveal direction="left" delay={100}>

              <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl">
  {[
    {
      text: "Turn Every Lead",
      color: "text-white",
    },
    {
      text: "Into an Opportunity.",
      color: "text-lime-300",
    },
  ].map((line, lineIndex) => {
    let characterOffset = 0;

    if (lineIndex === 1) {
      characterOffset = "Turn Every Lead".length;
    }

    return (
      <span
        key={lineIndex}
        className={`block ${line.color}`}
      >
        {line.text.split(" ").map((word, wordIndex) => {
          const previousWords = line.text
            .split(" ")
            .slice(0, wordIndex)
            .join(" ");

          const wordStart =
            characterOffset +
            previousWords.length +
            (wordIndex > 0 ? 1 : 0);

          return (
           <span
  key={`${lineIndex}-${word}`}
  className={`inline-block whitespace-nowrap ${
    wordIndex < line.text.split(" ").length - 1 ? "mr-3" : ""
  }`}
>
              {word.split("").map((char, charIndex) => {
                const globalIndex = wordStart + charIndex;

                return (
                  <span
                    key={`${lineIndex}-${word}-${charIndex}`}
                    className={
                      heroCharIndex >= globalIndex
                        ? "inline-block hero-char-visible"
                        : "inline-block opacity-0"
                    }
                  >
                    {char}
                  </span>
                );
              })}

              {wordIndex < line.text.split(" ").length - 1 && (
                <span className="inline-block">
                  {" "}
                </span>
              )}
            </span>
          );
        })}
      </span>
    );
  })}
</h1>
            </ScrollReveal>


            <ScrollReveal direction="right" delay={200}>

              <p className="mt-8 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                LeadAxis helps ambitious businesses generate better leads,
                build stronger digital experiences, and turn online attention
                into measurable growth.
              </p>

            </ScrollReveal>


            {/* BUTTONS */}

            <ScrollReveal direction="up" delay={300}>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group flex items-center justify-center gap-3 rounded-full bg-lime-300 px-7 py-4 font-bold text-gray-950 transition-all duration-300 hover:bg-lime-200 hover:shadow-[0_0_40px_rgba(190,242,100,0.25)]"
                >
                  Explore Services

                  <ArrowUpRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </button>


                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("work")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-lime-300/50 hover:bg-white/10"
                >
                  View Our Work

                  <ArrowUpRight size={19} />
                </button>

              </div>

            </ScrollReveal>


            {/* STATS */}

            <ScrollReveal direction="up" delay={400}>

              <div className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">

                {[
                  ["24/7", "Lead Flow"],
                  ["100%", "Performance"],
                  ["10K+", "Leads Generated"],
                  ["50+", "Partners"],
                ].map(([number, label]) => (

                  <div key={label}>

                    <div className="text-2xl font-black text-white sm:text-3xl">
                      {number}
                    </div>

                    <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                      {label}
                    </div>

                  </div>

                ))}

              </div>

            </ScrollReveal>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="bg-white px-6 py-24 transition-colors duration-500 dark:bg-gray-950 sm:px-8 lg:px-12"
      >

        <div className="mx-auto max-w-7xl">

          <ScrollReveal direction="up">

            <div className="mb-16 max-w-3xl">

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-lime-500">
                What We Do
              </p>

              <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl">
                Everything you need to
                <span className="text-gray-400 dark:text-gray-500">
                  {" "}grow online.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                From search visibility to paid acquisition, creative,
                websites, and applications — LeadAxis brings the pieces
                together into one performance-focused system.
              </p>

            </div>

          </ScrollReveal>


          <div className="grid gap-6 md:grid-cols-2">

            {services.map((service, index) => {

              const Icon = service.icon;

              return (
                <ScrollReveal
                  key={service.title}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={100}
                >

                  <article className="group h-full rounded-[2rem] border border-gray-200 bg-gray-50 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-lime-200 hover:bg-white hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-lime-900 dark:hover:bg-gray-800 sm:p-9">

                    <div className="flex items-start justify-between">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 text-gray-950">
                        <Icon size={26} />
                      </div>

                      <ArrowUpRight
                        size={24}
                        className="text-gray-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime-500"
                      />

                    </div>


                    <h3 className="mt-8 text-3xl font-bold text-gray-950 dark:text-white">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>


                    <div className="mt-8 grid gap-3 sm:grid-cols-2">

                      {service.items.map((item) => (

                        <div
                          key={item}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <CheckCircle2
                            size={17}
                            className="mt-0.5 shrink-0 text-lime-500"
                          />

                          <span>{item}</span>

                        </div>

                      ))}

                    </div>

                  </article>

                </ScrollReveal>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          HOME IMPROVEMENT
      ===================================================== */}

      <section
        id="verticals"
        className="bg-gray-950 px-6 py-24 sm:px-8 lg:px-12"
      >

        <div className="mx-auto max-w-7xl">

          <ScrollReveal direction="left">

            <div className="max-w-3xl">

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-lime-300">
                Home Improvement
              </p>

              <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Industry-specific
                <span className="text-gray-500">
                  {" "}lead generation.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-400">
                We build campaigns and digital experiences around the way
                customers actually search for local home improvement services.
              </p>

            </div>

          </ScrollReveal>


          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

            {verticals.map((vertical, index) => (

              <ScrollReveal
                key={vertical}
                direction={index % 2 === 0 ? "up" : "scale"}
                delay={(index % 5) * 60}
              >

                <div className="group flex min-h-[90px] cursor-default items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-lime-300 hover:bg-lime-300 hover:text-gray-950">

                  <span className="text-sm font-semibold text-white transition-colors group-hover:text-gray-950 sm:text-base">
                    {vertical}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-gray-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gray-950"
                  />

                </div>

              </ScrollReveal>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section
        id="work"
        className="bg-white px-6 py-24 transition-colors duration-500 dark:bg-gray-950 sm:px-8 lg:px-12"
      >

        <div className="mx-auto max-w-7xl">

          <ScrollReveal direction="up">

            <div className="mb-16 max-w-3xl">

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-lime-500">
                Our Projects
              </p>

              <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl">
                Work that turns
                <span className="text-gray-400 dark:text-gray-500">
                  {" "}strategy into results.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                Explore selected projects across lead generation,
                performance marketing, website development, and React Native
                application development.
              </p>

            </div>

          </ScrollReveal>


          <div className="grid gap-6 md:grid-cols-2">

            {projects.map((project, index) => (

              <ScrollReveal
                key={project.title}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 2) * 100}
              >

                <article
                  className={`
                    group relative h-full overflow-hidden rounded-[2rem]
                    border p-7 transition-all duration-500
                    hover:-translate-y-2 hover:shadow-2xl sm:p-9

                    ${
                      project.accent === "lime"
                        ? `
                          border-lime-200
                          bg-lime-50
                          hover:bg-lime-100
                          dark:border-lime-900
                          dark:bg-lime-950/40
                          dark:hover:bg-lime-950/60
                        `
                        : `
                          border-gray-800
                          bg-gray-950
                          hover:bg-gray-900
                        `
                    }
                  `}
                >

                  {/* PROJECT HEADER */}

                  <div className="mb-8 flex items-start justify-between gap-5">

                    <div>

                      <span
                        className={`
                          inline-flex rounded-full px-3 py-1.5 text-xs
                          font-semibold uppercase tracking-wider

                          ${
                            project.accent === "lime"
                              ? "bg-lime-200 text-gray-900 dark:bg-lime-900 dark:text-lime-200"
                              : "bg-white/10 text-gray-300"
                          }
                        `}
                      >
                        {project.category}
                      </span>


                      <h3
                        className={`
                          mt-5 text-2xl font-bold sm:text-3xl

                          ${
                            project.accent === "lime"
                              ? "text-gray-950 dark:text-white"
                              : "text-white"
                          }
                        `}
                      >
                        {project.title}
                      </h3>

                    </div>


                    <div
                      className={`
                        flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-full transition-all duration-500
                        group-hover:rotate-45

                        ${
                          project.accent === "lime"
                            ? "bg-gray-950 text-lime-300"
                            : "bg-lime-300 text-gray-950"
                        }
                      `}
                    >
                      <ArrowUpRight size={20} />
                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <p
                    className={`
                      min-h-[96px] text-sm leading-7

                      ${
                        project.accent === "lime"
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {project.description}
                  </p>


                  {/* METRIC */}

                  <div
                    className={`
                      mt-8 border-t pt-7

                      ${
                        project.accent === "lime"
                          ? "border-gray-300 dark:border-gray-700"
                          : "border-white/10"
                      }
                    `}
                  >

                    <div className="flex items-end justify-between gap-5">

                      <div>

                        <div
                          className={`
                            text-4xl font-black tracking-tight

                            ${
                              project.accent === "lime"
                                ? "text-gray-950 dark:text-white"
                                : "text-lime-300"
                            }
                          `}
                        >
                          {project.metric}
                        </div>

                        <p
                          className={`
                            mt-1 text-xs font-semibold uppercase tracking-widest

                            ${
                              project.accent === "lime"
                                ? "text-gray-500"
                                : "text-gray-500"
                            }
                          `}
                        >
                          {project.metricLabel}
                        </p>

                      </div>


                      <button
                        type="button"
                        className={`
                          hidden items-center gap-2 text-sm font-semibold
                          transition-all duration-300
                          group-hover:gap-3 sm:flex

                          ${
                            project.accent === "lime"
                              ? "text-gray-950 dark:text-white"
                              : "text-white"
                          }
                        `}
                      >
                        View Case Study
                        <ArrowUpRight size={16} />
                      </button>

                    </div>

                  </div>


                  {/* TAGS */}

                  <div className="mt-7 flex flex-wrap gap-2">

                    {project.tags.map((tag) => (

                      <span
                        key={tag}
                        className={`
                          rounded-full px-3 py-1.5 text-xs font-medium

                          ${
                            project.accent === "lime"
                              ? "bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-400"
                              : "bg-white/10 text-gray-400"
                          }
                        `}
                      >
                        {tag}
                      </span>

                    ))}

                  </div>


                  {/* MOBILE CASE STUDY */}

                  <button
                    type="button"
                    className={`
                      mt-6 flex items-center gap-2 text-sm font-semibold sm:hidden

                      ${
                        project.accent === "lime"
                          ? "text-gray-950 dark:text-white"
                          : "text-white"
                      }
                    `}
                  >
                    View Case Study
                    <ArrowUpRight size={16} />
                  </button>


                  {/* GLOW */}

                  <div
                    className="
                      pointer-events-none absolute -bottom-20 -right-20
                      h-48 w-48 rounded-full bg-lime-300 blur-3xl
                      opacity-0 transition-opacity duration-500
                      group-hover:opacity-20
                    "
                  />

                </article>

              </ScrollReveal>

            ))}

          </div>

        {/* owner info  */}
        {/* ==================== ABOUT / FOUNDER SECTION ==================== */}
<section
  id="about"
  className="relative overflow-hidden bg-gray-950 py-24 sm:py-28"
>
  {/* Background Glow */}
  <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-lime-300/10 blur-[120px]" />
  <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-lime-300/10 blur-[120px]" />

  <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
    <div className="mx-auto max-w-5xl text-center">

      {/* Label */}
      <ScrollReveal direction="up">
        <span className="inline-flex items-center rounded-full border border-lime-300/20 bg-lime-300/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
          Meet the Founder
        </span>
      </ScrollReveal>

      {/* Image */}
      <ScrollReveal direction="up" delay={100}>
        <div className="mt-8 flex justify-center">
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-lime-300/20 blur-3xl" />

            {/* Image */}
            <div className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-lime-300/30 bg-gray-900 shadow-2xl sm:h-52 sm:w-52">
              <img
                src={ubaidImage}
                alt="Ubaid Ahsan"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Name */}
      <ScrollReveal direction="up" delay={150}>
        <h2 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
          Ubaid <span className="text-lime-300">Ahsan</span>
        </h2>

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-base">
          Inbound Call & Pay-Per-Call Specialist
        </p>
      </ScrollReveal>

      {/* Info */}
      <ScrollReveal direction="up" delay={200}>
        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-gray-300">
            📍 Islamabad, Pakistan
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-gray-300">
            🎂 Age 23
          </div>

          <div className="rounded-full border border-lime-300/20 bg-lime-300/5 px-5 py-3 text-sm font-medium text-lime-300">
            ☎️ Inbound Calls & Pay-Per-Call
          </div>
        </div>
      </ScrollReveal>

      {/* Description */}
      <ScrollReveal direction="up" delay={250}>
        <div className="mx-auto mt-10 max-w-4xl">
          <p className="text-base leading-8 text-gray-300 sm:text-lg">
            I specialize in{" "}
            <span className="font-semibold text-white">
              inbound call generation and Pay-Per-Call marketing
            </span>
            , connecting businesses with high-intent customers who are
            actively searching for the services they need. My experience
            covers campaign sourcing, traffic generation, call quality,
            and performance-focused lead acquisition across service-based
            industries.
          </p>

          <p className="mt-6 text-base leading-8 text-gray-400 sm:text-lg">
            I focus on building{" "}
            <span className="font-semibold text-gray-200">
              reliable, scalable, and performance-driven call campaigns
            </span>{" "}
            where quality matters as much as volume. From understanding
            campaign requirements and targeting the right audience to
            generating relevant inbound calls, my approach is centered
            around creating valuable connections between businesses and
            potential customers.
          </p>

          <p className="mt-6 text-base leading-8 text-gray-400 sm:text-lg">
            Through{" "}
            <span className="font-semibold text-lime-300">LeadAxis</span>,
            my goal is to build long-term partnerships by delivering
            consistent, quality-driven inbound traffic and turning
            customer intent into measurable business opportunities.
          </p>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal direction="up" delay={300}>
        <div className="mt-10">
          <p className="text-lg font-semibold text-white sm:text-xl">
            Looking for quality inbound calls for your business?
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Let's connect, discuss your campaign requirements, and build a
            Pay-Per-Call partnership focused on real opportunities and
            sustainable growth.
          </p>
        </div>
      </ScrollReveal>

    </div>
  </div>
</section>


          {/* PROJECT CTA */}

          <ScrollReveal direction="up" delay={150}>

            <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-gray-100 p-8 dark:bg-gray-900 sm:flex-row sm:p-10">

              <div>

                <p className="text-2xl font-bold text-gray-950 dark:text-white">
                  Have a project in mind?
                </p>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Let's build something that delivers measurable results.
                </p>

              </div>

              <Booking name="Start a Project" />

            </div>

          </ScrollReveal>

        </div>

      </section>


      {/* =====================================================
          INDUSTRIES
      ===================================================== */}

      <section
        id="industries"
        className="bg-gray-50 px-6 py-24 transition-colors duration-500 dark:bg-gray-900 sm:px-8 lg:px-12"
      >

        <div className="mx-auto max-w-7xl">

          <ScrollReveal direction="right">

            <div className="mb-14 max-w-3xl">

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-lime-500">
                Industries
              </p>

              <h2 className="text-4xl font-bold leading-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl">
                Built around
                <span className="text-gray-400 dark:text-gray-500">
                  {" "}your industry.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Different industries require different customer journeys.
                Our strategies are designed around the markets, audiences,
                and decisions that matter to your business.
              </p>

            </div>

          </ScrollReveal>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {industries.map((industry, index) => {

              const Icon = industry.icon;

              return (
                <ScrollReveal
                  key={industry.title}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={(index % 3) * 100}
                >

                  <article className="group relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-lime-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100 text-gray-950 dark:bg-lime-900 dark:text-lime-300">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-7 text-xl font-bold text-gray-950 dark:text-white">
                      {industry.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {industry.description}
                    </p>

                    <div className="mt-6 h-1 w-8 rounded-full bg-lime-300 transition-all duration-500 group-hover:w-20" />

                  </article>

                </ScrollReveal>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <section
        id="reviews"
        className="bg-white px-6 py-24 transition-colors duration-500 dark:bg-gray-950 sm:px-8 lg:px-12"
      >

        <div className="mx-auto max-w-7xl">

          <ScrollReveal direction="up">

            <div className="mx-auto mb-14 max-w-3xl text-center">

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-lime-500">
                Client Reviews
              </p>

              <h2 className="text-4xl font-bold text-gray-950 dark:text-white sm:text-5xl">
                What our clients say.
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Real experiences from businesses working toward measurable
                digital growth.
              </p>

            </div>

          </ScrollReveal>


          {/* REVIEW CARDS */}

          <div className="grid gap-6 md:grid-cols-3">

            {reviews.map((review, index) => (

              <ScrollReveal
                key={`${review.name}-${index}`}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 100}
              >

                <article className="h-full rounded-[2rem] border border-gray-200 bg-gray-50 p-7 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">

                  <Quote
                    size={30}
                    className="text-lime-400"
                  />


                  <div className="mt-6 flex gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <Star
                        key={star}
                        size={17}
                        className={
                          star <= Number(review.rating)
                            ? "fill-lime-400 text-lime-400"
                            : "text-gray-300 dark:text-gray-700"
                        }
                      />

                    ))}

                  </div>


                  <p className="mt-6 text-sm leading-7 text-gray-600 dark:text-gray-300">
                    "{review.review}"
                  </p>


                  <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">

                    <p className="font-bold text-gray-950 dark:text-white">
                      {review.name}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                      {review.company || "Client"}
                    </p>

                  </div>

                </article>

              </ScrollReveal>

            ))}

          </div>


          {/* REVIEW FORM */}

          <ScrollReveal direction="up" delay={150}>

            <div
              id="leave-review"
              className="mx-auto mt-20 max-w-3xl rounded-[2rem] border border-gray-200 bg-gray-50 p-7 dark:border-gray-800 dark:bg-gray-900 sm:p-10"
            >

              <div className="text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lime-300 text-gray-950">
                  <Star size={21} />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-gray-950 dark:text-white">
                  Share your experience
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Tell others what it was like working with LeadAxis.
                </p>

              </div>


              <form
                onSubmit={handleReviewSubmit}
                className="mt-8 space-y-5"
              >

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Your Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={reviewForm.name}
                      onChange={handleReviewChange}
                      placeholder="John Smith"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-lime-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />

                  </div>


                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Company
                    </label>

                    <input
                      type="text"
                      name="company"
                      value={reviewForm.company}
                      onChange={handleReviewChange}
                      placeholder="Your Company"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-lime-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />

                  </div>

                </div>


                {/* RATING */}

                <div>

                  <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Rating
                  </label>

                  <div className="flex gap-2">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setReviewForm((prev) => ({
                            ...prev,
                            rating: star,
                          }))
                        }
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={26}
                          className={
                            star <= Number(reviewForm.rating)
                              ? "fill-lime-400 text-lime-400"
                              : "text-gray-300 dark:text-gray-700"
                          }
                        />
                      </button>

                    ))}

                  </div>

                </div>


                {/* REVIEW */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Your Review
                  </label>

                  <textarea
                    name="review"
                    value={reviewForm.review}
                    onChange={handleReviewChange}
                    rows={5}
                    placeholder="Tell us about your experience..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 transition focus:border-lime-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />

                </div>


                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-xl dark:bg-lime-300 dark:text-gray-950 dark:hover:bg-lime-200"
                >
                  Submit Review

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />

                </button>

              </form>

            </div>

          </ScrollReveal>

        </div>

      </section>


      {/* =====================================================
          CONNECT CTA
      ===================================================== */}

      <section
        id="connect"
        className="bg-white px-6 py-24 dark:bg-gray-950 sm:px-8 lg:px-12"
      >

        <div className="mx-auto max-w-7xl">

          <ScrollReveal direction="scale">

            <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-950 px-7 py-16 text-center sm:px-12 sm:py-20">

              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/20 blur-[100px]" />


              <div className="relative z-10 mx-auto max-w-3xl">

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-lime-300">
                  Let's Connect
                </p>

                <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Ready to turn leads
                  <span className="block text-lime-300">
                    into growth?
                  </span>
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                  Tell us where your business is today and where you want to
                  take it. We'll help map the digital opportunities between
                  the two.
                </p>


                <div className="mt-9 flex justify-center">

                  <Booking name="Start a Conversation" />

                </div>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        id="footer"
        className="bg-gray-950 px-6 pb-8 pt-20 text-white sm:px-8 lg:px-12"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">


            {/* BRAND */}

            <ScrollReveal direction="left">

              <div>

                <button
                  onClick={() => scrollToSection("home")}
                  className="flex shrink-0 items-center"
                >
                  <img
                    src={logo}
                    alt="LeadAxis"
                    className="h-20 w-auto object-contain"
                  />
                </button>
                


                <p className="mt-5 max-w-xs text-sm leading-7 text-gray-500">
                  Performance-driven lead generation, digital marketing,
                  website development, and mobile application solutions for
                  businesses ready to grow.
                </p>


                <div className="mt-7 flex gap-3">

                  {["in", "f", "X"].map((social) => (

                    <button
                      key={social}
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs font-bold text-gray-400 transition hover:border-lime-300 hover:text-lime-300"
                    >
                      {social}
                    </button>

                  ))}

                </div>

              </div>

            </ScrollReveal>


            {/* SERVICES */}

            <ScrollReveal direction="up" delay={100}>

              <div>

                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  Services
                </h3>

                <ul className="mt-6 space-y-3 text-sm text-gray-500">

                  {[
                    "Search",
                    "Paid Media",
                    "Creative",
                    "Website Design",
                    "Website Development",
                    "Software Development",
                    "React Native Apps",
                  ].map((item) => (

                    <li key={item}>
                      <button
                        type="button"
                        className="transition hover:text-lime-300"
                      >
                        {item}
                      </button>
                    </li>

                  ))}

                </ul>

              </div>

            </ScrollReveal>


            {/* INDUSTRIES */}

            <ScrollReveal direction="up" delay={200}>

              <div>

                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  Industries
                </h3>

                <ul className="mt-6 space-y-3 text-sm text-gray-500">

                  {industries.map((industry) => (

                    <li key={industry.title}>
                      <button
                        type="button"
                        className="transition hover:text-lime-300"
                      >
                        {industry.title}
                      </button>
                    </li>

                  ))}

                </ul>

              </div>

            </ScrollReveal>


            {/* CONTACT */}

            <ScrollReveal direction="right" delay={300}>

              <div>

                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  Get In Touch
                </h3>


                <div className="mt-6 space-y-5">

                  <div className="flex gap-3">

                    <MapPin
                      size={19}
                      className="mt-0.5 shrink-0 text-lime-300"
                    />

                    <p className="text-sm leading-6 text-gray-500">
                      Serving businesses nationwide
                    </p>

                  </div>


                  <div className="flex gap-3">

                    <ShieldCheck
                      size={19}
                      className="mt-0.5 shrink-0 text-lime-300"
                    />

                    <p className="text-sm leading-6 text-gray-500">
                      Performance-focused digital growth
                    </p>

                  </div>


                  <Booking name="Let's Connect" />

                </div>

              </div>

            </ScrollReveal>

          </div>


          {/* BOTTOM */}

          <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} LeadAxis. All rights reserved.
            </p>


            <div className="flex gap-6">

              <button
                type="button"
                className="transition hover:text-gray-300"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                className="transition hover:text-gray-300"
              >
                Terms of Service
              </button>

            </div>

          </div>

        </div>

      </footer>

    </main>
  );
};

export default Home;