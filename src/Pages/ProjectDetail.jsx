import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "../Components/ScrollReveal";
import LoadingScreen from "../Components/LoadingScreen";
import { getProjectBySlug } from "../data/projects";
/* =========================================================
   SLUG HELPER
========================================================= */

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};


/* =========================================================
   COMPONENT
========================================================= */

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  /* =======================================================
     LOADING
  ======================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [slug]);

  /* =======================================================
     FIND PROJECT
  ======================================================= */

  const project = getProjectBySlug(slug) ;

  /* =======================================================
     LOADING SCREEN
  ======================================================= */

  if (isLoading) {
    return <LoadingScreen />;
  }

  /* =======================================================
     PROJECT NOT FOUND
  ======================================================= */

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-white">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-300 text-gray-950">
            <Sparkles size={25} />
          </div>

          <h1 className="mt-7 text-3xl font-black sm:text-5xl">
            Project Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
            The project you're looking for could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 font-bold text-gray-950 transition-all duration-300 hover:-translate-y-1 hover:bg-lime-200"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="project-page min-h-screen overflow-hidden bg-gray-950 text-white">

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes projectPageEnter {
            from {
              opacity: 0;
              transform: translateY(24px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes projectGlow {
            from {
              opacity: 0;
              transform: scale(0.8);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .project-page {
            animation: projectPageEnter 700ms
              cubic-bezier(0.22, 1, 0.36, 1);
          }

          .project-glow {
            animation: projectGlow 900ms
              cubic-bezier(0.22, 1, 0.36, 1);
          }

          @media (prefers-reduced-motion: reduce) {
            .project-page,
            .project-glow {
              animation: none;
            }
          }
        `}
      </style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:px-12 lg:pb-28 lg:pt-32">

        {/* Background glow */}
        <div className="project-glow pointer-events-none absolute -right-40 top-10 h-72 w-72 rounded-full bg-lime-300/10 blur-[110px] sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-lime-300/5 blur-[100px]" />

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* =================================================
              BACK BUTTON
              Mobile = top left
          ================================================= */}

          <ScrollReveal direction="left">
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 hover:border-lime-300/40 hover:bg-lime-300/5 hover:text-lime-300 sm:px-5 sm:py-3"
              >
                <ArrowLeft
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />

                <span>Back to Projects</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Hero */}
          <ScrollReveal direction="up">
            <div className="mt-12 sm:mt-14 lg:mt-16">

              {/* Category */}
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/10 bg-lime-300/[0.07] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-lime-300 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />

                {project.category}
              </div>

              {/* Title */}
              <h1 className="mt-6 max-w-6xl text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
                {project.title}
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8 lg:text-xl">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-gray-300 backdrop-blur-sm sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================
          PROJECT CONTENT
      ===================================================== */}

      <section className="relative overflow-hidden bg-white px-5 py-20 text-gray-950 sm:px-8 sm:py-24 lg:px-12 lg:py-28 dark:bg-gray-900 dark:text-white">

        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-lime-300/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">

            {/* =================================================
                RESULT CARD
            ================================================= */}

            <ScrollReveal direction="left">
              <div className="group relative h-full overflow-hidden rounded-[2rem] bg-lime-300 p-7 shadow-xl shadow-lime-300/10 sm:p-10 lg:p-12">

                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border-[30px] border-gray-950/5 transition-transform duration-700 group-hover:scale-110" />

                <div className="relative z-10">

                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-950/60">
                      Key Result
                    </p>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-lime-300">
                      <ArrowUpRight size={19} />
                    </div>
                  </div>

                  <div className="mt-10 text-6xl font-black tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                    {project.metric}
                  </div>

                  <p className="mt-3 max-w-xs text-base font-bold text-gray-950/70 sm:text-lg">
                    {project.metricLabel}
                  </p>

                  <div className="mt-10 h-px bg-gray-950/10" />

                  <p className="mt-6 text-sm leading-6 text-gray-950/60">
                    A measurable outcome from a focused digital strategy.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* =================================================
                OVERVIEW
            ================================================= */}

            <ScrollReveal direction="right">
              <div className="flex h-full flex-col justify-center">

                <p className="text-xs font-black uppercase tracking-[0.25em] text-lime-500">
                  Project Overview
                </p>

                <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Turning strategy into measurable results.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 dark:text-gray-400">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-9 grid gap-3 sm:grid-cols-2">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-800 dark:bg-gray-950"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-300 text-gray-950">
                        <CheckCircle2 size={16} />
                      </div>

                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* =================================================
              PROJECT INFORMATION
          ================================================= */}

          <ScrollReveal direction="up">
            <div className="mt-20 border-t border-gray-200 pt-12 dark:border-gray-800 sm:mt-24 sm:pt-14">

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                    Project
                  </p>

                  <p className="mt-3 text-lg font-bold sm:text-xl">
                    {project.title}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                    Industry
                  </p>

                  <p className="mt-3 text-lg font-bold sm:text-xl">
                    {project.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                    Focus
                  </p>

                  <p className="mt-3 text-lg font-bold sm:text-xl">
                    {project.tags.length} strategic areas
                  </p>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* =================================================
              BOTTOM BACK BUTTON
          ================================================= */}

          <div className="mt-14 flex justify-center sm:mt-16">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-3 rounded-full bg-gray-950 px-7 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 dark:bg-lime-300 dark:text-gray-950 dark:hover:bg-lime-200"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to Projects

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;