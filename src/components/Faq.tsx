import { faq } from "@/content/da";
import { legacy } from "@/content/site";

export function Faq() {
  return (
    <div className="faq">
      {faq.items.map((it) => {
        const link = "link" in it ? it.link : undefined;
        const href = link ? (link.href === "TRUST" ? legacy("/trust") : link.href) : "";
        return (
          <details key={it.q}>
            <summary>{it.q}</summary>
            <p>{it.a}{link && <> <a href={href}>{link.label}</a></>}</p>
          </details>
        );
      })}
    </div>
  );
}
