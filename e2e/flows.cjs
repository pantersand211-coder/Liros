// Flowtest mod kørende dev-server (LEAD_TRANSPORT=file). Kør: npm run dev & npm run test:e2e
const { chromium } = require("playwright");
const fs = require("fs");
const BASE = process.env.BASE || "http://localhost:3000";
const leadsFile = ".data/leads.jsonl";
const count = () => (fs.existsSync(leadsFile) ? fs.readFileSync(leadsFile, "utf8").trim().split("\n").filter(Boolean).length : 0);
let fails = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fails++; };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  const errors = []; p.on("console", (m) => m.type() === "error" && errors.push(m.text())); p.on("pageerror", (e) => errors.push(String(e)));
  await p.addInitScript(() => { window.__ev = []; window.addEventListener("liros:track", (e) => window.__ev.push(e.detail)); });

  // Redirect
  const r = await p.goto(BASE + "/video"); ok(p.url().endsWith("/#eksempel"), "/video redirecter til /#eksempel");

  // Forside + demo
  await p.goto(BASE + "/"); 
  ok(await p.locator("h1").count() === 1, "én h1 på forsiden");
  for (const s of ["Ordrestatus", "Returspørgsmål", "Produktspørgsmål", "Kræver godkendelse"]) {
    await p.getByRole("button", { name: s }).click();
    ok(await p.locator(".demo .window").getAttribute("aria-label") === "Eksempel: " + s, "scenarie: " + s);
  }
  ok(await p.getByText("Afventer en medarbejder").isVisible(), "godkendelsesscenarie viser afventer, ikke sendt");
  await p.getByRole("button", { name: "Start forfra" }).click();
  ok(await p.locator(".dstep.off").count() === 3, "Start forfra viser kun trin 1");
  await p.getByRole("button", { name: "Næste" }).click();
  ok(await p.locator(".demo .dstep.on").count() === 2, "Næste går ét trin frem");
  await p.getByRole("button", { name: "Afspil eksempel" }).click();
  await p.waitForFunction(() => document.querySelectorAll(".demo .dstep.on").length === 4, null, { timeout: 8000 });
  ok(true, "Afspil eksempel når trin 4");
  const demoEv = await p.evaluate(() => window.__ev.filter((e) => e.event === "product_demo_interaction").map((e) => e.action));
  ok(["select", "play", "next", "restart"].every((a) => demoEv.includes(a)), "demo-events: " + [...new Set(demoEv)].join(","));

  // CTA events + hierarki
  await p.getByRole("link", { name: "Book en demo" }).first().click(); await p.waitForURL("**/book-demo");
  const cta = await p.evaluate(() => window.__ev.filter((e) => e.event === "cta_click"));
  ok(cta.length >= 1 && cta[0].placement === "nav" && cta[0].cta_type === "book", "cta_click nav/book");

  // Booking: uden konfigureret adresse -> tydelig fallback, ingen falsk kalender
  ok(await p.getByText("Online booking er ikke tilgængelig").isVisible(), "booking uden adresse viser ærlig fallback");
  // Cookiebanner
  ok(await p.getByRole("button", { name: "Kun nødvendige" }).isVisible(), "cookiebanner vises");
  await p.getByRole("button", { name: "Kun nødvendige" }).click();
  await p.evaluate(() => { window.dataLayer = []; });

  // Formular: validering
  await p.getByRole("button", { name: "Send forespørgsel" }).click();
  ok(await p.getByText("Skriv dit navn").isVisible() && await p.getByText("Skriv en gyldig e-mailadresse").isVisible(), "klient-validering viser fejl");
  const before = count();
  await p.getByLabel("Navn").fill("Test Testesen");
  await p.getByLabel("E-mail").fill("test@gmail.com");
  await p.getByLabel("Webshop-adresse").fill("testshop.dk");
  // dobbeltklik
  await p.getByRole("button", { name: "Send forespørgsel" }).dblclick();
  await p.getByText("Forespørgsel modtaget.").waitFor();
  ok(count() === before + 1, "dobbeltklik giver præcis ét lead (" + (count() - before) + ")");
  ok(await p.getByText("Der er ikke booket et mødetidspunkt").isVisible(), "succes adskiller forespørgsel fra booking");
  const lead = await p.evaluate(() => window.__ev.filter((e) => e.event === "lead_form_submit_success"));
  ok(lead.length === 1, "lead_form_submit_success sendt én gang");
  ok(!JSON.stringify(await p.evaluate(() => window.__ev)).match(/test@gmail|testshop|Testesen/), "ingen persondata i events");
  ok((await p.evaluate(() => window.dataLayer.length)) === 0, "ingen dataLayer uden samtykke");

  // API direkte: honeypot, 422, 503-logik via ugyldig, rate-limit
  const post = (body) => p.request.post(BASE + "/api/lead", { data: body, headers: { "x-forwarded-for": "9.9.9.9" } });
  const hp = await post({ name: "Bot Bot", email: "b@b.dk", shopUrl: "b.dk", idempotencyKey: "honeypot-1", website: "x" });
  ok(hp.ok() && count() === before + 1, "honeypot: intet gemmes");
  const bad = await post({ name: "A", email: "x", shopUrl: "", idempotencyKey: "bad-key-12" });
  ok(bad.status() === 422, "server afviser ugyldigt input (422)");
  let limited = false; for (let i = 0; i < 8; i++) { const x = await post({ name: "Rate Limit", email: "r@r.dk", shopUrl: "r.dk", idempotencyKey: "rl-key-" + i + "xx" }); if (x.status() === 429) limited = true; }
  ok(limited, "rate-limit slår til (429)");
  fs.writeFileSync(leadsFile, fs.readFileSync(leadsFile, "utf8").split("\n").filter((l) => !l.includes("r@r.dk") && !l.includes("Rate Limit")).join("\n")); // ryd testdata

  // Samtykke "alle" -> dataLayer får events
  const p2 = await (await b.newContext()).newPage();
  await p2.goto(BASE + "/"); await p2.getByRole("button", { name: "Acceptér alle" }).click();
  await p2.getByRole("link", { name: "Prøv Liros selv" }).first().click(); await p2.waitForURL("**/try");
  ok((await p2.evaluate(() => (window.dataLayer || []).some((e) => e.event === "cta_click"))), "events videresendes efter samtykke");
  ok(await p2.getByText("Helt gratis · Intet kort · Ingen binding").isVisible(), "/try viser eksisterende vilkår");

  // Mobil: menu + fokus + overflow
  const m = await (await b.newContext({ viewport: { width: 360, height: 780 } })).newPage();
  await m.goto(BASE + "/"); await m.getByRole("button", { name: "Kun nødvendige" }).click();
  await m.getByRole("button", { name: "Åbn menu" }).click();
  ok(await m.locator("#mobile-menu a").first().evaluate((e) => e === document.activeElement), "menu flytter fokus ind");
  await m.keyboard.press("Escape");
  ok(await m.getByRole("button", { name: "Åbn menu" }).evaluate((e) => e === document.activeElement), "Escape lukker og returnerer fokus");
  ok((await m.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 0, "ingen vandret scroll på 360px");
  // FAQ
  await m.locator(".faq summary").first().click();
  ok(await m.locator(".faq details").first().evaluate((e) => e.open), "FAQ åbner");
  // Reduced motion
  const rm = await (await b.newContext({ reducedMotion: "reduce" })).newPage();
  await rm.goto(BASE + "/"); ok((await rm.locator(".dstep").first().evaluate((e) => getComputedStyle(e).transitionDuration)) === "0s", "reduced motion fjerner overgange");

  ok(errors.filter((e) => !/favicon|hot-update|Failed to load resource/.test(e)).length === 0, "ingen konsolfejl: " + errors.join(" | ").slice(0, 200));
  await b.close();
  console.log(fails ? `\n${fails} FEJL` : "\nAlle flowtests bestået"); process.exit(fails ? 1 : 0);
})();
