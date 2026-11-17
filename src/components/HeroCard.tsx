import { demo } from "@/content/da";

// Statisk uddrag af produktet til hero. Samme fiktive eksempel som første scenarie i demoen.
export function HeroCard() {
  const s = demo.scenarios[0];
  return (
    <div className="window hero-card" role="img" aria-label={`Eksempel på en samtale: kunden spørger om ordrestatus, Liros slår ordre og fragt op og svarer.`}>
      <div className="window-bar"><span>{demo.shop} · indbakke</span><span className="badge">Eksempel · fiktive data</span></div>
      <div className="dsteps compact" aria-hidden="true">
        <div className="dstep on"><span className="dlabel">Kunden skriver</span><div className="bubble"><strong>{s.customer}</strong><p>{s.customerMessage}</p></div></div>
        <div className="dstep on"><span className="dlabel">Liros slår op</span>
          <ul className="sources">{s.sources.slice(0, 2).map((x, i) => <li key={i}><span className="src">{x.system}</span>{x.text}</li>)}</ul></div>
        <div className="dstep on"><span className="dlabel">Svar</span><div className="bubble reply"><p>{s.answer}</p></div></div>
      </div>
    </div>
  );
}
