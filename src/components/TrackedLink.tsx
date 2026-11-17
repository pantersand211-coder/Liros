"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

type Props = { href: string; placement: string; type: "book" | "trial" | "other"; className?: string; children: ReactNode; external?: boolean; event?: "trial_start" };

export function TrackedLink({ href, placement, type, className, children, external, event }: Props) {
  const onClick = () => {
    track("cta_click", { placement, cta_type: type });
    if (event === "trial_start") track("trial_start", { placement });
  };
  if (external || /^https?:|^mailto:|^tel:/.test(href)) {
    return (
      <a href={href} className={className} onClick={onClick} {...(external ? { rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={className} onClick={onClick}>{children}</Link>;
}
