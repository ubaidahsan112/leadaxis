import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  MessageSquare,
  Settings,
  ExternalLink,
  Menu,
  X,
  Leaf,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Leads",
      path: "/admin/leads",
      icon: BriefcaseBusiness,
    },
    {
      label: "Reviews",
      path: "/admin/reviews",
      icon: MessageSquare,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");

    setMobileOpen(false);

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-white/10 dark:bg-[#0b0f0c] lg:hidden">
        <Link
          to="/admin"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-300 text-black">
            <Leaf size={20} strokeWidth={2.5} />
          </div>

          <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
            Lead<span className="text-lime-300">Axis</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 dark:border-white/10 dark:bg-[#0b0f0c] ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-gray-200 px-6 dark:border-white/10">
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300 text-black shadow-lg shadow-lime-300/20">
              <Leaf size={22} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                Lead<span className="text-lime-300">Axis</span>
              </h1>

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
            Management
          </p>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "bg-lime-300 text-black shadow-lg shadow-lime-500/10"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  <Icon
                    size={19}
                    strokeWidth={active ? 2.5 : 2}
                  />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Website */}
          <div className="mt-8">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Website
            </p>

            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <ExternalLink size={19} />

              <span>View Website</span>
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 p-4 dark:border-white/10">
          <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-500/10 text-lime-600 dark:text-lime-300">
                <Leaf size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-gray-900 dark:text-white">
                  LeadAxis Admin
                </p>

                <p className="text-[10px] text-gray-400">
                  Management Panel
                </p>
              </div>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:bg-white/[0.02] dark:text-red-400 dark:hover:bg-red-500/10"
            >
              <LogOut size={17} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top spacing */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default AdminSidebar;
