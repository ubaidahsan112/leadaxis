/* eslint-disable preserve-caught-error */

import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  RefreshCw,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  BriefcaseBusiness,
  Target,
  DollarSign,
  Users,
  CalendarDays,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

import AdminSidebar from "../../Components/AdminSidebar";

/* -------------------------------------------------------
   API
------------------------------------------------------- */

const API_URL = "https://leadaxis-production.up.railway.app";
/* -------------------------------------------------------
   Reusable Information Item
------------------------------------------------------- */

const InfoItem = ({ icon: Icon, label, value, href }) => {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
        <Icon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {label}
        </p>

        {href && value ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-words text-sm font-medium text-lime-700 hover:underline dark:text-lime-300"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 break-words text-sm font-medium text-gray-900 dark:text-white">
            {value || "—"}
          </p>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------
   Admin Lead Details
------------------------------------------------------- */

const AdminLeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const statuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Won",
    "Lost",
  ];

  const statusStyles = {
    New: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

    Contacted:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",

    Qualified:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",

    "Proposal Sent":
      "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",

    Won: "bg-lime-100 text-lime-700 dark:bg-lime-500/10 dark:text-lime-400",

    Lost: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  };

  /* -------------------------------------------------------
     Fetch Lead
  ------------------------------------------------------- */

  const fetchLead = useCallback(
    async (showRefresh = false) => {
      try {
        if (showRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

       const response = await fetch(`${API_URL}/api/bookings/${id}`, {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
});
        const responseText = await response.text();

        if (!responseText.trim()) {
          throw new Error(
            `Lead API returned an empty response. HTTP status: ${response.status}`
          );
        }

        let data;

        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Lead JSON parse error:", parseError);

          throw new Error("Lead API returned invalid JSON.");
        }

        if (!response.ok || !data.success) {
          throw new Error(
            data?.message ||
              `Unable to load lead. HTTP status: ${response.status}`
          );
        }

        setLead(data.booking);
      } catch (err) {
        console.error("Lead detail fetch error:", err);

        setError(err.message || "Unable to load lead.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [id]
  );

  /* -------------------------------------------------------
     Initial Load
  ------------------------------------------------------- */

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  /* -------------------------------------------------------
     Update Status
  ------------------------------------------------------- */

  const updateStatus = async (status) => {
    if (!lead) {
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch(`${API_URL}/api/bookings/${lead.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const responseText = await response.text();

      if (!responseText.trim()) {
        throw new Error("Status update API returned an empty response.");
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Status update API returned invalid JSON.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data?.message || "Failed to update status.");
      }

      setLead(data.booking);

      toast.success("Lead status updated successfully.");
    } catch (err) {
      console.error("Update status error:", err);

      toast.error(err.message || "Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  /* -------------------------------------------------------
     Delete Lead
  ------------------------------------------------------- */

  const deleteLead = async () => {
    if (!lead) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this lead?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(`${API_URL}/api/bookings/${lead.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      const responseText = await response.text();

      if (!responseText.trim()) {
        throw new Error("Delete API returned an empty response.");
      }

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Delete API returned invalid JSON.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data?.message || "Failed to delete lead.");
      }

      toast.success("Lead deleted successfully.");

      navigate("/admin/leads");
    } catch (err) {
      console.error("Delete lead error:", err);

      toast.error(err.message || "Failed to delete lead.");
    } finally {
      setDeleting(false);
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

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  /* -------------------------------------------------------
     Time Formatting
  ------------------------------------------------------- */

  const formatTime = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  /* -------------------------------------------------------
     Consultation Date Formatting
  ------------------------------------------------------- */

  const formatConsultationDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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
          <div className="flex min-h-20 items-center justify-between gap-3 px-5 py-3 sm:px-8">
            <div className="flex items-center gap-3 pl-12 lg:pl-0">
              <Link
                to="/admin/leads"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-100 dark:border-white/10 dark:hover:bg-white/10"
                aria-label="Back to leads"
              >
                <ArrowLeft size={18} />
              </Link>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-600 dark:text-lime-300">
                  LeadAxis
                </p>

                <h1 className="mt-0.5 text-xl font-bold sm:text-2xl">
                  Lead Details
                </h1>
              </div>
            </div>

            {lead && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fetchLead(true)}
                  disabled={refreshing}
                  className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <RefreshCw
                    size={16}
                    className={refreshing ? "animate-spin" : ""}
                  />

                  <span className="hidden sm:inline">Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={deleteLead}
                  disabled={deleting}
                  className="flex h-10 items-center gap-2 rounded-xl border border-red-200 px-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={16} />

                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 sm:py-9">
          {loading ? (
            <div className="space-y-5">
              <div className="h-36 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/5" />

              <div className="grid gap-5 xl:grid-cols-3">
                <div className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/5" />
                <div className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/5" />
                <div className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/5" />
              </div>

              <div className="h-52 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/5" />
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-500/20 dark:bg-red-500/5 dark:text-red-400">
              <p className="font-semibold">Unable to load lead</p>

              <p className="mt-2 text-sm">{error}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => fetchLead(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>

                <Link
                  to="/admin/leads"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold dark:border-white/10"
                >
                  <ArrowLeft size={16} />
                  Back to Leads
                </Link>
              </div>
            </div>
          ) : !lead ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-white/10 dark:bg-[#101310]">
              <h3 className="font-bold">Lead not found</h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This lead may have been deleted or does not exist.
              </p>

              <Link
                to="/admin/leads"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
              >
                <ArrowLeft size={16} />
                Back to Leads
              </Link>
            </div>
          ) : (
            <>
              {/* Lead Header */}
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101310] sm:p-7">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-lime-100 text-lg font-bold text-lime-700 dark:bg-lime-300/10 dark:text-lime-300">
                      {lead.name
                        ? lead.name
                            .split(" ")
                            .filter(Boolean)
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "?"}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-2xl font-bold tracking-tight">
                        {lead.name || "Unnamed Lead"}
                      </h2>

                      <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                        {lead.business || "No business name"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        statusStyles[lead.status] ||
                        "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                      }`}
                    >
                      {lead.status || "New"}
                    </span>

                    <select
                      value={lead.status || "New"}
                      disabled={updating}
                      onChange={(event) =>
                        updateStatus(event.target.value)
                      }
                      className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium outline-none transition focus:border-lime-400 dark:border-white/10 dark:bg-white/5"
                    >
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
                </div>
              </section>

              {/* Information Cards */}
              <div className="mt-5 grid gap-5 xl:grid-cols-3">
                {/* Contact Information */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101310] sm:p-6">
                  <h3 className="font-bold">Contact Information</h3>

                  <div className="mt-6 space-y-5">
                    <InfoItem
                      icon={Mail}
                      label="Email"
                      value={lead.email}
                      href={
                        lead.email
                          ? `mailto:${lead.email}`
                          : undefined
                      }
                    />

                    <InfoItem
                      icon={Phone}
                      label="Phone"
                      value={lead.phone}
                      href={
                        lead.phone
                          ? `tel:${lead.phone}`
                          : undefined
                      }
                    />

                    <InfoItem
                      icon={Building2}
                      label="Business"
                      value={lead.business}
                    />

                    <InfoItem
                      icon={MapPin}
                      label="Location"
                      value={lead.location}
                    />

                    <InfoItem
                      icon={Globe}
                      label="Website"
                      value={lead.website}
                      href={lead.website || undefined}
                    />
                  </div>
                </section>

                {/* Campaign Information */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101310] sm:p-6">
                  <h3 className="font-bold">Campaign Information</h3>

                  <div className="mt-6 space-y-5">
                    <InfoItem
                      icon={BriefcaseBusiness}
                      label="Service"
                      value={lead.service}
                    />

                    <InfoItem
                      icon={Target}
                      label="Industry"
                      value={lead.industry}
                    />

                    <InfoItem
                      icon={DollarSign}
                      label="Monthly Budget"
                      value={lead.budget}
                    />

                    <InfoItem
                      icon={Users}
                      label="Monthly Leads"
                      value={lead.monthly_leads}
                    />
                  </div>
                </section>

                {/* Timeline */}
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101310] sm:p-6">
                  <h3 className="font-bold">Timeline</h3>

                  <div className="mt-6 space-y-6">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-100 text-lime-700 dark:bg-lime-300/10 dark:text-lime-300">
                        <CalendarDays size={18} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Submitted
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {formatDate(lead.created_at)}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {formatTime(lead.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                        <Clock size={18} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Last Updated
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {formatDate(lead.updated_at)}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {formatTime(lead.updated_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Consultation */}
              <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101310] sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100 text-lime-700 dark:bg-lime-300/10 dark:text-lime-300">
                    <CalendarDays size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Consultation Schedule
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Date and time selected by the prospect
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <InfoItem
                    icon={CalendarDays}
                    label="Consultation Date"
                    value={formatConsultationDate(
                      lead.consultation_date
                    )}
                  />

                  <InfoItem
                    icon={Clock}
                    label="Consultation Time"
                    value={lead.consultation_time}
                  />
                </div>
              </section>

              {/* Goals */}
              <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101310] sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100 text-lime-700 dark:bg-lime-300/10 dark:text-lime-300">
                    <Target size={18} />
                  </div>

                  <div>
                    <h3 className="font-bold">Lead Goals</h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Information submitted by the prospect
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-gray-50 p-5 dark:bg-white/[0.03]">
                  <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-600 dark:text-gray-300">
                    {lead.goals ||
                      "No goals or additional information were provided."}
                  </p>
                </div>
              </section>

              {/* Footer */}
              <footer className="mt-8 pb-4 text-center text-xs text-gray-400">
                LeadAxis Admin Panel
              </footer>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLeadDetails;
