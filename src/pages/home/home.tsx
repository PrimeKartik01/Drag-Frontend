import { useEffect, useMemo, useState } from "react";

import { getProjects } from "@/api/api";
import type { Project } from "@/types/project";

import ProjectSearch from "@/features/projects/components/ProjectSearch";
import ProjectSlider from "@/features/projects/components/project-slider";
import heroVideo from "@/assets/icons/video/Website-video.mp4";
import Header from "../../components/header";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bhk, setBhk] = useState("");

  useEffect(() => {
    getProjects()
      .then((response) => {
        if (response.data?.length > 0) {
          setProjects(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFeatured = project.highlights?.some(
        (highlight) => highlight.slug === "featured-project",
      );

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        project.name.toLowerCase().includes(searchValue) ||
        project.city?.name?.toLowerCase().includes(searchValue) ||
        project.builder?.name?.toLowerCase().includes(searchValue);

      const matchesCity = !city || project.city?.name === city;

      const matchesState = !state || project.state?.name === state;

      const matchesCategory =
        !propertyCategory ||
        project.property_category?.name === propertyCategory;

      const matchesPropertyType =
        !propertyType || project.property_type?.name === propertyType;

      const matchesBhk = !bhk || project.bhk === bhk;

      return (
        matchesFeatured &&
        matchesSearch &&
        matchesCity &&
        matchesState &&
        matchesCategory &&
        matchesPropertyType &&
        matchesBhk
      );
    });
  }, [projects, search, city, state, propertyCategory, propertyType, bhk]);

  const locations = [
    {
      id: 1,
      title: "Noida-Greater Noida Expressway",
      city: "Noida",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000",
    },
    {
      id: 2,
      title: "Srinagar Kanyakumari Highway",
      city: "Panipat",
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1000",
    },
    {
      id: 3,
      title: "Golf Course Road",
      city: "Gurugram",
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1000",
    },
    {
      id: 4,
      title: "Dwarka Expressway",
      city: "Gurugram",
      image:
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000",
    },
    {
      id: 5,
      title: "Yamuna Expressway",
      city: "Greater Noida",
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1000",
    },
  ];

  const shouldLoop = loading || projects.length >= 4;

  return (
    <main className="mx-auto w-full max-w-[1522px]">
      <Header />
      {/* Hero Section */}
      <section className="relative isolate flex h-[32rem] items-center overflow-hidden px-4 py-16 md:py-24">
        <video
          className="absolute inset-0 top-0 -z-20 size-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/55" />

        <ProjectSearch
          projects={projects}
          search={search}
          city={city}
          state={state}
          propertyCategory={propertyCategory}
          propertyType={propertyType}
          bhk={bhk}
          setSearch={setSearch}
          setCity={setCity}
          setState={setState}
          setPropertyCategory={setPropertyCategory}
          setPropertyType={setPropertyType}
          setBhk={setBhk}
        />
      </section>

      {/* Featured Projects Section */}
      <section className="px-2 md:px-6 py-7 bg-[#FFFDF9]">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold flex items-center gap-2 px-2">
          Properties
          <span>
            <svg
              width="32"
              height="2"
              viewBox="0 0 32 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="1"
                x2="32"
                y2="1"
                stroke="#C59B27"
                strokeWidth="2"
              />
            </svg>
          </span>
        </p>

        <div className="max-md:flex max-md:justify-between items-center md:flex-col">
          <h2 className="text-[1.2rem] md:text-4xl font-bold px-2">
            Our <span className="text-gold">Featured</span> Projects
          </h2>

          <div className="flex justify-between items-center px-2">
            <p className="mt-2 text-sm text-slate-500 hidden md:block">
              Explore our latest residential and commercial projects.
            </p>

            <Link
              to="/projects"
              className="text-xs md:text-md text-white font-semibold bg-gold hover:bg-[#9a7229] cursor-pointer rounded-lg px-2 py-1.5 flex justify-center items-center gap-2 group transition-all duration-300 md:mt-0"
            >
              View All
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <ProjectSlider projects={filteredProjects} loading={loading} />
      </section>

      <section className="overflow-hidden py-14 md:py-16 bg-[#FFFDF9]">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-medium text-[#444] md:text-4xl">
            Trending Locations
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500 md:text-base">
            Explore the most sought-after neighborhoods and up-and-coming areas,
            carefully selected by our experts for their value, lifestyle, and
            investment potential.
          </p>
        </div>

        {/* Carousel */}
        <div className="trending-locations-slider">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.15}
            centeredSlides={true}
            spaceBetween={20}
            loop={shouldLoop}
            speed={1000}
            autoplay={{
              delay: 3500,
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
                spaceBetween: 40,
              },
            }}
          >
            {locations.map((location) => (
              <SwiperSlide key={location.id}>
                <div className="group relative h-[130px] cursor-pointer overflow-hidden rounded-xl md:h-[150px]">
                  <img
                    src={location.image}
                    alt={location.title}
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/45 transition duration-300 group-hover:bg-black/55" />

                  {/* Location Content */}
                  <div className="absolute inset-0 flex flex-col justify-center px-5 text-white md:px-6">
                    <h3 className="text-lg font-medium md:text-xl">
                      {location.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold">
                      {location.city}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
}

export default Home;
