import { useState } from "react";
import { Clock3, Mail, MapPin, Phone, Building2 } from "lucide-react";

import Header from "../../components/header";
import EnquiryModal from "../../components/enquiry/components/enquiry-modal";
import ContactEnquiryForm from "../../components/contact-enquiry-form";
import { contactPageData } from "@/data/contact";

export default function Contact() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <Header />

      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-slate-950 px-5 pb-14 pt-32 md:min-h-[480px] md:px-8 md:pb-20">
        <img
          src={contactPageData.hero.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
        <div className="relative mx-auto w-full max-w-[1440px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-[#D3B267]">
            {contactPageData.hero.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            {contactPageData.hero.titleBeforeHighlight}
            <span className="text-[#D3B267]">
              {contactPageData.hero.titleHighlight}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
            {contactPageData.hero.description}
          </p>
          <button
            type="button"
            onClick={() => setEnquiryOpen(true)}
            className="mt-7 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-100"
          >
            {contactPageData.hero.consultationLabel}
          </button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 md:py-20">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-gold">
            {contactPageData.getInTouch.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
            {contactPageData.getInTouch.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            {contactPageData.getInTouch.description}
          </p>
        </div>

        <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactPageData.getInTouch.cards.map((card) => {
            const Icon =
              card.type === "phone"
                ? Phone
                : card.type === "email"
                  ? Mail
                  : card.type === "office"
                    ? Building2
                    : Clock3;
            const content = (
              <>
                <span className="flex size-12 items-center justify-center rounded-full bg-[#F7F0DE] text-gold">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {card.description}
                </p>
                <p className="mt-4 font-semibold text-slate-900">
                  {card.value}
                </p>
              </>
            );

            return card.href ? (
              <a
                key={card.title}
                href={card.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_45px_-25px_rgba(15,23,42,0.45)]"
              >
                {content}
              </a>
            ) : (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                {content}
              </article>
            );
          })}
        </div>

        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-gold">
            {contactPageData.locations.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
            {contactPageData.locations.title}
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {contactPageData.offices.map((office) => (
            <article
              key={office.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] md:p-8"
            >
              <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <iframe
                  title={`${office.name} location map`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    office.address,
                  )}&z=15&output=embed`}
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {office.name}
              </h3>

              <div className="mt-7 space-y-5 text-sm text-slate-600">
                <div className="flex gap-3">
                  <MapPin
                    size={19}
                    className="mt-0.5 shrink-0 text-gold"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="mb-1 block font-semibold text-slate-900">
                      Address
                    </span>
                    <p className="leading-6">{office.address}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between">
                  <a
                    href={office.phoneHref}
                    className="flex items-top  gap-3 transition hover:text-gold"
                  >
                    <Phone size={18} className="shrink-0 text-gold" />
                    <div>
                      <span className="mb-1 block font-semibold text-slate-900">
                        Phone
                      </span>
                      {office.phone}
                    </div>
                  </a>

                  <a
                    href={office.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gold"
                  >
                    Get {office.name === "Gurgaon Office" ? "Gurgaon" : "Pune"}{" "}
                    Directions
                  </a>

                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-2xl bg-slate-900 px-6 py-7 text-white md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            <Mail size={22} className="shrink-0 text-[#D3B267]" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">
                {contactPageData.email.label}
              </p>
              <a
                href={contactPageData.email.href}
                className="mt-1 block font-semibold transition hover:text-[#D3B267]"
              >
                {contactPageData.email.address}
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEnquiryOpen(true)}
            className="rounded-lg border border-[#D3B267] px-5 py-3 text-sm font-semibold text-[#D3B267] transition hover:bg-[#D3B267] hover:text-slate-950"
          >
            {contactPageData.enquiryLabel}
          </button>
        </div>
      </section>

      <ContactEnquiryForm />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </main>
  );
}
