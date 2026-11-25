const stats = [
  { value: "2000", accent: "+", label: "Happy Customers" },
  { value: "500", accent: "+", label: "Associates" },
  { value: "100", accent: "%", label: "Transparency" },
  { value: "24", accent: "×", ending: "7", label: "Customer Support" },
];

export function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FFFDF9] to-[#FFFDF9] py-10 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/20 blur-3xl md:size-[600px]"
      />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[4px] text-[#B68D37] md:text-sm">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-[1.6rem] font-bold leading-[1.18] text-[#111827] md:mt-5 lg:text-5xl">
            More Than <span className="text-[#B68D37]">Property.</span>
            <br />
            Built on Trust.
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)] md:min-h-34 md:p-8"
            >
              <svg
                aria-hidden="true"
                className="why-choose-wave pointer-events-none absolute bottom-0 left-0 h-[85%] w-[200%]"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`why-choose-wave-${index}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#B68D37" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#B68D37" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40 T1500 40 T1800 40 L1800 120 L0 120 Z"
                  fill={`url(#why-choose-wave-${index})`}
                />
              </svg>

              <div
                aria-hidden="true"
                className={`absolute -right-10 -top-10 z-0 size-28 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                  index === 3 ? "bg-amber-50/50" : "bg-emerald-50/50"
                }`}
              />

              <div className="relative z-10">
                <p className="text-xl font-medium tracking-tight text-slate-900 md:text-5xl ">
                  {stat.value}
                  <span className="text-[#B68D37]">{stat.accent}</span>
                  {stat.ending}
                </p>
                <p className="mt-1 text-[9px] font-medium text-slate-500 md:mt-3 md:text-lg">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
