import { Logo } from "./Logo";
import { footer, site } from "@/content/site";

type L = { label: string; href: string; external?: boolean };
const Col = ({ title, links }: { title: string; links: L[] }) => (
  <div>
    <h2 className="footer-h">{title}</h2>
    <ul>
      {links.map((l) => (
        <li key={l.href}><a href={l.href} {...(l.external ? { rel: "noopener" } : {})}>{l.label}</a></li>
      ))}
    </ul>
  </div>
);

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="muted small">AI-kundeservice til webshops. Bygget i Danmark.</p>
          <p className="small"><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><br />Salg: <a href={site.contact.salesPhoneHref}>{site.contact.salesPhone}</a></p>
        </div>
        <Col title="Produkt" links={footer.product} />
        <Col title="Virksomhed" links={footer.company} />
        <Col title="Juridisk" links={footer.legal} />
      </div>
    </footer>
  );
}
