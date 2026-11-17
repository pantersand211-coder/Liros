# Måleplan

**Baseline:** ingen adgang til analytics, CRM eller salgsdata. Ingen baseline, ingen konklusion om løft. Alle ændringer er forbedringshypoteser.

## Hændelser (`src/lib/analytics.ts`)
| Hændelse | Udløses | Bemærkning |
|---|---|---|
| `cta_click` | Klik på CTA (placement, cta_type, lang) | Ikke en booking |
| `product_demo_interaction` | Scenarievalg, afspil, næste, start forfra | |
| `booking_page_view` | Åbning af /book-demo (én gang pr. sidevisning) | |
| `booking_provider_open` | Kalender indlæst / åbnet eksternt | Ikke en booking |
| `booking_confirmed` | **Kun** ved postMessage `meetingBookSucceeded` fra HubSpot-oprindelse | Ikke testet mod live kalender. Verificér, eller brug HubSpot-webhook/takkeside |
| `lead_form_submit_success` | Kun efter backendens bekræftelse | Forespørgsel ≠ booking |
| `trial_start` | Klik på “Start prøven i appen” | Marketingsiden kan ikke se, hvad der sker i appen |
| `trial_complete` | **Ikke implementeret** her – skal sendes fra appen/backend | |

Persondata (navn, e-mail, URL, besked) og rå querystrings sendes aldrig. Kun en fast tilladelsesliste af nøgler. Videresendelse til `dataLayer` sker kun med samtykke. Dobbelttælling forhindres via `once`-nøgler.

## Tragt og rater at følge
besøg → CTA-klik (booking) → book-demo-visning → kalender åbnet → **bekræftet booking** → afholdt møde → relevant lead → salg. Parallelt: formularforespørgsel → besvaret → booket. Prøve: klik → start → fuldført.
Andel relevante leads, fremmøde og senere salg kræver CRM-data.

## Prioriterede hypoteser
1. Heroens kategori + overskrift (variant A/B/C i `copy-variants.md`).
2. CTA-tekst og tydelig forskel booking vs. prøve.
3. Bookingfriktion: kalender på forhånd vs. bag samtykke; formularens felter.
A/B-test kun hvis trafikken kan give meningsfulde forskelle i bookinger; ellers sekventielle ændringer og kvalitativ læring.
