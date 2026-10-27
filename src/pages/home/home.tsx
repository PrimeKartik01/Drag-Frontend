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
      <section className="relative isolate flex h-[35rem] md:min-h-screen items-center overflow-hidden px-4 py-16 md:py-24">
        <video
          className="absolute inset-0 top-0 -z-20 size-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        {/* <div className="absolute inset-0 -z-10 bg-black/35" /> */}

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
      <section className="px-4 py-10">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Explore Properties
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            Featured Projects
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Explore our latest residential and commercial projects.
          </p>
        </div>

        <ProjectSlider projects={filteredProjects} loading={loading} />
      </section>
    </main>
  );
}

export default Home;
