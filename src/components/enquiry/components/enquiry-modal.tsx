import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";
import { ChevronDown } from "@/assets/icons/icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { submitEnquiry } from "../services/enquiry-service";
import logo from "@/assets/img/logo.webp";

import type {
  EnquiryFormData,
  EnquiryModalProps,
} from "../types/enquiry.types";

const initialFormData: EnquiryFormData = {
  name: "",
  email: "",
  mobile: "",
  project: "",
  city: "",
  budget: "",
};

const getBudgetForPrice = (price: string | null | undefined): string => {
  const value = Number(price);
  if (!Number.isFinite(value) || value <= 0) return "";
  if (value < 50_00_000) return "Below 50 Lakh";
  if (value < 70_00_000) return "50-70 Lakh";
  if (value < 1_00_00_000) return "70 Lakh-1 Crore";
  if (value < 2_00_00_000) return "1-2 Crore";
  return "Above 2 Crore";
};

interface DropdownFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

function DropdownField({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
  className,
}: DropdownFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            aria-label={label}
            className={`h-auto w-full justify-between rounded-xl border border-gray-900 bg-white px-4 py-3 text-left text-base font-normal text-gray-900 shadow-none hover:bg-white ${className ?? ""}`}
          />
        }
      >
        <span className={!value ? "text-gray-400" : "text-gray-900"}>
          {value || placeholder}
        </span>
        <ChevronDown className="size-4 shrink-0 text-gray-500" />
      </PopoverTrigger>

      <PopoverContent
        className="w-[220px] p-1 bg-white ring-0"
        align="start"
        sideOffset={6}
      >
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface Props extends EnquiryModalProps {
  onSuccess?: () => void;
}

export default function EnquiryModal({
  open,
  onClose,
  projectId,
  projectName,
  projectMinPrice,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState<EnquiryFormData>(() => ({
    ...initialFormData,
    project: projectName ?? "",
    budget: getBudgetForPrice(projectMinPrice),
  }));
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({
    email: "",
    mobile: "",
  });
  const [success, setSuccess] = useState(false);

  const handleClose = useCallback(() => {
    if (loading) return;

    setFormData({
      ...initialFormData,
      project: projectName ?? "",
      budget: getBudgetForPrice(projectMinPrice),
    });
    setError("");
    setFieldErrors({ email: "", mobile: "" });
    setSuccess(false);
    onClose();
  }, [loading, onClose, projectName, projectMinPrice]);

  useEffect(() => {
    if (!open) return;

    setFormData({
      ...initialFormData,
      project: projectName ?? "",
      budget: getBudgetForPrice(projectMinPrice),
    });
  }, [open, projectName, projectMinPrice]);

  useEffect(() => {
    if (!open) return;

    getProjects()
      .then((response) => {
        if (response.success) setProjects(response.data);
      })
      .catch((projectError) => {
        console.error("Failed to load projects:", projectError);
      });
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow === "hidden" ? "" : previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, loading, handleClose]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const nextValue =
      name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleProjectChange = (value: string) => {
    const selectedProject = projects.find(
      (project) =>
        project.name === value ||
        (projectId != null &&
          value === projectName &&
          project.id === projectId),
    );

    setFormData((previous) => ({
      ...previous,
      project: value,
      budget: getBudgetForPrice(
        selectedProject?.min_price ??
          (value === projectName ? projectMinPrice : null),
      ),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({ email: "", mobile: "" });
    setError("");

    if (!formData.project) {
      setError("Please select a project.");
      return;
    }
    if (!formData.budget) {
      setError("Please select a budget.");
      return;
    }

    try {
      setLoading(true);

      const response = await submitEnquiry(formData);
      if (!response.success) {
        setError(
          response.message ||
            "Unable to submit your enquiry. Please try again.",
        );
        return;
      }

      setSuccess(true);
      onSuccess?.();
    } catch (submitError) {
      if (
        axios.isAxiosError(submitError) &&
        submitError.response?.status === 422
      ) {
        const errors = submitError.response.data.errors || {};

        setFieldErrors({
          email: errors.email?.[0] || "",
          mobile: errors.mobile?.[0] || "",
        });
      } else {
        setError("Unable to submit your enquiry. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const inputClassName =
    "w-full rounded-xl border border-gray-900 bg-white px-4 py-2 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#232833] focus:ring-2 focus:ring-[#232833]/15";
  const labelClassName = "mb-2 block text-sm font-semibold text-gray-900";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl "
      >
        <button
          type="button"
          onClick={handleClose}
          disabled={loading}
          aria-label="Close enquiry form"
          className="absolute right-4 top-3 text-3xl leading-none text-gray-500 transition hover:text-gray-900 disabled:opacity-50"
        >
          &times;
        </button>

        <div className=" bg-slate-900">
          <div className="flex items-center py-3">
            <img
              src={logo}
              alt="SS Prime Infra"
              className="h-18 object-cover drop-shadow-lg"
            />
            <div>
              <p className="text-xl md:text-2xl font-medium mt-3 text-white">
                # Build Trust Yes We Do
              </p>
              <p className="text-xs leading-6 text-gray-400 hidden md:block ">
                {success
                  ? "Your enquiry has been submitted successfully. Our team will contact you shortly."
                  : "Share your details and our team will get in touch with you."}
              </p>
            </div>
          </div>
        </div>

        {success ? (
          <div className="rounded-xl bg-green-50 p-6 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
              ✓
            </div>
            <h3 className="font-semibold text-green-800">Enquiry Submitted!</h3>
            <button
              type="button"
              onClick={handleClose}
              className="mt-5 w-full rounded-xl bg-[#232833] px-5 py-3 font-semibold text-white transition hover:bg-[#343a46]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2 p-4">
            <div className="grid  gap-3 grid-cols-2">
              <div>
                <label htmlFor="enquiry-name" className={labelClassName}>
                  Name
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  autoComplete="name"
                  required
                  className={`text-xs ${inputClassName}`}
                />
              </div>

              <div>
                <label htmlFor="enquiry-city" className={labelClassName}>
                  City
                </label>
                <input
                  id="enquiry-city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  autoComplete="address-level2"
                  required
                  className={`text-xs ${inputClassName}`}
                />
              </div>

              <div>
                <label htmlFor="enquiry-mobile" className={labelClassName}>
                  Number
                </label>
                <input
                  id="enquiry-mobile"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  autoComplete="tel"
                  required
                  className={`text-xs ${inputClassName}`}
                />
                {fieldErrors.mobile && (
                  <p className="mt-1 text-xs text-red-500" role="alert">
                    {fieldErrors.mobile}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="enquiry-project" className={labelClassName}>
                  Project
                </label>
                <DropdownField
                  id="enquiry-project"
                  className="py-2 text-xs"
                  label="Interested project"
                  value={formData.project}
                  placeholder="Select project"
                  options={[
                    ...new Set([
                      ...(projectName ? [projectName] : []),
                      ...projects.map((project) => project.name),
                    ]),
                  ]}
                  onChange={handleProjectChange}
                />
                <input type="hidden" name="project" value={formData.project} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <label htmlFor="enquiry-email" className={labelClassName}>
                  Email
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  autoComplete="email"
                  required
                  className={`text-xs ${inputClassName}`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-500" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="enquiry-budget" className={labelClassName}>
                  Budget
                </label>
                <DropdownField
                  id="enquiry-budget"
                  className="py-2 text-xs"
                  label="Budget"
                  value={formData.budget}
                  placeholder="Select budget"
                  options={[
                    "Below 50 Lakh",
                    "50-70 Lakh",
                    "70 Lakh-1 Crore",
                    "1-2 Crore",
                    "Above 2 Crore",
                  ]}
                  onChange={(budget) =>
                    setFormData((previous) => ({ ...previous, budget }))
                  }
                />
                <input type="hidden" name="budget" value={formData.budget} />
              </div>
            </div>

            {error && (
              <p
                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-[#232833] px-5 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#343a46] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Enquire Now"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
