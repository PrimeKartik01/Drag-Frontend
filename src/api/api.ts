import api from "./axios";

import type { Project, ProjectsResponse } from "@/types/project";

export const getProjects = async (): Promise<ProjectsResponse> => {
  const response = await api.get<ProjectsResponse>("/projects");
  return response.data;
};

export const getProject = async (slug: string): Promise<Project> => {
  const response = await api.get<{ data: Project }>(
    `/projects/${slug}`
  );

  return response.data.data;
};