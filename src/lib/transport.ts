import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeShopUrl, type LeadInput } from "./validate";

export type LeadRecord = { name: string; email: string; shopUrl: string; message: string; source: string; receivedAt: string; id: string };
export type TransportResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };

export function toRecord(i: LeadInput): LeadRecord {
  return {
    id: i.idempotencyKey,
    name: i.name,
    email: i.email,
    shopUrl: normalizeShopUrl(i.shopUrl) ?? "",
    message: i.message ?? "",
    source: i.source ?? "book-demo",
    receivedAt: new Date().toISOString(),
  };
}

/** Succes returneres kun, når transporten faktisk har bekræftet modtagelsen. */
export async function sendLead(rec: LeadRecord, env = process.env): Promise<TransportResult> {
  const mode = env.LEAD_TRANSPORT;
  try {
    if (mode === "file" && env.NODE_ENV !== "production") {
      const dir = path.join(process.cwd(), ".data");
      await fs.mkdir(dir, { recursive: true });
      await fs.appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(rec) + "\n");
      return { ok: true };
    }
    if (mode === "webhook" && env.LEAD_WEBHOOK_URL) {
      const res = await fetch(env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json", ...(env.LEAD_WEBHOOK_SECRET ? { authorization: `Bearer ${env.LEAD_WEBHOOK_SECRET}` } : {}) },
        body: JSON.stringify(rec),
        signal: AbortSignal.timeout(8000),
      });
      return res.ok ? { ok: true } : { ok: false, reason: "failed" };
    }
    return { ok: false, reason: "not_configured" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
