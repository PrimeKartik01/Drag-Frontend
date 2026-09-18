import { useState } from "react";
import type { Project } from "@/types/project";
import { MapPin, BedDouble } from "@/assets/icons/icons";
import { Spinner } from "@/components/ui/spinner";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  const fallbackImage = "https://images.unsplash.com/photo-1788204997156-72d623841c2b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="border border-gray-300 w-full p-2 rounded-lg">
      <div className="relative h-60"> {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <img
          src={project.featured_image || fallbackImage}
          alt={project.name}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
          className="object-cover h-full w-full rounded-lg"
        />
      </div>

      <h2 className="font-semibold text-md mt-4">{project.name}</h2>

      <p className="">{project.builder?.name}</p>

      <div className="grid grid-cols-2 text-xs border-t border-gray-300 pt-2 mt-2">
        <div className="flex items-center justify-start w-full">
          <MapPin className="size-3 w-max" />
          <p className="w-max">{project.city?.name}</p>
        </div>

        <div className="flex items-center justify-start gap-3 w-full border-gray-300 w-full pl-3 border-l">
          <BedDouble className="size-3 w-max" />
          <p className=" ">{project.bhk}</p>
        </div>
      </div>

      <p className="mt-2 px-3 py-1 bg-teal-100 text-teal-500 font-semibold rounded-full w-max text-xs">
        {project.project_status}
      </p>
      <p className="mt-2 text-xs font-semibold">{project.area} Sq.ft</p>
    </div>
  );
}
