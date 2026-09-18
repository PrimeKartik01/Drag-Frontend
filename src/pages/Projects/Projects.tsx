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
      <div className="p-6 mx-auto w-full max-w-[1600px] border-red-400 border">
        <h1 className="mb-6 text-3xl font-bold ">Projects</h1>

        <ProjectSlider projects={projects} />
      </div>
    </>
  );
}

export default Projects;
