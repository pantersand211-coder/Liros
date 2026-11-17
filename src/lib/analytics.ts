import { getConsent } from "./consent";

export type EventName =
  | "cta_click" | "product_demo_interaction" | "booking_page_view" | "booking_provider_open"
  | "booking_confirmed" | "lead_form_submit_success" | "trial_start" | "trial_complete";

// Kun disse nøgler sendes. Aldrig navne, e-mails, URL'er, beskeder eller rå querystrings.
const ALLOWED = ["placement", "cta_type", "lang", "scenario", "action", "source"] as const;
type Props = Partial<Record<(typeof ALLOWED)[number], string>>;

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

const fired = new Set<string>();

/** `once` forhindrer dobbelttælling (fx booking_confirmed, booking_page_view). */
export function track(name: EventName, props: Props = {}, once?: string) {
  if (typeof window === "undefined") return;
  if (once) {
    if (fired.has(once)) return;
    fired.add(once);
  }
  const clean: Record<string, string> = { lang: "da" };
  for (const k of ALLOWED) if (props[k]) clean[k] = String(props[k]).slice(0, 64);
  // Lokal hændelse til test/debug – ikke tracking i sig selv.
  window.dispatchEvent(new CustomEvent("liros:track", { detail: { event: name, ...clean } }));
  // Videresend kun til analytics, hvis brugeren har givet samtykke.
  if (getConsent() === "all") {
    (window.dataLayer = window.dataLayer || []).push({ event: name, ...clean });
  }
}
