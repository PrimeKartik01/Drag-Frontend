import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProject } from "@/api/api";
import type { Project } from "@/types/project";

export function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!slug) return;

    getProject(slug)
      .then((data) => {
        setProject(data);
      })
      .catch((error) => {
        console.error("Failed to fetch project:", error);
      });
  }, [slug]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.builder?.name}</p>
      <p>{project.city?.name}</p>
      <p>{project.bhk}</p>
      <p>{project.area} Sq.Ft</p>
    </div>
  );
}