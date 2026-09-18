import { useState } from "react";
import type { Project } from "@/types/project";
import {
  MapPin,
  BedDouble,
  LandPlot,
  IndianRupee,
} from "@/assets/icons/icons";
import { Spinner } from "@/components/ui/spinner";
import { formatPrice } from "@/utils/formatPrice";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  const fallbackImage =
    "https://images.unsplash.com/photo-1788204997156-72d623841c2b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="border border-gray-300 w-full rounded-4xl font-inter p-2 shadow-xl">
      <div className="relative h-60">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <img
          src={project.featured_image || fallbackImage}
          alt={project.name}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
          className="object-cover h-full w-full rounded-4xl"
        />
      </div>

      <div className="px-6 py-4">
        <h2 className="font-bold text-md xl:text-lg uppercase text-slate-700">
          {project.name}
        </h2>

        <div className="flex items-center justify-start w-full gap-1 mt-1 text-sm text-gray-600">
          <MapPin className="size-3 w-max" strokeWidth={2.5} />
          <p className="w-max uppercase font-medium">{project.city?.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm border-gray-300 pt-2 mt-2 font-medium text-gray-600">
          <div className="flex items-center justify-start gap-3 w-max border-gray-300 ">
            <BedDouble className="size-3 w-max" />
            <p>{project.bhk}</p>
          </div>

          <div className="flex items-center justify-self-start  gap-3 w-max ">
            <LandPlot className="size-3 w-max" />
            <p>{project.area} SQ.FT</p>
          </div>
        </div>

        <div className="flex items-center justify-self-start mt-2 gap-1 w-max ">
          <IndianRupee className="size-4 w-max"  strokeWidth={3} />
          <p className="text-md xl:text-lg font-semibold">{formatPrice(project.min_price)}</p>
        </div>
        
        <Link
          to={`/projects/${project.slug}`}
          className="mt-2 px-4 py-2 font-light uppercase flex items-center justify-center gap-1 rounded-lg  w-max text-xs bg-slate-700 text-white tracking-wider hover:bg-slate-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
