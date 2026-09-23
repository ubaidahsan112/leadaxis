import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import ScrollReveal from "../Components/ScrollReveal";

const BookingPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    industry: "",
    website: "",
    phone: "",
    location: "",
    service: "",
    monthlyBudget: "",
    monthlyLeads: "",
    goals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        toast.error("Please enter your name.");
        return;
      }

      if (!formData.email.trim()) {
        toast.error("Please enter your email.");
        return;
      }

      // Fixed email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email.trim())) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }

    if (step === 2) {
      if (!formData.businessName.trim()) {
        toast.error("Please enter your business name.");
        return;
      }

      if (!formData.industry) {
        toast.error("Please select your industry.");
        return;
      }

      if (!formData.location.trim()) {
        toast.error("Please enter your target location.");
        return;
      }
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service) {
      toast.error("Please select the service you need.");
      return;
    }

    if (!formData.goals.trim()) {
      toast.error("Please tell us about your growth goals.");
      return;
    }

    setSubmitting(true);

    try {
      /*
        IMPORTANT:
        Backend route is:
        POST /api/bookings

        NOT:
        /api/send-booking
      */

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          businessName: formData.businessName.trim(),
          industry: formData.industry,
          website: formData.website.trim(),
          phone: formData.phone.trim(),
          location: formData.location.trim(),
          service: formData.service,
          monthlyBudget: formData.monthlyBudget,
          monthlyLeads: formData.monthlyLeads.trim(),
          goals: formData.goals.trim(),
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
          data?.message || "Unable to submit your consultation request."
        );
      }

      toast.success("Your consultation request has been sent!", {
        duration: 5000,
      });

      // Reset form after successful database submission
      setFormData({
        name: "",
        email: "",
        businessName: "",
        industry: "",
        website: "",
        phone: "",
        location: "",
        service: "",
        monthlyBudget: "",
        monthlyLeads: "",
        goals: "",
      });

      setStep(1);

      // Return to homepage after successful submission
      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (error) {
      console.error("Booking submission error:", error);

      toast.error(
        error?.message ||
          "We couldn't send your request. Please try again or contact us on WhatsApp.",
        {
          duration: 5000,
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: "Contact Info",
    },
    {
      number: 2,
      title: "Business Details",
    },
    {
      number: 3,
      title: "Growth Goals",
    },
  ];

  return (
    <div className="page-transition min-h-screen bg-white text-gray-900 dark:bg-[#080a09] dark:text-white">
      <div className="flex min-h-screen">
        {/* LEFT PANEL */}
        <aside className="relative hidden w-[40%] overflow-hidden bg-[#101310] lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(190,242,100,0.12),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(190,242,100,0.08),transparent_30%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <div>
              <button
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

              {/* Benefits */}
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

            {/* Bottom */}
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

        {/* RIGHT PANEL */}
        <main className="flex min-h-screen w-full flex-col lg:w-[60%]">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5 dark:border-white/10 lg:hidden">
            <button
              onClick={() => navigate("/")}
              className="text-xl font-black"
            >
              Lead<span className="text-lime-500">Axis</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft size={17} />
              Back
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8 sm:px-8 md:px-12 lg:px-16 lg:py-12 xl:px-20">
            {/* Desktop Back */}
            <button
              onClick={() => navigate("/")}
              className="mb-12 hidden w-fit items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:hover:text-white lg:flex"
            >
              <ArrowLeft size={17} />
              Back to homepage
            </button>

            {/* Progress */}
            <div className="mb-12">
              <div className="flex items-center">
                {steps.map((item, index) => (
                  <div
                    key={item.number}
                    className="flex flex-1 items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
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

            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex-1">
              {/* STEP 1 */}
              {step === 1 && (
                <ScrollReveal direction="up">
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-500">
                      Let's begin
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      How can we reach you?
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-gray-500 dark:text-gray-400">
                      Start with your basic contact information. We'll use
                      this to send your growth consultation details.
                    </p>

                    <div className="mt-10 space-y-6">
                      {/* Name */}
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
                            placeholder="Ubaid Ahsan"
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-12 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Email Address
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
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-12 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                          />
                        </div>
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
                      Business Details
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      Tell us about your business.
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-gray-500 dark:text-gray-400">
                      These details help us understand your market and
                      identify opportunities in your target location.
                    </p>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                      {/* Business */}
                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-sm font-semibold">
                          Business / Company Name
                        </label>

                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          placeholder="Summit Plumbing & Drain"
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                        />
                      </div>

                      {/* Industry */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Industry
                        </label>

                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                        >
                          <option value="">Select industry</option>
                          <option value="Plumbing">Plumbing</option>
                          <option value="HVAC">HVAC</option>
                          <option value="Roofing">Roofing</option>
                          <option value="Home Remodeling">
                            Home Remodeling
                          </option>
                          <option value="Flooring">Flooring</option>
                          <option value="Solar">Solar</option>
                          <option value="Pest Control">Pest Control</option>
                          <option value="Windows & Doors">
                            Windows & Doors
                          </option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Legal">Legal</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Target Location
                        </label>

                        <div className="relative">
                          <MapPin
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Dallas, TX"
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-11 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                          />
                        </div>
                      </div>

                      {/* Website */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Website
                          <span className="ml-1 font-normal text-gray-400">
                            (Optional)
                          </span>
                        </label>

                        <div className="relative">
                          <Globe
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />

                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://yourwebsite.com"
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-11 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Phone
                          <span className="ml-1 font-normal text-gray-400">
                            (Optional)
                          </span>
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
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-11 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
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
                      Growth Goals
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      What are you looking to achieve?
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-gray-500 dark:text-gray-400">
                      Give us a little context and we'll use it to prepare a
                      more relevant growth strategy.
                    </p>

                    <div className="mt-10 space-y-6">
                      {/* Service */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          What service are you interested in?
                        </label>

                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                        >
                          <option value="">Select a service</option>
                          <option value="Lead Generation">
                            Lead Generation
                          </option>
                          <option value="Pay Per Call">
                            Pay Per Call
                          </option>
                          <option value="Local SEO">Local SEO</option>
                          <option value="Paid Advertising">
                            Paid Advertising
                          </option>
                          <option value="Website Development">
                            Website Development
                          </option>
                          <option value="Mobile App Development">
                            Mobile App Development
                          </option>
                          <option value="Full Growth Strategy">
                            Full Growth Strategy
                          </option>
                        </select>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Approximate Monthly Budget
                        </label>

                        <select
                          name="monthlyBudget"
                          value={formData.monthlyBudget}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                        >
                          <option value="">Select budget</option>
                          <option value="Under $1,000">
                            Under $1,000
                          </option>
                          <option value="$1,000 - $2,500">
                            $1,000 - $2,500
                          </option>
                          <option value="$2,500 - $5,000">
                            $2,500 - $5,000
                          </option>
                          <option value="$5,000 - $10,000">
                            $5,000 - $10,000
                          </option>
                          <option value="$10,000+">$10,000+</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </div>

                      {/* Leads */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Current / Desired Monthly Leads
                        </label>

                        <input
                          type="text"
                          name="monthlyLeads"
                          value={formData.monthlyLeads}
                          onChange={handleChange}
                          placeholder="e.g. 50 qualified leads"
                          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                        />
                      </div>

                      {/* Goals */}
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Tell us about your goals
                        </label>

                        <textarea
                          name="goals"
                          value={formData.goals}
                          onChange={handleChange}
                          rows={5}
                          placeholder="What are you trying to improve? More calls, more booked jobs, better website, local visibility, lower acquisition costs..."
                          className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-300/10 dark:border-white/10 dark:bg-white/5"
                        />
                      </div>
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
                    className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <ArrowLeft size={17} />
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <ArrowLeft size={17} />
                    Home
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group flex items-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-lime-200 hover:shadow-lg"
                  >
                    Continue
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex items-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-lime-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-900 border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <CheckCircle2 size={17} />
                      </>
                    )}
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