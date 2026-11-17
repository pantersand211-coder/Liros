import Link from "next/link";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Liros ai – forside">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/liros-logo-black.png" alt="" width={96} height={23} />
    </Link>
  );
}
