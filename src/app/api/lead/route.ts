import { NextResponse } from "next/server";
import { fieldErrors, leadSchema } from "@/lib/validate";
import { rateLimit } from "@/lib/ratelimit";
import { sendLead, toRecord } from "@/lib/transport";

export const runtime = "nodejs";
const done = new Map<string, number>(); // idempotens: samme nøgle = samme svar, ingen dublet

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (!rateLimit(`lead:${ip}`)) {
    return NextResponse.json({ ok: false, error: "Der er sendt for mange forespørgsler. Prøv igen om lidt." }, { status: 429 });
  }
  const text = await req.text();
  if (text.length > 8000) return NextResponse.json({ ok: false, error: "For stor forespørgsel." }, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(text); } catch { return NextResponse.json({ ok: false, error: "Ugyldig forespørgsel." }, { status: 400 }); }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, fields: fieldErrors(parsed.error) }, { status: 422 });
  const input = parsed.data;

  if (input.website) return NextResponse.json({ ok: true }); // honeypot: bots får tavst succes, intet sendes
  if (done.has(input.idempotencyKey)) return NextResponse.json({ ok: true, duplicate: true });

  const result = await sendLead(toRecord(input));
  if (!result.ok) {
    const status = result.reason === "not_configured" ? 503 : 502;
    return NextResponse.json({ ok: false, error: "Vi kunne ikke modtage din forespørgsel lige nu. Skriv i stedet til hello@liros.ai." }, { status });
  }
  done.set(input.idempotencyKey, Date.now());
  if (done.size > 5000) done.delete(done.keys().next().value as string);
  return NextResponse.json({ ok: true });
}
