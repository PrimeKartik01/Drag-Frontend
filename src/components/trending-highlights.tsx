import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/types/project";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
interface TrendingHighlightsProps {
  projects: Project[];
}

export function TrendingHighlights({ projects }: TrendingHighlightsProps) {
  const highlights = useMemo(() => {
    const highlightsBySlug = new Map<
      string,
      { slug: string; name: string; projects: Project[] }
    >();

    projects.forEach((project) => {
      project.highlights?.forEach(({ name, slug }) => {
        const normalizedSlug = slug.trim();
        const normalizedName = name.trim();
        if (!normalizedSlug || !normalizedName) return;

        const highlight = highlightsBySlug.get(normalizedSlug);
        if (highlight) {
          if (!highlight.projects.some(({ id }) => id === project.id)) {
            highlight.projects.push(project);
          }
        } else {
          highlightsBySlug.set(normalizedSlug, {
            slug: normalizedSlug,
            name: normalizedName,
            projects: [project],
          });
        }
      });
    });

    return [...highlightsBySlug.values()];
  }, [projects]);
  const shouldLoop = highlights.length > 1;
  const slides = shouldLoop ? [...highlights, ...highlights] : highlights;
  const fallbackImage =
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000";

  return (
    <div className="px-2 md:px-6 py-7 bg-[#FFFDF9]">
      <section className="overflow-hidden grid grid-cols-1  gap-4 mt-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:justify-between w-full">
          <h2 className="text-[1.2rem] md:text-4xl font-bold">
            Discover <span className="text-gold">Curated</span> Collections
          </h2>

          <p className="md:mt-3 text-sm leading-6 text-gray-500 ">
            Explore the most sought-after neighborhoods
          </p>
        </div>

        {/* Carousel */}
        <div className="trending-locations-slider">
          {highlights.length > 0 && (
            <Swiper
              modules={[Autoplay]}
              centeredSlides={false}
              spaceBetween={20}
              loop={shouldLoop}
              speed={4000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 25,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {slides.map((highlight, index) => (
                <SwiperSlide key={`${highlight.slug}-${index}`}>
                  <Link
                    to={`/projects?highlight=${encodeURIComponent(highlight.slug)}`}
                    aria-label={`Filter projects by ${highlight.name}`}
                    className="group relative block h-[130px] cursor-pointer overflow-hidden rounded-xl md:h-[150px]"
                  >
                    <img
                      src={fallbackImage}
                      alt={highlight.name}
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/45 transition duration-300 group-hover:bg-black/55" />

                    <div className="absolute inset-0 flex flex-col justify-center px-5 text-white md:px-6">
                      <h3 className="text-lg font-medium md:text-xl">
                        {highlight.name}
                      </h3>

                      <p className="mt-2 text-sm font-semibold">
                        {highlight.projects.length}{" "}
                        {highlight.projects.length === 1
                          ? "project"
                          : "projects"}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </div>
  );
}
