import { describe, it, expect, beforeEach } from "vitest";
import { normalizeShopUrl, leadSchema } from "@/lib/validate";
import { rateLimit, _resetRateLimit } from "@/lib/ratelimit";
import { sendLead } from "@/lib/transport";

describe("normalizeShopUrl", () => {
  it("accepterer domæne uden skema", () => expect(normalizeShopUrl("minshop.dk")).toBe("https://minshop.dk"));
  it("accepterer fuld URL med sti og normaliserer", () => expect(normalizeShopUrl("HTTPS://Shop.Example.com/a?b=1")).toBe("https://shop.example.com"));
  it.each(["", "localhost", "http://127.0.0.1", "ftp://x.dk", "ikke en url", "javascript:alert(1)", "10.0.0.1"])("afviser %s", (v) => expect(normalizeShopUrl(v)).toBeNull());
});

describe("leadSchema", () => {
  const ok = { name: "Anna Hansen", email: "anna@shop.dk", shopUrl: "shop.dk", idempotencyKey: "abcdefgh-1" };
  it("accepterer gyldigt input uden besked", () => expect(leadSchema.safeParse(ok).success).toBe(true));
  it("accepterer almindelige adresser, også gmail", () => expect(leadSchema.safeParse({ ...ok, email: "a.b+c@gmail.com" }).success).toBe(true));
  it("afviser ugyldig e-mail", () => expect(leadSchema.safeParse({ ...ok, email: "anna@" }).success).toBe(false));
  it("kræver ikke telefon/budget/volumen", () => expect(Object.keys(leadSchema.shape)).not.toContain("phone"));
});

describe("rateLimit", () => {
  beforeEach(_resetRateLimit);
  it("blokerer efter grænsen og slipper igen efter vinduet", () => {
    for (let i = 0; i < 5; i++) expect(rateLimit("ip", 5, 1000, 0)).toBe(true);
    expect(rateLimit("ip", 5, 1000, 10)).toBe(false);
    expect(rateLimit("ip", 5, 1000, 2000)).toBe(true);
  });
});

describe("sendLead", () => {
  const rec = { id: "x", name: "A", email: "a@b.dk", shopUrl: "https://b.dk", message: "", source: "t", receivedAt: "" };
  it("returnerer ikke succes uden konfigureret transport", async () => {
    expect(await sendLead(rec, { NODE_ENV: "production" } as unknown as NodeJS.ProcessEnv)).toEqual({ ok: false, reason: "not_configured" });
  });
  it("file-transport er slået fra i produktion", async () => {
    expect((await sendLead(rec, { NODE_ENV: "production", LEAD_TRANSPORT: "file" } as unknown as NodeJS.ProcessEnv)).ok).toBe(false);
  });
});
