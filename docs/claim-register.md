# Claim-register

Status: **Bekræftet** = kan ses som produktfunktion/tekst på liros.ai og er brugt i neutral form · **Eksisterende påstand** = findes på liros.ai, ikke uafhængigt verificeret · **Afventer ejer**.
Observeret 2026-11-17 på liros.ai (hentet via HTTP fra sessionen). Live-konto, appen og analytics er ikke undersøgt.

| # | Påstand | Kilde | Betingelser | Status | Bruges |
|---|---|---|---|---|---|
| 1 | Demo er 30 minutter og uforpligtende | /book-demo | Mødelængde må ikke ændres uden ejer | Bekræftet (offentlig tekst) | Hero-mikrotekst, book-demo, afslutning |
| 2 | Liros bruger data fra webshop og tilkoblede systemer; menneske kan tage over | Opgavebeskrivelse + /product | – | Bekræftet (produktbeskrivelse) | Hero, kontrol |
| 3 | Handlinger kan kræve godkendelse (“Handling kræver godkendelse”, “Godkend & send svar”) | Produktvisning på forsiden | Afhænger af opsætning. Scenariet “størrelsesændring” er fiktivt og skal bekræftes som understøttet ordreændring | Afventer ejer (scenarie) | Demo scenarie 4, kontrol-udsnit |
| 4 | Ordrestatus, retur, produktspørgsmål håndteres | /product | Retur: start af retur “når retursystem er koblet på” | Bekræftet (offentlig tekst) | Demo, anvendelser, /product |
| 5 | Liros besvarer uden for åbningstid | /product (“dag og nat”), /product/ai-agent | – | Bekræftet (tekst). Brugt som “også uden for åbningstid” | Anvendelser |
| 6 | Integrationer: Shopify, WooCommerce, Magento, PostNord, DAO, Shipmondo, PeakWMS tilgængelige | /product/integrations | – | Bekræftet (tekst) | Forside, /product/integrations |
| 7 | Smartpack, Reversio, Float er “på vej” | /product/integrations | Vises som ikke-brugbare | Bekræftet (tekst) | Samme |
| 8 | Traede og Selveo tilgængelige? | /product/integrations (“plus Traede og Selveo”) | Teksten er flertydig | **Afventer ejer** – skjult som standard | Skjult (`verified:false`) |
| 9 | Specialintegrationer uden ekstra omkostning | /book-demo, /product/integrations | Gælder “nuværende aftale” | Eksisterende påstand – **ikke brugt** i ny tekst (vi lover ikke tidsplan/gratis udvikling) | Ikke brugt |
| 10 | ~5–10 min pr. integration at forbinde | /book-demo, /product/integrations | Kun selve forbindelsen, “når vi er inde” | Eksisterende påstand | FAQ “Hvad kræver opstart” (med forbehold) |
| 11 | Fast månedlig pris ud fra ticketvolumen; ticket = én løst henvendelse; ingen onboarding-gebyrer | /book-demo FAQ | Skal matche aktuelle vilkår | Eksisterende påstand (pris-del brugt; gebyr-del ikke brugt) | FAQ pris |
| 12 | “Helt gratis · Intet kort · Ingen binding” | /try | Skal matche gældende vilkår | Eksisterende påstand (citeret som på /try) | /try |
| 13 | Kundedata behandles i EU; ikke brugt til at træne eksterne AI-modeller; overførsel uden for EU/EØS kun for bestemte underdatabehandlere med SCC | /trust | – | Eksisterende påstand, gengivet med Trust Centers forbehold | Kontrol-sektion |
| 14 | **“Hostet i EU”** (forside) vs. underdatabehandlere AWS og OpenAI m.fl. | / vs. /data-security | **Uoverensstemmelse** | **Afklares** (se ejer-spørgsmål). Ny tekst bruger Trust Centers formulering, ikke “Hostet i EU” | – |
| 15 | “Efterlever GDPR og EU’s AI-forordning” | /, /trust | Ikke certificering | Ikke brugt i ny tekst | – |
| 16 | “82 % løses uden en person”, “91 % af ordrestatus”, “første svar under 30 sek.” | /product, /product/ai-agent, /customer-support | Målegrundlag/periode ukendt | Eksisterende påstand – **ikke brugt** | – |
| 17 | “Alle sprog, kunden skriver på”; kanaler e-mail, chat, Instagram | /product | – | Ikke brugt | – |
| 18 | Demo-eksempler (Nordlys Hjem, Karen D. m.fl.) | Fiktive | Markeret “fiktive data” | Illustration | Hero, demo, kontrol |
