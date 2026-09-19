import { useEffect, useMemo, useState } from "react";

import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";

import ProjectSearch from "@/features/projects/components/ProjectSearch";
import ProjectSlider from "@/features/projects/components/project-slider";

function Projects() {
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

      const matchesCity =
        !city || project.city?.name === city;

      const matchesState =
        !state || project.state?.name === state;

      const matchesCategory =
        !propertyCategory ||
        project.property_category?.name === propertyCategory;

      const matchesPropertyType =
        !propertyType ||
        project.property_type?.name === propertyType;

      const matchesBhk =
        !bhk || project.bhk === bhk;

      return (
        matchesSearch &&
        matchesCity &&
        matchesState &&
        matchesCategory &&
        matchesPropertyType &&
        matchesBhk
      );
    });
  }, [
    projects,
    search,
    city,
    state,
    propertyCategory,
    propertyType,
    bhk,
  ]);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4">

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

      <ProjectSlider
        projects={filteredProjects}
        loading={loading}
      />

    </div>
  );
}

export default Projects;