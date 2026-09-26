import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Target,
  Zap,
  Layers3,
} from "lucide-react";
import ScrollReveal from "../Components/ScrollReveal";
import LoadingScreen from "../Components/LoadingScreen";

const services = {
  search: {
    title: "Search",
    subtitle: "Get found by customers who are already looking for you.",
    description:
      "Our search strategy helps businesses become more visible when potential customers are actively searching for the products and services they provide.",
    overview:
      "We build search strategies around customer intent, local visibility, content, and long-term organic growth. Every campaign is designed to improve visibility while creating a stronger path from search to conversion.",
    services: [
      "Search Engine Optimization",
      "Local Search Engine Marketing",
      "Local Maps SEO",
      "Social Media Networking",
      "Link Building Management",
      "Content Creation",
      "Custom Blogs",
    ],
  },

  "paid-media": {
    title: "Paid Media",
    subtitle:
      "Instant visibility with a measurable return on every dollar.",
    description:
      "Performance-focused paid advertising designed to reach high-intent customers and generate measurable opportunities.",
    overview:
      "Our paid media campaigns combine targeting, creative, landing pages, conversion tracking, and continuous optimization to help businesses turn advertising spend into qualified opportunities.",
    services: [
      "Pay Per Click (PPC) Advertising",
      "Facebook Advertising",
      "Campaign Strategy",
      "Audience Targeting",
      "Ad Creative",
      "Conversion Tracking",
      "Campaign Optimization",
    ],
  },

  creative: {
    title: "Creative",
    subtitle:
      "A brand and website your customers trust at first glance.",
    description:
      "Creative experiences designed to make businesses look credible, memorable, and ready for growth.",
    overview:
      "From visual identity to website experiences, we create digital assets that communicate value clearly and give customers confidence before they ever make contact.",
    services: [
      "Online Branding",
      "Website Design",
      "Visual Identity",
      "Landing Page Design",
      "Conversion-Focused Design",
      "Creative Direction",
    ],
  },

  development: {
    title: "Development",
    subtitle:
      "Fast, reliable builds engineered to convert visitors.",
    description:
      "Modern websites and applications built around performance, usability, and business objectives.",
    overview:
      "We develop responsive digital products using modern technologies with a focus on clean architecture, smooth user experiences, performance, and scalability.",
    services: [
      "Software Development",
      "Applications Design",
      "Website Development",
      "React Development",
      "React Native Applications",
      "API Integration",
      "Responsive Development",
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [slug]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const service = services[slug];

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-white">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Sparkles className="text-lime-300" size={26} />
          </div>

          <h1 className="mt-6 text-3xl font-black sm:text-4xl">
            Service Not Found
          </h1>

          <p className="mt-3 text-gray-400">
            The service you're looking for doesn't exist.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-bold text-gray-950 transition hover:bg-lime-200"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes servicePageEnter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes serviceGlow {
          0%, 100% {
            opacity: .35;
            transform: scale(1);
          }
          50% {
            opacity: .6;
            transform: scale(1.08);
          }
        }

        .service-page-enter {
          animation: servicePageEnter .7s ease-out both;
        }

        .service-glow {
          animation: serviceGlow 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .service-page-enter,
          .service-glow {
            animation: none;
          }
        }
      `}</style>

      <main className="service-page-enter min-h-screen overflow-hidden bg-gray-950 text-white">
        {/* HERO */}
        <section className="relative overflow-hidden px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:px-12 lg:pb-28">
          {/* Background glow */}
          <div className="service-glow absolute -left-40 top-10 h-80 w-80 rounded-full bg-lime-300/10 blur-[120px] sm:h-96 sm:w-96" />

          <div className="absolute -right-40 top-40 h-72 w-72 rounded-full bg-lime-300/5 blur-[100px]" />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            {/* BACK BUTTON */}
            <ScrollReveal direction="left">
              <div className="mb-12 flex justify-start sm:mb-16">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 hover:border-lime-300/40 hover:bg-lime-300/5 hover:text-lime-300 sm:px-5 sm:py-3"
                >
                  <ArrowLeft
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                  <span>Back to Services</span>
                </button>
              </div>
            </ScrollReveal>

            {/* HERO CONTENT */}
            <ScrollReveal direction="up">
              <div className="max-w-5xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-lime-300">
                  <Sparkles size={14} />
                  Our Service
                </div>

                <h1 className="mt-6 text-5xl font-black tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
                  {service.title}
                  <span className="text-lime-300">.</span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400 sm:mt-8 sm:text-xl sm:leading-9 lg:text-2xl">
                  {service.subtitle}
                </p>
              </div>
            </ScrollReveal>

            {/* HERO BOTTOM STATS */}
            <ScrollReveal direction="up">
              <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-300/20">
                  <Target className="text-lime-300" size={22} />

                  <p className="mt-4 text-sm font-semibold text-gray-400">
                    Focus
                  </p>

                  <p className="mt-1 font-bold text-white">
                    Customer Intent
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-300/20">
                  <Zap className="text-lime-300" size={22} />

                  <p className="mt-4 text-sm font-semibold text-gray-400">
                    Approach
                  </p>

                  <p className="mt-1 font-bold text-white">
                    Performance Driven
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-300/20">
                  <Layers3 className="text-lime-300" size={22} />

                  <p className="mt-4 text-sm font-semibold text-gray-400">
                    Built For
                  </p>

                  <p className="mt-1 font-bold text-white">
                    Sustainable Growth
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* DETAILS */}
        <section
  className="
    bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.16),transparent_35%),linear-gradient(135deg,#ffffff_0%,#f7fee7_50%,#ecfccb_100%)]
    px-5 py-20
    text-gray-950
    sm:px-8 sm:py-24
    lg:px-12 lg:py-28
    dark:bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.10),transparent_35%),linear-gradient(135deg,#030712_0%,#0a0f0a_55%,#101b0c_100%)]
    dark:text-white
  "
>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              {/* LEFT */}
              <ScrollReveal direction="left">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-lime-600 sm:text-sm">
                    What We Do
                  </p>

                  <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                    {service.description}
                  </h2>

                  <div className="mt-7 h-px w-20 bg-lime-300" />

                  <p className="mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
                    {service.overview}
                  </p>
                </div>
              </ScrollReveal>

              {/* RIGHT INCLUDED */}
              <ScrollReveal direction="right">
                <div className="relative overflow-hidden rounded-[2rem] border border-lime-600 bg-lime-300 p-6 sm:p-8 lg:p-9">
                  <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lime-300/10 blur-[70px]" />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-lime-600 sm:text-sm">
                          Included
                        </p>

                        <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                          What you get
                        </h3>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-lime-300">
                        <CheckCircle2 size={22} />
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      {service.services.map((item, index) => (
                        <div
                          key={item}
                          className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-300 hover:shadow-md"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-300/15 text-sm font-bold text-lime-700 transition-colors group-hover:bg-lime-300">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <span className="text-sm font-semibold text-gray-700 sm:text-base">
                            {item}
                          </span>

                          <CheckCircle2
                            size={17}
                            className="ml-auto shrink-0 text-lime-500 opacity-70"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* SERVICE CTA */}
            <ScrollReveal direction="up">
              <div className="mt-20 overflow-hidden rounded-[2rem] bg-gray-950 p-7 text-white sm:p-10 lg:mt-24 lg:p-12">
                <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-lime-300">
                      Ready to grow?
                    </p>

                    <h3 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                      Turn this service into your next growth opportunity.
                    </h3>

                    <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                      Build a strategy around your goals, customers, and
                      opportunities with a focused digital approach.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="group inline-flex w-fit items-center gap-3 rounded-full bg-lime-300 px-6 py-3.5 font-bold text-gray-950 transition-all duration-300 hover:-translate-y-1 hover:bg-lime-200 hover:shadow-[0_10px_30px_rgba(163,230,53,0.15)]"
                  >
                    Explore Services

                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* BOTTOM BACK */}
            <div className="mt-12 border-t border-gray-200 pt-8 sm:mt-16 sm:pt-10">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="group inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3.5 font-bold text-gray-950 transition-all duration-300 hover:-translate-x-1 hover:border-gray-950 hover:bg-gray-950 hover:text-white"
              >
                <ArrowLeft
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                Back to Services

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServiceDetail;