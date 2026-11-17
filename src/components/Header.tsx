"use client";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";
import { nav, site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const first = panel.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="container header-in">
        <Logo />
        <nav aria-label="Hovedmenu" className="nav-desktop">
          {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          {site.loginUrl && <a href={site.loginUrl}>Log ind</a>}
        </nav>
        <div className="header-cta">
          <TrackedLink href="/book-demo" placement="nav" type="book" className="btn btn-primary btn-sm">Book en demo</TrackedLink>
          <button ref={btn} className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
            <span className="sr-only">{open ? "Luk menu" : "Åbn menu"}</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 7h16M3 15h16" />}
            </svg>
          </button>
        </div>
      </div>
      <div id="mobile-menu" ref={panel} className="nav-mobile" hidden={!open}>
        <nav aria-label="Mobilmenu" className="container">
          {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
          {site.loginUrl && <a href={site.loginUrl}>Log ind</a>}
        </nav>
      </div>
    </header>
  );
}
