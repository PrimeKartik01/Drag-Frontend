import { useEffect, useMemo, useState } from "react";

import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";

import ProjectSearch from "@/features/projects/components/ProjectSearch";
import ProjectSlider from "@/features/projects/components/project-slider";
import heroVideo from "@/assets/icons/video/Website-video.mp4";
import Header from "../../components/header";

function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bhk, setBhk] = useState("");

  useEffect(() => {
    getProjects()
      .then((response) => {
        if (response.data?.length > 0) {
          setProjects(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        project.name.toLowerCase().includes(searchValue) ||
        project.city?.name?.toLowerCase().includes(searchValue) ||
        project.builder?.name?.toLowerCase().includes(searchValue);

      const matchesCity = !city || project.city?.name === city;

      const matchesState = !state || project.state?.name === state;

      const matchesCategory =
        !propertyCategory ||
        project.property_category?.name === propertyCategory;

      const matchesPropertyType =
        !propertyType || project.property_type?.name === propertyType;

      const matchesBhk = !bhk || project.bhk === bhk;

      return (
        matchesSearch &&
        matchesCity &&
        matchesState &&
        matchesCategory &&
        matchesPropertyType &&
        matchesBhk
      );
    });
  }, [projects, search, city, state, propertyCategory, propertyType, bhk]);

  return (
    <main className="mx-auto w-full max-w-[1522px]">
      <Header />
      {/* Hero Section */}
      <section className="relative isolate flex h-[32rem] items-center overflow-hidden px-4 py-16 md:py-24">
        <video
          className="absolute inset-0 top-0 -z-20 size-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/55" />

        <ProjectSearch
          projects={projects}
          search={search}
          city={city}
          state={state}
          propertyCategory={propertyCategory}
          propertyType={propertyType}
          bhk={bhk}
          setSearch={setSearch}
          setCity={setCity}
          setState={setState}
          setPropertyCategory={setPropertyCategory}
          setPropertyType={setPropertyType}
          setBhk={setBhk}
        />
      </section>

      {/* Featured Projects Section */}
      <section className="px-2 md:px-6 py-7 bg-gradient-to-br from-[#FFFDF0] via-[#FFFDF9] to-[#FFFDF0]">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold flex items-center gap-2 px-2">
          Properties
          <span>
            <svg
              width="32"
              height="2"
              viewBox="0 0 32 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="1"
                x2="32"
                y2="1"
                stroke="#C59B27"
                strokeWidth="2"
              />
            </svg>
          </span>
        </p>

        <div className="max-md:flex max-md:justify-between items-center md:flex-col">
          <h2 className="text-[1.2rem] md:text-4xl font-bold px-2">
            Our <span className="text-gold">Featured</span> Projects
          </h2>

          <div className="flex justify-between items-center px-2">
            <p className="mt-2 text-sm text-slate-500 hidden md:block">
              Explore our latest residential and commercial projects.
            </p>

            <p className="text-xs md:text-md text-white font-semibold bg-gold hover:bg-[#9a7229] cursor-pointer rounded-lg px-2 py-1.5 flex justify-center items-center gap-2 group transition-all duration-300 md:mt-0">
              View All
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  ></path>
                </svg>
              </span>
            </p>
          </div>
        </div>

        <ProjectSlider projects={filteredProjects} loading={loading} />
      </section>
    </main>
  );
}

export default Home;
