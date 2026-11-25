import { useEffect, useState } from "react";
import {
  Camera,
  Mail,
  MapPin,
  Phone,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getProjects } from "@/api/api";
import type { PropertyCategory, Project } from "@/types/project";
import mobileLogo from "@/assets/img/mobilelogo.svg";

const socialMarks = [
  { label: "Facebook", mark: "f" },
  { label: "Instagram", Icon: Camera },
  { label: "LinkedIn", mark: "in" },
  { label: "YouTube", Icon: Play },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About Us", to: "/#about" },
  { label: "Contact", to: "/contact" },
];

function getProjectCategories(projects: Project[]): PropertyCategory[] {
  const categories = new Map<number, PropertyCategory>();

  projects.forEach((project) => {
    const category = project.property_category;
    if (category) categories.set(category.id, category);
  });

  return [...categories.values()];
}

export default function Footer() {
  const [categories, setCategories] = useState<PropertyCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryLoadError, setCategoryLoadError] = useState(false);

  useEffect(() => {
    getProjects()
      .then((response) => {
        setCategories(getProjectCategories(response.data ?? []));
      })
      .catch((error) => {
        console.error("Failed to load footer project categories:", error);
        setCategoryLoadError(true);
      })
      .finally(() => {
        setLoadingCategories(false);
      });
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="border-slate-700 pr-5 text-sm xl:border-r">
            <Link
              to="/"
              className="flex items-center justify-center md:justify-start"
            >
              <img
                src={mobileLogo}
                alt="SS Prime Infra"
                className="h-24 w-auto object-contain"
                loading="lazy"
              />
            </Link>

            <p className="mt-5">Pune RERA: A52100044653</p>
            <p className="mt-1 break-words">
              Gurgaon RERA: RC/HARERA/GGM/3022/2617/2024/735
            </p>
            <p className="mt-3 leading-7">
              Helping you find premium residential properties across Pune & Gurgaon.
              Discover luxury apartments, investment opportunities and dream
              homes from India&apos;s leading developers.
            </p>

            <div aria-hidden="true" className="mt-7 flex gap-4">
              {socialMarks.map(({ label, Icon, mark }) => (
                <span
                  key={label}
                  className="flex size-11 items-center justify-center rounded-full border border-slate-700 transition hover:border-amber-500 hover:bg-amber-500"
                >
                  {Icon ? (
                    <Icon size={17} />
                  ) : (
                    <span className="text-sm font-bold">{mark}</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:col-span-2 lg:gap-12">
            <nav className="border-slate-700 xl:border-r">
              <h2 className="mb-2 text-lg font-medium text-white">
                Quick Links
              </h2>
              <div className="mb-6 h-0.5 w-14 rounded-lg bg-[#B68D37]" />
              <ul className="space-y-3 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="transition hover:text-amber-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="border-slate-700 xl:border-r">
              <h2 className="mb-2 text-lg font-medium text-white">
                Project Category
              </h2>
              <div className="mb-6 h-0.5 w-14 rounded-lg bg-[#B68D37]" />
              {loadingCategories ? (
                <p className="text-sm text-slate-400">
                  Loading project categories...
                </p>
              ) : categoryLoadError ? (
                <p className="text-sm text-slate-400">
                  Project categories are unavailable right now.
                </p>
              ) : categories.length ? (
                <ul className="space-y-3 text-sm">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/projects?category=${encodeURIComponent(category.name)}`}
                        className="transition hover:text-amber-500"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">
                  No project categories available.
                </p>
              )}
            </nav>
          </div>

          <div id="contact">
            <h2 className="mb-2 text-lg font-medium text-white">Contact</h2>
            <div className="mb-6 h-0.5 w-14 rounded-lg bg-[#B68D37]" />

            <div className="space-y-5 text-sm">
              <div className="flex gap-3">
                <MapPin
                  size={17}
                  className="mt-1 shrink-0 text-[#B68D37]"
                  aria-hidden="true"
                />
                <div>
                  <span className="mb-0.5 block font-semibold uppercase tracking-widest text-[#B68D37]">
                    Gurugram Office
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=SS+Prime+Infra+Pvt+Ltd%2C+Pioneer+Urban+Square%2C+Sector+62%2C+Gurugram%2C+Haryana+122098"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-amber-500"
                  >
                    SS Prime Infra Pvt Ltd, Ground Floor, Block-D, Pioneer Urban
                    Square, Office No. 006, Sector 62, Gurugram, Haryana 122098
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin
                  size={17}
                  className="mt-1 shrink-0 text-[#B68D37]"
                  aria-hidden="true"
                />
                <div>
                  <span className="mb-0.5 block font-semibold uppercase tracking-widest text-[#B68D37]">
                    Maharashtra Office
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=SS+Prime+Infra+Pune"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-amber-500"
                  >
                    Office No. 410, ICON Towers, Survey Number 83/1, Near Kasturi
                    Chowk, Wakad, Pune, Maharashtra 411057
                  </a>
                </div>
              </div>

              <a
                href="tel:+919236079765"
                className="flex items-center gap-3 transition hover:text-amber-500"
              >
                <Phone
                  size={16}
                  className="shrink-0 text-[#B68D37]"
                  aria-hidden="true"
                />
                +91 92360 79765
              </a>

              <a
                href="mailto:info@ssprimeinfra.com"
                className="flex items-center gap-3 transition hover:text-amber-500"
              >
                <Mail
                  size={16}
                  className="shrink-0 text-[#B68D37]"
                  aria-hidden="true"
                />
                info@ssprimeinfra.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:px-8 md:flex-row md:text-left">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SS Prime Infra. All Rights Reserved.
          </p>
          <a
            href="https://ssprimeinfra.com/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition hover:text-amber-500"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
