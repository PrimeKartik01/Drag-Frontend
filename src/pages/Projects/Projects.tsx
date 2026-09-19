import { useEffect, useState } from "react";
import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";
import ProjectSlider from "@/features/projects/components/project-slider";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1600px] border border-red-400 px-4">
      <ProjectSlider
        projects={projects}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Projects;