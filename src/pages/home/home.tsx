import { useEffect, useMemo, useState } from "react";

import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";

import ProjectSearch from "@/features/projects/components/project-search";
import ProjectSlider from "@/features/projects/components/project-slider";
import heroVideo from "@/assets/icons/video/Website-video.mp4";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import Header from "../../components/header";
import { TrendingHighlights } from "../../components/trending-highlights";

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
      const matchesFeatured = project.highlights?.some(
        (highlight) => highlight.slug === "featured-project",
      );

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
        matchesFeatured &&
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

      <div className="px-2 md:px-6 py-7 bg-[#FFFDF9]">
        {/* Featured Projects Section */}
        <section>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold flex items-center gap-2">
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
            <h2 className="text-[1.2rem] md:text-4xl font-bold">
              Our <span className="text-gold">Featured</span> Projects
            </h2>

            <div className="flex justify-between items-center">
              <p className="mt-2 text-sm text-slate-500 hidden md:block">
                Explore our latest residential and commercial projects.
              </p>

              <Link
                to="/projects"
                className="text-xs md:text-md text-white font-semibold bg-gold hover:bg-[#9a7229] cursor-pointer rounded-lg px-2 py-1.5 flex justify-center items-center gap-2 group transition-all duration-300 md:mt-0"
              >
                View All
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <ProjectSlider projects={filteredProjects} loading={loading} />
        </section>

        <TrendingHighlights projects={projects} />
      </div>
    </main>
  );
}

export default Home;
