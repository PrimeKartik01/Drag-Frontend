// Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Project Interface
import type { Project } from "@/types/project";

// Project Component
import { ProjectCard } from "./ProjectCard";

// Icons
import { ChevronRight, ChevronLeft } from "@/assets/icons/icons";

interface ProjectSliderProps {
  projects: Project[];
}

function ProjectSlider({ projects }: ProjectSliderProps) {
  return (
    <div className="relative">
      <button
        type="button"
        className="project-slider-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-1 shadow-md"
        aria-label="Previous projects"
      >
        <ChevronLeft className="text-white" />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".project-slider-prev",
          nextEl: ".project-slider-next",
        }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="project-slider-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-1 shadow-md"
        aria-label="Next projects"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
}

export default ProjectSlider;
