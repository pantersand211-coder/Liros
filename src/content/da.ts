// Dansk indhold. Adskilt fra komponentlogik, så andre sprog kan tilføjes som fx en.ts.
// Påstande her skal være registreret i docs/claim-register.md.

export const hero = {
  overline: "AI-kundeservice til webshops",
  title: "Giv de gentagne spørgsmål videre.",
  lead: "Liros bruger data fra jeres webshop og de tilkoblede systemer til at besvare kundernes spørgsmål. Jeres team kan følge med og tage over, når der er brug for det.",
  primary: "Book en demo",
  secondary: "Prøv Liros selv",
  micro: "Demo: 30 minutter, uforpligtende. Prøve: selvbetjent, uden at vi skal være med.",
};

export type Scenario = {
  id: string;
  label: string;
  channel: string;
  customer: string;
  customerMessage: string;
  sources: { system: string; text: string }[];
  answer: string;
  outcome: { kind: "sent" | "approval" | "handover"; title: string; detail: string };
};

export const demo = {
  overline: "Se én opgave blive løst",
  title: "Fra kundens besked til et svar, I kan stå inde for.",
  lead: "Vælg et eksempel. Se hvilke oplysninger Liros slår op, hvad den svarer, og hvornår en medarbejder skal ind over.",
  badge: "Eksempel med fiktive data. Ingen rigtige ordrer eller kunder.",
  shop: "Nordlys Hjem",
  steps: ["Kundens besked", "Det Liros slår op", "Svar eller forslag", "Resultat"],
  controls: { play: "Afspil eksempel", next: "Næste", restart: "Start forfra", playing: "Spiller…" },
  scenarios: [
    {
      id: "ordrestatus",
      label: "Ordrestatus",
      channel: "Chat",
      customer: "Karen D.",
      customerMessage: "Hej, jeg bestilte en lampe i mandags. Hvornår kommer den?",
      sources: [
        { system: "Webshop", text: "Ordre #20817: betalt, sendt tirsdag" },
        { system: "Fragtfirma", text: "Pakken er sorteret, levering torsdag" },
        { system: "Fragtfirma", text: "Sporingslink fundet" },
      ],
      answer:
        "Hej Karen. Din lampe blev sendt tirsdag og ser ud til at blive leveret torsdag. Du kan følge pakken her: [sporingslink]",
      outcome: { kind: "sent", title: "Svar sendt", detail: "Besvaret ud fra ordre- og fragtdata. Ingen medarbejder var nødvendig." },
    },
    {
      id: "retur",
      label: "Returspørgsmål",
      channel: "E-mail",
      customer: "Jesper M.",
      customerMessage: "Kan jeg returnere de her bordlamper? De passer ikke til stuen.",
      sources: [
        { system: "Webshop", text: "Ordre #20755: leveret for 9 dage siden" },
        { system: "Jeres betingelser", text: "Returret og fremgangsmåde fra jeres egen tekst" },
      ],
      answer:
        "Hej Jesper. Ud fra jeres returbetingelser kan du returnere varen. Sådan gør du: [returvejledning fra jeres betingelser]",
      outcome: { kind: "sent", title: "Svar sendt", detail: "Svaret bygger på jeres betingelser og kundens ordre." },
    },
    {
      id: "produkt",
      label: "Produktspørgsmål",
      channel: "Chat",
      customer: "Maja S.",
      customerMessage: "Fås den store keramikvase i hvid, og hvad er højden?",
      sources: [
        { system: "Produktkatalog", text: "Keramikvase, stor: hvid og sand" },
        { system: "Produktkatalog", text: "Højde 32 cm" },
        { system: "Lager", text: "Hvid: på lager" },
      ],
      answer: "Hej Maja. Ja, den store keramikvase fås i hvid. Den er 32 cm høj, og den er på lager. Her er linket: [produktlink]",
      outcome: { kind: "sent", title: "Svar sendt", detail: "Besvaret ud fra katalog og beholdning." },
    },
    {
      id: "godkendelse",
      label: "Kræver godkendelse",
      channel: "E-mail",
      customer: "Thomas R.",
      customerMessage: "Jeg har bestilt størrelse L, men vil gerne have M i stedet. Kan det ændres?",
      sources: [
        { system: "Webshop", text: "Ordre #20790: betalt, endnu ikke sendt" },
        { system: "Webshop", text: "Størrelse M: på lager" },
        { system: "Jeres regler", text: "Ændringer af ordrer skal godkendes af en medarbejder" },
      ],
      answer: "Forslag til kunden: “Hej Thomas. Din ordre er endnu ikke sendt, og størrelse M er på lager. Vi ændrer den til M og vender tilbage, når det er gjort.”",
      outcome: {
        kind: "approval",
        title: "Afventer en medarbejder",
        detail: "Intet er ændret eller sendt endnu. Medarbejderen gennemgår forslaget og godkender eller afviser. Hvilke handlinger der kræver godkendelse, afhænger af jeres opsætning.",
      },
    },
  ] satisfies Scenario[],
};

export const uses = {
  overline: "Hverdagen i supporten",
  title: "De spørgsmål, der æder timerne.",
  items: [
    { q: "Hvor er min ordre?", a: "Ordren i webshoppen og pakken hos fragtfirmaet bliver slået op, og kunden får den aktuelle status." },
    { q: "Kan jeg returnere den?", a: "Svaret bygger på jeres egne returbetingelser og kundens ordre." },
    { q: "Fås den i en anden størrelse?", a: "Produktkatalog og beholdning bruges, så kunden ikke venter på et opslag." },
    { q: "Kan I ændre min ordre?", a: "Liros kan lave et forslag, som en medarbejder godkender, før noget sker." },
  ],
  value: {
    title: "Det kan give jeres team",
    points: [
      "Mindre tid på gentagne opslag",
      "Hurtigere hjælp til kunderne, også uden for åbningstid",
      "Mere tid til sager, der kræver menneskelig vurdering",
      "Overblik over, hvad Liros har gjort",
    ],
    note: "Hvor meget det betyder, afhænger af jeres spørgsmål og jeres systemer. Det gennemgår vi på demoen.",
  },
};

export const integrationsSection = {
  overline: "Passer det til jer?",
  title: "Liros læser fra de systemer, I allerede bruger.",
  lead: "Her er systemer, Liros kan forbindes med. Det er ikke kunder eller partnere.",
  availableLabel: "Kan forbindes i dag",
  plannedLabel: "På vej (kan ikke bruges endnu)",
  fullLink: "Se alle integrationer",
  other: { title: "Bruger I et andet system?", text: "Skriv til os, så kigger vi på det sammen. Hvad der er muligt, og hvornår, bekræfter vi i en samtale med jer.", cta: "Fortæl os, hvad I bruger" },
  emptyNote: "Se den fulde, aktuelle oversigt over integrationer.",
};

export const control = {
  id: "kontrol",
  overline: "Kontrol",
  title: "I kan følge med og gribe ind.",
  lead: "Liros arbejder inden for de regler og datakilder, I vælger. Her er, hvad jeres team kan se og styre.",
  points: [
    { t: "Gennemse samtaler", d: "Hver samtale ligger i indbakken, så I kan se, hvad kunden skrev, og hvad der blev svaret." },
    { t: "Tag over", d: "En medarbejder kan overtage en samtale, når den kræver et menneske." },
    { t: "Godkend handlinger", d: "Handlinger, der ændrer noget, kan sættes til at kræve godkendelse først." },
    { t: "Afgræns løsningen", d: "Regler og tilkoblede datakilder bestemmer, hvad Liros svarer ud fra." },
  ],
  slice: {
    badge: "Eksempel · fiktive data",
    title: "Handling kræver godkendelse",
    kind: "Ordreændring",
    rows: [
      ["Ordre", "#20790"],
      ["Ændring", "Størrelse L → M"],
      ["Status", "Ikke sendt endnu"],
    ],
    reply: "Hej Thomas. Din ordre er endnu ikke sendt, og størrelse M er på lager. Vi ændrer den til M og vender tilbage, når det er gjort.",
    state: "Afventer medarbejder",
  },
  security: {
    title: "Data og sikkerhed",
    text: "Ifølge Liros’ Trust Center opbevares og behandles kundedata inden for EU, og kundedata bruges ikke til at træne eksterne AI-modeller. Bestemte underdatabehandlere, fx til AI-behandling, kan indebære overførsel uden for EU/EØS med passende garantier.",
    link: "Læs Trust Center",
  },
};

export const onboarding = {
  overline: "Opstart",
  title: "Tre trin, og vi er med hele vejen.",
  steps: [
    { t: "Afklar jeres behov og systemer", d: "Vi gennemgår, hvilke spørgsmål I får, og hvilke systemer svarene ligger i." },
    { t: "Forbind kilder og indstil løsningen", d: "Vi kobler jeres systemer på sammen med jer og indstiller tone og regler." },
    { t: "Gennemgå kvaliteten og tag den i brug", d: "I ser svarene igennem, før I sætter Liros i drift." },
  ],
  you: { t: "Det bidrager I med", items: ["Adgang til jeres systemer", "Jeres returbetingelser og tone", "En person, der kender jeres support"] },
  us: { t: "Det hjælper Liros med", items: ["Opsætning og tilkobling af integrationer", "Indstilling af regler og svar", "Gennemgang af kvaliteten sammen med jer"] },
};

export const faq = {
  overline: "Spørgsmål",
  title: "Det, I sandsynligvis undrer jer over.",
  items: [
    { q: "Passer det til vores systemer?", a: "Liros kan forbindes med flere webshop-, fragt-, lager- og returløsninger. Se oversigten, og skriv til os, hvis I bruger noget andet. Så bekræfter vi, hvad der er muligt.", link: { href: "/product/integrations", label: "Se integrationer" } },
    { q: "Hvad kan Liros håndtere?", a: "Gentagne kundespørgsmål som ordrestatus, levering, returneringer og produktspørgsmål ud fra jeres egne data. Liros er ikke bygget på faste scripts, men finder de relevante oplysninger til det, kunden spørger om." },
    { q: "Hvad sker der, hvis Liros ikke kan løse en sag?", a: "Så kan en medarbejder tage over. Handlinger, der ændrer noget, kan sættes til at kræve godkendelse." },
    { q: "Hvad kræver opstart?", a: "Et par møder, hvor vi afklarer behov og kobler jeres systemer på. Selve forbindelsen til en enkelt integration er beskrevet som omkring 5–10 minutter, men opsætning og gennemgang af kvalitet tager længere." },
    { q: "Hvordan prissættes løsningen?", a: "Prisen er en fast månedlig pris ud fra jeres ticketvolumen. En ticket er én kundehenvendelse løst fra start til slut. Vi har ikke en offentlig fra-pris her. Book en demo, så gennemgår vi, hvad der passer til jer." },
    { q: "Hvordan håndteres vores data?", a: "Se Trust Center for opbevaring, underdatabehandlere og garantier. Har I spørgsmål, kan I skrive til security@liros.ai.", link: { href: "TRUST", label: "Trust Center" } },
  ],
};

export const closing = {
  title: "Se, hvordan Liros passer til jeres webshop.",
  lead: "Book 30 minutter, så gennemgår vi jeres spørgsmål og systemer. Eller prøv Liros selv.",
  micro: "Demoen er et møde på 30 minutter. Prøven er et selvbetjent forløb i appen.",
};

export const book = {
  title: "Book en demo",
  lead: "Et møde på 30 minutter, hvor vi viser Liros ud fra jeres webshop.",
  expect: ["30 minutter, uforpligtende", "Live gennemgang af platformen", "Svar tilpasset jeres webshop"],
  prep: "Forbered gerne: hvilke systemer I bruger, og hvilke spørgsmål I får oftest.",
  calendarTitle: "Vælg et tidspunkt",
  openExternal: "Åbn kalenderen i et nyt vindue",
  loadCalendar: "Vis kalenderen",
  loadCalendarNote: "Kalenderen leveres af en tredjepart og indlæses først, når du vælger det.",
  noCalendar: "Online booking er ikke tilgængelig her lige nu. Send os en forespørgsel, så vender vi tilbage med forslag til et tidspunkt.",
  calendarNote: "Når du har valgt et tidspunkt i kalenderen, får du en bekræftelse derfra. Formularen herunder booker ikke et tidspunkt.",
  formTitle: "Foretrækker du, at vi kontakter dig?",
  formLead: "Send en forespørgsel. Den reserverer ikke et mødetidspunkt, men vi vender tilbage.",
};

export const trial = {
  title: "Prøv Liros selv",
  lead: "Et selvbetjent forløb i Liros’ app, uden at vi skal være med.",
  get: ["Du kommer til et trin-for-trin-flow i den eksisterende Liros-app", "Det starter med dit navn og din webshop-adresse", "Du kan altid vælge at booke en demo i stedet"],
  terms: "Helt gratis · Intet kort · Ingen binding",
  termsNote: "Vilkår som beskrevet på den eksisterende prøveside.",
  cta: "Start prøven i appen",
  other: "Foretrækker du at tale med os først?",
};
