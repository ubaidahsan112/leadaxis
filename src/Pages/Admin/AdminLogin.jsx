import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid password.");
      }

      localStorage.setItem("adminAuthenticated", "true");

      toast.success("Welcome to Admin Panel.");

      navigate("/admin");
    } catch (error) {
      toast.error(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5 dark:bg-[#080a08]">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-[#101310] sm:p-9">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 text-gray-900">
            <Lock size={25} />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-600 dark:text-lime-300">
              LeadAxis
            </p>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Enter your password to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-7">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Admin Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 pr-12 text-sm outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-300/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-lime-300 font-semibold text-gray-900 transition hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Checking..."
              ) : (
                <>
                  <LogIn size={18} />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Authorized access only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
