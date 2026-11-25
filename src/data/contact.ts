export interface ContactOffice {
  eyebrow: string;
  name: string;
  address: string;
  phone: string;
  phoneHref: string;
  hours: string;
  directions: string;
}

export const contactPageData = {
  hero: {
    eyebrow: "Contact Us",
    titleBeforeHighlight: "Let's Find Your",
    titleHighlight: " Perfect Property",
    description:
      "Connect with SS Prime Infra at our corporate offices in Gurgaon and Pune. Our property advisors are ready to welcome you.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600",
    consultationLabel: "Schedule Consultation",
  },
  locations: {
    eyebrow: "Our Locations",
    title: "Visit Our Corporate Offices",
  },
  getInTouch: {
    eyebrow: "Contact Information",
    title: "Get In Touch",
    description:
      "Our experienced property consultants are always available to help you find the perfect residential or commercial property.",
    cards: [
      {
        title: "Call Us",
        description: "Speak directly with our property advisors.",
        value: "+91 92360 79765",
        href: "tel:+919236079765",
        type: "phone",
      },
      {
        title: "Email Us",
        description: "Send us your property requirements.",
        value: "info@ssprimeinfra.com",
        href: "mailto:info@ssprimeinfra.com",
        type: "email",
      },
      {
        title: "Visit Office",
        description: "Gurgaon & Pune Offices",
        value: "Open 7 Days",
        href: "/contact",
        type: "office",
      },
      {
        title: "Working Hours",
        description: "Monday - Sunday",
        value: "9:00 AM - 7:00 PM",
        href: null,
        type: "hours",
      },
    ],
  },
  consultation: {
    backgroundImage: "https://ssprimeinfra.com/img/form/form.png",
    eyebrow: "Contact Our Experts",
    titleBeforeHighlight: "Looking For",
    titleHighlight: "Dream Property",
    description:
      "We believe buying a property is more than just a transaction—it's a life-changing decision. Our mission is to simplify the journey by offering trusted guidance, verified projects, and complete transparency at every stage.",
    supportingText:
      "From luxury residences and premium commercial spaces to high-return investment opportunities, our experienced advisors ensure every client finds the perfect property with complete confidence and peace of mind.",
    formTitle: "Schedule Free Consultation",
    submitLabel: "Schedule Now",
    cities: ["Gurugram", "Pune"],
    budgets: [
      "Flexible",
      "Under ₹50 Lakhs",
      "₹50 Lakhs - ₹1 Crore",
      "₹1 Crore - ₹2 Crore",
      "₹2 Crore - ₹3 Crore",
      "₹3 Crore - ₹5 Crore",
      "₹5 Crore+",
    ],
    successMessage:
      "Your enquiry has been submitted successfully. Our team will contact you shortly.",
  },
  offices: [
    {
      eyebrow: "NCR Headquarters",
      name: "Gurgaon Office",
      address:
        "SS Prime Infra Pvt Ltd, Ground Floor, Block-D, Pioneer Urban Square, Office No. 006, Sector 62, Gurugram, Haryana 122098",
      phone: "+91 92360 79765",
      phoneHref: "tel:+919236079765",
      hours: "9 AM - 7 PM (Daily)",
      directions:
        "https://www.google.com/maps/search/?api=1&query=SS+Prime+Infra+Gurgaon",
    },
    {
      eyebrow: "Western India Hub",
      name: "Pune Office",
      address:
        "Office No. 410, ICON Towers, Survey Number 83/1, Near Kasturi Chowk, Wakad, Pune, Maharashtra 411057",
      phone: "+91 92360 79765",
      phoneHref: "tel:+919236079765",
      hours: "9 AM - 7 PM (Daily)",
      directions:
        "https://www.google.com/maps/search/?api=1&query=SS+Prime+Infra+Pune",
    },
  ] satisfies ContactOffice[],
  email: {
    label: "Email Us",
    address: "info@ssprimeinfra.com",
    href: "mailto:info@ssprimeinfra.com",
  },
  enquiryLabel: "Talk to a Property Advisor",
};
