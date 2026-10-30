import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProjectsMegaMenu() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getProjects()
      .then((response) => {
        setProjects(response.data ?? []);
      })
      .catch((error) => {
        console.error("Failed to load projects menu:", error);
        setHasLoadError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const categories = Array.from(
    new Map(
      projects
        .filter((project) => project.property_category)
        .map((project) => [
          project.property_category!.id,
          project.property_category!,
        ]),
    ).values(),
  );

  const bestDealProjects = projects.filter((project) =>
    project.highlights?.some((highlight) => highlight.slug === "best-deal"),
  );

  return (
    <div ref={menuRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="projects-mega-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/70"
      >
        Projects
        <ChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id="projects-mega-menu"
          className="absolute left-1/2 top-[calc(100%+1.25rem)] z-[60] w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 text-gray-900 shadow-2xl bg-gold-200"
        >
          <div className="grid grid-cols-2 gap-1">
            <section aria-labelledby="project-categories-title">
              <div className="mb-3 flex items-center justify-between">
                <h2
                  id="project-categories-title"
                  className="text-xs uppercase tracking-wider font-bold"
                >
                  Explore by category
                </h2>
              </div>

              {isLoading ? (
                <p className="rounded-lg bg-gray-50 px-3 py-4 text-sm text-gray-500">
                  Loading project categories...
                </p>
              ) : hasLoadError ? (
                <p className="rounded-lg bg-gray-50 px-3 py-4 text-sm text-gray-500">
                  Project categories are unavailable right now.
                </p>
              ) : categories.length ? (
                <div className="grid gap-1">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href={`/projects?category=${encodeURIComponent(category.name)}`}
                      onClick={() => setIsOpen(false)}
                      className="group rounded-xl px-3 py-2.5 transition hover:bg-amber-50/50"
                    >
                      <span className="block text-sm font-semibold text-gray-900 group-hover:text-gold-100">
                        {category.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-gray-500 ">
                        Explore {category.name} projects
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="rounded-lg bg-gray-50 px-3 py-4 text-sm text-gray-500">
                  Browse all our latest projects.
                </p>
              )}
            </section>

            {/* Right: Best Deals Swiper */}
            <section className="min-w-0">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider">
                  Best Deals
                </h2>
              </div>

              {isLoading ? (
                <p className="py-4 text-sm text-gray-500">
                  Loading best deals...
                </p>
              ) : hasLoadError ? (
                <p className="py-4 text-sm text-gray-500">
                  Unable to load best deals.
                </p>
              ) : bestDealProjects.length > 0 ? (
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  spaceBetween={12}
                  slidesPerView={1}
                  loop={bestDealProjects.length > 1}
                  className="best-deals-swiper"
                >
                  {bestDealProjects.map((project) => (
                    <SwiperSlide key={project.id}>
                      <div className="overflow-hidden">
                        {project.featured_image ? (
                          <img
                            src={project.featured_image}
                            alt={project.name}
                            className="h-36 w-full rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-36 items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-500">
                            No project image
                          </div>
                        )}

                        <div className="pt-1">
                          <h3 className="text-sm font-bold text-gray-900">
                            {project.name}
                          </h3>

                          <div className="flex justify-between items-end gap-2">
                            <p className="text-xs text-gray-500">
                              {[project.city?.name, project.state?.name]
                                .filter(Boolean)
                                .join(", ") || "Discover this project"}
                            </p>

                            <a
                              href={`/projects/${project.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="px-4 py-1 rounded-lg inline-flex items-center gap-2 text-xs text-white font-semibold bg-gold transition hover:bg-gold-100"
                            >
                              Explore Project
                              <ArrowRight size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="rounded-lg bg-gray-50 px-3 py-4 text-sm text-gray-500">
                  No best deal projects available.
                </p>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsMegaMenu;
