import { useEffect, useState } from "react";
import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";
import ProjectSlider from "@/features/projects/components/project-slider";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1600px] border border-red-400 px-4">
      <ProjectSlider projects={projects} loading={loading} />
    </div>
  );
}

export default Projects;
