import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Mail,
  Phone,
  Target,
  TrendingUp,
  Users,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  Sparkles,
  Loader2,
  ChevronDown,
} from "lucide-react";

import toast from "react-hot-toast";
import ScrollReveal from "../Components/ScrollReveal";

const API_URL = import.meta.env.VITE_API_URL || "";

const TRADE_OPTIONS = [
  "Plumbing",
  "HVAC",
  "Roofing",
  "Electrical",
  "Moving",
  "Painting",
  "Pest Control",
  "Flooring",
  "Windows & Doors",
  "Home Remodeling",
  "Landscaping",
  "Solar",
  "Cleaning",
  "Garage Doors",
  "Water Damage",
  "Junk Removal",
  "Tree Service",
  "Concrete",
  "Fencing",
  "Pool Services",
  "Appliance Repair",
  "Locksmith",
  "Real Estate",
  "Legal Services",
  "Other",
];

const REVENUE_OPTIONS = [
  "Under $25k",
  "$25k - $50k",
  "$50k - $100k",
  "$100k+",
];

const LEAD_OPTIONS = [
  "Under 20",
  "20 - 50",
  "50 - 100",
  "100+",
];

const TIME_OPTIONS = [
  "9:00 AM",
  "10:00 AM",
  "1:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
];

const BookingPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const [consultationDate, setConsultationDate] = useState("");
  const [consultationTime, setConsultationTime] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Generate next 7 calendar dates
  |--------------------------------------------------------------------------
  */
  const consultationDates = useMemo(() => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);

      date.setHours(0, 0, 0, 0);
      date.setDate(today.getDate() + i);

      dates.push(date);
    }

    return dates;
  }, []);

  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    name: "",
    email: "",
    phone: "",
    monthlyRevenue: "",
    monthlyLeads: "",
  });

  /*
  |--------------------------------------------------------------------------
  | Automatically return home after successful confirmation
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!confirmed) return;

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [confirmed, navigate]);

  const formatDateValue = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDay = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);
  };

  const formatDateNumber = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
    }).format(date);
  };

  const formatMonth = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
  };

  /*
  |--------------------------------------------------------------------------
  | Form Change
  |--------------------------------------------------------------------------
  */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "monthlyRevenue") {
      setFormData((prev) => ({
        ...prev,
        monthlyRevenue: value,
        monthlyLeads: "",
      }));
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */
  const validateStep = () => {
    if (step === 1) {
      if (!formData.businessName.trim()) {
        toast.error("Please enter your business or contractor name.");
        return false;
      }

      if (!formData.industry) {
        toast.error("Please select your trade or industry.");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.name.trim()) {
        toast.error("Please enter your full name.");
        return false;
      }

      if (!formData.email.trim()) {
        toast.error("Please enter your business email.");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email.trim())) {
        toast.error("Please enter a valid business email.");
        return false;
      }

      if (!formData.phone.trim()) {
        toast.error("Please enter your phone number.");
        return false;
      }
    }

    if (step === 3) {
      if (!formData.monthlyRevenue) {
        toast.error("Please select your current monthly revenue.");
        return false;
      }

      if (!formData.monthlyLeads) {
        toast.error("Please select your target lead increase.");
        return false;
      }
    }

    return true;
  };

  /*
  |--------------------------------------------------------------------------
  | Next Step
  |--------------------------------------------------------------------------
  */
  const nextStep = () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Previous Step
  |--------------------------------------------------------------------------
  */
  const previousStep = () => {
    if (scanning || submitting) return;

    setStep((prev) => Math.max(prev - 1, 1));
  };

  /*
  |--------------------------------------------------------------------------
  | Assessment Animation
  |--------------------------------------------------------------------------
  */
  const startAssessment = () => {
    if (!validateStep()) return;

    setScanning(true);
    setScanProgress(0);

    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 7) + 3;

      if (progress >= 100) {
        progress = 100;

        clearInterval(interval);

        setScanProgress(100);

        setTimeout(() => {
          setScanning(false);
          setAssessmentComplete(true);
        }, 700);
      } else {
        setScanProgress(progress);
      }
    }, 100);
  };

  /*
  |--------------------------------------------------------------------------
  | Confirm Consultation
  |--------------------------------------------------------------------------
  */
  const handleConfirmConsultation = async () => {
    if (!consultationDate) {
      toast.error("Please select a consultation date.");
      return;
    }

    if (!consultationTime) {
      toast.error("Please select a consultation time.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),

          businessName: formData.businessName.trim(),
          industry: formData.industry,

          phone: formData.phone.trim(),

          monthlyRevenue: formData.monthlyRevenue,
          monthlyLeads: formData.monthlyLeads,

          website: "",
          location: "",

          service: "Growth Consultation",

          monthlyBudget: formData.monthlyRevenue,

          goals: `Business growth assessment. Current estimated monthly revenue: ${formData.monthlyRevenue}. Target lead increase per month: ${formData.monthlyLeads}. Consultation requested for ${consultationDate} at ${consultationTime}.`,

          consultationDate,
          consultationTime,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to confirm your consultation."
        );
      }

      /*
      |--------------------------------------------------------------------------
      | Confirmation Success
      |--------------------------------------------------------------------------
      */
      setConfirmed(true);

      toast.success("Consultation confirmed!", {
        duration: 5000,
      });
    } catch (error) {
      console.error("Booking submission error:", error);

      toast.error(
        error?.message ||
          "We couldn't confirm your consultation. Please try again.",
        {
          duration: 5000,
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Reset Booking
  |--------------------------------------------------------------------------
  */
  const resetBooking = () => {
    setStep(1);
    setSubmitting(false);
    setScanning(false);
    setScanProgress(0);
    setAssessmentComplete(false);
    setConsultationDate("");
    setConsultationTime("");
    setConfirmed(false);

    setFormData({
      businessName: "",
      industry: "",
      name: "",
      email: "",
      phone: "",
      monthlyRevenue: "",
      monthlyLeads: "",
    });
  };

  const steps = [
    {
      number: 1,
      title: "Business Details",
    },
    {
      number: 2,
      title: "Contact Info",
    },
    {
      number: 3,
      title: "Growth Goals",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | FINAL CONFIRMATION SCREEN
  |--------------------------------------------------------------------------
  */
  if (confirmed) {
    return (
      <div className="page-transition min-h-screen bg-white text-gray-900 dark:bg-[#080a09] dark:text-white">
        <div className="flex min-h-screen items-center justify-center px-5 py-12">
          <div className="w-full max-w-2xl text-center">
            <ScrollReveal direction="up">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-lime-300/15">
                <CheckCircle2 size={52} className="text-lime-400" />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-lime-500">
                Consultation Confirmed
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                You're all set.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500 dark:text-gray-400">
                Your growth consultation has been successfully scheduled.
                We have your business information and consultation preferences.
              </p>

              <div className="mx-auto mt-8 max-w-md rounded-3xl border border-gray-200 bg-gray-50 p-6 text-left dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-400">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Consultation
                    </p>

                    <p className="mt-1 font-semibold">
                      {consultationDate}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-400">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Time
                    </p>

                    <p className="mt-1 font-semibold">
                      {consultationTime}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-sm text-gray-400">
                Redirecting you to the homepage...
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 text-sm font-bold text-gray-900 transition duration-200 hover:bg-lime-200 hover:shadow-lg active:scale-[0.98]"
              >
                Back to Homepage
                <ArrowRight size={17} />
              </button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ASSESSMENT SCANNING SCREEN
  |--------------------------------------------------------------------------
  */
  if (scanning) {
    return (
      <div className="page-transition min-h-screen bg-white text-gray-900 dark:bg-[#080a09] dark:text-white">
        <div className="flex min-h-screen items-center justify-center px-5 py-12">
          <div className="w-full max-w-xl text-center">
            <ScrollReveal direction="up">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-lime-300/10">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-lime-300/30">
                  <Loader2
                    size={32}
                    className="animate-spin text-lime-300"
                  />
                </div>
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-lime-500">
                Preparing Your Assessment
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Scanning your business details
              </h1>

              <p className="mx-auto mt-4 max-w-lg leading-7 text-gray-500 dark:text-gray-400">
                We're analyzing your business profile, trade, revenue
                capacity and lead growth target.
              </p>

              <div className="mt-10">
                <div className="mb-3 flex items-center justify-between text-sm font-semibold">
                  <span>Assessment progress</span>

                  <span className="text-lime-500">
                    {scanProgress}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-lime-300 transition-[width] duration-100 ease-out will-change-[width]"
                    style={{
                      width: `${scanProgress}%`,
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ASSESSMENT COMPLETE → CONSULTATION
  |--------------------------------------------------------------------------
  */
  if (assessmentComplete) {
    return (
      <div className="page-transition min-h-screen bg-white text-gray-900 dark:bg-[#080a09] dark:text-white">
        <div className="flex min-h-screen items-center justify-center px-5 py-12">
          <div className="w-full max-w-4xl">
            <ScrollReveal direction="up">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-300/15">
                  <CheckCircle2
                    size={42}
                    className="text-lime-400"
                  />
                </div>

                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-lime-500">
                  Assessment Complete
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Your growth assessment is ready.
                </h1>

                <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-500 dark:text-gray-400">
                  Choose a convenient date and time for your consultation with
                  the LeadAxis team.
                </p>
              </div>

              <div className="mt-12">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/10 text-lime-400">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Select Consultation Date
                    </h2>

                    <p className="text-sm text-gray-500">
                      Choose a date from the next 7 days.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-7">
                  {consultationDates.map((date) => {
                    const value = formatDateValue(date);
                    const selected = consultationDate === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setConsultationDate(value);
                          setConsultationTime("");
                        }}
                        className={`group rounded-2xl border p-3 text-center transition duration-200 will-change-transform hover:-translate-y-0.5 ${
                          selected
                            ? "border-lime-300 bg-lime-300 text-gray-900 shadow-lg shadow-lime-300/10"
                            : "border-gray-200 bg-gray-50 hover:border-lime-300 dark:border-white/10 dark:bg-white/5"
                        }`}
                      >
                        <p
                          className={`text-xs font-semibold ${
                            selected
                              ? "text-gray-700"
                              : "text-gray-400"
                          }`}
                        >
                          {formatDay(date)}
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          {formatDateNumber(date)}
                        </p>

                        <p
                          className={`mt-1 text-xs ${
                            selected
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          {formatMonth(date)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {consultationDate && (
                <div className="mt-10">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/10 text-lime-400">
                      <Clock3 size={19} />
                    </div>

                    <div>
                      <h2 className="font-semibold">
                        Select Consultation Time
                      </h2>

                      <p className="text-sm text-gray-500">
                        Choose your preferred time.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {TIME_OPTIONS.map((time) => {
                      const selected = consultationTime === time;

                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setConsultationTime(time)}
                          className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-sm font-semibold transition duration-200 will-change-transform hover:-translate-y-0.5 ${
                            selected
                              ? "border-lime-300 bg-lime-300 text-gray-900 shadow-lg shadow-lime-300/10"
                              : "border-gray-200 bg-gray-50 hover:border-lime-300 dark:border-white/10 dark:bg-white/5"
                          }`}
                        >
                          <Clock3 size={16} />
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setAssessmentComplete(false);
                    setConsultationDate("");
                    setConsultationTime("");
                  }}
                  className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <ArrowLeft size={17} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleConfirmConsultation}
                  disabled={
                    !consultationDate ||
                    !consultationTime ||
                    submitting
                  }
                  className="group flex items-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 text-sm font-bold text-gray-900 transition duration-200 hover:bg-lime-200 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Confirming...
                    </>
                  ) : (
                    <>
                      Confirm Consultation
                      <CheckCircle2 size={17} />
                    </>
                  )}
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | MAIN BOOKING FORM
  |--------------------------------------------------------------------------
  */
  return (
    <div className="page-transition min-h-screen bg-white text-gray-900 dark:bg-[#080a09] dark:text-white">
      <div className="flex min-h-screen">

        {/* LEFT PANEL */}
        <aside className="relative hidden w-[40%] overflow-hidden bg-[#101310] lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(190,242,100,0.12),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(190,242,100,0.08),transparent_30%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <div>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-2xl font-black tracking-tight text-white"
              >
                Lead<span className="text-lime-300">Axis</span>
              </button>

              <div className="mt-20 max-w-lg">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">
                  Exclusive Growth Consultation
                </p>

                <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                  Unlock your custom
                  <span className="text-lime-300">
                    {" "}
                    growth roadmap.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
                  Tell us where your business is today. We'll identify the
                  opportunities, channels and strategies that can help you
                  generate more qualified leads.
                </p>
              </div>

              <div className="mt-12 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                    <Target size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Competitor Opportunity
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Identify where competitors are capturing demand.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                    <TrendingUp size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Growth Playbook
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Build a strategy around your actual business goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                    <Users size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Qualified Leads
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Focus on generating customers, not meaningless traffic.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-bold text-white">
                  2.4M+
                </p>

                <p className="text-xs text-gray-500">
                  Service calls processed
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  10K+
                </p>

                <p className="text-xs text-gray-500">
                  Business opportunities
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <main className="flex min-h-screen w-full flex-col lg:w-[60%]">

          {/* MOBILE HEADER */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5 dark:border-white/10 lg:hidden">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-xl font-black"
            >
              Lead<span className="text-lime-500">Axis</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft size={17} />
              Back
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 sm:px-8 md:px-12 lg:px-16 lg:py-12 xl:px-20">

            {/* DESKTOP BACK */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mb-12 hidden w-fit items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:hover:text-white lg:flex"
            >
              <ArrowLeft size={17} />
              Back to homepage
            </button>

            {/* PROGRESS */}
            <div className="mb-12">
              <div className="flex items-center">
                {steps.map((item, index) => (
                  <div
                    key={item.number}
                    className="flex flex-1 items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 will-change-transform ${
                          step >= item.number
                            ? "bg-lime-300 text-gray-900"
                            : "bg-gray-100 text-gray-400 dark:bg-white/10"
                        }`}
                      >
                        {step > item.number ? (
                          <Check size={17} />
                        ) : (
                          item.number
                        )}
                      </div>

                      <span
                        className={`hidden text-sm font-semibold sm:block ${
                          step >= item.number
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-400"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        className={`mx-4 h-px flex-1 transition-all duration-500 ${
                          step > item.number
                            ? "bg-lime-300"
                            : "bg-gray-200 dark:bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (step === 3) {
                  startAssessment();
                }
              }}
              className="flex-1"
            >

              {/* STEP 1 */}
              {step === 1 && (
                <ScrollReveal direction="up">
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-500">
                      Step 1
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      Tell us about your business.
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-gray-500 dark:text-gray-400">
                      Start with your business or contractor information so
                      we can understand what you do.
                    </p>

                    <div className="mt-10 space-y-6">

                      {/* BUSINESS NAME */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Business / Contractor Name
                        </label>

                        <div className="relative">
                          <Building2
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Your business name"
                            autoComplete="organization"
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-12 py-4 outline-none transition duration-200 focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                          />
                        </div>
                      </div>

                      {/* MODERN TRADE SELECT */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Select Trade / Industry
                        </label>

                        <div className="relative">
                          <BriefcaseBusiness
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                          />

                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="
                              w-full
                              cursor-pointer
                              appearance-none
                              rounded-2xl
                              border
                              border-gray-200
                              bg-gray-50
                              px-12
                              py-4
                              pr-12
                              text-sm
                              font-medium
                              text-gray-900
                              outline-none
                              transition-all
                              duration-200
                              hover:border-gray-300
                              focus:border-lime-400
                              focus:ring-4
                              focus:ring-lime-300/10
                              dark:border-white/10
                              dark:bg-[#111512]
                              dark:text-white
                              dark:hover:border-white/20
                            "
                          >
                            <option
                              value=""
                              className="bg-white text-gray-900 dark:bg-[#111512] dark:text-gray-400"
                            >
                              Select trade / industry
                            </option>

                            {TRADE_OPTIONS.map((trade) => (
                              <option
                                key={trade}
                                value={trade}
                                className="bg-white text-gray-900 dark:bg-[#111512] dark:text-white"
                              >
                                {trade}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={18}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform"
                          />
                        </div>

                        <p className="mt-2 text-xs text-gray-400">
                          Choose the service category that best matches your
                          business.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <ScrollReveal direction="up">
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-500">
                      Step 2
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      How can we reach you?
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-gray-500 dark:text-gray-400">
                      Provide your contact details so our team can follow up
                      about your consultation.
                    </p>

                    <div className="mt-10 space-y-6">

                      {/* NAME */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Full Name
                        </label>

                        <div className="relative">
                          <Users
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            autoComplete="name"
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-12 py-4 outline-none transition duration-200 focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                          />
                        </div>
                      </div>

                      {/* EMAIL */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Business Email
                        </label>

                        <div className="relative">
                          <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            autoComplete="email"
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-12 py-4 outline-none transition duration-200 focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                          />
                        </div>
                      </div>

                      {/* PHONE */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Phone Number
                        </label>

                        <div className="relative">
                          <Phone
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 555 000 0000"
                            autoComplete="tel"
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-12 py-4 outline-none transition duration-200 focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <ScrollReveal direction="up">
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-500">
                      Step 3
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      What are your growth goals?
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-gray-500 dark:text-gray-400">
                      We tailor your growth assessment based on your current
                      revenue and operational volume capability.
                    </p>

                    <div className="mt-10 space-y-8">

                      {/* REVENUE */}
                      <div>
                        <label className="mb-3 block text-sm font-semibold">
                          Current Estimated Monthly Revenue
                        </label>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {REVENUE_OPTIONS.map((option) => {
                            const selected =
                              formData.monthlyRevenue === option;

                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    monthlyRevenue: option,
                                    monthlyLeads: "",
                                  }))
                                }
                                className={`rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition duration-200 will-change-transform hover:-translate-y-0.5 ${
                                  selected
                                    ? "border-lime-300 bg-lime-300 text-gray-900 shadow-lg shadow-lime-300/10"
                                    : "border-gray-200 bg-gray-50 hover:border-lime-300 dark:border-white/10 dark:bg-white/5"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* LEADS */}
                      {formData.monthlyRevenue && (
                        <div className="animate-[fadeIn_300ms_ease-out]">
                          <label className="mb-3 block text-sm font-semibold">
                            Target Leads Increase Per Month
                          </label>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {LEAD_OPTIONS.map((option) => {
                              const selected =
                                formData.monthlyLeads === option;

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      monthlyLeads: option,
                                    }))
                                  }
                                  className={`rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition duration-200 will-change-transform hover:-translate-y-0.5 ${
                                    selected
                                      ? "border-lime-300 bg-lime-300 text-gray-900 shadow-lg shadow-lime-300/10"
                                      : "border-gray-200 bg-gray-50 hover:border-lime-300 dark:border-white/10 dark:bg-white/5"
                                  }`}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* SUMMARY */}
                      {formData.monthlyRevenue &&
                        formData.monthlyLeads && (
                          <div className="rounded-2xl border border-lime-300/20 bg-lime-300/5 p-5">
                            <div className="flex gap-4">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300/10 text-lime-400">
                                <Sparkles size={18} />
                              </div>

                              <div>
                                <p className="font-semibold">
                                  Your assessment is ready to generate.
                                </p>

                                <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                  We'll scan the information you've provided
                                  and prepare the next step for your
                                  consultation.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* BUTTONS */}
              <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-white/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={scanning || submitting}
                    className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-gray-500 transition duration-200 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <ArrowLeft size={17} />
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-gray-500 transition duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <ArrowLeft size={17} />
                    Home
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group flex items-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 text-sm font-bold text-gray-900 transition duration-200 hover:bg-lime-200 hover:shadow-lg active:scale-[0.98]"
                  >
                    Continue

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={
                      !formData.monthlyRevenue ||
                      !formData.monthlyLeads
                    }
                    className="group flex items-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 text-sm font-bold text-gray-900 transition duration-200 hover:bg-lime-200 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Generate Assessment

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingPage;
