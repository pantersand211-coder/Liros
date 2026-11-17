// Minimal samtykke-shim. I produktion erstattes den af den eksisterende CMP (Usercentrics, observeret på liros.ai).
export type Consent = "all" | "necessary" | null;
const KEY = "liros_consent";
export const CONSENT_EVENT = "liros:consent";

export function getConsent(): Consent {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}
export function setConsent(v: Exclude<Consent, null>) {
  try { window.localStorage.setItem(KEY, v); } catch { /* ignorér */ }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}
