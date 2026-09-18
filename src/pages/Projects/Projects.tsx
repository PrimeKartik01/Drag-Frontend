import { useEffect, useState } from "react";
import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";
import ProjectSlider  from "@/features/projects/components/ProjectSlider";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects()
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <>
      <div className="px-4 mx-auto w-full max-w-[1600px] border-red-400 border">
        <ProjectSlider projects={projects} />
      </div>
    </>
  );
}

export default Projects;
