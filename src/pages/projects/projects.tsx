import { useEffect, useMemo, useState } from "react";

import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";
import image from "@/assets/img/image.png";

import { ProjectCard } from "@/features/projects/components/project-card";
import Header from "../../components/header";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 4;

  useEffect(() => {
    getProjects()
      .then((response) => {
        setProjects(response.data ?? []);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;

    return projects.slice(startIndex, startIndex + projectsPerPage);
  }, [projects, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1522px]">
      <Header />
      <section className="relative h-[220px] w-full overflow-hidden md:h-[50vh]">
        <img
          src={image}
          alt="SS Prime Properties"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            SS Prime Infra
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-5xl">
            Explore Our Projects
          </h1>

          <p className="mt-3 text-sm text-white/80">
            Discover exceptional residential and commercial properties.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#FFFDF0] via-[#FFFDF9] to-[#FFFDF0] px-4 py-12 md:px-6">
        {/* Page Heading */}
        <div className="mb-4">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
            Our Properties
            <span className="h-[2px] w-8 bg-gold" />
          </p>

          <h1 className="mt-2 text-2xl font-bold md:text-4xl">
            Explore Our <span className="text-gold">Projects</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Discover our residential and commercial developments.
          </p>
        </div>

      
        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        ) : currentProjects.length > 0 ? (
          <>
            {/* Project Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {currentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`size-10 rounded-lg border text-sm font-semibold transition ${
                      currentPage === page
                        ? "border-gold bg-gold text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold">No Projects Found</h2>
            <p className="mt-2 text-sm text-slate-500">
              No projects are currently available.
            </p>
          </div>
        )}
      </section>

      <section>

      </section>
    </main>
  );
}

export default Projects;
