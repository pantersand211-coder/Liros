# Liros – ny hjemmeside (prototype)

Selvstændig Next.js-prototype (App Router, TypeScript, ren CSS) baseret på observationer af liros.ai (17.11.2026). Ændrer ikke produktion, domæne eller appen.

## Kom i gang
```bash
npm install
cp .env.example .env.local   # udfyld efter behov
npm run dev                  # http://localhost:3000
npm run build && npm start
```
Tests: `npm run typecheck`, `npm test` (enhedstests), og med dev-serveren kørende `npm run test:e2e` (Playwright-flowtest; bruger testtransport, sender ingen mails, booker intet).

## Struktur
- `src/content/` – tekster (`da.ts`), konfiguration/links (`site.ts`), integrationer (`integrations.ts`). Nye sprog = ny indholdsfil.
- `src/components/` – Demo, HeroCard, LeadForm, BookingEmbed, Header m.fl.
- `src/app/api/lead/route.ts` – serverside validering, honeypot, rate-limit, idempotens. Succes først efter transportens bekræftelse.
- `src/lib/analytics.ts` – hændelser uden persondata, samtykkestyret. `docs/measurement-plan.md`.
- `docs/` – claim-register, ejerspørgsmål, måleplan, hero-varianter, designrationale, screenshots.

## Sider
`/`, `/product`, `/product/integrations`, `/book-demo`, `/try`. `/video` redirecter permanent til `/#eksempel` (live siden siger “kommer snart”). Om os, blog, sammenligning, Trust Center, vilkår, privatliv, datasikkerhed og eksisterende sprogsider (`/en`, `/no`, `/se`, `/de` på liros.ai) er **ikke genbygget**; der linkes til `NEXT_PUBLIC_LEGACY_BASE`. Ved udrulning på samme domæne skal de eksisterende ruter bevares (rewrites/proxy) – beslutning for ejeren.

## Booking
`NEXT_PUBLIC_BOOKING_URL` skal sættes til den **aktive** mødeside (ikke en tidligere medarbejders). Er den tom, vises kun forespørgselsformularen. Kalenderen indlæses først efter samtykke/klik, har reserveret højde og et direkte eksternt link.
Begrænsning: en cross-origin iframe kan ikke fejldetekteres sikkert fra siden, så der vises altid link og formular. `booking_confirmed` lytter på HubSpots postMessage (`meetingBookSucceeded`) – **ikke testet mod live kalender**.

## Prøveflow
`/try` er en ærlig indgangsside med link til det eksisterende flow (`NEXT_PUBLIC_TRIAL_URL`). Flowet selv er ikke genskabt (kun trin 1 observeret; ingen backendadgang). `trial_complete` skal sendes fra appen.

## Hvad er verificeret, og hvad er ikke
Verificeret her: build, typer, 16 enhedstests, 30 flowtest-tjek (demo, formular, dobbeltklik, honeypot, rate-limit, samtykke, menu/fokus, FAQ, reduced motion, 360 px uden vandret scroll), screenshots ved 360/390/768/1280/1536 i `docs/screenshots/`.
Ikke verificeret: live HubSpot-kalender, lead-webhook mod rigtigt CRM, rigtigt prøveflow, analytics/baseline, Lighthouse/Core Web Vitals (ikke målt), WCAG-audit (kun manuel gennemgang af semantik, fokus, kontrast-tokens), hreflang/flersprogethed, konkurrentudsagn (ingen sammenligningsside bygget).
Rate-limit og idempotens ligger i hukommelsen – brug delt lager ved flere instanser. Samtykke er en shim, der skal erstattes af Usercentrics.
