import Link from "next/link";
import { integrations, roles } from "@/content/integrations";
import { integrationsSection as c } from "@/content/da";
import { legacy } from "@/content/site";

const showUnverified = process.env.SHOW_UNVERIFIED_INTEGRATIONS === "1";

export function IntegrationGroups() {
  const list = integrations.filter((i) => i.verified || showUnverified);
  if (!list.length) return <p className="muted">{c.emptyNote} <a href={legacy("/product/integrations")}>{c.fullLink}</a></p>;
  return (
    <div className="int-groups">
      {roles.map((role) => {
        const items = list.filter((i) => i.role === role);
        if (!items.length) return null;
        const avail = items.filter((i) => i.status === "available");
        const planned = items.filter((i) => i.status === "planned");
        return (
          <div key={role} className="int-group">
            <h3>{role}</h3>
            {avail.length > 0 && (
              <ul aria-label={`${role}: ${c.availableLabel}`}>
                {avail.map((i) => <li key={i.name}>{i.name}{!i.verified && <em className="draft"> udkast</em>}</li>)}
              </ul>
            )}
            {planned.length > 0 && (
              <ul className="planned" aria-label={`${role}: ${c.plannedLabel}`}>
                {planned.map((i) => <li key={i.name}>{i.name}<span className="tag">på vej</span></li>)}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
export const FullLink = () => <Link href="/product/integrations" className="textlink">{c.fullLink} →</Link>;
