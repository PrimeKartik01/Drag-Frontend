import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

import { getProjects } from "@/api/api";
import { submitEnquiry } from "./enquiry/services/enquiry-service";
import type { EnquiryFormData } from "./enquiry/types/enquiry.types";
import type { Project } from "@/types/project";
import { contactPageData } from "@/data/contact";

const initialFormData: EnquiryFormData = {
  name: "",
  email: "",
  mobile: "",
  project: "",
  city: "",
  budget: "",
};

const inputClassName =
  "h-10 w-full rounded-xl border border-gray-200 bg-white/70 px-5 text-sm text-[#111827] outline-none transition placeholder:text-[#111827] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";

function getBudgetForPrice(price: string | null): string {
  const value = Number(price);
  if (!Number.isFinite(value) || value <= 0) return "Flexible";
  if (value < 50_00_000) return "Under ₹50 Lakhs";
  if (value < 1_00_00_000) return "₹50 Lakhs - ₹1 Crore";
  if (value < 2_00_00_000) return "₹1 Crore - ₹2 Crore";
  if (value < 3_00_00_000) return "₹2 Crore - ₹3 Crore";
  if (value < 5_00_00_000) return "₹3 Crore - ₹5 Crore";
  return "₹5 Crore+";
}

interface EnquiryValidationErrors {
  email?: string[];
  mobile?: string[];
}

export default function ContactEnquiryForm() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<EnquiryValidationErrors>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { consultation } = contactPageData;

  useEffect(() => {
    getProjects()
      .then((response) => {
        setProjects(response.data ?? []);
      })
      .catch((projectError: unknown) => {
        console.error("Failed to load projects for enquiry form:", projectError);
        setProjectsError(
          "Projects could not be loaded. Please refresh the page and try again.",
        );
      })
      .finally(() => setProjectsLoading(false));
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const nextValue =
      name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((previous) => ({ ...previous, [name]: nextValue }));
    setFieldErrors((previous) => ({ ...previous, [name]: undefined }));
    setError("");
  };

  const handleProjectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const project = projects.find((item) => item.name === event.target.value);
    setFormData((previous) => ({
      ...previous,
      project: event.target.value,
      budget: project ? getBudgetForPrice(project.min_price) : "",
    }));
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    try {
      setLoading(true);
      const response = await submitEnquiry(formData);
      if (!response.success) {
        setError(
          response.message || "Unable to submit your enquiry. Please try again.",
        );
        return;
      }

      setSuccess(true);
    } catch (submitError: unknown) {
      console.error("Failed to submit contact enquiry:", submitError);
      if (
        axios.isAxiosError<{ errors?: EnquiryValidationErrors }>(submitError) &&
        submitError.response?.status === 422
      ) {
        setFieldErrors(submitError.response.data.errors ?? {});
        setError("Please check the highlighted fields and try again.");
      } else {
        setError("Unable to submit your enquiry. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FFFDF9]">
      <div className="relative mx-auto w-full max-w-[1700px] overflow-hidden bg-[#FFFDF9] md:min-h-[650px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-cover bg-center md:block"
          style={{ backgroundImage: `url("${consultation.backgroundImage}")` }}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col px-7 py-8 md:min-h-[650px] md:px-10 md:py-10  lg:py-16">
          <div className="max-w-xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C59B27]" />
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#C59B27] sm:text-sm">
                {consultation.eyebrow}
              </p>
            </div>

            <h2 className="text-[1.6rem] font-bold leading-[1.18] text-[#111827] md:text-5xl">
              {consultation.titleBeforeHighlight}
              <br className="hidden sm:inline" />
              <span className="text-[#B68D37]">
                {consultation.titleHighlight}
              </span>
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              At <strong className="font-semibold text-slate-900">SS Prime Infra</strong>,{" "}
              {consultation.description}
            </p>
          </div>

          <div className="mt-6 w-full max-w-xl rounded-2xl bg-white/70 p-6 shadow-2xl backdrop-blur-sm">
            <h3 className="text-center text-base font-bold text-[#B68D37] md:text-2xl">
              {success ? "Request Submitted!" : consultation.formTitle}
            </h3>

            {success ? (
              <div className="py-6 text-center text-sm leading-6 text-slate-700">
                {consultation.successMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-2 gap-2">
                <label className="sr-only" htmlFor="contact-enquiry-name">
                  Full Name
                </label>
                <input
                  id="contact-enquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  aria-label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />

                <label className="sr-only" htmlFor="contact-enquiry-email">
                  Email
                </label>
                <input
                  id="contact-enquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  aria-label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />
                {fieldErrors.email?.[0] && (
                  <p className="col-span-2 text-xs text-red-600" role="alert">
                    {fieldErrors.email[0]}
                  </p>
                )}

                <label className="sr-only" htmlFor="contact-enquiry-mobile">
                  Number
                </label>
                <input
                  id="contact-enquiry-mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Number"
                  aria-label="Number"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />

                <label className="sr-only" htmlFor="contact-enquiry-project">
                  Project
                </label>
                <select
                  id="contact-enquiry-project"
                  name="project"
                  aria-label="Project"
                  value={formData.project}
                  onChange={handleProjectChange}
                  className={inputClassName}
                  required
                  disabled={projectsLoading || Boolean(projectsError)}
                >
                  <option value="">
                    {projectsLoading ? "Loading projects..." : "Select Project"}
                  </option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>

                <label className="sr-only" htmlFor="contact-enquiry-city">
                  City
                </label>
                <select
                  id="contact-enquiry-city"
                  name="city"
                  aria-label="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                >
                  <option value="">Select City</option>
                  {consultation.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                <label className="sr-only" htmlFor="contact-enquiry-budget">
                  Budget
                </label>
                <select
                  id="contact-enquiry-budget"
                  name="budget"
                  aria-label="Budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                >
                  <option value="">Budget</option>
                  {consultation.budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>

                {projectsError && (
                  <p className="col-span-2 text-xs text-red-600" role="alert">
                    {projectsError}
                  </p>
                )}
                {error && (
                  <p className="col-span-2 text-xs text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || projectsLoading || Boolean(projectsError)}
                  className="h-10 w-max rounded-sm bg-[#B68D37] px-4 text-sm font-medium text-white transition duration-300 hover:bg-yellow-400 hover:shadow-lg hover:shadow-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : consultation.submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
