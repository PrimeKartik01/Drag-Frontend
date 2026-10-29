import { useState } from "react";

// Router Linker
import { Link } from "react-router-dom";

// Project Interface
import type { Project } from "@/types/project";

// Icons
import { MapPin, BedDouble, LandPlot, IndianRupee } from "@/assets/icons/icons";

// Shadcn Ui Component
import { Spinner } from "../../../../@/index";

// Price Fomatter
import { formatPrice } from "@/utils/formatPrice";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  const fallbackImage =
    "https://images.unsplash.com/photo-1788204997156-72d623841c2b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="pt-3 pb-7 px-2">
      <div className="border border-gray-300 w-full rounded-xl font-inter shadow-xl p-3">
        <div className="relative h-40">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 rounded-xl">
              <Spinner />
            </div>
          )}
          <img
            src={project.featured_image || fallbackImage}
            alt={project.name}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
            className="object-cover h-full w-full rounded-xl"
          />

          <p className="absolute top-2 right-2 text-black text-white rounded-lg px-3 py-1 text-sm font-medium bg-gold ">
            {project.property_category?.name}
          </p>
        </div>

        <div className="px-3 md:px-4 pt-4">
          <h2 className="font-bold text-sm uppercase text-gold">
            {project.name}
          </h2>

          <div className="flex items-center justify-start w-full gap-1 mt-1 text-xs font-semibold text-slate-900">
            <MapPin className="size-3 w-max" strokeWidth={2.5} />
            <p className="w-max uppercase">{project.city?.name}</p>
          </div>

          <div className="flex justify-between text-xs border-gray-300 pt-2 mt-2 font-semibold text-slate-900">
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
            <IndianRupee className="size-4 w-max text-gold-100" strokeWidth={3} />
            <p className="text-sm text-gold-100 font-bold">
              {formatPrice(project.min_price)}
            </p>
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="mt-2 px-4 py-2 font-medium uppercase flex items-center justify-center gap-1 rounded-lg  w-max text-xs text-white tracking-wider bg-gold hover:bg-gold-100"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
