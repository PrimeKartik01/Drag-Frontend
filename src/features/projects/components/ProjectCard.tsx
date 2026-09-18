import { useState } from "react";
import type { Project } from "@/types/project";
import { MapPin, BedDouble, ArrowRight, LandPlot } from "@/assets/icons/icons";
import { Spinner } from "@/components/ui/spinner";
import { formatPrice } from "@/utils/formatPrice";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  const fallbackImage =
    "https://images.unsplash.com/photo-1788204997156-72d623841c2b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="border border-gray-300 w-full rounded-lg font-poppins ">
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
          className="object-cover h-full w-full rounded-t-lg"
        />
      </div>

      <div className="px-6 py-4">
        <h2 className="font-medium text-md uppercase">{project.name}</h2>

        <div className="flex items-center justify-start w-full gap-1 mt-1 text-sm">
          <MapPin className="size-3 w-max" strokeWidth={2.5} />
          <p className="w-max uppercase font-medium">{project.city?.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 xl:gap-0 xl:grid-cols-3 text-xxs xl:text-sm border-gray-300 pt-2 mt-2 font-medium text-gray-600">

          <div className="flex items-center justify-start gap-3 w-max border-gray-300 ">
            <BedDouble className="size-3 w-max" />
            <p>{project.bhk}</p>
          </div>

          <div className="flex items-center justify-center gap-3 w-max ">
            <LandPlot className="size-3 w-max" />
            <p>{project.area} Sq.Ft</p>
          </div>

          <div className="flex items-center justify-center gap-3 w-max ">
            <BedDouble className="size-3 w-max" />
            <p>
              {formatPrice(project.min_price)}{" "}
            </p>
          </div>
        </div>

        <p className="mt-2 px-3 py-1 font-bold flex items-center justify-center gap-1 rounded-md border border-gray-200 w-max text-xs text-blue-600">
          View Details
          <ArrowRight className="size-3 w-max" strokeWidth={2.5} />
        </p>
      </div>
    </div>
  );
}
