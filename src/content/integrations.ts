// Kilde: liros.ai/product/integrations (observeret 17.11.2026).
// `verified:false` vises KUN ved SHOW_UNVERIFIED_INTEGRATIONS=1 (intern review).
export type Integration = { name: string; role: "Webshop" | "Fragt" | "Lager" | "Returer"; status: "available" | "planned"; verified: boolean };

export const integrations: Integration[] = [
  { name: "Shopify", role: "Webshop", status: "available", verified: true },
  { name: "WooCommerce", role: "Webshop", status: "available", verified: true },
  { name: "Magento", role: "Webshop", status: "available", verified: true },
  { name: "PostNord", role: "Fragt", status: "available", verified: true },
  { name: "DAO", role: "Fragt", status: "available", verified: true },
  { name: "Shipmondo", role: "Fragt", status: "available", verified: true },
  { name: "PeakWMS", role: "Lager", status: "available", verified: true },
  { name: "Smartpack", role: "Lager", status: "planned", verified: true },
  { name: "Reversio", role: "Returer", status: "planned", verified: true },
  { name: "Float", role: "Returer", status: "planned", verified: true },
  // Teksten "plus Traede og Selveo" er flertydig. Afventer ejerbekræftelse.
  { name: "Traede", role: "Returer", status: "available", verified: false },
  { name: "Selveo", role: "Returer", status: "available", verified: false },
];

export const roles = ["Webshop", "Fragt", "Lager", "Returer"] as const;
