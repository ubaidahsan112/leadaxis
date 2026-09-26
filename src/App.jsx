import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ServiceDetail from "./Pages/ServiceDetail";
import ProjectDetail from "./Pages/ProjectDetail";
import Navbar from "./Components/Navbar";
import AIChatbot from "./Components/AIChatbot";
import ProtectedRoute from "./Components/ProtectedRoute";
import LoadingScreen from "./Components/LoadingScreen";

import Home from "./Pages/Home";
import BookingPage from "./Pages/BookingPage";

import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminLeads from "./Pages/Admin/AdminLeads";
import AdminReview from "./Pages/Admin/AdminReview";
import AdminSetting from "./Pages/Admin/AdminSetting";
import AdminLeadDetail from "./Pages/Admin/AdminLeadDetail";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* =========================
          LOADING SCREEN
      ========================== */}

      {loading && (
        <LoadingScreen
          onComplete={() => setLoading(false)}
        />
      )}

      {/* =========================
          TOASTER
      ========================== */}

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "14px",
            padding: "14px 18px",
            fontSize: "14px",
          },
        }}
      />

      {/* =========================
          ROUTES
      ========================== */}

      <Routes>

        {/* =========================
            PUBLIC WEBSITE
        ========================== */}

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/" element={<Home />} />

<Route
  path="/service/:slug"
  element={<ServiceDetail />}
/>

<Route
  path="/project/:slug"
  element={<ProjectDetail />}
/>

        {/* =========================
            BOOKING
        ========================== */}

        <Route
          path="/booking"
          element={<BookingPage />}
        />

        {/* =========================
            ADMIN LOGIN
        ========================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =========================
            PROTECTED ADMIN ROUTES
        ========================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/leads"
            element={<AdminLeads />}
          />

          <Route
            path="/admin/leads/:id"
            element={<AdminLeadDetail />}
          />

          <Route
            path="/admin/reviews"
            element={<AdminReview />}
          />

          <Route
            path="/admin/settings"
            element={<AdminSetting />}
          />

        </Route>

        {/* =========================
            404 PAGE
        ========================== */}

        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#080a08]">
              <div className="text-center">

                <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                  404
                </h1>

                <p className="mt-3 text-gray-500 dark:text-gray-400">
                  Page not found
                </p>

                <a
                  href="/admin/login"
                  className="
                    mt-6
                    inline-block
                    rounded-xl
                    bg-lime-300
                    px-5
                    py-3
                    font-semibold
                    text-gray-900
                    transition
                    hover:bg-lime-400
                  "
                >
                  Admin Login
                </a>

              </div>
            </div>
          }
        />

      </Routes>

      {/* =========================
          AI CHATBOT
      ========================== */}

      <AIChatbot />
    </>
  );
};

export default App;
