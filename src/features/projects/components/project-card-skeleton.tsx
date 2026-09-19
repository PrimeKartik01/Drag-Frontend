// Shadcn Ui component
import { Skeleton } from "../../../../@/index";

export function ProjectCardSkeleton() {
  return (
    <div className="w-full rounded-4xl border border-gray-300 p-2 font-inter shadow-xl">
      {/* Image area */}
      <div className="h-60 w-full rounded-4xl bg-gray-100" />

      {/* Content */}
      <div className="px-3 py-4 md:px-4">
        {/* Name */}
        <Skeleton className="h-6 w-32" />

        {/* Location */}
        <Skeleton className="mt-2 h-4 w-24" />

        {/* BHK + Area */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Price */}
        <Skeleton className="mt-3 h-6 w-28" />

        {/* Button */}
        <Skeleton className="mt-3 h-9 w-28 rounded-lg" />
      </div>
    </div>
  );
}