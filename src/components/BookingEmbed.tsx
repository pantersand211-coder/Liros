"use client";
import { useEffect, useState } from "react";
import { book } from "@/content/da";
import { site } from "@/content/site";
import { getConsent, setConsent, CONSENT_EVENT } from "@/lib/consent";
import { track } from "@/lib/analytics";

// Kendte HubSpot-meetings-oprindelser. Bekræftelsen kommer som postMessage fra embed-siden.
const ORIGIN = /^https:\/\/meetings(-[a-z0-9]+)?\.hubspot\.com$/;

export function BookingEmbed() {
  const url = site.bookingUrl;
  const [load, setLoad] = useState(false);

  useEffect(() => {
    track("booking_page_view", {}, "booking_page_view");
    if (getConsent() === "all") setLoad(true);
    const onConsent = () => { if (getConsent() === "all") setLoad(true); };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    if (!load || !url) return;
    track("booking_provider_open", {}, "booking_provider_open");
    // UVERIFICERET mod live-kalender: HubSpot-embed sender typisk {meetingBookSucceeded:true}. Se README.
    const onMsg = (e: MessageEvent) => {
      if (!ORIGIN.test(e.origin)) return;
      const d = e.data as { meetingBookSucceeded?: boolean } | null;
      if (d && d.meetingBookSucceeded === true) track("booking_confirmed", {}, "booking_confirmed");
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [load, url]);

  if (!url) return <p className="notice">{book.noCalendar}</p>;
  const embed = url.includes("?") ? `${url}&embed=true` : `${url}?embed=true`;
  return (
    <div>
      <div className="calendar" aria-busy={!load}>
        {load ? (
          <iframe src={embed} title={book.calendarTitle} loading="lazy" />
        ) : (
          <div className="calendar-gate">
            <p>{book.loadCalendarNote}</p>
            <button className="btn btn-primary" onClick={() => { setConsent("all"); setLoad(true); }}>{book.loadCalendar}</button>
          </div>
        )}
      </div>
      <p className="small"><a href={url} target="_blank" rel="noopener noreferrer" onClick={() => track("booking_provider_open", { action: "external" }, "booking_external")}>{book.openExternal}</a></p>
      <p className="muted small">{book.calendarNote}</p>
    </div>
  );
}
