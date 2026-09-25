import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  ChevronRight,
  Users,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import AdminSidebar from "../../Components/AdminSidebar";

/* -------------------------------------------------------
   API
------------------------------------------------------- */

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://leadaxis-production.up.railway.app";

/* -------------------------------------------------------
   Admin Leads
------------------------------------------------------- */

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const statuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Won",
    "Lost",
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

  /* -------------------------------------------------------
     Fetch Leads
  ------------------------------------------------------- */

  const fetchLeads = useCallback(
    async (showRefresh = false) => {
      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const url = `${API_URL}/api/bookings`;

        console.log("Fetching leads from:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const responseText = await response.text();

        if (!responseText.trim()) {
          throw new Error(
            `Leads API returned an empty response. HTTP status: ${response.status}`
          );
        }

        let data;

        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "Leads JSON parse error:",
            parseError
          );

          console.error(
            "Leads API response:",
            responseText
          );

          throw new Error(
            "Leads API returned invalid JSON."
          );
        }

        if (!response.ok || !data.success) {
          throw new Error(
            data?.message ||
              `Failed to load leads. HTTP status: ${response.status}`
          );
        }

        const bookings = Array.isArray(data.bookings)
          ? data.bookings
          : [];

        console.log("Leads received:", bookings);

        setLeads(bookings);
      } catch (err) {
        console.error("Leads fetch error:", err);

        setError(
          err.message ||
            "Unable to load leads. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  /* -------------------------------------------------------
     Initial Load + Auto Refresh
  ------------------------------------------------------- */

  useEffect(() => {
    fetchLeads();

    const interval = setInterval(() => {
      fetchLeads(true);
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchLeads]);

  /* -------------------------------------------------------
     Filter Leads
  ------------------------------------------------------- */

  const filteredLeads = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "All" ||
        lead.status === statusFilter;

      if (!searchValue) {
        return matchesStatus;
      }

      const searchableText = [
        lead.name,
        lead.email,
        lead.business,
        lead.industry,
        lead.location,
        lead.phone,
        lead.service,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesStatus &&
        searchableText.includes(searchValue)
      );
    });
  }, [leads, search, statusFilter]);

  /* -------------------------------------------------------
     Update Status
  ------------------------------------------------------- */

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const response = await fetch(
        `${API_URL}/api/bookings/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const responseText = await response.text();

      if (!responseText.trim()) {
        throw new Error(
          "Status update API returned an empty response."
        );
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Status update API returned invalid JSON."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message ||
            "Failed to update lead status."
        );
      }

      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === id
            ? data.booking
            : lead
        )
      );

      toast.success(
        "Lead status updated successfully."
      );
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      toast.error(
        err.message ||
          "Failed to update lead status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* -------------------------------------------------------
     Delete Lead
  ------------------------------------------------------- */

  const deleteLead = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this lead?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await fetch(
        `${API_URL}/api/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const responseText = await response.text();

      if (!responseText.trim()) {
        throw new Error(
          "Delete API returned an empty response."
        );
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Delete API returned invalid JSON."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message ||
            "Failed to delete lead."
        );
      }

      setLeads((currentLeads) =>
        currentLeads.filter(
          (lead) => lead.id !== id
        )
      );

      toast.success(
        "Lead deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete lead error:",
        err
      );

      toast.error(
        err.message ||
          "Failed to delete lead."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* -------------------------------------------------------
     Date Formatting
  ------------------------------------------------------- */

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  /* -------------------------------------------------------
     Time Formatting
  ------------------------------------------------------- */

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  /* -------------------------------------------------------
     Render
  ------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#080a08] dark:text-white">
      <AdminSidebar />

      <div className="lg:pl-[260px]">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#080a08]/90">
          <div className="flex min-h-20 items-center justify-between gap-4 px-5 py-3 sm:px-8">
            <div className="pl-12 lg:pl-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-600 dark:text-lime-300">
                LeadAxis
              </p>

              <h1 className="mt-0.5 text-xl font-bold sm:text-2xl">
                Leads
              </h1>
            </div>

            <button
              type="button"
              onClick={() => fetchLeads(true)}
              disabled={refreshing}
              className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 sm:py-9">
          {/* Heading */}
          <section className="mb-7">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your real booking submissions.
            </p>

            <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  All Leads
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  View, update and manage every lead
                  stored in your database.
                </p>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                {loading
                  ? "Loading..."
                  : `${leads.length} ${
                      leads.length === 1
                        ? "lead"
                        : "leads"
                    }`}
              </div>
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/5 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Filters */}
          <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#101310]">
            <div className="flex flex-col gap-3 lg:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search name, email, business, phone, service..."
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-11 text-sm outline-none transition placeholder:text-gray-400 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <option value="All">
                  All Statuses
                </option>

                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                    className="text-gray-900"
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Leads */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#101310]">
            {loading ? (
              <div className="space-y-4 p-6">
                {[1, 2, 3, 4].map(
                  (item) => (
                    <div
                      key={item}
                      className="h-20 animate-pulse rounded-xl bg-gray-100 dark:bg-white/5"
                    />
                  )
                )}
              </div>
            ) : leads.length === 0 ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500">
                  <Users size={28} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  No leads yet
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                  No booking submissions have been
                  received yet. New leads will appear
                  here automatically.
                </p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500">
                  <Search size={24} />
                </div>

                <h3 className="mt-4 font-bold">
                  No matching leads
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Try changing your search or status
                  filter.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 text-left dark:border-white/10 dark:bg-white/[0.02]">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                          Lead
                        </th>

                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                          Business
                        </th>

                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                          Service
                        </th>

                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                          Status
                        </th>

                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                          Submitted
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {filteredLeads.map(
                        (lead) => (
                          <tr
                            key={lead.id}
                            className="transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold dark:bg-white/10">
                                  {lead.name
                                    ? lead.name
                                        .split(" ")
                                        .map(
                                          (name) =>
                                            name[0]
                                        )
                                        .join("")
                                        .slice(
                                          0,
                                          2
                                        )
                                        .toUpperCase()
                                    : "?"}
                                </div>

                                <div className="min-w-0">
                                  <p className="font-semibold">
                                    {lead.name ||
                                      "Unnamed Lead"}
                                  </p>

                                  <p className="mt-1 max-w-[220px] truncate text-xs text-gray-500 dark:text-gray-400">
                                    {lead.email ||
                                      "No email"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-5">
                              <p className="font-medium">
                                {lead.business ||
                                  "—"}
                              </p>

                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {lead.industry ||
                                  "Industry not specified"}
                              </p>
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300">
                              {lead.service || "—"}
                            </td>

                            <td className="px-6 py-5">
                              <select
                                value={
                                  lead.status ||
                                  "New"
                                }
                                disabled={
                                  updatingId ===
                                  lead.id
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateStatus(
                                    lead.id,
                                    event.target
                                      .value
                                  )
                                }
                                className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${
                                  statusStyles[
                                    lead.status
                                  ] ||
                                  "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {statuses.map(
                                  (
                                    status
                                  ) => (
                                    <option
                                      key={
                                        status
                                      }
                                      value={
                                        status
                                      }
                                      className="bg-white text-gray-900"
                                    >
                                      {status}
                                    </option>
                                  )
                                )}
                              </select>
                            </td>

                            <td className="px-6 py-5">
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {formatDate(
                                  lead.created_at
                                )}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                {formatTime(
                                  lead.created_at
                                )}
                              </p>
                            </td>

                            <td className="px-6 py-5">
                              <div className="flex justify-end gap-2">
                                <Link
                                  to={`/admin/leads/${lead.id}`}
                                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-lime-300 hover:bg-lime-50 hover:text-lime-700 dark:border-white/10 dark:hover:bg-lime-300/10 dark:hover:text-lime-300"
                                  title="View lead"
                                >
                                  <Eye size={16} />
                                </Link>

                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteLead(
                                      lead.id
                                    )
                                  }
                                  disabled={
                                    deletingId ===
                                    lead.id
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:border-white/10 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                  title="Delete lead"
                                >
                                  <Trash2
                                    size={16}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="divide-y divide-gray-100 dark:divide-white/5 lg:hidden">
                  {filteredLeads.map(
                    (lead) => (
                      <div
                        key={lead.id}
                        className="p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold dark:bg-white/10">
                              {lead.name
                                ? lead.name
                                    .split(" ")
                                    .map(
                                      (name) =>
                                        name[0]
                                    )
                                    .join("")
                                    .slice(
                                      0,
                                      2
                                    )
                                    .toUpperCase()
                                : "?"}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold">
                                {lead.name ||
                                  "Unnamed Lead"}
                              </p>

                              <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                                {lead.email ||
                                  "No email"}
                              </p>
                            </div>
                          </div>

                          <Link
                            to={`/admin/leads/${lead.id}`}
                            className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
                          >
                            <ChevronRight
                              size={18}
                            />
                          </Link>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Business
                            </p>

                            <p className="mt-1 text-sm font-medium">
                              {lead.business ||
                                "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Service
                            </p>

                            <p className="mt-1 text-sm font-medium">
                              {lead.service ||
                                "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Status
                            </p>

                            <select
                              value={
                                lead.status ||
                                "New"
                              }
                              disabled={
                                updatingId ===
                                lead.id
                              }
                              onChange={(
                                event
                              ) =>
                                updateStatus(
                                  lead.id,
                                  event.target
                                    .value
                                )
                              }
                              className={`mt-1 rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${
                                statusStyles[
                                  lead.status
                                ] ||
                                "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {statuses.map(
                                (status) => (
                                  <option
                                    key={
                                      status
                                    }
                                    value={
                                      status
                                    }
                                    className="bg-white text-gray-900"
                                  >
                                    {status}
                                  </option>
                                )
                              )}
                            </select>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Submitted
                            </p>

                            <p className="mt-1 text-sm">
                              {formatDate(
                                lead.created_at
                              )}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {formatTime(
                                lead.created_at
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex gap-2">
                          <Link
                            to={`/admin/leads/${lead.id}`}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900"
                          >
                            <Eye size={16} />
                            View Lead
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              deleteLead(
                                lead.id
                              )
                            }
                            disabled={
                              deletingId ===
                              lead.id
                            }
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </section>

          <footer className="mt-8 pb-4 text-center text-xs text-gray-400">
            LeadAxis Admin Panel
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLeads;
