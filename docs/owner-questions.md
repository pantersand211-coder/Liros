# Spørgsmål til ejeren / afhængigheder

1. **Aktiv bookingadresse.** Den live side peger på en HubSpot-mødeside under en individuel mødeejer (`meetings-eu1.hubspot.com/<medarbejder>/liros-demo-30-min`). Jeg har ikke genbrugt den og kunne ikke teste den (HubSpot er ikke tilladt i sessionens netværk). Hvilken mødeside/team-link er aktiv? Sæt `NEXT_PUBLIC_BOOKING_URL`. Indtil da vises kun forespørgselsformularen.
2. **Lead-destination.** Hvilken mail/CRM/webhook skal formularen sende til? Sæt `LEAD_TRANSPORT=webhook` + `LEAD_WEBHOOK_URL`. Uden den svarer API’et 503 og siden viser ikke succes.
3. **EU-udsagn.** Forsiden siger “Hostet i EU”; Trust Center/Datasikkerhed nævner AWS og OpenAI som underdatabehandlere og SCC. Hvad er korrekt og skal stå på forsiden?
4. **Effektprocenter** (82 %, 91 %, <30 s): målegrundlag, periode, betingelser? Indtil svar bruges de ikke.
5. **Traede og Selveo:** tilgængelige i dag eller på vej?
6. **Godkendelsesscenariet** (ændring af størrelse på ikke afsendt ordre): understøttet funktion? Ellers byttes eksemplet.
7. **Salgsnummer:** live-footeren viser Salg +45 53 56 36 66 og Generelt +45 22 10 82 93; søgeudtræk har vist andre numre. Hvilket er det centrale?
8. **Prøveflow (/try):** kun trin 1 (navn → URL) er set. Hvad er de resterende trin, og kan en “prøve fuldført”-hændelse (`trial_complete`) udsendes fra appen/backend?
9. **Satoshi-licens:** skriftfilen er hentet fra liros.ai’s egen `/fonts`. Bekræft brugsret ved produktion.
10. **Sprog:** DA/EN/NO/SE/DE findes på liros.ai (`/`, `/en`, `/no`, `/se`, `/de`). Skal øvrige sprog genopbygges i dette projekt, eller bevares eksisterende sider? Se README.
11. **Pris/vilkår:** må “fast månedlig pris ud fra ticketvolumen” fremhæves offentligt i FAQ’en?
12. **CMP:** live bruger Usercentrics. Den indbyggede samtykke-shim skal erstattes.
