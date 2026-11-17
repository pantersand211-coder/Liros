"use client";
import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(getConsent() === null); }, []);
  if (!show) return null;
  const choose = (v: "all" | "necessary") => { setConsent(v); setShow(false); };
  return (
    <div className="cookie" role="region" aria-label="Cookievalg">
      <p>Vi bruger kun nødvendige cookies, medmindre I accepterer statistik og eksterne tjenester som bookingkalenderen.</p>
      <div className="cookie-actions">
        <button className="btn btn-secondary btn-sm" onClick={() => choose("necessary")}>Kun nødvendige</button>
        <button className="btn btn-secondary btn-sm" onClick={() => choose("all")}>Acceptér alle</button>
      </div>
    </div>
  );
}
