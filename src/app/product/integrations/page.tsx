import type { Metadata } from "next";
import { IntegrationGroups } from "@/components/Integrations";
import { TrackedLink } from "@/components/TrackedLink";
import { integrationsSection as c } from "@/content/da";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Integrationer",
  description: "Systemer, Liros kan forbindes med: webshop, fragt, lager og returer.",
  alternates: { canonical: "/product/integrations" },
};

export default function Integrations() {
  return (
    <section className="section tight">
      <div className="container narrow">
        <p className="overline">Integrationer</p>
        <h1 className="h1-sm">Integrationerne bag svarene.</h1>
        <p className="lead">Et svar er kun så godt som dataene bag det. Liros læser fra jeres webshop, fragtfirma, lager og returplatform. Listen viser systemer, Liros kan forbindes med. Det er ikke kunder eller partnere.</p>
        <IntegrationGroups />
        <p className="muted small">“På vej” betyder, at integrationen endnu ikke kan bruges.</p>
        <div className="aside">
          <h2 className="h3">{c.other.title}</h2>
          <p>{c.other.text}</p>
          <TrackedLink href={`mailto:${site.contact.email}?subject=Integration`} placement="integrations-page" type="other" className="textlink">{c.other.cta} →</TrackedLink>
        </div>
        <div className="actions">
          <TrackedLink href="/book-demo" placement="integrations-page" type="book" className="btn btn-primary">Book en demo</TrackedLink>
        </div>
      </div>
    </section>
  );
}
