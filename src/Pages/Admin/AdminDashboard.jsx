import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserPlus,
  PhoneCall,
  Target,
  FileText,
  Trophy,
  XCircle,
  RefreshCw,
  ArrowUpRight,
  Clock,
} from "lucide-react";

import AdminSidebar from "../../Components/AdminSidebar";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(
    async (showRefresh = false) => {
      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await fetch("/api/dashboard", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const responseText = await response.text();

        console.log(
          "Dashboard HTTP status:",
          response.status
        );

        console.log(
          "Dashboard response:",
          responseText
        );

        if (!responseText.trim()) {
          throw new Error(
            `Dashboard API returned an empty response. HTTP status: ${response.status}`
          );
        }

        let data;

        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "Dashboard JSON parse error:",
            parseError
          );

          throw new Error(
            "Dashboard API returned invalid JSON."
          );
        }

        if (!response.ok || !data.success) {
          throw new Error(
            data?.message ||
              `Dashboard request failed with status ${response.status}.`
          );
        }

        setDashboard(data.data);
      } catch (err) {
        console.error(
          "Dashboard fetch error:",
          err
        );

        setError(
          err.message ||
            "Dashboard data could not be loaded. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(() => {
      fetchDashboard(true);
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchDashboard]);

  const stats = [
    {
      title: "Total Leads",
      value: dashboard?.totalLeads ?? 0,
      icon: Users,
    },
    {
      title: "New Leads",
      value: dashboard?.newLeads ?? 0,
      icon: UserPlus,
    },
    {
      title: "Contacted",
      value: dashboard?.contactedLeads ?? 0,
      icon: PhoneCall,
    },
    {
      title: "Qualified",
      value: dashboard?.qualifiedLeads ?? 0,
      icon: Target,
    },
    {
      title: "Proposal Sent",
      value: dashboard?.proposalLeads ?? 0,
      icon: FileText,
    },
    {
      title: "Won",
      value: dashboard?.wonLeads ?? 0,
      icon: Trophy,
    },
    {
      title: "Lost",
      value: dashboard?.lostLeads ?? 0,
      icon: XCircle,
    },
  ];

  const statusStyles = {
    New:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

    Contacted:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",

    Qualified:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",

    "Proposal Sent":
      "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",

    Won:
      "bg-lime-100 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400",

    Lost:
      "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#080a08] dark:text-white">
      <AdminSidebar />

      {/* Main Area */}
      <div className="lg:pl-[260px]">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#080a08]/90">
          <div className="flex h-20 items-center justify-between px-5 sm:px-8">
            <div className="pl-12 lg:pl-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-600 dark:text-lime-300">
                LeadAxis
              </p>

              <h1 className="mt-0.5 text-xl font-bold sm:text-2xl">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => fetchDashboard(true)}
                disabled={refreshing}
                className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <RefreshCw
                  size={16}
                  className={
                    refreshing ? "animate-spin" : ""
                  }
                />

                <span className="hidden sm:inline">
                  Refresh
                </span>
              </button>

              <Link
                to="/"
                className="hidden items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 sm:flex"
              >
                View Site
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-9">
          {/* Welcome */}
          <section className="mb-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back, Ubaid.
            </p>

            <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Lead overview
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Monitor your actual booking submissions
                  and lead pipeline from one place.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
                Live data
              </div>
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/5 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#101310]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-100 text-lime-700 dark:bg-lime-300/10 dark:text-lime-300">
                      <Icon size={20} />
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>

                  <p className="mt-1 text-3xl font-bold tracking-tight">
                    {loading ? (
                      <span className="inline-block h-9 w-12 animate-pulse rounded-lg bg-gray-200 dark:bg-white/10" />
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Recent Leads */}
          <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#101310]">
            <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-white/10">
              <div>
                <h3 className="font-bold">
                  Recent Leads
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Latest real submissions from your
                  booking form
                </p>
              </div>

              <Link
                to="/admin/leads"
                className="flex w-fit items-center gap-1 text-sm font-semibold text-gray-700 transition hover:text-lime-600 dark:text-gray-300 dark:hover:text-lime-300"
              >
                View all
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4 p-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-16 animate-pulse rounded-xl bg-gray-100 dark:bg-white/5"
                  />
                ))}
              </div>
            ) : !dashboard?.recentLeads?.length ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500">
                  <Users size={24} />
                </div>

                <h4 className="mt-4 font-semibold">
                  No leads yet
                </h4>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
                  New booking submissions will
                  automatically appear here once they
                  are received.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {dashboard.recentLeads.map(
                  (lead) => (
                    <Link
                      key={lead.id}
                      to={`/admin/leads/${lead.id}`}
                      className="flex flex-col gap-4 px-5 py-5 transition hover:bg-gray-50 dark:hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold dark:bg-white/10">
                          {lead.name
                            ? lead.name
                                .split(" ")
                                .map(
                                  (name) =>
                                    name[0]
                                )
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()
                            : "?"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {lead.name ||
                              "Unnamed Lead"}
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                            {lead.business ||
                              "No business name"}

                            {lead.service
                              ? ` · ${lead.service}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[
                              lead.status
                            ] ||
                            "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                          }`}
                        >
                          {lead.status || "New"}
                        </span>

                        <div className="hidden text-right sm:block">
                          <p className="flex items-center justify-end gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={13} />

                            {formatDate(
                              lead.created_at
                            )}
                          </p>

                          <p className="mt-1 text-[11px] text-gray-400">
                            {formatTime(
                              lead.created_at
                            )}
                          </p>
                        </div>

                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-gray-400"
                        />
                      </div>
                    </Link>
                  )
                )}
              </div>
            )}
          </section>

          {/* Pipeline */}
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101310] sm:p-6">
            <div className="mb-6">
              <h3 className="font-bold">
                Lead Pipeline
              </h3>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Current distribution of your actual
                leads
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {[
                [
                  "New",
                  dashboard?.newLeads ?? 0,
                ],
                [
                  "Contacted",
                  dashboard?.contactedLeads ?? 0,
                ],
                [
                  "Qualified",
                  dashboard?.qualifiedLeads ?? 0,
                ],
                [
                  "Proposal Sent",
                  dashboard?.proposalLeads ?? 0,
                ],
                [
                  "Won",
                  dashboard?.wonLeads ?? 0,
                ],
                [
                  "Lost",
                  dashboard?.lostLeads ?? 0,
                ],
              ].map(([status, count]) => (
                <div
                  key={status}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/[0.03]"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {status}
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {loading ? "—" : count}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-8 pb-4 text-center text-xs text-gray-400">
            LeadAxis Admin Panel
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;