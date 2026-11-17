import type { Metadata } from "next";
import { book } from "@/content/da";
import { BookingEmbed } from "@/components/BookingEmbed";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book en demo",
  description: "Book en demo på 30 minutter, og se hvordan Liros passer til jeres webshop.",
  alternates: { canonical: "/book-demo" },
};

export default function BookDemo() {
  return (
    <section className="section tight">
      <div className="container book-grid">
        <div>
          <p className="overline">Demo</p>
          <h1 className="h1-sm">{book.title}</h1>
          <p className="lead">{book.lead}</p>
          <ul className="ticks">{book.expect.map((e) => <li key={e}>{e}</li>)}</ul>
          <p className="muted">{book.prep}</p>
          <p className="small">Vil du hellere tale først? <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> · <a href={site.contact.salesPhoneHref}>{site.contact.salesPhone}</a></p>
        </div>
        <div>
          <h2 className="h3">{book.calendarTitle}</h2>
          <BookingEmbed />
          <hr />
          <h2 className="h3">{book.formTitle}</h2>
          <p className="muted">{book.formLead}</p>
          <LeadForm source="book-demo" />
        </div>
      </div>
    </section>
  );
}
