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
import LoadingScreen from "../Components/LoadingScreen";

const API_URL = import.meta.env.VITE_API_URL || "";

const REVENUE_OPTIONS = [
  "$0 - $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M+",
];

const LEAD_OPTIONS = [
  "10 - 25 leads/month",
  "25 - 50 leads/month",
  "50 - 100 leads/month",
  "100 - 250 leads/month",
  "250+ leads/month",
];

const BookingPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    name: "",
    email: "",
    phone: "",
    revenue: "",
    leads: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const [consultationDate, setConsultationDate] = useState("");
  const [consultationTime, setConsultationTime] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  const consultationDates = useMemo(() => {
    const dates = [];

    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      dates.push({
        value: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      });
    }

    return dates;
  }, []);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.businessName.trim()) {
        toast.error("Please enter your business name.");
        return false;
      }

      if (!formData.businessType.trim()) {
        toast.error("Please enter your business type.");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.name.trim()) {
        toast.error("Please enter your name.");
        return false;
      }

      if (!formData.email.trim()) {
        toast.error("Please enter your email.");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email.");
        return false;
      }

      if (!formData.phone.trim()) {
        toast.error("Please enter your phone number.");
        return false;
      }
    }

    if (step === 3) {
      if (!formData.revenue) {
        toast.error("Please select your annual revenue.");
        return false;
      }

      if (!formData.leads) {
        toast.error("Please select your current lead volume.");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      startAssessment();
    }
  };

  const previousStep = () => {
    if (step > 1 && !scanning && !submitting) {
      setStep((prev) => prev - 1);
    }
  };

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

  const handleConfirmConsultation = async () => {
    if (!consultationDate) {
      toast.error("Please select a consultation date.");
      return;
    }

    if (!consultationTime) {
      toast.error("Please select a consultation time.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        revenue: formData.revenue,
        leads: formData.leads,
        consultationDate,
        consultationTime,
      };

      if (API_URL) {
        const response = await fetch(`${API_URL}/api/bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Booking request failed.");
        }
      }

      setConfirmed(true);

      toast.success("Consultation confirmed!");

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
      businessType: "",
      name: "",
      email: "",
      phone: "",
      revenue: "",
      leads: "",
    });
  };

  /*
   * SAME SIDEBAR USED THROUGHOUT BOOKING / ASSESSMENT
   */
  const BookingSidebar = () => {
    return (
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
                <span className="text-lime-300"> growth roadmap.</span>
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
              <p className="text-2xl font-bold text-white">2.4M+</p>
              <p className="text-xs text-gray-500">
                Service calls processed
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">10K+</p>
              <p className="text-xs text-gray-500">
                Business opportunities
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  };

  /*
   * CONFIRMED SCREEN
   */
  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#0b0d0b] text-white">
        <div className="flex min-h-screen items-center justify-center px-6">
          <ScrollReveal>
            <div className="w-full max-w-xl text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-lime-300/10">
                <CheckCircle2
                  size={52}
                  className="text-lime-300"
                />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">
                Consultation Confirmed
              </p>

              <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                You're all set.
              </h1>

              <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-gray-400">
                Your growth consultation has been scheduled successfully.
                We'll use the information you provided to prepare for the
                conversation.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Consultation
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      {consultationDate} · {consultationTime}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-sm text-gray-500">
                Redirecting you to the homepage...
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  /*
   * ASSESSMENT SCANNING SCREEN
   */
  if (scanning) {
    return (
      <div className="flex min-h-screen bg-[#0b0d0b] text-white">
        <BookingSidebar />

        <main className="flex min-h-screen w-full flex-1 items-center justify-center px-6 py-12 lg:w-[60%] lg:px-12">
          <ScrollReveal>
            <div className="w-full max-w-xl text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-lime-300/10">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-lime-300/30">
                  <Loader2
                    size={32}
                    className="animate-spin text-lime-300"
                  />
                </div>
              </div>

              {/* EXISTING 4 DOT LOADER */}
              <div className="mt-8 flex justify-center">
                <LoadingScreen staticLoader />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">
                Preparing Your Assessment
              </p>

              <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                Scanning your business details
              </h1>

              <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-gray-400">
                We're analyzing your business information and identifying
                opportunities that can help improve your lead generation.
              </p>

              <div className="mt-10">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    Assessment progress
                  </span>

                  <span className="font-semibold text-lime-300">
                    {scanProgress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-lime-300 transition-all duration-150"
                    style={{
                      width: `${scanProgress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Sparkles
                  size={16}
                  className="text-lime-300"
                />

                <span>
                  Finding your highest-value growth opportunities...
                </span>
              </div>
            </div>
          </ScrollReveal>
        </main>
      </div>
    );
  }

  /*
   * ASSESSMENT COMPLETE SCREEN
   */
  if (assessmentComplete) {
    return (
      <div className="flex min-h-screen bg-[#0b0d0b] text-white">
        <BookingSidebar />

        <main className="min-h-screen w-full flex-1 overflow-y-auto lg:w-[60%]">
          <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-12">
            <ScrollReveal>
              <div className="w-full max-w-2xl">
                <div className="text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-lime-300/10">
                    <CheckCircle2
                      size={52}
                      className="text-lime-300"
                    />
                  </div>

                  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">
                    Assessment Complete
                  </p>

                  <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                    Your growth assessment is ready.
                  </h1>

                  <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-400">
                    We've analyzed the information you provided. Schedule
                    your consultation below and we'll walk you through the
                    opportunities identified for your business.
                  </p>
                </div>

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <CalendarDays
                      size={20}
                      className="text-lime-300"
                    />

                    <div>
                      <h2 className="font-semibold text-white">
                        Select consultation date
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Choose a convenient date for your consultation.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {consultationDates.map((item) => {
                      const selected =
                        consultationDate === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() =>
                            setConsultationDate(item.value)
                          }
                          className={`rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-lime-300 bg-lime-300/10"
                              : "border-white/10 bg-white/[0.02] hover:border-lime-300/40"
                          }`}
                        >
                          <p
                            className={`text-xs font-semibold uppercase ${
                              selected
                                ? "text-lime-300"
                                : "text-gray-500"
                            }`}
                          >
                            {item.day}
                          </p>

                          <p className="mt-2 font-semibold text-white">
                            {item.date}
                          </p>

                          {selected && (
                            <div className="mt-3 flex items-center gap-1 text-xs text-lime-300">
                              <Check size={14} />
                              Selected
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center gap-3">
                      <Clock3
                        size={20}
                        className="text-lime-300"
                      />

                      <div>
                        <h2 className="font-semibold text-white">
                          Select consultation time
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          Choose a suitable time.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        "10:00 AM",
                        "12:00 PM",
                        "2:00 PM",
                        "4:00 PM",
                      ].map((time) => {
                        const selected =
                          consultationTime === time;

                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() =>
                              setConsultationTime(time)
                            }
                            className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              selected
                                ? "border-lime-300 bg-lime-300/10 text-lime-300"
                                : "border-white/10 text-gray-400 hover:border-lime-300/40 hover:text-white"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setAssessmentComplete(false);
                        setStep(3);
                      }}
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold text-gray-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ArrowLeft size={17} />
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmConsultation}
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-300 px-6 py-3 font-bold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />
                          Confirming...
                        </>
                      ) : (
                        <>
                          Confirm Consultation
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </main>
      </div>
    );
  }

  /*
   * MAIN BOOKING FORM
   */
  return (
    <div className="flex min-h-screen bg-[#0b0d0b] text-white">
      <BookingSidebar />

      <main className="flex min-h-screen w-full flex-1 flex-col lg:w-[60%]">
        <div className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
          <ScrollReveal>
            <div className="w-full max-w-2xl">
              {/* TOP */}
              <div className="mb-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">
                      Growth Assessment
                    </p>

                    <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                      Let's understand your business.
                    </h2>
                  </div>

                  <div className="text-sm text-gray-500">
                    Step{" "}
                    <span className="font-semibold text-white">
                      {step}
                    </span>{" "}
                    of 3
                  </div>
                </div>

                {/* STEP PROGRESS */}
                <div className="mt-7 flex gap-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className={`h-1.5 flex-1 rounded-full transition ${
                        item <= step
                          ? "bg-lime-300"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Business name
                    </label>

                    <div className="relative">
                      <Building2
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />

                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) =>
                          updateField(
                            "businessName",
                            e.target.value
                          )
                        }
                        placeholder="Your business name"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-lime-300/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Business type
                    </label>

                    <div className="relative">
                      <BriefcaseBusiness
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />

                      <input
                        type="text"
                        value={formData.businessType}
                        onChange={(e) =>
                          updateField(
                            "businessType",
                            e.target.value
                          )
                        }
                        placeholder="e.g. HVAC, Roofing, Plumbing"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-lime-300/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Your name
                    </label>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        updateField("name", e.target.value)
                      }
                      placeholder="Full name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-lime-300/50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          updateField(
                            "email",
                            e.target.value
                          )
                        }
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-lime-300/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Phone number
                    </label>

                    <div className="relative">
                      <Phone
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />

                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          updateField(
                            "phone",
                            e.target.value
                          )
                        }
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-lime-300/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Annual revenue
                    </label>

                    <div className="relative">
                      <select
                        value={formData.revenue}
                        onChange={(e) =>
                          updateField(
                            "revenue",
                            e.target.value
                          )
                        }
                        className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition focus:border-lime-300/50"
                      >
                        <option
                          value=""
                          className="bg-[#101310]"
                        >
                          Select annual revenue
                        </option>

                        {REVENUE_OPTIONS.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#101310]"
                          >
                            {option}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={19}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Current monthly leads
                    </label>

                    <div className="relative">
                      <select
                        value={formData.leads}
                        onChange={(e) =>
                          updateField(
                            "leads",
                            e.target.value
                          )
                        }
                        className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition focus:border-lime-300/50"
                      >
                        <option
                          value=""
                          className="bg-[#101310]"
                        >
                          Select monthly leads
                        </option>

                        {LEAD_OPTIONS.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#101310]"
                          >
                            {option}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={19}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NAVIGATION */}
              <div className="mt-10 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={previousStep}
                  disabled={step === 1 || submitting}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold text-gray-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft size={17} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-lime-300 px-6 py-3 font-bold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {step === 3 ? (
                    <>
                      Start Assessment
                      <ArrowRight size={18} />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              {/* RESET */}
              <button
                type="button"
                onClick={resetBooking}
                className="mx-auto mt-8 block text-xs text-gray-600 transition hover:text-gray-400"
              >
                Start over
              </button>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;