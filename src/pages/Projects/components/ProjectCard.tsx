import type { Project } from "../../../types/project";
import { MapPin, BedDouble } from "../../../assets/icons/icons";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border border-gray-300 w-full p-2 rounded-lg">
      <div className="h-60">
        <img
          src={project.featured_image ?? ""}
          alt={project.name}
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
