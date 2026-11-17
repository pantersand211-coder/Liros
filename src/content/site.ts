// Central konfiguration. Ingen secrets her – kun offentlige værdier.
const env = process.env;

export const site = {
  url: env.NEXT_PUBLIC_SITE_URL || "https://liros.ai",
  lang: "da",
  /** Aktiv bookingadresse. Tom = ingen indlejret kalender (se README). */
  bookingUrl: env.NEXT_PUBLIC_BOOKING_URL || "",
  trialUrl: env.NEXT_PUBLIC_TRIAL_URL || "https://liros.ai/try",
  loginUrl: env.NEXT_PUBLIC_APP_LOGIN_URL || "",
  legacyBase: (env.NEXT_PUBLIC_LEGACY_BASE || "https://liros.ai").replace(/\/$/, ""),
  contact: {
    // Observeret i live-footer 17.11.2026. Salgsnummer skal bekræftes (se docs/owner-questions.md).
    email: "hello@liros.ai",
    salesPhone: "+45 53 56 36 66",
    salesPhoneHref: "tel:+4553563666",
  },
  demoMinutes: 30, // book-demo-siden beskriver 30 min. Ændres ikke uden ejergodkendelse.
} as const;

export const legacy = (path: string) => `${site.legacyBase}${path}`;

export const nav = [
  { label: "Produkt", href: "/product" },
  { label: "Integrationer", href: "/product/integrations" },
  { label: "Tryghed", href: "/#kontrol" },
  { label: "Prøv selv", href: "/try" },
] as const;

export const footer = {
  product: [
    { label: "Produkt", href: "/product" },
    { label: "Integrationer", href: "/product/integrations" },
    { label: "Prøv Liros selv", href: "/try" },
    { label: "Sammenlign", href: legacy("/compare"), external: true },
  ],
  company: [
    { label: "Om os", href: legacy("/about"), external: true },
    { label: "Blog", href: legacy("/blog"), external: true },
    { label: "Trust Center", href: legacy("/trust"), external: true },
  ],
  legal: [
    { label: "Handelsbetingelser", href: legacy("/terms"), external: true },
    { label: "Privatlivspolitik", href: legacy("/privacy"), external: true },
    { label: "Datasikkerhed", href: legacy("/data-security"), external: true },
  ],
};
