import { z } from "zod";

/** Normaliserer en webshop-adresse til https://host. Returnerer null hvis ugyldig. Ingen hentning sker. */
export function normalizeShopUrl(input: string): string | null {
  let v = input.trim();
  if (!v || /\s/.test(v)) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(v)) v = "https://" + v;
  let u: URL;
  try { u = new URL(v); } catch { return null; }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const h = u.hostname.toLowerCase();
  if (!h.includes(".") || h.endsWith(".") || h === "localhost") return null;
  if (/^\d+(\.\d+){3}$/.test(h) || h.includes(":")) return null; // ingen IP-adresser
  if (!/^[a-z0-9æøå.-]+$/i.test(h) && !/^xn--/.test(h)) return null;
  return `https://${h}`;
}

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Skriv dit navn").max(100, "Navnet er for langt"),
  email: z.string().trim().max(200, "E-mailadressen er for lang").pipe(z.email("Skriv en gyldig e-mailadresse")),
  shopUrl: z.string().trim().max(300).refine((v) => normalizeShopUrl(v) !== null, "Skriv webshoppens adresse, fx minshop.dk"),
  message: z.string().trim().max(1000, "Beskeden er for lang (maks. 1000 tegn)").optional().default(""),
  website: z.string().optional().default(""), // honeypot
  idempotencyKey: z.string().min(8).max(64),
  source: z.string().max(40).optional().default("book-demo"),
});
export type LeadInput = z.infer<typeof leadSchema>;

export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of err.issues) {
    const k = String(i.path[0] ?? "form");
    if (!out[k]) out[k] = i.message;
  }
  return out;
}
