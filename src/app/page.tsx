import type { Metadata } from "next";
import { TrackedLink } from "@/components/TrackedLink";
import { HeroCard } from "@/components/HeroCard";
import { Demo } from "@/components/Demo";
import { IntegrationGroups, FullLink } from "@/components/Integrations";
import { Faq } from "@/components/Faq";
import { hero, demo, uses, integrationsSection as ints, control, onboarding, faq, closing } from "@/content/da";
import { legacy, site } from "@/content/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="overline">{hero.overline}</p>
            <h1>{hero.title}</h1>
            <p className="lead">{hero.lead}</p>
            <div className="actions">
              <TrackedLink href="/book-demo" placement="hero" type="book" className="btn btn-primary">{hero.primary}</TrackedLink>
              <TrackedLink href="/try" placement="hero" type="trial" className="btn btn-secondary">{hero.secondary}</TrackedLink>
            </div>
            <p className="micro">{hero.micro}</p>
          </div>
          <HeroCard />
        </div>
      </section>

      <section id="eksempel" className="section">
        <div className="container">
          <p className="overline">{demo.overline}</p>
          <h2>{demo.title}</h2>
          <p className="lead">{demo.lead}</p>
          <Demo />
          <div className="actions center">
            <TrackedLink href="/book-demo" placement="after-demo" type="book" className="btn btn-primary">Book en demo</TrackedLink>
            <span className="muted small">Se det på jeres egen webshop i et møde på {site.demoMinutes} minutter.</span>
          </div>
        </div>
      </section>

      <section id="anvendelser" className="section tint">
        <div className="container">
          <p className="overline">{uses.overline}</p>
          <h2>{uses.title}</h2>
          <div className="grid-2">
            <ul className="uses">
              {uses.items.map((i) => <li key={i.q}><h3>“{i.q}”</h3><p>{i.a}</p></li>)}
            </ul>
            <div className="value">
              <h3>{uses.value.title}</h3>
              <ul className="ticks">{uses.value.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <p className="muted small">{uses.value.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="integrationer" className="section">
        <div className="container">
          <p className="overline">{ints.overline}</p>
          <h2>{ints.title}</h2>
          <p className="lead">{ints.lead}</p>
          <IntegrationGroups />
          <p><FullLink /></p>
          <div className="aside">
            <h3>{ints.other.title}</h3>
            <p>{ints.other.text}</p>
            <TrackedLink href={`mailto:${site.contact.email}?subject=Integration`} placement="integrations" type="other" className="textlink">{ints.other.cta} →</TrackedLink>
          </div>
        </div>
      </section>

      <section id={control.id} className="section tint">
        <div className="container grid-2 ctl">
          <div>
            <p className="overline">{control.overline}</p>
            <h2>{control.title}</h2>
            <p className="lead">{control.lead}</p>
            <dl className="ctl-list">
              {control.points.map((p) => <div key={p.t}><dt>{p.t}</dt><dd>{p.d}</dd></div>)}
            </dl>
          </div>
          <div>
            <div className="window approval" role="group" aria-label="Eksempel på godkendelse i indbakken">
              <div className="window-bar"><span>{control.slice.title}</span><span className="badge">{control.slice.badge}</span></div>
              <div className="pad">
                <p className="dlabel">{control.slice.kind}</p>
                <dl className="kv">{control.slice.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                <div className="bubble reply"><p>{control.slice.reply}</p></div>
                <p className="outcome approval"><strong><span className="dot" aria-hidden="true" />{control.slice.state}</strong></p>
              </div>
            </div>
            <div className="security">
              <h3>{control.security.title}</h3>
              <p>{control.security.text}</p>
              <a className="textlink" href={legacy("/trust")}>{control.security.link} →</a>
            </div>
          </div>
        </div>
      </section>

      <section id="opstart" className="section">
        <div className="container">
          <p className="overline">{onboarding.overline}</p>
          <h2>{onboarding.title}</h2>
          <ol className="steps">
            {onboarding.steps.map((s, i) => <li key={s.t}><span className="num">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>)}
          </ol>
          <div className="grid-2 split">
            {[onboarding.you, onboarding.us].map((b) => (
              <div key={b.t}><h3>{b.t}</h3><ul className="ticks">{b.items.map((x) => <li key={x}>{x}</li>)}</ul></div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section tint">
        <div className="container narrow">
          <p className="overline">{faq.overline}</p>
          <h2>{faq.title}</h2>
          <Faq />
        </div>
      </section>

      <section className="section closing">
        <div className="container">
          <h2>{closing.title}</h2>
          <p className="lead">{closing.lead}</p>
          <div className="actions">
            <TrackedLink href="/book-demo" placement="closing" type="book" className="btn btn-primary">{hero.primary}</TrackedLink>
            <TrackedLink href="/try" placement="closing" type="trial" className="btn btn-secondary">{hero.secondary}</TrackedLink>
          </div>
          <p className="micro">{closing.micro}</p>
        </div>
      </section>
    </>
  );
}
