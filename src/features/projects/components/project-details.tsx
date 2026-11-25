import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  BedDouble,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  MapPin,
  Ruler,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

import { getProject } from "@/api/api";
import type { Project, ProjectMediaItem } from "@/types/project";
import { formatPrice } from "@/utils/formatPrice";
import Header from "../../../components/header";
import EnquiryModal from "../../../components/enquiry/components/enquiry-modal";

import "swiper/css";
import "swiper/css/pagination";

const storageBaseUrl = "https://ssprimecrm.com/storage/";

interface GallerySlide {
  id: string;
  type: "photo" | "video";
  src: string;
  poster: string | null;
  title: string | null;
}

function getMediaUrl(url: string | null, file: string | null): string | null {
  const source = url || file;
  if (!source) return null;

  try {
    return new URL(source, storageBaseUrl).toString();
  } catch {
    return null;
  }
}

function formatDate(date: string | null): string | null {
  if (!date) return null;

  const timestamp = Date.parse(date);
  if (!Number.isFinite(timestamp)) return null;

  return new Date(timestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function mediaSlides(project: Project): GallerySlide[] {
  const media = project.media;
  const items: { item: ProjectMediaItem; type: GallerySlide["type"] }[] = [
    ...(media?.photos ?? []).map((item) => ({ item, type: "photo" as const })),
    ...(media?.videos ?? []).map((item) => ({ item, type: "video" as const })),
  ];

  const slides = items
    .sort((a, b) => a.item.sort_order - b.item.sort_order)
    .flatMap(({ item, type }, index) => {
      const src = getMediaUrl(item.file_url, item.file);
      if (!src) return [];

      return [
        {
          id: `${type}-${item.id}-${index}`,
          type,
          src,
          poster: getMediaUrl(item.thumbnail_url, item.thumbnail),
          title: item.title,
        },
      ];
    });

  if (slides.length > 0) return slides;
  if (!project.featured_image) return [];

  return [
    {
      id: "featured-image",
      type: "photo",
      src: project.featured_image,
      poster: null,
      title: project.name,
    },
  ];
}

function ProjectDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <Header />
      <div className="mx-auto max-w-[1440px] animate-pulse px-4 py-8 sm:px-6 lg:px-10">
        <div className="h-[280px] rounded-3xl bg-slate-200 sm:h-[420px] lg:h-[520px]" />
        <div className="mt-8 h-8 w-64 rounded bg-slate-200" />
        <div className="mt-4 h-5 w-40 rounded bg-slate-200" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-28 rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    </main>
  );
}

export function ProjectDetails() {
  const { slug } = useParams();
  const [loadedData, setLoadedData] = useState<{
    slug: string;
    project: Project | null;
    error: string;
  } | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    if (!slug) return;

    let active = true;

    getProject(slug)
      .then((data) => {
        if (active) setLoadedData({ slug, project: data, error: "" });
      })
      .catch((projectError) => {
        console.error("Failed to fetch project:", projectError);
        if (active) {
          setLoadedData({
            slug,
            project: null,
            error: "Unable to load this project. Please try again.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const currentData =
    slug && loadedData?.slug === slug ? loadedData : null;
  const loading = Boolean(slug) && !currentData;
  const project = currentData?.project ?? null;
  const error = slug
    ? currentData?.error ?? ""
    : "Project not found.";

  const slides = useMemo(
    () => (project ? mediaSlides(project) : []),
    [project],
  );

  if (loading) return <ProjectDetailsLoading />;

  if (!project || error) {
    return (
      <main className="min-h-screen bg-[#FFFDF9]">
        <Header />
        <div className="mx-auto max-w-[1440px] px-4 py-16 text-center sm:px-6">
          <p className="text-lg font-semibold text-slate-800" role="alert">
            {error || "Project not found."}
          </p>
          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#B68D37] px-5 py-3 font-semibold text-white transition hover:bg-[#9a7229]"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const location = [project.city?.name, project.state?.name]
    .filter(Boolean)
    .join(", ");
  const description = project.description || project.short_description;
  const price = project.min_price
    ? `${formatPrice(project.min_price)}${
        project.max_price && project.max_price !== project.min_price
          ? ` - ${formatPrice(project.max_price)}`
          : ""
      }`
    : "Contact for price";
  const overview = [
    { label: "Project Status", value: project.project_status },
    { label: "Configuration", value: project.bhk },
    { label: "Area", value: project.area ? `${project.area} Sq.Ft.` : null },
    { label: "Property Type", value: project.property_type?.name },
  ];
  const details = [
    { label: "Builder", value: project.builder?.name },
    { label: "Township", value: project.township?.name },
    { label: "Category", value: project.property_category?.name },
    { label: "RERA Number", value: project.rera_no },
    { label: "Launch Date", value: formatDate(project.launch_date) },
    { label: "Possession Date", value: formatDate(project.possession_date) },
    { label: "Address", value: project.address },
    { label: "Location", value: location || null },
  ].filter((detail) => detail.value);
  const amenities = project.media?.amenities ?? [];

  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <Header />
      <section
        aria-label={`${project.name} photos and videos`}
        className="project-media-carousel group relative h-[280px] w-full overflow-hidden bg-slate-900 shadow-xl sm:h-[420px] lg:h-[520px]"
      >
        {slides.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={slides.length > 1}
            autoplay={
              slides.length > 1
                ? {
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            speed={700}
            pagination={slides.length > 1 ? { clickable: true } : false}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="size-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                {slide.type === "video" ? (
                  <video
                    src={slide.src}
                    poster={slide.poster ?? undefined}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={slide.title || `${project.name} video ${index + 1}`}
                    className="size-full object-cover"
                  />
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.title || `${project.name} photo ${index + 1}`}
                    className="size-full object-cover"
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-10 pt-20 text-sm font-medium text-white sm:px-8">
                  {slide.title ||
                    (slide.type === "video" ? "Project video" : project.name)}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-center text-white">
            <Building2 className="mr-3 size-8 text-[#D4AC55]" />
            <span className="text-xl font-semibold">{project.name}</span>
          </div>
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous project media"
              onClick={() => swiperRef.current?.slidePrev()}
              className="project-detail-prev absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white sm:left-5 sm:size-12"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              aria-label="Next project media"
              onClick={() => swiperRef.current?.slideNext()}
              className="project-detail-next absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow transition hover:bg-white sm:right-5 sm:size-12"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </section>

      <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 sm:px-6 lg:px-10">
        <div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#9a7229]"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>
        </div>

        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              {project.project_status && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                  <BadgeCheck size={15} />
                  {project.project_status}
                </span>
              )}
              {project.property_category?.name && (
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-[#9a7229]">
                  {project.property_category.name}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {project.name}
            </h1>
            {location && (
              <p className="mt-2 flex items-center gap-2 text-slate-500">
                <MapPin size={18} className="shrink-0 text-[#B68D37]" />
                {location}
              </p>
            )}

            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              {overview.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-medium text-slate-500">{label}</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {value || "Not specified"}
                  </p>
                </div>
              ))}
            </div>

            {description && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-slate-900">
                  About {project.name}
                </h2>
                <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
                  {description}
                </p>
              </section>
            )}

            {details.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-slate-900">
                  Project Details
                </h2>
                <dl className="mt-4 grid gap-x-8 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
                  {details.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0 sm:odd:border-b"
                    >
                      <dt className="text-sm text-slate-500">{label}</dt>
                      <dd className="text-right text-sm font-semibold text-slate-900">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {amenities.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-slate-900">Amenities</h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {amenities.map((amenity) => (
                    <li
                      key={amenity.id}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {amenity.title ||
                        amenity.file?.replace(/[-_]/g, " ") ||
                        "Amenity"}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-slate-900">
                  Project Highlights
                </h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight.id}
                      className="rounded-full bg-[#B68D37]/10 px-4 py-2 text-sm font-semibold text-[#8a682b]"
                    >
                      {highlight.name}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-lg lg:sticky lg:top-6">
            <p className="text-sm font-medium text-slate-500">Price Range</p>
            <p className="mt-2 flex items-center gap-1 text-2xl font-bold text-[#9a7229]">
              {project.min_price && <IndianRupee size={21} />}
              {price}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              *Price may vary. Contact us for latest details.
            </p>

            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="mt-6 w-full rounded-xl bg-[#232833] px-5 py-3 font-semibold text-white transition hover:bg-[#343a46]"
            >
              Enquire Now
            </button>

            <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
              {project.builder?.name && (
                <p className="flex items-center gap-3 text-sm text-slate-600">
                  <Building2 size={18} className="shrink-0 text-[#B68D37]" />
                  <span>
                    <span className="block text-xs text-slate-400">Builder</span>
                    <span className="font-semibold text-slate-800">
                      {project.builder.name}
                    </span>
                  </span>
                </p>
              )}
              {project.bhk && (
                <p className="flex items-center gap-3 text-sm text-slate-600">
                  <BedDouble size={18} className="shrink-0 text-[#B68D37]" />
                  <span>
                    <span className="block text-xs text-slate-400">
                      Configuration
                    </span>
                    <span className="font-semibold text-slate-800">
                      {project.bhk}
                    </span>
                  </span>
                </p>
              )}
              {project.area && (
                <p className="flex items-center gap-3 text-sm text-slate-600">
                  <Ruler size={18} className="shrink-0 text-[#B68D37]" />
                  <span>
                    <span className="block text-xs text-slate-400">Area</span>
                    <span className="font-semibold text-slate-800">
                      {project.area} Sq.Ft.
                    </span>
                  </span>
                </p>
              )}
              {project.possession_date && (
                <p className="flex items-center gap-3 text-sm text-slate-600">
                  <CalendarDays
                    size={18}
                    className="shrink-0 text-[#B68D37]"
                  />
                  <span>
                    <span className="block text-xs text-slate-400">
                      Possession
                    </span>
                    <span className="font-semibold text-slate-800">
                      {formatDate(project.possession_date)}
                    </span>
                  </span>
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        projectId={project.id}
        projectName={project.name}
        projectMinPrice={project.min_price}
      />
    </main>
  );
}
