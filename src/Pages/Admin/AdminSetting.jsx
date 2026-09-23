import { useEffect, useState } from "react";
import {
  RefreshCw,
  Database,
  Server,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

import AdminSidebar from "../../Components/AdminSidebar";

const AdminSetting = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] =
    useState("15");

  const [apiStatus, setApiStatus] =
    useState("checking");

  useEffect(() => {
    const savedAutoRefresh =
      localStorage.getItem(
        "leadaxis_auto_refresh"
      );

    const savedInterval =
      localStorage.getItem(
        "leadaxis_refresh_interval"
      );

    if (savedAutoRefresh !== null) {
      setAutoRefresh(
        savedAutoRefresh === "true"
      );
    }

    if (savedInterval !== null) {
      setRefreshInterval(savedInterval);
    }

    checkApi();
  }, []);

  const checkApi = async () => {
    try {
      setApiStatus("checking");

      const response = await fetch(
        "/api/health",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (
        response.ok &&
        data.success &&
        data.database
      ) {
        setApiStatus("connected");
      } else {
        setApiStatus("error");
      }
    } catch (error) {
      console.error(
        "API health check error:",
        error
      );

      setApiStatus("error");
    }
  };

  const savePreferences = () => {
    localStorage.setItem(
      "leadaxis_auto_refresh",
      String(autoRefresh)
    );

    localStorage.setItem(
      "leadaxis_refresh_interval",
      refreshInterval
    );

    toast.success(
      "Admin preferences saved."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#080a08] dark:text-white">
      <AdminSidebar />

      <div className="lg:pl-[260px]">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#080a08]/90">
          <div className="flex min-h-20 items-center px-5 py-3 sm:px-8">
            <div className="pl-12 lg:pl-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-600 dark:text-lime-300">
                LeadAxis
              </p>

              <h1 className="mt-0.5 text-xl font-bold sm:text-2xl">
                Settings
              </h1>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1100px] px-5 py-7 sm:px-8 sm:py-9">
          {/* Heading */}
          <section className="mb-7">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Configure your admin panel preferences.
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Admin Settings
            </h2>
          </section>

          {/* Refresh Settings */}
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#101310]">
            <div className="border-b border-gray-200 p-5 dark:border-white/10 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-100 text-lime-700 dark:bg-lime-300/10 dark:text-lime-300">
                  <RefreshCw size={20} />
                </div>

                <div>
                  <h3 className="font-bold">
                    Dashboard Refresh
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Configure how often the admin dashboard
                    checks for new lead data.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              {/* Auto Refresh */}
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">
                    Automatic Refresh
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Automatically check the backend for new
                    leads.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setAutoRefresh(
                      (current) => !current
                    )
                  }
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    autoRefresh
                      ? "bg-lime-400"
                      : "bg-gray-300 dark:bg-white/20"
                  }`}
                  aria-label="Toggle automatic refresh"
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      autoRefresh
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Interval */}
              <div className="flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 dark:border-white/5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">
                    Refresh Interval
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    How frequently dashboard data should be
                    requested.
                  </p>
                </div>

                <select
                  value={refreshInterval}
                  onChange={(event) =>
                    setRefreshInterval(
                      event.target.value
                    )
                  }
                  disabled={!autoRefresh}
                  className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium outline-none transition focus:border-lime-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5"
                >
                  <option
                    value="5"
                    className="text-gray-900"
                  >
                    Every 5 seconds
                  </option>

                  <option
                    value="15"
                    className="text-gray-900"
                  >
                    Every 15 seconds
                  </option>

                  <option
                    value="30"
                    className="text-gray-900"
                  >
                    Every 30 seconds
                  </option>

                  <option
                    value="60"
                    className="text-gray-900"
                  >
                    Every 60 seconds
                  </option>
                </select>
              </div>

              {/* Save */}
              <div className="border-t border-gray-100 pt-6 dark:border-white/5">
                <button
                  type="button"
                  onClick={savePreferences}
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  <Save size={16} />
                  Save Preferences
                </button>

                <p className="mt-3 text-xs text-gray-400">
                  These preferences are saved locally in
                  this browser.
                </p>
              </div>
            </div>
          </section>

          {/* System Status */}
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#101310]">
            <div className="border-b border-gray-200 p-5 dark:border-white/10 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300">
                  <Server size={20} />
                </div>

                <div>
                  <h3 className="font-bold">
                    System Status
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Current connection status of LeadAxis
                    services.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              {/* API */}
              <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <Server
                    size={18}
                    className="text-gray-400"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      LeadAxis API
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Express backend
                    </p>
                  </div>
                </div>

                {apiStatus ===
                "checking" ? (
                  <span className="text-xs font-semibold text-gray-400">
                    Checking...
                  </span>
                ) : apiStatus ===
                  "connected" ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-lime-600 dark:text-lime-400">
                    <CheckCircle2
                      size={15}
                    />
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
                    <AlertCircle
                      size={15}
                    />
                    Offline
                  </span>
                )}
              </div>

              {/* Database */}
              <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <Database
                    size={18}
                    className="text-gray-400"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      PostgreSQL Database
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      LeadAxis data source
                    </p>
                  </div>
                </div>

                {apiStatus ===
                "checking" ? (
                  <span className="text-xs font-semibold text-gray-400">
                    Checking...
                  </span>
                ) : apiStatus ===
                  "connected" ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-lime-600 dark:text-lime-400">
                    <CheckCircle2
                      size={15}
                    />
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
                    <AlertCircle
                      size={15}
                    />
                    Connection Error
                  </span>
                )}
              </div>

              {/* Check Again */}
              <button
                type="button"
                onClick={checkApi}
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
              >
                <RefreshCw size={15} />
                Check Connection
              </button>
            </div>
          </section>

          {/* Important Information */}
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101310] sm:p-6">
            <h3 className="font-bold">
              Data & Privacy
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              <p>
                Lead information displayed in the admin
                panel comes directly from your PostgreSQL
                database.
              </p>

              <p>
                Dashboard statistics are calculated from
                actual booking records and are not generated
                from placeholder data.
              </p>

              <p>
                Browser preferences on this page are stored
                locally and are not saved to the server.
              </p>
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

export default AdminSetting;