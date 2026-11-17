import type { Metadata } from "next";
import { trial } from "@/content/da";
import { TrackedLink } from "@/components/TrackedLink";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Prøv Liros selv",
  description: "Prøv Liros på egen hånd i et selvbetjent forløb i appen.",
  alternates: { canonical: "/try" },
};

export default function Try() {
  return (
    <section className="section tight">
      <div className="container narrow">
        <p className="overline">Selvbetjent prøve</p>
        <h1 className="h1-sm">{trial.title}</h1>
        <p className="lead">{trial.lead}</p>
        <h2 className="h3">Det får du</h2>
        <ul className="ticks">{trial.get.map((g) => <li key={g}>{g}</li>)}</ul>
        <p><strong>{trial.terms}</strong><br /><span className="muted small">{trial.termsNote}</span></p>
        <div className="actions">
          <TrackedLink href={site.trialUrl} placement="try-page" type="trial" event="trial_start" className="btn btn-primary" external>{trial.cta}</TrackedLink>
        </div>
        <p className="muted">{trial.other} <TrackedLink href="/book-demo" placement="try-page" type="book" className="textlink">Book en demo</TrackedLink></p>
      </div>
    </section>
  );
}
