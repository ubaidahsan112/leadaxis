import { useEffect, useState } from "react";
import {
  House,
  BriefcaseBusiness,
  FolderKanban,
  Factory,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Booking from "./Booking";
import logo from "../assets/logo.png";
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      target: "home",
      icon: House,
    },
    {
      name: "Services",
      target: "services",
      icon: BriefcaseBusiness,
    },
    {
      name: "Work",
      target: "work",
      icon: FolderKanban,
    },
    {
      name: "Expertise",
      target: "industries",
      icon: Factory,
    },
    {
      name: "Connect",
      target: "connect",
      icon: MessageCircle,
    },
  ];

  /* Detect currently visible section */
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-80px 0px -20% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* Scroll to section */
  const scrollToSection = (id) => {
  setMenuOpen(false);

  if (location.pathname !== "/") {
    navigate("/");

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return;
  }

  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[94%] -translate-x-1/2 rounded-2xl border border-white/60 bg-white/90 shadow-[0_8px_35px_rgba(0,0,0,0.10)] backdrop-blur-md sm:top-5 sm:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%]">

      {/* =========================
          MAIN NAVBAR
      ========================== */}

      <div className="flex h-16 items-center justify-between px-4 sm:px-5">

        {/* LOGO */}
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


        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.target;

            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.target)}
                className={`group relative flex items-center gap-2 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={1.8}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "scale-110"
                      : "group-hover:-translate-y-[1px]"
                  }`}
                />

                <span>{item.name}</span>

                {/* Active underline */}
                <span
                  className={`absolute -bottom-[13px] left-0 h-[3px] rounded-full bg-lime-300 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </button>
            );
          })}

        </div>


        {/* =========================
            DESKTOP BOOKING
        ========================== */}

        <div className="hidden shrink-0 lg:block">
          <Booking name="Let's Connect" />
        </div>


        {/* =========================
            MOBILE HAMBURGER
        ========================== */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-900 transition-all duration-300 hover:bg-lime-200 lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </div>


      {/* =========================
          MOBILE MENU
      ========================== */}

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-100 px-4 pb-5 pt-3">

          <div className="flex flex-col gap-1">

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.target;

              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.target)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-lime-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                  />

                  <span>{item.name}</span>

                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-lime-400" />
                  )}
                </button>
              );
            })}

          </div>


          {/* Mobile Booking Button */}
          <div className="mt-3 border-t border-gray-100 pt-4">
            <Booking name="Let's Connect" />
          </div>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;