import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Liros – AI-kundeservice til webshops", template: "%s | Liros" },
  description: "Liros besvarer kundernes gentagne spørgsmål ud fra data fra jeres webshop og tilkoblede systemer. Jeres team kan følge med og tage over.",
  icons: { icon: "/brand/liros-icon-black.svg" },
  openGraph: { type: "website", locale: "da_DK", siteName: "Liros" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>
        <a href="#main" className="skip">Gå til indhold</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
