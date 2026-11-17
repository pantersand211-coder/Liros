import type { Metadata } from "next";
import { TrackedLink } from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Produkt",
  description: "Sådan løser Liros gentagne kundespørgsmål for webshops, og hvad der kræves for at komme i gang.",
  alternates: { canonical: "/product" },
};

const tasks = [
  ["Hvor er min ordre?", "Finder ordren, tjekker fragtfirmaet og svarer med den aktuelle status og sporingslinket."],
  ["Hvornår kommer den?", "Læser fragtfirmaets estimat og fortæller kunden det."],
  ["Kan jeg returnere den her?", "Forklarer jeres returbetingelser. Selve returneringen kan startes, når jeres retursystem er koblet på."],
  ["Hvor er min refundering?", "Tjekker ordren og fortæller kunden, hvad der er sket."],
  ["Har I den i størrelse M?", "Svarer ud fra jeres produktkatalog og linker til produktet."],
];

export default function Product() {
  return (
    <section className="section tight">
      <div className="container narrow">
        <p className="overline">Produkt</p>
        <h1 className="h1-sm">Support, der slår tingene op for jer.</h1>
        <p className="lead">Det meste af en webshops support er de samme få spørgsmål, stillet igen og igen. Liros svarer ud fra jeres egne ordre-, fragt- og produktdata og lader jeres team tage over, når det kræver en person.</p>
        <h2 className="h3">Hvad sker der konkret?</h2>
        <dl className="ctl-list">{tasks.map(([q, a]) => <div key={q}><dt>“{q}”</dt><dd>{a}</dd></div>)}</dl>
        <h2 className="h3">Forudsætninger</h2>
        <ul className="ticks">
          <li>Jeres systemer skal kunne forbindes. Se <a href="/product/integrations">integrationer</a>.</li>
          <li>Svarene bygger på jeres data og betingelser, så de skal være ajour.</li>
          <li>Opsætning og gennemgang af kvalitet sker sammen med jer.</li>
        </ul>
        <h2 className="h3">Se det på jeres egen webshop</h2>
        <p>På en demo gennemgår vi jeres spørgsmål og systemer i et møde på 30 minutter.</p>
        <div className="actions">
          <TrackedLink href="/book-demo" placement="product" type="book" className="btn btn-primary">Book en demo</TrackedLink>
          <TrackedLink href="/try" placement="product" type="trial" className="btn btn-secondary">Prøv Liros selv</TrackedLink>
        </div>
      </div>
    </section>
  );
}
