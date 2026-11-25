import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function AboutUs() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FFFDF9] to-[#FFFDF9] py-8 md:py-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/20 blur-3xl md:size-[600px]"
      />

      <img
        src="/img/about/leaf_decor_bottom_left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -left-6 z-10 w-44 select-none opacity-90 drop-shadow-md sm:-left-10 sm:w-60 md:w-72 lg:w-96"
      />
      <img
        src="/img/about/leaf_decor_bottom_right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -right-6 z-10 w-44 select-none opacity-90 drop-shadow-md sm:-right-10 sm:w-60 md:w-72 lg:w-96"
      />

      <div className="relative z-20 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center justify-around gap-8 md:flex-row lg:gap-12">
          <div className="w-full space-y-5 lg:w-1/2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#C59B27] sm:text-sm">
                About Us
              </span>
              <span className="h-[2px] w-8 bg-[#C59B27]" />
            </div>

            <h2 className="text-[1.6rem] font-bold leading-[1.18] text-[#111827] md:text-4xl lg:text-5xl">
              Creating Exceptional
              <br className="hidden sm:inline" />
              <span className="text-[#B68D37]">
                {" "}
                Real Estate Experiences
              </span>
            </h2>

            <p className="mb-0 max-w-2xl text-sm font-normal leading-relaxed text-slate-600 md:text-base">
              At{" "}
              <strong className="font-semibold text-slate-900">
                SS Prime Infra
              </strong>
              , we believe buying a property is more than just a transaction—it's
              a life-changing decision.
            </p>

            <div
              id="about-more"
              aria-hidden={!expanded}
              className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
                expanded
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-2xl pt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  Our mission is to simplify the journey by offering trusted
                  guidance, verified projects, and complete transparency at
                  every stage. From luxury residences and premium commercial
                  spaces to high-return investment opportunities, our
                  experienced advisors ensure every client finds the perfect
                  property with complete confidence and peace of mind.
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="about-more"
              onClick={() => setExpanded((previous) => !previous)}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-amber-500/20 bg-[#161B22] p-2 text-[0.7rem] font-medium text-white shadow-md transition-all duration-300 hover:bg-[#232936] hover:shadow-xl md:px-6 md:py-3"
            >
              {expanded ? "Read Less" : "Read More"}
              <ArrowRight
                size={16}
                className={`transition-transform duration-300 group-hover:translate-x-1 ${
                  expanded ? "rotate-180 group-hover:translate-x-[-4px]" : ""
                }`}
              />
            </button>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5 sm:aspect-[16/11] lg:h-[400px] lg:aspect-auto">
              <img
                src="/img/about/about.webp"
                alt="SS Prime Infra office"
                className="size-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
